"""Rebuild the modern 64-pose loops from the original 16-pose artwork.

Offline dependencies: Pillow, numpy, opencv-python-headless. These are only for
asset production; the website ships static WebP sheets and needs no Python.
Run from the repository root: python scripts/smooth-hero.py
"""
from pathlib import Path
import os, sys
if os.environ.get('HERO_PYTHON_TOOLS'):
    sys.path.insert(0, os.environ['HERO_PYTHON_TOOLS'])
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'hero'
W, H = 600, 560
GRID = np.stack(np.meshgrid(np.arange(W), np.arange(H)), axis=-1).astype(np.float32)
ENGINE = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
ENGINE.setUseSpatialPropagation(True)
ENGINE.setFinestScale(0)
ENGINE.setGradientDescentIterations(40)
ENGINE.setVariationalRefinementIterations(8)


def premultiply(image):
    result = image.astype(np.float32) / 255
    result[:, :, :3] *= result[:, :, 3:4]
    return result


def rgba(pixels):
    result = pixels.copy()
    result[:, :, :3] /= np.maximum(result[:, :, 3:4], 1 / 255)
    result[result[:, :, 3] < 1 / 255] = 0
    return np.clip(result * 255, 0, 255).astype(np.uint8)


def gray(image):
    # Transparent RGB in the source sheets contains arbitrary encoder colours.
    # Optical flow must see the visible silhouette, never those hidden pixels.
    p = premultiply(image)
    luminance = p[:, :, 0] * .299 + p[:, :, 1] * .587 + p[:, :, 2] * .114
    return np.clip((.35 * luminance + .65 * p[:, :, 3]) * 255, 0, 255).astype(np.uint8)


def flow(a, b):
    motion = ENGINE.calc(gray(a), gray(b), None)
    # The small moving hand can be lost by a dense solver against transparency.
    # Anchor that local flow to the visible skin centroid instead of allowing a
    # second, faint hand to survive the interpolation.
    def hand(image):
        rgb = image[:, :, :3].astype(float)
        skin = ((image[:, :, 3] > 220) & (rgb[:, :, 0] > rgb[:, :, 1] * 1.25)
                & (rgb[:, :, 1] > rgb[:, :, 2] * 1.3)
                & (GRID[:, :, 0] > 420) & (GRID[:, :, 0] < 525)
                & (GRID[:, :, 1] > 255) & (GRID[:, :, 1] < 405))
        points = GRID[skin]
        return (points.mean(axis=0), points) if len(points) > 20 else None
    ha, hb = hand(a), hand(b)
    if ha is not None and hb is not None:
        center_a, points = ha
        center_b, _ = hb
        zone = np.zeros((H, W), np.float32)
        low = np.maximum(points.min(axis=0).astype(int) - 12, 0)
        high = np.minimum(points.max(axis=0).astype(int) + 13, [W, H])
        zone[low[1]:high[1], low[0]:high[0]] = 1
        influence = cv2.GaussianBlur(zone, (0, 0), 6)[:, :, None]
        motion = motion * (1 - influence) + (center_b - center_a) * influence
    return motion


def remap(image, motion, amount):
    return cv2.remap(image, GRID[:, :, 0] + motion[:, :, 0] * amount,
                     GRID[:, :, 1] + motion[:, :, 1] * amount,
                     cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)


def build(mode):
    source = np.array(Image.open(ROOT / f'hero-modern-v3-{mode}.webp').convert('RGBA'))
    frames = [source[(i // 4) * H:(i // 4 + 1) * H,
                     (i % 4) * W:(i % 4 + 1) * W].copy() for i in range(16)]
    reference = np.array(Image.open(ROOT / 'hero-modern-v3-still.webp').convert('RGBA'))
    mask = np.zeros((H, W), np.uint8)
    mask[230:485, 140:365] = 255
    registered = []
    for frame in frames:
        transform = np.eye(2, 3, dtype=np.float32)
        try:
            _, transform = cv2.findTransformECC(gray(reference), gray(frame), transform,
                cv2.MOTION_EUCLIDEAN, (cv2.TERM_CRITERIA_COUNT | cv2.TERM_CRITERIA_EPS, 100, 1e-5), mask, 5)
            frame = rgba(cv2.warpAffine(premultiply(frame), transform, (W, H),
                flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_CONSTANT))
        except cv2.error:
            pass
        valid = (mask > 0) & (frame[:, :, 3] > 240) & (reference[:, :, 3] > 240)
        for channel in range(3):
            ratio = np.median(reference[:, :, channel][valid]) / max(1, np.median(frame[:, :, channel][valid]))
            frame[:, :, channel] = np.clip(frame[:, :, channel].astype(float) * np.clip(ratio, .92, 1.08), 0, 255)
        frame[frame[:, :, 3] == 0] = 0
        registered.append(frame)
    # Keep one consistent painted surface throughout the animation. Interpolate
    # the motion fields, then sample this drawing once per frame. Blending two
    # independently painted poses creates ghosted fingers and colour flicker.
    inverse = [flow(frame, reference) for frame in registered]
    for _ in range(2):
        inverse = [(inverse[(i - 1) % 16] + 2 * inverse[i] + inverse[(i + 1) % 16]) / 4 for i in range(16)]
    inverse[0] = np.zeros_like(inverse[0])
    inverse[-1] = np.zeros_like(inverse[-1])
    # Feet, lower cloak, and the seated cat stay planted in the same scene.
    planted = ((GRID[:, :, 1] > 390) & (GRID[:, :, 0] < 410)) | (GRID[:, :, 1] > 470)
    strength = 1 - .9 * cv2.GaussianBlur(planted.astype(np.float32), (0, 0), 18)
    inverse = [motion * strength[:, :, None] for motion in inverse]
    sheet = Image.new('RGBA', (W * 8, H * 8))
    surface = premultiply(reference)
    for i in range(16):
        for sub in range(4):
            t = sub / 4
            motion = (1 - t) * inverse[i] + t * inverse[(i + 1) % 16]
            image = Image.fromarray(rgba(remap(surface, motion, 1)))
            index = i * 4 + sub
            sheet.paste(image, ((index % 8) * W, (index // 8) * H))
            if index == 0 and mode == 'idle':
                image.save(ROOT / 'hero-modern-v4-still.webp', quality=96, method=6)
    destination = ROOT / f'hero-modern-v4-{mode}.webp'
    sheet.save(destination, quality=94, method=6)
    print(mode, '64 frames;', destination.stat().st_size, 'bytes', flush=True)


if __name__ == '__main__':
    build('idle')
    build('petting')
