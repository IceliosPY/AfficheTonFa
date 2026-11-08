import {
  AmbientLight, BoxGeometry, Color, CubicBezierCurve3, CylinderGeometry, DirectionalLight,
  Group, InstancedMesh, MathUtils, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Plane,
  PlaneGeometry, Quaternion, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
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
type EdgeBatch = InstancedMesh<CylinderGeometry, MeshStandardMaterial> & { userData: { kind: 'edge-batch' } };
type EdgeHitBatch = InstancedMesh<CylinderGeometry, MeshBasicMaterial> & { userData: { kind: 'edge-batch' } };

const LINK_SEGMENTS = 10;

export class InvestigationBoard {
  private readonly scene = new Scene();
  private readonly camera: PerspectiveCamera;
  private readonly renderer: WebGLRenderer;
  private readonly controls: OrbitControls;
  private readonly raycaster = new Raycaster();
  private readonly pointer = new Vector2();
  private readonly nodeMeshes = new Map<string, CardMesh>();
  private edgeBatch?: EdgeBatch;
  private edgeHitBatch?: EdgeHitBatch;
  private edgeIdsByInstance: string[] = [];
  private readonly environmentMeshes: Array<Mesh<PlaneGeometry | BoxGeometry, MeshStandardMaterial>> = [];
  private boardMesh?: Mesh<PlaneGeometry, MeshStandardMaterial>;
  private frameMeshes: Array<Mesh<BoxGeometry, MeshStandardMaterial>> = [];
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
  private defaultCameraDistance = 22;
  private readonly defaultCameraTarget = new Vector3();
  private boardBounds = { minX: -6.2, maxX: 6.2, minY: -3.8, maxY: 3.8 };
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
    this.controls.minDistance = 7; this.controls.maxDistance = 120;
    this.controls.minPolarAngle = 0; this.controls.maxPolarAngle = Math.PI;
    this.controls.target.set(options.camera?.targetX ?? 0, options.camera?.targetY ?? 0, options.camera?.targetZ ?? 0);
    this.createEnvironment();
    this.bindEvents();
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(container);
    this.resize(); this.animate();
  }

  loadGraph(graph: InvestigationGraph): void {
    this.clearGraph(); this.graph = graph; this.filters = this.options.initialFilters ?? {};
    const positions = calculateLayout(graph.nodes, graph.edges);
    this.resizeBoard(positions, graph.visual?.cameraDistance);
    for (const node of graph.nodes) {
      const position = positions.get(node.id); if (!position) continue;
      const card = this.createCard(node); card.position.set(position.x, position.y, position.z); card.rotation.z = position.rotation;
      this.scene.add(card); this.nodeMeshes.set(node.id, card);
    }
    this.createEdgeBatch(graph.edges.length);
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
    this.selectedEdgeId = id && this.graph?.edges.some((edge) => edge.id === id) ? id : undefined;
    this.rebuildEdges();
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
      from: this.camera.position.clone(),
      to: new Vector3(this.defaultCameraTarget.x, this.defaultCameraTarget.y, this.defaultCameraDistance),
      targetFrom: this.controls.target.clone(), targetTo: this.defaultCameraTarget.clone(), started: performance.now(),
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
      new PlaneGeometry(1, 1),
      new MeshStandardMaterial({ map: createBoardTexture(), color: '#ffffff', roughness: 1, metalness: 0 }),
    );
    board.position.z = -0.52; board.scale.set(12.8, 8.1, 1); board.receiveShadow = true;

    const frameMaterial = (): MeshStandardMaterial => new MeshStandardMaterial({ color: '#24150d', roughness: 0.72, metalness: 0.05 });
    const frameTop = new Mesh(new BoxGeometry(1, 1, 1), frameMaterial());
    const frameBottom = new Mesh(new BoxGeometry(1, 1, 1), frameMaterial());
    const frameLeft = new Mesh(new BoxGeometry(1, 1, 1), frameMaterial());
    const frameRight = new Mesh(new BoxGeometry(1, 1, 1), frameMaterial());
    frameTop.scale.set(13.55, 0.38, 0.34); frameBottom.scale.set(13.55, 0.38, 0.34);
    frameLeft.scale.set(0.38, 8.85, 0.34); frameRight.scale.set(0.38, 8.85, 0.34);
    frameTop.position.set(0, 4.25, -0.38); frameBottom.position.set(0, -4.25, -0.38);
    frameLeft.position.set(-6.58, 0, -0.38); frameRight.position.set(6.58, 0, -0.38);
    for (const rail of [frameTop, frameBottom, frameLeft, frameRight]) { rail.castShadow = true; rail.receiveShadow = true; }
    this.boardMesh = board; this.frameMeshes = [frameTop, frameBottom, frameLeft, frameRight];
    this.environmentMeshes.push(board, ...this.frameMeshes);
    this.scene.add(...this.environmentMeshes);

    this.scene.add(new AmbientLight('#d9c8ac', 1.8));
    const key = new DirectionalLight('#ffd9a3', 4.2); key.position.set(-6, 9, 13); key.castShadow = true; this.scene.add(key);
    const fill = new DirectionalLight('#7393a7', 1.3); fill.position.set(10, -3, 8); this.scene.add(fill);
  }

  private resizeBoard(positions: Map<string, { x: number; y: number }>, requestedDistance?: number): void {
    const values = [...positions.values()];
    const minX = values.length ? Math.min(...values.map((position) => position.x)) : 0;
    const maxX = values.length ? Math.max(...values.map((position) => position.x)) : 0;
    const minY = values.length ? Math.min(...values.map((position) => position.y)) : 0;
    const maxY = values.length ? Math.max(...values.map((position) => position.y)) : 0;
    const width = Math.max(12.8, maxX - minX + 5.2);
    const height = Math.max(8.1, maxY - minY + 4.2);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    this.boardMesh?.position.set(centerX, centerY, -0.52);
    this.boardMesh?.scale.set(width, height, 1);
    this.boardMesh?.material.map?.repeat.set(width / 12.8, height / 8.1);
    const [top, bottom, left, right] = this.frameMeshes;
    top?.position.set(centerX, centerY + height / 2 + 0.2, -0.38);
    bottom?.position.set(centerX, centerY - height / 2 - 0.2, -0.38);
    left?.position.set(centerX - width / 2 - 0.2, centerY, -0.38);
    right?.position.set(centerX + width / 2 + 0.2, centerY, -0.38);
    top?.scale.set(width + 0.75, 0.38, 0.34); bottom?.scale.set(width + 0.75, 0.38, 0.34);
    left?.scale.set(0.38, height + 0.75, 0.34); right?.scale.set(0.38, height + 0.75, 0.34);
    this.boardBounds = {
      minX: centerX - width / 2 + 1.7, maxX: centerX + width / 2 - 1.7,
      minY: centerY - height / 2 + 1.2, maxY: centerY + height / 2 - 1.2,
    };
    const halfFov = MathUtils.degToRad(this.camera.fov) / 2;
    const fitHeight = (height / 2) / Math.tan(halfFov);
    const fitWidth = (width / 2) / (Math.tan(halfFov) * this.camera.aspect);
    this.defaultCameraDistance = Math.max(requestedDistance ?? 0, Math.max(fitHeight, fitWidth) * 1.12);
    this.defaultCameraTarget.set(centerX, centerY, 0);
    this.camera.position.set(centerX, centerY, this.defaultCameraDistance);
    this.controls.target.copy(this.defaultCameraTarget);
    this.controls.maxDistance = Math.max(120, this.defaultCameraDistance * 4);
    this.camera.far = Math.max(120, this.controls.maxDistance * 1.4); this.camera.updateProjectionMatrix();
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

  private createEdgeBatch(edgeCount: number): void {
    if (!edgeCount) return;
    const batch = new InstancedMesh(
      new CylinderGeometry(0.035, 0.035, 1, 6),
      new MeshStandardMaterial({ color: '#ffffff', roughness: 0.72, metalness: 0.04 }),
      edgeCount * LINK_SEGMENTS,
    ) as EdgeBatch;
    batch.userData = { kind: 'edge-batch' }; batch.castShadow = true; batch.frustumCulled = false;
    const hitBatch = new InstancedMesh(
      new CylinderGeometry(0.22, 0.22, 1, 6),
      new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false }),
      edgeCount * LINK_SEGMENTS,
    ) as EdgeHitBatch;
    hitBatch.userData = { kind: 'edge-batch' }; hitBatch.frustumCulled = false;
    this.edgeBatch = batch; this.edgeHitBatch = hitBatch; this.scene.add(batch, hitBatch);
  }

  private rebuildEdges(): void {
    if (!this.graph || !this.edgeBatch) return;
    const matrix = new Matrix4();
    const quaternion = new Quaternion();
    const up = new Vector3(0, 1, 0);
    const scale = new Vector3();
    const midpoint = new Vector3();
    const direction = new Vector3();
    this.edgeIdsByInstance = [];
    let instanceIndex = 0;
    for (const edge of this.graph.edges) {
      const source = this.nodeMeshes.get(edge.source); const target = this.nodeMeshes.get(edge.target);
      if (!source?.visible || !target?.visible || !this.edgeMatchesFilters(edge)) continue;
      const start = source.position.clone().setZ(0.18); const end = target.position.clone().setZ(0.18);
      const distance = start.distanceTo(end);
      const slack = Math.min(1.8, 0.35 + distance * 0.08);
      const curve = new CubicBezierCurve3(
        start,
        start.clone().add(new Vector3(0, -slack, 0.48)),
        end.clone().add(new Vector3(0, -slack, 0.48)),
        end,
      );
      const points = curve.getPoints(LINK_SEGMENTS);
      const selected = this.selectedEdgeId === edge.id;
      const unrelated = this.selectedNodeId && edge.source !== this.selectedNodeId && edge.target !== this.selectedNodeId;
      const color = new Color(edge.color ?? '#a92e29');
      if (selected) color.lerp(new Color('#ffb08a'), 0.42);
      else if (unrelated) color.lerp(new Color('#211814'), 0.68);
      for (let segment = 0; segment < LINK_SEGMENTS; segment += 1) {
        const from = points[segment]; const to = points[segment + 1];
        if (!from || !to) continue;
        direction.subVectors(to, from);
        const length = direction.length();
        if (!length) continue;
        midpoint.addVectors(from, to).multiplyScalar(0.5);
        quaternion.setFromUnitVectors(up, direction.normalize());
        const thickness = selected ? 1.65 : 1;
        scale.set(thickness, length, thickness);
        matrix.compose(midpoint, quaternion, scale);
        this.edgeBatch.setMatrixAt(instanceIndex, matrix);
        this.edgeHitBatch?.setMatrixAt(instanceIndex, matrix);
        this.edgeBatch.setColorAt(instanceIndex, color);
        this.edgeIdsByInstance[instanceIndex] = edge.id;
        instanceIndex += 1;
      }
    }
    this.edgeBatch.count = instanceIndex;
    this.edgeBatch.instanceMatrix.needsUpdate = true;
    if (this.edgeHitBatch) { this.edgeHitBatch.count = instanceIndex; this.edgeHitBatch.instanceMatrix.needsUpdate = true; }
    if (this.edgeBatch.instanceColor) this.edgeBatch.instanceColor.needsUpdate = true;
  }

  private edgeMatchesFilters(edge: GraphEdge): boolean {
    const typeMatch = !this.filters.relationTypes?.length || this.filters.relationTypes.includes(edge.type);
    const statusMatch = !this.filters.documentaryStatuses?.length || (edge.documentaryStatus !== undefined && this.filters.documentaryStatuses.includes(edge.documentaryStatus));
    return typeMatch && statusMatch;
  }

  private applyFilters(): void {
    if (!this.graph) return;
    const query = this.filters.query?.trim().toLocaleLowerCase('fr') ?? '';
    for (const node of this.graph.nodes) {
      const categoryMatch = !this.filters.categories?.length || this.filters.categories.includes(node.category);
      const text = `${node.label} ${node.summary ?? ''} ${node.description ?? ''} ${(node.aliases ?? []).join(' ')}`.toLocaleLowerCase('fr');
      const queryMatch = !query || text.includes(query); const mesh = this.nodeMeshes.get(node.id); if (mesh) mesh.visible = categoryMatch && queryMatch;
    }
    this.updateFocusVisibility();
  }

  private updateFocusVisibility(): void {
    if (!this.graph) return;
    const connected = new Set<string>();
    if (this.selectedNodeId) for (const edge of this.graph.edges) if (edge.source === this.selectedNodeId || edge.target === this.selectedNodeId) { connected.add(edge.source); connected.add(edge.target); }
    for (const [id, mesh] of this.nodeMeshes) mesh.material.opacity = !this.selectedNodeId || connected.has(id) ? 1 : 0.28;
    this.rebuildEdges();
  }

  private updateCardTexture(id: string, selected: boolean): void {
    const mesh = this.nodeMeshes.get(id); const node = this.graph?.nodes.find(item => item.id === id); if (!mesh || !node) return;
    mesh.material.map?.dispose(); mesh.material.map = createCardTexture(node, selected); mesh.material.needsUpdate = true;
  }

  private bindEvents(): void {
    const canvas = this.renderer.domElement;
    const onPointerDown = (event: PointerEvent): void => {
      const hit = this.pick(event);
      if (hit?.object.userData['kind'] === 'node') {
        const node = hit.object as CardMesh; this.selectNode(node.userData.id);
        if (this.options.enableDrag !== false && event.shiftKey) { this.dragging = node; this.controls.enabled = false; canvas.setPointerCapture(event.pointerId); }
      } else if (hit?.object.userData['kind'] === 'edge-batch' && hit.instanceId !== undefined) {
        this.selectEdge(this.edgeIdsByInstance[hit.instanceId]);
      }
      else { this.selectNode(); this.selectEdge(); }
    };
    const onPointerMove = (event: PointerEvent): void => {
      if (!this.dragging) { const hit = this.pick(event); canvas.style.cursor = hit?.object.userData['kind'] === 'node' || hit?.object.userData['kind'] === 'edge-batch' ? 'pointer' : 'grab'; return; }
      this.setPointer(event); const point = new Vector3(); this.raycaster.setFromCamera(this.pointer, this.camera);
      if (this.raycaster.ray.intersectPlane(this.dragPlane, point)) {
        this.dragging.position.x = MathUtils.clamp(point.x, this.boardBounds.minX, this.boardBounds.maxX);
        this.dragging.position.y = MathUtils.clamp(point.y, this.boardBounds.minY, this.boardBounds.maxY);
        this.rebuildEdges();
      }
    };
    const onPointerLeave = (): void => { if (!this.dragging) canvas.style.cursor = 'grab'; };
    const onPointerUp = (event: PointerEvent): void => { if (this.dragging) canvas.releasePointerCapture(event.pointerId); this.dragging = undefined; this.controls.enabled = true; };
    const onKey = (event: KeyboardEvent): void => {
      if (this.options.enableKeyboard === false) return; const step = event.shiftKey ? 1.2 : 0.55;
      if (event.key === 'ArrowLeft') this.controls.target.x -= step; else if (event.key === 'ArrowRight') this.controls.target.x += step;
      else if (event.key === 'ArrowUp') this.controls.target.y += step; else if (event.key === 'ArrowDown') this.controls.target.y -= step;
      else if (event.key === '+' || event.key === '=') this.camera.position.z = Math.max(7, this.camera.position.z - 1.5);
      else if (event.key === '-') this.camera.position.z = Math.min(this.controls.maxDistance, this.camera.position.z + 1.5); else if (event.key === 'Home') this.resetCamera(); else return;
      event.preventDefault();
    };
    const onCamera = (): void => this.emit('camera-changed', this.getCameraState());
    canvas.addEventListener('pointerdown', onPointerDown); canvas.addEventListener('pointermove', onPointerMove); canvas.addEventListener('pointerleave', onPointerLeave); canvas.addEventListener('pointerup', onPointerUp); canvas.addEventListener('keydown', onKey); this.controls.addEventListener('end', onCamera);
    this.subscriptions.push(() => canvas.removeEventListener('pointerdown', onPointerDown), () => canvas.removeEventListener('pointermove', onPointerMove), () => canvas.removeEventListener('pointerleave', onPointerLeave), () => canvas.removeEventListener('pointerup', onPointerUp), () => canvas.removeEventListener('keydown', onKey), () => this.controls.removeEventListener('end', onCamera));
  }

  private pick(event: PointerEvent): { object: Mesh; instanceId?: number } | undefined {
    this.setPointer(event); this.raycaster.setFromCamera(this.pointer, this.camera);
    const objects: Mesh[] = [...this.nodeMeshes.values()]; if (this.edgeHitBatch) objects.push(this.edgeHitBatch);
    return this.raycaster.intersectObjects(objects, false).find((hit) => hit.object.visible) as { object: Mesh; instanceId?: number } | undefined;
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
    for (const mesh of this.nodeMeshes.values()) { this.scene.remove(mesh); mesh.geometry.dispose(); mesh.material.map?.dispose(); mesh.material.dispose(); }
    if (this.edgeBatch) {
      this.scene.remove(this.edgeBatch); this.edgeBatch.geometry.dispose(); this.edgeBatch.material.dispose(); this.edgeBatch = undefined;
    }
    if (this.edgeHitBatch) {
      this.scene.remove(this.edgeHitBatch); this.edgeHitBatch.geometry.dispose(); this.edgeHitBatch.material.dispose(); this.edgeHitBatch = undefined;
    }
    this.nodeMeshes.clear(); this.edgeIdsByInstance = []; this.selectedNodeId = undefined; this.selectedEdgeId = undefined; this.graph = undefined;
  }
  private emit<K extends keyof BoardEventMap>(name: K, detail: BoardEventMap[K]): void { this.container.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true })); }
}
