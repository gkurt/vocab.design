import { part } from '#src/kit/parts.ts';

const CHART_ALT = 'Bar chart: revenue up in every quarter, 12 percent in Q3';

/** Both pictures inline: specimens make no network requests (SPEC §5). */
const svg = (body: string, width: number, height: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`,
  )}`;

const CHART = svg(
  `<rect width="340" height="96" fill="#eef1f7"/>
   <rect x="24" y="52" width="34" height="34" fill="#8794b4"/>
   <rect x="86" y="40" width="34" height="46" fill="#7684a8"/>
   <rect x="148" y="24" width="34" height="62" fill="#4f6bd0"/>
   <rect x="210" y="34" width="34" height="52" fill="#7684a8"/>
   <rect x="16" y="86" width="308" height="2" fill="#c3cadb"/>`,
  340,
  96,
);

const FLOURISH = svg(
  `<path d="M4 12c24-14 48 14 72 0s48-14 72 0 48 14 72 0 48-14 72 0" fill="none" stroke="#9aa4bd" stroke-width="2"/>
   <circle cx="170" cy="12" r="4" fill="#9aa4bd"/>`,
  340,
  24,
);

const READINGS = {
  informative: `“Graphic. ${CHART_ALT}”`,
  decorative: 'Nothing. The empty alt takes it out of the tree, so the reader never learns it is here.',
} as const;

/**
 * Decorative image specimen: a report with two pictures in it. The chart carries the
 * finding and says so in its alt; the rule under the heading carries nothing and says
 * nothing, because its alt is empty. Point at either and the panel prints what a
 * screen reader would make of it.
 *
 * The subject is the decorative image itself, which is as narrow as this term gets: the
 * alt is an attribute of that element and there is nothing inside it to point at. The
 * chart, the attribute captions, and the panel are scenery (SPEC §5), and the panel
 * holds two lines of room from mount so a reading cannot move the report above it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <span class="sp-heading sp-context" style="font-size: 14px">Quarterly note</span>
        <img
          data-part="decorative"
          data-subject
          src="${FLOURISH}"
          alt=""
          style="display: block; width: 100%; height: 24px; margin-top: 6px"
        />
        <span class="sp-label sp-context" style="display: block; margin-top: 2px">alt=""</span>
        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 12px">
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 78%"></div>
        </div>
        <img
          class="sp-context"
          data-part="informative"
          src="${CHART}"
          alt="${CHART_ALT}"
          style="display: block; width: 100%; height: 96px; margin-top: 12px; border-radius: 6px; object-fit: cover"
        />
        <div class="sp-surface sp-context" style="margin-top: 12px; padding: 8px 10px">
          <span class="sp-label">Screen reader, on reaching the image</span>
          <p class="sp-text sp-text--ink" data-part="readout" data-state="idle" style="margin: 4px 0 0; height: 34px; font-size: 12px">
            Point at either picture
          </p>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');

  for (const key of ['decorative', 'informative'] as const) {
    const image = part(root, key);
    const inspect = () => {
      readout.dataset.state = key;
      readout.textContent = READINGS[key];
    };
    // Hover is how an inspector is used and the ghost cursor carries it (SPEC §8); the
    // click keeps the same reading reachable where there is no pointer at all.
    image.addEventListener('pointerenter', inspect);
    image.addEventListener('click', inspect);
  }
}
