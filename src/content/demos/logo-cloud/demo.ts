import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Six invented marks: an abstract glyph plus a wordmark drawn as a bar, so the strip reads as
 * logos without borrowing any real company's name or artwork. The hues are the demo's own paint
 * (a brand colour cannot come from a kit token), and one of them is deliberately the loudest.
 */
const MARKS = [
  { key: 'a', hue: '#2f6fd0', bar: 30, glyph: '<circle cx="8" cy="8" r="6.4"/>' },
  { key: 'b', hue: '#e0403a', bar: 34, glyph: '<path d="M8 1.6 14.6 13.6H1.4z"/>' },
  { key: 'c', hue: '#3f8f6b', bar: 26, glyph: '<rect x="1.8" y="1.8" width="12.4" height="12.4" rx="3"/>' },
  { key: 'd', hue: '#7a5cc7', bar: 32, glyph: '<path d="M8 1.4l5.7 3.3v6.6L8 14.6 2.3 11.3V4.7z"/>' },
  { key: 'e', hue: '#c98a1c', bar: 28, glyph: '<path d="M2.4 3h4l3.4 5-3.4 5h-4l3.4-5z"/><path d="M9 3h4l-3.4 5 3.4 5H9L5.6 8z"/>' },
  {
    key: 'f',
    hue: '#2b7f8f',
    bar: 31,
    glyph: '<path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6zm0 3.4a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>',
  },
];

const MODES = [
  { key: 'colour', label: 'full colour' },
  { key: 'flat', label: 'one ink' },
];

/** The single ink a flattened row is set in: the page's own quiet grey, in either theme. */
const FLAT = 'color-mix(in oklab, var(--sp-ink) 62%, transparent)';

const PAGE = 424;

/**
 * Logo cloud specimen: a landing page's proof band, six invented marks in a strip, with the
 * treatment picked absolutely. In full colour one mark is louder than the other five and the
 * row comes apart into unrelated pictures; flattened to a single ink the same six marks read as
 * one claim. That flattening is the whole craft of the pattern, so it is the thing the pick
 * changes and nothing else moves: every mark keeps its box, so the row cannot shift (SPEC §5).
 *
 * The subject is the strip itself, `data-part="strip"`, the row of marks and nothing around it.
 * The page's headline, copy, button and the line of text introducing the row are scenery in the
 * context register.
 *
 * `data-inks` is read back off the marks rather than declared: the demo counts the distinct
 * computed colours in the row and says `six` or `one`. Nothing here transitions a colour, so
 * the read after the write is the real one (SPEC §5), and a treatment that had stopped
 * flattening would be caught by the count rather than by a claim the demo made about itself.
 */
export function mount(root: HTMLElement): void {
  const marks = MARKS.map(
    (mark) => `
      <span data-part="mark-${mark.key}" style="display: inline-flex; align-items: center; gap: 6px; color: ${mark.hue}">
        <svg viewBox="0 0 16 16" aria-hidden="true" style="display: block; width: 16px; height: 16px; fill: currentcolor">${mark.glyph}</svg>
        <span style="display: block; width: ${mark.bar}px; height: 7px; border-radius: 4px; background: currentcolor"></span>
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Marks are</span>
          <sp-segmented class="sp-segmented" data-part="modes" data-value="colour" data-axis="Treatment">
            ${MODES.map(
              (mode) => `
              <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 10px; font-size: 11px">${mode.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 10px; width: ${PAGE}px; padding: 14px 16px">
            <div class="sp-context" style="width: 52%; height: 11px; border-radius: 5px; background: color-mix(in oklab, var(--sp-ink) 58%, transparent)"></div>
            <div class="sp-stack sp-context" style="gap: 5px">
              <div class="sp-line" style="width: 100%; height: 6px"></div>
              <div class="sp-line" style="width: 74%; height: 6px"></div>
            </div>
            <span class="sp-button sp-button--sm sp-context" style="align-self: flex-start; font-size: 12px">Start free</span>
            <div class="sp-divider sp-context"></div>
            <span class="sp-label sp-context" style="font-size: 11px">Trusted by teams at</span>

            <div
              data-part="strip"
              data-subject
              data-inks="six"
              style="display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%"
            >${marks}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const strip = part(root, 'strip');
  const note = part(root, 'note');
  const markEls = MARKS.map((mark) => part(root, `mark-${mark.key}`));

  const apply = (key: string) => {
    const flat = key === 'flat';
    for (const [i, mark] of markEls.entries()) mark.style.color = flat ? FLAT : (MARKS[i]?.hue ?? FLAT);

    // Read back off the marks: how many distinct inks the row is actually set in.
    const inks = new Set(markEls.map((mark) => getComputedStyle(mark).color)).size;
    strip.dataset.inks = inks === 1 ? 'one' : inks === MARKS.length ? 'six' : 'some';
    note.textContent = flat
      ? 'One ink, so no mark wins and the row reads as a single claim.'
      : 'Six brand colours, and the loudest mark is the only one seen.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('colour');
}
