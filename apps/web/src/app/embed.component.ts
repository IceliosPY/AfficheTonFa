import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { BoardFilters, GraphEdge, GraphNode, InvestigationGraph } from '@affichetonfa/shared-types';
import { BoardCanvasComponent } from './board-canvas.component';

type HostCommand = { type: 'select-node' | 'focus-node'; id: string } | { type: 'reset-camera' } | { type: 'set-filters'; filters: BoardFilters } | { type: 'set-theme'; theme: 'dark' | 'light' };

@Component({
  selector: 'atf-embed', standalone: true, imports: [BoardCanvasComponent],
  template: `<main><atf-board-canvas #board [graphId]="graphId" [theme]="theme" (graphLoaded)="ready($event)" (nodeSelected)="forwardNode($event)" (edgeSelected)="forwardEdge($event)"></atf-board-canvas><span class="badge">AFFICHETONFA · EMBED</span></main>`,
  styles: [`:host,main,atf-board-canvas{display:block;width:100%;height:100%;min-height:100vh}main{position:relative;background:#101211}.badge{position:absolute;right:12px;bottom:10px;color:#bdb5a7;font:600 10px ui-monospace;letter-spacing:.12em;background:#151716bd;padding:6px 8px;border:1px solid #ffffff1a}`],
})
export class EmbedComponent implements OnDestroy {
  @ViewChild('board') board?: BoardCanvasComponent;
  readonly graphId: string; theme: 'dark' | 'light'; private readonly allowedOrigin: string;
  constructor(route: ActivatedRoute) {
    this.graphId = route.snapshot.paramMap.get('graphId') ?? 'demonstration'; this.theme = route.snapshot.queryParamMap.get('theme') === 'light' ? 'light' : 'dark';
    const requested = route.snapshot.queryParamMap.get('origin'); this.allowedOrigin = this.safeOrigin(requested) ?? location.origin;
    window.addEventListener('message', this.onMessage);
  }
  ngOnDestroy(): void { window.removeEventListener('message', this.onMessage); }
  ready(graph: InvestigationGraph): void { this.post({ type: 'board-ready', graphId: graph.id }); }
  forwardNode(node: GraphNode | null): void { this.post({ type: 'node-selected', node }); }
  forwardEdge(edge: GraphEdge | null): void { this.post({ type: 'edge-selected', edge }); }
  private readonly onMessage = (event: MessageEvent<unknown>): void => {
    if (event.source !== window.parent || event.origin !== this.allowedOrigin || !this.isCommand(event.data)) return;
    const command = event.data;
    if (command.type === 'select-node') this.board?.selectNode(command.id); else if (command.type === 'focus-node') this.board?.focusNode(command.id);
    else if (command.type === 'reset-camera') this.board?.resetCamera(); else if (command.type === 'set-filters') this.board?.setFilters(command.filters);
    else if (command.type === 'set-theme') { this.theme = command.theme; this.board?.setTheme(command.theme); }
  };
  private post(message: unknown): void { if (window.parent !== window) window.parent.postMessage(message, this.allowedOrigin); }
  private safeOrigin(value: string | null): string | null { if (!value) return null; try { const url = new URL(value); return url.protocol === 'https:' || url.origin === location.origin ? url.origin : null; } catch { return null; } }
  private isCommand(value: unknown): value is HostCommand {
    if (typeof value !== 'object' || value === null || !('type' in value) || typeof value.type !== 'string') return false;
    if (value.type === 'reset-camera') return true;
    if ((value.type === 'select-node' || value.type === 'focus-node') && 'id' in value) return typeof value.id === 'string';
    if (value.type === 'set-filters' && 'filters' in value) return typeof value.filters === 'object' && value.filters !== null;
    return value.type === 'set-theme' && 'theme' in value && (value.theme === 'dark' || value.theme === 'light');
  }
}
