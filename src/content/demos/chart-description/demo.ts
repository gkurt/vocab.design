import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Given = 'none' | 'alt' | 'full';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
const TICKETS = [210, 198, 176, 152, 141, 130];
const TOP = 210;
const BAR_MAX = 30;

const ANNOUNCE: Record<Given, string> = {
  none: '“Image.” Nothing else.',
  alt: '“Bar chart, image.”',
  full: '“Tickets fell 38 percent after March. Table follows.”',
};

const CAPTION: Record<Given, string> = {
  none: 'An empty alternative claims the figure is decorative. Six numbers say otherwise, and all six are gone.',
  alt: 'Naming the chart type describes the picture. Nothing here says which way it went, and no value was read out.',
  full: 'The takeaway in one line, then the values as a real table. Sighted readers use the table too, which is the point.',
};

/**
 * Chart description specimen: a small bar chart with a description region under it, and a
 * segmented control picking what a non-visual reader is actually handed. Nothing at all, then
 * alt text that names the chart type and says nothing about the data, then a summary naming the
 * takeaway with the underlying values reachable as a real data table.
 *
 * The subject is the description region, the narrowest element the term names: the term is the
 * alternative, not the chart it stands in for, so a ring around the plot would name a chart.
 * The picker, the chart, the announcement strip and the caption are scenery (SPEC §5).
 *
 * The two failing states are the pedagogical point and they are states the region itself passes
 * through, so the honest condition lives in `data-pose` and the mount state satisfies it:
 * identify refuses to ring an empty region or a bare “bar chart”, and plays on until the real
 * description comes round again (SPEC §6).
 *
 * The values disclosure has an explicit open and an explicit dismissal rather than one toggling
 * trigger (SPEC §8), and changing what the reader is given shuts it, so a pass joined halfway
 * proves the same thing. The region reserves the room the open table needs, so revealing it
 * moves nothing below (SPEC §5). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const bars = WEEKS.map(
    (week, i) => `
      <div style="flex: 1 1 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 2px">
        <span data-part="bar-${i + 1}" style="width: 100%; max-width: 24px; height: ${Math.round(((TICKETS[i] ?? 0) / TOP) * BAR_MAX)}px;
                     border-radius: 2px 2px 0 0; background: var(--sp-accent)"></span>
        <span class="sp-label" style="font-size: 9px; line-height: 1.1">${week}</span>
      </div>`,
  ).join('');

  const headCells = WEEKS.map((week) => `<th scope="col">${week}</th>`).join('');
  const bodyCells = TICKETS.map((value) => `<td>${value}</td>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 9px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Reader gets" data-term="full" data-part="given" data-value="full">
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Nothing</button>
            <button class="sp-segment" type="button" data-part="seg-alt" value="alt"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Alt text</button>
            <button class="sp-segment" type="button" data-part="seg-full" value="full"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Summary and table</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="chart"
             style="margin-top: 7px; height: 64px; padding: 4px 10px; display: flex; flex-direction: column; gap: 1px;
                    background: var(--sp-sunken)">
          <span class="sp-label" style="font-size: 9px; line-height: 1.2">Support tickets a week</span>
          <div class="sp-row" style="flex: 1 1 auto; align-items: flex-end; gap: 8px">${bars}</div>
        </div>

        <div class="sp-surface" data-part="description" data-subject data-mode="full" data-pose="[data-mode=full]"
             style="margin-top: 7px; height: 122px; padding: 8px 10px">
          <span class="sp-text" data-part="pane-none" hidden style="display: block; font-size: 11.5px; line-height: 1.4">
            No text alternative. The figure is announced as an image, and the six values behind it are
            not reachable in any form.
          </span>
          <span class="sp-text" data-part="pane-alt" hidden style="display: block; font-size: 11.5px; line-height: 1.4">
            <code style="font-size: 11px">alt="Bar chart"</code> names the chart type and nothing about
            the data: no direction, no size of the change, not one number.
          </span>
          <div data-part="pane-full" style="display: flex; flex-direction: column; gap: 5px">
            <span class="sp-text sp-text--ink" data-part="summary" style="font-size: 11.5px; line-height: 1.35">
              Support tickets fell 38 percent after the March release, from 210 a week to 130.
            </span>
            <div class="sp-row" data-part="values-shut" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="show-values"
                      style="font-size: 11px; padding: 3px 9px">Show the 6 values</button>
            </div>
            <div data-part="values-open" hidden style="display: flex; flex-direction: column; gap: 4px">
              <table class="sp-table" data-part="values-table" style="--sp-cell-pad: 1px 5px; font-size: 10.5px">
                <thead><tr><th scope="col">Week</th>${headCells}</tr></thead>
                <tbody><tr><th scope="row" style="color: var(--sp-ink)">Tickets</th>${bodyCells}</tr></tbody>
              </table>
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="hide-values"
                      style="align-self: flex-start; font-size: 11px; padding: 2px 7px; color: var(--sp-muted)">Hide the values</button>
            </div>
          </div>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="announce" data-mode="full"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${ANNOUNCE.full}</span>
        

        <p class="sp-text sp-context" data-part="caption" data-mode="full"
           style="margin: 6px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">${CAPTION.full}</p>
      </div>
    </div>
  `;

  const description = part(root, 'description');
  const panes: Record<Given, HTMLElement> = {
    none: part(root, 'pane-none'),
    alt: part(root, 'pane-alt'),
    full: part(root, 'pane-full'),
  };
  const valuesShut = part(root, 'values-shut');
  const valuesOpen = part(root, 'values-open');
  const announce = part(root, 'announce');
  const caption = part(root, 'caption');

  const showValues = (open: boolean) => {
    flag(valuesShut, 'hidden', open);
    flag(valuesOpen, 'hidden', !open);
  };

  const apply = (given: Given) => {
    description.dataset.mode = given;
    for (const key of ['none', 'alt', 'full'] as Given[]) flag(panes[key], 'hidden', key !== given);
    // The disclosure belongs to the full description, so switching away shuts it: the script
    // then opens it explicitly rather than finding it however the last pass left it (SPEC §8).
    showValues(false);
    announce.dataset.mode = given;
    announce.textContent = ANNOUNCE[given];
    caption.dataset.mode = given;
    caption.textContent = CAPTION[given];
  };

  apply('full');

  part(root, 'show-values').addEventListener('click', () => showValues(true));
  part(root, 'hide-values').addEventListener('click', () => showValues(false));

  part(root, 'given').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Given);
  });
}
