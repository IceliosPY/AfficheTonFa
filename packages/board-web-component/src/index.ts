import { InvestigationBoard, MemoryDataProvider, UrlDataProvider } from '@affichetonfa/board-core';
import type { BoardFilters, BoardOptions, InvestigationGraph } from '@affichetonfa/shared-types';

const styles = `
  :host { display:block; width:100%; height:600px; min-height:320px; background:#101211; color:#f2eadb; font-family:system-ui,sans-serif; }
  .root { width:100%; height:100%; position:relative; overflow:hidden; }
  .viewport { position:absolute; inset:0; }
  .status { position:absolute; left:50%; top:50%; translate:-50% -50%; padding:.7rem 1rem; border:1px solid #ffffff26; border-radius:4px; background:#151716dc; letter-spacing:.04em; z-index:2; }
  .error { color:#ffd4ce; border-color:#b94a40; max-width:min(34rem,85%); }
  canvas { display:block; width:100%; height:100%; }
`;

export class InvestigationBoardElement extends HTMLElement {
  static readonly observedAttributes = ['data-url', 'theme', 'width', 'height', 'selected-node'];
  private readonly root = this.attachShadow({ mode: 'open' });
  private readonly viewport = document.createElement('div');
  private readonly status = document.createElement('div');
  private board?: InvestigationBoard;
  private graphValue?: InvestigationGraph;
  private abortController?: AbortController;

  constructor() {
    super(); this.viewport.className = 'viewport'; this.status.className = 'status'; this.status.textContent = 'Chargement du tableau…';
    const style = document.createElement('style'); style.textContent = styles;
    const wrapper = document.createElement('div'); wrapper.className = 'root'; wrapper.append(this.viewport, this.status); this.root.append(style, wrapper);
  }

  connectedCallback(): void {
    this.style.width = this.getAttribute('width') ?? this.style.width;
    this.style.height = this.getAttribute('height') ?? this.style.height;
    this.initialize(); void this.loadGraph();
  }

  disconnectedCallback(): void { this.destroy(); }

  attributeChangedCallback(name: string, _previous: string | null, value: string | null): void {
    if (!this.isConnected) return;
    if (name === 'data-url') void this.loadGraph();
    else if (name === 'theme' && (value === 'light' || value === 'dark')) this.setTheme(value);
    else if (name === 'selected-node' && value) this.selectNode(value);
    else if (name === 'width' || name === 'height') this.style[name] = value ?? '';
  }

  set graph(value: InvestigationGraph | undefined) { this.graphValue = value; if (value && this.isConnected) void this.loadGraph(value); }
  get graph(): InvestigationGraph | undefined { return this.graphValue; }

  async loadGraph(graphOrUrl?: InvestigationGraph | string): Promise<void> {
    this.initialize(); this.abortController?.abort(); this.abortController = new AbortController();
    this.setStatus('Chargement du tableau…');
    try {
      const value = typeof graphOrUrl === 'object' ? graphOrUrl : this.graphValue;
      const url = typeof graphOrUrl === 'string' ? graphOrUrl : this.getAttribute('data-url');
      if (!value && !url) { this.setStatus('Ajoutez data-url ou affectez la propriété graph.', true); return; }
      const provider = value ? new MemoryDataProvider(value) : new UrlDataProvider(url as string);
      const graph = await provider.loadGraph('embedded', this.abortController.signal); this.graphValue = graph; this.board?.loadGraph(graph); this.hideStatus();
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      const normalized = error instanceof Error ? error : new Error(String(error)); this.setStatus(normalized.message, true);
      this.dispatchEvent(new CustomEvent('board-error', { detail: { error: normalized }, bubbles: true, composed: true }));
    }
  }

  selectNode(id: string): void { this.board?.selectNode(id); }
  focusNode(id: string): void { this.board?.focusNode(id); }
  resetCamera(): void { this.board?.resetCamera(); }
  setFilters(filters: BoardFilters): void { this.board?.setFilters(filters); }
  setTheme(theme: 'dark' | 'light'): void { this.board?.setTheme(theme); }
  destroy(): void { this.abortController?.abort(); this.board?.destroy(); this.board = undefined; }

  private initialize(): void {
    if (this.board) return;
    const options: BoardOptions = {
      theme: this.getAttribute('theme') === 'light' ? 'light' : 'dark', enableDrag: true, enableKeyboard: true,
      selectedNodeId: this.getAttribute('selected-node') ?? undefined,
    };
    this.board = new InvestigationBoard(this.viewport, options);
  }
  private setStatus(message: string, error = false): void { this.status.textContent = message; this.status.className = `status${error ? ' error' : ''}`; this.status.hidden = false; }
  private hideStatus(): void { this.status.hidden = true; }
}

declare global { interface HTMLElementTagNameMap { 'investigation-board': InvestigationBoardElement; } }
if (!customElements.get('investigation-board')) customElements.define('investigation-board', InvestigationBoardElement);
