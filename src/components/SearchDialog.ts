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
  #live: AbortController | undefined;

  connectedCallback() {
    this.#dialog = this.querySelector('dialog');
    this.#search = this.querySelector('vd-search');
    if (!this.#dialog || !this.#search) return;

    // The shortcuts are listened for on the document, so they have to be given up when
    // this element is: client-side navigation brings a new dialog with each page, and
    // without this every navigation would leave another Cmd+K handler behind, each one
    // reaching for a dialog in a tree that is no longer in the document.
    const { signal } = (this.#live = new AbortController());

    // CAPTURE, and it is not a detail: the client router listens for clicks on this same
    // document to turn a link into a swap, and its script is in the head while this one is
    // in the body, so in the bubble phase it always goes first, calls `preventDefault` and
    // navigates to /search. The modal would never open again. Capturing is how the trigger
    // is claimed before any router sees it, whatever order the two scripts loaded in.
    document.addEventListener('click', (event) => this.#onClick(event), { capture: true, signal });
    document.addEventListener('keydown', (event) => this.#onKey(event), { signal });
    // A modal dialog is its own box, and it carries no padding, so a click that lands on
    // the element itself landed on the backdrop.
    this.#dialog.addEventListener(
      'click',
      (event) => {
        if (event.target === this.#dialog) this.#dialog?.close();
      },
      { signal },
    );
    // Escape is claimed rather than left to the platform, because a `type=search` input
    // eats the first press to clear itself: the footer promises Escape closes, so it
    // closes on the first press wherever the focus sits.
    this.#dialog.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        this.#dialog?.close();
      },
      { signal },
    );
    // A search that has found what it was looking for is over. The modal is in the top
    // layer, so leaving it open across a navigation would put it in the transition's
    // picture of the page the reader is leaving, over the page they are arriving at.
    document.addEventListener('astro:before-preparation', () => this.#dialog?.close(), { signal });
  }

  disconnectedCallback() {
    this.#live?.abort();
    this.#live = undefined;
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
    // How much room the scrollbar is taking, measured while it is still there. Opening
    // the modal stops the page scrolling underneath, which takes the bar away, and the
    // stylesheet hands its room straight back as padding so the article does not shift
    // sideways (`global.css`). Zero wherever scrollbars overlay the content, as they do
    // by default on a Mac, and the measurement has to happen HERE rather than once at
    // load, because a page zoom changes the answer.
    const bar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vd-scrollbar', `${Math.max(bar, 0)}px`);
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
