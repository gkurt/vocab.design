import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type View = 'page' | 'reader';

/** The article body, thirty-three words of it, rendered identically by both views. */
const ARTICLE =
  'Two export formats shipped this week, and the importer now keeps column order. The change is small and the reason is not: every support thread about broken imports began with a reordered spreadsheet.';

const VERDICT: Record<View, string> = {
  page: 'Four blocks of furniture around 33 words',
  reader: 'The same 33 words, one column, reader’s own type',
};

/**
 * Reader mode specimen: one article page in a browser frame, shown as its author shipped it
 * and as the browser rebuilds it. Picking Reader view drops the promo bar, the ad rail, the
 * share row and the related links, and re-renders the same thirty-three words as one measured
 * column at a comfortable size.
 *
 * The subject is the surface reader mode produces, the narrowest element the term names: a
 * ring around the button would name a control, and a ring around the frame would name a
 * browser. That surface does not exist in the page view, so identify summons it (SPEC §6) by
 * fast forwarding to the pick that produces it, which is why the wait before the reveal is
 * followed by a `visible` assert (SPEC §8). No `data-pose` is needed: the surface is only
 * ever on stage in the state where it is the term.
 *
 * A caption under the frame used to gloss each view ("Reader mode is a reader-side
 * override...", "A plausible article page rather than a strawman..."). That is the
 * article's voice, and this specimen already has a verdict in the strip, which is the one
 * place a reading of the state belongs, so the caption went. The address bar names a
 * reserved example domain rather than describing the page it is showing.
 *
 * The browser chrome and the verdict readout are scenery (SPEC §5). The frame
 * and its body are fixed boxes, so the whole of the change happens inside the body and
 * nothing around it moves. Each segment reaches its own view rather than toggling (SPEC §8),
 * and no timer is needed.
 */
export function mount(root: HTMLElement): void {
  const share = (label: string) => `
    <span style="flex: 1 1 0; min-width: 0; height: 26px; display: flex; align-items: center; justify-content: center;
                 border-radius: 6px; background: var(--sp-accent-soft); color: var(--sp-ink);
                 font-size: 10px; font-weight: 600">${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div style="width: 452px; display: flex; flex-direction: column">
        <div class="sp-frame" style="width: 452px; height: 236px">
          <div class="sp-topbar sp-context" style="padding: 8px 10px; gap: 8px">
            <span style="flex: 1 1 auto; min-width: 0; padding: 3px 9px; border-radius: 999px; background: var(--sp-sunken);
                         color: var(--sp-muted); font-size: 10px; white-space: nowrap; overflow: hidden;
                         text-overflow: ellipsis">example.com/release-notes</span>
            <sp-segmented data-stage-mode class="sp-segmented" data-part="view" data-axis="View" data-value="page" style="flex: 0 0 auto">
              <button class="sp-segment" data-part="seg-page" value="page"
                      style="padding: 3px 9px; font-size: 11px">Page</button>
              <button class="sp-segment" data-part="seg-reader" value="reader"
                      style="padding: 3px 9px; font-size: 11px">Reader view</button>
            </sp-segmented>
          </div>

          <div class="sp-body" style="padding: 10px; overflow: hidden">
            <div class="sp-stack" data-part="cluttered" style="height: 100%; gap: 8px">
              <div class="sp-row sp-row--between"
                   style="flex: 0 0 auto; height: 22px; padding: 0 8px; border-radius: 5px;
                          background: var(--sp-accent); color: var(--sp-accent-ink)">
                <span style="font-size: 10px; font-weight: 600">Subscribe now: half price for the first year</span>
                <span style="font-size: 11px; line-height: 1">×</span>
              </div>

              <div class="sp-row" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 8px">
                <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 3px">
                  <span class="sp-heading" style="font-size: 12px">Release notes</span>
                  <p class="sp-text" style="margin: 0; font-size: 9.5px; line-height: 1.35">${ARTICLE}</p>
                </div>
                <div style="flex: 0 0 auto; width: 74px; display: flex; align-items: center; justify-content: center;
                            border: 1px dashed var(--sp-line); border-radius: 5px; background: var(--sp-sunken)">
                  <span class="sp-label" style="font-size: 9px">Ad</span>
                </div>
              </div>

              <div class="sp-row" style="flex: 0 0 auto; gap: 6px">
                ${share('Share')}${share('Post')}${share('Send')}${share('Save')}
              </div>

              <div class="sp-row" style="flex: 0 0 auto; gap: 8px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 9px">Related</span>
                <span class="sp-text" style="flex: 1 1 auto; min-width: 0; font-size: 9px; white-space: nowrap;
                      overflow: hidden; text-overflow: ellipsis">Ten tools we love · Why exports break · The 2026 roadmap</span>
              </div>
            </div>

            <div class="sp-surface" data-part="reader" data-subject hidden
                 style="width: 306px; margin: 0 auto; padding: 12px 16px">
              <span class="sp-heading" style="font-size: 14px">Release notes</span>
              <div class="sp-label" style="margin-top: 2px; font-size: 10px">Release desk · 1 min read</div>
              <p class="sp-prose sp-text--ink"
                 style="margin: 8px 0 0; --sp-leading: 1.65; --sp-measure: 42ch; font-size: 12px">${ARTICLE}</p>
            </div>
          </div>
        </div>

        <span class="sp-text sp-text--ink" data-stage-verdict data-part="verdict" data-view="page"
              style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${VERDICT.page}</span>
      </div>
    </div>
  `;

  const cluttered = part(root, 'cluttered');
  const reader = part(root, 'reader');
  const verdict = part(root, 'verdict');

  const apply = (view: View) => {
    flag(cluttered, 'hidden', view === 'reader');
    flag(reader, 'hidden', view === 'page');
    verdict.dataset.view = view;
    verdict.textContent = VERDICT[view];
  };

  apply('page');

  part(root, 'view').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as View);
  });
}
