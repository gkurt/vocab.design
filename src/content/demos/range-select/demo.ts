import { flag, part } from '#src/kit/parts.ts';

const MESSAGES = [
  { from: 'Ola', subject: 'Sprint notes', date: '09:12' },
  { from: 'Devrim', subject: 'Invoice 2291', date: '08:40' },
  { from: 'Marta', subject: 'Venue options', date: 'Tue' },
  { from: 'Ken', subject: 'Photo selects', date: 'Tue' },
  { from: 'Rosa', subject: 'Contract redline', date: 'Mon' },
];

/** Where the anchor sits at mount, so the run the term names is on stage from the start. */
const START = 2;

/**
 * Range select specimen: a message list where a plain click sets the anchor and a shifted
 * click extends the selection to everything between. The subject is the range itself, the
 * band spanning the run, since that is what the term names: the rows are what it is drawn
 * over, and the list is where it lives.
 *
 * One wiring answers everything: the extend is read as `shiftKey` off the click itself,
 * the scripted pass performs the held key with a `withKey` Shift scope (SPEC §8), and a
 * reader who takes the stage over holds the real key, so takeover behaves like the mail
 * client this is borrowed from. The stage draws the held key itself, so the demo carries
 * no chip of its own for it.
 *
 * Under the list stood a line reading "Click sets the anchor. Shift click says how
 * far.", which is the article instructing the reader from inside the mail client, so
 * it went and the count keeps the row on its own. The title bar carried a status line
 * of the same kind ("Anchor set on Venue options", "Shift click: 4 messages from the
 * anchor"): no mail client narrates the modifier a reader just held, and the band and
 * the "N selected" count under the list report the selection between them. The bar
 * keeps its name and nothing else.
 *
 * The band takes its geometry from the rows at either end rather than re-parenting
 * anything, so extending a range paints over the list without touching its layout
 * (SPEC §5), and the header checkbox carries the mixed state a partly selected list
 * actually has.
 */
export function mount(root: HTMLElement): void {
  const rows = MESSAGES.map(
    ({ from, subject, date }, index) => `
      <tr data-part="row-${index + 1}" data-index="${index}" style="cursor: default">
        <td style="width: 30px">
          <span class="sp-checkbox" data-part="box-${index + 1}" aria-hidden="true"></span>
        </td>
        <td style="width: 78px; font-weight: 500">${from}</td>
        <td>${subject}</td>
        <td style="width: 46px; text-align: right; color: var(--sp-muted)">${date}</td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 270px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inbox</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" data-part="sheet" style="position: relative; overflow: hidden">
            <table class="sp-table" style="--sp-cell-pad: 5px 10px">
              <thead>
                <tr>
                  <th style="width: 30px">
                    <span class="sp-checkbox" data-part="head-box" role="checkbox" aria-checked="mixed" aria-label="Select all" style="cursor: pointer"></span>
                  </th>
                  <th>From</th>
                  <th>Subject</th>
                  <th style="text-align: right">When</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
            <div
              data-part="range"
              data-subject
              data-span="1"
              aria-hidden="true"
              style="position: absolute; left: 3px; right: 3px; top: 0; height: 0; border-radius: 6px; border: 1px solid var(--sp-accent); background: color-mix(in oklab, var(--sp-accent) 16%, transparent); pointer-events: none; transition: top 0.18s var(--sp-ease), height 0.18s var(--sp-ease)"
            ></div>
          </div>
          <div class="sp-row sp-context" style="margin-top: 8px; justify-content: flex-end">
            <span class="sp-label" data-part="count" style="width: 86px; text-align: right">1 selected</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const band = part(root, 'range');
  const headBox = part(root, 'head-box');
  const count = part(root, 'count');

  let anchor = START;
  let focus = START;

  const rowAt = (index: number) => part(root, `row-${index + 1}`);

  const draw = () => {
    const from = Math.min(anchor, focus);
    const to = Math.max(anchor, focus);
    const span = to - from + 1;
    for (const [index] of MESSAGES.entries()) {
      const row = rowAt(index);
      const inside = index >= from && index <= to;
      flag(row, 'data-in-range', inside);
      row.setAttribute('aria-selected', String(inside));
      flag(part(root, `box-${index + 1}`), 'data-checked', inside);
    }
    const first = rowAt(from);
    const last = rowAt(to);
    band.style.top = `${first.offsetTop}px`;
    band.style.height = `${last.offsetTop + last.offsetHeight - first.offsetTop}px`;
    band.dataset.span = String(span);
    count.textContent = `${span} selected`;
    headBox.setAttribute('aria-checked', span === MESSAGES.length ? 'true' : 'mixed');
  };

  for (const [index] of MESSAGES.entries()) {
    rowAt(index).addEventListener('click', (event) => {
      // The key's own flag decides it, so the scripted `withKey` scope and a reader
      // holding Shift reach the range through one path.
      if (event.shiftKey) {
        focus = index;
      } else {
        // An unmodified click is the only thing that moves the anchor, which is what lets
        // a second shifted click redraw the range instead of starting another one.
        anchor = index;
        focus = index;
      }
      draw();
    });
  }

  headBox.addEventListener('click', () => {
    anchor = 0;
    focus = MESSAGES.length - 1;
    draw();
  });

  draw();
}
