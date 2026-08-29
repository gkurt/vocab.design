import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three pairs, written once each. The card reads the names; the function decides the values. */
const PAIRS = [
  { key: 'surface', light: '#FFFFFF', dark: '#1B1E26' },
  { key: 'ink', light: '#1B2130', dark: '#E7EAF0' },
  { key: 'accent', light: '#2F4FD8', dark: '#8AA2FF' },
] as const;

const NOTES: Record<string, string> = {
  light: 'The card resolves light, so every pair above returns its first argument.',
  dark: 'The card resolves dark, so the same three declarations return their second argument.',
};

const START = 'light';

/**
 * light-dark() specimen: a card whose surface, ink and accent each come from one
 * declaration holding both theme values, under a simulated scheme. The function is the real
 * one and the scheme control writes a real `color-scheme` on the card, so the values are
 * resolved by the browser rather than swapped by this demo, and the code lines beside it
 * show which argument that resolution is currently returning.
 *
 * The subject is the card the function paints, not the code lines that spell it: the term
 * names the function, and the card is the narrowest element whose colours are entirely its
 * result. Control, code lines and caption stay in the context register. Nothing is sized by
 * its state, and the live argument is marked by colour rather than by weight, so flipping
 * the scheme repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  // Named exactly as the code lines below print them, so the specimen quotes itself rather than an illustration.
  const vars = PAIRS.map((pair) => `--${pair.key}: light-dark(${pair.light}, ${pair.dark})`).join('; ');

  const lines = PAIRS.map(
    (pair) => `
      <div class="sp-row" data-part="code-${pair.key}" style="gap: 0; font-size: 11px; line-height: 1.5; white-space: pre">
        <span class="sp-text" style="font-size: 11px">--${pair.key}: light-dark(</span>
        <span data-part="arg-${pair.key}-light" style="font-size: 11px">${pair.light}</span>
        <span class="sp-text" style="font-size: 11px">, </span>
        <span data-part="arg-${pair.key}-dark" style="font-size: 11px">${pair.dark}</span>
        <span class="sp-text" style="font-size: 11px">)</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="color-scheme" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-light" value="light">light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">dark</button>
          </sp-segmented>
        </div>

        <div data-part="card" data-subject data-scheme="${START}"
             style="color-scheme: ${START}; ${vars}; margin-top: 12px; height: 104px; padding: 12px;
                    border-radius: var(--sp-radius); border: 1px solid color-mix(in oklab, var(--ink) 22%, var(--surface));
                    background: var(--surface); color: var(--ink)">
          <span style="display: block; font-size: 13px; font-weight: 600">Quarterly statement</span>
          <span style="display: block; margin-top: 4px; font-size: 11px; opacity: 0.72">Ready to download</span>
          <span style="display: inline-block; margin-top: 12px; padding: 6px 12px; border-radius: 6px;
                       font-size: 12px; font-weight: 500; background: var(--accent);
                       color: color-mix(in oklab, var(--surface) 88%, var(--accent))">Open</span>
        </div>

        <div class="sp-stack sp-context" data-part="code" style="gap: 2px; margin-top: 10px">${lines}</div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 8px 0 0; min-height: 39px">&nbsp;</p>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const note = part(root, 'note');

  const resolve = (scheme: string) => {
    card.dataset.scheme = scheme;
    // The real property: the function answers to this, and so would any native widget in here.
    card.style.colorScheme = scheme;
    for (const pair of PAIRS) {
      for (const side of ['light', 'dark'] as const) {
        const arg = part(root, `arg-${pair.key}-${side}`);
        const live = side === scheme;
        arg.style.color = live ? 'var(--sp-ink)' : 'var(--sp-muted)';
        arg.style.opacity = live ? '1' : '0.45';
      }
    }
    note.textContent = NOTES[scheme] ?? '';
  };
  resolve(START);

  part(root, 'segmented').addEventListener('change', (event) => resolve((event as CustomEvent<string>).detail));
}
