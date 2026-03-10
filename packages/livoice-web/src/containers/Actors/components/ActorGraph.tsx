import ForceGraph2D from 'react-force-graph-2d';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ForceGraphMethods, NodeObject } from 'react-force-graph-2d';

import type { ActorNetworkQuery } from '@/gql/generated';

type ActorListItem = NonNullable<NonNullable<ActorNetworkQuery['actors']>[number]>;
type ActorLinkListItem = NonNullable<NonNullable<ActorNetworkQuery['actorLinks']>[number]>;

export interface ActorGraphNode {
  id: string;
  name: string;
  type: string;
  imageUrl?: string | null;
  isMatch: boolean;
}

interface ActorGraphLink {
  id: string;
  source: string;
  target: string;
  kind: 'link';
  label: string;
  confidence: number;
}

interface ActorGraphProps {
  actors: ActorListItem[];
  actorLinks: ActorLinkListItem[];
  selectedActorId?: string;
  actorTypeFilter: string;
  searchTerm: string;
  hideIsolated: boolean;
  onActorSelect: (actorId: string) => void;
}

const ACTOR_TYPE_COLORS: Record<string, string> = {
  person: '#8b5cf6',
  organization: '#2563eb',
  product: '#10b981',
  event: '#f97316',
  topic: '#06b6d4',
  location: '#eab308',
  brand: '#ec4899',
  book: '#14b8a6',
  other: '#94a3b8'
};

const getActorTypeColor = (actorType?: string | null) => ACTOR_TYPE_COLORS[actorType ?? 'other'] ?? ACTOR_TYPE_COLORS.other;

const normalizeActorType = (actorType?: string | null) => actorType ?? 'other';

const toLabel = (value: string) =>
  value
    .split('_')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const ActorGraph = ({
  actors,
  actorLinks,
  selectedActorId,
  actorTypeFilter,
  searchTerm,
  hideIsolated,
  onActorSelect
}: ActorGraphProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<ForceGraphMethods<ActorGraphNode, ActorGraphLink> | undefined>(undefined);
  const [graphSize, setGraphSize] = useState({ width: 1000, height: 720 });

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const graphData = useMemo(() => {
    const filteredActors = actors.filter(actor => {
      const actorType = normalizeActorType(actor.type);
      if (actorTypeFilter !== 'all' && actorType !== actorTypeFilter) return false;
      if (!normalizedSearchTerm) return true;
      return (actor.name ?? '').toLowerCase().includes(normalizedSearchTerm);
    });

    const actorIdSet = new Set(filteredActors.map(({ id }) => id));

    const links = actorLinks
      .map(link => ({
        id: link.id,
        source: link?.fromActor?.id ?? '',
        target: link?.toActor?.id ?? '',
        kind: 'link' as const,
        label: link.linkType ? toLabel(link.linkType) : 'Connected',
        confidence: link.confidence ?? 0
      }))
      .filter(({ source, target }) => source && target && actorIdSet.has(source) && actorIdSet.has(target));

    const connectedActorIds = new Set(links.flatMap(({ source, target }) => [source, target]));
    const nodes = filteredActors
      .filter(actor => {
        if (!hideIsolated) return true;
        return connectedActorIds.has(actor.id);
      })
      .map(actor => ({
        id: actor.id,
        name: actor.name ?? 'Unknown actor',
        type: normalizeActorType(actor.type),
        imageUrl: actor.imageUrl,
        isMatch: normalizedSearchTerm
          ? (actor.name ?? '').toLowerCase().includes(normalizedSearchTerm)
          : false
      }));

    const visibleActorIds = new Set(nodes.map(({ id }) => id));
    return {
      nodes,
      links: links.filter(({ source, target }) => visibleActorIds.has(source) && visibleActorIds.has(target))
    };
  }, [actorLinks, actors, actorTypeFilter, hideIsolated, normalizedSearchTerm]);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateGraphSize = () => {
      if (!containerRef.current) return;
      setGraphSize({
        width: containerRef.current.clientWidth,
        height: Math.max(560, containerRef.current.clientHeight)
      });
    };
    updateGraphSize();
    const resizeObserver = new ResizeObserver(updateGraphSize);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedActorId || !graphRef.current) return;
    const selectedNode = graphData.nodes.find(({ id }) => id === selectedActorId);
    if (!selectedNode) return;
    // Keep selected actor centered to support drill-in navigation.
    graphRef.current.centerAt((selectedNode as NodeObject<ActorGraphNode>).x ?? 0, (selectedNode as NodeObject<ActorGraphNode>).y ?? 0, 400);
    graphRef.current.zoom(2.2, 400);
  }, [graphData.nodes, selectedActorId]);

  if (!graphData.nodes.length)
    return (
      <div className="flex min-h-[560px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 text-sm text-slate-500">
        No actors match the current filters
      </div>
    );

  return (
    <div ref={containerRef} className="h-[72vh] min-h-[560px] w-full overflow-hidden rounded-3xl border border-white/70 bg-white/80">
      <ForceGraph2D
        ref={graphRef}
        width={graphSize.width}
        height={graphSize.height}
        graphData={graphData}
        nodeRelSize={5}
        nodeLabel={(node: NodeObject<ActorGraphNode>) => {
          const actorNode = node as ActorGraphNode;
          return `${actorNode.name} (${toLabel(actorNode.type)})`;
        }}
        nodeCanvasObject={(node: NodeObject<ActorGraphNode>, canvasContext, globalScale) => {
          const actorNode = node as ActorGraphNode;
          const fontSize = Math.max(11, 15 / globalScale);
          const actorTypeColor = getActorTypeColor(actorNode.type);
          const isSelected = actorNode.id === selectedActorId;
          const nodeRadius = isSelected ? 11 : actorNode.isMatch ? 9 : 7;

          canvasContext.beginPath();
          canvasContext.arc(node.x ?? 0, node.y ?? 0, nodeRadius, 0, 2 * Math.PI, false);
          canvasContext.fillStyle = actorTypeColor;
          canvasContext.fill();

          if (isSelected || actorNode.isMatch) {
            canvasContext.lineWidth = isSelected ? 3 : 2;
            canvasContext.strokeStyle = isSelected ? '#0f172a' : '#22c55e';
            canvasContext.stroke();
          }

          canvasContext.font = `${fontSize}px Inter, system-ui, sans-serif`;
          canvasContext.fillStyle = '#0f172a';
          canvasContext.fillText(
            actorNode.name,
            (node.x ?? 0) + nodeRadius + 2,
            (node.y ?? 0) + fontSize / 3
          );
        }}
        linkLabel={(link: object) => (link as ActorGraphLink).label}
        linkColor="#94a3b8"
        linkWidth={1.8}
        cooldownTicks={120}
        onNodeClick={node => onActorSelect((node as ActorGraphNode).id)}
      />
    </div>
  );
};
