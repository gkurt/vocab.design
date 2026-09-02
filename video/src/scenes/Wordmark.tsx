import { INK, SERIF } from '../reel.ts';
import { Pulse } from './Pulse.tsx';

/**
 * The site's name, top left of every scene that shows a demo, so a viewer who skips
 * through the video still knows where the demos live. Never on the close, which says it
 * large, and never on a text card, where it would compete with the line.
 */
export const Wordmark = ({ size = 40 }: { size?: number }) => (
  <div
    style={{
      position: 'absolute',
      left: size * 2,
      top: size * 1.3,
      fontFamily: SERIF,
      fontSize: size,
      fontWeight: 600,
      color: INK,
      letterSpacing: '-0.01em',
      lineHeight: 1,
    }}
  >
    <Pulse>vocab.design</Pulse>
  </div>
);
