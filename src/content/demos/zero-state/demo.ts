import { part } from '#src/kit/parts.ts';

const COLUMNS = ['To do', 'Doing', 'Done'];
const GHOSTS = [2, 1, 1];

const ghostCard = (short: boolean): string => `
  <div style="border: 1px dashed var(--sp-line); border-radius: 6px; padding: 7px 8px; background: var(--sp-surface)">
    <div class="sp-line" style="width: ${short ? 62 : 88}%"></div>
    <div class="sp-line" style="width: 46%; margin-top: 6px"></div>
  </div>`;

/**
 * Zero state specimen: the screen the feature wears before it holds anything.
 * It does not report the emptiness, it previews the filled version, which is the
 * line between this term and the empty state next door. The ghosted cards are
 * drawn as samples (dashed, faded) so nothing here can be mistaken for real data.
 */
export function mount(root: HTMLElement): void {
  const preview = COLUMNS.map(
    (name, i) => `
      <div style="flex: 1 1 0; min-width: 0">
        <div class="sp-label" style="margin-bottom: 6px">${name}</div>
        <div class="sp-stack" style="gap: 6px">${Array.from({ length: GHOSTS[i] ?? 1 }, (_, j) => ghostCard(j > 0)).join('')}</div>
      </div>`,
  ).join('');

  const board = COLUMNS.map(
    (name, i) => `
      <div style="flex: 1 1 0; min-width: 0">
        <div class="sp-label" style="margin-bottom: 6px">${name}</div>
        <div class="sp-stack" style="gap: 6px">
          ${i === 0 ? `<div class="sp-surface" data-part="card" style="padding: 7px 8px; font-size: 12px">Draft the brief</div>` : ''}
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 452px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Boards</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="new">New</button>
        </div>
        <div class="sp-body" style="position: relative; padding: 14px">
          <div data-part="zero" data-subject class="sp-stack" style="gap: 14px; height: 100%">
            <div class="sp-row" style="gap: 10px; align-items: flex-start; opacity: 0.5">${preview}</div>
            <p class="sp-text sp-text--ink" style="margin: 0; max-width: 40ch">
              A board looks like this: three columns, and a card for each piece of work moving across them.
            </p>
            <button class="sp-button sp-button--sm" data-part="start" style="align-self: flex-start">Start your first board</button>
          </div>
          <div data-part="board" class="sp-row" style="gap: 10px; align-items: flex-start" hidden>${board}</div>
        </div>
      </div>
    </div>
  `;

  const zero = part(root, 'zero');
  const filled = part(root, 'board');
  // The body's height is the frame's, so the swap happens inside a box that was
  // already reserved: nothing outside the panel moves (SPEC §5).
  const start = (): void => {
    zero.hidden = true;
    filled.hidden = false;
  };

  part(root, 'start').addEventListener('click', start);
  part(root, 'new').addEventListener('click', start);
}
