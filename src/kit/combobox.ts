/**
 * `<sp-combobox>` — the kit's editable combobox with list autocomplete, built
 * once against the ARIA Authoring Practices pattern and reused (SPEC §5: hard
 * demos are implemented properly once, never re-derived per demo).
 *
 * Markup contract: an `<input class="sp-input">` and a `<ul class="sp-listbox">`
 * of `<li class="sp-option">` children. The element owns roles, ids, filtering,
 * keyboard navigation, `aria-activedescendant`, and the `select` event.
 */
let sequence = 0;

class SpCombobox extends HTMLElement {
  #input: HTMLInputElement | undefined;
  #listbox: HTMLElement | undefined;
  #active = -1;

  connectedCallback(): void {
    if (this.#input) return;
    const input = this.querySelector('input');
    const listbox = this.querySelector<HTMLElement>('.sp-listbox');
    if (!input || !listbox) return;
    this.#input = input;
    this.#listbox = listbox;

    const id = `sp-combobox-${++sequence}`;
    listbox.id = `${id}-listbox`;
    listbox.setAttribute('role', 'listbox');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', listbox.id);
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('autocomplete', 'off');

    this.#options.forEach((option, index) => {
      option.id = `${id}-option-${index}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.addEventListener('click', () => this.#commit(index));
    });

    input.addEventListener('input', () => this.#filter());
    input.addEventListener('keydown', (event) => this.#onKeydown(event));
    input.addEventListener('focusin', () => this.#open());
    input.addEventListener('click', () => this.#open());
    this.addEventListener('focusout', () => {
      if (!this.contains(document.activeElement)) this.#close();
    });
  }

  get #options(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>('.sp-option')];
  }

  get #matches(): HTMLElement[] {
    return this.#options.filter((option) => !option.hidden);
  }

  #filter(): void {
    const query = (this.#input?.value ?? '').trim().toLowerCase();
    for (const option of this.#options) option.hidden = query.length > 0 && !(option.textContent ?? '').toLowerCase().includes(query);
    this.#matches.length > 0 ? this.#open() : this.#close();
    this.#setActive(this.#matches.length > 0 ? 0 : -1);
  }

  #onKeydown(event: KeyboardEvent): void {
    const matches = this.#matches;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (matches.length === 0) return;
      if (!this.#listbox?.hasAttribute('data-open')) {
        this.#open();
        this.#setActive(0);
        return;
      }
      const current = matches.findIndex((option) => option.id === this.#input?.getAttribute('aria-activedescendant'));
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = (current + step + matches.length) % matches.length;
      this.#setActive(next);
      return;
    }
    if (event.key === 'Enter' && this.#active >= 0) {
      event.preventDefault();
      this.#commit(this.#options.indexOf(matches[this.#active] as HTMLElement));
      return;
    }
    if (event.key === 'Escape') this.#close();
  }

  #setActive(index: number): void {
    this.#active = index;
    const matches = this.#matches;
    for (const option of this.#options) {
      option.removeAttribute('data-active');
      option.setAttribute('aria-selected', 'false');
    }
    const option = matches[index];
    if (!option) {
      this.#input?.removeAttribute('aria-activedescendant');
      return;
    }
    option.setAttribute('data-active', '');
    option.setAttribute('aria-selected', 'true');
    this.#input?.setAttribute('aria-activedescendant', option.id);
    // Scrolled by hand: scrollIntoView would reach past the shadow root and move the page.
    const box = this.#listbox;
    if (!box) return;
    const bottom = option.offsetTop + option.offsetHeight;
    if (option.offsetTop < box.scrollTop) box.scrollTop = option.offsetTop;
    else if (bottom > box.scrollTop + box.clientHeight) box.scrollTop = bottom - box.clientHeight;
  }

  #commit(index: number): void {
    const option = this.#options[index];
    if (!option || !this.#input) return;
    this.#input.value = (option.textContent ?? '').trim();
    this.#close();
    this.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: this.#input.value }));
  }

  #open(): void {
    this.#listbox?.setAttribute('data-open', '');
    this.#input?.setAttribute('aria-expanded', 'true');
  }

  #close(): void {
    this.#listbox?.removeAttribute('data-open');
    this.#input?.setAttribute('aria-expanded', 'false');
    this.#input?.removeAttribute('aria-activedescendant');
    this.#active = -1;
    for (const option of this.#options) {
      option.removeAttribute('data-active');
      option.setAttribute('aria-selected', 'false');
    }
  }
}

if (!customElements.get('sp-combobox')) customElements.define('sp-combobox', SpCombobox);
