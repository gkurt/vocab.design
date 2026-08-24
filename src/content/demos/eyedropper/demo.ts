import { localPoint, localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** No pipette in the kit's icon set and the kit is frozen, so the glyph is drawn against
    `.sp-icon`, which carries the stroke weight and the size every other glyph uses. */
const PIPETTE = `<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="17.4" cy="6.6" r="2.9"/>
  <path d="M15.4 8.6 6.5 17.5V20h2.5l8.9-8.9"/>
</svg>`;

/** The artwork, written out rather than generated: the same picture on every run, so the
    colour a sample reports is the same colour every time (SPEC §8). */
const BANDS = [
  { from: '#ffd166', to: '#f7936b' },
  { from: '#f7936b', to: '#ef476f' },
  { from: '#ef476f', to: '#8d4a8f' },
  { from: '#8d4a8f', to: '#3f5aa6' },
  { from: '#3f5aa6', to: '#118ab2' },
];

const START = '#9aa3b2';

const channels = (hex: string) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));

const toHex = (rgb: number[]) => `#${rgb.map((n) => Math.round(n).toString(16).padStart(2, '0')).join('')}`;

/** Componentwise in sRGB, which is what the painted `linear-gradient` does, so the loupe
    reads back the colour the reader is actually pointing at. */
const mix = (a: string, b: string, t: number) => {
  const from = channels(a);
  const to = channels(b);
  return toHex(from.map((n, i) => n + ((to[i] ?? n) - n) * t));
};

const clamp = (n: number, low: number, high: number) => Math.min(high, Math.max(low, n));

const band = ({ from, to }: { from: string; to: string }, i: number) => `
  <div data-part="band-${i + 1}" style="flex: 1 1 0; background: linear-gradient(90deg, ${from}, ${to})"></div>`;

/**
 * Eyedropper specimen: a poster beside the fill it is being sampled into. Arming the tool puts
 * the pointer into sampling mode, moving over the artwork shows the colour under the point in a
 * loupe, and a click keeps it, which disarms the tool the way one `EyeDropper` reading does.
 *
 * The subject is the eyedropper control itself, the narrowest element the term names: the
 * artwork is what is being sampled, the swatch and hex are the field the reading lands in, and
 * both are scenery. It is honestly an eyedropper armed or resting, so no `data-pose` condition
 * is needed.
 *
 * The sample resolves from the event's own coordinate, against the band under it, so nothing
 * here carries `data-aim`: an element aimed at its corner would report the colour at its corner
 * (SPEC §7). The loupe is absolutely positioned and clamped inside the artwork, so it can never
 * move the layout or leave the frame (SPEC §5), and the tool arms rather than toggling, with
 * the keep as its explicit end (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Poster study</span>
          <span class="sp-label" style="font-size: 12px">Sky layer</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            data-part="art"
            style="position: relative; display: flex; flex-direction: column; height: 150px; border: 1px solid var(--sp-line);
                   border-radius: 6px; overflow: hidden"
          >
            ${BANDS.map(band).join('')}
            <span
              data-part="sun"
              data-solid="#ffe9a3"
              style="position: absolute; left: 330px; top: 14px; width: 44px; height: 44px; border-radius: 50%; background: #ffe9a3"
            ></span>
            <span
              data-part="cloud"
              data-solid="#ffd9c2"
              style="position: absolute; left: 34px; top: 66px; width: 96px; height: 10px; border-radius: 5px; background: #ffd9c2"
            ></span>
            <span
              data-part="loupe"
              aria-hidden="true"
              style="position: absolute; left: 50%; top: 50%; width: 52px; height: 52px; translate: -50% -50%; border-radius: 50%;
                     border: 3px solid var(--sp-surface); box-shadow: 0 2px 8px rgb(16 24 40 / 0.35); overflow: hidden;
                     pointer-events: none; opacity: 0; visibility: hidden; transition: opacity 0.12s, visibility 0.12s"
            >
              <span
                style="position: absolute; inset: 0; background-image:
                  repeating-linear-gradient(90deg, rgb(0 0 0 / 0.13) 0 1px, transparent 1px 13px),
                  repeating-linear-gradient(180deg, rgb(0 0 0 / 0.13) 0 1px, transparent 1px 13px)"
              ></span>
              <span
                style="position: absolute; left: 50%; top: 50%; width: 13px; height: 13px; translate: -50% -50%;
                       box-shadow: inset 0 0 0 2px var(--sp-surface)"
              ></span>
            </span>
          </div>

          <div class="sp-row" style="gap: 10px">
            <span class="sp-label sp-context">Fill</span>
            <div
              class="sp-row sp-context"
              data-part="field"
              data-from="typed"
              style="gap: 8px; padding: 4px 8px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)"
            >
              <span
                data-part="swatch"
                style="width: 20px; height: 20px; border-radius: 4px; background: ${START}; box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.14)"
              ></span>
              <span data-part="hex" style="font-size: 12px; font-variant-numeric: tabular-nums">${START.toUpperCase()}</span>
            </div>
            <button
              class="sp-icon-button"
              type="button"
              data-part="dropper"
              data-subject
              data-armed="false"
              aria-pressed="false"
              aria-label="Eyedropper"
              style="width: 30px; height: 30px"
            >${PIPETTE}</button>
          </div>

          <span
            class="sp-label sp-context"
            data-part="hint"
            data-mode="idle"
            role="status"
            style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
          >The fill was typed in. Take the eyedropper to sample the poster instead.</span>
        </div>
      </div>
    </div>
  `;

  const art = part(root, 'art');
  const loupe = part(root, 'loupe');
  const dropper = part(root, 'dropper');
  const field = part(root, 'field');
  const swatch = part(root, 'swatch');
  const hexOut = part(root, 'hex');
  const hint = part(root, 'hint');

  let armed = false;

  const say = (mode: string, text: string) => {
    hint.dataset.mode = mode;
    hint.textContent = text;
  };

  const setArmed = (next: boolean) => {
    armed = next;
    dropper.dataset.armed = String(next);
    dropper.setAttribute('aria-pressed', String(next));
    // The kit's own trigger-holds-a-surface paint, plus a ring, so an armed tool reads as
    // armed without the demo inventing a second look for it.
    if (next) dropper.setAttribute('data-open', '');
    else dropper.removeAttribute('data-open');
    dropper.style.boxShadow = next ? 'inset 0 0 0 1px var(--sp-accent)' : 'none';
    art.style.cursor = next ? 'crosshair' : 'default';
    if (!next) {
      loupe.style.opacity = '0';
      loupe.style.visibility = 'hidden';
    }
  };

  /** What is under this point: a shape reports its own fill, the sky is read off the band. */
  const sampleAt = (event: MouseEvent): { hex: string; from: string } => {
    const solid = (event.target as Element | null)?.closest('[data-solid]');
    if (solid instanceof HTMLElement) return { hex: solid.dataset.solid ?? START, from: solid.dataset.part ?? 'shape' };
    const box = localSize(art);
    const at = localPoint(event, art);
    const x = clamp(at.x, 0, box.width);
    const y = clamp(at.y, 0, box.height);
    const index = clamp(Math.floor((y / box.height) * BANDS.length), 0, BANDS.length - 1);
    const stripe = BANDS[index];
    if (!stripe) return { hex: START, from: 'sky' };
    return { hex: mix(stripe.from, stripe.to, x / box.width), from: `band-${index + 1}` };
  };

  const showLoupe = (event: MouseEvent, hex: string) => {
    const box = localSize(art);
    const at = localPoint(event, art);
    loupe.style.left = `${clamp(at.x, 28, box.width - 28)}px`;
    loupe.style.top = `${clamp(at.y, 28, box.height - 28)}px`;
    loupe.style.background = hex;
    loupe.style.opacity = '1';
    loupe.style.visibility = 'visible';
  };

  dropper.addEventListener('click', () => {
    // Arms; it never flips what it finds, so a pass picked up anywhere ends up sampling.
    setArmed(true);
    say('armed', 'Sampling. Move over the poster, then click to keep the colour.');
  });

  art.addEventListener('pointermove', (event) => {
    if (!armed) return;
    const { hex } = sampleAt(event as PointerEvent);
    showLoupe(event as PointerEvent, hex);
    say('preview', `Sampling ${hex.toUpperCase()}. Click to keep it.`);
  });

  art.addEventListener('click', (event) => {
    if (!armed) return;
    const { hex, from } = sampleAt(event as MouseEvent);
    swatch.style.background = hex;
    hexOut.textContent = hex.toUpperCase();
    field.dataset.from = from;
    setArmed(false);
    say('kept', `Kept ${hex.toUpperCase()}, read off the poster rather than typed.`);
  });

  // A real sampler lets go on Escape, which is also what the browser API's promise does.
  root.addEventListener('keydown', (event) => {
    if ((event as KeyboardEvent).key !== 'Escape' || !armed) return;
    setArmed(false);
    say('idle', 'Sampling cancelled. The fill kept the colour it had.');
  });

  setArmed(false);
}
