import { part } from '#src/kit/parts.ts';

const ENTRY =
  'flex: 1 1 70px; min-width: 70px; padding: 0; border: 0; outline: none; background: transparent; font: inherit; font-size: 13px; color: inherit';

const chip = (name: string, label: string) => `
  <span class="sp-chip" data-part="chip-${name}" style="cursor: default">
    ${label}
    <button class="sp-chip-remove" type="button" data-part="chip-${name}-remove" aria-label="Remove ${label}">✕</button>
  </span>`;

/**
 * Tag input specimen: committed values sitting inside the field that made them,
 * with the caret waiting after the last one. The subject is the field itself,
 * chips included: a chip on its own is a chip, and what this term names is the
 * control that turns typing into them.
 *
 * The field is held at two rows from mount (SPEC §5), so committing a value fills
 * room that was already reserved instead of pushing the help text down. Adding
 * and removing are separate explicit gestures, each reaching a state (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 232px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Article settings</span></div>
        <div class="sp-body">
          <div class="sp-label sp-context" style="margin-bottom: 6px">Topics</div>
          <div
            class="sp-input"
            data-part="field"
            data-subject
            style="display: flex; flex-wrap: wrap; align-content: flex-start; gap: 6px; min-height: 68px; padding: 8px"
          >
            ${chip('typography', 'typography')}
            ${chip('grids', 'grids')}
            <input data-part="entry" placeholder="Add a topic" autocomplete="off" style="${ENTRY}" />
          </div>
          <p class="sp-text sp-context" style="margin: 8px 2px 0">Press Enter to commit each topic.</p>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const entry = part(root, 'entry') as HTMLInputElement;

  entry.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const label = entry.value.trim();
    if (!label) return;
    entry.insertAdjacentHTML('beforebegin', chip('new', label));
    entry.value = '';
    part(field, 'chip-new-remove').addEventListener('click', () => part(field, 'chip-new').remove());
  });

  part(root, 'chip-grids-remove').addEventListener('click', () => part(root, 'chip-grids').remove());
  part(root, 'chip-typography-remove').addEventListener('click', () => part(root, 'chip-typography').remove());
}
