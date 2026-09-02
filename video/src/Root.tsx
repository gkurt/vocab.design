import { Composition } from 'remotion';
import { FULL_BEATS, Full } from './compositions/Full.tsx';
import { LOOP_BEATS, Loop } from './compositions/Loop.tsx';
import { TEASER_BEATS, Teaser } from './compositions/Teaser.tsx';
import './fonts.ts';
import { beat, FPS } from './reel.ts';

export const Root = () => (
  <>
    <Composition id="Full" component={Full} durationInFrames={beat(FULL_BEATS)} fps={FPS} width={1920} height={1080} />
    <Composition id="Teaser" component={Teaser} durationInFrames={beat(TEASER_BEATS)} fps={FPS} width={1080} height={1080} />
    <Composition id="Loop" component={Loop} durationInFrames={beat(LOOP_BEATS)} fps={FPS} width={1200} height={630} />
  </>
);
