import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TOTAL = 134;
/** One tick of the stage's clock, and the second of recording it stands for. */
const TICK_MS = 150;
/** How long the picture stalls before the buffer catches up again. */
const BUFFER_MS = 900;

const FILLED = 'fill: currentcolor; stroke: none';
const STROKED = 'fill: none; stroke: currentcolor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round';

const svg = (body: string, style: string, size = 16) =>
  `<svg class="sp-icon" viewBox="0 0 24 24" style="${style}; width: ${size}px; height: ${size}px" aria-hidden="true">${body}</svg>`;

const PAUSE = svg('<path d="M8 5h3v14H8zM13 5h3v14h-3z"/>', FILLED);
const BIG_PLAY = svg('<path d="M8 5.2 18.4 12 8 18.8z"/>', FILLED, 26);
const FULLSCREEN = svg('<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>', STROKED);

const LINES = [
  { at: 0, text: 'The tide runs out twice a day here.' },
  { at: 14, text: 'Everything the harbour does is timed to it.' },
];

const timecode = (seconds: number): string => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

const dot = (index: number) => `
  <span
    class="sp-pulse"
    style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff; animation-delay: -${(index * 0.6).toFixed(1)}s"
  ></span>`;

/**
 * Video player specimen: the whole assembly around the picture. A poster with a play
 * glyph over it, a controls bar drawn on a scrim inside the frame, a caption line, and
 * the buffering state every player spends part of its life in.
 *
 * The subject is the player frame, which is what this term names: the composite. The
 * bar inside it is its own term (media controls) and dragging the playhead is another
 * (scrubbing), so neither is re-owned here; the bar reports position and does not
 * answer a drag. The window around the frame and the Stall button below it are scenery.
 *
 * Every control reaches a state rather than flipping one (SPEC §8): the poster glyph
 * always starts playback, the bar's transport always pauses, and Stall always drops the
 * picture back into buffering. The bar, the caption line and the buffering badge are all
 * drawn over the picture and inset from its edges, so no state moves anything (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px">
        <div
          data-part="player"
          data-subject
          data-state="paused"
          style="position: relative; height: 212px; border-radius: 6px; overflow: hidden;
                 background: linear-gradient(170deg, #1d3557 0%, #457b9d 48%, #a8c6bd 100%)"
        >
          <div data-part="poster" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden">
            <div style="position: absolute; left: 52px; top: 26px; width: 54px; height: 54px; border-radius: 50%; background: #f6e2b3; opacity: 0.75"></div>
            <div style="position: absolute; left: -30px; right: 40%; bottom: 44px; height: 90px; border-radius: 50% 50% 0 0; background: #23405c; opacity: 0.85"></div>
            <div style="position: absolute; left: 35%; right: -40px; bottom: 44px; height: 66px; border-radius: 50% 50% 0 0; background: #2c5170; opacity: 0.9"></div>
            <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 62px; background: #101a26; opacity: 0.5"></div>
          </div>

          <div
            data-part="overlay"
            style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none"
          >
            <button
              type="button"
              data-part="play"
              aria-label="Play"
              style="display: flex; align-items: center; justify-content: center; width: 54px; height: 54px; padding: 0 0 0 3px;
                     border: 0; border-radius: 50%; background: rgb(10 12 18 / 0.62); color: #ffffff; cursor: pointer; pointer-events: auto"
            >${BIG_PLAY}</button>
          </div>

          <div
            class="sp-row"
            data-part="buffering"
            role="status"
            aria-label="Buffering"
            hidden
            style="position: absolute; left: 50%; top: 50%; translate: -50% -50%; gap: 6px; padding: 9px 12px;
                   border-radius: 999px; background: rgb(10 12 18 / 0.62)"
          >${dot(0)}${dot(1)}${dot(2)}</div>

          <div
            data-part="caption-line"
            hidden
            style="position: absolute; left: 50%; bottom: 58px; translate: -50% 0; max-width: 84%; padding: 3px 9px;
                   border-radius: 4px; background: rgb(10 12 18 / 0.74); color: #ffffff; font-size: 12px; text-align: center"
          >${LINES[0]?.text ?? ''}</div>

          <div
            class="sp-row"
            data-part="bar"
            role="group"
            aria-label="Playback"
            style="position: absolute; left: 10px; right: 10px; bottom: 10px; height: 36px; gap: 8px; padding: 0 8px;
                   border-radius: 8px; background: rgb(10 12 18 / 0.78); color: #ffffff"
          >
            <button class="sp-icon-button" type="button" data-part="transport" aria-label="Pause" style="flex: 0 0 auto; color: inherit">${PAUSE}</button>
            <span data-part="elapsed" style="flex: 0 0 auto; width: 28px; font-size: 12px; text-align: right; font-variant-numeric: tabular-nums">0:00</span>
            <div class="sp-progress" data-part="track" style="--sp-value: 0%; flex: 1 1 0; min-width: 0">
              <div class="sp-progress-fill"></div>
            </div>
            <span style="flex: 0 0 auto; width: 28px; font-size: 12px; font-variant-numeric: tabular-nums">${timecode(TOTAL)}</span>
            <span
              aria-hidden="true"
              style="display: flex; flex: 0 0 auto; align-items: center; height: 16px; padding: 0 4px; border: 1px solid currentcolor;
                     border-radius: 3px; font-size: 9px; font-weight: 600; letter-spacing: 0.06em"
              >CC</span
            >
            <button class="sp-icon-button" type="button" data-part="fullscreen" aria-label="Full screen" style="flex: 0 0 auto; color: inherit">${FULLSCREEN}</button>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <span class="sp-text" style="font-size: 12px">Poster, bar, captions and the stall between them.</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="stall">Stall</button>
        </div>
      </div>
    </div>
  `;

  const player = part(root, 'player');
  const overlay = part(root, 'overlay');
  const buffering = part(root, 'buffering');
  const captionLine = part(root, 'caption-line');
  const transport = part(root, 'transport');
  const elapsed = part(root, 'elapsed');
  const track = part(root, 'track');

  let at = 0;
  let tick: number | undefined;
  let stall: number | undefined;

  const draw = () => {
    elapsed.textContent = timecode(at);
    track.style.setProperty('--sp-value', `${(at / TOTAL) * 100}%`);
    const line = [...LINES].reverse().find((l) => at >= l.at);
    if (line) captionLine.textContent = line.text;
  };

  const setState = (next: 'paused' | 'buffering' | 'playing') => {
    player.dataset.state = next;
    overlay.hidden = next !== 'paused';
    buffering.hidden = next !== 'buffering';
    captionLine.hidden = next !== 'playing';
    transport.style.visibility = next === 'paused' ? 'hidden' : 'visible';
  };

  const advance = () => {
    at = Math.min(at + 1, TOTAL);
    draw();
    if (at >= TOTAL) {
      setState('paused');
      return;
    }
    tick = clock.setTimeout(advance, TICK_MS);
  };

  const run = () => {
    clock.clearTimeout(tick);
    setState('playing');
    tick = clock.setTimeout(advance, TICK_MS);
  };

  /** Always a stall from wherever the picture is, so a resumed script lands the same. */
  const buffer = () => {
    clock.clearTimeout(tick);
    clock.clearTimeout(stall);
    setState('buffering');
    stall = clock.setTimeout(run, BUFFER_MS);
  };

  part(root, 'play').addEventListener('click', buffer);
  part(root, 'stall').addEventListener('click', buffer);

  transport.addEventListener('click', () => {
    clock.clearTimeout(tick);
    clock.clearTimeout(stall);
    setState('paused');
  });

  setState('paused');
  draw();
}
