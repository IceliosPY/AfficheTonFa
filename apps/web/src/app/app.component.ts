import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
    <div class="app-shell" id="top">
      <header class="topbar">
        <div class="brand-small"><span class="mark">A</span><span>AFFICHE<span>TONFA</span></span></div>
        <div class="context"><span class="eyebrow">DOSSIER ACTIF</span><strong>{{ graph?.title || 'Chargement…' }}</strong></div>
        <div class="top-actions">
          <div class="view-switch" aria-label="Choisir la présentation">
            <button type="button" (click)="viewMode = 'mind'" [class.active]="viewMode === 'mind'">Carte mentale</button>
            <button type="button" (click)="viewMode = 'board'" [class.active]="viewMode === 'board'">Tableau 3D</button>
            <button type="button" (click)="viewMode = 'document'" [class.active]="viewMode === 'document'">Fiches</button>
          </div>
          <button type="button" class="settings-button" (click)="settingsOpen = true" [class.active]="settingsOpen" [attr.aria-expanded]="settingsOpen" aria-haspopup="dialog">⚙ Paramètres</button>
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
        <div class="notice"><span>CARTE PERSONNELLE</span><p>Les fiches et relations reflètent la ligne éditoriale de cette page.</p></div>
      </aside>

      <main class="workspace">
        <div class="board-meta">
          <span>TABLEAU 01 / {{ graph?.nodes?.length || 0 }} FICHES</span>
          <span class="live">● CARTE PERSONNELLE EN ÉVOLUTION</span>
        </div>
        <atf-mind-map #mindMap *ngIf="viewMode === 'mind'" [graph]="graph" [filters]="filters" [selectedNodeId]="selectedNode?.id" [selectedEdgeId]="selectedEdge?.id" [labelMode]="mindMapLabelMode" (nodeSelected)="selectNode($event)" (edgeSelected)="selectEdge($event)"></atf-mind-map>
        <atf-board-canvas #board *ngIf="viewMode === 'board'" [filters]="filters" [selectedNodeId]="selectedNode?.id" (graphLoaded)="onGraph($event)" (nodeSelected)="selectNode($event)" (edgeSelected)="selectEdge($event)"></atf-board-canvas>
        <section class="document-view" *ngIf="viewMode === 'document'" aria-label="Vue documentaire accessible">
          <div class="document-card" *ngFor="let node of filteredNodes" tabindex="0" (click)="selectNode(node)" (keydown.enter)="selectNode(node)">
            <span [attr.data-category]="node.category">{{ categoryLabels[node.category] }}</span><h2>{{ node.label }}</h2><p *ngIf="node.description">{{ node.description }}</p>
          </div>
        </section>
        <div class="controls-hint" *ngIf="viewMode === 'mind'">glisser pour se déplacer · molette pour zoomer · cliquer pour ouvrir</div>
        <div class="controls-hint" *ngIf="viewMode === 'board'"><kbd>⇧</kbd> + glisser une fiche · molette pour zoomer · flèches au clavier</div>
      </main>

      <div class="settings-backdrop" *ngIf="settingsOpen" (click)="settingsOpen = false"></div>
      <aside class="settings-panel" [class.open]="settingsOpen" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <header class="settings-header">
          <div><span class="settings-eyebrow">PRÉFÉRENCES</span><h2 id="settings-title">Paramètres</h2></div>
          <button class="settings-close" type="button" (click)="settingsOpen = false" aria-label="Fermer les paramètres">×</button>
        </header>
        <div class="settings-layout">
          <nav class="settings-menu" aria-label="Rubriques des paramètres">
            <button type="button" (click)="settingsSection = 'display'" [class.active]="settingsSection === 'display'"><span>◉</span><strong>Affichage</strong><small>Carte et libellés</small></button>
            <button type="button" (click)="settingsSection = 'navigation'" [class.active]="settingsSection === 'navigation'"><span>◇</span><strong>Navigation</strong><small>Vue au démarrage</small></button>
            <button type="button" class="reset-settings" (click)="resetSettings()"><span>↺</span><strong>Réinitialiser</strong><small>Valeurs par défaut</small></button>
          </nav>
          <div class="settings-content">
            <section *ngIf="settingsSection === 'display'">
              <span class="settings-section-number">01 / AFFICHAGE</span>
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
            <section *ngIf="settingsSection === 'navigation'">
              <span class="settings-section-number">02 / NAVIGATION</span>
              <h3>Vue au démarrage</h3>
              <p>Cette vue sera ouverte automatiquement lors de votre prochaine visite.</p>
              <div class="setting-options" role="radiogroup" aria-label="Vue au démarrage">
                <button type="button" role="radio" [attr.aria-checked]="defaultViewMode === 'mind'" [class.selected]="defaultViewMode === 'mind'" (click)="setDefaultViewMode('mind')"><span>Carte mentale</span><small>Réseau de points en trois dimensions.</small></button>
                <button type="button" role="radio" [attr.aria-checked]="defaultViewMode === 'board'" [class.selected]="defaultViewMode === 'board'" (click)="setDefaultViewMode('board')"><span>Tableau 3D</span><small>Fiches épinglées sur le tableau.</small></button>
                <button type="button" role="radio" [attr.aria-checked]="defaultViewMode === 'document'" [class.selected]="defaultViewMode === 'document'" (click)="setDefaultViewMode('document')"><span>Fiches</span><small>Lecture documentaire en grille.</small></button>
              </div>
            </section>
          </div>
        </div>
      </aside>

      <aside class="detail-panel" [class.open]="selectedNode || selectedEdge" aria-live="polite">
        <div class="detail-toolbar"><span>{{ selectedEdge ? 'RELATION' : 'FICHE' }}</span><button class="close" type="button" (click)="closeDetails()" aria-label="Fermer le panneau">×</button></div>
        <div class="detail-content">
        <ng-container *ngIf="selectedNode as node">
          <header class="detail-hero">
            <div class="detail-hero-layout">
              <div class="detail-hero-copy">
                <span class="detail-type" [attr.data-category]="node.category">{{ categoryLabels[node.category] }}</span>
                <h2>{{ node.label }}</h2>
              </div>
              <figure class="detail-portrait" *ngIf="node.imageUrl" [attr.data-category]="node.category">
                <img [src]="node.imageUrl" [alt]="node.category === 'organization' ? 'Logo de ' + node.label : 'Portrait de ' + node.label">
              </figure>
            </div>
          </header>
          <section class="detail-section" *ngIf="node.description">
            <div class="section-heading"><h3>Description</h3></div>
            <p>{{ node.description }}</p>
          </section>
          <section class="detail-section information-section" *ngFor="let informationSection of node.informationSections">
            <div class="section-heading"><h3>{{ informationSection.title }}</h3></div>
            <dl class="information-list">
              <div *ngFor="let item of informationSection.items"><dt>{{ item.label }}</dt><dd>{{ item.value }}</dd></div>
            </dl>
          </section>
          <section class="detail-section" *ngIf="relatedEdges(node.id).length">
            <div class="section-heading"><h3>Relations directes</h3><span>{{ relatedEdges(node.id).length }}</span></div>
            <button class="relation" *ngFor="let edge of relatedEdges(node.id)" type="button" (click)="selectEdge(edge)"><span><small>{{ relatedNodeLabel(edge, node.id) }}</small><strong>{{ edge.label }}</strong></span><b>→</b></button>
          </section>
        </ng-container>
        <ng-container *ngIf="selectedEdge as edge">
          <header class="detail-hero">
            <span class="detail-type relation-tag">RELATION · {{ edge.type }}</span><h2>{{ edge.label }}</h2><p class="lead">{{ edge.description }}</p>
          </header>
          <div class="relation-route"><span>{{ nodeLabel(edge.source) }}</span><i>→</i><span>{{ nodeLabel(edge.target) }}</span></div>
        </ng-container>
        </div>
      </aside>

      <footer class="site-footer">
        <div class="site-footer-inner">
          <p class="project-credit"><strong>AFFICHE TONFA</strong><span>·</span><span>un projet</span><img src="assets/logo-transfem-era.png" alt="Transfem Era"></p>
          <nav aria-label="Liens de pied de page">
            <a href="assets/nodes/credits.html" target="_blank">Crédits images</a>
            <a href="https://github.com/IceliosPY/AfficheTonFa" target="_blank" rel="noreferrer">Code source</a>
            <a href="#top">Haut de page ↑</a>
          </nav>
        </div>
      </footer>
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
  settingsSection: 'display' | 'navigation' = 'display';
  mindMapLabelMode: 'nearby' | 'always' = 'nearby';
  defaultViewMode: 'mind' | 'board' | 'document' = 'mind';

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    try {
      if (localStorage.getItem('atf.mindMapLabelMode') === 'always') this.mindMapLabelMode = 'always';
      const storedView = localStorage.getItem('atf.defaultViewMode');
      if (storedView === 'mind' || storedView === 'board' || storedView === 'document') this.defaultViewMode = this.viewMode = storedView;
    } catch { /* Le stockage peut être désactivé par le navigateur. */ }
    void this.loadGraph();
  }

  @HostListener('document:keydown.escape')
  closeSettingsWithEscape(): void { if (this.settingsOpen) this.settingsOpen = false; else if (this.selectedNode || this.selectedEdge) this.closeDetails(); }

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
  setMindMapLabelMode(mode: 'nearby' | 'always'): void {
    this.mindMapLabelMode = mode;
    try { localStorage.setItem('atf.mindMapLabelMode', mode); } catch { /* Le réglage reste actif pour la session. */ }
  }
  setDefaultViewMode(mode: 'mind' | 'board' | 'document'): void {
    this.defaultViewMode = mode;
    try { localStorage.setItem('atf.defaultViewMode', mode); } catch { /* Le réglage reste actif pour la session. */ }
  }
  resetSettings(): void {
    this.mindMapLabelMode = 'nearby'; this.defaultViewMode = 'mind';
    try { localStorage.removeItem('atf.mindMapLabelMode'); localStorage.removeItem('atf.defaultViewMode'); } catch { /* Le stockage peut être désactivé. */ }
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
  relatedNodeLabel(edge: GraphEdge, nodeId: string): string { return this.nodeLabel(edge.source === nodeId ? edge.target : edge.source); }
  private async loadGraph(): Promise<void> {
    this.graph = await new StaticJsonDataProvider('data/v1/graphs').loadGraph('demonstration');
    this.changeDetector.detectChanges();
  }
  private searchableText(node: GraphNode): string {
    const information = (node.informationSections ?? [])
      .flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.label, item.value])])
      .join(' ');
    return `${node.label} ${(node.aliases ?? []).join(' ')} ${node.summary ?? ''} ${node.description ?? ''} ${(node.tags ?? []).join(' ')} ${information}`.toLocaleLowerCase('fr');
  }
}
