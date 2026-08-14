const SAMPLE = 'Handgloves 0123';
/** Two strings, one wide and one metric-sensitive, so a match is not a coincidence. */
const PROBES = ['Handgloves 0123 Hamburgefonstiv', 'illiillmm'];
const PROBE_SIZE = 40;

/** The names worth testing, most specific first: Segoe UI Variable before Segoe UI. */
const NAMES = [
  { label: 'SF Pro Text', css: "'SF Pro Text'" },
  { label: 'Segoe UI Variable Text', css: "'Segoe UI Variable Text'" },
  { label: 'Segoe UI', css: "'Segoe UI'" },
  { label: 'Roboto', css: 'Roboto' },
  { label: 'Cantarell', css: 'Cantarell' },
  { label: 'Ubuntu', css: 'Ubuntu' },
  { label: 'Helvetica Neue', css: "'Helvetica Neue'" },
];

/** What the platform maps the keyword onto, which the page can state but not verify. */
const PLATFORMS: [string, string][] = [
  ['Apple platforms', 'SF Pro'],
  ['Windows 11', 'Segoe UI Variable'],
  ['Android', 'Roboto'],
  ['Linux desktops', 'whatever the system is configured with'],
];

/**
 * What `system-ui` resolved to here, named only when the measurement says so.
 *
 * The keyword is not readable: `getComputedStyle` hands back the keyword, not the
 * face behind it. What is readable is the drawing, so each candidate is set at
 * the same size and measured against the same two strings. A family the machine
 * does not have falls back to the browser's default face, which is what the
 * sentinel measures, so those are excluded before any match is claimed.
 */
function resolvedName(): string | undefined {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return undefined;
  const widths = (family: string) =>
    PROBES.map((probe) => {
      ctx.font = `${PROBE_SIZE}px ${family}`;
      return Math.round(ctx.measureText(probe).width * 100);
    }).join('/');

  const target = widths('system-ui');
  const missing = widths('__no_such_family__');
  if (target === missing) return undefined;
  return NAMES.find(({ css }) => {
    const w = widths(css);
    return w !== missing && w === target;
  })?.label;
}

/**
 * System font specimen: one line asking for the platform's own interface face,
 * a readout naming what that turned out to be on the machine reading the page,
 * and the table of what the keyword means elsewhere.
 *
 * The subject is the specimen line. The term names the typeface, so the sample
 * set in it is the narrowest thing that is one; the readout and the table are
 * the demo's own instrumentation (SPEC §5) and stay in the context register.
 * The sample sits in a box of fixed height, since a face two platforms away is
 * a different width and must not move anything under it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const name = resolvedName();
  const verdict = name
    ? `Measured on this machine: system-ui draws exactly as ${name}.`
    : 'Measured on this machine: system-ui matched none of the names below, so the page cannot name it.';

  const rows = PLATFORMS.map(
    ([platform, face]) => `<tr data-part="row-${platform.split(' ')[0]?.toLowerCase()}"><td>${platform}</td><td>${face}</td></tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-family: system-ui</span>
          <span class="sp-label">nothing downloaded</span>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: 44px">
          <span data-part="specimen" data-subject
                style="font-family: system-ui, sans-serif; font-size: 30px; line-height: 1.2">${SAMPLE}</span>
        </div>
        <div class="sp-row sp-context" style="height: 20px">
          <span class="sp-text" data-part="readout">${verdict}</span>
        </div>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <table class="sp-table sp-context" data-part="platforms" style="--sp-cell-pad: 4px 8px">
          <thead>
            <tr><th>platform</th><th>the keyword resolves to</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}
