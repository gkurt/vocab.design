import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

interface Row {
  rank: string;
  name: string;
  score: string;
}

interface Scope {
  top: Row[];
  gap: string;
  you: Row;
  note: string;
}

const SCOPES: Record<string, Scope> = {
  'all-time': {
    top: [
      { rank: '1', name: 'Ravi Sundaram', score: '214,800' },
      { rank: '2', name: 'Mika Lindqvist', score: '198,240' },
      { rank: '3', name: 'Tomas Beck', score: '187,110' },
      { rank: '4', name: 'Priya Anand', score: '176,900' },
    ],
    gap: '2,313 riders between',
    you: { rank: '2,318', name: 'You', score: '4,210' },
    note: 'Two thousand three hundred names sit between the top four and this reader. The pinned row is the only reason the board says anything to them at all.',
  },
  week: {
    top: [
      { rank: '1', name: 'Priya Anand', score: '9,140' },
      { rank: '2', name: 'Ravi Sundaram', score: '8,720' },
      { rank: '3', name: 'Dee Okafor', score: '8,050' },
      { rank: '4', name: 'Mika Lindqvist', score: '7,880' },
    ],
    gap: '52 riders between',
    you: { rank: '57', name: 'You', score: '910' },
    note: 'A shorter window resets everyone who started earlier, and it moves the reader with it: fifty-two places from the cut rather than two thousand.',
  },
  friends: {
    top: [
      { rank: '1', name: 'Dee Okafor', score: '6,420' },
      { rank: '2', name: 'Sam Whitlock', score: '5,905' },
      { rank: '3', name: 'Nadia Sun', score: '5,120' },
      { rank: '4', name: 'Ellis Ward', score: '4,640' },
    ],
    gap: 'next place is 430 points away',
    you: { rank: '5', name: 'You', score: '4,210' },
    note: 'Scoped to people the reader knows, the pinned row sits one place under the cut and the gap is a single evening of riding.',
  },
};

const START = 'all-time';

/**
 * Leaderboard specimen: a ranked table whose top four change with the scope, and one row
 * that never leaves, the reader's own, pinned under a marker naming the distance it was
 * dragged across. The three scopes are the repair for the pattern's own failure mode: the
 * reader's rank falls from 2,318 to 57 to 5 without their score changing at all.
 *
 * The subject is the ranked list itself, the table, and not the card or the scope picker
 * around it. Every scope is honestly the term (the pinned row is present in all three), so
 * no `data-pose` is needed, and identify may ring the board at any point in the pass.
 *
 * The table keeps its shape across scopes: four top rows, one gap marker of fixed height,
 * one pinned row, with only the text inside them changing, so switching scope moves nothing
 * (SPEC §5). Each segment names an absolute scope rather than cycling (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = SCOPES[START] as Scope;

  const topRows = first.top
    .map(
      (row, i) => `<tr data-part="row-${i + 1}">
        <td style="width: 46px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${row.rank}</td>
        <td data-part="name-${i + 1}">${row.name}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums">${row.score}</td>
      </tr>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Cadence</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scope" data-part="scope" data-value="${START}">
            <button class="sp-segment" type="button" data-part="scope-all-time" value="all-time" style="padding: 5px 9px; font-size: 12px">All time</button>
            <button class="sp-segment" type="button" data-part="scope-week" value="week" style="padding: 5px 9px; font-size: 12px">This week</button>
            <button class="sp-segment" type="button" data-part="scope-friends" value="friends" style="padding: 5px 9px; font-size: 12px">Friends</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <table class="sp-table" data-part="board" data-subject data-scope="${START}" style="--sp-cell-pad: 4px 8px">
              <thead>
                <tr>
                  <th style="width: 46px">Rank</th>
                  <th>Rider</th>
                  <th style="text-align: right">Points</th>
                </tr>
              </thead>
              <tbody>
                ${topRows}
                <tr data-part="gap">
                  <td colspan="3" style="height: 20px; padding: 0 8px; border-bottom: 0; font-size: 11px; color: var(--sp-muted)">
                    <span data-part="gap-text">${first.gap}</span>
                  </td>
                </tr>
                <tr data-part="you" data-selected style="box-shadow: inset 0 2px 0 0 var(--sp-accent)">
                  <td data-part="you-rank" style="width: 46px; font-weight: 600; font-variant-numeric: tabular-nums">${first.you.rank}</td>
                  <td style="font-weight: 600">${first.you.name}</td>
                  <td data-part="you-score" style="text-align: right; font-weight: 600; font-variant-numeric: tabular-nums">${first.you.score}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${first.note}</span>
    </div>
  `;

  const board = part(root, 'board');
  const gapText = part(root, 'gap-text');
  const youRank = part(root, 'you-rank');
  const note = part(root, 'note');

  const show = (name: string) => {
    const scope = SCOPES[name];
    if (!scope) return;
    board.dataset.scope = name;
    for (const [i, row] of scope.top.entries()) {
      const tr = part(root, `row-${i + 1}`);
      const cells = tr.children;
      if (cells[0]) cells[0].textContent = row.rank;
      if (cells[1]) cells[1].textContent = row.name;
      if (cells[2]) cells[2].textContent = row.score;
    }
    gapText.textContent = scope.gap;
    youRank.textContent = scope.you.rank;
    part(root, 'you-score').textContent = scope.you.score;
    note.textContent = scope.note;
  };

  part(root, 'scope').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
