import { transcriptChunkSchema } from './transcriptChunkSchema';
import { z } from './zod';

export const chatResponseSchema = z
  .object({
    sessionId: z.string().openapi({ example: 'session-123' }),
    answer: z.string().openapi({ example: 'The interviewee mentioned that...' }),
    usedChunks: z.array(transcriptChunkSchema).openapi({ example: [] })
  })
  .openapi({
    example: {
      sessionId: 'session-123',
      answer: 'The interviewee mentioned that...',
      usedChunks: []
    }
  });
