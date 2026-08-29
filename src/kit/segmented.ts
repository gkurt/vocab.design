/**
 * `<sp-segmented>` — the kit's segmented control (SPEC §5: primitives that carry
 * state ship as custom elements, written once and reused). Children are
 * `.sp-segment` buttons carrying a `value`; the element owns the sliding thumb,
 * the tablist roles, and the `change` event demos listen to.
 *
 * Two attributes turn a bare switch into a comparison a cold reader can read
 * (SPEC §5.1). `data-axis` names what the switch changes, so a segment reads as
 * the value of something rather than as a stray phrase in the scene: without it
 * "As shipped" sits next to a delivery line and reads as a postage option.
 * `data-term` names the segment the headword actually points at, so a reader can
 * tell the term from the foil it is shown against; the stage's own `data-pose`
 * already knows this, and this is the same claim said out loud.
 */
class SpSegmented extends HTMLElement {
  #thumb: HTMLElement | undefined;

  connectedCallback(): void {
    if (this.#thumb) return;
    this.setAttribute('role', 'tablist');
    // The legend is drawn from `data-axis` by the kit stylesheet, so it is never in
    // the accessibility tree: the tablist has to carry the same words as its name.
    // The legend is drawn by CSS and so is invisible to assistive technology, but an
    // author's own name outranks it: the axis is trimmed to fit inside the pill, while
    // `aria-label` has no width to answer to and can say the fuller thing ("Search scope"
    // where the legend reads "Scope"). Only name a control that has no name.
    const axis = this.dataset.axis;
    if (axis && !this.hasAttribute('aria-label')) this.setAttribute('aria-label', axis);
    const thumb = document.createElement('span');
    thumb.className = 'sp-segmented-thumb';
    this.prepend(thumb);
    this.#thumb = thumb;

    for (const segment of this.#segments) {
      segment.setAttribute('role', 'tab');
      segment.addEventListener('click', () => {
        this.value = segment.value;
      });
    }
    this.#render(false);
  }

  get #segments(): HTMLButtonElement[] {
    return [...this.querySelectorAll<HTMLButtonElement>('.sp-segment')];
  }

  get value(): string {
    return this.dataset.value ?? this.#segments[0]?.value ?? '';
  }

  set value(next: string) {
    if (next === this.dataset.value) return;
    this.dataset.value = next;
    this.#render(true);
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: next }));
  }

  #render(animate: boolean): void {
    const thumb = this.#thumb;
    if (!thumb) return;
    const selected = this.#segments.find((s) => s.value === this.value) ?? this.#segments[0];
    for (const segment of this.#segments) segment.setAttribute('aria-selected', String(segment === selected));
    if (!selected) return;
    // The first paint places the thumb without a slide; later moves animate.
    thumb.style.transitionDuration = animate ? '' : '0s';
    thumb.style.left = `${selected.offsetLeft}px`;
    thumb.style.width = `${selected.offsetWidth}px`;
    if (!animate) requestAnimationFrame(() => thumb.style.removeProperty('transition-duration'));
  }
}

if (!customElements.get('sp-segmented')) customElements.define('sp-segmented', SpSegmented);
