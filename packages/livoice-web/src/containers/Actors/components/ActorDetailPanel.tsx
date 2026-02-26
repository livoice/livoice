import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useActorDetailQuery } from '@/gql/generated';
import { toTranscript } from '@/services/linker';
import { Badge, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/ui';

interface ActorDetailPanelProps {
  actorId?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onActorSelect: (actorId: string) => void;
}

interface MentionGroup {
  transcriptId: string;
  transcriptTitle: string;
  sourceId?: string;
  sourceName: string;
  mentions: NonNullable<NonNullable<ReturnType<typeof useActorDetailQuery>['data']>['actor']>['mentions'];
}

const toLabel = (value: string) =>
  value
    .split('_')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const formatSegmentTime = (millis?: number | null) => {
  if (typeof millis !== 'number') return '';
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const ActorDetailPanel = ({ actorId, isOpen, onOpenChange, onActorSelect }: ActorDetailPanelProps) => {
  const { data, loading } = useActorDetailQuery({ variables: { id: actorId ?? '' }, skip: !actorId });
  const actor = data?.actor;

  const mentionGroups = useMemo<MentionGroup[]>(() => {
    const groupsByTranscript = new Map<string, MentionGroup>();
    (actor?.mentions ?? []).forEach(mention => {
      const transcriptId = mention?.transcript?.id ?? '';
      if (!transcriptId) return;
      const existingGroup = groupsByTranscript.get(transcriptId);
      if (existingGroup) {
        existingGroup.mentions = [...(existingGroup.mentions ?? []), mention];
        groupsByTranscript.set(transcriptId, existingGroup);
        return;
      }
      groupsByTranscript.set(transcriptId, {
        transcriptId,
        transcriptTitle: mention?.transcript?.title ?? 'Untitled transcript',
        sourceId: mention?.transcript?.source?.id ?? undefined,
        sourceName: mention?.transcript?.source?.name ?? 'Unknown source',
        mentions: [mention]
      });
    });
    return Array.from(groupsByTranscript.values());
  }, [actor?.mentions]);

  const connectedActors = useMemo(() => {
    const outgoing = (actor?.relatesTo ?? []).map(link => ({
      id: link?.toActor?.id ?? '',
      name: link?.toActor?.name ?? 'Unknown actor',
      type: link?.toActor?.type ?? null,
      relation: link?.linkType ? toLabel(link.linkType) : 'Connected'
    }));
    const incoming = (actor?.relatedFrom ?? []).map(link => ({
      id: link?.fromActor?.id ?? '',
      name: link?.fromActor?.name ?? 'Unknown actor',
      type: link?.fromActor?.type ?? null,
      relation: link?.linkType ? toLabel(link.linkType) : 'Connected'
    }));
    const deduplicated = new Map<string, (typeof outgoing)[number]>();
    [...outgoing, ...incoming].forEach(connection => {
      if (!connection.id) return;
      deduplicated.set(connection.id, connection);
    });
    return Array.from(deduplicated.values());
  }, [actor?.relatedFrom, actor?.relatesTo]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-[560px]">
        {!actorId ? null : loading ? (
          <div className="text-sm text-slate-500">Loading actor details...</div>
        ) : !actor ? (
          <div className="text-sm text-slate-500">Actor not found</div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>{actor.name ?? 'Unknown actor'}</SheetTitle>
              <SheetDescription className="space-y-2">
                <Badge variant="outline" className="w-fit">
                  {toLabel(actor.type ?? 'other')}
                </Badge>
                {actor.description ? <p>{actor.description}</p> : null}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 overflow-y-auto pr-1">
              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Speaker In</h3>
                {actor.speakerTranscripts?.length ? (
                  <div className="space-y-2">
                    {actor.speakerTranscripts.map(transcript => {
                      const sourceId = transcript?.source?.id ?? '';
                      if (!sourceId) {
                        return (
                          <div key={transcript?.id} className="rounded-xl border border-slate-200 bg-white/90 p-3 text-sm">
                            <p className="font-semibold text-slate-900">{transcript?.title ?? 'Untitled transcript'}</p>
                            <p className="text-xs text-slate-500">{transcript?.source?.name ?? 'Unknown source'}</p>
                          </div>
                        );
                      }
                      return (
                        <Link
                          key={transcript?.id}
                          to={toTranscript({ sourceId, transcriptId: transcript?.id ?? '' })}
                          className="block rounded-xl border border-slate-200 bg-white/90 p-3 text-sm transition hover:border-violet-300 hover:bg-violet-50/50"
                        >
                          <p className="font-semibold text-slate-900">{transcript?.title ?? 'Untitled transcript'}</p>
                          <p className="text-xs text-slate-500">{transcript?.source?.name ?? 'Unknown source'}</p>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No speaker transcript entries</p>
                )}
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Mentioned In</h3>
                {mentionGroups.length ? (
                  <div className="space-y-3">
                    {mentionGroups.map(group => (
                      <div key={group.transcriptId} className="rounded-2xl border border-slate-200 bg-white/90 p-3">
                        {group.sourceId ? (
                          <Link
                            to={toTranscript({ sourceId: group.sourceId, transcriptId: group.transcriptId })}
                            className="text-sm font-semibold text-violet-700 hover:underline"
                          >
                            {group.transcriptTitle}
                          </Link>
                        ) : (
                          <p className="text-sm font-semibold text-slate-900">{group.transcriptTitle}</p>
                        )}
                        <p className="text-xs text-slate-500">{group.sourceName}</p>
                        <div className="mt-3 space-y-2">
                          {(group.mentions ?? []).map(mention => (
                            <div key={mention?.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                {mention?.mentionType ? (
                                  <Badge variant="neutral">{toLabel(mention.mentionType)}</Badge>
                                ) : null}
                                {mention?.sentiment ? <Badge variant="outline">{toLabel(mention.sentiment)}</Badge> : null}
                                {mention?.emotion ? <Badge variant="outline">{toLabel(mention.emotion)}</Badge> : null}
                                {mention?.segment?.startMs || mention?.segment?.endMs ? (
                                  <span className="text-xs text-slate-500">
                                    {formatSegmentTime(mention?.segment?.startMs)} - {formatSegmentTime(mention?.segment?.endMs)}
                                  </span>
                                ) : null}
                              </div>
                              <p className="text-sm text-slate-700">{mention?.segment?.text ?? 'No segment quote available'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No mention entries found</p>
                )}
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Connected Actors</h3>
                {connectedActors.length ? (
                  <div className="space-y-2">
                    {connectedActors.map(connectedActor => (
                      <button
                        key={connectedActor.id}
                        type="button"
                        onClick={() => onActorSelect(connectedActor.id)}
                        className="w-full rounded-xl border border-slate-200 bg-white/90 p-3 text-left text-sm transition hover:border-violet-300 hover:bg-violet-50/50"
                      >
                        <p className="font-semibold text-slate-900">{connectedActor.name}</p>
                        <p className="text-xs text-slate-500">
                          {toLabel(connectedActor.type ?? 'other')} - {connectedActor.relation}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No connected actors</p>
                )}
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
