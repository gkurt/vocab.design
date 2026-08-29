import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The arena the shell resizes inside: fixed, so only the shell itself changes size. */
const ARENA_W = 446;
const ARENA_H = 188;

const WIDTHS: Record<string, number> = { compact: 158, medium: 292, expanded: ARENA_W };

const NOTES: Record<string, string> = {
  compact: 'Compact, under 600dp: bottom tab bar over one column.',
  medium: 'Medium, 600 to 839dp: navigation rail beside one column.',
  expanded: 'Expanded, 840dp and up: sidebar plus a list detail pair.',
};

const ROW = 'display: flex; align-items: center; gap: 7px; padding: 6px 8px; border-radius: 6px; background: var(--sp-sunken)';

const listRows = (count: number, widths: number[]) =>
  Array.from(
    { length: count },
    (_, i) => `
    <div style="${ROW}">
      <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent-soft)"></span>
      <span class="sp-line" style="width: ${widths[i % widths.length]}%; height: 6px"></span>
    </div>`,
  ).join('');

/** The same three destinations, drawn as a rail, as a tab bar, or as a sidebar list. */
const DESTINATIONS: [IconName, string][] = [
  ['inbox', 'Inbox'],
  ['search', 'Find'],
  ['star', 'Saved'],
];

const rail = () => `
  <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 0 0 auto; width: 46px; padding: 10px 0; border-right: 1px solid var(--sp-line)">
    ${DESTINATIONS.map(
      ([name, label], i) => `
      <span style="display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 4px 6px; border-radius: 6px; ${i === 0 ? 'background: var(--sp-accent-soft)' : ''}">
        ${icon(name)}
        <span style="font-size: 8px; color: var(--sp-muted)">${label}</span>
      </span>`,
    ).join('')}
  </div>`;

const tabBar = () => `
  <div style="display: flex; align-items: center; justify-content: space-around; flex: 0 0 auto; padding: 5px 0; border-top: 1px solid var(--sp-line)">
    ${DESTINATIONS.map(
      ([name, label], i) => `
      <span style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: ${i === 0 ? 'var(--sp-accent)' : 'var(--sp-muted)'}">
        ${icon(name)}
        <span style="font-size: 8px">${label}</span>
      </span>`,
    ).join('')}
  </div>`;

const sidebar = () => `
  <div style="display: flex; flex-direction: column; gap: 3px; flex: 0 0 auto; width: 116px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
    <span class="sp-label" style="padding: 0 8px 4px">Mail</span>
    ${['Inbox', 'Find', 'Saved', 'Archive']
      .map((label, i) => `<span class="sp-nav-item" ${i === 0 ? 'data-current' : ''}>${label}</span>`)
      .join('')}
  </div>`;

const detail = () => `
  <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 8px; padding: 12px; border-left: 1px solid var(--sp-line)">
    <span class="sp-heading" style="font-size: 13px">Berth transfer</span>
    <div class="sp-line" style="width: 96%"></div>
    <div class="sp-line" style="width: 88%"></div>
    <div class="sp-line" style="width: 72%"></div>
    <div class="sp-line" style="width: 90%"></div>
    <div class="sp-line" style="width: 54%"></div>
  </div>`;

/**
 * Adaptive layout specimen: one app shown at three window size classes, where each class
 * gets a different arrangement rather than the same arrangement stretched.
 *
 * The subject is the shell that swaps arrangements, not the whole scene: the segmented
 * picker and the caption below are the instrumentation that makes the swap watchable
 * (SPEC §5), so they sit in the context register outside the subject. The shell resizes
 * inside a fixed arena, since the size change is the term and has to be contained rather
 * than allowed to push the caption around (SPEC §5). Nothing transitions: snapping between
 * designs is exactly what separates this from a fluid reflow.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Window size class</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="compact" data-axis="Window">
            <button class="sp-segment" type="button" data-part="seg-compact" value="compact">compact</button>
            <button class="sp-segment" type="button" data-part="seg-medium" value="medium">medium</button>
            <button class="sp-segment" type="button" data-part="seg-expanded" value="expanded">expanded</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="arena" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${ARENA_W}px; height: ${ARENA_H}px">
            <div
              data-part="shell"
              data-subject
              style="display: flex; flex-direction: column; width: ${WIDTHS.compact}px; height: 100%; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div data-part="arr-compact" style="display: flex; flex-direction: column; height: 100%">
                <div class="sp-row" style="flex: 0 0 auto; gap: 6px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-heading" style="font-size: 12px">Inbox</span>
                </div>
                <div class="sp-stack" style="flex: 1 1 auto; gap: 6px; padding: 8px">${listRows(3, [78, 60, 88])}</div>
                ${tabBar()}
              </div>
              <div data-part="arr-medium" hidden style="display: flex; height: 100%">
                ${rail()}
                <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 6px; padding: 8px">
                  <span class="sp-heading" style="font-size: 12px; padding: 0 2px">Inbox</span>
                  ${listRows(4, [82, 64, 90, 70])}
                </div>
              </div>
              <div data-part="arr-expanded" hidden style="display: flex; height: 100%">
                ${sidebar()}
                <div class="sp-stack" style="flex: 0 0 auto; width: 148px; gap: 6px; padding: 8px">
                  <span class="sp-heading" style="font-size: 12px; padding: 0 2px">Inbox</span>
                  ${listRows(4, [82, 64, 90, 70])}
                </div>
                ${detail()}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const shell = part(root, 'shell');
  const readout = part(root, 'readout');
  const arrangements: [string, HTMLElement][] = [
    ['compact', part(root, 'arr-compact')],
    ['medium', part(root, 'arr-medium')],
    ['expanded', part(root, 'arr-expanded')],
  ];

  const apply = (key: string) => {
    const note = NOTES[key];
    const width = WIDTHS[key];
    if (!note || !width) return;
    for (const [name, el] of arrangements) flag(el, 'hidden', name !== key);
    shell.style.width = `${width}px`;
    readout.textContent = note;
  };

  // Each segment names a size class, so a scripted step lands on that class rather than
  // stepping to whichever one comes next (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('compact');
}
