type Setting = { label: string; value: string };

const DELIVERY: Setting[] = [
  { label: 'Email', value: 'On' },
  { label: 'Push', value: 'On' },
];
const DIGEST: Setting[] = [
  { label: 'Weekly summary', value: 'Monday' },
  { label: 'Mentions only', value: 'Off' },
];

const rows = (items: Setting[]) =>
  items
    .map(
      ({ label, value }) =>
        `<div class="sp-row sp-row--between"><span class="sp-label">${label}</span><span class="sp-text">${value}</span></div>`,
    )
    .join('');

/**
 * Divider specimen: the same two groups of settings twice. On the left a rule
 * does the grouping; on the right only a gap does. The subject is the line, and
 * the panel beside it is the control condition, which is the honest way to show
 * a component whose whole job is to make a boundary legible.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notifications</span></div>
        <div class="sp-body">
          <div class="sp-row" style="align-items: flex-start; gap: 12px">
            <div class="sp-surface" data-part="panel-ruled" style="flex: 1 1 0; min-width: 0; padding: 10px">
              <div class="sp-stack sp-context" style="gap: 8px">${rows(DELIVERY)}</div>
              <!-- The stage reads a box one pixel tall as absent (isSeen/isRevealed), and a
                   subject it cannot see is one identify can never summon. So the rule keeps a
                   measurable box and paints its single-pixel line inside it. -->
              <div
                class="sp-divider"
                data-part="divider"
                data-subject
                role="separator"
                style="margin: 9px -10px; height: 3px; background: linear-gradient(var(--sp-line), var(--sp-line)) 50% / 100% 1px no-repeat"
              ></div>
              <div class="sp-stack sp-context" style="gap: 8px">${rows(DIGEST)}</div>
            </div>
            <div class="sp-surface sp-context" data-part="panel-plain" style="flex: 1 1 0; min-width: 0; padding: 10px">
              <div class="sp-stack" style="gap: 8px">${rows(DELIVERY)}</div>
              <div class="sp-stack" style="gap: 8px; margin-top: 21px">${rows(DIGEST)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
