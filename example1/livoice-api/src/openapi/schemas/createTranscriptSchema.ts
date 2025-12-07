import { z } from './zod';

export const createTranscriptSchema = z
  .object({
    title: z.string().min(1).openapi({ example: 'Interview with John Doe' }),
    description: z.string().optional().openapi({ example: 'Product interview' }),
    intervieweeName: z.string().optional().openapi({ example: 'John Doe' }),
    transcriptDate: z
      .string()
      .refine(value => !Number.isNaN(Date.parse(value)), {
        message: 'Invalid date'
      })
      .openapi({ example: '2024-01-15T10:00:00Z', format: 'date-time' }),
    text: z.string().optional().openapi({ example: 'Full transcript text...' })
  })
  .openapi({
    example: {
      title: 'Interview with John Doe',
      description: 'Product interview',
      intervieweeName: 'John Doe',
      transcriptDate: '2024-01-15T10:00:00Z'
    }
  });
