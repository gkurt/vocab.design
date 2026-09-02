import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { beat, beatSeconds, CLIP_WIDTH, clip, clipHeight, INK, MUTED, SANS, SERIF, slotStart } from '../reel.ts';
import { Clip } from './Clip.tsx';
import { rise } from './text.ts';
import { Wordmark } from './Wordmark.tsx';

/**
 * A specimen with its name under it: the unit the wall is built from. The clip is shown
 * at the largest size that leaves a text band under it, so the same slot works in the
 * wide and the square cuts; `overlay` lays the name over the footage instead, for a frame
 * too short to have a band.
 */
export const Slot = ({
  slug,
  beats,
  definition = false,
  overlay = false,
}: {
  slug: string;
  beats: number;
  definition?: boolean;
  overlay?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = clip(slug);
  const name = c?.name ?? slug;
  const seconds = beatSeconds(beats);
  const at = slotStart(slug, seconds);

  if (overlay) {
    const scale = Math.max(width / CLIP_WIDTH, height / clipHeight(slug));
    return (
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Clip slug={slug} at={at} style={{ transform: `scale(${scale})`, transformOrigin: '0 0', position: 'absolute', left: 0, top: 0 }} />
        <div
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23,21,18,0.92) 0%, rgba(23,21,18,0) 45%)' }}
        />
        <Wordmark size={28} />
        <div style={{ position: 'absolute', left: 56, bottom: 44, ...rise(frame, beats > 1 ? beat(0.25) : 0) }}>
          <div style={{ fontFamily: SERIF, fontSize: 72, fontWeight: 600, color: INK, letterSpacing: '-0.01em', lineHeight: 1 }}>
            {name}
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  const band = definition ? 300 : 220;
  const head = 130;
  const margin = 80;
  const scale = Math.min(1, (width - margin * 2) / CLIP_WIDTH, (height - head - band) / clipHeight(slug));
  const shown = clipHeight(slug) * scale;
  const clipWidth = CLIP_WIDTH * scale;
  const top = head + (height - head - band - shown) / 2;
  const left = (width - clipWidth) / 2;
  const nameSize = Math.min(96, width / 11);

  return (
    <AbsoluteFill>
      <Wordmark />
      <Clip slug={slug} at={at} style={{ position: 'absolute', left, top, transform: `scale(${scale})`, transformOrigin: '0 0' }} />
      <div style={{ position: 'absolute', left, right: left, top: top + shown + 44, ...rise(frame, beats > 1 ? beat(0.25) : 0) }}>
        <div style={{ fontFamily: SERIF, fontSize: nameSize, fontWeight: 600, color: INK, letterSpacing: '-0.01em', lineHeight: 1 }}>
          {name}
        </div>
        {definition && c ? (
          <div style={{ fontFamily: SANS, fontSize: nameSize * 0.36, color: MUTED, marginTop: 22, lineHeight: 1.3, maxWidth: clipWidth }}>
            {c.definition}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
