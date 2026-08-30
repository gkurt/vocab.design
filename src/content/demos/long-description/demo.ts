import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'alt' | 'details';

const BARS = [
  { site: 'Ashby', value: 74 },
  { site: 'Corby', value: 61 },
  { site: 'Deal', value: 38 },
  { site: 'Ely', value: 29 },
  { site: 'Frome', value: 12 },
] as const;

const DESCRIPTION =
  'Ashby is highest at 74 tonnes, a third of the total, with Corby behind it at 61. Deal, Ely and Frome are all under 40, and every site is below where it was in 2019.';

const MODE = {
  alt: {
    utterance: '“Quarterly emissions by site. Chart.”',
    verdict: 'The name of the picture, and none of its content. There is nowhere else to go.',
    status: 'None for this figure.',
  },
  details: {
    utterance: '“Quarterly emissions by site. Chart. Has details.”',
    verdict: 'The same name, plus a pointer the reader can follow to the full account.',
    status: 'Declared. Open it with Full description.',
  },
} as const satisfies Record<Mode, unknown>;

/**
 * Long description specimen: a chart whose short alternative names it and nothing more, with a
 * pick between that alone and a declared long description the reader can open. The disclosure has
 * an explicit open and an explicit dismissal rather than one control that toggles (SPEC §8).
 *
 * The transcript is a portrayal, labelled as one, following the live region and role description
 * specimens rather than inventing a second convention for the same job.
 *
 * The subject is the long description itself: the term names the passage of prose, not the chart
 * it belongs to, not the disclosure that reaches it and not the announcement that mentions it.
 * The chart, the picker, the transcript and the verdict are scenery (SPEC §5). The description is
 * off stage in the alt-only state, which identify summons it out of, and it is the term in every
 * state where it is on stage, so no `data-pose` is needed.
 *
 * The description's room is reserved whether it is open or not, so opening it moves nothing below
 * it (SPEC §5).
 *
 * Two strings left the frame. The row above the chart was labelled "Figure, one complex image",
 * which described the scene instead of naming it, and is now the figure number a document would
 * print. The line standing in the description's box while it is closed used to argue the case
 * ("Declared and reachable. The reader is told details exist ..."); it is an ordinary empty state
 * now, and the verdict in the strip carries the reading.
 */
export function mount(root: HTMLElement): void {
  const bar = ({ site, value }: { site: string; value: number }) => `
    <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center; justify-content: flex-end; min-width: 0">
      <div style="width: 100%; height: ${Math.round((value / 80) * 62)}px; border-radius: 3px 3px 0 0;
                  background: var(--sp-accent)"></div>
      <span class="sp-label" style="font-size: 9.5px">${site}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Figure 3</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="alt" data-axis="Alt" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-alt" value="alt"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Alt only</button>
            <button class="sp-segment" type="button" data-part="seg-details" value="details"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Long description</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 10px">
          <div class="sp-stack" data-part="figure" style="flex: 0 0 auto; width: 188px; gap: 9px">
            <div class="sp-stack sp-context" data-part="chart" style="gap: 9px">
              <span class="sp-label" style="font-size: 10px">Emissions by site, tonnes</span>
              <div class="sp-row" style="align-items: flex-end; gap: 9px; height: 66px; padding: 0 2px;
                                         border-bottom: 2px solid var(--sp-line)">
                ${BARS.map(bar).join('')}
              </div>
            </div>
            <div class="sp-row sp-context" style="height: 26px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reveal"
                      aria-expanded="false" aria-controls="long-description-panel"
                      style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px;
                             padding: 3px 10px; opacity: 0; visibility: hidden;
                             transition: opacity 0.18s, visibility 0.18s">
                ${icon('chevronRight', 'sp-icon--chevron')}Full description
              </button>
            </div>
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
                          <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance" data-mode="alt"
                 style="margin: 2px 0 0; height: 30px; font-size: 11.5px; line-height: 1.3">${MODE.alt.utterance}</p>
            
            <div class="sp-context">
              <p class="sp-text" data-stage-verdict data-part="verdict" data-mode="alt"
                 style="margin: 2px 0 0; height: 30px; font-size: 11px; line-height: 1.3">${MODE.alt.verdict}</p>
            </div>
          </div>
        </div>

        <div class="sp-surface" id="long-description-panel" style="margin-top: 8px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 16px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Long description</span>
            <button class="sp-chip" type="button" data-part="hide"
                    style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; opacity: 0; visibility: hidden;
                           transition: opacity 0.18s, visibility 0.18s">Hide</button>
          </div>
          <div style="position: relative; height: 47px; margin-top: 4px">
            <p class="sp-text sp-context" data-part="status" data-mode="alt"
               style="position: absolute; inset: 0; margin: 0; font-size: 11px; line-height: 1.35;
                      transition: opacity 0.2s, visibility 0.2s">${MODE.alt.status}</p>
            <p class="sp-text sp-text--ink" data-part="description" data-subject
               style="position: absolute; inset: 0; margin: 0; font-size: 11px; line-height: 1.35;
                      opacity: 0; visibility: hidden;
                      transition: opacity 0.2s, visibility 0.2s">${DESCRIPTION}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const utterance = part(root, 'utterance');
  const verdict = part(root, 'verdict');
  const reveal = part(root, 'reveal');
  const description = part(root, 'description');
  const status = part(root, 'status');
  const hide = part(root, 'hide');

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
    el.style.visibility = on ? 'visible' : 'hidden';
  };

  const open = (on: boolean) => {
    show(description, on);
    show(status, !on);
    show(hide, on);
    flag(description, 'data-open', on);
    reveal.setAttribute('aria-expanded', String(on));
  };

  const apply = (mode: Mode) => {
    const rule = MODE[mode];
    utterance.dataset.mode = mode;
    utterance.textContent = rule.utterance;
    verdict.dataset.mode = mode;
    verdict.textContent = rule.verdict;
    status.dataset.mode = mode;
    status.textContent = rule.status;
    show(reveal, mode === 'details');
    // Nothing to disclose without a declared description, so leaving the pick closes the panel.
    if (mode === 'alt') open(false);
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  // An explicit open and an explicit dismissal, never one control that flips (SPEC §8).
  reveal.addEventListener('click', () => open(true));
  hide.addEventListener('click', () => open(false));

  apply('alt');
}
