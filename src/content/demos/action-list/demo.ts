import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SCENE = { w: 452, h: 234 };
const HOST_W = 222;

interface Command {
  key: string;
  label: string;
  glyph: 'copy' | 'pencil' | 'share' | 'trash';
  note?: string;
  /** A rule sits above this row: the sections are part of the body's anatomy. */
  section?: boolean;
}

const COMMANDS: Command[] = [
  { key: 'duplicate', label: 'Duplicate', glyph: 'copy', note: 'Copy into a new draft' },
  { key: 'rename', label: 'Rename', glyph: 'pencil', note: 'Changes the file name only' },
  { key: 'share', label: 'Share', glyph: 'share', section: true },
  { key: 'delete', label: 'Delete', glyph: 'trash', section: true },
];

interface Picker extends HTMLElement {
  value: string;
}

/**
 * Action list specimen: one list of commands, and two hosts for it. A segmented control picks
 * whether the list is held by a popover hanging off an "Actions" trigger or by a panel docked
 * down the side of the page, and the list is not rebuilt for either: the same element is moved
 * between the two hosts, which is the whole claim the term makes. Rows, icons, descriptions and
 * the dividers grouping them are identical because they are literally the same nodes.
 *
 * The subject is that list body, the narrowest element the term names. The hosts are not the
 * term (one is a popover, the other a panel), and the page card, the trigger, the picker and the
 * readout are scenery in the context register. The list is honestly an action list in both hosts,
 * so no `data-pose` condition is needed.
 *
 * Both hosts are absolutely positioned in a fixed scene, so switching between them moves nothing
 * (SPEC §5), and the readout is a fixed-width slot. Which host is open is owned by the picker's
 * absolute state rather than by a toggling trigger, so a pass resumed anywhere lands the same way
 * (SPEC §8); running a command marks the readout and leaves the surface where the picker put it.
 */
export function mount(root: HTMLElement): void {
  const row = (cmd: Command) => `
    ${cmd.section ? '<div class="sp-divider" style="margin: 4px 6px"></div>' : ''}
    <button
      class="sp-menu-item"
      type="button"
      data-part="row-${cmd.key}"
      style="align-items: ${cmd.note ? 'flex-start' : 'center'}; padding: 6px 8px"
    >
      <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 18px">${icon(cmd.glyph)}</span>
      <span style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
        <span style="line-height: 1.35">${cmd.label}</span>
        ${cmd.note ? `<span class="sp-label" style="font-size: 11px; font-weight: 400">${cmd.note}</span>` : ''}
      </span>
    </button>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">One body, two hosts</span>
          <span class="sp-label" data-part="readout" data-ran="none" style="flex: 0 0 96px; font-size: 11px; text-align: right; white-space: nowrap">Nothing run yet</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="popover" data-axis="Presentation">
            <button class="sp-segment" type="button" data-part="seg-popover" value="popover" style="padding: 4px 9px; font-size: 12px">Popover</button>
            <button class="sp-segment" type="button" data-part="seg-panel" value="panel" style="padding: 4px 9px; font-size: 12px">Panel</button>
          </sp-segmented>
        </div>

        <div class="sp-body">
          <div style="position: relative; width: ${SCENE.w}px; height: ${SCENE.h}px">
            <div class="sp-surface sp-context" style="position: absolute; left: 0; top: 0; width: ${SCENE.w - HOST_W - 12}px; height: ${SCENE.h}px; padding: 12px">
              <div class="sp-heading" style="font-size: 13px">Q3 report.pdf</div>
              <div class="sp-stack" style="margin-top: 12px; gap: 9px">
                <div class="sp-line" style="width: 100%"></div>
                <div class="sp-line" style="width: 86%"></div>
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 64%"></div>
              </div>
              <div class="sp-label" data-part="page-note" style="margin-top: 16px; font-size: 11px; line-height: 1.4">
                The page keeps its place. Only the container around the list changes.
              </div>
            </div>

            <div style="position: absolute; right: 0; top: 0; width: ${HOST_W}px; height: ${SCENE.h}px">
              <button
                class="sp-button sp-button--ghost sp-button--sm sp-context"
                type="button"
                data-part="trigger"
                aria-expanded="true"
                style="position: absolute; left: 0; top: 0; display: inline-flex; align-items: center; gap: 6px"
              >Actions ${icon('chevronDown')}</button>

              <div
                class="sp-popover"
                data-part="popover"
                data-open
                style="left: 0; right: 0; top: 38px; min-width: 0; padding: 6px; --sp-arrow-x: 22px"
              ></div>

              <div
                class="sp-surface sp-context"
                data-part="panel"
                style="position: absolute; inset: 0; padding: 8px; opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s"
              >
                <div class="sp-label" style="padding: 2px 8px 6px">Actions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = document.createElement('div');
  list.className = 'sp-list';
  list.dataset.part = 'list';
  list.setAttribute('data-subject', '');
  list.style.gap = '0';
  list.innerHTML = COMMANDS.map(row).join('');

  const popover = part(root, 'popover');
  const panel = part(root, 'panel');
  const trigger = part(root, 'trigger');
  const readout = part(root, 'readout');
  const picker = part(root, 'picker') as Picker;

  popover.append(list);

  const show = (mode: string) => {
    const inPopover = mode !== 'panel';
    (inPopover ? popover : panel).append(list);
    flag(popover, 'data-open', inPopover);
    flag(panel, 'data-open', !inPopover);
    panel.style.opacity = inPopover ? '0' : '1';
    panel.style.visibility = inPopover ? 'hidden' : 'visible';
    trigger.style.visibility = inPopover ? 'visible' : 'hidden';
    trigger.setAttribute('aria-expanded', String(inPopover));
  };

  picker.addEventListener('change', () => show(picker.value));

  for (const cmd of COMMANDS) {
    part(list, `row-${cmd.key}`).addEventListener('click', () => {
      readout.dataset.ran = cmd.key;
      readout.textContent = `Ran ${cmd.label.toLowerCase()}`;
    });
  }
}
