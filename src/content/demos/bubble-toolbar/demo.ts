import { part } from '#src/kit/parts.ts';

/** No chain in the kit's icon set and the kit is frozen, so the link glyph is drawn against
    `.sp-icon`, which carries the stroke weight and the size every other glyph uses. */
const CHAIN = `<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M10.6 13.4a3.4 3.4 0 0 0 5 .4l2.5-2.5a3.4 3.4 0 0 0-4.8-4.8l-1.4 1.4"/>
  <path d="M13.4 10.6a3.4 3.4 0 0 0-5-.4l-2.5 2.5a3.4 3.4 0 0 0 4.8 4.8l1.4-1.4"/>
</svg>`;

const TEXT =
  'Selection is a temporary thing. The moment a reader drags across a run of words, the editor knows ' +
  'which characters are in play, and it can offer the two or three commands that suit that run without ' +
  'keeping a permanent bar above the page.';

const WORDS = TEXT.split(' ');

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(high, n));

/** A letterform button, because bold and italic are drawn as themselves, never as icons. */
const letter = (name: string, label: string, glyph: string, style: string) => `
  <button class="sp-icon-button" type="button" data-part="${name}" aria-pressed="false" aria-label="${label}"
    style="width: 28px; height: 28px; font: inherit; font-size: 14px; ${style}">${glyph}</button>`;

/**
 * Bubble toolbar specimen: a draft page whose formatting bar has no permanent home. Dragging
 * across a run of words selects it and floats the bar beside that run, centred on it and flipped
 * below when the selection sits too near the top of the page to leave room above. Clicking away
 * drops the selection and the bar goes with it.
 *
 * The subject is the floating bar itself, the narrowest element the term names: the page, the
 * prose and the selection it is anchored to are what the bar appears over. It is honestly a
 * bubble toolbar at either placement, so no `data-pose` condition is needed.
 *
 * Selection is simulated at word granularity: a scripted drag dispatches its moves on the word
 * it started from (SPEC §8), so the run is resolved from each event's own coordinate rather than
 * from what the browser's own selection would have been. The bar is absolutely positioned inside
 * the page and its box is measured once at mount, before anything is written to it, so placing
 * it never moves the document under it (SPEC §5). The selection opens the bar and a click away
 * closes it; the format buttons set a state rather than flipping the one they find, and Clear is
 * the explicit way back.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Draft: field notes</span>
          <span class="sp-label" style="font-size: 12px">Saved</span>
        </div>

        <div class="sp-body">
          <div class="sp-surface" data-part="page" style="position: relative; height: 100%; padding: 14px 16px; overflow: hidden">
            <span class="sp-heading sp-context" style="display: block; font-size: 13px">Notes on lighting</span>
            <p
              class="sp-prose sp-context"
              data-part="prose"
              style="margin: 8px 0 0; --sp-measure: 100%; font-size: 13px; line-height: 1.5"
            >${WORDS.map((w, i) => `<span data-part="w-${i}" style="border-radius: 3px">${w}</span>`).join(' ')}</p>

            <div data-part="away" style="position: absolute; left: 0; right: 0; bottom: 0; height: 56px"></div>

            <div
              class="sp-row sp-surface"
              data-part="bar"
              data-subject
              data-place="above"
              style="position: absolute; left: 0; top: 0; gap: 4px; padding: 4px; box-shadow: var(--sp-shadow);
                     opacity: 0; visibility: hidden; translate: 0 3px;
                     transition: opacity 0.14s, visibility 0.14s, translate 0.14s var(--sp-ease)"
            >
              ${letter('btn-bold', 'Bold', 'B', 'font-weight: 700')}
              ${letter('btn-italic', 'Italic', 'I', 'font-style: italic')}
              <button class="sp-icon-button" type="button" data-part="btn-link" aria-pressed="false" aria-label="Link" style="width: 28px; height: 28px">${CHAIN}</button>
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="btn-clear" style="padding: 5px 8px; font-size: 12px">Clear</button>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-label sp-context" style="height: 15px; font-size: 11px; line-height: 15px">
        Select a run to summon it; click anywhere else to send it away.
      </span>
    </div>
  `;

  const page = part(root, 'page');
  const bar = part(root, 'bar');
  const words = WORDS.map((_, i) => part(root, `w-${i}`));
  const buttons = {
    bold: part(root, 'btn-bold'),
    italic: part(root, 'btn-italic'),
    link: part(root, 'btn-link'),
  };

  // Measured once, at mount, in the state it is measured in: the bar's box never changes, and
  // reading it later would be reading it after a style write (SPEC §5).
  const barBox = bar.getBoundingClientRect();
  const BAR_W = barBox.width;
  const BAR_H = barBox.height;
  const GAP = 8;

  let anchor = -1;
  let head = -1;
  let dragging = false;

  const indexAt = (x: number, y: number): number => {
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    words.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const dx = Math.max(r.left - x, 0, x - r.right);
      const dy = Math.max(r.top - y, 0, y - r.bottom);
      const distance = dy * 4 + dx;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  };

  const selected = (): HTMLElement[] => {
    if (anchor < 0 || head < 0) return [];
    const from = Math.min(anchor, head);
    const to = Math.max(anchor, head);
    return words.slice(from, to + 1);
  };

  const paintSelection = () => {
    const run = new Set(selected());
    for (const el of words) el.style.background = run.has(el) ? 'var(--sp-accent-soft)' : 'transparent';
  };

  const reportFormats = () => {
    const first = selected()[0];
    buttons.bold.setAttribute('aria-pressed', String(first?.dataset.bold === 'on'));
    buttons.italic.setAttribute('aria-pressed', String(first?.dataset.italic === 'on'));
    buttons.link.setAttribute('aria-pressed', String(first?.dataset.linked === 'on'));
  };

  const closeBar = () => {
    bar.removeAttribute('data-open');
    bar.style.opacity = '0';
    bar.style.visibility = 'hidden';
    bar.style.translate = '0 3px';
  };

  /** Anchored to the selection's own rectangle, centred on it, flipped when there is no room. */
  const placeBar = () => {
    const run = selected();
    if (run.length === 0) return closeBar();
    const pageBox = page.getBoundingClientRect();
    const boxes = run.map((el) => el.getBoundingClientRect());
    const left = Math.min(...boxes.map((b) => b.left)) - pageBox.left;
    const right = Math.max(...boxes.map((b) => b.right)) - pageBox.left;
    const top = Math.min(...boxes.map((b) => b.top)) - pageBox.top;
    const bottom = Math.max(...boxes.map((b) => b.bottom)) - pageBox.top;

    const above = top - BAR_H - GAP;
    const flipped = above < 4;
    bar.dataset.place = flipped ? 'below' : 'above';
    bar.style.top = `${flipped ? bottom + GAP : above}px`;
    bar.style.left = `${clamp((left + right) / 2 - BAR_W / 2, 4, pageBox.width - BAR_W - 4)}px`;
    bar.setAttribute('data-open', '');
    bar.style.opacity = '1';
    bar.style.visibility = 'visible';
    bar.style.translate = '0 0';
  };

  page.addEventListener('pointerdown', (event) => {
    const pointer = event as PointerEvent;
    // A press inside the bar is a command, not a new selection: it must not take away the
    // run the command is about.
    if ((pointer.target as Element | null)?.closest('[data-part=bar]')) return;
    if ((pointer.target as Element | null)?.closest('[data-part=away]')) {
      anchor = -1;
      head = -1;
      paintSelection();
      closeBar();
      return;
    }
    closeBar();
    anchor = indexAt(pointer.clientX, pointer.clientY);
    head = anchor;
    dragging = true;
    // Capture keeps the sweep alive past the page's edge. A synthetic pointer has none to
    // capture and the call would throw, so only a real one asks.
    if (pointer.isTrusted) page.setPointerCapture(pointer.pointerId);
    paintSelection();
  });

  page.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const pointer = event as PointerEvent;
    const next = indexAt(pointer.clientX, pointer.clientY);
    if (next === head) return;
    head = next;
    paintSelection();
  });

  const finish = (event: Event) => {
    if (!dragging) return;
    dragging = false;
    const pointer = event as PointerEvent;
    head = indexAt(pointer.clientX, pointer.clientY);
    paintSelection();
    reportFormats();
    placeBar();
  };

  page.addEventListener('pointerup', finish);
  page.addEventListener('pointercancel', finish);

  /** Absolute, never a flip: a pass picked up anywhere applies the format rather than removing it. */
  const apply = (key: 'bold' | 'italic' | 'linked', on: boolean) => {
    for (const el of selected()) {
      if (on) el.dataset[key] = 'on';
      else delete el.dataset[key];
      if (key === 'bold') el.style.fontWeight = on ? '650' : '';
      if (key === 'italic') el.style.fontStyle = on ? 'italic' : '';
      if (key === 'linked') {
        el.style.textDecoration = on ? 'underline' : '';
        el.style.textUnderlineOffset = on ? '2px' : '';
      }
    }
    reportFormats();
  };

  buttons.bold.addEventListener('click', () => apply('bold', true));
  buttons.italic.addEventListener('click', () => apply('italic', true));
  buttons.link.addEventListener('click', () => apply('linked', true));
  part(root, 'btn-clear').addEventListener('click', () => {
    apply('bold', false);
    apply('italic', false);
    apply('linked', false);
  });

  paintSelection();
  closeBar();
}
