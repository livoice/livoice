import { Router } from 'express';
import { chatWithTranscript } from '../domains/chat/service';
import { chatRequestSchema } from '../openapi/schemas/chatRequestSchema';

const router = Router();

router.post('/transcripts/:id/chat', async (req, res) => {
  const body = chatRequestSchema.parse(req.body);
  const answer = await chatWithTranscript({
    transcriptId: req.params.id,
    userMessage: body.userMessage,
    sessionId: body.sessionId
  });

  res.json(answer);
});

export default router;
