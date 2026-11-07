import type { DocumentaryStatus, InvestigationGraph, NodeCategory, RelationType, SourceReference, ValidationIssue, ValidationResult } from './index';

const categories = new Set<NodeCategory>(['organization', 'person', 'case', 'event', 'document']);
const relationTypes = new Set<RelationType>(['organizational', 'historical', 'judicial', 'event', 'documentary']);
const statuses = new Set<DocumentaryStatus>(['established', 'alleged', 'disputed', 'archived']);
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

function requiredString(record: Record<string, unknown>, key: string, path: string, issues: ValidationIssue[]): string {
  const value = record[key];
  if (typeof value !== 'string' || value.trim().length === 0) {
    issues.push({ path: `${path}.${key}`, message: 'Chaîne non vide requise' });
    return '';
  }
  return value;
}

function validateSources(value: unknown, path: string, issues: ValidationIssue[]): value is SourceReference[] {
  if (!Array.isArray(value) || value.length === 0) {
    issues.push({ path, message: 'Au moins une source est requise' });
    return false;
  }
  value.forEach((source, index) => {
    if (!isRecord(source)) { issues.push({ path: `${path}[${index}]`, message: 'Objet source requis' }); return; }
    for (const key of ['id', 'title', 'publisher', 'publishedAt']) requiredString(source, key, `${path}[${index}]`, issues);
  });
  return true;
}

export function validateGraph(value: unknown): ValidationResult<InvestigationGraph> {
  const issues: ValidationIssue[] = [];
  if (!isRecord(value)) return { success: false, issues: [{ path: '$', message: 'Objet graphe requis' }] };
  for (const key of ['id', 'title', 'description', 'notice', 'updatedAt']) requiredString(value, key, '$', issues);
  if (value['schemaVersion'] !== '1.0') issues.push({ path: '$.schemaVersion', message: 'Version 1.0 requise' });
  if (!Array.isArray(value['nodes'])) issues.push({ path: '$.nodes', message: 'Tableau requis' });
  if (!Array.isArray(value['edges'])) issues.push({ path: '$.edges', message: 'Tableau requis' });

  const nodeIds = new Set<string>();
  if (Array.isArray(value['nodes'])) value['nodes'].forEach((node, index) => {
    const path = `$.nodes[${index}]`;
    if (!isRecord(node)) { issues.push({ path, message: 'Objet nœud requis' }); return; }
    const id = requiredString(node, 'id', path, issues);
    if (nodeIds.has(id)) issues.push({ path: `${path}.id`, message: `Identifiant dupliqué: ${id}` });
    nodeIds.add(id);
    for (const key of ['label', 'summary', 'description']) requiredString(node, key, path, issues);
    if (!categories.has(node['category'] as NodeCategory)) issues.push({ path: `${path}.category`, message: 'Catégorie inconnue' });
    validateSources(node['sources'], `${path}.sources`, issues);
    if (node['informationSections'] !== undefined) {
      if (!Array.isArray(node['informationSections'])) issues.push({ path: `${path}.informationSections`, message: 'Tableau requis' });
      else node['informationSections'].forEach((section, sectionIndex) => {
        const sectionPath = `${path}.informationSections[${sectionIndex}]`;
        if (!isRecord(section)) { issues.push({ path: sectionPath, message: 'Objet section requis' }); return; }
        for (const key of ['id', 'title']) requiredString(section, key, sectionPath, issues);
        if (!Array.isArray(section['items']) || section['items'].length === 0) issues.push({ path: `${sectionPath}.items`, message: 'Au moins une information est requise' });
        else section['items'].forEach((item, itemIndex) => {
          const itemPath = `${sectionPath}.items[${itemIndex}]`;
          if (!isRecord(item)) { issues.push({ path: itemPath, message: 'Objet information requis' }); return; }
          for (const key of ['label', 'value']) requiredString(item, key, itemPath, issues);
        });
      });
    }
  });

  const edgeIds = new Set<string>();
  if (Array.isArray(value['edges'])) value['edges'].forEach((edge, index) => {
    const path = `$.edges[${index}]`;
    if (!isRecord(edge)) { issues.push({ path, message: 'Objet relation requis' }); return; }
    const id = requiredString(edge, 'id', path, issues);
    if (edgeIds.has(id)) issues.push({ path: `${path}.id`, message: `Identifiant dupliqué: ${id}` });
    edgeIds.add(id);
    const source = requiredString(edge, 'source', path, issues);
    const target = requiredString(edge, 'target', path, issues);
    for (const key of ['label', 'description', 'lastVerifiedAt']) requiredString(edge, key, path, issues);
    if (!nodeIds.has(source)) issues.push({ path: `${path}.source`, message: `Nœud inconnu: ${source}` });
    if (!nodeIds.has(target)) issues.push({ path: `${path}.target`, message: `Nœud inconnu: ${target}` });
    if (source === target) issues.push({ path, message: 'Une relation ne peut pas se relier elle-même' });
    if (!relationTypes.has(edge['type'] as RelationType)) issues.push({ path: `${path}.type`, message: 'Type inconnu' });
    if (!statuses.has(edge['documentaryStatus'] as DocumentaryStatus)) issues.push({ path: `${path}.documentaryStatus`, message: 'Statut inconnu' });
    validateSources(edge['sources'], `${path}.sources`, issues);
  });
  return issues.length === 0 ? { success: true, data: value as unknown as InvestigationGraph, issues } : { success: false, issues };
}

export class GraphValidationError extends Error {
  readonly issues: ValidationIssue[];
  constructor(issues: ValidationIssue[]) {
    super(`Graphe invalide (${issues.length} erreur${issues.length > 1 ? 's' : ''})`);
    this.issues = issues;
    this.name = 'GraphValidationError';
  }
}
