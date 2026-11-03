import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { calculateMindMapLayout } from '@affichetonfa/board-core';
import type { BoardFilters, GraphEdge, GraphNode, InvestigationGraph } from '@affichetonfa/shared-types';
import {
  AdditiveBlending, Box3, BufferGeometry, CanvasTexture, Color, Float32BufferAttribute, FogExp2,
  LineBasicMaterial, LineSegments, PerspectiveCamera, Points, PointsMaterial, Raycaster, Scene,
  Sphere, SRGBColorSpace, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'atf-mind-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #host class="mind-host">
      <canvas #canvas aria-label="Graphe 3D interactif des relations"></canvas>
      <div #label class="node-label" aria-hidden="true"></div>
      <div class="loading" *ngIf="!graph">Organisation du réseau…</div>
      <div class="map-tools" aria-label="Contrôles du graphe 3D">
        <button type="button" (click)="zoomBy(1.22)" aria-label="Zoomer">+</button>
        <button type="button" (click)="zoomBy(1 / 1.22)" aria-label="Dézoomer">−</button>
        <button type="button" (click)="resetView()">Centrer</button>
      </div>
    </div>
  `,
  styles: [`
    :host,.mind-host{display:block;width:100%;height:100%;min-height:300px;position:relative;overflow:hidden;background:#211238}
    canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab}
    canvas:active{cursor:grabbing}
    .node-label{position:absolute;z-index:3;display:none;pointer-events:none;translate:10px -50%;padding:4px 7px;background:#1b102ee8;border:1px solid #ff559653;color:#ffe1ed;font:600 11px ui-sans-serif,system-ui,sans-serif;white-space:nowrap}
    .loading{position:absolute;left:50%;top:50%;translate:-50% -50%;padding:.75rem 1rem;background:#1b102ee8;border:1px solid #ff4b9138;color:#f5dae5;font-size:12px}
    .map-tools{position:absolute;right:16px;bottom:16px;display:flex;background:#1b102ed9;border:1px solid #ff4b912e}
    .map-tools button{min-width:34px;height:32px;border:0;border-right:1px solid #ff4b9124;background:transparent;color:#c99bb4;font:600 10px ui-monospace,monospace;cursor:pointer}
    .map-tools button:last-child{border-right:0;padding:0 11px}.map-tools button:hover{color:#fff;background:#ff4b9114}
  `],
})
export class MindMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('label', { static: true }) label!: ElementRef<HTMLElement>;
  @Input() graph?: InvestigationGraph;
  @Input() filters: BoardFilters = {};
  @Input() selectedNodeId?: string;
  @Input() selectedEdgeId?: string;
  @Output() readonly nodeSelected = new EventEmitter<GraphNode | null>();
  @Output() readonly edgeSelected = new EventEmitter<GraphEdge | null>();

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(48, 1, .05, 2000);
  private readonly raycaster = new Raycaster();
  private readonly pointer = new Vector2();
  private renderer?: WebGLRenderer;
  private controls?: OrbitControls;
  private pointCloud?: Points<BufferGeometry, PointsMaterial>;
  private edgeLines?: LineSegments<BufferGeometry, LineBasicMaterial>;
  private resizeObserver?: ResizeObserver;
  private animationFrame = 0;
  private initialized = false;
  private nodeIds: string[] = [];
  private edgeIds: string[] = [];
  private nodePositions = new Map<string, Vector3>();
  private defaultCamera = new Vector3(7, 5, 12);
  private defaultTarget = new Vector3();
  private readonly pointTexture = this.createPointTexture();

  ngAfterViewInit(): void {
    this.scene.background = new Color('#211238');
    this.renderer = new WebGLRenderer({ canvas: this.canvas.nativeElement, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); this.renderer.outputColorSpace = SRGBColorSpace;
    this.camera.position.copy(this.defaultCamera);
    this.controls = new OrbitControls(this.camera, this.canvas.nativeElement);
    this.controls.enableDamping = true; this.controls.dampingFactor = .065; this.controls.enableRotate = true;
    this.controls.minPolarAngle = 0; this.controls.maxPolarAngle = Math.PI;
    this.raycaster.params.Points = { threshold: .72 }; this.raycaster.params.Line = { threshold: .12 };
    this.canvas.nativeElement.addEventListener('pointermove', this.onPointerMove);
    this.canvas.nativeElement.addEventListener('pointerleave', this.onPointerLeave);
    this.canvas.nativeElement.addEventListener('click', this.onClick);
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(this.host.nativeElement);
    this.initialized = true; this.rebuildGraph(); this.resize(); this.animate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) this.rebuildGraph(Boolean(changes['graph'] || changes['filters']));
  }

  ngOnDestroy(): void {
    this.initialized = false; cancelAnimationFrame(this.animationFrame); this.resizeObserver?.disconnect();
    this.canvas.nativeElement.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.nativeElement.removeEventListener('pointerleave', this.onPointerLeave);
    this.canvas.nativeElement.removeEventListener('click', this.onClick);
    this.controls?.dispose(); this.clearGraph(); this.renderer?.dispose(); this.pointTexture.dispose();
  }

  resetView(): void {
    this.camera.position.copy(this.defaultCamera); this.controls?.target.copy(this.defaultTarget); this.controls?.update();
    this.nodeSelected.emit(null); this.edgeSelected.emit(null);
  }

  focusNode(id: string): void {
    const position = this.nodePositions.get(id); if (!position || !this.controls) return;
    const direction = this.camera.position.clone().sub(this.controls.target).normalize();
    this.controls.target.copy(position); this.camera.position.copy(position).addScaledVector(direction, Math.max(5, this.defaultCamera.distanceTo(this.defaultTarget) * .35)); this.controls.update();
  }

  zoomBy(factor: number): void {
    if (!this.controls) return;
    const offset = this.camera.position.clone().sub(this.controls.target).multiplyScalar(1 / factor);
    const distance = Math.min(this.controls.maxDistance, Math.max(this.controls.minDistance, offset.length()));
    this.camera.position.copy(this.controls.target).add(offset.normalize().multiplyScalar(distance)); this.controls.update();
  }

  private rebuildGraph(fitView = true): void {
    this.clearGraph(); const graph = this.graph; if (!graph || !this.renderer || !this.controls) return;
    const layout = calculateMindMapLayout(graph.nodes, graph.edges);
    const visibleNodes = graph.nodes.filter((node) => this.nodeVisible(node));
    const visibleIds = new Set(visibleNodes.map((node) => node.id));
    const depth = Math.max(3.5, Math.sqrt(visibleNodes.length) * .48);
    this.nodePositions = new Map(visibleNodes.map((node) => {
      const position = layout.get(node.id); const z = (this.hash(node.id) / 0xffffffff - .5) * depth * 2;
      return [node.id, new Vector3((position?.x ?? 0) * .02, -(position?.y ?? 0) * .02, z)];
    }));

    this.nodeIds = visibleNodes.map((node) => node.id);
    const pointPositions = this.nodeIds.flatMap((id) => this.nodePositions.get(id)?.toArray() ?? [0, 0, 0]);
    const pointColors = this.nodeIds.flatMap((id) => new Color(id === this.selectedNodeId ? '#ffd2e6' : '#ff3d8d').toArray());
    const pointGeometry = new BufferGeometry(); pointGeometry.setAttribute('position', new Float32BufferAttribute(pointPositions, 3)); pointGeometry.setAttribute('color', new Float32BufferAttribute(pointColors, 3));
    const pointMaterial = new PointsMaterial({ size: 24, sizeAttenuation: false, map: this.pointTexture, alphaTest: .08, transparent: true, vertexColors: true, blending: AdditiveBlending, depthWrite: false });
    this.pointCloud = new Points(pointGeometry, pointMaterial); this.scene.add(this.pointCloud);

    const visibleEdges = graph.edges.filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target) && this.edgeVisible(edge));
    this.edgeIds = visibleEdges.map((edge) => edge.id);
    const linePositions: number[] = []; const lineColors: number[] = [];
    for (const edge of visibleEdges) {
      const source = this.nodePositions.get(edge.source); const target = this.nodePositions.get(edge.target); if (!source || !target) continue;
      linePositions.push(...source.toArray(), ...target.toArray());
      const color = new Color(edge.id === this.selectedEdgeId ? '#ff8aba' : '#f02f7d'); lineColors.push(...color.toArray(), ...color.toArray());
    }
    const lineGeometry = new BufferGeometry(); lineGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3)); lineGeometry.setAttribute('color', new Float32BufferAttribute(lineColors, 3));
    this.edgeLines = new LineSegments(lineGeometry, new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: this.selectedEdgeId ? .86 : .6, depthWrite: false }));
    this.scene.add(this.edgeLines); if (fitView) this.fitCamera();
  }

  private fitCamera(): void {
    const values = [...this.nodePositions.values()]; if (!values.length || !this.controls) return;
    const box = new Box3().setFromPoints(values); const centre = box.getCenter(new Vector3()); const sphere = box.getBoundingSphere(new Sphere()); const radius = Math.max(2.8, sphere.radius);
    const distance = radius / Math.tan(this.camera.fov * Math.PI / 360) * 1.35;
    this.defaultTarget.copy(centre); this.defaultCamera.copy(centre).add(new Vector3(.68, .42, 1).normalize().multiplyScalar(distance));
    this.camera.near = Math.max(.02, distance / 500); this.camera.far = distance * 20; this.camera.updateProjectionMatrix();
    this.controls.minDistance = Math.max(.5, radius * .22); this.controls.maxDistance = distance * 8;
    this.scene.fog = new FogExp2('#211238', .055 / radius); this.camera.position.copy(this.defaultCamera); this.controls.target.copy(centre); this.controls.update();
  }

  private clearGraph(): void {
    if (this.pointCloud) { this.scene.remove(this.pointCloud); this.pointCloud.geometry.dispose(); this.pointCloud.material.dispose(); this.pointCloud = undefined; }
    if (this.edgeLines) { this.scene.remove(this.edgeLines); this.edgeLines.geometry.dispose(); this.edgeLines.material.dispose(); this.edgeLines = undefined; }
    this.nodeIds = []; this.edgeIds = []; this.nodePositions.clear(); this.hideLabel();
  }

  private resize(): void {
    if (!this.renderer) return; const width = this.host.nativeElement.clientWidth; const height = this.host.nativeElement.clientHeight;
    this.renderer.setSize(width, height, false); this.camera.aspect = Math.max(1, width) / Math.max(1, height); this.camera.updateProjectionMatrix();
  }

  private animate = (): void => {
    if (!this.initialized || !this.renderer) return; this.animationFrame = requestAnimationFrame(this.animate); this.controls?.update(); this.renderer.render(this.scene, this.camera);
  };

  private pick(event: PointerEvent, object: Points | LineSegments): ReturnType<Raycaster['intersectObject']>[number] | undefined {
    const bounds = this.canvas.nativeElement.getBoundingClientRect(); this.pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera); return this.raycaster.intersectObject(object, false)[0];
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.pointCloud || event.buttons) { this.hideLabel(); return; }
    const hit = this.pick(event, this.pointCloud); const id = hit?.index === undefined ? undefined : this.nodeIds[hit.index]; const node = this.graph?.nodes.find((item) => item.id === id);
    if (!node) { this.hideLabel(); this.canvas.nativeElement.style.cursor = 'grab'; return; }
    const bounds = this.host.nativeElement.getBoundingClientRect(); const label = this.label.nativeElement;
    label.textContent = node.label; label.style.left = `${event.clientX - bounds.left}px`; label.style.top = `${event.clientY - bounds.top}px`; label.style.display = 'block'; this.canvas.nativeElement.style.cursor = 'pointer';
  };
  private readonly onPointerLeave = (): void => { this.hideLabel(); };
  private readonly onClick = (event: PointerEvent): void => {
    if (this.pointCloud) {
      const pointHit = this.pick(event, this.pointCloud); const id = pointHit?.index === undefined ? undefined : this.nodeIds[pointHit.index];
      const node = this.graph?.nodes.find((item) => item.id === id); if (node) { this.nodeSelected.emit(node); return; }
    }
    if (this.edgeLines) {
      const lineHit = this.pick(event, this.edgeLines); const segment = lineHit?.index; const edgeId = segment === undefined ? undefined : this.edgeIds[Math.floor(segment / 2)];
      const edge = this.graph?.edges.find((item) => item.id === edgeId);
      if (edge) { this.edgeSelected.emit(edge); return; }
    }
    this.nodeSelected.emit(null); this.edgeSelected.emit(null);
  };

  private hideLabel(): void { if (this.label) this.label.nativeElement.style.display = 'none'; }
  private nodeVisible(node: GraphNode): boolean {
    const categories = this.filters.categories ?? []; const query = this.filters.query?.trim().toLocaleLowerCase('fr') ?? '';
    return (!categories.length || categories.includes(node.category)) && (!query || `${node.label} ${node.summary} ${node.description}`.toLocaleLowerCase('fr').includes(query));
  }
  private edgeVisible(edge: GraphEdge): boolean {
    const types = this.filters.relationTypes ?? []; const statuses = this.filters.documentaryStatuses ?? [];
    return (!types.length || types.includes(edge.type)) && (!statuses.length || statuses.includes(edge.documentaryStatus));
  }
  private hash(value: string): number { let result = 2166136261; for (const character of value) { result ^= character.charCodeAt(0); result = Math.imul(result, 16777619); } return result >>> 0; }
  private createPointTexture(): CanvasTexture {
    const canvas = document.createElement('canvas'); canvas.width = 64; canvas.height = 64; const context = canvas.getContext('2d');
    if (context) { const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32); gradient.addColorStop(0, '#fff'); gradient.addColorStop(.22, '#fff'); gradient.addColorStop(.48, '#ff4a94cc'); gradient.addColorStop(1, '#ff3d8d00'); context.fillStyle = gradient; context.fillRect(0, 0, 64, 64); }
    return new CanvasTexture(canvas);
  }
}
