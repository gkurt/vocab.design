import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Key = 'a' | 'b';
type State = 'blocked' | 'playing';

/** Seconds of clip, and the stage tick that stands for one of them. */
const TOTAL = 48;
const TICK_MS = 240;
/** Where the parked reduced-motion still sits, in seconds. */
const PARKED = 19;

const PLAY_GLYPH = `
  <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 22px; height: 22px; fill: currentcolor; stroke: none">
    <path d="M8 5.2 18.4 12 8 18.8z" />
  </svg>`;

const timecode = (seconds: number): string => `0:${String(Math.floor(seconds)).padStart(2, '0')}`;

type Tile = { key: Key; label: string; sky: string; boat: string; state: State; subject?: boolean; context?: boolean };

const tile = ({ key, label, sky, boat, state, subject, context }: Tile): string => `
  <div class="${context ? 'sp-context' : ''}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 6px">
    <span class="sp-label" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${label}</span>
    <div
      data-part="${key}-picture"
      ${subject ? 'data-subject' : ''}
      data-state="${state}"
      style="position: relative; height: 126px; border-radius: 6px; overflow: hidden; background: ${sky}"
    >
      <div aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden">
        <div style="position: absolute; right: 24px; top: 14px; width: 28px; height: 28px; border-radius: 50%; background: #f7e6bb; opacity: 0.72"></div>
        <div style="position: absolute; left: -26px; right: 46%; bottom: 30px; height: 56px; border-radius: 50% 50% 0 0; background: rgb(12 20 30 / 0.55)"></div>
        <div style="position: absolute; left: 40%; right: -30px; bottom: 30px; height: 42px; border-radius: 50% 50% 0 0; background: rgb(12 20 30 / 0.4)"></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 44px; background: rgb(8 12 18 / 0.42)"></div>
      </div>

      <div
        data-part="${key}-boat"
        aria-hidden="true"
        style="position: absolute; bottom: 30px; left: 6%; width: 22px; height: 9px; border-radius: 1px 1px 7px 7px;
               background: ${boat}; box-shadow: 0 1px 3px rgb(8 12 18 / 0.5); transition: left 0.22s linear"
      ></div>

      <span
        data-part="${key}-badge"
        style="position: absolute; left: 8px; top: 8px; padding: 2px 7px; border-radius: 999px;
               background: rgb(8 12 18 / 0.68); color: #ffffff; font-size: 11px; font-weight: 500; white-space: nowrap"
      ></span>

      ${
        state === 'blocked'
          ? `<div
        data-part="${key}-overlay"
        style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none"
      >
        <button
          type="button"
          data-part="${key}-play"
          aria-label="Play with sound"
          style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; padding: 0 0 0 2px;
                 border: 0; border-radius: 50%; background: rgb(8 12 18 / 0.66); color: #ffffff; cursor: pointer; pointer-events: auto"
        >${PLAY_GLYPH}</button>
      </div>`
          : ''
      }

      <div class="sp-row" style="position: absolute; left: 8px; right: 8px; bottom: 8px; gap: 6px">
        <span
          data-part="${key}-time"
          style="flex: 0 0 auto; color: #ffffff; font-size: 11px; font-variant-numeric: tabular-nums"
          >0:00</span
        >
        <div
          class="sp-progress"
          data-part="${key}-track"
          style="--sp-value: 0%; flex: 1 1 0; min-width: 0; height: 4px; background: rgb(255 255 255 / 0.3)"
        >
          <div class="sp-progress-fill"></div>
        </div>
      </div>
    </div>
  </div>`;

/**
 * Autoplay specimen: the same request made twice, once with sound and once without, so
 * the permission regime is the thing on screen. The muted clip is already playing when
 * the specimen mounts; the unmuted one has been refused and waits for the gesture that
 * would grant it, which the script then supplies.
 *
 * The refusal is PORTRAYED rather than borrowed from a real media element: synthesized
 * events grant no user activation, so a genuine `<video>` here would be refused for
 * reasons the reader could not see and could not be promised.
 *
 * The subject is the muted picture, the narrowest element that is actually playing
 * unasked. The refused tile beside it is the fence rather than the term, so it sits in
 * the context register, and the note below is scenery. The play glyph reaches a state
 * rather than flipping one (SPEC §8): it only ever starts playback.
 *
 * The clip runs on the stage clock, so a reader who asked for less motion gets the still
 * the term itself owes them: parked mid-clip, with nothing moving.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px; padding: 12px">
        <div class="sp-row" style="align-items: flex-start; gap: 12px">
          ${tile({
            key: 'a',
            label: 'autoplay, sound on',
            sky: 'linear-gradient(165deg, #2b3a67 0%, #4c6ea8 55%, #b9cfd8 100%)',
            boat: '#f1e6d0',
            state: 'blocked',
            context: true,
          })}
          ${tile({
            key: 'b',
            label: 'autoplay muted',
            sky: 'linear-gradient(165deg, #1f3d3a 0%, #3f7d6e 52%, #cfe0c8 100%)',
            boat: '#f1eddc',
            state: 'playing',
            subject: true,
          })}
        </div>
        <p class="sp-text sp-context" style="margin: 10px 0 0">
          Sound needs a gesture the reader has not made yet, so one request is refused and one is
          granted for asking in silence.
        </p>
      </div>
    </div>
  `;

  const reduced = prefersReducedMotion(root);
  const state: Record<Key, State> = { a: 'blocked', b: 'playing' };
  const at: Record<Key, number> = { a: 0, b: reduced ? PARKED : 0 };

  const badge = (key: Key): string => {
    if (state[key] === 'blocked') return 'Refused: sound';
    return key === 'b' ? 'Playing, muted' : 'Playing, sound on';
  };

  const draw = (key: Key) => {
    const seconds = at[key];
    part(root, `${key}-time`).textContent = timecode(seconds);
    part(root, `${key}-track`).style.setProperty('--sp-value', `${(seconds / TOTAL) * 100}%`);
    part(root, `${key}-boat`).style.left = `${6 + (seconds / TOTAL) * 78}%`;
    part(root, `${key}-badge`).textContent = badge(key);
  };

  const advance = () => {
    for (const key of ['a', 'b'] as Key[]) {
      if (state[key] !== 'playing') continue;
      at[key] = Math.min(at[key] + 1, TOTAL);
      draw(key);
    }
    clock.setTimeout(advance, TICK_MS);
  };

  /** The gesture the policy was waiting for. It grants, and never takes back. */
  part(root, 'a-play').addEventListener('click', () => {
    state.a = 'playing';
    if (reduced) at.a = PARKED;
    const picture = part(root, 'a-picture');
    picture.dataset.state = 'playing';
    part(root, 'a-overlay').hidden = true;
    draw('a');
  });

  draw('a');
  draw('b');
  if (!reduced) clock.setTimeout(advance, TICK_MS);
}
