import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = { bordered: boolean; gaps: number[][]; between: number; note: string };

/**
 * Six identical items, three arrangements. `gaps` is the space before each item inside
 * its own group (the first of a group has none), `between` the space between the groups.
 * The conflict row is mirrored so the six read as three pairs, two of which straddle the
 * seam the boundary draws.
 */
const MODES: Record<string, Mode> = {
  region: {
    bordered: true,
    gaps: [
      [0, 10, 10],
      [0, 10, 10],
    ],
    between: 16,
    note: 'Even gaps throughout. The boundary alone says three and three.',
  },
  spacing: {
    bordered: false,
    gaps: [
      [0, 10, 10],
      [0, 10, 10],
    ],
    between: 40,
    note: 'No boundary. Only the gap between them says where one group ends.',
  },
  conflict: {
    bordered: true,
    gaps: [
      [0, 6, 30],
      [0, 30, 6],
    ],
    between: 0,
    note: 'Now the gaps pair them off across the seam. The boundary still wins.',
  },
};

const ITEM_W = 56;

const item = () => `
  <div style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: ${ITEM_W}px; padding: 8px 7px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
    <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent-soft)"></span>
    <span class="sp-line" style="width: 100%; height: 5px"></span>
    <span class="sp-line" style="width: 62%; height: 5px"></span>
  </div>`;

/** All six items are identical on purpose: colour would be a second grouping device. */
const group = (name: string, extra: string) => `
  <div
    data-part="${name}"
    ${extra}
    data-grouped
    style="display: flex; flex: 0 0 auto; padding: 5px; border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
  >${[0, 1, 2].map(() => `<div data-part="${name}-item">${item()}</div>`).join('')}</div>`;

/**
 * Common region specimen: the same six items grouped by a drawn boundary, by spacing
 * alone, and then with the two devices arguing, where the boundary still wins.
 *
 * The subject is one enclosed group, the narrowest element the term actually names: the
 * segmented picker and the caption are scenery (SPEC §5), and the page the groups sit on
 * stays out of the context register because the subject is inside it and a subject must
 * not be dimmed by its own scenery. The spacing-only state is the counter-example the term
 * needs in order to be legible, and in it the subject is no longer a region at all, so it
 * declares `data-grouped` as its pose condition: identify refuses to ring an ungrouped
 * group and plays on (SPEC §6). Mount is the bordered state, which satisfies it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Grouped by" data-term="region" data-value="region" style="margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-region" value="region">boundary</button>
            <button class="sp-segment" type="button" data-part="seg-spacing" value="spacing">spacing</button>
            <button class="sp-segment" type="button" data-part="seg-conflict" value="conflict">both</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 12px">
          <div data-part="page" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 446px; height: 148px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-row" style="gap: 0">
              ${group('group-a', 'data-subject data-pose="[data-grouped]"')}
              ${group('group-b', '')}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const groups = [part(root, 'group-a'), part(root, 'group-b')];
  const items = [partsOf(root, 'group-a-item'), partsOf(root, 'group-b-item')];
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const mode = MODES[key];
    if (!mode) return;
    for (const [index, box] of groups.entries()) {
      flag(box, 'data-grouped', mode.bordered);
      box.style.borderColor = mode.bordered ? 'var(--sp-line)' : 'transparent';
      box.style.background = mode.bordered ? 'var(--sp-sunken)' : 'transparent';
      box.style.marginLeft = index === 0 ? '0' : `${mode.between}px`;
      for (const [i, cell] of items[index]?.entries() ?? []) cell.style.marginLeft = `${mode.gaps[index]?.[i] ?? 0}px`;
    }
    readout.textContent = mode.note;
  };

  // Each segment names a grouping device, so a step lands on that device rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('region');
}
