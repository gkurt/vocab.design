import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LINES = {
  layout: {
    presentation: 'Name Ada Lovelace. Team Analytical Engines. Access Full.',
    semantic: 'table, 3 rows, 2 columns, row 1, column 1: Name…',
  },
  data: {
    presentation: 'Q2 96. Q3 118.',
    semantic: 'table, 3 rows, 2 columns. Quarter: Q3. Units: 118.',
  },
} as const;

const CAPTIONS = {
  presentation: 'Right on the left: those rows were only ever placement. Wrong on the right: the headers were the meaning.',
  semantic: 'Without the role the layout table reads out coordinates for every scrap of text, and the sales table gets its headers back.',
} as const;

type Mode = keyof typeof CAPTIONS;

/**
 * Presentation role specimen: the same role put on two tables at once, one that was only
 * ever layout and one whose headers carry the meaning, with what a reader announces for
 * each printed underneath.
 *
 * The subject is the layout table, the element the role is written on. Taking the role off
 * is the counter-example the demo needs, and a subject with no role on it is not the term,
 * so the honest condition is declared in `data-pose` and the specimen mounts with the role
 * in place (SPEC §6). The sales table beside it is scenery, and it carries the same role
 * for the whole demonstration: that is the trap, not the term.
 *
 * The announcement lines are written from the role each table actually carries, so the
 * strip cannot claim an announcement the markup does not produce. They are utterances and
 * nothing else: the sales line read "Q3 118. No headers, nothing to say what 118 counts.",
 * where only the first three words were spoken and the rest was the author explaining the
 * loss. It reads the rows out as a reader would hear them now, and the verdict in the strip
 * says what that costs.
 *
 * Both lines sat in the window under labels naming the tables by their part in the argument
 * ("Layout table", "Sales table"), which is the site captioning its own exhibit inside the
 * fiction, and a screen no product draws. They are one `data-stage-announce` block now, read
 * top to bottom the way a reader moving down the page would hear them, so the stage speaks
 * them in the lane above the specimen and the window holds only the two tables.
 *
 * The two columns were labelled by their role in the argument ("Laid out with a table",
 * "A table that means it") under a header that announced the demonstration ("The same role,
 * on both tables"). A screen would head these two blocks with what they hold, so they are
 * "Profile" and "Sales", and the header is gone: the switch in the strip already says what
 * is being set.
 */
export function mount(root: HTMLElement): void {
  const pair = (label: string, value: string) => `
    <tr>
      <td class="sp-label" style="padding: 5px 10px 5px 0; width: 78px; vertical-align: top">${label}</td>
      <td class="sp-text sp-text--ink" style="padding: 5px 0; font-size: 12px">${value}</td>
    </tr>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="presentation" data-axis="Set to" data-term="presentation">
            <button class="sp-segment" data-part="seg-presentation" value="presentation"
                    style="font-size: 12px; padding: 5px 10px">role=presentation</button>
            <button class="sp-segment" data-part="seg-semantic" value="semantic"
                    style="font-size: 12px; padding: 5px 10px">no role</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px; width: 236px">
            <span class="sp-label sp-context">Profile</span>
            <table data-part="layout" data-subject data-pose="[role=presentation]" role="presentation"
                   style="width: 100%; border-collapse: collapse">
              ${pair('Name', 'Ada Lovelace')}${pair('Team', 'Analytical Engines')}${pair('Access', 'Full')}
            </table>
          </div>
          <div class="sp-stack sp-context" style="gap: 4px; width: 172px">
            <span class="sp-label">Sales</span>
            <table class="sp-table" data-part="sales" role="presentation" style="--sp-cell-pad: 4px 8px; font-size: 11px">
              <thead>
                <tr><th>Quarter</th><th>Units</th></tr>
              </thead>
              <tbody>
                <tr><td>Q2</td><td>96</td></tr>
                <tr><td>Q3</td><td>118</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div data-stage-announce data-part="says">
          <span data-part="say-layout" data-state="presentation" style="display: block">${LINES.layout.presentation}</span>
          <span data-part="say-sales" data-state="presentation" style="display: block">${LINES.data.presentation}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="presentation"
           style="margin: 8px 0 0; height: 30px; font-size: 11px">${CAPTIONS.presentation}</p>
      </div>
    </div>
  `;

  const layout = part(root, 'layout');
  const sales = part(root, 'sales');
  const sayLayout = part(root, 'say-layout');
  const saySales = part(root, 'say-sales');
  const caption = part(root, 'caption');

  /** Read back from the attribute each table carries, never from the picker's value. */
  const announce = (table: HTMLElement, strip: HTMLElement, lines: { presentation: string; semantic: string }) => {
    const stripped = table.getAttribute('role') === 'presentation';
    strip.dataset.state = stripped ? 'presentation' : 'semantic';
    strip.textContent = stripped ? lines.presentation : lines.semantic;
  };

  const apply = (mode: Mode) => {
    for (const table of [layout, sales]) {
      if (mode === 'presentation') table.setAttribute('role', 'presentation');
      else table.removeAttribute('role');
    }
    announce(layout, sayLayout, LINES.layout);
    announce(sales, saySales, LINES.data);
    caption.dataset.case = mode;
    caption.textContent = CAPTIONS[mode];
  };

  apply('presentation');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));
}
