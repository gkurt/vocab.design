import { part } from '#src/kit/parts.ts';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px';
const ROW_H = 17;
const GUTTER_W = 172;

type Commit = { key: string; initials: string; author: string; when: string; date: string; hash: string; message: string; heat: number };

/**
 * Age as a sequential scale is the term's own encoding, so the ramp is stated here. It is
 * mixed from the kit accent rather than from a hue of its own, so one strip carries the
 * whole scale in either theme: a strong band is a line touched days ago, a faint one is a
 * line nobody has needed to change in years.
 */
const COMMITS: Commit[] = [
  {
    key: 'gk',
    initials: 'GO',
    author: 'Gina Okafor',
    when: '2 d',
    date: '24 Aug 2026',
    hash: '9f2c1a',
    message: 'Warn above the payment cap',
    heat: 88,
  },
  {
    key: 'mm',
    initials: 'MM',
    author: 'Mika Marchetti',
    when: '3 wk',
    date: '5 Aug 2026',
    hash: '4b81e0',
    message: 'Guard an empty cart',
    heat: 58,
  },
  {
    key: 'ab',
    initials: 'AB',
    author: 'Adaeze Balogun',
    when: '8 mo',
    date: '18 Dec 2025',
    hash: '71c0d5',
    message: 'Extract price() from checkout',
    heat: 32,
  },
  {
    key: 'rl',
    initials: 'RL',
    author: 'Rui Lima',
    when: '2 y',
    date: '3 Sep 2024',
    hash: '0ac93f',
    message: 'Initial checkout flow',
    heat: 14,
  },
];

const LINES: { code: string; commit: string }[] = [
  { code: 'function checkout(cart) {', commit: 'rl' },
  { code: '  const items = cart.items', commit: 'ab' },
  { code: '  if (!items.length) return 0', commit: 'mm' },
  { code: '  const total = price(items)', commit: 'mm' },
  { code: '  if (total > CAP) warn(total)', commit: 'gk' },
  { code: '  log("checkout", total)', commit: 'gk' },
  { code: '  return submit(total)', commit: 'ab' },
  { code: '}', commit: 'rl' },
];

const byKey = (key: string) => COMMITS.find((commit) => commit.key === key) as Commit;

const strip = (heat: number) => `color-mix(in oklab, var(--sp-accent) ${heat}%, var(--sp-line))`;

function gutterCell(index: number, commit: Commit): string {
  return `
    <button
      type="button"
      data-part="cell-${index + 1}"
      style="display: flex; align-items: center; gap: 6px; width: 100%; height: ${ROW_H}px; padding: 0 6px 0 0; margin: 0; border: 0;
             background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer"
    >
      <span aria-hidden="true" style="flex: 0 0 auto; align-self: stretch; width: 6px; background: ${strip(commit.heat)}"></span>
      <span style="flex: 0 0 22px; font-size: 10px; font-weight: 600">${commit.initials}</span>
      <span class="sp-label" style="flex: 0 0 28px; font-size: 10px">${commit.when}</span>
      <span class="sp-label" style="flex: 1 1 auto; min-width: 0; ${MONO}; font-size: 9px; overflow: hidden">${commit.hash}</span>
    </button>`;
}

/**
 * Blame view specimen: eight lines of one file with the gutter that labels each of them
 * with the change that last touched it, three facts per line (who, roughly when, which
 * commit) in a strip narrow enough to leave the code readable. The rest of the commit is
 * one pointer away, in a panel whose height is reserved from mount.
 *
 * The subject is the gutter column, not the code beside it and not the window around it:
 * the file is ordinary, and the term is the labelling. Pointing at a line lights every
 * line of the same commit, which is the reading a blame view is really for, and it is a
 * gutter in every state the script visits, so no `data-pose` condition is needed.
 */
export function mount(root: HTMLElement): void {
  const cells = LINES.map((line, index) => gutterCell(index, byKey(line.commit))).join('');
  const code = LINES.map(
    (line, index) => `
      <div data-part="code-${index + 1}" style="display: flex; align-items: center; gap: 6px; height: ${ROW_H}px; padding: 0 6px">
        <span class="sp-label" style="flex: 0 0 12px; ${MONO}; font-size: 9px; text-align: right">${index + 1}</span>
        <span style="flex: 1 1 auto; min-width: 0; ${MONO}; line-height: ${ROW_H}px; white-space: pre; overflow: hidden">${line.code}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">checkout.ts</span>
          <span class="sp-label" style="font-size: 11px">8 lines &middot; 4 commits</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; padding: 10px">
          <!-- The legend keeps the gutter's own colours, so it stays outside the context
               register: a swatch repainted neutral would stop being a legend. -->
          <div class="sp-row" style="gap: 6px; width: 452px">
            <span class="sp-label" style="flex: 1 1 auto; font-size: 10px">colour is age</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">2 d</span>
            <span aria-hidden="true" style="flex: 0 0 auto; width: 54px; height: 7px; border-radius: 4px; background: linear-gradient(to right, ${strip(88)}, ${strip(14)})"></span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">2 y</span>
          </div>

          <div class="sp-surface" style="display: flex; width: 452px; overflow: hidden">
            <div data-part="gutter" data-subject style="flex: 0 0 ${GUTTER_W}px; border-right: 1px solid var(--sp-line)">
              <div class="sp-row" style="gap: 6px; height: 18px; padding: 0 6px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label" style="font-size: 9px">who</span>
                <span class="sp-label" style="font-size: 9px">when</span>
                <span class="sp-label" style="font-size: 9px">which change</span>
              </div>
              ${cells}
            </div>
            <div style="flex: 1 1 auto; min-width: 0">
              <div class="sp-row" style="height: 18px; padding: 0 6px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label" style="font-size: 9px">the file itself</span>
              </div>
              ${code}
            </div>
          </div>

          <div class="sp-surface" data-part="detail" data-commit="gk" style="width: 452px; height: 50px; padding: 6px 10px">
            <div class="sp-row" style="gap: 8px">
              <span class="sp-text sp-text--ink sp-grow" data-part="detail-message" style="font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Warn above the payment cap</span>
              <span class="sp-label" data-part="detail-hash" style="flex: 0 0 auto; ${MONO}; font-size: 10px">9f2c1a</span>
            </div>
            <div class="sp-row" style="gap: 14px; margin-top: 4px">
              <span class="sp-label" data-part="detail-author" style="font-size: 10px; color: var(--sp-ink)">Gina Okafor</span>
              <span class="sp-label" data-part="detail-date" style="font-size: 10px">24 Aug 2026</span>
              <span class="sp-label" data-part="detail-lines" style="font-size: 10px">2 lines here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const detail = part(root, 'detail');
  const message = part(root, 'detail-message');
  const hash = part(root, 'detail-hash');
  const author = part(root, 'detail-author');
  const date = part(root, 'detail-date');
  const lines = part(root, 'detail-lines');

  const select = (commit: Commit) => {
    detail.dataset.commit = commit.key;
    message.textContent = commit.message;
    hash.textContent = commit.hash;
    author.textContent = commit.author;
    date.textContent = commit.date;
    const owned = LINES.filter((line) => line.commit === commit.key).length;
    lines.textContent = `${owned} lines here`;
    LINES.forEach((line, index) => {
      const on = line.commit === commit.key;
      const cell = part(root, `cell-${index + 1}`);
      const row = part(root, `code-${index + 1}`);
      if (on) cell.setAttribute('data-active', '');
      else cell.removeAttribute('data-active');
      // Neutral, so the highlight of one commit never reads as a point on the age scale.
      cell.style.background = on ? 'var(--sp-sunken)' : 'transparent';
      row.style.background = on ? 'var(--sp-sunken)' : 'transparent';
    });
  };

  LINES.forEach((line, index) => {
    const cell = part(root, `cell-${index + 1}`);
    const commit = byKey(line.commit);
    // Reading a blame gutter is pointing at a line, so the hover carries the detail; the
    // click is the same answer for a finger, which has no hover.
    cell.addEventListener('pointerenter', () => select(commit));
    cell.addEventListener('click', () => select(commit));
  });

  // The newest commit is read out from mount, so the panel is never empty and never
  // changes size when another commit takes its place (SPEC §5).
  select(byKey('gk'));
}
