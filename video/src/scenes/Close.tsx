import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { beat, INK, MUTED, SANS, SERIF } from '../reel.ts';
import { Pulse } from './Pulse.tsx';
import { rise } from './text.ts';

export const Close = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 168,
          fontWeight: 600,
          color: INK,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          ...rise(frame, 0),
        }}
      >
        <Pulse origin="50% 50%">vocab.design</Pulse>
      </div>
      <div style={{ fontFamily: SANS, fontSize: 40, color: MUTED, marginTop: 36, ...rise(frame, beat(1)) }}>
        A linked visual dictionary of design.
      </div>
    </AbsoluteFill>
  );
};
