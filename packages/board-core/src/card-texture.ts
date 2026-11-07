import { CanvasTexture, SRGBColorSpace } from 'three';
import type { GraphNode, NodeCategory } from '@affichetonfa/shared-types';

const labels: Record<NodeCategory, string> = {
  organization: 'ORGANISATION', person: 'PERSONNE', case: 'AFFAIRE', event: 'ÉVÉNEMENT', document: 'DOCUMENT',
};
const colors: Record<NodeCategory, string> = {
  organization: '#cc594f', person: '#447b81', case: '#b7843f', event: '#6c608a', document: '#68724d',
};

function wrapText(context: CanvasRenderingContext2D, text: string, width: number): string[] {
  const words = text.split(/\s+/u);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > width && line) { lines.push(line); line = word; }
    else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
}

export function createCardTexture(node: GraphNode, selected = false): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640; canvas.height = 420;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D indisponible');
  const gradient = context.createLinearGradient(0, 0, 640, 420);
  gradient.addColorStop(0, selected ? '#fffdf1' : '#eee9d9'); gradient.addColorStop(1, '#d9d0bc');
  context.fillStyle = gradient; context.fillRect(0, 0, 640, 420);
  context.globalAlpha = 0.055;
  for (let x = 0; x < 640; x += 12) for (let y = 0; y < 420; y += 12) { context.fillStyle = (x + y) % 24 ? '#1d1a16' : '#ffffff'; context.fillRect(x, y, 1, 1); }
  context.globalAlpha = 1;
  context.fillStyle = colors[node.category]; context.fillRect(0, 0, 640, 52);
  context.fillStyle = '#fffaf0'; context.font = '600 20px system-ui, sans-serif'; context.fillText(labels[node.category], 28, 34);
  context.fillStyle = '#29251f'; context.font = '700 38px Georgia, serif';
  wrapText(context, node.label, 575).slice(0, 2).forEach((line, index) => context.fillText(line, 30, 112 + index * 43));
  context.strokeStyle = colors[node.category]; context.lineWidth = 3; context.beginPath(); context.moveTo(30, 190); context.lineTo(610, 190); context.stroke();
  context.fillStyle = '#4d463b'; context.font = '24px system-ui, sans-serif';
  wrapText(context, node.summary ?? '', 575).slice(0, 4).forEach((line, index) => context.fillText(line, 30, 235 + index * 34));
  context.fillStyle = '#756c5e'; context.font = '600 17px ui-monospace, monospace'; context.fillText(node.id.toUpperCase(), 30, 392);
  if (selected) { context.strokeStyle = '#d13f38'; context.lineWidth = 12; context.strokeRect(6, 6, 628, 408); }
  const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace; texture.needsUpdate = true;
  return texture;
}
