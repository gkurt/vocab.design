import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The band at each of its two densities, stated rather than measured. */
const HEIGHTS = { full: 130, compact: 52 };
/** The slot the band sits in: as tall as its full state, so the page below never moves. */
const SLOT = HEIGHTS.full;

const NOTES: Record<string, string> = {
  full: "Breadcrumb, title, description, status, and the page's own actions.",
  compact: 'Condensed to title and primary action. Nothing below has moved.',
};

const ROWS = ['Merlin', 'Kittiwake'];

/**
 * Page header specimen: the band that opens a page, at a full and a condensed density. It
 * carries a breadcrumb, the page title, a description, status chips, and the actions that
 * apply to the whole page rather than to anything inside it.
 *
 * The subject is the band, not the scene. The term names the header region and nothing
 * below it, so the list under it and the density switcher above it are scenery (SPEC §5),
 * and identify keeps something narrower than the frame to ring.
 *
 * The band sits in a slot as tall as its full state, so condensing changes the band's own
 * height and moves nothing under it (SPEC §5). Each segment names a density, so the switch
 * lands on that density rather than flipping the one it finds (SPEC §8).
 *
 * The line naming what the band is carrying ("Breadcrumb, title, description, status, and the
 * page's own actions.") was the site reading the specimen out inside the specimen's own box.
 * It changes with the density switch, so it is a verdict: it carries `data-stage-verdict` now
 * and the stage draws it in the strip, above the control that produced it.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    (name) => `
      <div class="sp-list-item" style="padding: 5px 10px">
        <span class="sp-grow">${name}</span>
        <span class="sp-label">berth 14</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Density</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Density" data-value="full">
            <button class="sp-segment" type="button" data-part="seg-full" value="full">full</button>
            <button class="sp-segment" type="button" data-part="seg-compact" value="compact">compact</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 0; background: var(--sp-surface); display: flex; flex-direction: column">
          <div style="flex: 0 0 auto; height: ${SLOT}px">
            <header
              data-part="header"
              data-subject
              data-density="full"
              style="height: ${HEIGHTS.full}px; padding: 12px 16px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface); overflow: hidden; transition: height 0.24s var(--sp-ease)"
            >
              <div class="sp-row" data-part="crumbs" style="gap: 5px; height: 16px">
                <span class="sp-label">Fleet</span>
                <span class="sp-label">/</span>
                <span class="sp-label">Launches</span>
              </div>
              <div class="sp-row sp-row--between" data-part="title-row" style="margin-top: 4px; gap: 12px">
                <h1 class="sp-heading sp-grow" data-part="title" style="margin: 0; font-size: 18px; line-height: 1.5">Harbour launch Kestrel</h1>
                <div class="sp-row" data-part="actions" style="gap: 6px">
                  <button class="sp-button sp-button--sm" type="button" data-part="primary">Book survey</button>
                  <button class="sp-icon-button" type="button" data-part="overflow" aria-label="More actions">${icon('kebab')}</button>
                </div>
              </div>
              <p class="sp-text" data-part="description" style="margin: 2px 0 0">Nine metre pilot launch, shared between the two harbour offices.</p>
              <div class="sp-row sp-row--wrap" data-part="meta" style="margin-top: 10px; gap: 6px">
                <span class="sp-chip" style="cursor: default">In service</span>
                <span class="sp-chip" style="cursor: default">Berth 12</span>
                <span class="sp-chip" style="cursor: default">Surveyed April</span>
              </div>
            </header>
          </div>
          <div class="sp-context sp-grow" data-part="content" style="padding: 10px 12px; background: var(--sp-sunken); min-height: 0">
            <div class="sp-list">${rows}</div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="max-width: 440px; text-align: center"></span>
    </div>
  `;

  const header = part(root, 'header');
  const crumbs = part(root, 'crumbs');
  const titleRow = part(root, 'title-row');
  const description = part(root, 'description');
  const meta = part(root, 'meta');
  const title = part(root, 'title');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    const compact = key === 'compact';
    header.dataset.density = key;
    header.style.height = `${compact ? HEIGHTS.compact : HEIGHTS.full}px`;
    title.style.fontSize = compact ? '15px' : '18px';
    titleRow.style.marginTop = compact ? '0' : '4px';
    for (const el of [crumbs, description, meta]) flag(el, 'hidden', compact);
    readout.textContent = note;
  };

  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('full');
}
