import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three seeds, picked absolutely, so every state of the specimen is a stated one. */
const SEEDS: Record<string, string> = { indigo: '#4C4CE0', teal: '#0F8F84', crimson: '#C7365A' };
const START = 'indigo';

/**
 * Four derivations of one origin, written as the CSS that paints them: the browser resolves
 * every swatch from `--brand`, so changing the seed re-derives the whole set with no second
 * list of values anywhere.
 */
const ROWS = [
  { key: 'hover', role: 'hover', expr: 'oklch(from var(--brand) calc(l + 0.1) c h)' },
  { key: 'pressed', role: 'pressed', expr: 'oklch(from var(--brand) calc(l - 0.08) c h)' },
  { key: 'disabled', role: 'disabled', expr: 'oklch(from var(--brand) l calc(c * 0.2) h)' },
  { key: 'wash', role: 'wash', expr: 'rgb(from var(--brand) r g b / 25%)' },
];

/**
 * Relative colour syntax specimen: one seed token and four colours written as expressions
 * over it, each row showing the expression that paints its own swatch. Picking a different
 * seed rewrites nothing: the same four expressions resolve against the new origin, which is
 * the argument for deriving a palette instead of enumerating one.
 *
 * The subject is the block of derivation rows. The seed chip above it is the origin rather
 * than a derivation, and it stays in the context register with the seed control and the
 * caption (SPEC §5). Rows are a fixed height and the swatches a fixed size, so changing the
 * seed repaints and moves nothing.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    (row) => `
      <div class="sp-row" data-part="row-${row.key}" style="gap: 8px; height: 24px">
        <span class="sp-label" style="flex: 0 0 52px; font-size: 10px">${row.role}</span>
        <span class="sp-swatch" data-part="swatch-${row.key}"
              style="flex: 0 0 36px; height: 20px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12); --sp-swatch: ${row.expr}"></span>
        <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; white-space: nowrap">${row.expr}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scope" style="width: 430px; --brand: ${SEEDS[START]}">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Seed token</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-indigo" value="indigo">Indigo</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">Teal</button>
            <button class="sp-segment" data-part="seg-crimson" value="crimson">Crimson</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 11px; height: 22px">
          <span class="sp-label" style="flex: 0 0 52px; font-size: 10px">origin</span>
          <span class="sp-swatch" data-part="seed-chip"
                style="flex: 0 0 36px; height: 20px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12); --sp-swatch: var(--brand)"></span>
          <span class="sp-text sp-text--ink" data-part="seed-value" style="font-size: 10.5px">--brand: ${SEEDS[START]}</span>
        </div>

        <div class="sp-surface sp-stack" data-part="rows" data-subject data-seed="${START}"
             style="gap: 6px; margin-top: 10px; padding: 11px 12px">${rows}</div>

        <p class="sp-text sp-context" style="margin: 10px 0 0; height: 34px; font-size: 11px">
          Nothing in the block was edited. Each row states a channel to change and reads the rest of the colour from the seed.</p>
      </div>
    </div>
  `;

  const scope = part(root, 'scope');
  const rowsEl = part(root, 'rows');
  const seedValue = part(root, 'seed-value');

  const use = (name: string) => {
    const hex = SEEDS[name];
    if (!hex) return;
    scope.style.setProperty('--brand', hex);
    rowsEl.dataset.seed = name;
    seedValue.textContent = `--brand: ${hex}`;
  };
  use(START);

  part(root, 'segmented').addEventListener('change', (event) => use((event as CustomEvent<string>).detail));
}
