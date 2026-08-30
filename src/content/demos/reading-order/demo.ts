import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Card = { key: string; name: string; body: string };

/** Source order. Nothing below ever changes it; only the CSS `order` value moves. */
const CARDS: Card[] = [
  { key: 'summary', name: 'Summary', body: '4 shipments' },
  { key: 'chart', name: 'Chart', body: 'Last 30 days' },
  { key: 'alerts', name: 'Alerts', body: '2 delayed' },
  { key: 'notes', name: 'Notes', body: 'None' },
];

/** What each build writes into `order`. Flexbox sorts by it, then by source position. */
const ORDER: Record<Mode, Record<string, number>> = {
  matched: { summary: 0, chart: 0, alerts: 0, notes: 0 },
  reordered: { summary: 0, chart: 0, alerts: -1, notes: 0 },
};

const CAPTION = {
  matched: 'Every card is where the markup put it, so speech, Tab, and the eye all take the row in the same sequence.',
  reordered:
    'Alerts is pulled to the front with CSS order. It is first on screen and still third in the source, and nothing on screen says so.',
} as const;

type Mode = 'matched' | 'reordered';

/**
 * Reading order specimen: a row of four dashboard cards, and the sequence a screen reader
 * takes through them. One build leaves the row in source order; the other pulls Alerts to
 * the front with a CSS `order` value, which moves the box and not the node. The walker
 * reads the source, so it reaches Alerts third while the reader's eye met it first.
 *
 * The speech line prints what a screen reader would really utter for the card it is on,
 * name, body and position in the list, which is why the row and its cards carry list
 * roles. It used to print the author's reading of the state instead ("Summary" is spoken
 * first and shown first).
 *
 * Each card also carried a numbered badge and a "source 3" label. No dashboard prints where
 * its own tile sits in the markup, and the badge said nothing at all: it counted the cards
 * along the row, so it read 1 2 3 4 from the left in both builds. Both are gone. The walk is
 * what carries the sequence now: the ring steps through the cards in source order while the
 * speech line reads "Alerts, 2 delayed, 3 of 4" off a card sitting first on screen, and the
 * card's own `data-visual` still records where the CSS put it for the choreography to check.
 *
 * The subject is the card row, the narrowest element whose sequence the term names. The
 * state control, the walker, and the caption are scenery (SPEC §5). The contradicted build
 * is a state the subject itself passes through, so the honest condition is declared in
 * `data-pose` and the mount state satisfies it: identify refuses to ring a row whose two
 * orders disagree, which would point at the failure rather than at the term (SPEC §6).
 *
 * The visual sequence is derived the way flexbox derives it, sorting by `order` and then by
 * source position, so `data-visual` cannot claim a position the CSS does not produce. The row
 * holds a fixed height and every card the same box, so switching builds moves nothing across
 * the layout beyond the one card the term is about (SPEC §5). Stepping clamps at the last
 * card and each segment reaches its own build, so a pass joined halfway ends where a whole
 * one does (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const card = (c: Card) => `
    <div class="sp-surface" data-part="card-${c.key}" data-key="${c.key}" role="listitem"
         style="flex: 1 1 0; min-width: 0; padding: 8px; height: 58px; display: flex; flex-direction: column; gap: 4px">
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">${c.name}</span>
      <span class="sp-text" style="font-size: 11px">${c.body}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="matched" data-axis="Laid out" data-term="matched">
            <button class="sp-segment" data-part="seg-matched" value="matched">In source order</button>
            <button class="sp-segment" data-part="seg-reordered" value="reordered">With CSS order</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="row" data-subject data-pose="[data-mode=matched]" data-mode="matched" role="list"
             style="margin-top: 10px; padding: 10px; display: flex; gap: 8px">${CARDS.map(card).join('')}</div>

        <div class="sp-row sp-context" style="margin-top: 10px; gap: 10px; height: 30px">
          <span class="sp-label" style="flex: 0 0 auto">Speech</span>
          <span class="sp-text sp-text--ink sp-grow" data-part="voice" data-state="match"
                style="font-size: 11px; white-space: nowrap; overflow: hidden"></span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="next"
                  style="flex: 0 0 auto">Next</button>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="matched"
           style="margin: 8px 0 0; height: 32px; font-size: 11px">${CAPTION.matched}</p>
      </div>
    </div>
  `;

  const row = part(root, 'row');
  const voice = part(root, 'voice');
  const caption = part(root, 'caption');

  let mode: Mode = 'matched';
  let at = 0;

  /** The sequence flexbox itself produces: sort by `order`, ties broken by source position. */
  const visual = (): Card[] =>
    CARDS.map((c, i) => ({ c, i }))
      .sort((a, b) => (ORDER[mode][a.c.key] ?? 0) - (ORDER[mode][b.c.key] ?? 0) || a.i - b.i)
      .map((x) => x.c);

  const draw = () => {
    const seen = visual();
    for (const [source, c] of CARDS.entries()) {
      const el = part(root, `card-${c.key}`);
      el.style.order = String(ORDER[mode][c.key] ?? 0);
      el.dataset.visual = String(seen.indexOf(c) + 1);
      flag(el, 'data-sim-focus', source === at);
    }
    const current = CARDS[at];
    if (!current) return;
    const rank = seen.indexOf(current);
    const agrees = rank === at;
    voice.dataset.state = agrees ? 'match' : 'mismatch';
    voice.textContent = `${current.name}, ${current.body}, ${at + 1} of ${CARDS.length}`;
  };

  const apply = (next: Mode) => {
    mode = next;
    at = 0;
    row.dataset.mode = next;
    caption.dataset.case = next;
    caption.textContent = CAPTION[next];
    draw();
  };

  apply('matched');

  part(root, 'next').addEventListener('click', () => {
    at = Math.min(at + 1, CARDS.length - 1);
    draw();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'reordered' ? 'reordered' : 'matched');
  });
}
