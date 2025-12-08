declare module 'srt-parser-2' {
  export type SrtCue = {
    id?: string | number;
    startTime: string;
    endTime: string;
    text: string;
  };

  export default class SrtParser {
    fromSrt(srt: string): SrtCue[];
    toSrt(cues: SrtCue[]): string;
  }
}
