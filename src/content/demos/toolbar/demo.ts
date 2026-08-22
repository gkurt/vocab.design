import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Style = { key: string; label: string; size: string; weight: string; italic: boolean; quiet: boolean };

const STYLES = [
  { key: 'body', label: 'Body', size: '13px', weight: '400', italic: false, quiet: false },
  { key: 'heading', label: 'Heading', size: '16px', weight: '600', italic: false, quiet: false },
  { key: 'quote', label: 'Quote', size: '13px', weight: '400', italic: true, quiet: true },
] as const satisfies readonly Style[];

const ITEMS = ['tool-body', 'tool-heading', 'tool-quote', 'tool-copy'];

/**
 * Toolbar specimen: one strip of controls, all acting on the paragraph below it.
 * The strip is the subject, since the term names the collection rather than any of
 * its buttons; the paragraph and the status line are scenery.
 *
 * The keyboard contract is the point, and the choreography asserts it: the strip is
 * one tab stop, and Left/Right move a roving focus between its items, drawn with
 * `data-sim-focus` because attract never moves real focus (SPEC §7). Applying a
 * style changes the paragraph inside a box that already fills its room, so the line
 * under it does not move when the type grows (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const choices = STYLES.map(
    (style, i) => `
      <button
        class="sp-button sp-button--ghost sp-button--sm"
        type="button"
        role="radio"
        data-part="tool-${style.key}"
        aria-checked="${i === 0}"
        ${i === 0 ? 'data-selected' : ''}
        tabindex="-1"
      >${style.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div
          class="sp-row"
          role="toolbar"
          aria-label="Formatting"
          data-part="toolbar"
          data-subject
          style="flex: 0 0 auto; gap: 4px; padding: 6px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <div class="sp-row" role="radiogroup" aria-label="Paragraph style" style="gap: 4px">${choices}</div>
          <div class="sp-divider" style="width: 1px; height: 20px; margin: 0 4px"></div>
          <button class="sp-icon-button" type="button" data-part="tool-copy" aria-label="Copy paragraph" tabindex="-1">${icon('copy')}</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-prose sp-grow" data-part="prose" data-style="body" style="max-width: none; overflow: hidden">
            <p data-part="prose-text" style="margin: 0">
              The gulls came in ahead of the weather, which is how the harbour always hears
              about it first. By four the boats were tied short and the light had gone the
              colour of wet slate.
            </p>
          </div>
          <span class="sp-text" data-part="status" data-value="none" role="status" style="white-space: nowrap">Draft saved</span>
        </div>
      </div>
    </div>
  `;

  const items = ITEMS.map((name) => part(root, name));
  const prose = part(root, 'prose');
  const text = part(root, 'prose-text');
  const status = part(root, 'status');

  let index = 0;

  // One tab stop for the whole strip: the roving item is the only reachable one, and
  // the ring is drawn only when a key moved it, since a pointer never asks for one.
  const rove = (next: number, ring: boolean) => {
    index = next;
    for (const [i, item] of items.entries()) {
      item.tabIndex = i === next ? 0 : -1;
      flag(item, 'data-sim-focus', ring && i === next);
    }
  };
  rove(0, false);

  /** Reaches a style rather than flipping one: the same press always lands here. */
  const apply = (style: Style) => {
    prose.dataset.style = style.key;
    text.style.fontSize = style.size;
    text.style.fontWeight = style.weight;
    text.style.fontStyle = style.italic ? 'italic' : 'normal';
    text.style.color = style.quiet ? 'var(--sp-muted)' : 'var(--sp-ink)';
    for (const other of STYLES) {
      const button = part(root, `tool-${other.key}`);
      const chosen = other.key === style.key;
      button.setAttribute('aria-checked', String(chosen));
      flag(button, 'data-selected', chosen);
    }
  };

  const copy = () => {
    status.dataset.value = 'copied';
    status.textContent = 'Paragraph copied';
  };

  const activate = (position: number) => {
    const style = STYLES[position];
    if (style) apply(style);
    else copy();
  };

  for (const [i, item] of items.entries()) {
    item.addEventListener('click', () => {
      rove(i, false);
      activate(i);
    });
  }

  /** The keys whose browser default is to scroll the page, which a toolbar has taken over. */
  const ROVING = new Set(['ArrowRight', 'ArrowLeft', 'Home', 'End']);

  root.addEventListener('keydown', (event) => {
    const last = items.length - 1;
    // A reader arrowing along the toolbar would otherwise scroll the page as they went, and
    // Home or End would throw them to the top or bottom of it. Refused here rather than
    // globally, so Tab still moves focus and every key this toolbar does not claim is the
    // browser's. Enter and space are left alone on purpose: on a real button their default IS
    // activation, so refusing them would be refusing the thing the key is for.
    if (ROVING.has(event.key)) event.preventDefault();
    if (event.key === 'ArrowRight') return rove(Math.min(index + 1, last), true);
    if (event.key === 'ArrowLeft') return rove(Math.max(index - 1, 0), true);
    if (event.key === 'Home') return rove(0, true);
    if (event.key === 'End') return rove(last, true);
    if (event.key === 'Enter' || event.key === ' ') activate(index);
  });
}
