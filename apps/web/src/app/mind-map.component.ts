import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { calculateMindMapLayout, type MindMapPosition } from '@affichetonfa/board-core';
import type { BoardFilters, GraphEdge, GraphNode, InvestigationGraph, NodeCategory } from '@affichetonfa/shared-types';

const categoryColors: Record<NodeCategory, string> = {
  organization: '#d7675e', person: '#62a8ad', case: '#d0a254', event: '#9582ba', document: '#96a36a',
};

@Component({
  selector: 'atf-mind-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #host class="mind-host">
      <canvas #canvas aria-label="Carte mentale interactive des relations"></canvas>
      <div class="loading" *ngIf="!graph">Organisation du réseau…</div>
      <div class="map-tools" aria-label="Contrôles de la carte mentale">
        <button type="button" (click)="zoomBy(1.2)" aria-label="Zoomer">+</button>
        <button type="button" (click)="zoomBy(1 / 1.2)" aria-label="Dézoomer">−</button>
        <button type="button" (click)="resetView()">Centrer</button>
      </div>
    </div>
  `,
  styles: [`
    :host,.mind-host{display:block;width:100%;height:100%;min-height:300px;position:relative;overflow:hidden;background:#0d100f}
    canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab}
    canvas:active{cursor:grabbing}
    .loading{position:absolute;left:50%;top:50%;translate:-50% -50%;padding:.75rem 1rem;background:#121412e8;border:1px solid #ffffff26;color:#eee7d9;font-size:12px}
    .map-tools{position:absolute;right:16px;bottom:16px;display:flex;background:#151816e6;border:1px solid #ffffff1a}
    .map-tools button{min-width:34px;height:32px;border:0;border-right:1px solid #ffffff14;background:transparent;color:#aaa399;font:600 10px ui-monospace,monospace;cursor:pointer}
    .map-tools button:last-child{border-right:0;padding:0 11px}.map-tools button:hover{color:#fff;background:#ffffff0a}
  `],
})
export class MindMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @Input() graph?: InvestigationGraph;
  @Input() filters: BoardFilters = {};
  @Input() selectedNodeId?: string;
  @Input() selectedEdgeId?: string;
  @Output() readonly nodeSelected = new EventEmitter<GraphNode | null>();
  @Output() readonly edgeSelected = new EventEmitter<GraphEdge | null>();

  private context?: CanvasRenderingContext2D;
  private positions = new Map<string, MindMapPosition>();
  private resizeObserver?: ResizeObserver;
  private frame = 0;
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private pointerStart?: { x: number; y: number; offsetX: number; offsetY: number };
  private moved = false;

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') ?? undefined;
    this.resizeObserver = new ResizeObserver(() => { this.resize(); this.resetView(); });
    this.resizeObserver.observe(this.host.nativeElement);
    const canvas = this.canvas.nativeElement;
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointercancel', this.onPointerUp);
    canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.rebuild();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graph']) this.rebuild();
    else this.requestDraw();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame); this.resizeObserver?.disconnect();
    const canvas = this.canvas.nativeElement;
    canvas.removeEventListener('pointerdown', this.onPointerDown);
    canvas.removeEventListener('pointermove', this.onPointerMove);
    canvas.removeEventListener('pointerup', this.onPointerUp);
    canvas.removeEventListener('pointercancel', this.onPointerUp);
    canvas.removeEventListener('wheel', this.onWheel);
  }

  resetView(): void {
    const values = [...this.positions.values()];
    const width = this.host.nativeElement.clientWidth; const height = this.host.nativeElement.clientHeight;
    if (!values.length || !width || !height) return;
    const minX = Math.min(...values.map(({ x }) => x)) - 130; const maxX = Math.max(...values.map(({ x }) => x)) + 130;
    const minY = Math.min(...values.map(({ y }) => y)) - 70; const maxY = Math.max(...values.map(({ y }) => y)) + 70;
    this.scale = Math.min(1.25, Math.max(.08, Math.min((width - 90) / (maxX - minX), (height - 100) / (maxY - minY))));
    this.offsetX = width / 2 - (minX + maxX) / 2 * this.scale;
    this.offsetY = height / 2 - (minY + maxY) / 2 * this.scale;
    this.requestDraw();
  }

  focusNode(id: string): void {
    const position = this.positions.get(id); if (!position) return;
    this.scale = Math.max(this.scale, .9);
    this.offsetX = this.host.nativeElement.clientWidth / 2 - position.x * this.scale;
    this.offsetY = this.host.nativeElement.clientHeight / 2 - position.y * this.scale;
    this.requestDraw();
  }

  zoomBy(factor: number, screenX = this.host.nativeElement.clientWidth / 2, screenY = this.host.nativeElement.clientHeight / 2): void {
    const next = Math.min(3, Math.max(.08, this.scale * factor));
    const worldX = (screenX - this.offsetX) / this.scale; const worldY = (screenY - this.offsetY) / this.scale;
    this.scale = next; this.offsetX = screenX - worldX * next; this.offsetY = screenY - worldY * next; this.requestDraw();
  }

  private rebuild(): void {
    this.positions = this.graph ? calculateMindMapLayout(this.graph.nodes, this.graph.edges) : new Map();
    queueMicrotask(() => { this.resize(); this.resetView(); });
  }

  private resize(): void {
    const canvas = this.canvas.nativeElement; const width = this.host.nativeElement.clientWidth; const height = this.host.nativeElement.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * ratio)); canvas.height = Math.max(1, Math.round(height * ratio));
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; this.requestDraw();
  }

  private requestDraw(): void {
    cancelAnimationFrame(this.frame); this.frame = requestAnimationFrame(() => this.draw());
  }

  private draw(): void {
    const context = this.context; const graph = this.graph; if (!context) return;
    const canvas = this.canvas.nativeElement; const ratio = Math.min(window.devicePixelRatio || 1, 2);
    context.setTransform(ratio, 0, 0, ratio, 0, 0); context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
    this.drawBackdrop(context, canvas.width / ratio, canvas.height / ratio);
    if (!graph) return;
    context.save(); context.translate(this.offsetX, this.offsetY); context.scale(this.scale, this.scale);
    const visibleNodes = new Set(graph.nodes.filter((node) => this.nodeVisible(node)).map((node) => node.id));
    for (const edge of graph.edges) if (visibleNodes.has(edge.source) && visibleNodes.has(edge.target) && this.edgeVisible(edge)) this.drawEdge(context, edge);
    for (const node of graph.nodes) if (visibleNodes.has(node.id)) this.drawNode(context, node);
    context.restore();
  }

  private drawBackdrop(context: CanvasRenderingContext2D, width: number, height: number): void {
    context.fillStyle = '#0d100f'; context.fillRect(0, 0, width, height); context.fillStyle = '#ffffff0c';
    const spacing = Math.max(18, 34 * this.scale); const startX = ((this.offsetX % spacing) + spacing) % spacing; const startY = ((this.offsetY % spacing) + spacing) % spacing;
    for (let x = startX; x < width; x += spacing) for (let y = startY; y < height; y += spacing) context.fillRect(x, y, 1, 1);
  }

  private drawEdge(context: CanvasRenderingContext2D, edge: GraphEdge): void {
    const source = this.positions.get(edge.source); const target = this.positions.get(edge.target); if (!source || !target) return;
    const selected = edge.id === this.selectedEdgeId; const related = this.selectedNodeId === edge.source || this.selectedNodeId === edge.target;
    context.beginPath(); context.moveTo(source.x, source.y);
    const bend = Math.max(45, Math.abs(target.x - source.x) * .42);
    context.bezierCurveTo(source.x + Math.sign(target.x - source.x || 1) * bend, source.y, target.x - Math.sign(target.x - source.x || 1) * bend, target.y, target.x, target.y);
    context.strokeStyle = selected ? '#e55349' : related ? '#bd6a62' : edge.documentaryStatus === 'alleged' ? '#b48c48aa' : '#76837a80';
    context.lineWidth = (selected ? 4 : related ? 2.6 : 1.35) / Math.max(this.scale, .45); context.stroke();
  }

  private drawNode(context: CanvasRenderingContext2D, node: GraphNode): void {
    const position = this.positions.get(node.id); if (!position) return;
    const root = position.depth === 0; const width = root ? 210 : 178; const height = root ? 68 : 56; const selected = node.id === this.selectedNodeId;
    context.save(); context.translate(position.x, position.y); context.shadowColor = '#0009'; context.shadowBlur = 14; context.shadowOffsetY = 5;
    context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, root ? 7 : 4); context.fillStyle = selected ? '#f2eadb' : '#ded7ca'; context.fill();
    context.shadowColor = 'transparent'; context.lineWidth = selected ? 3 : 1; context.strokeStyle = selected ? '#d04a41' : '#ffffff20'; context.stroke();
    context.fillStyle = categoryColors[node.category]; context.fillRect(-width / 2, -height / 2, root ? 8 : 5, height);
    context.fillStyle = '#292622'; context.font = `${root ? 700 : 600} ${root ? 15 : 13}px Georgia,serif`; context.textBaseline = 'middle';
    context.fillText(this.ellipsize(context, node.label, width - 28), -width / 2 + 18, root ? -8 : 0);
    if (root) { context.fillStyle = '#766f65'; context.font = '8px ui-monospace,monospace'; context.fillText('NŒUD CENTRAL', -width / 2 + 18, 14); }
    context.restore();
  }

  private ellipsize(context: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    if (context.measureText(text).width <= maxWidth) return text;
    let value = text; while (value.length > 1 && context.measureText(`${value}…`).width > maxWidth) value = value.slice(0, -1); return `${value}…`;
  }

  private nodeVisible(node: GraphNode): boolean {
    const categories = this.filters.categories ?? []; const query = this.filters.query?.trim().toLocaleLowerCase('fr') ?? '';
    return (!categories.length || categories.includes(node.category)) && (!query || `${node.label} ${node.summary} ${node.description}`.toLocaleLowerCase('fr').includes(query));
  }

  private edgeVisible(edge: GraphEdge): boolean {
    const types = this.filters.relationTypes ?? []; const statuses = this.filters.documentaryStatuses ?? [];
    return (!types.length || types.includes(edge.type)) && (!statuses.length || statuses.includes(edge.documentaryStatus));
  }

  private worldPoint(event: PointerEvent): { x: number; y: number } {
    const bounds = this.canvas.nativeElement.getBoundingClientRect();
    return { x: (event.clientX - bounds.left - this.offsetX) / this.scale, y: (event.clientY - bounds.top - this.offsetY) / this.scale };
  }

  private hitNode(point: { x: number; y: number }): GraphNode | undefined {
    return [...(this.graph?.nodes ?? [])].reverse().find((node) => {
      if (!this.nodeVisible(node)) return false; const position = this.positions.get(node.id); if (!position) return false;
      const width = position.depth === 0 ? 210 : 178; const height = position.depth === 0 ? 68 : 56;
      return Math.abs(point.x - position.x) <= width / 2 && Math.abs(point.y - position.y) <= height / 2;
    });
  }

  private hitEdge(point: { x: number; y: number }): GraphEdge | undefined {
    const threshold = 10 / this.scale;
    return (this.graph?.edges ?? []).find((edge) => {
      if (!this.edgeVisible(edge)) return false; const source = this.positions.get(edge.source); const target = this.positions.get(edge.target); if (!source || !target) return false;
      const dx = target.x - source.x; const dy = target.y - source.y; const lengthSquared = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((point.x - source.x) * dx + (point.y - source.y) * dy) / lengthSquared));
      return Math.hypot(point.x - (source.x + t * dx), point.y - (source.y + t * dy)) <= threshold;
    });
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    this.canvas.nativeElement.setPointerCapture(event.pointerId); this.pointerStart = { x: event.clientX, y: event.clientY, offsetX: this.offsetX, offsetY: this.offsetY }; this.moved = false;
  };
  private readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.pointerStart) return; const dx = event.clientX - this.pointerStart.x; const dy = event.clientY - this.pointerStart.y;
    if (Math.hypot(dx, dy) > 3) this.moved = true; this.offsetX = this.pointerStart.offsetX + dx; this.offsetY = this.pointerStart.offsetY + dy; this.requestDraw();
  };
  private readonly onPointerUp = (event: PointerEvent): void => {
    if (!this.pointerStart) return; this.pointerStart = undefined;
    if (this.moved) return; const point = this.worldPoint(event); const node = this.hitNode(point);
    if (node) { this.nodeSelected.emit(node); return; } const edge = this.hitEdge(point); this.edgeSelected.emit(edge ?? null); if (!edge) this.nodeSelected.emit(null);
  };
  private readonly onWheel = (event: WheelEvent): void => {
    event.preventDefault(); const bounds = this.canvas.nativeElement.getBoundingClientRect(); this.zoomBy(Math.exp(-event.deltaY * .001), event.clientX - bounds.left, event.clientY - bounds.top);
  };
}
