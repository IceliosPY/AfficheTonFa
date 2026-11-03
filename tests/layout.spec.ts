import { describe, expect, it } from 'vitest';
import { calculateLayout } from '@affichetonfa/board-core';
import type { GraphEdge, GraphNode } from '@affichetonfa/shared-types';

const source = { id: 's', title: 'Source', publisher: 'Test', publishedAt: '2026-01-01' };
const nodes: GraphNode[] = [
  { id: 'alpha', label: 'Alpha', category: 'organization', summary: 'A', description: 'A', sources: [source] },
  { id: 'beta', label: 'Beta', category: 'organization', summary: 'B', description: 'B', sources: [source] },
  { id: 'fixed', label: 'Fixe', category: 'document', summary: 'F', description: 'F', position: { x: 8, y: -2, rotation: 0.1 }, sources: [source] },
];

describe('calculateLayout', () => {
  it('est déterministe', () => { expect([...calculateLayout(nodes)]).toEqual([...calculateLayout(nodes)]); });
  it('préserve les positions éditoriales', () => { expect(calculateLayout(nodes).get('fixed')).toEqual({ x: 8, y: -2, z: 0.24, rotation: 0.1 }); });
  it('évite de superposer les membres du même groupe', () => { expect(calculateLayout(nodes).get('alpha')).not.toEqual(calculateLayout(nodes).get('beta')); });

  it('reste compact et déterministe avec des centaines de fiches et plus de mille liens', () => {
    const largeNodes: GraphNode[] = Array.from({ length: 400 }, (_, index) => ({
      id: `node-${index}`, label: `Fiche ${index}`, category: 'person', summary: 'Résumé', description: 'Description', sources: [source],
    }));
    const largeEdges: GraphEdge[] = Array.from({ length: 1200 }, (_, index) => ({
      id: `edge-${index}`,
      source: index < largeNodes.length - 1 ? `node-${index}` : `node-${index % largeNodes.length}`,
      target: index < largeNodes.length - 1 ? `node-${index + 1}` : `node-${(index * 37 + 11) % largeNodes.length}`,
      type: 'documentary', label: 'Lien', description: 'Relation de charge', documentaryStatus: 'established',
      lastVerifiedAt: '2026-01-01', sources: [source],
    }));
    const first = calculateLayout(largeNodes, largeEdges);
    const second = calculateLayout(largeNodes, largeEdges);
    const coordinates = [...first.values()].map(({ x, y }) => `${x.toFixed(4)}:${y.toFixed(4)}`);
    const xs = [...first.values()].map(({ x }) => x);
    const ys = [...first.values()].map(({ y }) => y);

    expect([...first]).toEqual([...second]);
    expect(first.size).toBe(400);
    expect(new Set(coordinates).size).toBe(400);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThan(100);
    expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(80);
  });
});
