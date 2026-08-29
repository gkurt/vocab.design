import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Stop = { key: string; label: string; forced: number };

/** Document order. `forced` is the tabindex the broken build puts on each one. */
const STOPS: Stop[] = [
  { key: 'search', label: 'Site search', forced: 0 },
  { key: 'name', label: 'Full name', forced: 3 },
  { key: 'email', label: 'Email', forced: 1 },
  { key: 'phone', label: 'Phone', forced: 2 },
];

const CAPTION = {
  forced: 'Three fields carry tabindex 1 to 3, so Tab visits them before the site search above them. This is the mistake.',
  source: 'Every control is tabindex 0, so the sequence is the source order and the search box comes first again.',
} as const;

type Mode = keyof typeof CAPTION;

const BADGE =
  'display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;' +
  'border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 11px; font-weight: 600';

/**
 * Positive tabindex specimen: a contact form whose three fields carry tabindex 3, 1, and 2,
 * with the site search that sits above them in the markup. The walk is stepped by a labeled
 * control rather than by Tab, because the stage's own simulated focus walks the source order
 * (SPEC §7) and the source order is precisely what this term overrides; the demo therefore
 * owns the ring and computes the sequence the way a browser does, positives in ascending
 * order first and everything else after them.
 *
 * The subject is the form carrying the attributes, and the term is the mistake, so the
 * broken build is the resting state and the caption says so. The fixed build is a state the
 * subject itself passes through, so the honest condition is declared in `data-pose` and the
 * mount state satisfies it: identify refuses to ring the version that has been repaired
 * (SPEC §6). The search field, the order list, the step control, and the caption are scenery
 * (SPEC §5).
 *
 * The badges and the list are recomputed rather than written out, so they cannot claim an
 * order the attributes do not produce. Every row holds a fixed height and the list a fixed
 * number of lines, so switching builds moves nothing (SPEC §5). Stepping clamps at the last
 * stop instead of wrapping, and each segment reaches its own build, so a pass joined halfway
 * still ends where a whole one does (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const field = (stop: Stop) => `
    <div class="sp-row" data-part="row-${stop.key}" style="gap: 6px; height: 30px">
      <span aria-hidden="true" data-part="badge-${stop.key}" style="${BADGE}"></span>
      <label class="sp-label" for="vd-pt-${stop.key}" style="flex: 0 0 56px">${stop.label}</label>
      <input class="sp-input sp-grow" id="vd-pt-${stop.key}" data-part="stop-${stop.key}" autocomplete="off" />
    </div>`;

  const listLine = (stop: Stop) => `
    <div class="sp-row" data-part="line-${stop.key}"
         style="gap: 6px; height: 20px; padding: 0 4px; margin: 0 -4px; border-radius: 4px">
      <span data-part="rank-${stop.key}" class="sp-text sp-text--ink"
            style="flex: 0 0 12px; font-size: 11px; font-weight: 600"></span>
      <span class="sp-text sp-grow" style="font-size: 11px; white-space: nowrap">${stop.label}</span>
      <span class="sp-text" data-part="attr-${stop.key}" style="font-size: 10px; white-space: nowrap"></span>
    </div>`;

  const [searchStop, ...formStops] = STOPS;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="forced" data-axis="Built with" data-term="forced">
            <button class="sp-segment" data-part="seg-forced" value="forced">tabindex 1 to 3</button>
            <button class="sp-segment" data-part="seg-source" value="source">tabindex 0</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 12px; align-items: flex-start">
          <div class="sp-grow">
            <div class="sp-context">${searchStop ? field(searchStop) : ''}</div>
            <div class="sp-surface" data-part="form" data-subject data-pose="[data-mode=forced]" data-mode="forced"
                 style="margin-top: 8px; padding: 10px 12px">
              <span class="sp-label">Contact form</span>
              <div class="sp-stack" style="margin-top: 6px; gap: 6px">${formStops.map(field).join('')}</div>
            </div>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 160px; padding: 10px 12px">
            <span class="sp-label">Tab visits</span>
            <div style="margin-top: 6px">${STOPS.map(listLine).join('')}</div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="next"
                    style="margin-top: 8px; width: 100%">Next stop</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-case="forced"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${CAPTION.forced}</p>
      </div>
    </div>
  `;

  const form = part(root, 'form');
  const caption = part(root, 'caption');

  let mode: Mode = 'forced';
  let at = 0;

  /** The sequence a browser builds: positives in ascending order, then everything else. */
  const sequence = (): Stop[] => {
    if (mode === 'source') return STOPS;
    const positive = STOPS.filter((s) => s.forced > 0).sort((a, b) => a.forced - b.forced);
    return [...positive, ...STOPS.filter((s) => s.forced === 0)];
  };

  const draw = () => {
    const order = sequence();
    for (const stop of STOPS) {
      const rank = order.indexOf(stop) + 1;
      const value = mode === 'forced' ? stop.forced : 0;
      part(root, `badge-${stop.key}`).textContent = String(rank);
      part(root, `rank-${stop.key}`).textContent = String(rank);
      part(root, `attr-${stop.key}`).textContent = `tabindex ${value}`;
      // The real attribute, so the specimen's own source says what the readout says.
      part(root, `stop-${stop.key}`).setAttribute('tabindex', String(value));
      const current = order[at] === stop;
      const line = part(root, `line-${stop.key}`);
      flag(line, 'data-current', current);
      line.style.background = current ? 'var(--sp-accent-soft)' : 'transparent';
      flag(part(root, `stop-${stop.key}`), 'data-sim-focus', current);
    }
  };

  const apply = (next: Mode) => {
    mode = next;
    at = 0;
    form.dataset.mode = next;
    caption.dataset.case = next;
    caption.textContent = CAPTION[next];
    draw();
  };

  apply('forced');

  part(root, 'next').addEventListener('click', () => {
    at = Math.min(at + 1, STOPS.length - 1);
    draw();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'source' ? 'source' : 'forced');
  });
}
