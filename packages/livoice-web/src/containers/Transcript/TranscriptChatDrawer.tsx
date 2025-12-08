import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';

import FormDrawer from '@/components/FormDrawer/FormDrawer';
import TranscriptChatPanel from '@/containers/Chat/TranscriptChatPanel';
import { toTranscript, toTranscriptChat } from '@/services/linker';

interface TranscriptChatOutletContext {
  transcriptId: string;
  transcriptTitle: string;
  selectedChatId: string | null;
  isNewChatRoute: boolean;
}

export default function TranscriptChatDrawer() {
  const { t } = useTranslation('common');
  const { chatId = '' } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { transcriptId, transcriptTitle, selectedChatId, isNewChatRoute } =
    useOutletContext<TranscriptChatOutletContext>();

  const open = location.pathname.endsWith('/chat/new') || Boolean(chatId);

  return (
    <FormDrawer
      open={open}
      title={transcriptTitle || t('transcripts.chat.title')}
      onClose={() => navigate(toTranscript({ transcriptId }))}
      onSubmit={() => {}}
    >
      <TranscriptChatPanel
        transcriptId={transcriptId}
        transcriptTitle={transcriptTitle}
        chatId={selectedChatId}
        isNew={isNewChatRoute || chatId === 'new'}
        onChatCreated={newChatId => {
          window.history.replaceState(null, '', toTranscriptChat({ transcriptId, chatId: newChatId }));
        }}
      />
    </FormDrawer>
  );
}
