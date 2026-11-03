import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { BoardFilters, GraphEdge, GraphNode, InvestigationGraph, NodeCategory } from '@affichetonfa/shared-types';
import { BoardCanvasComponent } from './board-canvas.component';

const categoryLabels: Record<NodeCategory, string> = { organization: 'Organisations', person: 'Personnes', case: 'Affaires', event: 'Événements', document: 'Documents' };

@Component({
  selector: 'atf-main',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardCanvasComponent],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand-small"><span class="mark">A</span><span>AFFICHE<span>TONFA</span></span></div>
        <div class="context"><span class="eyebrow">DOSSIER ACTIF</span><strong>{{ graph?.title || 'Chargement…' }}</strong></div>
        <div class="top-actions">
          <button type="button" (click)="documentMode = !documentMode" [attr.aria-pressed]="documentMode">{{ documentMode ? 'Vue 3D' : 'Vue documentaire' }}</button>
          <button type="button" (click)="board?.resetCamera()" title="Revenir à la vue générale">Vue générale</button>
        </div>
      </header>

      <aside class="left-panel">
        <div class="brand"><span class="mark large">A</span><h1>AFFICHE<br><span>TONFA</span></h1></div>
        <p class="manifesto">Cartographie documentaire<br>des réseaux et des faits.</p>
        <label class="search"><span>RECHERCHER</span><input [(ngModel)]="query" (ngModelChange)="applyFilters()" placeholder="Nom, document, relation…"><i>⌕</i></label>
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
        <div class="board-meta"><span>TABLEAU 01 / {{ graph?.nodes?.length || 0 }} FICHES</span><span class="live">● DONNÉES VALIDÉES</span></div>
        <atf-board-canvas #board *ngIf="!documentMode" [filters]="filters" (graphLoaded)="onGraph($event)" (nodeSelected)="selectNode($event)" (edgeSelected)="selectEdge($event)"></atf-board-canvas>
        <div class="empty-board-state" *ngIf="!documentMode && graph && graph.nodes.length === 0">
          <span>TABLEAU VIDE</span>
          <strong>Prêt pour la première fiche</strong>
          <p>Les cartes et leurs liens seront ajoutés progressivement.</p>
        </div>
        <section class="document-view" *ngIf="documentMode" aria-label="Vue documentaire accessible">
          <div class="document-empty" *ngIf="filteredNodes.length === 0">
            <span>0 FICHE</span><h2>Le dossier est vide</h2><p>La première fiche documentaire sera ajoutée prochainement.</p>
          </div>
          <div class="document-card" *ngFor="let node of filteredNodes" tabindex="0" (click)="selectNode(node)" (keydown.enter)="selectNode(node)">
            <span [attr.data-category]="node.category">{{ categoryLabels[node.category] }}</span><h2>{{ node.label }}</h2><p>{{ node.description }}</p><small>{{ node.sources.length }} source(s)</small>
          </div>
        </section>
        <div class="controls-hint" *ngIf="!documentMode"><kbd>⇧</kbd> + glisser une fiche · molette pour zoomer · flèches au clavier</div>
      </main>

      <aside class="detail-panel" [class.open]="selectedNode || selectedEdge" aria-live="polite">
        <button class="close" type="button" (click)="closeDetails()" aria-label="Fermer le panneau">×</button>
        <ng-container *ngIf="selectedNode as node">
          <span class="detail-type" [attr.data-category]="node.category">{{ categoryLabels[node.category] }}</span>
          <h2>{{ node.label }}</h2><p class="lead">{{ node.summary }}</p>
          <div class="rule"></div><h3>NOTE DOCUMENTAIRE</h3><p>{{ node.description }}</p>
          <dl><ng-container *ngIf="node.period"><dt>Période</dt><dd>{{ node.period.label || ((node.period.from || '?') + ' — ' + (node.period.to || 'présent')) }}</dd></ng-container><ng-container *ngIf="node.location"><dt>Zone</dt><dd>{{ node.location }}</dd></ng-container><ng-container *ngIf="node.status"><dt>Statut</dt><dd>{{ node.status }}</dd></ng-container></dl>
          <h3>SOURCES ({{ node.sources.length }})</h3><ol class="sources"><li *ngFor="let source of node.sources"><strong>{{ source.title }}</strong><span>{{ source.publisher }} · {{ source.publishedAt | date:'dd/MM/yyyy' }}</span></li></ol>
          <h3>RELATIONS DIRECTES</h3><button class="relation" *ngFor="let edge of relatedEdges(node.id)" type="button" (click)="selectEdge(edge)">{{ edge.label }}<span>→</span></button>
        </ng-container>
        <ng-container *ngIf="selectedEdge as edge">
          <span class="detail-type relation-tag">RELATION · {{ edge.type }}</span><h2>{{ edge.label }}</h2><p class="lead">{{ edge.description }}</p>
          <div class="rule"></div><dl><dt>Source</dt><dd>{{ nodeLabel(edge.source) }}</dd><dt>Cible</dt><dd>{{ nodeLabel(edge.target) }}</dd><dt>Statut documentaire</dt><dd>{{ edge.documentaryStatus }}</dd><dt>Dernière vérification</dt><dd>{{ edge.lastVerifiedAt | date:'dd/MM/yyyy' }}</dd></dl>
          <h3>SOURCES ({{ edge.sources.length }})</h3><ol class="sources"><li *ngFor="let source of edge.sources"><strong>{{ source.title }}</strong><span>{{ source.publisher }} · {{ source.publishedAt | date:'dd/MM/yyyy' }}</span></li></ol>
        </ng-container>
      </aside>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('board') board?: BoardCanvasComponent;
  readonly categories: NodeCategory[] = ['organization', 'person', 'case', 'event', 'document'];
  readonly categoryLabels = categoryLabels;
  graph?: InvestigationGraph; selectedNode: GraphNode | null = null; selectedEdge: GraphEdge | null = null;
  query = ''; activeCategories = new Set<NodeCategory>(); filters: BoardFilters = {}; documentMode = false;
  get searchResults(): GraphNode[] { const value = this.query.trim().toLocaleLowerCase('fr'); return !value ? [] : (this.graph?.nodes.filter(node => `${node.label} ${node.summary} ${node.description}`.toLocaleLowerCase('fr').includes(value)).slice(0, 8) ?? []); }
  get filteredNodes(): GraphNode[] { return this.graph?.nodes.filter(node => (!this.activeCategories.size || this.activeCategories.has(node.category)) && (!this.query || `${node.label} ${node.summary} ${node.description}`.toLocaleLowerCase('fr').includes(this.query.toLocaleLowerCase('fr')))) ?? []; }
  onGraph(graph: InvestigationGraph): void { this.graph = graph; }
  selectNode(node: GraphNode | null): void { this.selectedNode = node; this.selectedEdge = null; }
  selectEdge(edge: GraphEdge | null): void { this.selectedEdge = edge; this.selectedNode = null; }
  closeDetails(): void { this.selectedNode = null; this.selectedEdge = null; this.board?.selectNode(''); }
  focus(node: GraphNode): void { this.selectedNode = node; this.selectedEdge = null; this.board?.focusNode(node.id); }
  toggleCategory(category: NodeCategory): void { this.activeCategories.has(category) ? this.activeCategories.delete(category) : this.activeCategories.add(category); this.activeCategories = new Set(this.activeCategories); this.applyFilters(); }
  applyFilters(): void { this.filters = { query: this.query, categories: [...this.activeCategories] }; }
  count(category: NodeCategory): number { return this.graph?.nodes.filter(node => node.category === category).length ?? 0; }
  nodeLabel(id: string): string { return this.graph?.nodes.find(node => node.id === id)?.label ?? id; }
  relatedEdges(id: string): GraphEdge[] { return this.graph?.edges.filter(edge => edge.source === id || edge.target === id) ?? []; }
}
