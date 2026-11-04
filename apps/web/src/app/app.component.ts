import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaticJsonDataProvider } from '@affichetonfa/board-core';
import type { BoardFilters, GraphEdge, GraphNode, InvestigationGraph, NodeCategory } from '@affichetonfa/shared-types';
import { BoardCanvasComponent } from './board-canvas.component';
import { MindMapComponent } from './mind-map.component';

const categoryLabels: Record<NodeCategory, string> = {
  organization: 'Organisations', person: 'Personnes', case: 'Affaires', event: 'Événements', document: 'Documents',
};

@Component({
  selector: 'atf-main',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardCanvasComponent, MindMapComponent],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand-small"><span class="mark">A</span><span>AFFICHE<span>TONFA</span></span></div>
        <div class="context"><span class="eyebrow">DOSSIER ACTIF</span><strong>{{ graph?.title || 'Chargement…' }}</strong></div>
        <div class="top-actions">
          <div class="view-switch" aria-label="Choisir la présentation">
            <button type="button" (click)="viewMode = 'mind'" [class.active]="viewMode === 'mind'">Carte mentale</button>
            <button type="button" (click)="viewMode = 'board'" [class.active]="viewMode === 'board'">Tableau 3D</button>
            <button type="button" (click)="viewMode = 'document'" [class.active]="viewMode === 'document'">Fiches</button>
          </div>
          <button type="button" (click)="resetActiveView()" title="Revenir à la vue générale" *ngIf="viewMode !== 'document'">Vue générale</button>
          <button type="button" class="settings-button" (click)="settingsOpen = true" [class.active]="settingsOpen" aria-haspopup="dialog">⚙ Paramètres</button>
        </div>
      </header>

      <aside class="left-panel">
        <div class="brand"><span class="mark large">A</span><h1>AFFICHE<br><span>TONFA</span></h1></div>
        <p class="manifesto">Cartographie documentaire<br>des réseaux et des faits.</p>
        <label class="search">
          <span>RECHERCHER</span>
          <input [(ngModel)]="query" (ngModelChange)="applyFilters()" placeholder="Nom, document, relation…">
          <i aria-hidden="true">⌕</i>
        </label>
        <nav class="categories" aria-label="Filtres par catégorie">
          <button *ngFor="let category of categories" type="button" (click)="toggleCategory(category)" [class.active]="activeCategories.has(category)">
            <span class="dot" [attr.data-category]="category"></span>{{ categoryLabels[category] }}<b>{{ count(category) }}</b>
          </button>
        </nav>
        <div class="results" *ngIf="query">
          <span class="section-label">RÉSULTATS</span>
          <button *ngFor="let node of searchResults" type="button" (click)="focus(node)"><small>{{ categoryLabels[node.category] }}</small><strong>{{ node.label }}</strong></button>
          <p *ngIf="searchResults.length === 0">Aucun résultat.</p>
        </div>
        <div class="notice"><span>TABLEAU EN CONSTRUCTION</span><p>Les fiches documentaires seront ajoutées et vérifiées une par une.</p></div>
      </aside>

      <main class="workspace">
        <div class="board-meta">
          <span>TABLEAU 01 / {{ graph?.nodes?.length || 0 }} FICHES</span>
          <span class="live pending">● DONNÉES EN COURS DE VÉRIFICATION</span>
        </div>
        <atf-mind-map #mindMap *ngIf="viewMode === 'mind'" [graph]="graph" [filters]="filters" [selectedNodeId]="selectedNode?.id" [selectedEdgeId]="selectedEdge?.id" [labelMode]="mindMapLabelMode" (nodeSelected)="selectNode($event)" (edgeSelected)="selectEdge($event)"></atf-mind-map>
        <atf-board-canvas #board *ngIf="viewMode === 'board'" [filters]="filters" [selectedNodeId]="selectedNode?.id" (graphLoaded)="onGraph($event)" (nodeSelected)="selectNode($event)" (edgeSelected)="selectEdge($event)"></atf-board-canvas>
        <section class="document-view" *ngIf="viewMode === 'document'" aria-label="Vue documentaire accessible">
          <div class="document-card" *ngFor="let node of filteredNodes" tabindex="0" (click)="selectNode(node)" (keydown.enter)="selectNode(node)">
            <span [attr.data-category]="node.category">{{ categoryLabels[node.category] }}</span><h2>{{ node.label }}</h2><p>{{ node.description }}</p><small>{{ node.sources.length }} source(s)</small>
          </div>
        </section>
        <div class="controls-hint" *ngIf="viewMode === 'mind'">glisser pour se déplacer · molette pour zoomer · cliquer pour ouvrir</div>
        <div class="controls-hint" *ngIf="viewMode === 'board'"><kbd>⇧</kbd> + glisser une fiche · molette pour zoomer · flèches au clavier</div>
      </main>

      <div class="settings-backdrop" *ngIf="settingsOpen" (click)="settingsOpen = false"></div>
      <aside class="settings-panel" [class.open]="settingsOpen" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <button class="settings-close" type="button" (click)="settingsOpen = false" aria-label="Fermer les paramètres">×</button>
        <span class="settings-eyebrow">PRÉFÉRENCES D’AFFICHAGE</span>
        <h2 id="settings-title">Paramètres</h2>
        <section>
          <h3>Carte à points</h3>
          <p>Choisissez quand les noms apparaissent autour des points.</p>
          <div class="setting-options" role="radiogroup" aria-label="Affichage des noms">
            <button type="button" role="radio" [attr.aria-checked]="mindMapLabelMode === 'nearby'" [class.selected]="mindMapLabelMode === 'nearby'" (click)="setMindMapLabelMode('nearby')">
              <span>Selon la proximité</span><small>Les noms apparaissent lorsque vous vous rapprochez.</small>
            </button>
            <button type="button" role="radio" [attr.aria-checked]="mindMapLabelMode === 'always'" [class.selected]="mindMapLabelMode === 'always'" (click)="setMindMapLabelMode('always')">
              <span>Toujours visibles</span><small>Les noms restent affichés quelle que soit la distance.</small>
            </button>
          </div>
        </section>
      </aside>

      <aside class="detail-panel" [class.open]="selectedNode || selectedEdge" aria-live="polite">
        <button class="close" type="button" (click)="closeDetails()" aria-label="Fermer le panneau">×</button>
        <ng-container *ngIf="selectedNode as node">
          <span class="detail-type" [attr.data-category]="node.category">{{ categoryLabels[node.category] }}</span>
          <h2>{{ node.label }}</h2><p class="lead">{{ node.summary }}</p>
          <div class="rule"></div><h3>NOTE DOCUMENTAIRE</h3><p>{{ node.description }}</p>
          <dl>
            <ng-container *ngIf="node.period"><dt>Période</dt><dd>{{ node.period.label || ((node.period.from || '?') + ' — ' + (node.period.to || 'présent')) }}</dd></ng-container>
            <ng-container *ngIf="node.location"><dt>Zone</dt><dd>{{ node.location }}</dd></ng-container>
            <ng-container *ngIf="node.status"><dt>Statut</dt><dd>{{ node.status }}</dd></ng-container>
          </dl>
          <h3>SOURCES ({{ node.sources.length }})</h3>
          <ol class="sources"><li *ngFor="let source of node.sources"><strong>{{ source.title }}</strong><span>{{ source.publisher }} · {{ displayDate(source.publishedAt) }}</span><em *ngIf="source.note">{{ source.note }}</em></li></ol>
          <h3>RELATIONS DIRECTES</h3>
          <button class="relation" *ngFor="let edge of relatedEdges(node.id)" type="button" (click)="selectEdge(edge)">{{ edge.label }}<span>→</span></button>
        </ng-container>
        <ng-container *ngIf="selectedEdge as edge">
          <span class="detail-type relation-tag">RELATION · {{ edge.type }}</span><h2>{{ edge.label }}</h2><p class="lead">{{ edge.description }}</p>
          <div class="rule"></div>
          <dl><dt>Source</dt><dd>{{ nodeLabel(edge.source) }}</dd><dt>Cible</dt><dd>{{ nodeLabel(edge.target) }}</dd><dt>Statut documentaire</dt><dd>{{ documentaryStatusLabel(edge.documentaryStatus) }}</dd><dt>Dernière vérification</dt><dd>{{ displayDate(edge.lastVerifiedAt) }}</dd></dl>
          <h3>SOURCES ({{ edge.sources.length }})</h3>
          <ol class="sources"><li *ngFor="let source of edge.sources"><strong>{{ source.title }}</strong><span>{{ source.publisher }} · {{ displayDate(source.publishedAt) }}</span><em *ngIf="source.note">{{ source.note }}</em></li></ol>
        </ng-container>
      </aside>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('board') board?: BoardCanvasComponent;
  @ViewChild('mindMap') mindMap?: MindMapComponent;
  readonly categories: NodeCategory[] = ['organization', 'person', 'case', 'event', 'document'];
  readonly categoryLabels = categoryLabels;
  graph?: InvestigationGraph;
  selectedNode: GraphNode | null = null;
  selectedEdge: GraphEdge | null = null;
  query = '';
  activeCategories = new Set<NodeCategory>();
  filters: BoardFilters = {};
  viewMode: 'mind' | 'board' | 'document' = 'mind';
  settingsOpen = false;
  mindMapLabelMode: 'nearby' | 'always' = 'nearby';

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    try {
      if (localStorage.getItem('atf.mindMapLabelMode') === 'always') this.mindMapLabelMode = 'always';
    } catch { /* Le stockage peut être désactivé par le navigateur. */ }
    void this.loadGraph();
  }

  get searchResults(): GraphNode[] {
    const value = this.query.trim().toLocaleLowerCase('fr');
    return !value ? [] : (this.graph?.nodes.filter((node) => this.searchableText(node).includes(value)).slice(0, 8) ?? []);
  }

  get filteredNodes(): GraphNode[] {
    const query = this.query.trim().toLocaleLowerCase('fr');
    return this.graph?.nodes.filter((node) => (!this.activeCategories.size || this.activeCategories.has(node.category)) && (!query || this.searchableText(node).includes(query))) ?? [];
  }

  onGraph(graph: InvestigationGraph): void { this.graph = graph; }
  selectNode(node: GraphNode | null): void { this.selectedNode = node; this.selectedEdge = null; }
  selectEdge(edge: GraphEdge | null): void { this.selectedEdge = edge; this.selectedNode = null; }
  closeDetails(): void { this.selectedNode = null; this.selectedEdge = null; this.board?.selectNode(''); this.board?.selectEdge(''); }
  focus(node: GraphNode): void { this.selectedNode = node; this.selectedEdge = null; this.board?.focusNode(node.id); this.mindMap?.focusNode(node.id); }
  resetActiveView(): void { this.viewMode === 'mind' ? this.mindMap?.resetView() : this.board?.resetCamera(); }
  setMindMapLabelMode(mode: 'nearby' | 'always'): void {
    this.mindMapLabelMode = mode;
    try { localStorage.setItem('atf.mindMapLabelMode', mode); } catch { /* Le réglage reste actif pour la session. */ }
  }
  toggleCategory(category: NodeCategory): void {
    this.activeCategories.has(category) ? this.activeCategories.delete(category) : this.activeCategories.add(category);
    this.activeCategories = new Set(this.activeCategories);
    this.applyFilters();
  }
  applyFilters(): void { this.filters = { query: this.query, categories: [...this.activeCategories] }; }
  count(category: NodeCategory): number { return this.graph?.nodes.filter((node) => node.category === category).length ?? 0; }
  nodeLabel(id: string): string { return this.graph?.nodes.find((node) => node.id === id)?.label ?? id; }
  relatedEdges(id: string): GraphEdge[] { return this.graph?.edges.filter((edge) => edge.source === id || edge.target === id) ?? []; }
  displayDate(value: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
  }
  documentaryStatusLabel(status: GraphEdge['documentaryStatus']): string {
    return { established: 'Établi par les sources', alleged: 'Mention à vérifier', disputed: 'Contesté', archived: 'Archivé' }[status];
  }
  private async loadGraph(): Promise<void> {
    this.graph = await new StaticJsonDataProvider('data/v1/graphs').loadGraph('demonstration');
    this.changeDetector.detectChanges();
  }
  private searchableText(node: GraphNode): string { return `${node.label} ${node.summary} ${node.description}`.toLocaleLowerCase('fr'); }
}
