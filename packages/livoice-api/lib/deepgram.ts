import { createClient, srt } from '@deepgram/sdk';
import env from '../config/env';

const deepgram = createClient(env.DEEPGRAM_API_KEY);

export const transcribeFromUrl = async (audioUrl: string, language: string = 'he') => {
  const response = await deepgram.listen.prerecorded.transcribeUrl(
    { url: audioUrl },
    {
      model: 'nova-3',
      language,
      punctuate: true,
      smart_format: true,
      paragraphs: true
    }
  );

  if (response.error) throw new Error(response.error.message);
  return response.result;
};

export const toSrt = (transcription: unknown) => srt(transcription).trim();
