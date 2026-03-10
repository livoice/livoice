import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ActorTypeType, QueryMode, type ActorLinkWhereInput, type ActorWhereInput, useActorNetworkQuery } from '@/gql/generated';
import { toActor, toActors } from '@/services/linker';
import { Badge, PageHeader, Switch, TextField } from '@/ui';
import { ActorDetailPanel } from './components/ActorDetailPanel';
import { ActorGraph } from './components/ActorGraph';

const typeLabels: Record<string, string> = {
  [ActorTypeType.Person]: 'Person',
  [ActorTypeType.Organization]: 'Organization',
  [ActorTypeType.Product]: 'Product',
  [ActorTypeType.Event]: 'Event',
  [ActorTypeType.Topic]: 'Topic',
  [ActorTypeType.Location]: 'Location',
  [ActorTypeType.Brand]: 'Brand',
  [ActorTypeType.Book]: 'Book',
  [ActorTypeType.Other]: 'Other'
};

export default function Actors() {
  const ACTORS_TAKE = 500;
  const LINKS_TAKE = 3000;

  const navigate = useNavigate();
  const { actorId = '' } = useParams<{ actorId: string }>();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [actorTypeFilter, setActorTypeFilter] = useState<string>('all');
  const [hideIsolated, setHideIsolated] = useState(false);
  const [selectedActorId, setSelectedActorId] = useState<string | undefined>(actorId || undefined);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearchTerm(searchTerm.trim()), 350);
    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);

  const actorBaseFilter = useMemo<ActorWhereInput>(() => {
    const filters: ActorWhereInput[] = [];
    if (debouncedSearchTerm) {
      filters.push({
        OR: [
          { name: { contains: debouncedSearchTerm, mode: QueryMode.Insensitive } },
          { description: { contains: debouncedSearchTerm, mode: QueryMode.Insensitive } }
        ]
      });
    }
    if (actorTypeFilter !== 'all') filters.push({ type: { equals: actorTypeFilter as ActorTypeType } });
    if (!filters.length) return {};
    return { AND: filters };
  }, [actorTypeFilter, debouncedSearchTerm]);

  const actorLinkWhere = useMemo<ActorLinkWhereInput>(() => {
    const hasActorBaseFilters = Boolean(actorBaseFilter.AND?.length);
    if (!hasActorBaseFilters) return {};
    return {
      OR: [{ fromActor: actorBaseFilter }, { toActor: actorBaseFilter }]
    };
  }, [actorBaseFilter]);

  const { data, loading, error } = useActorNetworkQuery({
    variables: {
      actorWhere: actorBaseFilter,
      actorLinkWhere,
      actorsTake: ACTORS_TAKE,
      linksTake: LINKS_TAKE
    }
  });

  useEffect(() => {
    setSelectedActorId(actorId || undefined);
  }, [actorId]);

  const actors = useMemo(
    () => (data?.actors ?? []).filter((actor): actor is NonNullable<typeof actor> => Boolean(actor)),
    [data?.actors]
  );
  const actorLinks = useMemo(
    () => (data?.actorLinks ?? []).filter((actorLink): actorLink is NonNullable<typeof actorLink> => Boolean(actorLink)),
    [data?.actorLinks]
  );

  const actorTypeOptions = useMemo(() => {
    const uniqueTypes = Array.from(new Set(actors.map(({ type }) => type).filter(Boolean)));
    return uniqueTypes.sort((firstType, secondType) => {
      const firstLabel = typeLabels[firstType ?? ''] ?? firstType ?? '';
      const secondLabel = typeLabels[secondType ?? ''] ?? secondType ?? '';
      return firstLabel.localeCompare(secondLabel);
    });
  }, [actors]);

  const onActorSelect = (nextActorId: string) => {
    setSelectedActorId(nextActorId);
    navigate(toActor({ actorId: nextActorId }));
  };

  const onPanelOpenChange = (isOpen: boolean) => {
    if (isOpen) return;
    setSelectedActorId(undefined);
    navigate(toActors());
  };

  const toolbar = (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
      <TextField
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        placeholder="Search actors..."
        className="w-full lg:w-[260px]"
      />
      <select
        value={actorTypeFilter}
        onChange={event => setActorTypeFilter(event.target.value)}
        className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      >
        <option value="all">All actor types</option>
        {actorTypeOptions.map(type => (
          <option key={type} value={type ?? ''}>
            {typeLabels[type ?? ''] ?? type}
          </option>
        ))}
      </select>
      <label className="flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-2 text-sm text-slate-700">
        <Switch checked={hideIsolated} onChange={event => setHideIsolated(event.target.checked)} />
        Hide isolated
      </label>
    </div>
  );

  return (
    <>
      <PageHeader
        title="Actor Network Explorer"
        description="Explore speakers, mentions, and links across all projects and sources."
        toolbar={toolbar}
      />

      {loading ? <div className="p-8 text-sm text-slate-500">Loading actor network...</div> : null}
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          Failed to load actor network
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <Badge variant="outline">Actors: {actors.length}</Badge>
            <Badge variant="outline">
              Links: {actorLinks.length}
            </Badge>
            <Badge variant="outline">Filter: {actorTypeFilter === 'all' ? 'All types' : (typeLabels[actorTypeFilter] ?? actorTypeFilter)}</Badge>
            <Badge variant="outline">Query caps: {ACTORS_TAKE} actors / {LINKS_TAKE} links</Badge>
          </div>

          <ActorGraph
            actors={actors}
            actorLinks={actorLinks}
            selectedActorId={selectedActorId}
            actorTypeFilter={actorTypeFilter}
            searchTerm={searchTerm}
            hideIsolated={hideIsolated}
            onActorSelect={onActorSelect}
          />
        </div>
      ) : null}

      <ActorDetailPanel
        actorId={selectedActorId}
        isOpen={Boolean(selectedActorId)}
        onOpenChange={onPanelOpenChange}
        onActorSelect={onActorSelect}
      />
    </>
  );
}
