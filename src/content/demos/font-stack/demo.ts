import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The declared stack. Two named faces a machine is likely to have and the
 * generic they end in, each written out in the face it names, since a specimen
 * about which typeface is chosen cannot be set in the kit's single sans
 * (SPEC §5). The entries were picked for visibly different proportions: falling
 * through the chain has to be something a reader can see, not infer.
 */
const STACK = [
  { label: 'Georgia', family: "Georgia, 'Liberation Serif', serif" },
  { label: 'Verdana', family: "Verdana, 'DejaVu Sans', sans-serif" },
  { label: 'sans-serif', family: 'sans-serif' },
];

/** How many entries the simulation treats as not installed. */
const MISSING: Record<string, number> = { none: 0, first: 1, two: 2 };
const SAMPLE = 'Handgloves 0123';

/**
 * Font stack specimen: the declaration itself, with the entry currently in force
 * marked, over a sample line set in whatever that entry resolved to. A control
 * in the scenery takes faces away from the top of the list, and the line drops
 * to the next one, changing width and x-height as it goes.
 *
 * The subject is the list of families. That is what the term names: the sample
 * below it is the result, and the switch that removes fonts is the demo's own
 * instrumentation (SPEC §5), so both stay outside the subject.
 *
 * The sample sits in a box of fixed height and the readout in a fixed row, so a
 * face two entries down cannot push the caption around (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const entries = STACK.map(
    ({ label, family }, i) => `
      <span data-part="entry-${i}" style="font-family: ${family}; font-size: 16px">${label}${i < STACK.length - 1 ? ',' : ';'}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Not installed" data-part="segmented" data-value="none">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-first" value="first">1st</button>
            <button class="sp-segment" data-part="seg-two" value="two">1st + 2nd</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 8px; margin-top: 16px; align-items: baseline">
          <span class="sp-label sp-context">font-family:</span>
          <span class="sp-row" data-part="declaration" data-subject data-missing="none" style="gap: 6px; align-items: baseline">
            ${entries}
          </span>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-row" data-part="sample-box" style="height: 44px">
          <span data-part="sample" style="font-family: ${STACK[0]?.family}; font-size: 22px">${SAMPLE}</span>
        </div>
        <div class="sp-row sp-context" style="height: 20px">
          <span class="sp-text" data-part="readout">Resolved to Georgia, the first entry in the list.</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 10px">
          Each entry is tried in turn and the first one available wins. The line changes width and
          x-height every time the chain falls through, which is what a mismatched fallback costs.
        </p>
      </div>
    </div>
  `;

  const declaration = part(root, 'declaration');
  const sample = part(root, 'sample');
  const readout = part(root, 'readout');
  const tokens = STACK.map((_, i) => part(root, `entry-${i}`));
  const ORDINALS = ['first', 'second', 'third'];

  const apply = (name: string) => {
    const missing = MISSING[name];
    if (missing === undefined) return;
    const chosen = STACK[missing];
    if (!chosen) return;
    declaration.dataset.missing = name;
    tokens.forEach((token, i) => {
      const gone = i < missing;
      token.toggleAttribute('data-gone', gone);
      token.toggleAttribute('data-current', i === missing);
      token.style.textDecoration = gone ? 'line-through' : 'none';
      token.style.color = gone ? 'var(--sp-muted)' : i === missing ? 'var(--sp-accent)' : 'var(--sp-ink)';
    });
    sample.style.fontFamily = chosen.family;
    readout.textContent = `Resolved to ${chosen.label}, the ${ORDINALS[missing]} entry in the list.`;
  };

  apply('none');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
