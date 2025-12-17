import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toTranscriptSegments } from '../lib/toTranscriptSegments';

describe('Transcript ingestion utilities', () => {
  it('parses SRT with speaker marker and name', () => {
    const srt = `
1
00:00:00,000 --> 00:00:01,000
Hello there

2
00:00:01,000 --> 00:00:02,000
>> John: How are you?
`;

    const segments = toTranscriptSegments(srt);

    assert.strictEqual(segments.length, 2);
    assert.strictEqual(segments[0]?.text, 'Hello there');
    assert.strictEqual(segments[0]?.isSpeakerChange, false);
    assert.strictEqual(segments[1]?.isSpeakerChange, true);
    assert.strictEqual(segments[1]?.speaker, 'John');
    assert.strictEqual(segments[1]?.text, 'How are you?');
  });

  it('merges consecutive segments until sentence boundary', () => {
    const merged = toTranscriptSegments(
      [
        '1',
        '00:00:00,000 --> 00:00:01,000',
        'This is one',
        '',
        '2',
        '00:00:01,000 --> 00:00:02,000',
        'continuous sentence.',
        '',
        '3',
        '00:00:02,000 --> 00:00:03,000',
        'New speaker',
        ''
      ].join('\n')
    );
      {
        index: 1,
        startMs: 0,
        endMs: 1000,
        durationMs: 1000,
        text: 'This is one',
        isMetadata: false,
        isSpeakerChange: false
      },
      {
        index: 2,
        startMs: 1000,
        endMs: 2000,
        durationMs: 1000,
        text: 'continuous sentence.',
        isMetadata: false,
        isSpeakerChange: false
      },
      {
        index: 3,
        startMs: 2000,
        endMs: 3000,
        durationMs: 1000,
        text: 'New speaker',
        speaker: 'Alice',
        isMetadata: false,
        isSpeakerChange: true
      }
    ]);

    assert.strictEqual(merged.length, 2);
    assert.strictEqual(merged[0]?.text, 'This is one continuous sentence.');
    assert.strictEqual(merged[0]?.durationMs, 2000);
    assert.strictEqual(merged[1]?.isSpeakerChange, true);
    assert.strictEqual(merged[1]?.speaker, 'Alice');
  });
});







