import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The track, the thumb, and the travel between them. */
const TRACK = 300;
const THUMB = { w: 42, h: 36 };
const PAD = 3;
const START = PAD;
const END = TRACK - THUMB.w - PAD;
const RANGE = END - START;
/** How far along the track the release has to happen, and how long the spring back takes. */
const THRESHOLD = 0.82;
const SPRING_MS = 300;

/** A coordinate for the script to release at, with no paint of its own (SPEC §5). */
const anchor = (name: string, centre: number) =>
  `<span data-part="${name}" style="position: absolute; left: ${centre - 4}px; top: 16px; width: 8px; height: 8px; pointer-events: none"></span>`;

/**
 * Slide to confirm specimen: a destructive act that commits only when the thumb reaches
 * the far end of its track. A release short of the threshold springs the thumb back and
 * nothing happens, which is the guard visibly working and the state that tells this
 * control apart from every value slider on the site.
 *
 * The subject is the control, track and thumb together: that is what the term names, and
 * it is narrow enough to be one element, so the wrapper is left alone and identify keeps
 * its affordance (SPEC §5). The panel describing the act, the receipt, and the plain
 * button beside the track are the scene.
 *
 * WCAG 2.2 SC 2.5.7 requires a non-dragging way to reach any function operated by
 * dragging, so the specimen ships one: the Erase button beside the track commits the
 * same act with a single click. A slide presented as the only way in would be teaching a
 * conformance failure, which is why the alternative is in the specimen rather than only
 * in the article.
 *
 * The drag is really computed from the pointer. Capture is taken on a trusted pointerdown
 * or a reader's drag dies at the thumb's edge, and the trusted guard is mandatory: the
 * player's synthetic pointers have nothing to capture and the call throws (SPEC §7). The
 * release is answered on pointerup and pointercancel, never on pointerleave, which does
 * not fire while capture holds.
 *
 * The spring back goes to `element.animate`, which `motion.css` cannot reach, so the demo
 * asks `prefersReducedMotion` and simply puts the thumb back instead. Nothing here needs a
 * timer at all, and the receipt sits in a slot reserved from mount, so committing moves
 * nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Device</span>
          <span class="sp-text" data-part="readout" data-outcome="idle" style="flex: 0 0 auto; width: 264px; text-align: right; white-space: nowrap">Slide the thumb all the way</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px">
          <div class="sp-surface sp-context" style="width: 100%; padding: 9px 12px">
            <div class="sp-heading" style="font-size: 13px">Erase this device</div>
            <div class="sp-text" style="font-size: 12px">Two accounts, 41 GB of files, and every saved password.</div>
          </div>

          <div
            data-part="slider"
            data-subject
            data-state="idle"
            style="position: relative; width: ${TRACK}px; height: ${THUMB.h + PAD * 2}px; border-radius: ${(THUMB.h + PAD * 2) / 2}px;
                   background: var(--sp-sunken); box-shadow: inset 0 0 0 1px var(--sp-line); overflow: hidden"
          >
            <span
              data-part="fill"
              style="position: absolute; left: 0; top: 0; bottom: 0; width: ${START + THUMB.w / 2}px; background: var(--sp-accent-soft)"
            ></span>
            <span
              class="sp-label"
              data-part="label"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; white-space: nowrap"
            >Slide to erase</span>
            ${anchor('short', START + THUMB.w / 2 + RANGE * 0.35)}
            ${anchor('end', END + THUMB.w / 2)}
            <span
              data-part="thumb"
              style="position: absolute; left: 0; top: ${PAD}px; width: ${THUMB.w}px; height: ${THUMB.h}px; border-radius: ${THUMB.h / 2}px;
                     display: flex; align-items: center; justify-content: center; background: var(--sp-accent); color: var(--sp-accent-ink);
                     transform: translateX(${START}px); cursor: grab; touch-action: none; user-select: none"
            >${icon('chevronRight')}</span>
          </div>

          <div class="sp-row sp-context" style="gap: 8px; align-items: center">
            <span class="sp-label" style="font-size: 10px">Cannot drag?</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="alt" style="white-space: nowrap; flex: 0 0 auto">Erase</button>
          </div>

          <div style="position: relative; width: 100%; height: 30px">
            <div
              class="sp-surface sp-context"
              data-part="receipt-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 11px"
            >Nothing has been erased</div>
            <div
              class="sp-surface"
              data-part="receipt"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px"
            >Device erased</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const slider = part(root, 'slider');
  const thumb = part(root, 'thumb');
  const fill = part(root, 'fill');
  const label = part(root, 'label');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);

  let at = START;
  let origin: { x: number; at: number } | undefined;
  let done = false;

  const place = (next: number) => {
    at = Math.max(START, Math.min(END, next));
    thumb.style.transform = `translateX(${at}px)`;
    fill.style.width = `${at + THUMB.w / 2}px`;
    // The label gets out of the way as the thumb covers it, which is also how far along
    // the gesture is read at a glance.
    label.style.opacity = String(Math.max(0, 1 - ((at - START) / RANGE) * 1.6));
  };

  const say = (outcome: string, text: string) => {
    readout.dataset.outcome = outcome;
    readout.textContent = text;
  };

  const commit = (how: string) => {
    if (done) return;
    done = true;
    place(END);
    slider.dataset.state = 'done';
    flag(slider, 'data-done', true);
    label.style.opacity = '1';
    label.textContent = 'Erased';
    thumb.style.cursor = 'default';
    part(root, 'receipt').hidden = false;
    part(root, 'receipt-empty').hidden = true;
    say('done', how === 'slide' ? 'Slid the whole way: erased' : 'Erased from the button instead');
  };

  /** Let go short of the threshold and the control puts itself back, which is the guard. */
  const springBack = (from: number) => {
    slider.dataset.state = 'sprung';
    place(START);
    if (reduced) return;
    thumb.animate(
      [
        { transform: `translateX(${from}px)` },
        { transform: `translateX(${Math.max(START - 5, 0)}px)`, offset: 0.72 },
        { transform: `translateX(${START}px)` },
      ],
      { duration: SPRING_MS, easing: 'cubic-bezier(0.22, 0.9, 0.3, 1)' },
    );
  };

  thumb.addEventListener('pointerdown', (event) => {
    if (done) return;
    // A real drag has to keep reporting once the pointer leaves a 42 px thumb. Synthetic
    // pointers have no capture to take and the call throws, so the guard is mandatory.
    if (event.isTrusted) thumb.setPointerCapture(event.pointerId);
    origin = { x: event.clientX, at };
    slider.dataset.state = 'sliding';
    fill.style.transition = 'none';
    thumb.style.cursor = 'grabbing';
    say('sliding', 'Sliding: it commits at the far end');
  });

  thumb.addEventListener('pointermove', (event) => {
    if (!origin) return;
    place(origin.at + (event.clientX - origin.x));
    const reached = Math.round(((at - START) / RANGE) * 100);
    say('sliding', `${reached}% along, still nothing done`);
  });

  const release = () => {
    if (!origin) return;
    const from = at;
    origin = undefined;
    thumb.style.cursor = 'grab';
    fill.style.transition = `width ${SPRING_MS}ms var(--sp-ease)`;
    if ((from - START) / RANGE >= THRESHOLD) return commit('slide');
    springBack(from);
    say('sprung', `Let go at ${Math.round(((from - START) / RANGE) * 100)}%: nothing happened`);
  };

  thumb.addEventListener('pointerup', release);
  thumb.addEventListener('pointercancel', release);

  // The non-dragging way through, which WCAG 2.2 SC 2.5.7 requires of any function a drag
  // operates. One click, the same act, no gesture.
  part(root, 'alt').addEventListener('click', () => commit('button'));
}
