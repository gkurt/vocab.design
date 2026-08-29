import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Theme = { bg: string; surface: string; line: string; text: string; accent: string; accentInk: string };

/** Four complete sets for the same five names. Nothing in the panel knows which one it is wearing. */
const THEMES: Record<string, Theme> = {
  light: { bg: '#F4F6FA', surface: '#FFFFFF', line: '#D8DEE9', text: '#1B2130', accent: '#3557E8', accentInk: '#FFFFFF' },
  dark: { bg: '#14171C', surface: '#22262E', line: '#333944', text: '#E7EAF0', accent: '#7B93F5', accentInk: '#10131C' },
  contrast: { bg: '#000000', surface: '#000000', line: '#FFFFFF', text: '#FFFFFF', accent: '#FFEA00', accentInk: '#000000' },
  sepia: { bg: '#F3E7D0', surface: '#FBF3E4', line: '#DCC9A6', text: '#3A2E1E', accent: '#9A5B21', accentInk: '#FFF6E8' },
};

const NAMES = ['bg', 'surface', 'line', 'text', 'accent'] as const;

const NOTES: Record<string, string> = {
  light: 'The default set: one value per name, and every part of the panel reads only the names.',
  dark: 'A different set behind the same names, so nothing in the panel is told the palette changed.',
  contrast: 'Contrast is a theme too, not a filter: these values were chosen, not computed from the light set.',
  sepia: 'A per tenant set proves the point. Anything that fills the same five names can be dropped in whole.',
};

const START = 'light';

/**
 * Colour theme specimen: one small interface written against five token names, and four
 * complete sets of values for those names. The token column beside it is the set itself,
 * read out value by value, so the swap is visible as a change of data rather than as a
 * restyle of the panel.
 *
 * The subject is the themed panel: the term names the set as it is worn, and the column is
 * the set as it is written. The column, the theme control and the caption stay in the
 * context register. Panel, column rows and caption are all fixed size, so swapping theme
 * repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = NAMES.map(
    (name) => `
      <div class="sp-row sp-row--between" style="gap: 6px">
        <span class="sp-row" style="gap: 5px">
          <span class="sp-swatch" data-part="chip-${name}" style="width: 12px; height: 12px; box-shadow: inset 0 0 0 1px var(--sp-line)"></span>
          <span class="sp-label" style="font-size: 10px">${name}</span>
        </span>
        <span class="sp-text" data-part="value-${name}" style="font-size: 10px">&nbsp;</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Theme" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
            <button class="sp-segment" data-part="seg-contrast" value="contrast">Contrast</button>
            <button class="sp-segment" data-part="seg-sepia" value="sepia">Sepia</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" data-part="tokens" style="flex: 0 0 132px; gap: 7px">${rows}</div>

          <div data-part="panel" data-subject data-set="${START}" class="sp-grow"
               style="height: 138px; padding: 12px; border-radius: var(--sp-radius);
                      border: 1px solid var(--t-line); background: var(--t-bg); color: var(--t-text)">
            <div class="sp-row sp-row--between">
              <span style="font-size: 13px; font-weight: 600">Inbox</span>
              <span style="font-size: 11px; opacity: 0.72">3 new</span>
            </div>
            <div style="margin-top: 9px; padding: 9px 10px; border-radius: 6px;
                        border: 1px solid var(--t-line); background: var(--t-surface)">
              <span style="display: block; font-size: 12px; font-weight: 500">Weekly report</span>
              <span style="display: block; margin-top: 2px; font-size: 11px; opacity: 0.72">Sent to four people</span>
            </div>
            <div class="sp-row" style="margin-top: 10px">
              <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                           background: var(--t-accent); color: var(--t-accent-ink)">Reply</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; min-height: 39px">&nbsp;</p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const note = part(root, 'note');

  const wear = (key: string) => {
    const theme = THEMES[key];
    if (!theme) return;
    panel.dataset.set = key;
    panel.style.setProperty('--t-accent-ink', theme.accentInk);
    for (const name of NAMES) {
      panel.style.setProperty(`--t-${name}`, theme[name]);
      part(root, `chip-${name}`).style.setProperty('--sp-swatch', theme[name]);
      part(root, `value-${name}`).textContent = theme[name];
    }
    note.textContent = NOTES[key] ?? '';
  };
  wear(START);

  part(root, 'segmented').addEventListener('change', (event) => wear((event as CustomEvent<string>).detail));
}
