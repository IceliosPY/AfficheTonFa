import { GraphValidationError, validateGraph, type DataProvider, type InvestigationGraph } from '@affichetonfa/shared-types';

export class StaticJsonDataProvider implements DataProvider {
  constructor(private readonly baseUrl = 'data/v1/graphs') {}

  async loadGraph(graphId: string, signal?: AbortSignal): Promise<InvestigationGraph> {
    const safeId = encodeURIComponent(graphId.replace(/\.json$/u, ''));
    const response = await fetch(`${this.baseUrl.replace(/\/$/u, '')}/${safeId}.json`, { signal });
    if (!response.ok) throw new Error(`Chargement impossible (${response.status} ${response.statusText})`);
    const result = validateGraph(await response.json());
    if (!result.success || !result.data) throw new GraphValidationError(result.issues);
    return result.data;
  }
}

export class UrlDataProvider implements DataProvider {
  constructor(private readonly url: string) {}

  async loadGraph(_graphId: string, signal?: AbortSignal): Promise<InvestigationGraph> {
    const response = await fetch(this.url, { signal, mode: 'cors', credentials: 'omit' });
    if (!response.ok) throw new Error(`Chargement impossible (${response.status} ${response.statusText})`);
    const result = validateGraph(await response.json());
    if (!result.success || !result.data) throw new GraphValidationError(result.issues);
    return result.data;
  }
}

export class MemoryDataProvider implements DataProvider {
  constructor(private graph: unknown) {}
  setGraph(graph: unknown): void { this.graph = graph; }
  async loadGraph(): Promise<InvestigationGraph> {
    const result = validateGraph(this.graph);
    if (!result.success || !result.data) throw new GraphValidationError(result.issues);
    return result.data;
  }
}

/** Contract placeholder for a later authenticated API implementation. */
export abstract class RestApiDataProvider implements DataProvider {
  abstract loadGraph(graphId: string, signal?: AbortSignal): Promise<InvestigationGraph>;
}
