import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TOTAL = 90;
const START = 12;
/** One tick of the demo's clock, and the seconds of recording it stands for. */
const TICK_MS = 120;
const TICK_SECONDS = 1;
/** How long the picture plays untouched before the bar stands down. */
const IDLE_MS = 1200;

const FILLED = 'fill: currentcolor; stroke: none';
const STROKED = 'fill: none; stroke: currentcolor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round';

const svg = (body: string, style: string) => `<svg class="sp-icon" viewBox="0 0 24 24" style="${style}" aria-hidden="true">${body}</svg>`;

const PLAY = svg('<path d="M8 5.2 18.4 12 8 18.8z"/>', FILLED);
const PAUSE = svg('<path d="M8 5h3v14H8zM13 5h3v14h-3z"/>', FILLED);
const VOLUME = svg(`<path d="M4.5 9.4h3.2L12 5.9v12.2L7.7 14.6H4.5z"/><path style="${STROKED}" d="M15.2 9.3a4 4 0 0 1 0 5.4"/>`, FILLED);
const FULLSCREEN = svg('<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>', STROKED);

const timecode = (seconds: number): string => {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
};

/**
 * Media controls specimen: a player wearing its bar, with the transport button, the
 * timecodes, the progress track, volume and fullscreen in the order every deck has
 * used since tape. Playing advances the position on the stage's clock and the bar
 * stands down while the picture runs, which is the second half of the definition.
 *
 * The subject is the bar, not the player: the term names the cluster of controls, and
 * the picture under it is the thing being controlled. The bar is drawn over the poster
 * and inset from its edges, so hiding it moves nothing (SPEC §5).
 *
 * One button carries play and pause, because that flip is the term rather than an
 * incidental state: a bar whose primary control moved between presses would be the
 * mistake the article is about, and the script drives both directions itself (SPEC §8).
 * The track here only reports position: dragging a playhead is scrubbing, which is its
 * own term and its own specimen.
 *
 * A line under the player once read "The bar stands down while the picture plays, and
 * comes back on the first move." No player prints that, and the specimen performs it in
 * front of the reader, so it went and the article carries the point.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 404px; padding: 12px">
        <div
          data-part="player"
          style="position: relative; height: 196px; border-radius: 6px; overflow: hidden;
                 background: linear-gradient(155deg, #22304a 0%, #3d5c7a 55%, #7f9bad 100%)"
        >
          <div
            data-part="poster"
            aria-hidden="true"
            style="position: absolute; inset: 0"
          >
            <div style="position: absolute; left: 44px; top: 34px; width: 62px; height: 62px; border-radius: 50%; background: #f0e6d2; opacity: 0.6"></div>
            <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 74px; background: #16202f; opacity: 0.55"></div>
          </div>
          <div
            class="sp-row"
            data-part="bar"
            data-subject
            role="group"
            aria-label="Playback"
            style="position: absolute; left: 10px; right: 10px; bottom: 10px; height: 38px; gap: 8px;
                   padding: 0 8px; border-radius: 8px; background: rgb(10 12 18 / 0.78); color: #ffffff;
                   transition: opacity 0.24s, visibility 0.24s"
          >
            <button class="sp-icon-button" type="button" data-part="play" aria-label="Play" style="color: inherit">${PLAY}</button>
            <span data-part="elapsed" style="width: 30px; font-size: 12px; text-align: right">${timecode(START)}</span>
            <div class="sp-progress sp-grow" data-part="progress" style="--sp-value: ${(START / TOTAL) * 100}%">
              <div class="sp-progress-fill"></div>
            </div>
            <span style="width: 30px; font-size: 12px">${timecode(TOTAL)}</span>
            <button class="sp-icon-button" type="button" data-part="volume" aria-label="Mute" style="color: inherit">${VOLUME}</button>
            <button class="sp-icon-button" type="button" data-part="fullscreen" aria-label="Full screen" style="color: inherit">${FULLSCREEN}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const player = part(root, 'player');
  const bar = part(root, 'bar');
  const play = part(root, 'play');
  const elapsed = part(root, 'elapsed');
  const progress = part(root, 'progress');

  let at = START;
  let tick: number | undefined;
  let idle: number | undefined;

  const draw = () => {
    elapsed.textContent = timecode(at);
    progress.style.setProperty('--sp-value', `${(at / TOTAL) * 100}%`);
  };

  const show = () => {
    bar.style.removeProperty('opacity');
    bar.style.removeProperty('visibility');
    flag(bar, 'data-shown', true);
  };

  const hide = () => {
    bar.style.opacity = '0';
    bar.style.visibility = 'hidden';
    flag(bar, 'data-shown', false);
  };

  /** Playing hides the bar after a still moment; paused, it always stays up. */
  const restIdle = () => {
    clock.clearTimeout(idle);
    show();
    if (player.hasAttribute('data-playing')) idle = clock.setTimeout(hide, IDLE_MS);
  };

  const advance = () => {
    at = Math.min(at + TICK_SECONDS, TOTAL);
    draw();
    if (at >= TOTAL) {
      setPlaying(false);
      return;
    }
    tick = clock.setTimeout(advance, TICK_MS);
  };

  function setPlaying(on: boolean): void {
    clock.clearTimeout(tick);
    flag(player, 'data-playing', on);
    play.innerHTML = on ? PAUSE : PLAY;
    play.setAttribute('aria-label', on ? 'Pause' : 'Play');
    if (on) tick = clock.setTimeout(advance, TICK_MS);
    restIdle();
  }

  // The one control that carries both directions, glyph and name swapped together.
  play.addEventListener('click', () => setPlaying(!player.hasAttribute('data-playing')));

  // Any movement over the picture brings the bar back, which is how a hidden bar is
  // recovered in every player there has ever been.
  player.addEventListener('pointerover', restIdle);

  flag(bar, 'data-shown', true);
  draw();
}
