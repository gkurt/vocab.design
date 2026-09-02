import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { ACCENT, beat, footage, INK, LINE, MONO, MUTED, SANS } from '../reel.ts';
import { fade } from './text.ts';
import { Wordmark } from './Wordmark.tsx';

/**
 * The agent beat: a terminal asks for a term's markdown and gets it. The command types
 * over `typeBeats`, then a line of the real page lands every half beat, and the caption
 * lands two beats before the scene ends. The lines are the
 * ones the site serves, read out of dist at record time, so the terminal cannot lie.
 */
export const Agent = ({ slug, typeBeats = 3 }: { slug: string; typeBeats?: number }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const command = `curl vocab.design/${slug}.md`;
  const typed = Math.min(command.length, Math.floor((frame / beat(typeBeats)) * command.length));
  const linesFrom = beat(typeBeats + 1);
  const shown = frame < linesFrom ? 0 : Math.min(footage.agent.lines.length, Math.floor((frame - linesFrom) / (beat(1) / 2)) + 1);
  const captionAt = linesFrom + beat(6);
  const pad = 80;
  return (
    <AbsoluteFill style={{ padding: pad }}>
      <Wordmark />
      <div
        style={{
          width: width - pad * 2,
          height: height - pad * 2 - 150,
          marginTop: 60,
          border: `2px solid ${LINE}`,
          borderRadius: 24,
          padding: '44px 56px',
          fontFamily: MONO,
          fontSize: 32,
          lineHeight: 1.55,
          color: INK,
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <span style={{ color: ACCENT }}>$ </span>
          {command.slice(0, typed)}
          <span style={{ opacity: Math.floor(frame / 8) % 2 === 0 || typed < command.length ? 1 : 0, color: ACCENT }}>▍</span>
        </div>
        {footage.agent.lines.slice(0, shown).map((line, i) => (
          <div
            key={`${i}-${line}`}
            style={{ color: line.startsWith('#') ? INK : MUTED, whiteSpace: 'pre-wrap', fontWeight: line.startsWith('#') ? 600 : 400 }}
          >
            {line || ' '}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: pad,
          right: pad,
          bottom: pad,
          fontFamily: SANS,
          fontSize: 40,
          color: INK,
          lineHeight: 1.3,
          opacity: fade(frame, captionAt, 10),
        }}
      >
        Every term as markdown. <span style={{ color: MUTED }}>llms.txt at the root.</span>
      </div>
    </AbsoluteFill>
  );
};
