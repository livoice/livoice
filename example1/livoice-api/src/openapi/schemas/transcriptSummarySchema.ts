import { z } from './zod';

export const transcriptSummarySchema = z
  .object({
    id: z.string().openapi({ example: 'clx123abc' }),
    title: z.string().openapi({ example: 'Interview with John Doe' }),
    description: z.string().nullable().openapi({ example: 'Product interview' }),
    intervieweeName: z.string().nullable().openapi({ example: 'John Doe' }),
    transcriptDate: z.string().datetime().openapi({ example: '2024-01-15T10:00:00Z' }),
    createdAt: z.string().datetime().openapi({ example: '2024-01-15T10:00:00Z' }),
    updatedAt: z.string().datetime().openapi({ example: '2024-01-15T10:00:00Z' }),
    chunkCount: z.number().openapi({ example: 42 })
  })
  .openapi({
    example: {
      id: 'clx123abc',
      title: 'Interview with John Doe',
      description: 'Product interview',
      intervieweeName: 'John Doe',
      transcriptDate: '2024-01-15T10:00:00Z',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      chunkCount: 42
    }
  });
