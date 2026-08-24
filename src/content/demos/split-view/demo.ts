import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const ITEMS = [
  { name: 'Harbour survey', meta: 'Edited 2 days ago', lines: [96, 88, 74] },
  { name: 'Tide tables', meta: 'Edited yesterday', lines: [92, 70, 84] },
  { name: 'Ferry timings', meta: 'Edited in March', lines: [88, 94, 66] },
  { name: 'Lighthouse log', meta: 'Edited in March', lines: [90, 76, 82] },
];

/** How far the leading pane may be dragged. A split view sizes panes, not a pane. */
const MIN = 140;
const MAX = 250;

/**
 * Split view specimen: a list that holds the selection and a detail pane that is
 * that selection expanded. The subject is the split container, since the term
 * names the relationship between the panes rather than either pane.
 *
 * The divider drags freely and clamps at both ends, so a pass that starts over
 * lands in the same place: dragging toward the detail reaches the maximum, and
 * dragging back over the list reaches the minimum (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = ITEMS.map(
    (item, index) => `
      <li class="sp-list-item" data-part="item-${index + 1}" style="cursor: pointer">
        <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${item.name}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 460px; height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field library</span><span class="sp-label">4 documents</span></div>
        <div class="sp-row" data-part="split" data-subject data-state="free" style="flex: 1 1 auto; gap: 0; min-height: 0; align-items: stretch">
          <ul class="sp-list sp-scroll" data-part="list" style="width: 150px; flex: 0 0 auto; padding: 6px">${rows}</ul>
          <div
            data-part="divider"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize list"
            tabindex="0"
            style="width: 5px; flex: 0 0 auto; background: var(--sp-line); cursor: col-resize; touch-action: none"
          ></div>
          <section class="sp-grow" data-part="detail" style="padding: 12px 14px; background: var(--sp-sunken)">
            <div class="sp-heading" data-part="detail-title"></div>
            <div class="sp-label" data-part="detail-meta" style="margin-top: 4px"></div>
            <div class="sp-stack" data-part="detail-body" style="margin-top: 12px"></div>
          </section>
        </div>
      </div>
    </div>
  `;

  const split = part(root, 'split');
  const list = part(root, 'list');
  const title = part(root, 'detail-title');
  const meta = part(root, 'detail-meta');
  const body = part(root, 'detail-body');
  const rowEls = ITEMS.map((_, index) => part(root, `item-${index + 1}`));

  const size = (px: number) => {
    const width = Math.min(Math.max(px, MIN), MAX);
    list.style.width = `${width}px`;
    split.dataset.state = width <= MIN + 0.5 ? 'min' : width >= MAX - 0.5 ? 'max' : 'free';
  };

  const select = (index: number) => {
    const item = ITEMS[index];
    if (!item) return;
    rowEls.forEach((row, i) => {
      flag(row, 'data-selected', i === index);
    });
    title.textContent = item.name;
    meta.textContent = item.meta;
    body.innerHTML = item.lines.map((width) => `<div class="sp-line" style="width: ${width}%"></div>`).join('');
  };

  rowEls.forEach((row, index) => {
    row.addEventListener('click', () => select(index));
  });
  select(0);

  const divider = part(root, 'divider');
  let dragging = false;
  divider.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) divider.setPointerCapture(event.pointerId);
    dragging = true;
  });
  root.addEventListener('pointermove', (event) => {
    if (dragging) size(localPoint(event, split).x);
  });
  const release = () => {
    dragging = false;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  // A divider that only answers a pointer is a pane only a mouse can resize.
  divider.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    size(list.getBoundingClientRect().width + (event.key === 'ArrowRight' ? 20 : -20));
    event.preventDefault();
  });
}
