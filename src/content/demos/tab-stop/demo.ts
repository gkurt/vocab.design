import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Tool = { key: string; label: string; glyph: IconName };

const TOOLS: Tool[] = [
  { key: 'edit', label: 'Edit', glyph: 'pencil' },
  { key: 'copy', label: 'Duplicate', glyph: 'copy' },
  { key: 'share', label: 'Share', glyph: 'share' },
  { key: 'star', label: 'Favourite', glyph: 'star' },
  { key: 'trash', label: 'Delete', glyph: 'trash' },
];

/** The three positions Tab can reach. The five toolbar buttons are one of them. */
const STOPS = ['field', 'toolbar', 'publish'] as const;
type Stop = (typeof STOPS)[number];

/** How the rail names each stop, and how the readout names where the ring is. */
const RAIL: Record<Stop, string> = {
  field: 'Title field',
  toolbar: 'Toolbar, 5 buttons',
  publish: 'Publish button',
};

const WHERE: Record<Stop, string> = {
  field: 'Title field',
  toolbar: 'inside the toolbar',
  publish: 'Publish button',
};

const CAPTION: Record<Stop, string> = {
  field: 'Three stops here, not seven. Tab moves between them; arrows move inside the one it reached.',
  toolbar: 'One press put the ring in the toolbar. Arrows move the active button, and the count holds.',
  publish: 'The next Tab left the group at once, skipping four buttons the arrows would have reached.',
};

/**
 * Tab stop specimen: a strip of three tab stops where the middle one is a toolbar of five
 * buttons. Pressing Tab walks the strip a stop at a time and the arrow keys walk the
 * buttons inside the stop the ring has reached, so the count of presses between the field
 * and the Publish button is three rather than seven. Each button prints the tabindex it is
 * really carrying, which is the roving pair the technique is named for.
 *
 * The subject is the toolbar group, the narrowest element the term names: one position in
 * the sequence that happens to hold five focusable parts. A ring around a single button
 * would name a button, and a ring around the strip would name the focus order. The Tab
 * button, the stop rail, the readout, and the caption are scenery (SPEC §5). The toolbar is
 * one tab stop in every state this demo can rest in, so no `data-pose` is needed.
 *
 * Tab is a button rather than a scripted key press: attract never moves real focus (SPEC
 * §7), and the player's own Tab walks every focusable element in the root, which is the
 * opposite of what this term claims. The ring is `data-sim-focus` throughout and nothing
 * here calls `.focus()`. Walking clamps at the last stop rather than wrapping, so a pass
 * joined halfway proves the same thing (SPEC §8). Every box holds its size across states.
 */
export function mount(root: HTMLElement): void {
  const button = (tool: Tool, index: number) => `
    <div class="sp-stack" style="gap: 3px; align-items: center">
      <button class="sp-icon-button" type="button" data-part="tool-${tool.key}" aria-label="${tool.label}"
              tabindex="${index === 0 ? 0 : -1}" data-ti="${index === 0 ? '0' : '-1'}"
              style="width: 32px; height: 30px">${icon(tool.glyph)}</button>
      <span class="sp-label" data-part="ti-${tool.key}" style="font-size: 9px; line-height: 1">${index === 0 ? '0' : '-1'}</span>
    </div>`;

  const rail = STOPS.map(
    (stop, index) => `
      <span class="sp-chip" data-part="stop-${stop}" ${index === 0 ? 'data-current' : ''}
            style="cursor: default; font-size: 10.5px; padding: 2px 8px">${index + 1}. ${RAIL[stop]}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Tab presses so far</span>
          <div class="sp-row" style="flex: 0 0 auto; gap: 8px">
            <span class="sp-text sp-text--ink" data-part="count" data-n="0" style="font-size: 12px">0</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab">Press Tab</button>
          </div>
        </div>

        <div class="sp-row sp-context" data-part="rail" style="margin-top: 9px; gap: 6px">${rail}</div>

        <div class="sp-surface" style="margin-top: 9px; padding: 10px; display: flex; align-items: flex-start; gap: 10px">
          <div class="sp-stack sp-context" style="gap: 3px; flex: 0 0 118px">
            <input class="sp-input" data-part="field" type="text" value="Release notes" readonly aria-label="Title"
                   style="font-size: 12px; padding: 5px 8px" />
            <span class="sp-label" style="font-size: 9px; line-height: 1">0</span>
          </div>

          <div class="sp-row" data-part="toolbar" data-subject role="toolbar" aria-label="Formatting"
               style="flex: 0 0 auto; gap: 4px; padding: 4px 6px; border: 1px solid var(--sp-line); border-radius: 8px; align-items: flex-start">
            ${TOOLS.map(button).join('')}
          </div>

          <div class="sp-stack sp-context" style="gap: 3px; flex: 1 1 auto; min-width: 0; align-items: flex-end">
            <button class="sp-button sp-button--sm" type="button" data-part="publish" tabindex="0">Publish</button>
            <span class="sp-label" style="font-size: 9px; line-height: 1">0</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Keyboard focus</span>
          <span class="sp-text sp-text--ink" data-part="focus" data-at="field"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${WHERE.field}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-at="field"
           style="margin: 7px 0 0; height: 34px; font-size: 11px">${CAPTION.field}</p>
      </div>
    </div>
  `;

  const count = part(root, 'count');
  const focus = part(root, 'focus');
  const caption = part(root, 'caption');
  const field = part(root, 'field');
  const publish = part(root, 'publish');

  let at = 0;
  let active = 0;

  const draw = () => {
    const stop = STOPS[at] as Stop;

    flag(field, 'data-sim-focus', stop === 'field');
    flag(publish, 'data-sim-focus', stop === 'publish');

    // The roving pair, written for real rather than described: the active button is the
    // one the sequence can reach, and the other four are reachable by arrow key alone.
    TOOLS.forEach((tool, index) => {
      const el = part(root, `tool-${tool.key}`);
      const on = index === active;
      el.tabIndex = on ? 0 : -1;
      el.dataset.ti = on ? '0' : '-1';
      const badge = part(root, `ti-${tool.key}`);
      badge.textContent = on ? '0' : '-1';
      badge.style.color = on ? 'var(--sp-accent)' : '';
      flag(el, 'data-sim-focus', on && stop === 'toolbar');
    });

    for (const name of STOPS) flag(part(root, `stop-${name}`), 'data-current', name === stop);

    count.dataset.n = String(at);
    count.textContent = String(at);
    focus.dataset.at = stop;
    focus.textContent = stop === 'toolbar' ? `${TOOLS[active]?.label}, inside the toolbar` : WHERE[stop];
    caption.dataset.at = stop;
    caption.textContent = CAPTION[stop];
  };

  draw();

  part(root, 'tab').addEventListener('click', () => {
    at = Math.min(at + 1, STOPS.length - 1);
    draw();
  });

  // Arrows are the group's own navigation, and they only mean anything once Tab has
  // reached it. The keydown arrives on the toolbar the ghost cursor is over.
  part(root, 'toolbar').addEventListener('keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    if (key !== 'ArrowRight' && key !== 'ArrowLeft') return;
    if (STOPS[at] !== 'toolbar') return;
    event.preventDefault();
    const step = key === 'ArrowRight' ? 1 : -1;
    active = (active + step + TOOLS.length) % TOOLS.length;
    draw();
  });
}
