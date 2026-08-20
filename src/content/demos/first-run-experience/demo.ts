import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Run = 'first' | 'later';

const NOTE: Record<Run, string> = {
  first: 'Shown once: the welcome line, the two sample boards, the coach mark. None of it is ever shown to this person again.',
  later: 'The second open, and every open after. The same screen, the same controls, none of the scaffolding.',
};

const row = (name: string, trailing: string, chip: boolean) => `
  <div class="sp-surface sp-row" style="gap: 8px; height: 34px; padding: 0 10px; background: var(--sp-surface)">
    ${icon('inbox')}
    <span class="sp-grow" style="font-size: 12px">${name}</span>
    ${
      chip
        ? `<span class="sp-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">${trailing}</span>`
        : `<span class="sp-label" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${trailing}</span>`
    }
  </div>`;

/**
 * First run experience specimen: one app screen, drawn on the first open and on every
 * open after it. The pick is the point of the term: the welcome line, the seeded sample
 * boards and the coach mark exist in exactly one of the two states, and the term is the
 * fact that they never come back.
 *
 * The subject is the first-run scaffolding taken as one element, since the term names the
 * whole bundle (welcome, sample content, coach mark) rather than any one of its parts, and
 * that bundle has an element of its own here. The app frame, its topbar, the reader's own
 * boards and the note line are scenery (SPEC §5). No `data-pose` is needed: in the later
 * state the scaffolding is gone rather than repaired, so identify summons it back to the
 * mount state instead of ringing a counter-example (SPEC §6).
 *
 * Both layers are absolutely placed in one screen box of fixed height, with headers of the
 * same height, so switching runs replaces content without resizing or shifting anything
 * (SPEC §5). Each segment reaches its own named state rather than flipping the one it
 * finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kelp</span>
          <sp-segmented class="sp-segmented" data-part="run" data-value="first" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="run-first" type="button" value="first" style="padding: 4px 9px; font-size: 12px">First open</button>
            <button class="sp-segment" data-part="run-later" type="button" value="later" style="padding: 4px 9px; font-size: 12px">Every open after</button>
          </sp-segmented>
          <button class="sp-button sp-button--sm" data-part="new-board" type="button" style="flex: 0 0 auto">New board</button>
        </div>
        <div class="sp-body" style="position: relative">
          <div data-part="screen" style="position: relative; height: 100%">

            <div
              data-part="scaffold"
              data-subject
              data-run="first"
              style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px"
            >
              <div style="height: 44px; width: 250px">
                <div class="sp-heading" style="font-size: 13px">Welcome to Kelp</div>
                <div class="sp-text" style="margin-top: 2px; font-size: 11px">Two boards are here so nothing looks empty.</div>
              </div>
              ${row('Trip planning', 'Sample', true)}
              ${row('Reading list', 'Sample', true)}
              <div
                class="sp-popover"
                data-part="coach"
                data-open
                style="top: 2px; right: 0; left: auto; width: 180px; padding: 9px 11px; --sp-arrow-x: 148px"
              >
                <span class="sp-text sp-text--ink" style="font-size: 11px">Start your own from up here.</span>
              </div>
            </div>

            <div data-part="own" hidden style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px">
              <div style="height: 44px; width: 250px">
                <div class="sp-heading" style="font-size: 13px">Your boards</div>
                <div class="sp-text" style="margin-top: 2px; font-size: 11px">Three boards, all of them yours.</div>
              </div>
              ${row('Kitchen rebuild', '2 days ago', false)}
              ${row('Cycling routes', 'Last week', false)}
              ${row('Wedding music', 'Last week', false)}
            </div>

          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${NOTE.first}</span>
    </div>
  `;

  const scaffold = part(root, 'scaffold');
  const own = part(root, 'own');
  const note = part(root, 'note');

  part(root, 'run').addEventListener('change', (event) => {
    const next: Run = (event as CustomEvent<string>).detail === 'later' ? 'later' : 'first';
    scaffold.dataset.run = next;
    flag(scaffold, 'hidden', next !== 'first');
    flag(own, 'hidden', next !== 'later');
    note.textContent = NOTE[next];
  });
}
