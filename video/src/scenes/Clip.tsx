import type { CSSProperties } from 'react';
import { OffthreadVideo, staticFile } from 'remotion';
import { CLIP_WIDTH, clip, clipHeight, FPS, LINE, MONO, MUTED } from '../reel.ts';

/**
 * One specimen's footage, from `at` seconds in. A slug with no clip yet draws a labelled
 * box instead, so the edit can be laid out in the studio before anything is recorded.
 */
export const Clip = ({ slug, at = 0, style }: { slug: string; at?: number; style?: CSSProperties }) => {
  const c = clip(slug);
  const height = clipHeight(slug);
  const box: CSSProperties = { width: CLIP_WIDTH, height, ...style };
  if (!c) {
    return (
      <div
        style={{
          ...box,
          display: 'grid',
          placeItems: 'center',
          border: `2px dashed ${LINE}`,
          borderRadius: 24,
          color: MUTED,
          fontFamily: MONO,
          fontSize: 40,
        }}
      >
        {slug} (not recorded)
      </div>
    );
  }
  // The frame is 800 tall and the stage body is not: crop to the body, so neither the strip
  // nor bare page is drawn, and give the cut its edge back where the figure's border was.
  return (
    <div style={{ ...box, overflow: 'hidden', borderRadius: 24, boxShadow: `inset 0 -2px 0 ${LINE}` }}>
      <OffthreadVideo
        src={staticFile(`clips/${slug}.mp4`)}
        trimBefore={Math.round(at * FPS)}
        muted
        style={{ width: CLIP_WIDTH, height: 800 }}
      />
    </div>
  );
};
