import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useProjectChatsQuery } from '@/gql/generated';
import { toProjectChat, toProjectChatNew } from '@/services/linker';
import { buttonVariants } from '@/ui';
import { Card } from '@/ui/card';

type ChatListProps = {
  projectId: string;
};

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return '—';
  }
};

const ChatList = ({ projectId }: ChatListProps) => {
  const { t } = useTranslation('common');

  const heading = t('projects.chat.title');
  const emptyLabel = t('errors.noResultsFound', { label: heading });
  const buttonLabel = t('buttons.newChat');

  const { data: projectData, loading } = useProjectChatsQuery({
    variables: { projectId },
    skip: !projectId
  });

  const chats = projectData?.chats ?? [];

  if (!projectId) return null;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{heading}</h2>
        <Link
          to={toProjectChatNew({ projectId })}
          className={buttonVariants({ variant: 'default', className: 'text-sm font-semibold' })}
        >
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
              to={toProjectChat({ projectId, chatId: chat.id })}
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
