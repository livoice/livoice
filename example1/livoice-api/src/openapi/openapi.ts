import { OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { env } from '../config/env';
import { chatRequestSchema } from './schemas/chatRequestSchema';
import { chatResponseSchema } from './schemas/chatResponseSchema';
import { createTranscriptSchema } from './schemas/createTranscriptSchema';
import { transcriptChunkSchema } from './schemas/transcriptChunkSchema';
import { transcriptDetailSchema } from './schemas/transcriptDetailSchema';
import { transcriptSummarySchema } from './schemas/transcriptSummarySchema';
import { uploadTextResponseSchema } from './schemas/uploadTextResponseSchema';
import { uploadTextSchema } from './schemas/uploadTextSchema';
import { z } from './schemas/zod';

const registry = new OpenAPIRegistry();

// Register schemas
registry.register('CreateTranscriptRequest', createTranscriptSchema);
registry.register('UploadTextRequest', uploadTextSchema);
registry.register('ChatRequest', chatRequestSchema);
registry.register('TranscriptSummary', transcriptSummarySchema);
registry.register('TranscriptDetail', transcriptDetailSchema);
registry.register('TranscriptChunk', transcriptChunkSchema);
registry.register('ChatResponse', chatResponseSchema);
registry.register('UploadTextResponse', uploadTextResponseSchema);

// Register paths
registry.registerPath({
  method: 'get',
  path: '/transcripts',
  summary: 'List transcripts',
  responses: {
    200: {
      description: 'Transcript list',
      content: {
        'application/json': {
          schema: z.array(transcriptSummarySchema)
        }
      }
    }
  }
});

registry.registerPath({
  method: 'get',
  path: '/transcripts/{id}',
  summary: 'Fetch transcript',
  request: {
    params: z.object({
      id: z.string().openapi({ param: { name: 'id', in: 'path' } })
    })
  },
  responses: {
    200: {
      description: 'Transcript detail',
      content: {
        'application/json': {
          schema: transcriptDetailSchema
        }
      }
    },
    404: {
      description: 'Transcript not found'
    }
  }
});

registry.registerPath({
  method: 'post',
  path: '/transcripts',
  summary: 'Create a transcript and optionally ingest text',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTranscriptSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Created transcript',
      content: {
        'application/json': {
          schema: transcriptSummarySchema
        }
      }
    }
  }
});

registry.registerPath({
  method: 'post',
  path: '/transcripts/{id}/upload-text',
  summary: 'Add transcript text',
  request: {
    params: z.object({
      id: z.string().openapi({ param: { name: 'id', in: 'path' } })
    }),
    body: {
      content: {
        'application/json': {
          schema: uploadTextSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Chunk count',
      content: {
        'application/json': {
          schema: uploadTextResponseSchema
        }
      }
    }
  }
});

registry.registerPath({
  method: 'get',
  path: '/transcripts/{id}/chunks',
  summary: 'List transcript chunks',
  request: {
    params: z.object({
      id: z.string().openapi({ param: { name: 'id', in: 'path' } })
    })
  },
  responses: {
    200: {
      description: 'Transcript chunks',
      content: {
        'application/json': {
          schema: z.array(transcriptChunkSchema)
        }
      }
    }
  }
});

registry.registerPath({
  method: 'post',
  path: '/transcripts/{id}/chat',
  summary: 'Ask a question about a transcript',
  request: {
    params: z.object({
      id: z.string().openapi({ param: { name: 'id', in: 'path' } })
    }),
    body: {
      content: {
        'application/json': {
          schema: chatRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Chat answer',
      content: {
        'application/json': {
          schema: chatResponseSchema
        }
      }
    }
  }
});

const generator = new OpenApiGeneratorV31(registry.definitions);

export const openapiDocument = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    title: 'Livoice AI Transcript Chat API',
    version: '0.1.0'
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}/api`,
      description: 'Local dev'
    }
  ]
});
