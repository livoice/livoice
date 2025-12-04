import { z } from './zod';

export const transcriptChunkSchema = z
  .object({
    id: z.string().openapi({ example: 'chunk-123' }),
    speaker: z.string().nullable().openapi({ example: 'John Doe' }),
    text: z.string().openapi({ example: 'This is a transcript chunk...' }),
    absoluteTimestamp: z.number().nullable().openapi({ example: 3600 }),
    durationSeconds: z.number().nullable().openapi({ example: 30 })
  })
  .openapi({
    example: {
      id: 'chunk-123',
      speaker: 'John Doe',
      text: 'This is a transcript chunk...',
      absoluteTimestamp: 3600,
      durationSeconds: 30
    }
  });
