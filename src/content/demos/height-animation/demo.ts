import { icon } from '#src/kit/icons.ts';
import { localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const OPEN_MS = 420;

const BODY = `
  <span class="sp-text sp-text--ink" style="font-size: 12px">Ships in two days, tracked</span>
  <span class="sp-line" style="width: 82%"></span>
  <span class="sp-line" style="width: 64%"></span>`;

/**
 * Height animation specimen: one disclosure driving two panels that hold the same content.
 * The upper panel transitions between zero and a height measured once at mount, so it grows
 * at the rate the curve asks for. The lower one is given `height: auto` and snaps, because
 * `auto` is an instruction to work the size out at layout time rather than a value a
 * transition can divide a duration between.
 *
 * The subject is the animating panel: the term names the box that grows, not the trigger
 * that opens it or the comparison beside it. The header, the labels, and the snapping twin
 * are scenery in the context register.
 *
 * The panel is mounted open and measured in that state, once, before a single style is
 * written, which is the only reading that is not of a box some transition is still
 * delivering. It is collapsed immediately afterwards, and the transition is attached only
 * once that collapse has been committed, so the first open animates rather than the mount.
 * Both panels sit in wrappers that reserve the room the open state needs, so the growth
 * happens inside the space it was given and nothing below it moves (SPEC §5). The whole move
 * is a CSS transition, so `motion.css` flattens it for a reader who asked for less movement
 * and no timer is needed at all. The trigger toggles, which SPEC §8 allows precisely here:
 * the flip between collapsed and open is the term, and the script drives both directions.
 */
export function mount(root: HTMLElement): void {
  const panel = (id: string, subject: boolean) => `
    <div style="height: 72px">
      <div
        data-part="${id}"
        ${subject ? 'data-subject' : ''}
        data-state="expanded"
        style="overflow: hidden; height: auto"
      >
        <div class="sp-stack" style="gap: 6px; padding: 8px 10px; border-radius: 6px; background: var(--sp-accent-soft)">
          ${BODY}
        </div>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <button
          class="sp-button sp-button--ghost sp-row sp-context"
          type="button"
          data-part="trigger"
          aria-expanded="true"
          style="width: 100%; gap: 8px; justify-content: flex-start"
        >
          ${icon('chevronRight', 'sp-icon--chevron')}
          <span class="sp-grow" style="text-align: left">Shipping details</span>
        </button>

        <div class="sp-stack" style="gap: 4px; margin-top: 12px">
          <span class="sp-label sp-context">transitioned to a measured height</span>
          ${panel('panel', true)}
        </div>

        <div class="sp-stack sp-context" style="gap: 4px; margin-top: 12px">
          <span class="sp-label">height: auto, nothing to interpolate</span>
          ${panel('twin', false)}
        </div>
      </div>
    </div>
  `;

  const grows = part(root, 'panel');
  const snaps = part(root, 'twin');
  const trigger = part(root, 'trigger');

  // Measured in the state it mounts in, once, before anything has been written.
  const target = Math.round(localSize(grows).height);

  const set = (open: boolean) => {
    grows.style.height = open ? `${target}px` : '0px';
    snaps.style.height = open ? 'auto' : '0px';
    for (const box of [grows, snaps]) box.dataset.state = open ? 'expanded' : 'collapsed';
    trigger.setAttribute('aria-expanded', String(open));
  };

  set(false);
  // The collapse above is committed before either box is given a transition, so the mount
  // itself does not animate and the first open starts from a height the browser has kept.
  void grows.offsetHeight;
  grows.style.transition = `height ${OPEN_MS}ms var(--sp-ease)`;
  snaps.style.transition = `height ${OPEN_MS}ms var(--sp-ease)`;

  trigger.addEventListener('click', () => set(grows.dataset.state !== 'expanded'));
}
