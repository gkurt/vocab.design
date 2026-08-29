import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the full file spends in flight before it lands. */
const ARRIVE_MS = 1200;

/** The full picture: enough gradient layers to read as a photograph rather than a fill. */
const FULL = [
  'radial-gradient(ellipse 150px 46px at 16% 104%, #24402f 0 62%, transparent 63%)',
  'radial-gradient(ellipse 120px 70px at 78% 100%, #3d6247 0 66%, transparent 67%)',
  'radial-gradient(ellipse 190px 96px at 42% 118%, #4c7a53 0 70%, transparent 71%)',
  'radial-gradient(circle at 76% 22%, #fff4c4 0 13px, #ffd45e 0 19px, rgb(255 212 94 / 0.35) 0 30px, transparent 31px)',
  'linear-gradient(#5aa7dc 0%, #a9d4ec 44%, #f2cea8 100%)',
].join(', ');

/** The blur-up stand-in: the same composition, at a resolution with nothing in it. */
const BLUR_STUB = [
  'radial-gradient(circle at 76% 24%, #ffdc7a 0 22px, transparent 23px)',
  'linear-gradient(#5da8dd, #a8d3ec 40%, #f0cd9f 62%, #4a7853)',
].join(', ');

/** The two stand-ins, both derived from the picture above and both a few hundred bytes. */
const PLACEHOLDER = {
  blur: {
    paint: BLUR_STUB,
    filter: 'blur(11px)',
    note: 'Stand-in: a 20 pixel copy, upscaled and blurred',
  },
  colour: {
    paint: 'linear-gradient(#8fb9c4, #8fb9c4)',
    filter: 'none',
    note: 'Stand-in: one averaged colour, seven bytes',
  },
} as const;

type Kind = keyof typeof PLACEHOLDER;

const LANDED = 'Full file: 1600 by 1000, decoded';

/**
 * Progressive image loading specimen: the same picture arriving twice, first as a
 * stand-in that paints with the markup and then as the file itself, cross-faded on
 * top of it.
 *
 * The subject is the image slot, since the term names the box that holds both passes
 * rather than either one alone: the stand-in by itself is a blurred rectangle and the
 * full file by itself is just a photograph. The frame, the caption, and the two
 * controls are scenery (SPEC §5). The slot is a fixed rectangle and the caption line
 * keeps its height, so arriving moves nothing (SPEC §5).
 *
 * `data-pose` holds identify to the state that is the term. Once the file has landed
 * the slot is an ordinary picture, and a ring drawn around that would be pointing at
 * the thing this pattern exists to postpone.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 224px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field notes</span><span class="sp-label">3G</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="slot"
            data-subject
            data-pose="[data-phase=placeholder]"
            data-kind="blur"
            data-phase="placeholder"
            role="img"
            aria-label="Hillside at sunrise"
            style="position: relative; flex: 0 0 auto; width: 252px; height: 128px; border-radius: 6px; overflow: hidden; background: var(--sp-line)"
          >
            <div
              data-part="stand-in"
              style="position: absolute; inset: -14px; background: ${PLACEHOLDER.blur.paint}; filter: ${PLACEHOLDER.blur.filter}"
            ></div>
            <div
              data-part="full"
              style="position: absolute; inset: 0; opacity: 0; background: ${FULL}; transition: opacity 0.45s var(--sp-ease)"
            ></div>
          </div>
          <span class="sp-label sp-context" data-part="phase" role="status"
                style="display: block; height: 16px; white-space: nowrap">${PLACEHOLDER.blur.note}</span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Placeholder" data-part="kind" data-value="blur">
          <button class="sp-segment" data-part="kind-blur" value="blur">Blur</button>
          <button class="sp-segment" data-part="kind-colour" value="colour">Colour</button>
        </sp-segmented>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reload" type="button">Reload</button>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const standIn = part(root, 'stand-in');
  const full = part(root, 'full');
  const phase = part(root, 'phase');
  let timer: number | undefined;

  const load = (kind: Kind) => {
    const stub = PLACEHOLDER[kind];
    clock.clearTimeout(timer);
    slot.dataset.kind = kind;
    slot.dataset.phase = 'placeholder';
    standIn.style.background = stub.paint;
    standIn.style.filter = stub.filter;
    full.style.opacity = '0';
    phase.textContent = stub.note;
    timer = clock.setTimeout(() => {
      slot.dataset.phase = 'loaded';
      full.style.opacity = '1';
      phase.textContent = LANDED;
    }, ARRIVE_MS);
  };

  part(root, 'kind').addEventListener('change', (event) => {
    load((event as CustomEvent<string>).detail === 'colour' ? 'colour' : 'blur');
  });

  part(root, 'reload').addEventListener('click', () => load(slot.dataset.kind === 'colour' ? 'colour' : 'blur'));

  load('blur');
}
