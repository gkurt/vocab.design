import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const LOAD_MS = 1500;

/**
 * Skeleton screen specimen: grey shapes standing in for content that is on its
 * way, laid out exactly where the real rows will land. The subject is grey by
 * definition, so the stage's identify control is what points it out.
 *
 * The frame is sized for the loaded rows, the taller of the two states it holds, so
 * the arrival of the real content cuts nothing off the bottom (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const bones = [0, 1, 2]
    .map(
      () => `
      <div class="sp-row" style="gap: 10px">
        <span class="sp-skeleton" style="width: 28px; height: 28px; border-radius: 50%"></span>
        <span class="sp-stack sp-grow" style="gap: 6px">
          <span class="sp-skeleton" style="width: 45%; height: 9px"></span>
          <span class="sp-skeleton" style="width: 78%; height: 9px"></span>
        </span>
      </div>`,
    )
    .join('');

  const rows = [
    { initials: 'AM', name: 'Ada M.', line: 'Pushed the new colour ramp' },
    { initials: 'JR', name: 'Jo R.', line: 'Renamed two tokens' },
    { initials: 'PK', name: 'Pia K.', line: 'Closed the spacing issue' },
  ]
    .map(
      (row) => `
      <li class="sp-list-item">
        <span class="sp-avatar">${row.initials}</span>
        <span class="sp-grow"><span class="sp-text sp-text--ink">${row.name}</span><br /><span class="sp-text">${row.line}</span></span>
      </li>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="reload">Reload</button>
        </div>
        <div class="sp-body">
          <div class="sp-stack" data-part="skeleton" data-subject aria-hidden="true" style="gap: 14px">${bones}</div>
          <ul class="sp-list sp-context" data-part="content" hidden>${rows}</ul>
        </div>
      </div>
    </div>
  `;

  const skeleton = part(root, 'skeleton');
  const content = part(root, 'content');
  let timer: number | undefined;

  part(root, 'reload').addEventListener('click', () => {
    clock.clearTimeout(timer);
    skeleton.hidden = false;
    content.hidden = true;
    timer = clock.setTimeout(() => {
      skeleton.hidden = true;
      content.hidden = false;
    }, LOAD_MS);
  });
}
