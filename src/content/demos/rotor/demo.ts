import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Setting = 'headings' | 'links' | 'controls';
type Kind = 'heading' | 'link' | 'control' | 'text';
type Node = { key: string; kind: Kind; say: string };

/** The document, in the order a reader's cursor would walk it. */
const NODES: Node[] = [
  { key: 'node-h1', kind: 'heading', say: '“Weekly report, heading”' },
  { key: 'node-p', kind: 'text', say: '“Two export formats shipped.”' },
  { key: 'node-link1', kind: 'link', say: '“Full changelog, link”' },
  { key: 'node-field', kind: 'control', say: '“Search notes, text field”' },
  { key: 'node-button', kind: 'control', say: '“Subscribe, button”' },
  { key: 'node-h2', kind: 'heading', say: '“Known issues, heading”' },
  { key: 'node-link2', kind: 'link', say: '“Open tracker, link”' },
];

/** Each rotor setting names one kind of element, and the flick visits only those. */
const KIND: Record<Setting, Kind> = { headings: 'heading', links: 'link', controls: 'control' };

const CAPTION: Record<Setting, string> = {
  headings:
    'Set to Headings, a flick right walks headings and nothing else. Seven elements on the page, two stops, which is how a reader skims.',
  links: 'The same flick, the same page, a different unit of travel. Nothing about the document changed; the dial did.',
  controls:
    'The rotor offers a setting only when the page contains that kind of element, so its list is a readout of the structure you shipped.',
};

/**
 * Rotor specimen: a short page fragment beside the dial that decides what a flick moves
 * between. Picking a setting and pressing Flick right walks the reader's cursor through
 * elements of that kind only, so the same gesture visits headings, then links, then form
 * controls, without the document changing at all.
 *
 * The subject is the rotor dial, the narrowest element the term names: the rotor is the
 * setting, not the walk and not the page it walks. A ring around the page fragment would
 * name the document, and a ring around the node the cursor happens to be on would name a
 * heading. The page, the flick button, the announcement readout and the caption are all
 * scenery (SPEC §5). The dial is honest in every one of its three resting states, so no
 * `data-pose` is needed (SPEC §6).
 *
 * The cursor is drawn with `data-sim-focus` and nothing here calls `.focus()`: attract never
 * moves real focus (SPEC §7), and a screen reader's cursor is not the browser's focus in any
 * case. Each segment reaches its own setting rather than cycling, and the walk clamps at the
 * last stop rather than wrapping, so a pass joined halfway proves the same thing (SPEC §8).
 * Every readout holds a reserved height and no row changes size, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between" style="gap: 10px">
          <span class="sp-label sp-context" style="flex: 0 0 auto">Rotor is set to</span>
          <sp-segmented class="sp-segmented" data-part="rotor" data-subject data-value="headings">
            <button class="sp-segment" data-part="seg-headings" value="headings"
                    style="padding: 5px 10px; font-size: 12px">Headings</button>
            <button class="sp-segment" data-part="seg-links" value="links"
                    style="padding: 5px 10px; font-size: 12px">Links</button>
            <button class="sp-segment" data-part="seg-controls" value="controls"
                    style="padding: 5px 10px; font-size: 12px">Form controls</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="page" data-setting="headings"
             style="margin-top: 9px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px">
          <span class="sp-heading" data-part="node-h1" style="font-size: 12.5px">Weekly report</span>
          <span class="sp-text" data-part="node-p" style="font-size: 11px">Two export formats shipped this week.</span>
          <span class="sp-text" data-part="node-link1"
                style="font-size: 11px; text-decoration: underline">Full changelog</span>
          <div class="sp-row" style="gap: 8px">
            <input class="sp-input" data-part="node-field" type="text" readonly aria-label="Search notes"
                   placeholder="Search notes" style="flex: 1 1 auto; min-width: 0; font-size: 11px; padding: 3px 8px" />
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="node-button"
                    style="flex: 0 0 auto; font-size: 11px; padding: 3px 9px; cursor: default">Subscribe</button>
          </div>
          <span class="sp-heading" data-part="node-h2" style="font-size: 12.5px">Known issues</span>
          <span class="sp-text" data-part="node-link2"
                style="font-size: 11px; text-decoration: underline">Open tracker</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="flick">Flick right</button>
          <span class="sp-text sp-text--ink" data-part="say" data-at="node-h1"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Stop 1 of 2 · ${NODES[0]?.say}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-setting="headings"
           style="margin: 7px 0 0; height: 32px; font-size: 11px">${CAPTION.headings}</p>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const say = part(root, 'say');
  const caption = part(root, 'caption');

  let setting: Setting = 'headings';
  let at = 0;

  const stopsFor = (which: Setting) => NODES.filter((node) => node.kind === KIND[which]);

  const paint = () => {
    const stops = stopsFor(setting);
    const here = stops[at] ?? stops[0];
    if (!here) return;

    for (const node of NODES) flag(part(root, node.key), 'data-sim-focus', node.key === here.key);

    say.dataset.at = here.key;
    say.textContent = `Stop ${at + 1} of ${stops.length} · ${here.say}`;
  };

  const apply = (next: Setting) => {
    setting = next;
    at = 0;
    page.dataset.setting = next;
    caption.dataset.setting = next;
    caption.textContent = CAPTION[next];
    paint();
  };

  apply('headings');

  // The walk clamps at the last stop of the current setting rather than wrapping.
  part(root, 'flick').addEventListener('click', () => {
    at = Math.min(at + 1, stopsFor(setting).length - 1);
    paint();
  });

  part(root, 'rotor').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Setting);
  });
}
