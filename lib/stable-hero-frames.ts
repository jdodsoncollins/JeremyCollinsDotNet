// Register the existing painted poses to one body silhouette. Only the exposed
// petting forearm/hand and a registered eyelid patch are allowed to change.
// Heads, clothing, legs, paws, and tails always come from the same source cell.
const WIDTH = 600;
const HEIGHT = 560;
const ARM = { x: 340, y: 235, width: 200, height: 145 };

// Retrace the coherent lowering poses for the return stroke. The raised-hand
// poses change the wrist abruptly; no new poses or in-between frames are used.
const PETTING_FRAMES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1,
] as const;

// Cuff offsets measured in the selected original petting cells. Keeping the socket
// fixed avoids moving the elbow when the authored forearm changes its angle.
const CUFF_OFFSETS = [
  [0, 0],
  [-2, 0],
  [0, -3.5],
  [-1, -2.5],
  [-1, -3.5],
  [0, -5.5],
  [1, -8.5],
  [0, -7.5],
  [-2, -4],
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
export function armPixelMask(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  outline = 1,
) {
  const core = new Uint8Array(width * height);
  for (let i = 0; i < core.length; i++) {
    const p = i * 4;
    const red = data[p],
      green = data[p + 1],
      blue = data[p + 2];
    core[i] =
      data[p + 3] > 80 && red > 140 && red > green * 1.2 && green > blue * 1.25
        ? 1
        : 0;
  }

  // Keep the connected forearm, discarding isolated warm pixels in the cat.
  const visited = new Uint8Array(core.length);
  let largest: number[] = [];
  for (let start = 0; start < core.length; start++) {
    if (!core[start] || visited[start]) continue;
    const group = [start];
    visited[start] = 1;
    for (let head = 0; head < group.length; head++) {
      const i = group[head],
        x = i % width,
        y = Math.floor(i / width);
      for (const neighbor of [
        x > 0 ? i - 1 : -1,
        x + 1 < width ? i + 1 : -1,
        y > 0 ? i - width : -1,
        y + 1 < height ? i + width : -1,
      ]) {
        if (neighbor >= 0 && core[neighbor] && !visited[neighbor]) {
          visited[neighbor] = 1;
          group.push(neighbor);
        }
      }
    }
    if (group.length > largest.length) largest = group;
  }

  // Preserve the painted skin shadows and one edge pixel. A wide dilation also
  // captures the cat's fur where the hand touches it, leaving floating scraps.
  const mask = new Uint8Array(core.length);
  for (const i of largest) {
    const x = i % width,
      y = Math.floor(i / width);
    const radius = Math.max(outline, 5);
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const distance = dx * dx + dy * dy;
        if (distance > radius * radius) continue;
        const px = x + dx,
          py = y + dy;
        if (px < 0 || px >= width || py < 0 || py >= height) continue;
        const p = (py * width + px) * 4;
        const red = data[p],
          green = data[p + 1],
          blue = data[p + 2];
        const skinShadow =
          red > 70 && green > 35 && red > green * 1.2 && green > blue * 1.25;
        if (distance <= outline * outline || skinShadow)
          mask[py * width + px] = 1;
      }
    }
  }

  // Preserve enclosed painted creases, including shadows below the threshold.
  const outside = new Uint8Array(mask.length);
  const queue: number[] = [];
  for (let i = 0; i < mask.length; i++) {
    const x = i % width,
      y = Math.floor(i / width);
    if (
      !mask[i] &&
      (x === 0 || x === width - 1 || y === 0 || y === height - 1)
    ) {
      outside[i] = 1;
      queue.push(i);
    }
  }
  for (let head = 0; head < queue.length; head++) {
    const i = queue[head],
      x = i % width,
      y = Math.floor(i / width);
    for (const neighbor of [
      x > 0 ? i - 1 : -1,
      x + 1 < width ? i + 1 : -1,
      y > 0 ? i - width : -1,
      y + 1 < height ? i + width : -1,
    ]) {
      if (neighbor >= 0 && !mask[neighbor] && !outside[neighbor]) {
        outside[neighbor] = 1;
        queue.push(neighbor);
      }
    }
  }
  for (let i = 0; i < mask.length; i++) if (!outside[i]) mask[i] = 1;
  if (outline === 1) {
    // Remove thin fur wisps connected to the painted fingertips at contact.
    // A one-pixel opening preserves the fingers and removes those stray lines.
    const interior = new Uint8Array(mask.length);
    for (let y = 1; y < height - 1; y++)
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        if (
          mask[i] &&
          mask[i - 1] &&
          mask[i + 1] &&
          mask[i - width] &&
          mask[i + width]
        )
          interior[i] = 1;
      }
    mask.fill(0);
    for (let i = width + 1; i < mask.length - width - 1; i++)
      if (interior[i]) {
        for (const neighbor of [i, i - 1, i + 1, i - width, i + width])
          mask[neighbor] = 1;
      }
  }
  return mask;
}

export function createStableHeroRenderer(
  target: CanvasRenderingContext2D,
  sheets: { idle: HTMLImageElement; petting: HTMLImageElement },
) {
  const reference = surface(WIDTH, HEIGHT);
  reference.context.drawImage(
    sheets.idle,
    0,
    0,
    WIDTH,
    HEIGHT,
    0,
    0,
    WIDTH,
    HEIGHT,
  );
  const body = surface(WIDTH, HEIGHT);
  body.context.drawImage(reference.canvas, 0, 0);

  const arms = Array.from({ length: 9 }, (_, frame) => {
    const arm = surface(ARM.width, ARM.height);
    arm.context.drawImage(
      sheets.petting,
      (frame % 4) * WIDTH + ARM.x,
      Math.floor(frame / 4) * HEIGHT + ARM.y,
      ARM.width,
      ARM.height,
      0,
      0,
      ARM.width,
      ARM.height,
    );
    const pixels = arm.context.getImageData(0, 0, ARM.width, ARM.height);
    const mask = armPixelMask(pixels.data, ARM.width, ARM.height);
    for (let i = 0; i < mask.length; i++)
      if (!mask[i]) pixels.data[i * 4 + 3] = 0;
    arm.context.putImageData(pixels, 0, 0);

    if (frame === 0) {
      // Remove just the reference hand. The remainder of the original image,
      // including both body silhouettes and the cat's ears, stays untouched.
      const fixed = body.context.getImageData(
        ARM.x,
        ARM.y,
        ARM.width,
        ARM.height,
      );
      const removal = armPixelMask(fixed.data, ARM.width, ARM.height, 5);
      for (let i = 0; i < removal.length; i++)
        if (removal[i]) fixed.data[i * 4 + 3] = 0;
      body.context.putImageData(fixed, ARM.x, ARM.y);
    }
    return arm.canvas;
  });

  // The cat stays on one silhouette and occludes the stroking fingertips.
  // Paint it only once so the edge alpha does not accumulate between poses.
  const cat = { x: 409, y: 330, width: WIDTH - 409, height: HEIGHT - 330 };
  body.context.clearRect(cat.x, cat.y, cat.width, cat.height);

  const socket = surface(30, 45);
  socket.context.drawImage(reference.canvas, 365, 275, 30, 45, 0, 0, 30, 45);
  const socketPixels = socket.context.getImageData(0, 0, 30, 45);
  for (let y = 0; y < 45; y++)
    for (let x = 17; x < 30; x++) {
      socketPixels.data[(y * 30 + x) * 4 + 3] *= (30 - x) / 13;
    }
  socket.context.putImageData(socketPixels, 0, 0);
  const cuff = new Path2D("M340 235 H391 L381 280 L370 316 L340 330 Z");
  const poses = arms.map((arm, frame) => {
    const pose = surface(WIDTH, HEIGHT);
    pose.context.drawImage(body.canvas, 0, 0);
    pose.context.drawImage(socket.canvas, 365, 275);
    const [dx, dy] = CUFF_OFFSETS[frame];
    pose.context.drawImage(arm, ARM.x + dx, ARM.y + dy);
    pose.context.save();
    pose.context.clip(cuff);
    pose.context.drawImage(reference.canvas, 0, 0);
    pose.context.restore();
    pose.context.drawImage(
      reference.canvas,
      cat.x,
      cat.y,
      cat.width,
      cat.height,
      cat.x,
      cat.y,
      cat.width,
      cat.height,
    );
    return pose.canvas;
  });

  // A single blink per loop, from the original closed-eye cell. Registering it
  // locally preserves the head's exact position and size while the lids close.
  const blink = surface(WIDTH, HEIGHT);
  blink.context.setTransform(
    0.9389405,
    0.00012275,
    -0.00012275,
    0.9389405,
    14.66704,
    26.13445,
  );
  blink.context.drawImage(
    sheets.idle,
    WIDTH,
    HEIGHT * 3,
    WIDTH,
    HEIGHT,
    0,
    0,
    WIDTH,
    HEIGHT,
  );
  const eyes = new Path2D(
    "M304 170 Q320 169 333 181 L347 178 L350 190 L332 200 L310 191 Z",
  );

  return (frame: number) => {
    target.clearRect(0, 0, WIDTH, HEIGHT);
    target.drawImage(poses[PETTING_FRAMES[frame]], 0, 0);
    if (frame === 7) {
      target.save();
      target.clip(eyes);
      target.drawImage(blink.canvas, 0, 0);
      target.restore();
    }
  };
}
