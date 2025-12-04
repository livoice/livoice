import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { createTranscript, ingestTranscriptText } from '../domains/transcripts/service';
import { prisma } from '../lib/prisma';
import { createTranscriptSchema } from '../openapi/schemas/createTranscriptSchema';
import { uploadTextSchema } from '../openapi/schemas/uploadTextSchema';

const router = Router();

router.get('/transcripts', async (req, res) => {
  const transcripts = await prisma.transcript.findMany({
    orderBy: { transcriptDate: 'desc' },
    include: { _count: { select: { chunks: true } } }
  });

  res.json(transcripts.map(formatSummary));
});

router.get('/transcripts/:id', async (req, res) => {
  const transcript = await prisma.transcript.findUnique({
    where: { id: req.params.id },
    include: { chunks: { orderBy: { absoluteTimestamp: 'asc' }, take: 1 }, _count: { select: { chunks: true } } }
  });

  if (!transcript) {
    return res.status(404).json({ message: 'Transcript not found' });
  }

  res.json({
    ...formatSummary(transcript),
    textPreview: transcript.chunks[0]?.text ?? ''
  });
});

router.post('/transcripts', async (req, res) => {
  const parsed = createTranscriptSchema.parse(req.body);
  const transcript = await createTranscript(parsed, parsed.text);
  const withCount = await prisma.transcript.findUnique({
    where: { id: transcript.id },
    include: { _count: { select: { chunks: true } } }
  });

  res.status(201).json(withCount ? formatSummary(withCount) : transcript);
});

router.post('/transcripts/:id/upload-text', async (req, res) => {
  const parsed = uploadTextSchema.parse(req.body);
  const chunks = await ingestTranscriptText(req.params.id, parsed.text, parsed.timeline);
  res.json({ chunksCreated: chunks.length });
});

router.get('/transcripts/:id/chunks', async (req, res) => {
  const chunks = await prisma.transcriptChunk.findMany({
    where: { transcriptId: req.params.id },
    orderBy: { absoluteTimestamp: 'asc' },
    select: {
      id: true,
      speaker: true,
      text: true,
      absoluteTimestamp: true,
      durationSeconds: true
    }
  });

  res.json(chunks);
});

type TranscriptWithCount = Prisma.TranscriptGetPayload<{
  include: { _count: { select: { chunks: true } } };
}>;

function formatSummary(transcript: TranscriptWithCount) {
  const data = transcript;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    intervieweeName: data.intervieweeName,
    transcriptDate: data.transcriptDate,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    chunkCount: data._count?.chunks ?? 0
  };
}

export default router;
