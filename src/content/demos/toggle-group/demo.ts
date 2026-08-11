import { flag, part } from '#src/kit/parts.ts';

const TOGGLES = [
  { key: 'bold', label: 'B', name: 'Bold', style: 'font-weight: 700' },
  { key: 'italic', label: 'I', name: 'Italic', style: 'font-style: italic' },
  { key: 'underline', label: 'U', name: 'Underline', style: 'text-decoration: underline' },
];

/**
 * Toggle group specimen: three buttons that each hold their own pressed state and
 * answer one question between them. The subject is the group, not a member, since
 * a single toggle button is not a toggle group.
 *
 * Here the toggling is the term (SPEC §8), so the members toggle and the script
 * drives both directions itself. The sample below is the last thing in the frame
 * and its block is a fixed height, so re-weighting the text moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const buttons = TOGGLES.map(
    ({ key, label, name, style }) =>
      `<button
        class="sp-button sp-button--ghost sp-button--sm"
        data-part="toggle-${key}"
        data-key="${key}"
        aria-pressed="false"
        aria-label="${name}"
        style="${style}; width: 32px; padding: 5px 0; text-align: center"
      >${label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Release notes</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-context" id="format-label">Emphasis</span>
            <div
              class="sp-row"
              data-part="group"
              data-subject
              role="group"
              aria-labelledby="format-label"
              style="gap: 4px; padding: 3px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-surface)"
            >${buttons}</div>
          </div>
          <div class="sp-divider sp-context" style="margin: 14px 0"></div>
          <p class="sp-prose sp-context" data-part="sample" style="height: 80px; margin: 0">
            Version 4.2 ships the new export pipeline and a faster first paint.
          </p>
        </div>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');

  for (const { key, style } of TOGGLES) {
    const button = part(root, `toggle-${key}`);
    button.addEventListener('click', () => {
      const on = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(on));
      flag(button, 'data-selected', on);
      const [property, value] = style.split(':').map((piece) => piece.trim());
      if (!property || !value) return;
      sample.style.setProperty(property, on ? value : '');
    });
  }
}
