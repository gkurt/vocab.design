/**
 * Hover as a touch device leaves it (SPEC §7). A finger cannot hover, so inside a
 * `data-touch` scope hover never arrives from travel: the kit's `:hover` rules are
 * guarded against touch scopes and the player withholds hover from its own ghost
 * there. What a real device DOES leave behind is a hover STRANDED by a tap, which
 * lands on the tapped element and stays until a tap somewhere else, because the
 * event that would have taken it off (a leave) is the one event a finger never
 * really sends. That is the whole of the sticky-hover bug, and it is the honest
 * behaviour for every touch specimen rather than one term's private trick.
 *
 * One `click` listener serves both hands: the player dispatches a real bubbling
 * MouseEvent for its `click` step, so the script and the reader arrive here the
 * same way and cannot disagree. Only a single-contact tap counts, since a two
 * finger tap is a gesture rather than a place a hover could rest.
 *
 * Ownership follows the pointer mirror's rule: claim `data-hovered` only where the
 * demo's own handlers did not set it, and release only what was claimed, so a demo
 * that manages the attribute itself is never fought.
 */
export class TouchHover {
  #claimed: Element | null = null;

  constructor(events: EventTarget) {
    events.addEventListener(
      'click',
      (event) => {
        const target = event.composedPath()[0];
        const scope = target instanceof Element ? target.closest('[data-touch]') : null;
        // A tap outside every touch scope strands nothing and clears what was stranded,
        // the same way tapping the page's background does on a real device.
        this.#release();
        if (!scope || !(target instanceof Element)) return;
        // The narrowest element the demo actually names. A tap lands on whatever leaf
        // sits under the finger (a wash, a label), and hover belongs to the part that
        // leaf belongs to, which is exactly what `data-part` marks.
        const el = target.closest('[data-part]') ?? target;
        if (!(el instanceof HTMLElement) || el.hasAttribute('data-hovered')) return;
        el.setAttribute('data-hovered', '');
        this.#claimed = el;
      },
      true,
    );
  }

  /** Called on remount too: a fresh tree must never inherit the last one's stranding. */
  release(): void {
    this.#release();
  }

  #release(): void {
    if (this.#claimed instanceof HTMLElement) this.#claimed.removeAttribute('data-hovered');
    this.#claimed = null;
  }
}
