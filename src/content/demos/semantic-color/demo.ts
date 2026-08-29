import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Four names, two schemes. Only the right hand side of each row is allowed to move:
 * the name column is written once at mount and never rewritten, which is the claim.
 */
type Resolved = { ref: string; hex: string };

const TOKENS = ['danger', 'success', 'surface', 'text-subtle'] as const;
type TokenName = (typeof TOKENS)[number];

const SCHEMES: Record<string, Record<TokenName, Resolved>> = {
  day: {
    danger: { ref: 'red-600', hex: '#C2312B' },
    success: { ref: 'green-600', hex: '#2F7D4F' },
    surface: { ref: 'white', hex: '#FFFFFF' },
    'text-subtle': { ref: 'slate-500', hex: '#6B7280' },
  },
  dusk: {
    danger: { ref: 'red-300', hex: '#FF9A9A' },
    success: { ref: 'green-300', hex: '#7FD6A2' },
    surface: { ref: 'slate-900', hex: '#1B1E24' },
    'text-subtle': { ref: 'slate-400', hex: '#9AA1AE' },
  },
};

/** The counter-example: a name that leaked its hue, so no scheme dares repoint it. */
const LEAKED: Resolved = { ref: 'blue-600', hex: '#2F5CF0' };

const START = 'day';
const ROW_H = 24;

/**
 * Semantic colour specimen: a token list read as names rather than as swatches. Each row
 * is a name that states a job, the primitive it currently points at, and the value that
 * resolves to. Changing scheme rewrites every value and every reference on stage and
 * leaves all four names exactly where they were, which is the whole of the term: because
 * nothing says which hue it is, a theme is a remapping and never a rename.
 *
 * The subject is the `danger` row: one name-and-value pair, the narrowest thing here that
 * the term actually names. The table around it is the same claim repeated, so the other
 * rows sit in the context register, as do the scheme control and the readout. `danger`
 * stays semantically named in both schemes, so there is no state identify must refuse.
 *
 * `brand-blue` is the counter-example, kept quiet in the context register: its value is
 * identical under both schemes because the name promised a hue and nobody can move it.
 */
export function mount(root: HTMLElement): void {
  const row = (name: string, value: Resolved, options: { subject?: boolean; part: string }) => `
    <div class="sp-row ${options.subject ? '' : 'sp-context'}" data-part="${options.part}"
         data-token="${name}" data-resolves="${value.ref}"
         ${options.subject ? 'data-subject' : ''}
         style="height: ${ROW_H}px; gap: 8px; padding: 0 8px; border-radius: 6px;
                border: 1px solid var(--sp-line); background: var(--sp-surface)">
      <span class="sp-swatch" data-part="swatch-${options.part}"
            style="flex: 0 0 13px; height: 13px; border-radius: 3px;
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${value.hex}"></span>
      <span class="sp-grow" style="font-size: 11.5px; white-space: nowrap">${name}</span>
      <span class="sp-text" data-part="ref-${options.part}"
            style="flex: 0 0 72px; font-size: 10.5px; white-space: nowrap">${value.ref}</span>
      <span class="sp-text" data-part="hex-${options.part}"
            style="flex: 0 0 62px; font-size: 10px; text-align: right; white-space: nowrap;
                   font-variant-numeric: tabular-nums">${value.hex}</span>
    </div>`;

  const start = SCHEMES[START] ?? SCHEMES.day;
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-scheme="${START}" style="width: 404px; padding: 12px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Scheme" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-day" value="day">Day</button>
            <button class="sp-segment" data-part="seg-dusk" value="dusk">Dusk</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 10px; padding: 0 8px">
          <span class="sp-label sp-grow" style="font-size: 10px">Name</span>
          <span class="sp-label" style="flex: 0 0 72px; font-size: 10px">Points at</span>
          <span class="sp-label" style="flex: 0 0 62px; font-size: 10px; text-align: right">Value</span>
        </div>

        <div class="sp-stack" style="gap: 5px; margin-top: 5px">
          ${TOKENS.map((name) => row(name, start[name], { part: `row-${name}`, subject: name === 'danger' })).join('')}
        </div>

        <div class="sp-divider" style="margin: 10px 0"></div>

        ${row('brand-blue', LEAKED, { part: 'row-leaked' })}

        <p class="sp-text sp-context" data-part="readout"
           style="margin: 10px 0 0; height: 26px; font-size: 10.5px; line-height: 1.3"></p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const readout = part(root, 'readout');

  const apply = (scheme: string) => {
    const table = SCHEMES[scheme];
    if (!table) return;
    scene.dataset.scheme = scheme;

    for (const name of TOKENS) {
      const value = table[name];
      const rowEl = part(root, `row-${name}`);
      // Written from the same table the values come from, so a scheme that renamed a
      // token could not pass the choreography's "the name did not move" assert.
      rowEl.dataset.token = name;
      rowEl.dataset.resolves = value.ref;
      part(root, `swatch-row-${name}`).style.setProperty('--sp-swatch', value.hex);
      part(root, `ref-row-${name}`).textContent = value.ref;
      part(root, `hex-row-${name}`).textContent = value.hex;
    }

    readout.textContent =
      scheme === START
        ? 'Four names state a job. brand-blue states a hue, which is the one name no scheme can move.'
        : 'Every value on the right changed. Not one name on the left did, and brand-blue is still blue.';
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
