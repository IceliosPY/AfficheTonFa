import type { GraphEdge, GraphNode } from '@affichetonfa/shared-types';

export interface LayoutPosition { x: number; y: number; z: number; rotation: number; }

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const COMPONENT_GAP = 4.5;

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function orderedComponents(nodes: GraphNode[], edges: GraphEdge[]): GraphNode[][] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const adjacency = new Map(nodes.map((node) => [node.id, new Set<string>()]));
  for (const edge of edges) {
    if (!byId.has(edge.source) || !byId.has(edge.target)) continue;
    adjacency.get(edge.source)?.add(edge.target);
    adjacency.get(edge.target)?.add(edge.source);
  }

  const remaining = new Set(nodes.map((node) => node.id));
  const components: GraphNode[][] = [];
  while (remaining.size) {
    const candidates = [...remaining].sort((left, right) => {
      const degreeDifference = (adjacency.get(right)?.size ?? 0) - (adjacency.get(left)?.size ?? 0);
      return degreeDifference || left.localeCompare(right);
    });
    const root = candidates[0]; if (!root) break;
    const queue = [root];
    const component: GraphNode[] = [];
    remaining.delete(root);
    while (queue.length) {
      const id = queue.shift();
      if (!id) continue;
      const node = byId.get(id);
      if (node) component.push(node);
      const neighbours = [...(adjacency.get(id) ?? [])]
        .filter((neighbour) => remaining.has(neighbour))
        .sort((left, right) => {
          const degreeDifference = (adjacency.get(right)?.size ?? 0) - (adjacency.get(left)?.size ?? 0);
          return degreeDifference || left.localeCompare(right);
        });
      for (const neighbour of neighbours) { remaining.delete(neighbour); queue.push(neighbour); }
    }
    components.push(component);
  }
  return components.sort((left, right) => right.length - left.length || (left[0]?.id ?? '').localeCompare(right[0]?.id ?? ''));
}

/**
 * Deterministic topology-aware placement. Connected nodes stay in the same compact
 * component, while explicit editorial positions always win.
 */
export function calculateLayout(nodes: GraphNode[], edges: GraphEdge[] = []): Map<string, LayoutPosition> {
  const positions = new Map<string, LayoutPosition>();
  const fixedNodes = nodes.filter((node) => node.position);
  const automaticNodes = nodes.filter((node) => !node.position);

  for (const node of fixedNodes) {
    const position = node.position!;
    positions.set(node.id, { x: position.x, y: position.y, z: position.z ?? 0.24, rotation: position.rotation ?? 0 });
  }
  if (!automaticNodes.length) return positions;

  const automaticIds = new Set(automaticNodes.map((node) => node.id));
  const automaticEdges = edges.filter((edge) => automaticIds.has(edge.source) && automaticIds.has(edge.target));
  const components = orderedComponents(automaticNodes, automaticEdges);
  const targetRowWidth = Math.max(18, Math.sqrt(automaticNodes.length) * 5.2);
  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;
  const provisional = new Map<string, LayoutPosition>();

  for (const component of components) {
    const componentId = component[0]?.id ?? '';
    const local = component.map((node, index) => {
      const radius = index === 0 ? 0 : 2 * Math.sqrt(index);
      const angle = index * GOLDEN_ANGLE + (hash(componentId) % 360) * Math.PI / 180;
      const seed = hash(node.id);
      return {
        node,
        x: Math.cos(angle) * radius * 1.25,
        y: Math.sin(angle) * radius,
        z: 0.22 + (seed % 7) * 0.008,
        rotation: ((seed % 13) - 6) * 0.006,
      };
    });
    const minX = Math.min(...local.map((item) => item.x)) - 1.7;
    const maxX = Math.max(...local.map((item) => item.x)) + 1.7;
    const minY = Math.min(...local.map((item) => item.y)) - 1.2;
    const maxY = Math.max(...local.map((item) => item.y)) + 1.2;
    const width = maxX - minX;
    const height = maxY - minY;
    if (cursorX > 0 && cursorX + width > targetRowWidth) {
      cursorX = 0;
      cursorY += rowHeight + COMPONENT_GAP;
      rowHeight = 0;
    }
    for (const item of local) {
      provisional.set(item.node.id, {
        x: cursorX + item.x - minX,
        y: cursorY + item.y - minY,
        z: item.z,
        rotation: item.rotation,
      });
    }
    cursorX += width + COMPONENT_GAP;
    rowHeight = Math.max(rowHeight, height);
  }

  const values = [...provisional.values()];
  const minX = Math.min(...values.map((position) => position.x));
  const maxX = Math.max(...values.map((position) => position.x));
  const minY = Math.min(...values.map((position) => position.y));
  const maxY = Math.max(...values.map((position) => position.y));
  const fixedRight = fixedNodes.length ? Math.max(...fixedNodes.map((node) => node.position!.x)) + 5 : undefined;
  const offsetX = fixedRight === undefined ? -(minX + maxX) / 2 : fixedRight - minX;
  const offsetY = -(minY + maxY) / 2;
  for (const [id, position] of provisional) {
    positions.set(id, { ...position, x: position.x + offsetX, y: position.y + offsetY });
  }
  return positions;
}
