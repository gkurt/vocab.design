import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The rhythm the band is measured in: one line of the column, in pixels. */
const LINE_H = 16;

const LINES = [
  'Reading is not a smooth glide along a line of text.',
  'The eye moves in short jumps, resting four or five',
  'times a second, and each rest takes in only a few',
  'characters clearly. Everything else is a guess made',
  'from shape and context. The hardest movement of all',
  'is the return sweep: back across the whole column,',
  'down exactly one line, with nothing to aim at but',
  'the spacing. Miss it and you read the same sentence',
  'twice, or skip a line and notice only a paragraph',
  'later, when the sense has quietly come apart.',
] as const;

const WIDTHS = { '1': 1, '3': 3, '5': 5 } as const;
type Width = keyof typeof WIDTHS;

/**
 * Line focus specimen: a column of prose with a lit band over it, a pick of band width, and an
 * explicit advance so the reading motion is visible. Everything outside the band is dimmed by the
 * band's own outward shadow, clipped by the page it sits in, which is why the dimming needs no
 * element of its own.
 *
 * The subject is the band: the term names the lit strip, not the column it travels down and not the
 * control that moves it. The band traces the feature's own extent, so it is the drawn element the
 * ring belongs to (SPEC §5). The page, the prose, the picker, the advance and the readout are
 * scenery. The band is on stage and is the term in every state, so no `data-pose` is needed.
 *
 * The column holds the same ten lines at every width, so changing the band moves nothing but the
 * band (SPEC §5). No timers: the reader (or the script) chooses when the band advances, which is
 * how a reading aid actually works.
 */
export function mount(root: HTMLElement): void {
  const line = (text: string) => `<span style="display: block; height: ${LINE_H}px; line-height: ${LINE_H}px">${text}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Immersive reading, one column</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Focus" data-part="width" data-value="3" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-1" value="1"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">1 line</button>
            <button class="sp-segment" type="button" data-part="seg-3" value="3"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">3 lines</button>
            <button class="sp-segment" type="button" data-part="seg-5" value="5"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">5 lines</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="page"
             style="position: relative; overflow: hidden; margin-top: 9px; height: ${LINES.length * LINE_H + 18}px">
          <div class="sp-context" style="padding: 9px 12px; font-size: 12px; color: var(--sp-ink)">
            ${LINES.map(line).join('')}
          </div>
          <div data-part="band" data-subject data-width="3" data-at="0"
               style="position: absolute; left: 6px; right: 6px; top: 9px; height: ${3 * LINE_H}px;
                      border-left: 2px solid var(--sp-accent); border-radius: 3px;
                      box-shadow: 0 0 0 9999px var(--sp-scrim);
                      transition: top 0.28s var(--sp-ease), height 0.28s var(--sp-ease)"></div>
        </div>

        <div class="sp-row" style="gap: 10px; margin-top: 8px">
          <button class="sp-button sp-button--sm" type="button" data-part="advance"
                  style="flex: 0 0 auto; white-space: nowrap">Advance band</button>
          <span class="sp-label sp-context" data-part="readout" data-at="0"
                style="flex: 1 1 auto; min-width: 0; font-size: 11px; white-space: nowrap">Lines 1 to 3 of ${LINES.length}</span>
        </div>

        <p class="sp-text sp-context" style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">
          Nothing is removed: the lines outside the band are dimmed, not clipped, so the reader can still
          select, search, and see where they are in the column.</p>
      </div>
    </div>
  `;

  const band = part(root, 'band');
  const readout = part(root, 'readout');
  let width: Width = '3';
  let at = 0;

  const render = () => {
    const lines = WIDTHS[width];
    band.dataset.width = width;
    band.dataset.at = String(at);
    band.style.top = `${9 + at * LINE_H}px`;
    band.style.height = `${lines * LINE_H}px`;
    readout.dataset.at = String(at);
    readout.textContent = `Lines ${at + 1} to ${at + lines} of ${LINES.length}`;
  };

  part(root, 'advance').addEventListener('click', () => {
    const lines = WIDTHS[width];
    const last = LINES.length - lines;
    // A page at a time, clamped to the final band, and back to the top once it has been read.
    at = at >= last ? 0 : Math.min(at + lines, last);
    render();
  });

  part(root, 'width').addEventListener('change', (event) => {
    width = (event as CustomEvent<string>).detail as Width;
    // A new band width starts its pass at the top rather than wherever the last one stopped.
    at = 0;
    render();
  });

  render();
}
