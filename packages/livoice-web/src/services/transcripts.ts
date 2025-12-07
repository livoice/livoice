export type TranscriptSummary = {
  id: string;
  title: string;
  description?: string | null;
  intervieweeName?: string | null;
  transcriptDate: string;
  createdAt: string;
  updatedAt: string;
  chunkCount: number;
};

export type TranscriptDetail = TranscriptSummary & {
  textPreview: string;
};

export type TranscriptChunk = {
  id: string;
  speaker?: string | null;
  text: string;
  absoluteTimestamp?: number | null;
  durationSeconds?: number | null;
};

export type ChatRequest = {
  userMessage: string;
  sessionId?: string;
};

export type ChatResponse = {
  sessionId: string;
  answer: string;
  usedChunks: TranscriptChunk[];
};

export type UploadTextRequest = {
  text: string;
  timeline?: Array<{ absoluteTimestamp?: number; durationSeconds?: number; speaker?: string }>;
};

const transcripts: TranscriptDetail[] = [
  {
    id: 'transcript-1',
    title: 'Quarterly Strategy Interview',
    description: 'Discussed roadmap, key priorities, and product investments.',
    intervieweeName: 'Sara Patel',
    transcriptDate: '2025-10-12',
    createdAt: '2025-10-12T08:00:00.000Z',
    updatedAt: '2025-10-12T09:12:00.000Z',
    chunkCount: 8,
    textPreview:
      'We are doubling down on conversation intelligence and leaning into contextual AI to highlight the moments that matter most.'
  },
  {
    id: 'transcript-2',
    title: 'Customer Success Roundtable',
    description: 'Highlights from the customer success leadership meeting.',
    intervieweeName: 'Marcus Reed',
    transcriptDate: '2025-09-30',
    createdAt: '2025-09-30T10:15:00.000Z',
    updatedAt: '2025-09-30T10:55:00.000Z',
    chunkCount: 5,
    textPreview: 'Customers are asking for faster insight cycles and better alerts when sentiment shifts during calls.'
  }
];

const transcriptChunks: Record<string, TranscriptChunk[]> = {
  'transcript-1': [
    {
      id: 'chunk-1',
      speaker: 'Interviewer',
      text: 'Where do you see the product differentiating in the next two quarters?',
      absoluteTimestamp: 2,
      durationSeconds: 14
    },
    {
      id: 'chunk-2',
      speaker: 'Sara',
      text: 'We are bundling real-time call summaries with AI-assisted action items and surfacing them directly in the CRM.',
      absoluteTimestamp: 25,
      durationSeconds: 22
    },
    {
      id: 'chunk-3',
      speaker: 'Interviewer',
      text: 'How are you measuring success?',
      absoluteTimestamp: 70,
      durationSeconds: 8
    },
    {
      id: 'chunk-4',
      speaker: 'Sara',
      text: 'We track the number of insights delivered per rep and monitor how often the highlights are shared with leadership.',
      absoluteTimestamp: 85,
      durationSeconds: 18
    }
  ],
  'transcript-2': [
    {
      id: 'chunk-5',
      speaker: 'Moderator',
      text: 'What is the biggest ask from customers this quarter?',
      absoluteTimestamp: 4,
      durationSeconds: 12
    },
    {
      id: 'chunk-6',
      speaker: 'Marcus',
      text: 'They want faster transcription uploads and better sentiment tracking during support calls.',
      absoluteTimestamp: 27,
      durationSeconds: 16
    },
    {
      id: 'chunk-7',
      speaker: 'Moderator',
      text: 'Are you seeing any new use cases emerge?',
      absoluteTimestamp: 52,
      durationSeconds: 11
    },
    {
      id: 'chunk-8',
      speaker: 'Marcus',
      text: 'Yes, product teams are using the data to prototype automated retrospectives.',
      absoluteTimestamp: 65,
      durationSeconds: 14
    }
  ]
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTranscripts = async (): Promise<TranscriptSummary[]> => {
  await delay(250);
  return transcripts.map(transcript => ({
    id: transcript.id,
    title: transcript.title,
    description: transcript.description,
    intervieweeName: transcript.intervieweeName,
    transcriptDate: transcript.transcriptDate,
    createdAt: transcript.createdAt,
    updatedAt: transcript.updatedAt,
    chunkCount: transcript.chunkCount
  }));
};

export const fetchTranscript = async (id: string): Promise<TranscriptDetail> => {
  await delay(200);
  const transcript = transcripts.find(item => item.id === id);
  if (!transcript) {
    throw new Error('Transcript not found');
  }
  return transcript;
};

export const fetchTranscriptChunks = async (id: string): Promise<TranscriptChunk[]> => {
  await delay(150);
  return transcriptChunks[id] ?? [];
};

export const uploadTranscriptText = async ({ id, body }: { id: string; body: UploadTextRequest }) => {
  await delay(200);
  const preview = body.text.trim();
  if (preview) {
    const nextChunk: TranscriptChunk = {
      id: `chunk-${Date.now()}`,
      speaker: 'Uploaded text',
      text: preview,
      absoluteTimestamp: null,
      durationSeconds: null
    };
    transcriptChunks[id] = [...(transcriptChunks[id] ?? []), nextChunk];
  }
  return { chunksCreated: 1 };
};

export const chatTranscript = async ({ id, body }: { id: string; body: ChatRequest }): Promise<ChatResponse> => {
  await delay(350);
  const answer = `AI assistant: We captured ${body.userMessage.slice(0, 30)}...`;
  return {
    sessionId: `${id}-${Date.now()}`,
    answer,
    usedChunks: transcriptChunks[id] ?? []
  };
};

