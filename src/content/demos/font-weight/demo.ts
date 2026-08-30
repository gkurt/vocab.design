const WORD = 'Hamburgefons';

/** The four steps a design system usually keeps, with the names the numbers stand for. */
const STEPS = [
  { value: 300, name: 'Light' },
  { value: 400, name: 'Regular' },
  { value: 600, name: 'Semi Bold' },
  { value: 700, name: 'Bold' },
];

/**
 * Font weight specimen: one word set four times, nothing changing but the stroke
 * thickness, with the number and the name each step answers to. Under it, the
 * same two weights doing the job weight is actually hired for in an interface:
 * a title and its detail at one size, told apart by weight alone.
 *
 * The subject is the ramp, not the window: the term names the weight of the
 * strokes, and a ramp is the narrowest thing that can show a weight at all,
 * since a single sample has nothing to be heavier than. The applied row below
 * is scenery, so identify still rings the comparison rather than the scene.
 *
 * A label beside the heading read "one size, one family", which is the site stating
 * what it held constant rather than anything the sheet itself would print. The
 * article says the same, so it went.
 */
export function mount(root: HTMLElement): void {
  const rows = STEPS.map(
    ({ value, name }) => `
      <div class="sp-row" data-part="step-${value}" style="gap: 12px">
        <span data-part="sample-${value}" class="sp-grow"
              style="font-weight: ${value}; font-size: 18px; line-height: 1.35">${WORD}</span>
        <span class="sp-label" style="width: 30px; text-align: right; font-variant-numeric: tabular-nums">${value}</span>
        <span class="sp-label" style="width: 66px">${name}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Weight ramp</span>
        </div>
        <div class="sp-stack" data-part="ramp" data-subject style="gap: 4px; margin-top: 12px">
          ${rows}
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0"></div>
        <div class="sp-stack sp-context" data-part="applied" style="gap: 2px">
          <span style="font-weight: 600; font-size: 13px">Invoice 0042</span>
          <span class="sp-text" style="font-size: 13px">Paid on 4 March, Northwind Trading</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          Both lines are 13px. Weight alone says which one is the title.
        </p>
      </div>
    </div>
  `;
}
