import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const TIP_WIDTH = 202;
const GAP = 12;

const TOUR = [
  { target: 'app-new', text: 'Start here. Every report begins as a draft you can throw away.' },
  { target: 'app-filter', text: 'Narrow the list down to the accounts you actually watch.' },
  { target: 'app-row', text: 'Open a report to see who changed what, and when.' },
] as const;

function listRow(name: string, when: string, index: number): string {
  return `
    <li class="sp-list-item"${index === 0 ? ' data-part="app-row"' : ''}>
      <span class="sp-grow">${name}</span>
      <span class="sp-text">${when}</span>
    </li>`;
}

/**
 * Onboarding tour specimen: three pointers laid over a screen the reader keeps
 * looking at. The subject is the tip card, since that is what the word names: the
 * spotlight is a way of aiming it, and the app underneath is the thing being
 * explained rather than the explanation.
 *
 * The spotlight is one element whose enormous shadow spread dims everything it is
 * not covering, so the cutout and the scrim cannot disagree. Both it and the card
 * are positioned against real element rects rather than fixed coordinates (the
 * pointer that drifts onto empty space is the classic tour bug) and both are out
 * of flow, so advancing a step moves nothing in the scene (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" data-part="frame" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reports</span>
          <button class="sp-icon-button" data-part="app-filter" type="button" aria-label="Filter">${icon('filter')}</button>
          <button class="sp-button sp-button--sm" data-part="app-new" type="button">New report</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <ul class="sp-list sp-surface">
            ${listRow('Q3 revenue', '9:04', 0)}
            ${listRow('Churn by plan', 'Yesterday', 1)}
            ${listRow('Trial funnel', 'Monday', 2)}
          </ul>
        </div>

        <div data-part="spot" style="position: absolute; z-index: 1; border-radius: 8px; outline: 2px solid var(--sp-accent); box-shadow: 0 0 0 999px var(--sp-scrim)"></div>
        <div class="sp-surface" data-part="tip" data-subject data-step="1" role="dialog" aria-label="Product tour"
             style="position: absolute; z-index: 2; width: ${TIP_WIDTH}px; padding: 12px; box-shadow: var(--sp-shadow)">
          <div class="sp-label" data-part="tip-count">Step 1 of ${TOUR.length}</div>
          <p class="sp-text sp-text--ink" data-part="tip-text" style="margin: 6px 0 10px; min-height: 39px">${TOUR[0]?.text ?? ''}</p>
          <div class="sp-row sp-row--between">
            <button class="sp-button sp-button--quiet sp-button--sm" data-part="tip-skip" type="button">Skip</button>
            <button class="sp-button sp-button--sm" data-part="tip-next" type="button">Next</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const frame = part(root, 'frame');
  const spot = part(root, 'spot');
  const tip = part(root, 'tip');
  const tipText = part(root, 'tip-text');
  const tipCount = part(root, 'tip-count');
  const next = part(root, 'tip-next');

  const show = (index: number) => {
    const step = TOUR[index];
    if (!step) return;
    const frameRect = frame.getBoundingClientRect();
    const rect = part(root, step.target).getBoundingClientRect();
    const inset = 4;
    spot.style.left = `${rect.left - frameRect.left - inset}px`;
    spot.style.top = `${rect.top - frameRect.top - inset}px`;
    spot.style.width = `${rect.width + inset * 2}px`;
    spot.style.height = `${rect.height + inset * 2}px`;

    const centred = rect.left - frameRect.left + rect.width / 2 - TIP_WIDTH / 2;
    tip.style.left = `${Math.min(Math.max(centred, GAP), frameRect.width - TIP_WIDTH - GAP)}px`;
    tip.style.top = `${rect.bottom - frameRect.top + GAP}px`;

    tip.dataset.step = String(index + 1);
    tipCount.textContent = `Step ${index + 1} of ${TOUR.length}`;
    tipText.textContent = step.text;
    const last = index === TOUR.length - 1;
    flag(next, 'data-last', last);
    next.textContent = last ? 'Done' : 'Next';
  };

  const end = () => {
    spot.hidden = true;
    tip.hidden = true;
  };

  let index = 0;
  next.addEventListener('click', () => {
    if (index + 1 >= TOUR.length) return end();
    index += 1;
    show(index);
  });
  // Skip means skip: the way out is on every step, and it ends the tour outright.
  part(root, 'tip-skip').addEventListener('click', end);

  show(0);
}
