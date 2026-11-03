import {
  AmbientLight, BoxGeometry, BufferGeometry, Color, CubicBezierCurve3, CylinderGeometry, DirectionalLight,
  Group, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Plane, PlaneGeometry, Raycaster,
  Scene, SphereGeometry, TubeGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { BoardFilters, BoardOptions, CameraState, GraphEdge, GraphNode, InvestigationGraph } from '@affichetonfa/shared-types';
import { createBoardTexture } from './board-texture';
import { createCardTexture } from './card-texture';
import { calculateLayout } from './layout';

export type BoardEventMap = {
  'board-ready': { graph: InvestigationGraph };
  'node-selected': { node: GraphNode | null };
  'edge-selected': { edge: GraphEdge | null };
  'camera-changed': CameraState;
  'board-error': { error: Error };
};

type CardMesh = Mesh<PlaneGeometry, MeshStandardMaterial> & { userData: { kind: 'node'; id: string } };
type EdgeMesh = Mesh<TubeGeometry, MeshStandardMaterial> & { userData: { kind: 'edge'; id: string } };

export class InvestigationBoard {
  private readonly scene = new Scene();
  private readonly camera: PerspectiveCamera;
  private readonly renderer: WebGLRenderer;
  private readonly controls: OrbitControls;
  private readonly raycaster = new Raycaster();
  private readonly pointer = new Vector2();
  private readonly nodeMeshes = new Map<string, CardMesh>();
  private readonly edgeMeshes = new Map<string, EdgeMesh>();
  private readonly environmentMeshes: Array<Mesh<PlaneGeometry | BoxGeometry, MeshStandardMaterial>> = [];
  private readonly subscriptions: Array<() => void> = [];
  private readonly resizeObserver: ResizeObserver;
  private graph?: InvestigationGraph;
  private animationFrame = 0;
  private selectedNodeId?: string;
  private selectedEdgeId?: string;
  private dragging?: CardMesh;
  private dragPlane = new Plane(new Vector3(0, 0, 1), -0.28);
  private filters: BoardFilters = {};
  private disposed = false;
  private cameraAnimation?: { from: Vector3; to: Vector3; targetFrom: Vector3; targetTo: Vector3; started: number };

  constructor(private readonly container: HTMLElement, private readonly options: BoardOptions = {}) {
    if (!container) throw new Error('Un conteneur est requis');
    this.scene.background = options.theme === 'light' ? new Color('#d7d1c5') : null;
    this.camera = new PerspectiveCamera(38, 1, 0.1, 120);
    this.camera.position.set(options.camera?.x ?? 0, options.camera?.y ?? 0, options.camera?.z ?? 22);
    this.renderer = new WebGLRenderer({ antialias: options.quality !== 'low', alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, options.quality === 'high' ? 2 : 1.5));
    this.renderer.shadowMap.enabled = options.quality !== 'low';
    this.renderer.domElement.className = 'investigation-board-canvas';
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.setAttribute('role', 'application');
    this.renderer.domElement.setAttribute('aria-label', "Tableau d'enquête interactif. Flèches pour déplacer la vue, plus et moins pour zoomer.");
    container.append(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; this.controls.dampingFactor = 0.075; this.controls.enableRotate = true;
    this.controls.minDistance = 7; this.controls.maxDistance = 42; this.controls.maxPolarAngle = Math.PI * 0.62;
    this.controls.target.set(options.camera?.targetX ?? 0, options.camera?.targetY ?? 0, options.camera?.targetZ ?? 0);
    this.createEnvironment();
    this.bindEvents();
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(container);
    this.resize(); this.animate();
  }

  loadGraph(graph: InvestigationGraph): void {
    this.clearGraph(); this.graph = graph; this.filters = this.options.initialFilters ?? {};
    if (graph.visual?.cameraDistance) this.camera.position.z = graph.visual.cameraDistance;
    const positions = calculateLayout(graph.nodes);
    for (const node of graph.nodes) {
      const position = positions.get(node.id); if (!position) continue;
      const card = this.createCard(node); card.position.set(position.x, position.y, position.z); card.rotation.z = position.rotation;
      this.scene.add(card); this.nodeMeshes.set(node.id, card);
    }
    for (const edge of graph.edges) this.createEdge(edge);
    this.applyFilters();
    if (this.options.selectedNodeId) this.selectNode(this.options.selectedNodeId);
    this.emit('board-ready', { graph });
  }

  selectNode(id?: string): void {
    const nextId = id && this.nodeMeshes.has(id) ? id : undefined;
    if (this.selectedNodeId === nextId) return;
    if (this.selectedNodeId) this.updateCardTexture(this.selectedNodeId, false);
    this.selectedNodeId = nextId;
    if (this.selectedNodeId) this.updateCardTexture(this.selectedNodeId, true);
    const node = this.graph?.nodes.find(item => item.id === this.selectedNodeId) ?? null;
    this.updateFocusVisibility(); this.emit('node-selected', { node });
  }

  selectEdge(id?: string): void {
    if (this.selectedEdgeId) this.edgeMeshes.get(this.selectedEdgeId)?.material.emissive.set('#000000');
    this.selectedEdgeId = id && this.edgeMeshes.has(id) ? id : undefined;
    if (this.selectedEdgeId) this.edgeMeshes.get(this.selectedEdgeId)?.material.emissive.set('#6b1515');
    const edge = this.graph?.edges.find(item => item.id === this.selectedEdgeId) ?? null;
    this.emit('edge-selected', { edge });
  }

  focusNode(id: string): void {
    const mesh = this.nodeMeshes.get(id); if (!mesh) return;
    this.selectNode(id);
    const target = mesh.position.clone(); target.z = 0;
    const destination = new Vector3(target.x, target.y, 10.5);
    if (this.options.reducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.camera.position.copy(destination); this.controls.target.copy(target); return;
    }
    this.cameraAnimation = { from: this.camera.position.clone(), to: destination, targetFrom: this.controls.target.clone(), targetTo: target, started: performance.now() };
  }

  resetCamera(): void {
    this.selectNode(); this.cameraAnimation = {
      from: this.camera.position.clone(), to: new Vector3(0, 0, 22), targetFrom: this.controls.target.clone(),
      targetTo: new Vector3(), started: performance.now(),
    };
  }

  setFilters(filters: BoardFilters): void { this.filters = { ...filters }; this.applyFilters(); }
  setTheme(theme: 'dark' | 'light'): void { this.scene.background = theme === 'light' ? new Color('#d7d1c5') : null; }

  getCameraState(): CameraState {
    return { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z, targetX: this.controls.target.x, targetY: this.controls.target.y, targetZ: this.controls.target.z };
  }

  destroy(): void {
    if (this.disposed) return; this.disposed = true; cancelAnimationFrame(this.animationFrame); this.resizeObserver.disconnect();
    for (const unsubscribe of this.subscriptions) unsubscribe(); this.clearGraph();
    for (const mesh of this.environmentMeshes) {
      this.scene.remove(mesh); mesh.geometry.dispose(); mesh.material.map?.dispose(); mesh.material.dispose();
    }
    this.controls.dispose(); this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private createEnvironment(): void {
    const board = new Mesh(
      new PlaneGeometry(12.8, 8.1),
      new MeshStandardMaterial({ map: createBoardTexture(), color: '#ffffff', roughness: 1, metalness: 0 }),
    );
    board.position.z = -0.52; board.receiveShadow = true;

    const frameMaterial = (): MeshStandardMaterial => new MeshStandardMaterial({ color: '#24150d', roughness: 0.72, metalness: 0.05 });
    const frameTop = new Mesh(new BoxGeometry(13.55, 0.38, 0.34), frameMaterial());
    const frameBottom = new Mesh(new BoxGeometry(13.55, 0.38, 0.34), frameMaterial());
    const frameLeft = new Mesh(new BoxGeometry(0.38, 8.85, 0.34), frameMaterial());
    const frameRight = new Mesh(new BoxGeometry(0.38, 8.85, 0.34), frameMaterial());
    frameTop.position.set(0, 4.25, -0.38); frameBottom.position.set(0, -4.25, -0.38);
    frameLeft.position.set(-6.58, 0, -0.38); frameRight.position.set(6.58, 0, -0.38);
    for (const rail of [frameTop, frameBottom, frameLeft, frameRight]) { rail.castShadow = true; rail.receiveShadow = true; }
    this.environmentMeshes.push(board, frameTop, frameBottom, frameLeft, frameRight);
    this.scene.add(...this.environmentMeshes);

    this.scene.add(new AmbientLight('#d9c8ac', 1.8));
    const key = new DirectionalLight('#ffd9a3', 4.2); key.position.set(-6, 9, 13); key.castShadow = true; this.scene.add(key);
    const fill = new DirectionalLight('#7393a7', 1.3); fill.position.set(10, -3, 8); this.scene.add(fill);
  }

  private createCard(node: GraphNode): CardMesh {
    const material = new MeshStandardMaterial({ map: createCardTexture(node), roughness: 0.82, metalness: 0, transparent: true });
    const card = new Mesh(new PlaneGeometry(3.05, 2), material) as CardMesh;
    card.userData = { kind: 'node', id: node.id }; card.castShadow = true; card.receiveShadow = true;
    const pin = new Group();
    const stem = new Mesh(new CylinderGeometry(0.04, 0.045, 0.24, 12), new MeshStandardMaterial({ color: '#6e1714', metalness: 0.2, roughness: 0.4 }));
    stem.rotation.x = Math.PI / 2; stem.position.z = 0.13;
    const head = new Mesh(new SphereGeometry(0.11, 16, 10), new MeshStandardMaterial({ color: '#b52620', metalness: 0.1, roughness: 0.32 })); head.position.z = 0.27;
    pin.add(stem, head); pin.position.y = 0.82; card.add(pin);
    return card;
  }

  private createEdge(edge: GraphEdge): void {
    const source = this.nodeMeshes.get(edge.source); const target = this.nodeMeshes.get(edge.target); if (!source || !target) return;
    const mesh = this.buildEdgeMesh(edge, source.position, target.position); this.scene.add(mesh); this.edgeMeshes.set(edge.id, mesh);
  }

  private buildEdgeMesh(edge: GraphEdge, source: Vector3, target: Vector3): EdgeMesh {
    const start = source.clone().setZ(0.16); const end = target.clone().setZ(0.16);
    const slack = Math.min(1.1, start.distanceTo(end) * 0.11);
    const curve = new CubicBezierCurve3(start, start.clone().add(new Vector3(0, -slack, 0.5)), end.clone().add(new Vector3(0, -slack, 0.5)), end);
    const geometry = new TubeGeometry(curve, 22, 0.035, 6, false);
    const material = new MeshStandardMaterial({ color: edge.color ?? '#9f2824', roughness: 0.72, metalness: 0.05 });
    const mesh = new Mesh(geometry, material) as EdgeMesh; mesh.userData = { kind: 'edge', id: edge.id }; mesh.castShadow = true; return mesh;
  }

  private updateEdgesForNode(nodeId: string): void {
    if (!this.graph) return;
    for (const edge of this.graph.edges.filter(item => item.source === nodeId || item.target === nodeId)) {
      const previous = this.edgeMeshes.get(edge.id); const source = this.nodeMeshes.get(edge.source); const target = this.nodeMeshes.get(edge.target);
      if (!previous || !source || !target) continue;
      const replacement = this.buildEdgeMesh(edge, source.position, target.position); replacement.visible = previous.visible;
      this.scene.remove(previous); previous.geometry.dispose(); previous.material.dispose(); this.scene.add(replacement); this.edgeMeshes.set(edge.id, replacement);
    }
  }

  private applyFilters(): void {
    if (!this.graph) return;
    const query = this.filters.query?.trim().toLocaleLowerCase('fr') ?? '';
    for (const node of this.graph.nodes) {
      const categoryMatch = !this.filters.categories?.length || this.filters.categories.includes(node.category);
      const text = `${node.label} ${node.summary} ${node.description} ${(node.aliases ?? []).join(' ')}`.toLocaleLowerCase('fr');
      const queryMatch = !query || text.includes(query); const mesh = this.nodeMeshes.get(node.id); if (mesh) mesh.visible = categoryMatch && queryMatch;
    }
    for (const edge of this.graph.edges) {
      const sourceVisible = this.nodeMeshes.get(edge.source)?.visible ?? false; const targetVisible = this.nodeMeshes.get(edge.target)?.visible ?? false;
      const typeMatch = !this.filters.relationTypes?.length || this.filters.relationTypes.includes(edge.type);
      const statusMatch = !this.filters.documentaryStatuses?.length || this.filters.documentaryStatuses.includes(edge.documentaryStatus);
      const mesh = this.edgeMeshes.get(edge.id); if (mesh) mesh.visible = sourceVisible && targetVisible && typeMatch && statusMatch;
    }
    this.updateFocusVisibility();
  }

  private updateFocusVisibility(): void {
    if (!this.graph) return;
    const connected = new Set<string>();
    if (this.selectedNodeId) for (const edge of this.graph.edges) if (edge.source === this.selectedNodeId || edge.target === this.selectedNodeId) { connected.add(edge.source); connected.add(edge.target); }
    for (const [id, mesh] of this.nodeMeshes) mesh.material.opacity = !this.selectedNodeId || connected.has(id) ? 1 : 0.28;
    for (const [id, mesh] of this.edgeMeshes) {
      const edge = this.graph.edges.find(item => item.id === id); mesh.material.opacity = !this.selectedNodeId || edge?.source === this.selectedNodeId || edge?.target === this.selectedNodeId ? 1 : 0.16; mesh.material.transparent = true;
    }
  }

  private updateCardTexture(id: string, selected: boolean): void {
    const mesh = this.nodeMeshes.get(id); const node = this.graph?.nodes.find(item => item.id === id); if (!mesh || !node) return;
    mesh.material.map?.dispose(); mesh.material.map = createCardTexture(node, selected); mesh.material.needsUpdate = true;
  }

  private bindEvents(): void {
    const canvas = this.renderer.domElement;
    const onPointerDown = (event: PointerEvent): void => {
      const hit = this.pick(event);
      if (hit?.userData['kind'] === 'node') {
        const node = hit as CardMesh; this.selectNode(node.userData.id);
        if (this.options.enableDrag !== false && event.shiftKey) { this.dragging = node; this.controls.enabled = false; canvas.setPointerCapture(event.pointerId); }
      } else if (hit?.userData['kind'] === 'edge') this.selectEdge((hit as EdgeMesh).userData.id);
      else { this.selectNode(); this.selectEdge(); }
    };
    const onPointerMove = (event: PointerEvent): void => {
      if (!this.dragging) return; this.setPointer(event); const point = new Vector3(); this.raycaster.setFromCamera(this.pointer, this.camera);
      if (this.raycaster.ray.intersectPlane(this.dragPlane, point)) { this.dragging.position.x = MathUtils.clamp(point.x, -8.2, 8.2); this.dragging.position.y = MathUtils.clamp(point.y, -5.1, 5.1); this.updateEdgesForNode(this.dragging.userData.id); }
    };
    const onPointerUp = (event: PointerEvent): void => { if (this.dragging) canvas.releasePointerCapture(event.pointerId); this.dragging = undefined; this.controls.enabled = true; };
    const onKey = (event: KeyboardEvent): void => {
      if (this.options.enableKeyboard === false) return; const step = event.shiftKey ? 1.2 : 0.55;
      if (event.key === 'ArrowLeft') this.controls.target.x -= step; else if (event.key === 'ArrowRight') this.controls.target.x += step;
      else if (event.key === 'ArrowUp') this.controls.target.y += step; else if (event.key === 'ArrowDown') this.controls.target.y -= step;
      else if (event.key === '+' || event.key === '=') this.camera.position.z = Math.max(7, this.camera.position.z - 1.5);
      else if (event.key === '-') this.camera.position.z = Math.min(42, this.camera.position.z + 1.5); else if (event.key === 'Home') this.resetCamera(); else return;
      event.preventDefault();
    };
    const onCamera = (): void => this.emit('camera-changed', this.getCameraState());
    canvas.addEventListener('pointerdown', onPointerDown); canvas.addEventListener('pointermove', onPointerMove); canvas.addEventListener('pointerup', onPointerUp); canvas.addEventListener('keydown', onKey); this.controls.addEventListener('end', onCamera);
    this.subscriptions.push(() => canvas.removeEventListener('pointerdown', onPointerDown), () => canvas.removeEventListener('pointermove', onPointerMove), () => canvas.removeEventListener('pointerup', onPointerUp), () => canvas.removeEventListener('keydown', onKey), () => this.controls.removeEventListener('end', onCamera));
  }

  private pick(event: PointerEvent): Mesh | undefined {
    this.setPointer(event); this.raycaster.setFromCamera(this.pointer, this.camera);
    return this.raycaster.intersectObjects([...this.nodeMeshes.values(), ...this.edgeMeshes.values()], false).find(hit => hit.object.visible)?.object as Mesh | undefined;
  }
  private setPointer(event: PointerEvent): void { const rect = this.renderer.domElement.getBoundingClientRect(); this.pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1); }
  private resize(): void { const width = Math.max(1, this.container.clientWidth); const height = Math.max(1, this.container.clientHeight); this.camera.aspect = width / height; this.camera.updateProjectionMatrix(); this.renderer.setSize(width, height, false); }
  private animate = (): void => {
    if (this.disposed) return; this.animationFrame = requestAnimationFrame(this.animate);
    if (this.cameraAnimation) {
      const progress = Math.min(1, (performance.now() - this.cameraAnimation.started) / 650); const eased = 1 - Math.pow(1 - progress, 3);
      this.camera.position.lerpVectors(this.cameraAnimation.from, this.cameraAnimation.to, eased); this.controls.target.lerpVectors(this.cameraAnimation.targetFrom, this.cameraAnimation.targetTo, eased);
      if (progress === 1) this.cameraAnimation = undefined;
    }
    this.controls.update(); this.renderer.render(this.scene, this.camera);
  };
  private clearGraph(): void {
    for (const mesh of [...this.nodeMeshes.values(), ...this.edgeMeshes.values()]) { this.scene.remove(mesh); mesh.geometry.dispose(); mesh.material.map?.dispose(); mesh.material.dispose(); }
    this.nodeMeshes.clear(); this.edgeMeshes.clear(); this.graph = undefined;
  }
  private emit<K extends keyof BoardEventMap>(name: K, detail: BoardEventMap[K]): void { this.container.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true })); }
}
