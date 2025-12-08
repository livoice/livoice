import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useProjectChatsQuery, useTranscriptChatsQuery } from '@/gql/generated';
import { toProjectChat, toProjectChatNew, toTranscriptChat, toTranscriptChatNew } from '@/services/linker';
import { buttonVariants } from '@/ui';
import { Card } from '@/ui/card';

type ChatListProps = {
  projectId?: string;
  transcriptId?: string;
};

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return '—';
  }
};

const ChatList = ({ projectId, transcriptId }: ChatListProps) => {
  const { t } = useTranslation('common');

  const isTranscriptContext = Boolean(transcriptId);
  const heading = isTranscriptContext ? t('transcripts.chat.title') : t('projects.chat.title');
  const emptyLabel = t('errors.noResultsFound', { label: heading });
  const buttonLabel = t('buttons.newChat');

  const { data: transcriptData, loading: transcriptLoading } = useTranscriptChatsQuery({
    variables: { transcriptId: transcriptId ?? '' },
    skip: !isTranscriptContext || !transcriptId
  });

  const { data: projectData, loading: projectLoading } = useProjectChatsQuery({
    variables: { projectId: projectId ?? '' },
    skip: isTranscriptContext || !projectId
  });

  const chats = isTranscriptContext ? (transcriptData?.chats ?? []) : (projectData?.chats ?? []);
  const loading = isTranscriptContext ? transcriptLoading : projectLoading;

  const buttonHref = isTranscriptContext
    ? toTranscriptChatNew({ projectId: projectId || '', transcriptId: transcriptId || '' })
    : toProjectChatNew({ projectId: projectId || '' });

  const itemHref = (chatId: string) =>
    isTranscriptContext
      ? toTranscriptChat({ projectId: projectId || '', transcriptId: transcriptId || '', chatId })
      : toProjectChat({ projectId: projectId || '', chatId });

  if (!projectId && !transcriptId) return null;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{heading}</h2>
        <Link to={buttonHref} className={buttonVariants({ variant: 'default', className: 'text-sm font-semibold' })}>
          {buttonLabel}
        </Link>
      </div>
      {loading ? (
        <p className="text-sm text-slate-500">{t('transcriptStatus.loading')}</p>
      ) : chats.length ? (
        <div className="space-y-2">
          {chats.map(chat => (
            <Link
              key={chat.id}
              to={itemHref(chat.id)}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary hover:bg-white"
            >
              <span>{chat.title || heading}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{formatDate(chat.createdAt)}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">{emptyLabel}</p>
      )}
    </Card>
  );
};

export default ChatList;
