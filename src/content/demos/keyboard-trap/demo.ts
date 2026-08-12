import { flag, part } from '#src/kit/parts.ts';

/** Every stop in the page, in the order Tab would visit them. */
const PAGE_BEFORE = ['stop-home'];
const TOOLS = [
  { key: 'stop-zoom-in', label: 'Zoom in' },
  { key: 'stop-zoom-out', label: 'Zoom out' },
  { key: 'stop-reset', label: 'Reset' },
];
const INSIDE = TOOLS.map((tool) => tool.key);
const HATCH = 'stop-leave';
const PAGE_AFTER = ['stop-continue', 'stop-help'];

const CAPTIONS = {
  trapped: {
    label: 'Embedded plug-in (the mistake)',
    verdict: 'Tab cycles inside the plug-in. Continue is unreachable. WCAG 2.1.2.',
  },
  escapable: {
    label: 'Embedded plug-in (with a way out)',
    verdict: 'Escape leaves the plug-in, and Tab walks on to Continue.',
  },
} as const;

type Mode = keyof typeof CAPTIONS;

/**
 * Keyboard trap specimen: Tab walks into an embedded plug-in and then goes round its three
 * controls forever, so Continue below it is unreachable. The second state gives the same
 * plug-in the exit the criterion asks for, a visible one and a documented key, and the
 * walk leaves.
 *
 * The subject is the plug-in panel, captioned by the scenery above it as the mistake: the
 * term names the region focus cannot get out of, and pointing identify at the fix would be
 * pointing it at a different term. The page around it, the caption, and the two state
 * chips are scenery (SPEC §5).
 *
 * Nothing in this specimen is focusable, on purpose and twice over. A real trap here would
 * strand the reader who took the stage over, which is the one bug this site must not ship;
 * and the ring has to be the demo's own, because a real focusable would also be walked by
 * the stage's simulated focus (SPEC §7) and two rings would be crossing the same scene.
 * So every control in the scene is a picture of a control, the ring is the specimen's, and
 * Tab, Escape, and the chips only ever move it. The escape hatch keeps its room from mount
 * whether it is shown or not, so revealing it moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const stop = (key: string, label: string) => `<span class="sp-chip" data-part="${key}">${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-surface sp-context" style="padding: 8px; background: var(--sp-sunken)">
          <div class="sp-row">${stop('stop-home', 'Dashboard')}</div>
        </div>
        <span class="sp-label sp-context" data-part="caption" style="display: block; margin-top: 10px">${CAPTIONS.trapped.label}</span>
        <div class="sp-surface" data-part="widget" data-subject data-mode="trapped" style="margin-top: 4px; padding: 10px 12px">
          <div class="sp-row" style="gap: 6px">
            ${TOOLS.map((tool) => stop(tool.key, tool.label)).join('')}
          </div>
          <div class="sp-row" style="height: 25px; margin-top: 6px; gap: 8px">
            <span class="sp-row" data-part="hatch" style="gap: 8px" hidden>
              ${stop(HATCH, 'Leave chart')}
              <span class="sp-text" style="font-size: 11px">Escape leaves as well</span>
            </span>
          </div>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px; background: var(--sp-sunken)">
          <div class="sp-row" style="gap: 6px">${stop('stop-continue', 'Continue')}${stop('stop-help', 'Help')}</div>
        </div>
        <p class="sp-text sp-context" data-part="verdict" style="margin: 10px 0 0; font-size: 11px; height: 18px; white-space: nowrap">
          ${CAPTIONS.trapped.verdict}
        </p>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <span class="sp-label">The plug-in</span>
          <div class="sp-row" style="gap: 6px">
            <span class="sp-chip" data-part="mode-trapped" data-selected>As shipped</span>
            <span class="sp-chip" data-part="mode-escapable">With a way out</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const widget = part(root, 'widget');
  const hatch = part(root, 'hatch');
  const caption = part(root, 'caption');
  const verdict = part(root, 'verdict');
  const chips = { trapped: part(root, 'mode-trapped'), escapable: part(root, 'mode-escapable') };

  let mode: Mode = 'trapped';
  let at = 'stop-home';

  const order = () => [...PAGE_BEFORE, ...INSIDE, ...(mode === 'escapable' ? [HATCH] : []), ...PAGE_AFTER];

  const ring = (key: string) => {
    at = key;
    for (const el of root.querySelectorAll('[data-part]')) flag(el, 'data-sim-focus', el.getAttribute('data-part') === key);
  };

  const setMode = (next: Mode) => {
    mode = next;
    widget.dataset.mode = next;
    hatch.hidden = next === 'trapped';
    caption.textContent = CAPTIONS[next].label;
    verdict.textContent = CAPTIONS[next].verdict;
    flag(chips.trapped, 'data-selected', next === 'trapped');
    flag(chips.escapable, 'data-selected', next === 'escapable');
    // The hatch cannot keep a ring it is about to stop showing.
    if (next === 'trapped' && at === HATCH) ring('stop-reset');
  };

  ring('stop-home');

  // Each chip reaches its own state rather than flipping the other's (SPEC §8).
  chips.trapped.addEventListener('click', () => setMode('trapped'));
  chips.escapable.addEventListener('click', () => setMode('escapable'));
  // The visible exit is the other half of the fix: pointing at it works in both registers.
  part(root, HATCH).addEventListener('click', () => ring('stop-continue'));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      // The trap: inside the plug-in, the next stop is always another one of its own.
      if (mode === 'trapped' && INSIDE.includes(at)) {
        ring(INSIDE[(INSIDE.indexOf(at) + 1) % INSIDE.length] ?? at);
        return;
      }
      const stops = order();
      ring(stops[(stops.indexOf(at) + 1) % stops.length] ?? at);
      return;
    }
    // Undocumented and unhandled in the shipped state, which is the whole of the failure.
    if (event.key === 'Escape' && mode === 'escapable' && (INSIDE.includes(at) || at === HATCH)) ring('stop-continue');
  });
}
