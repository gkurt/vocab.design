import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The CIE 1931 spectral locus, sampled every 10nm from 380 to 700 and closed along the
 * line of purples. Plotted with x scaled by 250 and y flipped into a 200 unit box, which
 * is the whole of the transform: the diagram is schematic, not a colorimetric instrument.
 */
const LOCUS = [
  '43.5 198.9',
  '41.1 197.6',
  '36 193.4',
  '31 187.2',
  '22.8 170.5',
  '11.4 134.4',
  '2.1 80.4',
  '3.5 33.3',
  '18.6 14.7',
  '38.7 20.9',
  '57.4 32.4',
  '75.4 46.2',
  '93.3 61.2',
  '111 76.7',
  '128.1 91.9',
  '143.8 105.7',
  '156.8 117.2',
  '166.5 125.8',
  '172.9 131.5',
  '177 135.1',
  '181.5 139.1',
  '183.7 141',
].join(' L');

/**
 * One triangle per space: its three primaries in the same plotted coordinates, the CSS it
 * takes to write that space's reddest red, and where the label sits so three of them can
 * be read at once.
 */
const SPACES = [
  {
    key: 'srgb',
    label: 'sRGB',
    tri: '160 126.7 75 66.7 37.5 186.7',
    at: '79 64',
    red: 'rgb(255 0 0)',
    css: 'rgb(255 0 0)',
  },
  {
    key: 'p3',
    label: 'Display P3',
    tri: '170 128.9 66.3 46.7 37.5 186.7',
    at: '70 44',
    red: 'color(display-p3 1 0 0)',
    css: 'color(display-p3 1 0 0)',
  },
  {
    key: 'rec2020',
    label: 'Rec. 2020',
    tri: '177 135.1 42.5 22.9 32.8 189.8',
    at: '46 20',
    red: 'color(rec2020 1 0 0)',
    css: 'color(rec2020 1 0 0)',
  },
] as const;

const START = 'srgb';

/**
 * Colour gamut specimen: the visible spectrum drawn as a horseshoe with three device
 * triangles inside it, beside the reddest red each of those spaces can name. A space is
 * chosen as an absolute state and its triangle comes forward.
 *
 * The subject is the diagram. The term names the region, and the region is what the
 * triangles enclose; the CSS rows beside it are the notation and the space control is
 * instrumentation, so both stay in the context register. The reds row is captioned
 * honestly, because on an sRGB screen all three swatches are the same red: the wider two
 * have been mapped back in, which is the term doing exactly what it says.
 *
 * Only stroke weight and a row background change with the choice, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const triangles = SPACES.map(
    (space) => `
      <polygon data-part="tri-${space.key}" points="${space.tri}" fill="none"
               stroke="var(--sp-muted)" stroke-width="1" stroke-linejoin="round" opacity="0.55"></polygon>
      <text data-part="label-${space.key}" x="${space.at.split(' ')[0]}" y="${space.at.split(' ')[1]}"
            style="paint-order: stroke; stroke: rgb(255 255 255 / 0.82); stroke-width: 2.5px; fill: #23262b;
                   font-size: 9px; font-weight: 500">${space.label}</text>`,
  ).join('');

  const rows = SPACES.map(
    (space) => `
      <li class="sp-list-item" data-part="row-${space.key}" style="gap: 8px; padding: 6px 8px">
        <span class="sp-swatch" style="flex: 0 0 auto; width: 18px; height: 18px; --sp-swatch: ${space.red}"></span>
        <span class="sp-text" style="font-size: 11px; color: var(--sp-ink)">${space.css}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Gamut</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-srgb" value="srgb">sRGB</button>
            <button class="sp-segment" data-part="seg-p3" value="p3">P3</button>
            <button class="sp-segment" data-part="seg-rec2020" value="rec2020">2020</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div data-part="diagram" data-subject data-space="${START}"
               style="flex: 0 0 auto; padding: 4px; border-radius: var(--sp-radius); background: var(--sp-sunken)">
            <svg viewBox="0 0 200 200" style="display: block; width: 152px; height: 152px" aria-hidden="true">
              <clipPath id="gamut-locus"><path d="M${LOCUS} Z"></path></clipPath>
              <g clip-path="url(#gamut-locus)" style="filter: blur(15px)">
                <circle cx="184" cy="141" r="48" fill="#ff2d16"></circle>
                <circle cx="152" cy="116" r="42" fill="#ffb000"></circle>
                <circle cx="34" cy="26" r="54" fill="#12c04a"></circle>
                <circle cx="6" cy="92" r="42" fill="#06b6d4"></circle>
                <circle cx="42" cy="198" r="46" fill="#3f2fd0"></circle>
                <circle cx="112" cy="188" r="42" fill="#c026d3"></circle>
                <circle cx="78" cy="127" r="30" fill="#f6f5f0"></circle>
              </g>
              <path d="M${LOCUS} Z" fill="none" stroke="var(--sp-line)" stroke-width="1.2"></path>
              ${triangles}
            </svg>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <span class="sp-label">The reddest red each can name</span>
            <ul class="sp-list" data-part="reds">${rows}</ul>
            <p class="sp-text" style="margin: 0; font-size: 11px">If all three reds match, this
              screen is sRGB and the wider values were mapped back into it.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const diagram = part(root, 'diagram');

  const choose = (name: string) => {
    if (!SPACES.some((space) => space.key === name)) return;
    diagram.dataset.space = name;
    for (const space of SPACES) {
      const current = space.key === name;
      const tri = part(root, `tri-${space.key}`);
      tri.setAttribute('stroke', current ? 'var(--sp-ink)' : 'var(--sp-muted)');
      tri.setAttribute('stroke-width', current ? '2' : '1');
      tri.setAttribute('opacity', current ? '1' : '0.5');
      part(root, `label-${space.key}`).style.fontWeight = current ? '700' : '500';
      const row = part(root, `row-${space.key}`);
      if (current) row.setAttribute('data-selected', '');
      else row.removeAttribute('data-selected');
    }
  };
  choose(START);

  part(root, 'segmented').addEventListener('change', (event) => choose((event as CustomEvent<string>).detail));
}
