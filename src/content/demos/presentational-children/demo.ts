import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat before the first child collapses, and the gap between the ones after it. */
const FLATTEN_MS = 140;
const FLATTEN_STEP_MS = 110;

type Mode = 'authored' | 'computed';

/** The nodes inside the control, in document order, with the role each one authored. */
const CHILDREN = [
  { part: 'node-svg', tag: 'svg', indent: 14, role: 'graphic' },
  { part: 'node-strong', tag: 'strong', indent: 14, role: 'text' },
  { part: 'node-ul', tag: 'ul', indent: 14, role: 'list' },
  { part: 'node-li-1', tag: 'li', indent: 28, role: 'listitem' },
  { part: 'node-li-2', tag: 'li', indent: 28, role: 'listitem' },
] as const;

const NAME = 'Archive 3 messages Frees 40 MB';

const CAPTION = {
  authored: 'Six elements, each with a role of its own: a graphic, a run of text, a list and two list items inside one button.',
  computed: 'The button flattens them. Five roles are gone, their text swept into the one name the button announces, in document order.',
} as const;

/**
 * Presentational children specimen: a composed button beside the accessibility tree it produces,
 * with a pick between the tree as the markup authored it and the tree as the browser computed it.
 * Nothing about the control on screen changes, because the rule is about the tree and the speech,
 * never about the pixels.
 *
 * The transcript is a portrayal, labelled as one, following the live region and role description
 * specimens rather than inventing a second convention for the same job.
 *
 * The subject is the announced name, given its own element inside the transcript: the term names
 * the one label the flattened children collapse into, not the button that owns it and not the tree
 * view that explains it. The button, the tree, the node count and the caption are scenery
 * (SPEC §5). The name is the flattened one whichever tree is on screen, so no state is dishonest
 * and no `data-pose` is needed.
 *
 * The collapse runs on the DemoClock, so a pose can hold it still. Both tree views hold the same
 * six rows in the same boxes, so switching moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const treeRow = (name: string, tag: string, indent: number, role: string) => `
    <div data-part="${name}" style="display: grid; grid-template-columns: 108px 1fr; align-items: baseline;
                                    height: 13px; transition: opacity 0.2s ease">
      <span style="padding-left: ${indent}px; font-size: 11px; font-weight: 500">${tag}</span>
      <span data-part="${name}-role" class="sp-label" style="font-size: 10.5px">${role}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <button class="sp-button sp-button--ghost sp-context" type="button" data-part="control"
                style="display: inline-flex; align-items: center; justify-content: flex-start; gap: 9px;
                       width: 100%; height: 32px; padding: 0 12px">
          ${icon('inbox')}
          <strong style="font-weight: 600; font-size: 12.5px">Archive</strong>
          <ul style="display: flex; gap: 10px; list-style: none; margin: 0; padding: 0;
                     font-size: 11px; color: var(--sp-muted)">
            <li>3 messages</li>
            <li>Frees 40 MB</li>
          </ul>
        </button>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-row" style="gap: 10px">
            <span class="sp-label" style="flex: 0 0 auto">Accessibility tree</span>
            <span class="sp-grow"></span>
            <span class="sp-label" data-part="nodes" data-mode="authored"
                  style="flex: 0 0 auto; width: 104px; text-align: right; font-size: 10px; white-space: nowrap">6 nodes</span>
            <sp-segmented class="sp-segmented" data-part="mode" data-value="authored" style="flex: 0 0 auto">
              <button class="sp-segment" type="button" data-part="seg-authored" value="authored"
                      style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Authored</button>
              <button class="sp-segment" type="button" data-part="seg-computed" value="computed"
                      style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Computed</button>
            </sp-segmented>
          </div>

          <div data-part="tree" data-mode="authored" style="margin-top: 7px; display: flex; flex-direction: column; gap: 0">
            ${treeRow('node-button', 'button', 0, 'button')}
            ${CHILDREN.map((child) => treeRow(child.part, child.tag, child.indent, child.role)).join('')}
          </div>
        </div>

        <div class="sp-surface" style="margin-top: 10px; padding: 8px 10px">
          <span class="sp-label sp-context">Screen reader, on landing</span>
          <p class="sp-text sp-text--ink" data-part="utterance"
             style="margin: 4px 0 0; height: 22px; line-height: 22px; font-size: 12px; white-space: nowrap">
            “<span data-part="name" data-subject style="font-weight: 600">${NAME}</span>, button”</p>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="authored"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.authored}</p>
      </div>
    </div>
  `;

  const tree = part(root, 'tree');
  const nodes = part(root, 'nodes');
  const caption = part(root, 'caption');
  const rows = CHILDREN.map((child) => ({ row: part(root, child.part), role: part(root, `${child.part}-role`), authored: child.role }));
  const buttonRole = part(root, 'node-button-role');
  let timers: number[] = [];

  const apply = (mode: Mode) => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];
    tree.dataset.mode = mode;
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];

    if (mode === 'authored') {
      buttonRole.textContent = 'button';
      for (const { row, role, authored } of rows) {
        row.style.opacity = '1';
        role.textContent = authored;
      }
      nodes.dataset.mode = 'authored';
      nodes.textContent = '6 nodes';
      return;
    }

    buttonRole.textContent = 'button, name from contents';
    rows.forEach(({ row, role }, index) => {
      timers.push(
        clock.setTimeout(
          () => {
            row.style.opacity = '0.5';
            role.textContent = 'presentational';
          },
          FLATTEN_MS + index * FLATTEN_STEP_MS,
        ),
      );
    });
    // The count is the tally of a finished collapse, so it lands with the last row rather than
    // with the pick: an assert on it means the flattening is done (SPEC §8).
    timers.push(
      clock.setTimeout(
        () => {
          nodes.dataset.mode = 'computed';
          nodes.textContent = '1 node, 5 flattened';
        },
        FLATTEN_MS + (rows.length - 1) * FLATTEN_STEP_MS,
      ),
    );
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
