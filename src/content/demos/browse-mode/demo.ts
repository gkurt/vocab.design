import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'browse' | 'focus';
type Spot = { key: string; say: string; heading: boolean };

/** The reader's own copy of the page: five nodes, two of them headings. */
const NODES: Spot[] = [
  { key: 'node-h1', say: 'Heading, Release notes', heading: true },
  { key: 'node-p1', say: 'Paragraph, Shipped this week', heading: false },
  { key: 'node-link', say: 'Link, Full changelog', heading: false },
  { key: 'field', say: 'Edit, Search notes', heading: false },
  { key: 'node-h2', say: 'Heading, Known issues', heading: true },
];

const CAPTION: Record<Mode, string> = {
  browse:
    'In browse mode the reader eats the key before the page sees it. Down walks its own copy of the document, and H is a jump to the next heading.',
  focus:
    'In focus mode the same keys pass through to the control. H is the letter H now, which is why the mode switches itself when focus lands in a field.',
};

/**
 * Browse mode specimen: a short article with a search field in the middle of it, read by a
 * screen reader whose mode is picked by a segmented control. The same two keys are pressed
 * in both modes and do entirely different things: in browse mode Down walks the virtual
 * cursor and H jumps to the next heading, and in focus mode Down is handed to the page and H
 * is a letter typed into the field.
 *
 * The subject is the document region the virtual cursor moves through, the narrowest element
 * the term names: the mode is a claim on the keyboard while the reader is in this buffer, and
 * a ring around the node the cursor happens to be on would name that paragraph rather than
 * the mode. The segmented control, the readout and the caption are scenery (SPEC §5). Focus
 * mode is the counter-example the definition is written against, so the honest condition
 * lives in `data-pose` and the mount state satisfies it: identify refuses to pose the region
 * while its keys are being passed through, and plays on (SPEC §6).
 *
 * The virtual cursor is `data-sim-focus` and nothing here calls `.focus()`: attract never
 * moves real focus (SPEC §7), and a screen reader's cursor is not the browser's focus in any
 * case. The walk clamps at the last node rather than wrapping and each segment reaches its
 * own mode (SPEC §8). Every row holds its height, and the typed text lands in a field that
 * was already its full size, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Screen reader" data-term="browse" data-part="segmented" data-value="browse">
            <button class="sp-segment" data-part="seg-browse" value="browse">Browse mode</button>
            <button class="sp-segment" data-part="seg-focus" value="focus">Focus mode</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="page" data-subject data-pose="[data-mode=browse]" data-mode="browse"
             style="margin-top: 9px; padding: 9px 11px; display: flex; flex-direction: column; gap: 5px">
          <span class="sp-heading" data-part="node-h1" style="font-size: 12.5px">Release notes</span>
          <span class="sp-text" data-part="node-p1" style="font-size: 11px">Shipped this week: two new export formats.</span>
          <span class="sp-text" data-part="node-link" style="font-size: 11px; color: var(--sp-accent); text-decoration: underline">Full changelog</span>
          <input class="sp-input" data-part="field" data-typed="none" type="text" value="" readonly
                 aria-label="Search notes" placeholder="Search notes" style="font-size: 11.5px; padding: 4px 8px" />
          <span class="sp-heading" data-part="node-h2" style="font-size: 12.5px">Known issues</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The key press</span>
          <span class="sp-text sp-text--ink" data-part="did" data-did="rest"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Virtual cursor on: Heading, Release notes</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="browse"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.browse}</p>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const field = part(root, 'field') as HTMLInputElement;
  const did = part(root, 'did');
  const caption = part(root, 'caption');

  let mode: Mode = 'browse';
  let at = 0;
  let typed = '';

  const cursor = () => {
    const here = mode === 'focus' ? 'field' : (NODES[at]?.key ?? 'node-h1');
    for (const node of NODES) flag(part(root, node.key), 'data-sim-focus', node.key === here);
  };

  const report = (key: string, text: string) => {
    did.dataset.did = key;
    did.textContent = text;
  };

  const apply = (next: Mode) => {
    mode = next;
    at = 0;
    typed = '';
    field.value = '';
    field.dataset.typed = 'none';
    page.dataset.mode = next;
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    cursor();
    report('rest', next === 'browse' ? `Virtual cursor on: ${NODES[0]?.say}` : 'Keys are passed straight to the field');
  };

  apply('browse');

  // The keys arrive on the region the ghost cursor is over. Which of the two things they do
  // is the term: in browse mode the reader claims them, in focus mode the page gets them.
  page.addEventListener('keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    if (key !== 'ArrowDown' && key !== 'h') return;
    event.preventDefault();

    if (mode === 'focus') {
      if (key === 'h') {
        typed = `${typed}h`;
        field.value = typed;
        field.dataset.typed = typed;
        report('typed', `Typed “${typed}” into the field`);
        return;
      }
      report('passed', 'Handed to the page. The cursor holds.');
      return;
    }

    if (key === 'ArrowDown') {
      at = Math.min(at + 1, NODES.length - 1);
      cursor();
      report('moved', `Virtual cursor moved to: ${NODES[at]?.say}`);
      return;
    }

    const next = NODES.findIndex((node, index) => index > at && node.heading);
    if (next < 0) {
      report('end', 'No heading below. The cursor holds.');
      return;
    }
    at = next;
    cursor();
    report('jumped', `Jumped to: ${NODES[at]?.say}`);
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
