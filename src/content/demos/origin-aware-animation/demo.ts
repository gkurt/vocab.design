import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CANVAS = { w: 434, h: 186 };
const PANEL = { w: 178, h: 112, top: 46 };
const TRIGGER = { w: 74, h: 26, top: 8 };
const OPEN_MS = 340;
const SHUT_MS = 200;

type Anchor = 'a' | 'b' | 'c';

/** Each trigger's own left edge, and the panel placement that puts a corner under it. */
const ANCHORS: Record<Anchor, { trigger: number; panel: number; origin: string; dot: [string, string] }> = {
  a: { trigger: 8, panel: 8, origin: '0% 0%', dot: ['0%', '0%'] },
  b: { trigger: 180, panel: 180 + TRIGGER.w / 2 - PANEL.w / 2, origin: '50% 0%', dot: ['50%', '0%'] },
  c: { trigger: CANVAS.w - 8 - TRIGGER.w, panel: CANVAS.w - 8 - PANEL.w, origin: '100% 0%', dot: ['100%', '0%'] },
};

const CENTRE = { origin: '50% 50%', dot: ['50%', '50%'] as [string, string] };

const trigger = (key: Anchor, label: string) => `
  <button
    class="sp-button sp-button--sm" type="button" data-part="trig-${key}"
    style="position: absolute; left: ${ANCHORS[key].trigger}px; top: ${TRIGGER.top}px;
           width: ${TRIGGER.w}px; height: ${TRIGGER.h}px; justify-content: center"
  >${label}</button>`;

/**
 * Origin-aware animation specimen: one panel, three triggers, and the only thing that changes
 * between them is where the scale starts. The panel is placed so that one of its own corners sits
 * under the trigger that was pressed, and `transform-origin` is set to that same corner, so the
 * entrance grows out of the button rather than out of nowhere. The origin is drawn as a dot and
 * printed underneath, because the whole term is that one pair of percentages.
 *
 * The subject is the panel. Centre origin is the counter-example the specimen exists to contrast,
 * and it is a state the subject itself passes through, so the honest condition is declared in
 * `data-pose` on the panel and the mount state satisfies it: identify refuses to ring a panel that
 * is currently growing from its own middle (SPEC §6). The triggers, the segmented control and the
 * readout are the scene.
 *
 * Each trigger reaches the open state from its own corner and Close reaches the shut one, so no
 * step flips whatever it finds (SPEC §8). `motion.css` cannot reach an `element.animate` keyframe
 * set, so the demo asks `prefersReducedMotion` itself and lands the panel open with no growth at
 * all. Everything in the canvas is absolutely placed against a box fixed at mount, so opening and
 * closing move nothing (SPEC §5), and the settle beats come from the stage's clock.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="open" data-anchor="a" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Origin</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="trigger" data-axis="Grows from" data-term="trigger">
            <button class="sp-segment" type="button" data-part="seg-trigger" value="trigger">Trigger</button>
            <button class="sp-segment" type="button" data-part="seg-centre" value="centre">Centre</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div data-part="canvas" style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px">
            <div class="sp-context">
              ${trigger('a', 'Share')}${trigger('b', 'Sort')}${trigger('c', 'More')}
            </div>

            <div
              class="sp-surface" data-part="panel" data-subject data-pose="[data-origin=trigger]" data-origin="trigger"
              style="position: absolute; left: ${ANCHORS.a.panel}px; top: ${PANEL.top}px; width: ${PANEL.w}px;
                     height: ${PANEL.h}px; padding: 12px; box-shadow: var(--sp-shadow); transform-origin: ${ANCHORS.a.origin};
                     visibility: hidden; opacity: 0; display: flex; flex-direction: column; gap: 8px"
            >
              <span class="sp-heading" style="font-size: 13px">Share with</span>
              <span class="sp-line" style="width: 116px"></span>
              <span class="sp-line" style="width: 84px"></span>
              <button
                class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="close"
                style="margin-top: auto; align-self: flex-start"
              >Close</button>
              <span
                data-part="origin" aria-hidden="true"
                style="position: absolute; left: ${ANCHORS.a.dot[0]}; top: ${ANCHORS.a.dot[1]}; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px;
                       border-radius: 50%; background: var(--sp-accent)"
              ></span>
            </div>

            <span
              class="sp-label sp-context" data-part="readout"
              style="position: absolute; left: 8px; bottom: 0; font-size: 11px"
            >transform-origin: ${ANCHORS.a.origin}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const panel = part(root, 'panel');
  const dot = part(root, 'origin');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);

  let anchor: Anchor = 'a';
  let centred = false;
  let running: Animation | undefined;
  let settling: number | undefined;

  const place = () => {
    const spot = ANCHORS[anchor];
    const origin = centred ? CENTRE.origin : spot.origin;
    const [dotX, dotY] = centred ? CENTRE.dot : spot.dot;
    panel.style.left = `${spot.panel}px`;
    panel.style.transformOrigin = origin;
    panel.dataset.origin = centred ? 'centre' : 'trigger';
    dot.style.left = dotX;
    dot.style.top = dotY;
    readout.textContent = `transform-origin: ${origin}`;
  };

  const landOpen = () => {
    running?.cancel();
    running = undefined;
    panel.style.visibility = 'visible';
    panel.style.opacity = '1';
    panel.style.transform = 'none';
    scene.dataset.state = 'open';
  };

  const landShut = () => {
    running?.cancel();
    running = undefined;
    panel.style.visibility = 'hidden';
    panel.style.opacity = '0';
    panel.style.transform = 'scale(0.2)';
    scene.dataset.state = 'shut';
  };

  const open = (next: Anchor) => {
    clock.clearTimeout(settling);
    running?.cancel();
    anchor = next;
    scene.dataset.anchor = next;
    place();
    if (reduced) return landOpen();
    panel.style.visibility = 'visible';
    panel.style.opacity = '1';
    scene.dataset.state = 'opening';
    running = panel.animate(
      [
        { transform: 'scale(0.2)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      {
        duration: OPEN_MS,
        easing: 'cubic-bezier(0.3, 0.9, 0.3, 1)',
        fill: 'forwards',
      },
    );
    settling = clock.setTimeout(landOpen, OPEN_MS + 60);
  };

  const shut = () => {
    clock.clearTimeout(settling);
    running?.cancel();
    if (reduced) return landShut();
    scene.dataset.state = 'shutting';
    running = panel.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0.2)', opacity: 0 },
      ],
      {
        duration: SHUT_MS,
        easing: 'ease-in',
        fill: 'forwards',
      },
    );
    settling = clock.setTimeout(landShut, SHUT_MS + 40);
  };

  for (const key of ['a', 'b', 'c'] as const) {
    // Each trigger reaches "open, from here": pressing the one already showing replays its own
    // entrance rather than dismissing the panel, so a resumed pass lands where it said it would.
    part(root, `trig-${key}`).addEventListener('click', () => open(key));
  }
  part(root, 'close').addEventListener('click', shut);
  part(root, 'mode').addEventListener('change', (event) => {
    centred = (event as CustomEvent<string>).detail === 'centre';
    open(anchor);
  });

  open('a');
}
