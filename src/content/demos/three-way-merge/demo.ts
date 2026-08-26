import { part } from '#src/kit/parts.ts';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px';
const LINE_H = 15;

/**
 * Mine and theirs are the term's own encoding (which side a line came from is the whole
 * question), so the two washes are painted here rather than borrowed from the kit, which
 * has one accent on purpose. The ancestor is deliberately unpainted: it is the version
 * nobody is proposing.
 */
const MINE = 'rgb(53 120 226 / 0.16)';
const THEIRS = 'rgb(170 96 214 / 0.16)';

const OPEN = 'function price(n) {';
const TAIL = '  return n * rate';
const CLOSE = '}';
const BASE_LINE = '  rate = 0.2';
const MINE_LINE = '  rate = RATE.std';
const THEIRS_LINE = '  rate = 0.22';

type Choice = 'unresolved' | 'mine' | 'theirs' | 'both';

const RESULT: Record<Choice, { lines: string[]; state: string; warn: boolean }> = {
  unresolved: {
    lines: ['<<<<<<< Mine', MINE_LINE, '=======', THEIRS_LINE, '>>>>>>> Theirs'],
    state: '1 conflict unresolved',
    warn: false,
  },
  mine: { lines: [OPEN, MINE_LINE, TAIL, CLOSE], state: 'Mine kept', warn: false },
  theirs: { lines: [OPEN, THEIRS_LINE, TAIL, CLOSE], state: 'Theirs kept', warn: false },
  both: {
    lines: [OPEN, MINE_LINE, THEIRS_LINE, TAIL, CLOSE],
    state: 'Both kept: rate set twice',
    warn: true,
  },
};

function codeLine(text: string, tint = 'transparent'): string {
  return `<div style="height: ${LINE_H}px; padding: 0 5px; background: ${tint}; ${MONO}; line-height: ${LINE_H}px; white-space: pre; overflow: hidden">${text}</div>`;
}

function pane(key: string, title: string, note: string, conflict: string, tint: string): string {
  return `
    <div class="sp-surface" data-part="pane-${key}" style="flex: 1 1 0; min-width: 0; overflow: hidden">
      <div class="sp-row" style="gap: 5px; height: 18px; padding: 0 5px; border-bottom: 1px solid var(--sp-line)">
        <span class="sp-label sp-grow" style="font-size: 10px; color: var(--sp-ink); white-space: nowrap; overflow: hidden">${title}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 9px">${note}</span>
      </div>
      ${codeLine(OPEN)}
      ${codeLine(conflict, tint)}
      ${codeLine(TAIL)}
    </div>`;
}

function accept(key: string, label: string): string {
  return `<button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="accept-${key}" style="flex: 0 0 auto; padding: 3px 8px; font-size: 11px; white-space: nowrap">${label}</button>`;
}

/**
 * Three-way merge specimen: one conflicted line in four regions, the three versions to
 * read (mine, theirs, and the ancestor they both came from) above the one version being
 * written. The ancestor is what makes the decision possible rather than a guess: it says
 * the line used to be a literal, so theirs is a value bump and mine is an extraction, and
 * keeping both assigns the same name twice.
 *
 * The subject is that four-region arrangement rather than the window around it, since the
 * term names the layout and not the editor holding it; the topbar and the caption stay
 * outside it (SPEC §5). Every state the script visits is still a merge view, so no
 * `data-pose` condition is needed.
 *
 * Each accept control is an absolute pick rather than a toggle (SPEC §8), and the result
 * pane holds room for its longest outcome from mount, so choosing moves nothing.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">price.ts</span>
          <span class="sp-label" style="font-size: 11px">merge feature into main</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 10px">
          <div data-part="merge" data-subject style="display: flex; flex-direction: column; gap: 7px; width: 452px">
            <div style="display: flex; align-items: stretch; gap: 6px">
              ${pane('mine', 'Mine', 'feature', MINE_LINE, MINE)}
              ${pane('base', 'Base', 'ancestor', BASE_LINE, 'transparent')}
              ${pane('theirs', 'Theirs', 'main', THEIRS_LINE, THEIRS)}
            </div>

            <div class="sp-row" style="gap: 6px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Accept</span>
              ${accept('mine', 'Mine')}
              ${accept('theirs', 'Theirs')}
              ${accept('both', 'Both')}
            </div>

            <div class="sp-surface" data-part="result" data-choice="unresolved" style="overflow: hidden">
              <div class="sp-row" style="gap: 6px; height: 18px; padding: 0 5px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label sp-grow" style="font-size: 10px; color: var(--sp-ink)">Result</span>
                <span class="sp-label" data-part="result-state" style="flex: 0 0 auto; width: 190px; font-size: 10px; text-align: right; white-space: nowrap; overflow: hidden">1 conflict unresolved</span>
              </div>
              <div data-part="result-body" style="height: ${LINE_H * 5}px"></div>
            </div>
          </div>

          <p class="sp-label" style="margin: 0; width: 452px; font-size: 11px">
            The ancestor is the only pane that says which side changed the line.
          </p>
        </div>
      </div>
    </div>
  `;

  const result = part(root, 'result');
  const body = part(root, 'result-body');
  const state = part(root, 'result-state');

  const render = (choice: Choice) => {
    const next = RESULT[choice];
    result.dataset.choice = choice;
    state.textContent = next.state;
    state.style.color = next.warn ? 'var(--sp-warn)' : 'var(--sp-muted)';
    if (next.warn) state.setAttribute('data-warn', '');
    else state.removeAttribute('data-warn');
    body.innerHTML = next.lines
      .map((line) => {
        const tint = line === MINE_LINE ? MINE : line === THEIRS_LINE ? THEIRS : 'transparent';
        const ink = line.startsWith('<') || line.startsWith('=') || line.startsWith('>') ? 'var(--sp-muted)' : 'var(--sp-ink)';
        return `<div style="height: ${LINE_H}px; padding: 0 5px; background: ${tint}; color: ${ink}; ${MONO}; line-height: ${LINE_H}px; white-space: pre; overflow: hidden">${line}</div>`;
      })
      .join('');
  };

  for (const choice of ['mine', 'theirs', 'both'] as const) {
    part(root, `accept-${choice}`).addEventListener('click', () => render(choice));
  }

  // Mount is the honest starting state of a merge: the conflict written into the file,
  // markers and all, with the room its longest resolution will need already reserved.
  render('unresolved');
}
