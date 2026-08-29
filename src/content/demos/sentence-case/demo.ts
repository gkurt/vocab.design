/** The rows of a settings screen, written the way sentences are written. */
const ROWS: { part: string; label: string; on: boolean }[] = [
  { part: 'row-digest', label: 'Email digest', on: true },
  { part: 'row-mentions', label: 'Mentions in Harbour', on: true },
  { part: 'row-sound', label: 'Sound and vibration', on: false },
];

/**
 * Sentence case specimen: one settings panel where every string a person reads
 * follows the same rule. The screen title, the row labels and the two buttons all
 * take a capital on their first word and nowhere else, except the one label that
 * carries a name, which keeps the capital grammar gives it. That exception is the
 * whole point: the rule is a sentence rule, not a transform.
 *
 * The subject is the panel of labels, which is the narrowest thing the term names:
 * the chips reciting the rule and the caption are the demo's own instrumentation
 * and stay in the context register (SPEC §5). Nothing changes state, so there is
 * no room to reserve and no counter-example for `data-pose` to rule out (SPEC §6).
 */
export function mount(root: HTMLElement): void {
  const row = ({ part, label, on }: (typeof ROWS)[number]) => `
    <div class="sp-row sp-row--between" data-part="${part}" style="height: 26px">
      <span style="font-size: 13px">${label}</span>
      <button class="sp-switch" role="switch" aria-checked="${on}" tabindex="-1"></button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 14px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">settings screen</span>
          <span class="sp-label">sentence case throughout</span>
        </div>
        <div class="sp-surface" data-part="labels" data-subject data-case="sentence"
             style="margin-top: 8px; padding: 10px 12px">
          <span class="sp-heading" data-part="screen-title" style="display: block">Notification preferences</span>
          <div class="sp-stack" style="gap: 0; margin-top: 4px">
            ${ROWS.map(row).join('')}
          </div>
          <div class="sp-row" data-part="actions" style="gap: 8px; margin-top: 8px">
            <button class="sp-button sp-button--sm" data-part="save">Save changes</button>
            <button class="sp-button sp-button--sm sp-button--ghost" data-part="later">Ask me later</button>
          </div>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="rules" style="gap: 6px; margin-top: 8px">
          <span class="sp-chip">First word capitalised</span>
          <span class="sp-chip">Proper nouns keep theirs</span>
          <span class="sp-chip">Nothing else</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; font-size: 12px">
          Only "Harbour" keeps a capital, because it is a name and not a word.
        </p>
      </div>
    </div>
  `;
}
