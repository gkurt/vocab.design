import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

/** The outgoing view is gone before the incoming one starts: the two never share a frame.
    Both are longer than Material's own 90/210, so the gap in the middle is legible. */
const OUT_MS = 200;
const IN_MS = 400;
/** Where the arriving view starts from: near enough to full size to read as arrival. */
const FROM = 0.92;

const VIEWS = [
  {
    id: 'library',
    label: 'Library',
    body: `<span class="sp-label">Recently played</span>
           <span class="sp-line" style="width: 88%"></span>
           <span class="sp-line" style="width: 64%"></span>
           <span class="sp-line" style="width: 76%"></span>`,
  },
  {
    id: 'alerts',
    label: 'Alerts',
    body: `<span class="sp-label">Two unread</span>
           <span class="sp-surface" style="padding: 8px 10px; font-size: 12px">Storm warning lifted</span>
           <span class="sp-surface" style="padding: 8px 10px; font-size: 12px">Tide table updated</span>`,
  },
  {
    id: 'account',
    label: 'Account',
    body: `<span class="sp-row" style="gap: 8px">
             <span class="sp-avatar">RJ</span>
             <span class="sp-stack" style="gap: 3px">
               <span class="sp-heading" style="font-size: 13px">Rosa Jelen</span>
               <span class="sp-label">Harbour crew</span>
             </span>
           </span>
           <span class="sp-line" style="width: 58%"></span>`,
  },
];

/**
 * Fade through specimen: three unrelated destinations sharing one slot. Picking a
 * destination takes the current view all the way down before the next one comes up, so
 * there is no frame in which both are legible, and the arriving view scales from 92 percent
 * as it fades in, which is the only thing giving the handover a direction.
 *
 * The subject is the slot the views transition through, not any one view: the term names
 * the move between them. The picker, the frame, and the caption are scenery.
 *
 * The two halves are sequenced on the stage's clock, so a pose stops the handover where it
 * stands rather than letting it finish under a reader inspecting it (SPEC §6), and
 * `prefersReducedMotion` is asked directly, because a flattened transition would otherwise
 * leave the demo dealing an instant swap out over two timed beats (SPEC §7). Every view is
 * absolutely positioned in a slot that holds its own height, so the moment when no view is
 * present cannot collapse the layout (SPEC §5), and each segment names an absolute
 * destination, so a fast-forwarded or resumed pass lands where it said (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const segments = VIEWS.map(
    (view) => `<button class="sp-segment sp-grow" data-part="seg-${view.id}" value="${view.id}">${view.label}</button>`,
  ).join('');

  const panels = VIEWS.map(
    (view, index) => `
      <section
        class="sp-surface sp-stack"
        data-part="panel-${view.id}"
        aria-hidden="${index !== 0}"
        style="position: absolute; inset: 0; gap: 8px; padding: 12px; opacity: ${index === 0 ? 1 : 0};
               scale: ${index === 0 ? 1 : FROM}; pointer-events: ${index === 0 ? 'auto' : 'none'}"
      >
        ${view.body}
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 312px; height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour</span>
          <span class="sp-label">Fade through</span>
        </div>
        <div class="sp-body">
          <sp-segmented class="sp-segmented sp-context" data-part="picker" data-axis="View" data-value="library" style="width: 100%">
            ${segments}
          </sp-segmented>
          <div
            data-part="slot"
            data-subject
            data-showing="library"
            data-state="settled"
            style="position: relative; height: 118px; margin-top: 12px"
          >
            ${panels}
          </div>
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  let leaving: number | undefined;
  let settling: number | undefined;

  const paint = (id: string, shown: boolean, ms: number) => {
    const panel = part(root, `panel-${id}`);
    panel.style.transition = ms > 0 ? `opacity ${ms}ms linear, scale ${ms}ms var(--sp-ease)` : 'none';
    panel.style.opacity = shown ? '1' : '0';
    panel.style.scale = shown ? '1' : String(FROM);
    panel.style.pointerEvents = shown ? '' : 'none';
    panel.setAttribute('aria-hidden', String(!shown));
  };

  const show = (id: string) => {
    const from = slot.dataset.showing ?? '';
    if (from === id) return;
    clock.clearTimeout(leaving);
    clock.clearTimeout(settling);
    slot.dataset.showing = id;

    if (prefersReducedMotion(root)) {
      for (const view of VIEWS) paint(view.id, view.id === id, 0);
      slot.dataset.state = 'settled';
      return;
    }

    // Everything that is not the destination leaves first, and nothing arrives until the
    // slot is empty: the gap in the middle is the term.
    slot.dataset.state = 'out';
    for (const view of VIEWS) {
      if (view.id !== id) paint(view.id, false, OUT_MS);
    }
    leaving = clock.setTimeout(() => {
      slot.dataset.state = 'in';
      paint(id, true, IN_MS);
    }, OUT_MS);
    settling = clock.setTimeout(
      () => {
        slot.dataset.state = 'settled';
      },
      OUT_MS + IN_MS + 40,
    );
  };

  part(root, 'picker').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
