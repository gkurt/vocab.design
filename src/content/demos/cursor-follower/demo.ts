import { localPoint, localSize } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const FIELD = { w: 434, h: 184 };
const RING = 34;
const DOT = 10;
/** Half the swollen ring, so neither piece can reach past the field it lives in. */
const PAD = 27;

type Lag = 'tight' | 'loose' | 'instant';

const LAG: Record<Lag, { dot: number; ring: number; note: string }> = {
  tight: { dot: 60, ring: 130, note: 'dot 60 ms behind, ring 130 ms' },
  loose: { dot: 140, ring: 360, note: 'dot 140 ms behind, ring 360 ms' },
  instant: { dot: 0, ring: 0, note: 'no lag: a second arrow, with nothing trailing' },
};

/** Fixed spots, written out rather than scattered, so every run mounts the same scene. */
const LINKS = [
  { key: 'a', label: 'Work', left: 40, top: 46 },
  { key: 'b', label: 'Studio', left: 268, top: 34 },
  { key: 'c', label: 'Journal', left: 96, top: 126 },
  { key: 'd', label: 'Contact', left: 310, top: 118 },
] as const;

const link = (l: (typeof LINKS)[number]) => `
  <span
    class="sp-text sp-text--ink" data-part="link-${l.key}" data-link
    style="position: absolute; left: ${l.left}px; top: ${l.top}px; padding-bottom: 2px;
           border-bottom: 2px solid var(--sp-accent); font-size: 14px; font-weight: 500"
  >${l.label}</span>`;

/**
 * Cursor follower specimen: a ring and a dot that chase the pointer across a field with the native
 * cursor turned off, and a segmented control setting how far behind they run. The lag is written as
 * a CSS transition on `transform` rather than as an animation frame loop: every pointer move
 * restarts the transition toward the newest position, which is the cheapest honest version of the
 * effect and the one the kit can switch off for a reader who has asked for less movement.
 *
 * The subject is the ring, the piece that actually trails. `Instant` is the counter-example the
 * control exists to offer, and it is a state the ring itself passes through, so the honest condition
 * is declared in `data-pose` and the mount state (`loose`) satisfies it: a follower with no lag is
 * not following anything (SPEC §6). The dot is the pair's other half rather than scenery, so it
 * keeps the accent and stays out of the context register; the only element enclosing both pieces is
 * the field, which is the canvas and not the term. The links, the texture and the readout are the
 * scene.
 *
 * The field carries `data-hover-driven`: moving a pointer across it IS this term's interaction, so a
 * reader's dwell there takes the stage over without a click (SPEC §7). The demo listens for one
 * `pointermove` on its root and does the rest of the work there: it never wires hover listeners to
 * repaint a control, because the stage's player mirrors its own pointer into the kit's attribute
 * spellings already (SPEC §7). The swell over a link is read off the same event. Both pieces are
 * clamped inside the field, so nothing can leave the frame, and both mount at the field's centre
 * from a written-down number rather than from a clock or a random draw.
 *
 * `motion.css` sets `transition: none` under reduced motion, which parks the pair exactly on the
 * pointer with no trail at all; the demo asks `prefersReducedMotion` anyway so the readout says so
 * rather than promising a lag the reader will never see. Everything is absolutely placed inside a
 * field fixed at mount, so nothing in the scene moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lag</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="loose" data-axis="Follow">
            <button class="sp-segment" type="button" data-part="seg-tight" value="tight">Tight</button>
            <button class="sp-segment" type="button" data-part="seg-loose" value="loose">Loose</button>
            <button class="sp-segment" type="button" data-part="seg-instant" value="instant">Instant</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            data-part="field"
            data-hover-driven
            style="position: relative; width: ${FIELD.w}px; height: ${FIELD.h}px; border-radius: 6px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden; cursor: none"
          >
            <div class="sp-context">
              <div data-part="texture" style="position: absolute; left: 40px; top: 82px; width: 210px">
                <span class="sp-line" style="display: block; width: 100%"></span>
                <span class="sp-line" style="display: block; width: 74%; margin-top: 8px"></span>
              </div>
              ${LINKS.map(link).join('')}
              <span
                class="sp-label" data-part="readout"
                style="position: absolute; left: 12px; bottom: 8px; font-size: 11px"
              >${LAG.loose.note}</span>
            </div>

            <span
              data-part="ring" data-subject data-pose=":not([data-lag=instant])" data-lag="loose"
              style="position: absolute; left: 0; top: 0; width: ${RING}px; height: ${RING}px;
                     margin: ${-RING / 2}px 0 0 ${-RING / 2}px; border: 2px solid var(--sp-accent);
                     border-radius: 50%; background: color-mix(in srgb, var(--sp-accent) 12%, transparent);
                     pointer-events: none; will-change: transform"
            ></span>
            <span
              data-part="dot"
              style="position: absolute; left: 0; top: 0; width: ${DOT}px; height: ${DOT}px;
                     margin: ${-DOT / 2}px 0 0 ${-DOT / 2}px; border-radius: 50%; background: var(--sp-accent);
                     pointer-events: none; will-change: transform"
            ></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const ring = part(root, 'ring');
  const dot = part(root, 'dot');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);

  let lag: Lag = 'loose';
  let over = false;
  let at = { x: FIELD.w / 2, y: FIELD.h / 2 };

  const paint = () => {
    ring.style.transform = `translate(${at.x}px, ${at.y}px) scale(${over ? 1.55 : 1})`;
    dot.style.transform = `translate(${at.x}px, ${at.y}px)`;
  };

  const applyLag = () => {
    const { dot: dotMs, ring: ringMs, note } = LAG[lag];
    const ease = 'cubic-bezier(0.2, 0.7, 0.3, 1)';
    ring.style.transition = reduced ? 'none' : `transform ${ringMs}ms ${ease}`;
    dot.style.transition = reduced ? 'none' : `transform ${dotMs}ms ${ease}`;
    ring.dataset.lag = lag;
    readout.textContent = reduced ? 'reduced motion: the pair rests on the pointer' : note;
  };

  const clamp = (value: number, max: number) => Math.min(Math.max(value, PAD), max - PAD);

  root.addEventListener('pointermove', (event) => {
    const box = localSize(field);
    const pointer = localPoint(event, field);
    at = { x: clamp(pointer.x, box.width), y: clamp(pointer.y, box.height) };
    // The swell is the term's own business, read off the move the demo already has: no listener
    // is added merely to light a control the player would light itself.
    over = event.target instanceof Element && event.target.closest('[data-link]') !== null;
    flag(ring, 'data-over', over);
    paint();
  });

  // Each segment names a lag outright, so a resumed pass lands on the one it asked for.
  part(root, 'mode').addEventListener('change', (event) => {
    lag = (event as CustomEvent<string>).detail as Lag;
    applyLag();
  });

  applyLag();
  paint();
}
