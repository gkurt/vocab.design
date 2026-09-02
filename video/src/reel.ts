import manifest from '../clips.json';
import config from '../reel.json';

/**
 * What the edit is cut from: the plan in reel.json (the cast, the music, its tempo) and
 * the footage's manifest in clips.json (what `bun run reel` recorded, and when each pass
 * of a choreography ended). Every duration in the compositions is stated in BEATS and
 * converted here, so a different track changes the tempo and nothing else.
 */

export const FPS = 30;

export interface Clip {
  name: string;
  definition: string;
  aliases: string[];
  height: number;
  duration: number;
  passes: number[];
  clicks: number[];
}

export const reel = config as {
  music: string | null;
  bpm: number;
  downbeat: number;
  cast: string[];
  /** The cast members whose demonstration needs time: the wall gives them its held slots. */
  long: string[];
  open: string;
  /** The term whose names the linked beat lists; the aliases default to the term's own. */
  linked: { slug: string; aliases?: string[] };
  agent: string;
  /**
   * Per-slug override of where a wall slot starts: clip seconds, or a moment relative to
   * the n-th click the recorder logged (1-based), which survives a re-record.
   */
  at?: Record<string, number | { click: number; offset?: number }>;
};

export const footage = manifest as unknown as { terms: number; agent: { slug: string; lines: string[] }; clips: Record<string, Clip> };

/** Frames per beat, fractional: 120 bpm at 30 fps is 15, 128 bpm is 14.06. */
export const beatFrames = (FPS * 60) / reel.bpm;

/** The frame a given beat falls on. */
export const beat = (n: number): number => Math.round(n * beatFrames);

/** Seconds a run of beats lasts. */
export const beatSeconds = (n: number): number => (n * 60) / reel.bpm;

export const clip = (slug: string): Clip | undefined => footage.clips[slug];

/**
 * Where a slot into a clip should start so it shows the demonstration rather than the
 * ghost cursor's approach: an explicit override (absolute, or relative to a logged click),
 * else a third of the way into the first pass, clamped so the slot never runs off the end
 * of the footage.
 */
export function slotStart(slug: string, seconds: number): number {
  const c = clip(slug);
  if (!c) return 0;
  const at = reel.at?.[slug];
  const usual = (c.passes[0] ?? c.duration) * 0.35;
  const preferred = typeof at === 'number' ? at : at ? (c.clicks[at.click - 1] ?? usual) + (at.offset ?? 0) : usual;
  return Math.max(0, Math.min(preferred, c.duration - seconds - 0.1));
}

export const PAPER = '#171512';
export const INK = '#ece7de';
export const MUTED = '#99917f';
export const LINE = '#35312a';
export const ACCENT = '#e8763d';

export const SERIF = 'Source Serif 4 Variable, Georgia, serif';
export const SANS = 'Geist Variable, system-ui, sans-serif';
export const MONO = 'Geist Mono Variable, ui-monospace, monospace';

/** The recorded frame is 1440 wide; its useful height is the stage's, which the manifest records. */
export const CLIP_WIDTH = 1440;
export const clipHeight = (slug: string): number => clip(slug)?.height ?? 800;
