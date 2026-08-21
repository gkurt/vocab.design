import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The reading column's own width, which never changes: the measure is the page's constant. */
const CONTENT = 228;
/** How far past the column each side of the breakout track reaches when there is room for it. */
const EXTRA = 51;
const BREAKOUT = CONTENT + 2 * EXTRA;

interface Page {
  key: string;
  label: string;
  width: number;
}

/** Widest first, so the mount state is the one where all three tracks are distinct. */
const PAGES: Page[] = [
  { key: 'roomy', label: '424px', width: 424 },
  { key: 'tight', label: '268px', width: 268 },
];

/** The three nested tints, mixed off the kit accent so both themes get the same nesting. */
const TINT = {
  full: 'var(--sp-surface)',
  breakout: 'color-mix(in oklab, var(--sp-accent) 11%, var(--sp-surface))',
  content: 'color-mix(in oklab, var(--sp-accent) 22%, var(--sp-surface))',
};

const band = (name: string, width: string, tint: string, attrs = '') =>
  `<div data-part="band-${name}" ${attrs} style="position: absolute; top: 0; bottom: 0; left: 50%; translate: -50% 0; width: ${width}; background: ${tint}"></div>`;

const lines = (name: string, widths: number[]) => `
  <div class="sp-stack sp-context" data-part="${name}" style="gap: 5px; width: ${CONTENT}px">
    ${widths.map((w) => `<div class="sp-line" style="width: ${w}%; height: 6px; background: color-mix(in oklab, var(--sp-ink) 30%, transparent)"></div>`).join('')}
  </div>`;

const legend = (name: string, label: string, tint: string) => `
  <span class="sp-row" style="gap: 6px">
    <span style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px; border: 1px solid var(--sp-line); background: ${tint}"></span>
    <span class="sp-label" style="font-size: 11px; font-variant-numeric: tabular-nums; white-space: nowrap">${label}
      <span data-part="legend-${name}">0px</span></span>
  </span>`;

/**
 * Breakout specimen: an article laid on three named tracks, with the page width picked
 * absolutely. Prose sits in the content track, one figure asks for the breakout track, and one
 * strip asks for the full track, so the intermediate width is read against both of its
 * neighbours at once. The tracks themselves are drawn as nested tinted bands behind the flow,
 * each a real box the full height of the page rather than a hairline (the stage reads a box
 * thinner than about 2px as absent), and the legend names them with their live widths.
 *
 * The subject is the breakout track itself, the band drawn at `data-part="band-breakout"`. The term
 * names the wider track the page declares, not the element that asks for it, so the band is the
 * element tracing the feature and the figure sits in the context register as what claims it.
 *
 * `data-fit` is measured, never declared: the demo compares the figure's own box with the
 * column beside it and with the page around it, and says `between`, `full`, or `column`. That
 * is the whole claim of the term, so a recipe that had stopped clamping (or stopped reaching)
 * would be caught by it. Nothing transitions a width here, so the read after the write is the
 * real one (SPEC §5). Narrowing the page clamps the breakout track onto the full one, which is
 * honest behaviour but no longer the term, so the band carries the same measured `data-fit` as the
 * figure and declares the roomy state as its `data-pose`, which is what makes identify refuse to
 * ring a track that has collapsed onto the page (SPEC §6).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Page is</span>
          <sp-segmented class="sp-segmented" data-part="widths" data-value="roomy">
            ${PAGES.map(
              (page) => `
              <button class="sp-segment" type="button" data-part="seg-${page.key}" value="${page.key}" style="padding: 4px 11px; font-size: 11px">${page.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="width: ${PAGES[0]?.width}px; height: 100%">
            <div
              data-part="page"
              data-tracks="three"
              style="position: relative; width: ${PAGES[0]?.width}px; height: 100%; margin: 0 auto; overflow: hidden"
            >
              ${band('full', '100%', TINT.full)}
              ${band('breakout', `${BREAKOUT}px`, TINT.breakout, 'data-subject data-fit="between" data-pose="[data-fit=between]"')}
              ${band('content', `${CONTENT}px`, TINT.content)}

              <div style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; padding-top: 8px">
                ${lines('prose-1', [100, 94, 66])}

                <figure
                  class="sp-context"
                  data-part="figure"
                  data-fit="between"
                  style="display: flex; flex-direction: column; justify-content: flex-end; gap: 4px; width: ${BREAKOUT}px; height: 46px;
                         margin: 0; padding: 7px 9px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
                >
                  <div class="sp-row" style="gap: 4px; align-items: flex-end">
                    ${[16, 26, 20, 30, 24].map((h) => `<span style="flex: 0 0 auto; width: 14px; height: ${h}px; border-radius: 2px; background: var(--sp-accent)"></span>`).join('')}
                  </div>
                </figure>

                ${lines('prose-2', [100, 78])}

                <div
                  data-part="full-strip"
                  class="sp-context"
                  style="display: flex; flex-direction: column; justify-content: center; gap: 5px; width: 100%; height: 28px; padding: 0 10px; background: var(--sp-sunken)"
                >
                  <div class="sp-line" style="width: 46%; height: 5px"></div>
                  <div class="sp-line" style="width: 62%; height: 5px"></div>
                </div>

                ${lines('prose-3', [100, 52])}
              </div>
            </div>
          </div>
        </div>

        <div class="sp-row" style="flex: 0 0 auto; gap: 14px; justify-content: center; padding: 6px 12px; border-top: 1px solid var(--sp-line)">
          ${legend('content', 'content', TINT.content)}
          ${legend('breakout', 'breakout', TINT.breakout)}
          ${legend('full', 'full', TINT.full)}
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const page = part(root, 'page');
  const figure = part(root, 'figure');
  const column = part(root, 'prose-1');
  const note = part(root, 'note');
  const legends = {
    content: part(root, 'legend-content'),
    breakout: part(root, 'legend-breakout'),
    full: part(root, 'legend-full'),
  };

  const apply = (key: string) => {
    const next = PAGES.find((entry) => entry.key === key);
    if (!next) return;
    // The breakout track has nowhere to go on a narrow page, so it clamps to the page itself.
    const breakout = Math.min(BREAKOUT, next.width);
    const track = part(root, 'band-breakout');
    page.style.width = `${next.width}px`;
    track.style.width = `${breakout}px`;
    figure.style.width = `${breakout}px`;

    // Read back on boxes nothing transitions: the figure's width against the column beside it
    // and the page around it is the only honest proof the track did its work.
    const figureWidth = figure.offsetWidth;
    const columnWidth = column.offsetWidth;
    const pageWidth = page.offsetWidth;
    const fit = figureWidth >= pageWidth - 1 ? 'full' : figureWidth > columnWidth + 8 ? 'between' : 'column';
    figure.dataset.fit = fit;
    track.dataset.fit = fit;
    page.dataset.tracks = fit === 'between' ? 'three' : 'two';

    legends.content.textContent = `${columnWidth}px`;
    legends.breakout.textContent = `${figureWidth}px`;
    legends.full.textContent = `${pageWidth}px`;
    note.textContent =
      fit === 'between'
        ? 'The figure is wider than the column and still short of the page edge.'
        : 'The track has clamped to the page, so the figure now reads as full bleed.';
  };

  part(root, 'widths').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('roomy');
}
