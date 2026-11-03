import { describe, expect, it } from 'vitest';
import { calculateLayout } from '@affichetonfa/board-core';
import type { GraphNode } from '@affichetonfa/shared-types';

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
});
