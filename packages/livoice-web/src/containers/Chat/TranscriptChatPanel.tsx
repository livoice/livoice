import { useTranslation } from 'react-i18next';

import { useChatTranscriptHistoryQuery, useChatTranscriptMutation } from '@/gql/generated';
import { useToast } from '@/hooks/useToast';
import ChatPanel, { type ChatMessageItem } from './ChatPanel';

type TranscriptChatPanelProps = {
  transcriptId: string;
  transcriptTitle?: string | null;
};

export default function TranscriptChatPanel({ transcriptId, transcriptTitle }: TranscriptChatPanelProps) {
  const { t } = useTranslation('common');
  const toast = useToast();
  const { data, loading, refetch } = useChatTranscriptHistoryQuery({
    variables: { transcriptId },
    skip: !transcriptId
  });

  const [chatTranscript, { loading: isSending }] = useChatTranscriptMutation({
    onCompleted: () => {
      void refetch();
    },
    onError: error => {
      toast.showToast(error?.message || t('errors.somethingWentWrong'), 'error');
    }
  });

  const handleSend = async (message: string) => {
    await chatTranscript({
      variables: {
        input: {
          chatId: data?.chatTranscriptHistory?.chatId ?? null,
          transcriptId,
          message
        }
      }
    });
  };

  const messages: ChatMessageItem[] = data?.chatTranscriptHistory?.messages ?? [];

  return (
    <ChatPanel
      title={t('transcripts.chat.title')}
      subtitle={t('transcripts.chat.subtitle', { transcript: transcriptTitle ?? '' })}
      messages={messages}
      placeholder={t('transcripts.chat.placeholder')}
      isBusy={isSending || loading}
      onSend={handleSend}
    />
  );
}

