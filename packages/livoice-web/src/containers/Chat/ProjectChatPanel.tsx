import { useTranslation } from 'react-i18next';

import { useChatProjectHistoryQuery, useChatProjectMutation } from '@/gql/generated';
import { useToast } from '@/hooks/useToast';
import ChatPanel, { type ChatMessageItem } from './ChatPanel';

type ProjectChatPanelProps = {
  projectId: string;
  projectName?: string | null;
};

export default function ProjectChatPanel({ projectId, projectName }: ProjectChatPanelProps) {
  const { t } = useTranslation('common');
  const toast = useToast();
  const { data, loading, refetch } = useChatProjectHistoryQuery({
    variables: { projectId },
    skip: !projectId
  });

  const [chatProject, { loading: isSending }] = useChatProjectMutation({
    onCompleted: () => {
      void refetch();
    },
    onError: error => {
      toast.showToast(error?.message || t('errors.somethingWentWrong'), 'error');
    }
  });

  const handleSend = async (message: string) => {
    await chatProject({
      variables: {
        input: {
          chatId: data?.chatProjectHistory?.chatId ?? null,
          projectId,
          message
        }
      }
    });
  };

  const messages: ChatMessageItem[] = data?.chatProjectHistory?.messages ?? [];

  return (
    <ChatPanel
      title={t('projects.chat.title')}
      subtitle={t('projects.chat.subtitle', { project: projectName ?? '' })}
      messages={messages}
      placeholder={t('projects.chat.placeholder')}
      isBusy={isSending || loading}
      onSend={handleSend}
    />
  );
}

