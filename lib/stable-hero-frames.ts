// Register the existing painted poses to one body silhouette. Only the exposed
// petting forearm/hand and a registered eyelid patch are allowed to change.
// Heads, clothing, legs, paws, and tails always come from the same source cell.
const WIDTH = 600;
const HEIGHT = 560;
const ARM = { x: 363, y: 268, width: 165, height: 92 };

// Cuff offsets measured in the original 16 petting cells. Keeping the socket
// fixed avoids moving the elbow when the authored forearm changes its angle.
const CUFF_OFFSETS = [
  [0, 0], [-2, 0], [0, -3.5], [-1, -2.5],
  [-1, -3.5], [0, -5.5], [1, -8.5], [0, -7.5],
  [-2, -4], [-6, 0], [-2, -6], [5, 0.5],
  [0, -2.5], [-8, 9], [-7, 12.5], [0, 0],
] as const;

function surface(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Hero canvas unavailable");
  return { canvas, context };
}

/** Isolate the original skin pixels without including the cat or the sleeve. */
export function armPixelMask(data: Uint8ClampedArray, width: number, height: number) {
  const core = new Uint8Array(width * height);
  for (let i = 0; i < core.length; i++) {
    const p = i * 4;
    const red = data[p], green = data[p + 1], blue = data[p + 2];
    core[i] = data[p + 3] > 80 && red > 140 && red > green * 1.2 && green > blue * 1.25 ? 1 : 0;
  }

  // Keep the connected forearm, discarding isolated warm pixels in the cat.
  const visited = new Uint8Array(core.length);
  let largest: number[] = [];
  for (let start = 0; start < core.length; start++) {
    if (!core[start] || visited[start]) continue;
    const group = [start];
    visited[start] = 1;
    for (let head = 0; head < group.length; head++) {
      const i = group[head], x = i % width, y = Math.floor(i / width);
      for (const neighbor of [x > 0 ? i - 1 : -1, x + 1 < width ? i + 1 : -1, y > 0 ? i - width : -1, y + 1 < height ? i + width : -1]) {
        if (neighbor >= 0 && core[neighbor] && !visited[neighbor]) {
          visited[neighbor] = 1;
          group.push(neighbor);
        }
      }
    }
    if (group.length > largest.length) largest = group;
  }

  // Include the existing shaded outline and antialiasing, rather than cutting
  // away dark skin at the fingertips. This never creates or recolors pixels.
  const mask = new Uint8Array(core.length);
  for (const i of largest) {
    const x = i % width, y = Math.floor(i / width);
    for (let dy = -5; dy <= 5; dy++) {
      for (let dx = -5; dx <= 5; dx++) {
        if (dx * dx + dy * dy > 25) continue;
        const px = x + dx, py = y + dy;
        if (px >= 0 && px < width && py >= 0 && py < height) mask[py * width + px] = 1;
      }
    }
  }
  return mask;
}

export function createStableHeroRenderer(
  target: CanvasRenderingContext2D,
  sheets: { idle: HTMLImageElement; petting: HTMLImageElement },
) {
  const reference = surface(WIDTH, HEIGHT);
  reference.context.drawImage(sheets.idle, 0, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
  const body = surface(WIDTH, HEIGHT);
  body.context.drawImage(reference.canvas, 0, 0);

  const arms = Array.from({ length: 16 }, (_, frame) => {
    const arm = surface(ARM.width, ARM.height);
    arm.context.drawImage(sheets.petting,
      frame % 4 * WIDTH + ARM.x, Math.floor(frame / 4) * HEIGHT + ARM.y,
      ARM.width, ARM.height, 0, 0, ARM.width, ARM.height);
    const pixels = arm.context.getImageData(0, 0, ARM.width, ARM.height);
    const mask = armPixelMask(pixels.data, ARM.width, ARM.height);
    for (let i = 0; i < mask.length; i++) if (!mask[i]) pixels.data[i * 4 + 3] = 0;
    arm.context.putImageData(pixels, 0, 0);

    if (frame === 0) {
      // Remove just the reference hand. The remainder of the original image,
      // including both body silhouettes and the cat's ears, stays untouched.
      const fixed = body.context.getImageData(ARM.x, ARM.y, ARM.width, ARM.height);
      for (let i = 0; i < mask.length; i++) if (mask[i]) fixed.data[i * 4 + 3] = 0;
      body.context.putImageData(fixed, ARM.x, ARM.y);
    }
    return arm.canvas;
  });

  // A single blink per loop, from the original closed-eye cell. Registering it
  // locally preserves the head's exact position and size while the lids close.
  const blink = surface(WIDTH, HEIGHT);
  blink.context.setTransform(0.9389405, 0.00012275, -0.00012275, 0.9389405, 14.66704, 26.13445);
  blink.context.drawImage(sheets.idle, WIDTH, HEIGHT * 3, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
  const eyes = new Path2D("M304 170 Q320 169 333 181 L347 178 L350 190 L332 200 L310 191 Z");

  return (mode: "idle" | "petting", frame: number) => {
    target.clearRect(0, 0, WIDTH, HEIGHT);
    if (mode === "idle") {
      target.drawImage(reference.canvas, 0, 0);
    } else {
      target.drawImage(body.canvas, 0, 0);
      // Keep a small socket under the moving skin so changing cuff shadows
      // cannot open a transparent gap between the forearm and fixed sleeve.
      target.drawImage(reference.canvas, 365, 280, 25, 35, 365, 280, 25, 35);
      const [dx, dy] = CUFF_OFFSETS[frame];
      target.drawImage(arms[frame], ARM.x + dx, ARM.y + dy);
      target.drawImage(reference.canvas, 358, 273, 16, 43, 358, 273, 16, 43);
    }
    if (frame === (mode === "idle" ? 13 : 7)) {
      target.save();
      target.clip(eyes);
      target.drawImage(blink.canvas, 0, 0);
      target.restore();
    }
  };
}
