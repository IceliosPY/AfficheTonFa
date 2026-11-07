export type NodeCategory = 'organization' | 'person' | 'case' | 'event' | 'document';
export type RelationType = 'organizational' | 'historical' | 'judicial' | 'event' | 'documentary';
export type DocumentaryStatus = 'established' | 'alleged' | 'disputed' | 'archived';

export interface SourceReference { id: string; title: string; publisher: string; publishedAt: string; url?: string; accessedAt?: string; note?: string; }
export interface BoardPosition { x: number; y: number; z?: number; rotation?: number; }
export interface NodeInformationItem { label: string; value: string; }
export interface NodeInformationSection { id: string; title: string; items: NodeInformationItem[]; }
export interface GraphNode {
  id: string; label: string; category: NodeCategory; summary?: string; description?: string;
  aliases?: string[]; period?: { from?: string; to?: string; label?: string }; location?: string;
  status?: string; imageUrl?: string; tags?: string[]; position?: BoardPosition;
  sources?: SourceReference[]; informationSections?: NodeInformationSection[]; metadata?: Record<string, string | number | boolean | null>;
}
export interface GraphEdge {
  id: string; source: string; target: string; type: RelationType; label: string; description: string;
  period?: { from?: string; to?: string; label?: string }; documentaryStatus?: DocumentaryStatus;
  lastVerifiedAt?: string; sources?: SourceReference[]; color?: string;
}
export interface GraphVisualConfig { backgroundColor?: string; boardColor?: string; accentColor?: string; cameraDistance?: number; }
export interface InvestigationGraph {
  schemaVersion: '1.0'; id: string; title: string; description: string; notice: string; updatedAt: string;
  nodes: GraphNode[]; edges: GraphEdge[]; visual?: GraphVisualConfig;
}
export interface GraphSummary { id: string; title: string; description: string; dataUrl: string; }
export interface GraphIndex { schemaVersion: '1.0'; graphs: GraphSummary[]; }
export interface BoardFilters {
  categories?: NodeCategory[]; relationTypes?: RelationType[]; documentaryStatuses?: DocumentaryStatus[];
  dateFrom?: string; dateTo?: string; query?: string;
}
export interface CameraState { x: number; y: number; z: number; targetX: number; targetY: number; targetZ: number; }
export interface BoardOptions {
  theme?: 'dark' | 'light'; quality?: 'low' | 'medium' | 'high'; enableDrag?: boolean;
  enableKeyboard?: boolean; reducedMotion?: boolean; camera?: Partial<CameraState>;
  initialFilters?: BoardFilters; selectedNodeId?: string;
}
export interface DataProvider { loadGraph(graphId: string, signal?: AbortSignal): Promise<InvestigationGraph>; }
export interface ValidationIssue { path: string; message: string; }
export interface ValidationResult<T> { success: boolean; data?: T; issues: ValidationIssue[]; }

export * from './validation';
