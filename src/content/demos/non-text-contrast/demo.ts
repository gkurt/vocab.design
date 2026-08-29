import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The panel states its own background so the printed ratios mean something: a measured
 * contrast is a measurement against a named colour, and a swatch that changed with the
 * page theme would make every number below it a guess. Both palettes are computed against
 * this one value.
 */
const PANEL = '#f4f5f7';
const PANEL_INK = '#23262b';

type Item = { key: string; label: string; pass: string; fade: string; passRatio: string; fadeRatio: string };

const ITEMS: Item[] = [
  { key: 'border', label: 'Field border', pass: '#8b8b8b', fade: '#c4c4c4', passRatio: '3.1', fadeRatio: '1.6' },
  { key: 'icon', label: 'Icon stroke', pass: '#55595f', fade: '#c4c4c4', passRatio: '6.5', fadeRatio: '1.6' },
  { key: 'ring', label: 'Focus ring', pass: '#3557e8', fade: '#aab8f2', passRatio: '5.2', fadeRatio: '1.8' },
  { key: 'chart', label: 'Series line', pass: '#2f7d5b', fade: '#c4c4c4', passRatio: '4.6', fadeRatio: '1.6' },
];

const CAPTION = {
  pass: 'Every part that identifies a control or carries meaning clears 3:1 against the panel behind it.',
  faded: 'The same parts near 1.6:1. Nothing was removed, and the field, the state and the series all became guesses.',
} as const;

const CELL = 'flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 8px';
const NAME = 'font-size: 10px; text-align: center; white-space: nowrap';

/**
 * Non-text contrast specimen: the four things WCAG 1.4.11 is actually about, drawn at the
 * ratios it asks for and then dropped to the ratios that fail it. Each part is labelled
 * with what it measures against the panel it sits on.
 *
 * The subject is the control row, the narrowest element that holds the parts the criterion
 * governs. The mode control, the ratio labels and the caption are scenery (SPEC §5). The
 * faded row is a state the subject itself passes through, so the honest condition is
 * declared in `data-pose` and the mount state satisfies it: identify refuses to ring the
 * failing version, which is the opposite of the term (SPEC §6).
 *
 * Only the colours change between states, so the row never moves (SPEC §5), and the ratio
 * labels are carried with the colours rather than written twice.
 */
export function mount(root: HTMLElement): void {
  const cell = (item: Item) => `
    <div data-part="item-${item.key}" data-mode="pass" style="${CELL}">
      <div data-part="art-${item.key}" style="display: flex; align-items: center; justify-content: center; height: 44px"></div>
      <span style="${NAME}; color: ${PANEL_INK}">${item.label}</span>
      <span data-part="ratio-${item.key}" data-value="${item.passRatio}"
            style="${NAME}; font-weight: 600; color: ${PANEL_INK}">${item.passRatio}:1</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Everything that is not text, against 3:1</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="pass" data-axis="Contrast" data-term="pass">
            <button class="sp-segment" data-part="seg-pass" value="pass">Meets 3:1</button>
            <button class="sp-segment" data-part="seg-faded" value="faded">Faded</button>
          </sp-segmented>
        </div>

        <div data-part="row" data-subject data-pose="[data-mode=pass]" data-mode="pass"
             style="margin-top: 12px; display: flex; gap: 10px; padding: 14px 12px; border-radius: 8px;
                    background: ${PANEL}; color: ${PANEL_INK}">
          ${ITEMS.map(cell).join('')}
        </div>

        <p class="sp-text sp-context" data-part="caption" data-case="pass"
           style="margin: 10px 0 0; height: 30px; font-size: 11px">${CAPTION.pass}</p>
      </div>
    </div>
  `;

  const row = part(root, 'row');
  const caption = part(root, 'caption');

  const art = {
    border: (colour: string) =>
      `<span style="display: flex; align-items: center; width: 76px; height: 26px; padding: 0 8px;
                    border: 1px solid ${colour}; border-radius: 5px; font-size: 11px; color: ${PANEL_INK}">Email</span>`,
    icon: (colour: string) => `<span style="display: flex; color: ${colour}; transform: scale(1.5)">${icon('bell')}</span>`,
    ring: (colour: string) =>
      `<span style="display: flex; align-items: center; justify-content: center; width: 60px; height: 24px;
                    border-radius: 5px; background: #dfe1e6; color: ${PANEL_INK}; font-size: 11px;
                    outline: 2px solid ${colour}; outline-offset: 2px">Send</span>`,
    chart: (colour: string) =>
      `<svg viewBox="0 0 76 30" width="76" height="30" aria-hidden="true">
         <polyline points="2,24 14,16 26,20 38,7 50,13 62,4 74,10" fill="none" stroke="${colour}"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
       </svg>`,
  } as const;

  const apply = (pass: boolean) => {
    row.dataset.mode = pass ? 'pass' : 'faded';
    for (const item of ITEMS) {
      const colour = pass ? item.pass : item.fade;
      part(root, `art-${item.key}`).innerHTML = art[item.key as keyof typeof art](colour);
      part(root, `item-${item.key}`).dataset.mode = pass ? 'pass' : 'faded';
      const ratio = part(root, `ratio-${item.key}`);
      const value = pass ? item.passRatio : item.fadeRatio;
      ratio.dataset.value = value;
      ratio.textContent = `${value}:1`;
    }
    caption.dataset.case = pass ? 'pass' : 'faded';
    caption.textContent = pass ? CAPTION.pass : CAPTION.faded;
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail !== 'faded');
  });

  apply(true);
}
