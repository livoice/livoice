import { z } from './zod';

export const uploadTextSchema = z
  .object({
    text: z.string().min(1).openapi({ example: 'Transcript text content...' }),
    timeline: z
      .array(
        z
          .object({
            absoluteTimestamp: z.number().openapi({ example: 3600 }),
            durationSeconds: z.number().optional().openapi({ example: 30 }),
            speaker: z.string().optional().openapi({ example: 'John Doe' })
          })
          .openapi({ example: { absoluteTimestamp: 3600, speaker: 'John Doe' } })
      )
      .optional()
  })
  .openapi({
    example: {
      text: 'Transcript text content...',
      timeline: [{ absoluteTimestamp: 3600, speaker: 'John Doe' }]
    }
  });
