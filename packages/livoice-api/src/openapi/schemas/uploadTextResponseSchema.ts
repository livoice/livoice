import { z } from './zod';

export const uploadTextResponseSchema = z
  .object({
    chunksCreated: z.number().openapi({ example: 10 })
  })
  .openapi({
    example: {
      chunksCreated: 10
    }
  });
