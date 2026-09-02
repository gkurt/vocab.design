import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { ACCENT, beat, CLIP_WIDTH, clip, clipHeight, INK, MUTED, SANS, SERIF } from '../reel.ts';
import { Clip } from './Clip.tsx';
import { fade, rise } from './text.ts';
import { Wordmark } from './Wordmark.tsx';

/**
 * One specimen, every name for it. The other names arrive one per two beats and grey
 * out as the headword lands in the accent; then the point, in one line.
 */
export const Linked = ({ slug, aliases: given }: { slug: string; aliases?: string[] }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = clip(slug);
  const aliases = given ?? c?.aliases ?? [];
  const scale = Math.min(0.62, (width * 0.5) / CLIP_WIDTH);
  const shown = clipHeight(slug) * scale;
  const top = (height - shown) / 2 - 40;
  const headwordAt = beat(aliases.length * 2);
  const pointAt = beat(aliases.length * 2 + 4);
  return (
    <AbsoluteFill>
      <Wordmark />
      <Clip slug={slug} style={{ position: 'absolute', left: 80, top, transform: `scale(${scale})`, transformOrigin: '0 0' }} />
      <div style={{ position: 'absolute', left: 80 + CLIP_WIDTH * scale + 96, top, right: 80 }}>
        {aliases.map((alias, i) => {
          const settled = frame >= headwordAt;
          return (
            <div
              key={alias}
              style={{
                fontFamily: SERIF,
                fontSize: 72,
                fontWeight: 500,
                lineHeight: 1.25,
                color: settled ? MUTED : INK,
                textDecoration: settled ? 'line-through' : 'none',
                textDecorationColor: MUTED,
                textDecorationThickness: 3,
                ...rise(frame, beat(i * 2)),
              }}
            >
              {alias}
            </div>
          );
        })}
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.2,
            color: ACCENT,
            letterSpacing: '-0.01em',
            ...rise(frame, headwordAt),
          }}
        >
          {c?.name ?? slug}
        </div>
        <div style={{ fontFamily: SANS, fontSize: 36, color: INK, marginTop: 40, lineHeight: 1.35, opacity: fade(frame, pointAt, 10) }}>
          One page. Every name for it.
          <br />
          <span style={{ color: MUTED }}>Aliases redirect. Related words link.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
