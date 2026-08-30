import { flag, part } from '#src/kit/parts.ts';

/*
 * The expansions are revealed on the page rather than left to the `title`
 * attribute. A native tooltip cannot be summoned by the attract player, cannot be
 * reached by keyboard or touch, and is announced inconsistently, so a specimen
 * that demonstrated it would be demonstrating a thing most readers never get. The
 * `title` stays on each abbr because it is the correct markup; the visible panel
 * is what the term is actually about.
 */
const SHORTENINGS = [
  { part: 'abbr-dr', short: 'Dr.', title: 'Doctor' },
  { part: 'abbr-svg', short: 'SVG', title: 'Scalable Vector Graphics' },
  { part: 'abbr-fri', short: 'Fri.', title: 'Friday' },
];

/** Room for every expansion from mount, so revealing them moves nothing (SPEC §5). */
const PANEL = 68;

/**
 * Abbreviation specimen: one sentence carrying three shortened forms, each marked
 * up and dotted-underlined, with their expansions written out beneath it. Each
 * expansion row used to carry a note on the kind of shortening it was ("an
 * initialism, read letter by letter"), which is the article talking inside a
 * panel a product would only ever fill with expansions, so the notes are gone
 * and the rows print the expansion alone. Show and Hide are separate controls
 * rather than one toggle, so a pass picked up at any point reaches a stated
 * state rather than flipping whatever it found (SPEC §8).
 *
 * The subject is the abbreviation element itself, the narrowest thing the word
 * names. It is an abbreviation whether the panel is open or shut, so it is honest
 * at every resting state and needs no `data-pose`. The sentence around it, the
 * controls and the panel are the demo's own instrumentation and stay in the
 * context register.
 */
export function mount(root: HTMLElement): void {
  const abbr = ({ part: name, short, title }: (typeof SHORTENINGS)[number], subject: boolean) =>
    `<abbr data-part="${name}"${subject ? ' data-subject' : ''} title="${title}"
           style="text-decoration: underline dotted; text-underline-offset: 3px; text-decoration-thickness: 2px">${short}</abbr>`;

  const [dr, svg, fri] = SHORTENINGS;
  if (!dr || !svg || !fri) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Shortened forms</span>
          <span class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--sm" data-part="show" type="button">Show expansions</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="hide" type="button">Hide</button>
          </span>
        </div>
        <p data-part="sentence" style="margin: 10px 0 0; font-size: 15px; line-height: 1.55">
          ${abbr(dr, false)} Vance wants the chart as an ${abbr(svg, true)} by ${abbr(fri, false)},
          so the print file can be checked over the weekend.
        </p>
        <div class="sp-stack sp-context" data-part="expansions"
             style="gap: 4px; height: ${PANEL}px; margin-top: 10px; opacity: 0; visibility: hidden;
                    transition: opacity 0.2s, visibility 0.2s">
          ${SHORTENINGS.map(
            (s) => `
              <span class="sp-row" style="gap: 8px">
                <span class="sp-label" style="width: 34px; color: var(--sp-ink)">${s.short}</span>
                <span class="sp-text" style="font-size: 12px">${s.title}</span>
              </span>`,
          ).join('')}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          The expansion is written on the page, not left to a tooltip: a title attribute is unreachable
          by keyboard, unreachable by touch, and read out inconsistently.
        </p>
      </div>
    </div>
  `;

  const panel = part(root, 'expansions');
  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    panel.style.opacity = open ? '1' : '0';
    panel.style.visibility = open ? 'visible' : 'hidden';
  };

  part(root, 'show').addEventListener('click', () => setOpen(true));
  part(root, 'hide').addEventListener('click', () => setOpen(false));
}
