import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { beat, footage, INK, MUTED, SERIF } from '../reel.ts';
import { rise } from './text.ts';

/**
 * The sentence the wall was building to, with the number in it: the count rolls up over
 * `rollBeats`, and the line that gives it meaning lands when it stops.
 */
export const ClaimCount = ({ rollBeats = 3 }: { rollBeats?: number }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const total = footage.terms;
  const n = Math.round(
    interpolate(frame, [0, beat(rollBeats)], [0, total], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }),
  );
  const numberSize = Math.min(300, width / 5);
  const lineSize = Math.min(72, width / 16);
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 80px' }}>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: numberSize,
          fontWeight: 600,
          color: INK,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {n.toLocaleString('en-US')}
      </div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: lineSize,
          fontWeight: 500,
          color: INK,
          marginTop: 36,
          lineHeight: 1.15,
          textAlign: 'center',
          ...rise(frame, beat(rollBeats)),
        }}
      >
        words, <span style={{ color: MUTED }}>each with a live demo.</span>
      </div>
    </AbsoluteFill>
  );
};
