import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Palette = {
  page: string;
  card: string;
  line: string;
  ink: string;
  muted: string;
  fill: string;
  fillInk: string;
  fillLine: string;
  sel: string;
  selInk: string;
  shadow: string;
};

/** The palette the interface was designed in: a fill for the primary action, a tinted
    selection, a card lifted off the page by a shadow. */
const AUTHORED: Palette = {
  page: '#F4F6FA',
  card: '#FFFFFF',
  line: '#D8DEE9',
  ink: '#1B2130',
  muted: '#5A6474',
  fill: '#3557E8',
  fillInk: '#FFFFFF',
  fillLine: '#3557E8',
  sel: '#E4E9FD',
  selInk: '#1B2130',
  shadow: '0 2px 6px rgb(16 24 40 / 0.16)',
};

/**
 * Two contrast themes, written the way the browser substitutes them: one Canvas behind
 * everything, one CanvasText on it, ButtonFace for the buttons with a ButtonBorder to tell
 * them apart, Highlight kept for the selected row, and no shadow at all. The values are a
 * simulation of a user's theme, not a claim about a particular Windows build.
 */
const THEMES: Record<string, Palette> = {
  night: {
    page: '#000000',
    card: '#000000',
    line: '#FFFFFF',
    ink: '#FFFFFF',
    muted: '#FFFFFF',
    fill: '#000000',
    fillInk: '#FFFFFF',
    fillLine: '#FFFFFF',
    sel: '#1AEBFF',
    selInk: '#000000',
    shadow: 'none',
  },
  desert: {
    page: '#FFFAEF',
    card: '#FFFAEF',
    line: '#3D3D3D',
    ink: '#3D3D3D',
    muted: '#3D3D3D',
    fill: '#FFFAEF',
    fillInk: '#3D3D3D',
    fillLine: '#3D3D3D',
    sel: '#9D3B00',
    selInk: '#FFFAEF',
    shadow: 'none',
  },
};

const NAMES: Record<string, string> = { night: 'Night sky', desert: 'Desert' };
const START = 'night';

const PROPS: Record<string, keyof Palette> = {
  '--f-page': 'page',
  '--f-card': 'card',
  '--f-line': 'line',
  '--f-ink': 'ink',
  '--f-muted': 'muted',
  '--f-fill': 'fill',
  '--f-fill-ink': 'fillInk',
  '--f-fill-line': 'fillLine',
  '--f-sel': 'sel',
  '--f-sel-ink': 'selInk',
  '--f-shadow': 'shadow',
};

const vars = (p: Palette, prefix: string) =>
  Object.entries(PROPS)
    .map(([key, value]) => `${key.replace('--f-', prefix)}: ${p[value]}`)
    .join('; ');

/**
 * Forced colors specimen: one small filter panel drawn twice, once in the palette it was
 * authored in and once as the operating system repaints it, with the contrast theme chosen
 * as an absolute state. The markup and the geometry are identical in both; only the colours
 * and the shadow differ, which is exactly what the mode does to a page.
 *
 * The subject is the forced panel. The term names that rendering, not the theme control and
 * not the authored panel, which is the half being compared against and stays in the context
 * register (SPEC §5). Both themes are honest renderings of the mode, so there is no state
 * identify has to refuse. The two panels are the same fixed size and the mapping list has a
 * fixed height, so switching theme repaints and moves nothing.
 *
 * The mapping list was headed "What the theme substituted", a sentence about the figure
 * rather than a name for it. It is headed "Substitutions" now, and each line still names
 * the pair it maps.
 */
export function mount(root: HTMLElement): void {
  const panel = (prefix: string, name: string, subject: boolean, palette: Palette) => `
    <div style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 4px">
      <div data-part="${name}" ${subject ? `data-subject data-theme="${START}"` : ''}
           style="${vars(palette, prefix)}; padding: 9px; border-radius: var(--sp-radius);
                  border: 1px solid var(${prefix}line); background: var(${prefix}page)">
        <span style="font-size: 12px; font-weight: 600; color: var(${prefix}ink)">Filters</span>
        <div style="margin-top: 6px; padding: 5px; border-radius: 6px; background: var(${prefix}card);
                    border: 1px solid var(${prefix}line); box-shadow: var(${prefix}shadow)">
          <div data-part="${name}-selected" style="padding: 3px 6px; border-radius: 4px; font-size: 11px;
               background: var(${prefix}sel); color: var(${prefix}sel-ink)">Unread only</div>
          <div style="padding: 3px 6px; font-size: 11px; color: var(${prefix}ink)">Has attachment</div>
        </div>
        <div class="sp-row" style="margin-top: 7px; gap: 8px">
          <span data-part="${name}-primary" style="padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 500;
                background: var(${prefix}fill); color: var(${prefix}fill-ink); border: 1px solid var(${prefix}fill-line)">Apply</span>
          <span style="padding: 4px 10px; border-radius: 6px; font-size: 11px;
                background: transparent; color: var(${prefix}ink); border: 1px solid var(${prefix}line)">Reset</span>
        </div>
      </div>
      <span class="sp-label" data-part="${name}-name" style="font-size: 10px">${subject ? `Forced, ${NAMES[START]}` : 'As authored'}</span>
    </div>`;

  const mapping = [
    'Page and card → one Canvas',
    'Card shadow → dropped',
    'Accent fill → ButtonFace and a border',
    'Selected row → Highlight',
  ]
    .map((line) => `<span class="sp-text" style="flex: 0 0 176px; font-size: 10.5px; line-height: 1.3">${line}</span>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 424px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Contrast theme" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-night" value="night">Night sky</button>
            <button class="sp-segment" data-part="seg-desert" value="desert">Desert</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          <div class="sp-context" style="display: flex; flex: 1 1 0; min-width: 0">${panel('--a-', 'authored', false, AUTHORED)}</div>
          ${panel('--f-', 'forced', true, THEMES[START] ?? AUTHORED)}
        </div>

        <div class="sp-stack sp-context" style="gap: 3px; margin-top: 9px">
          <span class="sp-label" style="font-size: 10px">Substitutions</span>
          <div class="sp-row sp-row--wrap" data-part="mapping" style="gap: 2px 14px">${mapping}</div>
        </div>
      </div>
    </div>
  `;

  const forced = part(root, 'forced');
  const forcedName = part(root, 'forced-name');

  const apply = (name: string) => {
    const palette = THEMES[name];
    if (!palette) return;
    forced.dataset.theme = name;
    for (const [key, value] of Object.entries(PROPS)) forced.style.setProperty(key, palette[value]);
    forcedName.textContent = `Forced, ${NAMES[name] ?? name}`;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
