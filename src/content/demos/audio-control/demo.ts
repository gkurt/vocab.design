import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How often the drawn levels are redrawn while something is making noise. */
const LEVEL_MS = 170;
const BARS = 18;

type Mode = 'control' | 'none';

const CAPTION = {
  control:
    'A stop the reader can reach in the first line of the page. Sound is drawn as a level here, never played: the specimen makes no noise.',
  none: 'Nothing stops it. The voice is still speaking, but it is speaking under the video, so the control that would help cannot be heard being announced.',
} as const;

/**
 * Audio control specimen: a page that starts a video by itself, with a pick between offering a stop
 * the reader can reach and offering none. The screen reader voice keeps speaking either way; what
 * changes is whether anything can be heard over the page.
 *
 * No input the player has can make a page emit sound, so the sound is the one thing simulated here,
 * and it is drawn as a level rather than claimed as audio (SPEC §8 allows a simulation only for a
 * condition no input could perform). The caption says so in the specimen's own words.
 *
 * The subject is the stop control, since the criterion is about its availability: it holds its slot
 * in both states and is simply not there to be used in one, which identify summons it out of
 * (SPEC §6). It is the term in every state it is visible in, so no `data-pose` is needed. The media
 * card, the voice card, the picker and the caption are scenery (SPEC §5).
 *
 * The levels are redrawn on the DemoClock, so a pose holds one frame of them, and the redraw is
 * gated on `prefersReducedMotion` rather than left running for a reader who asked for less.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const meter = (name: string, extra: string) => `
    <span data-part="${name}" style="display: flex; align-items: flex-end; gap: 2px; height: 16px; ${extra}">
      ${Array.from({ length: BARS }, () => '<span style="width: 3px; height: 2px; border-radius: 1px; background: currentColor; transition: height 0.16s linear"></span>').join('')}
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">A page that starts a video on load</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="control" data-axis="Page" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-control" value="control"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Stop offered</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">No control</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="media" data-playing="yes" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Autumn promo, playing since load</span>
            <span class="sp-label" data-part="meta" style="flex: 0 0 auto; font-size: 10px">1:20 clip, unmuted</span>
          </div>
          <div class="sp-row" style="margin-top: 6px; gap: 10px">
            <span class="sp-context" style="flex: 1 1 auto; min-width: 0; color: var(--sp-accent)">
              ${meter('level-page', '')}
            </span>
            <span style="flex: 0 0 auto; width: 92px; display: flex; justify-content: flex-end">
              <button class="sp-button sp-button--sm" type="button" data-part="stop" data-subject
                      style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap; transition: opacity 0.18s ease">Stop sound</button>
            </span>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Screen reader, portrayed</span>
            <span class="sp-label" data-part="heard" data-state="masked"
                  style="flex: 0 0 auto; font-size: 10px">masked by the page audio</span>
          </div>
          <div class="sp-row" style="margin-top: 6px; gap: 10px">
            <span style="flex: 0 0 auto; color: var(--sp-muted)">${meter('level-voice', '')}</span>
            <span class="sp-text sp-text--ink" data-part="voice"
                  style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; line-height: 16px; white-space: nowrap;
                         opacity: 0.32; transition: opacity 0.2s ease">“Stop sound, button. Skip to content, link.”</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="control"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.control}</p>
      </div>
    </div>
  `;

  const media = part(root, 'media');
  const stop = part(root, 'stop');
  const heard = part(root, 'heard');
  const voice = part(root, 'voice');
  const caption = part(root, 'caption');
  const pageBars = [...part(root, 'level-page').children] as HTMLElement[];
  const voiceBars = [...part(root, 'level-voice').children] as HTMLElement[];
  const reduced = prefersReducedMotion(root);

  let mode: Mode = 'control';
  let playing = true;
  let frame = 0;

  /** A travelling wave rather than noise, so the drawn level is the same on every play. */
  const draw = (bars: HTMLElement[], peak: number, phase: number) => {
    bars.forEach((bar, index) => {
      const wave = 0.5 + 0.5 * Math.sin(index * 0.9 + frame * 0.7 + phase);
      bar.style.height = `${(2 + peak * wave).toFixed(1)}px`;
    });
  };

  const paint = () => {
    draw(pageBars, playing ? 13 : 0, 0);
    draw(voiceBars, 6, 1.8);
  };

  const tick = () => {
    frame += 1;
    paint();
    clock.setTimeout(tick, LEVEL_MS);
  };

  const render = () => {
    media.dataset.playing = playing ? 'yes' : 'no';
    stop.style.opacity = mode === 'control' ? '1' : '0';
    stop.style.visibility = mode === 'control' ? 'visible' : 'hidden';
    heard.dataset.state = playing ? 'masked' : 'clear';
    heard.textContent = playing ? 'masked by the page audio' : 'audible, nothing competing';
    voice.style.opacity = playing ? '0.32' : '1';
    paint();
  };

  const apply = (next: Mode) => {
    mode = next;
    playing = true;
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    render();
  };

  // Absolute rather than a toggle: the press silences the page, whatever state it found (SPEC §8).
  stop.addEventListener('click', () => {
    playing = false;
    render();
  });

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('control');
  if (!reduced) tick();
}
