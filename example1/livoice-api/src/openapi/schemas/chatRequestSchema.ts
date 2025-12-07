import { z } from './zod';

export const chatRequestSchema = z
  .object({
    userMessage: z.string().min(1).openapi({ example: 'What did the interviewee say about the product?' }),
    sessionId: z.string().optional().openapi({ example: 'session-123' })
  })
  .openapi({
    example: {
      userMessage: 'What did the interviewee say about the product?',
      sessionId: 'session-123'
    }
  });
