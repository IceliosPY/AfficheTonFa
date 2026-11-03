import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { InvestigationBoard, StaticJsonDataProvider } from '@affichetonfa/board-core';
import type { BoardFilters, GraphEdge, GraphNode, InvestigationGraph } from '@affichetonfa/shared-types';

@Component({
  selector: 'atf-board-canvas',
  standalone: true,
  template: `<div #host class="board-host" [attr.aria-busy]="loading()"><div class="loading" *ngIf="loading()">Ouverture des archives…</div><div class="error" *ngIf="error()">{{ error() }}</div></div>`,
  styles: [`
    :host,.board-host{display:block;width:100%;height:100%;min-height:300px;position:relative;overflow:hidden}
    .loading,.error{position:absolute;z-index:3;left:50%;top:50%;translate:-50% -50%;padding:.75rem 1rem;background:#121412e8;border:1px solid #ffffff26;border-radius:3px;color:#eee7d9;letter-spacing:.04em}
    .error{color:#ffd2cd;border-color:#a44840;max-width:min(36rem,85%)}
  `],
  imports: [CommonModule],
})
export class BoardCanvasComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  @Input() graphId = 'demonstration';
  @Input() filters: BoardFilters = {};
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() selectedNodeId?: string;
  @Output() readonly graphLoaded = new EventEmitter<InvestigationGraph>();
  @Output() readonly nodeSelected = new EventEmitter<GraphNode | null>();
  @Output() readonly edgeSelected = new EventEmitter<GraphEdge | null>();
  @Output() readonly boardError = new EventEmitter<Error>();
  readonly loading = signal(true);
  readonly error = signal('');
  private board?: InvestigationBoard;
  private abortController?: AbortController;
  private initialized = false;

  ngAfterViewInit(): void {
    this.board = new InvestigationBoard(this.host.nativeElement, { theme: this.theme, enableDrag: true, enableKeyboard: true, quality: 'high' });
    this.host.nativeElement.addEventListener('node-selected', this.onNodeSelected as EventListener);
    this.host.nativeElement.addEventListener('edge-selected', this.onEdgeSelected as EventListener);
    this.initialized = true; void this.load();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) return;
    if (changes['graphId']) void this.load();
    if (changes['filters']) this.board?.setFilters(this.filters);
    if (changes['theme']) this.board?.setTheme(this.theme);
    if (changes['selectedNodeId'] && this.selectedNodeId) this.board?.selectNode(this.selectedNodeId);
  }
  focusNode(id: string): void { this.board?.focusNode(id); }
  selectNode(id: string): void { this.board?.selectNode(id); }
  selectEdge(id: string): void { this.board?.selectEdge(id); }
  resetCamera(): void { this.board?.resetCamera(); }
  setFilters(filters: BoardFilters): void { this.board?.setFilters(filters); }
  setTheme(theme: 'dark' | 'light'): void { this.board?.setTheme(theme); }
  ngOnDestroy(): void {
    this.abortController?.abort(); this.host.nativeElement.removeEventListener('node-selected', this.onNodeSelected as EventListener);
    this.host.nativeElement.removeEventListener('edge-selected', this.onEdgeSelected as EventListener); this.board?.destroy();
  }
  private async load(): Promise<void> {
    this.abortController?.abort(); this.abortController = new AbortController(); this.loading.set(true); this.error.set('');
    try {
      const graph = await new StaticJsonDataProvider('data/v1/graphs').loadGraph(this.graphId, this.abortController.signal);
      this.board?.loadGraph(graph); this.board?.setFilters(this.filters);
      const onlyNode = graph.nodes.length === 1 ? graph.nodes[0] : undefined;
      if (onlyNode) this.board?.focusNode(onlyNode.id);
      this.graphLoaded.emit(graph);
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      const normalized = error instanceof Error ? error : new Error(String(error)); this.error.set(normalized.message); this.boardError.emit(normalized);
    } finally { this.loading.set(false); }
  }
  private readonly onNodeSelected = (event: CustomEvent<{ node: GraphNode | null }>): void => this.nodeSelected.emit(event.detail.node);
  private readonly onEdgeSelected = (event: CustomEvent<{ edge: GraphEdge | null }>): void => this.edgeSelected.emit(event.detail.edge);
}
