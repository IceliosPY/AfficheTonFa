import { describe, expect, it } from 'vitest';
import { validateGraph } from '@affichetonfa/shared-types';
import type { InvestigationGraph } from '@affichetonfa/shared-types';

const source = { id: 's1', title: 'Source fictive', publisher: 'Éditeur fictif', publishedAt: '2026-01-01' };
const validGraph: InvestigationGraph = {
  schemaVersion: '1.0', id: 'g', title: 'Graphe', description: 'Description', notice: 'Données fictives', updatedAt: '2026-01-01',
  nodes: [
    { id: 'a', label: 'A', category: 'organization', summary: 'Résumé A', description: 'Description A', sources: [source] },
    { id: 'b', label: 'B', category: 'document', summary: 'Résumé B', description: 'Description B', sources: [source] },
  ],
  edges: [{ id: 'e', source: 'a', target: 'b', type: 'documentary', label: 'Lien', description: 'Lien sourcé', documentaryStatus: 'established', lastVerifiedAt: '2026-01-01', sources: [source] }],
};

describe('validateGraph', () => {
  it('accepte un graphe documentaire cohérent', () => { expect(validateGraph(validGraph)).toMatchObject({ success: true, issues: [] }); });
  it('accepte un tableau vide prêt à être enrichi', () => {
    const empty = { ...validGraph, nodes: [], edges: [] };
    expect(validateGraph(empty)).toMatchObject({ success: true, issues: [] });
  });
  it('accepte des rubriques d’informations structurées sur une fiche', () => {
    const graph = structuredClone(validGraph);
    graph.nodes[0]!.informationSections = [{ id: 'identite', title: 'Identité', items: [{ label: 'Nom', value: 'Exemple' }] }];
    expect(validateGraph(graph)).toMatchObject({ success: true, issues: [] });
  });
  it('refuse une rubrique d’informations vide', () => {
    const graph = structuredClone(validGraph);
    graph.nodes[0]!.informationSections = [{ id: 'identite', title: 'Identité', items: [] }];
    expect(validateGraph(graph).issues).toContainEqual({ path: '$.nodes[0].informationSections[0].items', message: 'Au moins une information est requise' });
  });
  it('refuse une relation vers un nœud inconnu', () => {
    const invalid = structuredClone(validGraph); invalid.edges[0]!.target = 'absent';
    const result = validateGraph(invalid); expect(result.success).toBe(false); expect(result.issues.some(issue => issue.path.endsWith('.target'))).toBe(true);
  });
  it('accepte les contenus sans source ni statut documentaire', () => {
    const graph = structuredClone(validGraph);
    delete graph.nodes[0]!.sources;
    delete graph.edges[0]!.sources;
    delete graph.edges[0]!.documentaryStatus;
    delete graph.edges[0]!.lastVerifiedAt;
    expect(validateGraph(graph)).toMatchObject({ success: true, issues: [] });
  });
  it('refuse une liste de sources vide lorsqu’elle est fournie', () => {
    const invalid = structuredClone(validGraph); invalid.nodes[0]!.sources = [];
    expect(validateGraph(invalid).issues).toContainEqual({ path: '$.nodes[0].sources', message: 'Au moins une source est requise' });
  });
});
