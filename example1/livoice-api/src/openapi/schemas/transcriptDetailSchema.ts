import { transcriptSummarySchema } from './transcriptSummarySchema';
import { z } from './zod';

export const transcriptDetailSchema = transcriptSummarySchema
  .extend({
    textPreview: z.string().openapi({ example: 'Preview of transcript text...' })
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
      chunkCount: 42,
      textPreview: 'Preview of transcript text...'
    }
  });
