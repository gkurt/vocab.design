import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { beat, CLIP_WIDTH, clip, clipHeight, INK, MUTED, SANS, SERIF } from '../reel.ts';
import { Clip } from './Clip.tsx';
import { rise } from './text.ts';
import { Wordmark } from './Wordmark.tsx';

/**
 * The first thing on screen is a specimen playing, with no words at all, for `nameAt`
 * beats. Then its name lands, and the definition a beat after it. The frame is the
 * clip alone, as large as the composition allows.
 */
export const ColdOpen = ({ slug, nameAt }: { slug: string; nameAt: number }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = clip(slug);
  // Room above for the wordmark, room below for the name and its definition.
  const head = 140;
  const band = 220;
  const scale = Math.min((width - 120) / CLIP_WIDTH, (height - head - band) / clipHeight(slug));
  const clipWidth = CLIP_WIDTH * scale;
  const shown = clipHeight(slug) * scale;
  const left = (width - clipWidth) / 2;
  const top = head + (height - head - band - shown) / 2;
  return (
    <AbsoluteFill>
      <Wordmark />
      <Clip slug={slug} style={{ position: 'absolute', left, top, transform: `scale(${scale})`, transformOrigin: '0 0' }} />
      <div style={{ position: 'absolute', left, right: left, top: top + shown + 40, display: 'flex', alignItems: 'baseline', gap: 36 }}>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 96,
            fontWeight: 600,
            color: INK,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            ...rise(frame, beat(nameAt)),
          }}
        >
          {c?.name ?? slug}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 34, color: MUTED, lineHeight: 1.3, flex: 1, ...rise(frame, beat(nameAt + 1)) }}>
          {c?.definition}
        </div>
      </div>
    </AbsoluteFill>
  );
};
