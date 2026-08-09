/**
 * `<sp-segmented>` — the kit's segmented control (SPEC §5: primitives that carry
 * state ship as custom elements, written once and reused). Children are
 * `.sp-segment` buttons carrying a `value`; the element owns the sliding thumb,
 * the tablist roles, and the `change` event demos listen to.
 */
class SpSegmented extends HTMLElement {
  #thumb: HTMLElement | undefined;

  connectedCallback(): void {
    if (this.#thumb) return;
    this.setAttribute('role', 'tablist');
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
