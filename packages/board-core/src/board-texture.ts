import { CanvasTexture, SRGBColorSpace } from 'three';

export function createBoardTexture(baseColor = '#5a3f2b'): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D indisponible');

  context.fillStyle = baseColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const warmth = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  warmth.addColorStop(0, '#d59a5b33');
  warmth.addColorStop(0.45, '#7a4d2a12');
  warmth.addColorStop(1, '#1b110b55');
  context.fillStyle = warmth;
  context.fillRect(0, 0, canvas.width, canvas.height);

  let seed = 0x4a6f7921;
  const random = (): number => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x100000000;
  };

  for (let index = 0; index < 5200; index += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const length = 1 + random() * 8;
    const angle = (random() - 0.5) * 0.8;
    context.strokeStyle = random() > 0.54 ? '#e6b67818' : '#21130b28';
    context.lineWidth = 0.45 + random() * 1.2;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    context.stroke();
  }

  for (let index = 0; index < 800; index += 1) {
    const radius = 0.4 + random() * 1.8;
    context.fillStyle = random() > 0.45 ? '#f0c88a20' : '#160d082b';
    context.beginPath();
    context.arc(random() * canvas.width, random() * canvas.height, radius, 0, Math.PI * 2);
    context.fill();
  }

  const vignette = context.createRadialGradient(512, 310, 120, 512, 320, 610);
  vignette.addColorStop(0, '#ffffff08');
  vignette.addColorStop(0.72, '#00000008');
  vignette.addColorStop(1, '#09050366');
  context.fillStyle = vignette;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
