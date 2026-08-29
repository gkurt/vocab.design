import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'labels' | 'numbers';
type Utterance = { key: string; phrase: string; hit: string | null; ok: boolean; result: string };

/** The three controls on the screen, in the order the overlay would number them. */
const CONTROLS = ['send', 'draft', 'star'];

/**
 * Spoken by name. The second control's accessible name does not contain its visible label,
 * and the third has no visible label at all, so two of the three cannot be addressed.
 */
const BY_LABEL: Utterance[] = [
  { key: 'send', phrase: '“Click Send”', hit: 'send', ok: true, result: 'Send activated' },
  { key: 'draft', phrase: '“Click Save draft”', hit: null, ok: false, result: 'No match. Its name is “Store changes”.' },
  { key: 'star', phrase: '“Click Favourite”', hit: null, ok: false, result: 'No match. The icon carries no visible words.' },
];

/** Spoken by overlay number, which every control has whether it has words or not. */
const BY_NUMBER: Utterance[] = [
  { key: 'three', phrase: '“Click 3”', hit: 'star', ok: true, result: 'Item 3 activated' },
  { key: 'two', phrase: '“Click 2”', hit: 'draft', ok: true, result: 'Item 2 activated' },
];

const SCRIPT: Record<Mode, Utterance[]> = { labels: BY_LABEL, numbers: BY_NUMBER };

const CAPTION: Record<Mode, string> = {
  labels:
    'Speech addresses a control by the words on it, so the accessible name has to contain the visible label. One here does not, and one has no words.',
  numbers:
    'Show numbers is the fallback: every control gets an address it never had. It works, and it charges the reader a lookup before every command.',
};

/**
 * Voice control specimen: a compose screen being operated by speech. The Speak next button
 * issues the next phrase from a fixed script, and the screen answers it or fails to, so the
 * reader watches the only thing that decides which: whether the words being spoken are words
 * the control actually carries. The Numbers mode overlays an address on all three.
 *
 * The subject is the screen being commanded, the narrowest element the term names: voice
 * control is this surface being driven by name rather than by pointer, and a ring around one
 * button would name that button rather than the way it was reached. The segmented control,
 * the Speak next button, the spoken line, the result line and the caption are scenery
 * (SPEC §5). The screen is honest in both of its resting states, addressed by label and
 * addressed by number, so no `data-pose` is needed (SPEC §6).
 *
 * The activated control carries the kit's own `data-selected`, which is a state a demo may
 * set for a control with no pointer on it (SPEC §7); nothing here calls `.focus()` and no
 * timer is needed. The number badges are absolutely positioned, so showing them moves
 * nothing (SPEC §5). Each segment reaches its own mode and the script clamps at its last
 * phrase rather than wrapping, so a pass joined halfway proves the same thing (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const control = (key: string, index: number, inner: string, extra = '') => `
    <span style="position: relative; display: inline-flex; flex: 0 0 auto">
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="ctl-${key}" ${extra}
              style="cursor: default">${inner}</button>
      <span data-part="num-${key}" hidden
            style="position: absolute; top: -7px; left: -7px; min-width: 16px; height: 16px; padding: 0 4px;
                   display: flex; align-items: center; justify-content: center; border-radius: 999px;
                   background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600;
                   line-height: 1">${index + 1}</span>
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Addressed by" data-part="segmented" data-value="labels">
            <button class="sp-segment" data-part="seg-labels" value="labels">Labels</button>
            <button class="sp-segment" data-part="seg-numbers" value="numbers">Numbers</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="screen" data-subject data-mode="labels"
             style="margin-top: 9px; padding: 10px 12px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 18px">
            <span class="sp-heading" style="flex: 0 0 auto; font-size: 12.5px">New message</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Draft</span>
          </div>
          <div class="sp-stack" style="margin-top: 8px; gap: 6px">
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 52%"></div>
          </div>
          <div class="sp-row" style="margin-top: 12px; gap: 10px">
            ${control('send', 0, 'Send')}
            ${control('draft', 1, 'Save draft', 'aria-label="Store changes"')}
            ${control('star', 2, icon('star'), 'aria-label="Favourite"')}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="speak">Speak next</button>
          <span class="sp-text sp-text--ink" data-stage-announce data-part="said" data-utter="send"
                style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">${BY_LABEL[0]?.phrase}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The screen answers</span>
          <span class="sp-text sp-text--ink" data-part="result" data-ok="yes"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${BY_LABEL[0]?.result}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="labels"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.labels}</p>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const said = part(root, 'said');
  const result = part(root, 'result');
  const caption = part(root, 'caption');

  let mode: Mode = 'labels';
  let at = 0;

  const paint = () => {
    const line = SCRIPT[mode][at] ?? SCRIPT[mode][0];
    if (!line) return;

    for (const key of CONTROLS) flag(part(root, `ctl-${key}`), 'data-selected', key === line.hit);

    said.dataset.utter = line.key;
    said.textContent = line.phrase;
    result.dataset.ok = line.ok ? 'yes' : 'no';
    result.textContent = line.result;
  };

  const apply = (next: Mode) => {
    mode = next;
    at = 0;
    screen.dataset.mode = next;
    for (const key of CONTROLS) flag(part(root, `num-${key}`), 'hidden', next !== 'numbers');
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    paint();
  };

  apply('labels');

  // The script clamps at its last phrase, so a pass joined halfway says the same thing.
  part(root, 'speak').addEventListener('click', () => {
    at = Math.min(at + 1, SCRIPT[mode].length - 1);
    paint();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
