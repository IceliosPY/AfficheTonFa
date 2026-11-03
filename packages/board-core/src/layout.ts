import type { GraphNode } from '@affichetonfa/shared-types';

export interface LayoutPosition { x: number; y: number; z: number; rotation: number; }

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

/** Deterministic clustered placement. Explicit editorial positions always win. */
export function calculateLayout(nodes: GraphNode[]): Map<string, LayoutPosition> {
  const positions = new Map<string, LayoutPosition>();
  const categoryCenter = {
    organization: { x: -5.2, y: 2.8 }, person: { x: 0, y: 3.2 }, case: { x: 5.2, y: 2.3 },
    event: { x: -2.8, y: -3 }, document: { x: 3.5, y: -3.1 },
  } as const;
  const grouped = new Map<string, GraphNode[]>();
  for (const node of nodes) grouped.set(node.category, [...(grouped.get(node.category) ?? []), node]);

  for (const [category, group] of grouped) {
    const center = categoryCenter[category as keyof typeof categoryCenter];
    group.forEach((node, index) => {
      if (node.position) {
        positions.set(node.id, { x: node.position.x, y: node.position.y, z: node.position.z ?? 0.24, rotation: node.position.rotation ?? 0 });
        return;
      }
      const seed = hash(node.id);
      const ring = Math.floor(index / 6) + 1;
      const angle = ((index % 6) / 6) * Math.PI * 2 + (seed % 21) / 50;
      const radius = 1.1 * ring;
      positions.set(node.id, {
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
        z: 0.22 + (seed % 7) * 0.008,
        rotation: ((seed % 13) - 6) * 0.006,
      });
    });
  }
  return positions;
}
