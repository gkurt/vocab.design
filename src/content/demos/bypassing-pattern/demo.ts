import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localBox } from '#src/kit/measure.ts';

/** The page under the trace, at a size the demo states rather than measures. */
const PAGE_W = 444;
const PAGE_H = 186;

type Mode = 'repeated' | 'front';

const ITEMS: Record<Mode, [string, string][]> = {
  repeated: [
    ['How to configure ', 'billing alerts'],
    ['How to configure ', 'single sign-on'],
    ['How to configure ', 'webhook retries'],
    ['How to configure ', 'audit log export'],
    ['How to configure ', 'IP allow lists'],
  ],
  front: [
    ['Billing alerts', ': how to configure'],
    ['Single sign-on', ': how to configure'],
    ['Webhook retries', ': how to configure'],
    ['Audit log export', ': how to configure'],
    ['IP allow lists', ': how to configure'],
  ],
};

const NOTES: Record<Mode, string> = {
  repeated:
    'Every line opens with the same three words, so the eye jumps past them: the first fixation of each line lands mid line, on the word that differs.',
  front: 'Front-loaded, the word that differs comes first, and the fixations return to a flush column at the left edge.',
};

/**
 * Bypassing pattern specimen: a list of guides whose items all begin the same way, with the
 * fixation trace drawn where the eye actually starts each line.
 *
 * The subject is the drawn trace, the decision the F pattern and Z pattern specimens made:
 * the term names where fixations land rather than a component, so the narrowest element it
 * names is the figure tracing them, and the list underneath is the scene (SPEC §5). The
 * front-loaded state is the counter-example the trace itself passes through, so the honest
 * condition lives in `data-pose` on the trace and the mount state satisfies it: identify
 * refuses to pose the fixed list and plays on. The trace takes no pointer events, so a
 * reader's click reaches the list beneath.
 */
export function mount(root: HTMLElement): void {
  const row = (lead: string, tail: string) => `
    <div data-part="row" style="position: relative; display: flex; align-items: center; height: 24px; font-size: 13px; white-space: nowrap">
      <span data-part="lead">${lead}</span><span data-part="tail">${tail}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">List copy</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Wording" data-term="repeated" data-part="switcher" data-value="repeated">
            <button class="sp-segment" type="button" data-part="seg-same" value="repeated">same opening</button>
            <button class="sp-segment" type="button" data-part="seg-front" value="front">front-loaded</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="padding: 14px 16px">
              <div class="sp-row sp-row--between" style="margin-bottom: 8px">
                <span class="sp-label">Configuration guides</span>
                <span class="sp-label">5 articles</span>
              </div>
              <div data-part="list">
                ${ITEMS.repeated.map(([lead, tail]) => row(lead, tail)).join('')}
              </div>
            </div>
            <div
              data-part="skipped"
              style="position: absolute; pointer-events: none; border: 1px dashed var(--sp-warn); border-radius: 6px"
            >
              <span class="sp-label" style="position: absolute; left: 0; right: 0; bottom: -18px; text-align: center">skipped</span>
            </div>
            <div data-part="trace" data-subject data-pose="[data-mode=repeated]" data-mode="repeated" style="position: absolute; pointer-events: none"></div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 40px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const list = part(root, 'list');
  const trace = part(root, 'trace');
  const skipped = part(root, 'skipped');
  const readout = part(root, 'readout');

  /**
   * The trace is measured rather than stated: the fixations start where the differing words
   * start, and only the rendered text knows where that is. Nothing measured here is a
   * transitioned property (a static span's own box), and the read happens after the rows
   * carry the text being measured, never after a write to something in flight.
   */
  const draw = (mode: Mode) => {
    const leads = partsOf(list, 'lead');
    const tails = partsOf(list, 'tail');
    const spans = mode === 'repeated' ? tails : leads;

    const bars = spans.map((span, index) => {
      const box = localBox(span, page);
      const rowBox = localBox(tails[index] ?? span, page);
      return { left: box.left, width: box.width, mid: rowBox.top + rowBox.height / 2 };
    });

    const left = Math.min(...bars.map((b) => b.left));
    const right = Math.max(...bars.map((b) => b.left + b.width));
    const top = Math.min(...bars.map((b) => b.mid));
    const bottom = Math.max(...bars.map((b) => b.mid));

    trace.style.left = `${left - 7}px`;
    trace.style.top = `${top - 9}px`;
    trace.style.width = `${right - left + 14}px`;
    trace.style.height = `${bottom - top + 18}px`;
    trace.innerHTML = bars
      .map(({ left: barLeft, width, mid }) => {
        const x = barLeft - (left - 7);
        const y = mid - (top - 9);
        return `
          <span style="position: absolute; left: ${x}px; top: ${y - 4.5}px; width: ${width}px; height: 9px; border-radius: 5px; background: var(--sp-accent); opacity: 0.34"></span>
          <span style="position: absolute; left: ${x - 5}px; top: ${y - 5}px; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent)"></span>`;
      })
      .join('');

    // The band the eye jumps over: everything from the text's own left edge to the first
    // fixation. Nothing is skipped once the differing word comes first.
    const textLeft = leads[0] ? localBox(leads[0], page).left : 0;
    flag(skipped, 'hidden', mode !== 'repeated');
    skipped.style.left = `${textLeft - 6}px`;
    skipped.style.top = `${top - 13}px`;
    skipped.style.width = `${left - textLeft + 2}px`;
    skipped.style.height = `${bottom - top + 26}px`;
  };

  const apply = (mode: Mode) => {
    list.innerHTML = ITEMS[mode].map(([lead, tail]) => row(lead, tail)).join('');
    trace.dataset.mode = mode;
    readout.textContent = NOTES[mode];
    draw(mode);
  };

  // Each segment names a version of the copy, so the switch lands on that version rather
  // than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));

  apply('repeated');
}
