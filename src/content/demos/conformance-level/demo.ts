import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Level = 'a' | 'aa' | 'aaa';

type Criterion = { key: string; number: string; title: string; level: Level; met: boolean };

/** Every number, title, and level here is checked against the WCAG 2.2 Recommendation. */
const CRITERIA: Criterion[] = [
  { key: 'nontext', number: '1.1.1', title: 'Non-text Content', level: 'a', met: true },
  { key: 'error', number: '3.3.1', title: 'Error Identification', level: 'a', met: true },
  { key: 'contrast', number: '1.4.3', title: 'Contrast (Minimum)', level: 'aa', met: true },
  { key: 'target', number: '2.5.8', title: 'Target Size (Minimum)', level: 'aa', met: false },
  { key: 'enhanced', number: '1.4.6', title: 'Contrast (Enhanced)', level: 'aaa', met: false },
];

const TAG: Record<Level, string> = { a: 'A', aa: 'AA', aaa: 'AAA' };

/** A claim at one level covers every level below it, which is what puts a row in scope. */
const COVERS: Record<Level, Level[]> = { a: ['a'], aa: ['a', 'aa'], aaa: ['a', 'aa', 'aaa'] };

const CAPTION: Record<Level, string> = {
  a: 'Level A is the floor. Only the A criteria are in scope; everything above them is optional.',
  aa: 'AA is what a policy usually means: the A criteria plus the AA ones. One is unmet, so the claim fails.',
  aaa: 'AAA gathers criteria that cannot be met by all content, which is why WCAG advises against it site-wide.',
};

/**
 * Conformance level specimen: five real WCAG 2.2 success criteria, each carrying the level
 * it actually sits in, under a segmented control that picks the level being claimed. Moving
 * the target changes nothing about any criterion, only which of them a claim has to satisfy,
 * and the tally underneath is counted from the rows rather than written by hand.
 *
 * The subject is the level tag on one criterion, the narrowest element the term names: the
 * tier that criterion belongs to. Ringing the list would name the criteria and ringing the
 * segmented control would name the claim, neither of which is the level. The tag says the
 * same true thing in every state this demo can rest in, so no `data-pose` is needed, and it
 * is never dimmed: scope is drawn as a bar at the start of the row and spelled out in the
 * verdict cell instead, which also keeps a greyed-out row from reading as disabled.
 *
 * Rows never move. Every cell has a reserved width and the tally holds one line, so picking
 * a target repaints and shifts nothing (SPEC §5). Each segment reaches its own target rather
 * than cycling (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const row = (c: Criterion) => `
    <div class="sp-row" data-part="row-${c.key}" data-scope="required" style="gap: 8px; height: 24px">
      <span data-part="mark-${c.key}" style="flex: 0 0 3px; height: 15px; border-radius: 2px; background: var(--sp-accent)"></span>
      <span class="sp-text" style="flex: 0 0 32px; font-size: 11px; font-variant-numeric: tabular-nums">${c.number}</span>
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; white-space: nowrap">${c.title}</span>
      <span class="sp-label" data-part="tag-${c.key}" ${c.key === 'contrast' ? 'data-subject' : ''} data-level="${c.level}"
            style="flex: 0 0 30px; text-align: center; font-size: 10px; font-weight: 600; padding: 2px 0; line-height: 1.2;
                   border: 1px solid var(--sp-line); border-radius: 5px; color: var(--sp-ink)">${TAG[c.level]}</span>
      <span class="sp-row" style="flex: 0 0 84px; gap: 4px; justify-content: flex-end; font-size: 10.5px; color: var(--sp-muted)">
        <span data-part="mark-icon-${c.key}" style="display: flex">${icon(c.met ? 'check' : 'alert')}</span>
        <span data-part="verdict-${c.key}" style="white-space: nowrap">${c.met ? 'met' : 'not met'}</span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The level being claimed</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="aa">
            <button class="sp-segment" data-part="seg-a" value="a">A</button>
            <button class="sp-segment" data-part="seg-aa" value="aa">AA</button>
            <button class="sp-segment" data-part="seg-aaa" value="aaa">AAA</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="list" data-target="aa" style="margin-top: 10px; padding: 7px 10px">
          ${CRITERIA.map(row).join('')}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Criteria this claim has to satisfy</span>
          <span class="sp-text sp-text--ink" data-part="count" data-score="3-of-4"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">meets 3 of 4</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-target="aa"
           style="margin: 7px 0 0; height: 32px; font-size: 11px">${CAPTION.aa}</p>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const count = part(root, 'count');
  const caption = part(root, 'caption');

  const apply = (target: Level) => {
    const covered = COVERS[target];
    let required = 0;
    let met = 0;

    for (const c of CRITERIA) {
      const inScope = covered.includes(c.level);
      if (inScope) {
        required += 1;
        if (c.met) met += 1;
      }
      part(root, `row-${c.key}`).dataset.scope = inScope ? 'required' : 'extra';
      part(root, `mark-${c.key}`).style.background = inScope ? 'var(--sp-accent)' : 'transparent';
      part(root, `mark-icon-${c.key}`).style.visibility = inScope ? 'visible' : 'hidden';
      part(root, `verdict-${c.key}`).textContent = inScope ? (c.met ? 'met' : 'not met') : 'not required';
    }

    list.dataset.target = target;
    count.dataset.score = `${met}-of-${required}`;
    count.textContent = `meets ${met} of ${required}`;
    caption.dataset.target = target;
    caption.textContent = CAPTION[target];
  };

  apply('aa');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Level);
  });
}
