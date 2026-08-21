/**
 * `<vd-search-dialog>`: opens the chrome's search modal, and nothing else.
 *
 * This is the only script the chrome ships on every page besides the theme toggle, so it
 * stays that way on purpose: the search element and Pagefind's own bundle are pulled in
 * on the first open, not at load. The markup inside the dialog is server-rendered, so
 * `<vd-search>` simply upgrades in place once its module lands.
 *
 * The trigger is `[data-search-open]`, a real link to /search. A plain click is
 * intercepted; a modified or middle click is left alone, because "open the search in a
 * new tab" has to keep working. It is a `<dialog>` so the platform owns the modality:
 * the backdrop, the focus trap and the top layer are not ours to reimplement.
 */

import { track } from '#src/lib/track.ts';

interface Focusable extends HTMLElement {
  focusInput?(): void;
}

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return target.matches('input, textarea, select');
}

export class SearchDialog extends HTMLElement {
  #dialog: HTMLDialogElement | null = null;
  #search: Focusable | null = null;
  #loading: Promise<unknown> | null = null;

  connectedCallback() {
    this.#dialog = this.querySelector('dialog');
    this.#search = this.querySelector('vd-search');
    if (!this.#dialog || !this.#search) return;

    document.addEventListener('click', (event) => this.#onClick(event));
    document.addEventListener('keydown', (event) => this.#onKey(event));
    // A modal dialog is its own box, and it carries no padding, so a click that lands on
    // the element itself landed on the backdrop.
    this.#dialog.addEventListener('click', (event) => {
      if (event.target === this.#dialog) this.#dialog?.close();
    });
    // Escape is claimed rather than left to the platform, because a `type=search` input
    // eats the first press to clear itself: the footer promises Escape closes, so it
    // closes on the first press wherever the focus sits.
    this.#dialog.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      this.#dialog?.close();
    });
  }

  #onClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = (event.target as Element | null)?.closest?.('[data-search-open]');
    if (!trigger) return;
    event.preventDefault();
    void this.#open('nav');
  }

  #onKey(event: KeyboardEvent) {
    if (event.defaultPrevented || this.#dialog?.open) return;
    const command = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey;
    if (!command && !slash) return;
    // Slash is a character before it is a shortcut: never take it out of a field.
    if (slash && isTyping(event.target)) return;
    event.preventDefault();
    void this.#open(slash ? 'slash' : 'command');
  }

  async #open(via: 'nav' | 'slash' | 'command') {
    const dialog = this.#dialog;
    if (!dialog || dialog.open) return;
    // Whether the shortcut is worth keeping is a question only the numbers answer.
    track('search_open', { via });
    dialog.showModal();
    await this.#upgrade();
    // Focus warms the index (the element listens for it), and selecting whatever is
    // already there makes a second search start by typing rather than by clearing.
    this.#search?.focusInput?.();
  }

  #upgrade(): Promise<unknown> {
    // A literal specifier on purpose: this one SHOULD be resolved and split into its own
    // chunk at build time. (Pagefind's own bundle is the opposite case, and is the only
    // import on the site that has to stay opaque to Vite.)
    this.#loading ??= import('#src/components/SiteSearch.ts').then(() => customElements.whenDefined('vd-search'));
    return this.#loading;
  }
}

if (!customElements.get('vd-search-dialog')) customElements.define('vd-search-dialog', SearchDialog);
