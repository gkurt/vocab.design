import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

const PANEL = 144;
const SETTLE_MS = 150;

const PANELS = [
  { no: '01', title: 'Cormorant Bay', lines: ['94%', '86%', '78%'] },
  { no: '02', title: 'Salt Pier', lines: ['88%', '92%', '70%'] },
  { no: '03', title: 'Longstone Light', lines: ['91%', '74%', '84%'] },
  { no: '04', title: 'Bell Rock', lines: ['82%', '90%', '66%'] },
] as const;

const NOTE = {
  hijacked: 'The wheel is answered with a fixed distance the page chose, whatever was asked for.',
  native: 'The counter-example: the browser keeps the gesture and moves exactly as far as it was pushed.',
} as const;

/**
 * Scroll hijacking specimen: a section that answers the wheel with a distance of its own.
 * A small turn and a large turn both advance exactly one panel, which the panel counter and
 * the dots show as it happens. The segmented control puts the browser's own scrolling back
 * for comparison.
 *
 * A line above the region used to narrate the arithmetic ("Hijacked: one turn of the wheel
 * moves one whole panel.", then how many pixels the wheel had asked for). No reading app
 * prints that, and the strip's verdict already states which answer the region is giving, so
 * the line went and the region's `data-obeyed` carries the claim for the script.
 *
 * Here the term *is* the dishonest behaviour, so the specimen mounts hijacked and the
 * subject carries `data-pose` for that condition: identify must never ring the fixed
 * version, which is a picture of a different word (SPEC §6). Native is captioned as the
 * counter-example. The subject is the hijacked region itself, the narrowest element the
 * term names; the panel dots and the verdict are scenery (SPEC §5).
 *
 * The override runs on the region's own `scroll` event, on a settle beat taken from the
 * stage's clock (SPEC §6), which is also the shape a real hijack has: whatever the reader
 * asked for is thrown away once the gesture stops and replaced with the page's number.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const panels = PANELS.map(
    ({ no, title, lines }, index) => `
      <section
        data-part="panel-${index}"
        style="height: ${PANEL}px; display: flex; flex-direction: column; gap: 8px; padding: 14px 16px;
               border-bottom: ${index === PANELS.length - 1 ? '0' : '1px solid var(--sp-line)'}"
      >
        <span class="sp-label" style="font-size: 11px">${no} / 04</span>
        <span class="sp-heading" style="font-size: 14px">${title}</span>
        <div class="sp-stack" style="gap: 7px">
          ${lines.map((width) => `<span class="sp-line" style="width: ${width}"></span>`).join('')}
        </div>
      </section>`,
  ).join('');

  const dots = PANELS.map((_, index) => `<span data-part="dot-${index}" style="width: 7px; height: 7px; border-radius: 50%"></span>`).join(
    '',
  );

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Field Guide</span>
          <span class="sp-label" style="font-size: 11px">Chapter two</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div
            class="sp-scroll"
            data-part="region"
            data-subject
            data-mode="hijacked"
            data-pose="[data-mode=hijacked]"
            data-panel="0"
            style="flex: 0 0 auto; height: ${PANEL}px; overflow-x: hidden; background: var(--sp-surface); border-radius: var(--sp-radius)"
          >${panels}</div>

          <div class="sp-row sp-context" data-part="dots" style="flex: 0 0 auto; height: 12px; gap: 6px; justify-content: center">${dots}</div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 282px; font-size: 11px">${NOTE.hijacked}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="hijacked" data-axis="Scrolling" data-term="hijacked">
          <button class="sp-segment" data-part="mode-hijacked" value="hijacked" style="padding: 5px 10px">Hijacked</button>
          <button class="sp-segment" data-part="mode-native" value="native" style="padding: 5px 10px">Native</button>
        </sp-segmented>
      
    </div>
  `;

  const region = part(root, 'region');
  const note = part(root, 'note');
  const dotEls = PANELS.map((_, index) => part(root, `dot-${index}`));

  /** Where the region was left when the last gesture finished, which is what a new one is measured from. */
  let restTop = 0;
  let settleId: number | undefined;
  /** The scroll event our own correction causes is ours, not a new gesture. */
  let ours = false;

  const setPanel = (index: number) => {
    region.dataset.panel = String(index);
    for (const [i, dot] of dotEls.entries()) {
      flag(dot, 'data-current', i === index);
      dot.style.background = i === index ? 'var(--sp-ink)' : 'var(--sp-line)';
    }
  };

  const moveTo = (top: number) => {
    if (Math.abs(region.scrollTop - top) < 0.5) return;
    ours = true;
    region.scrollTop = top;
  };

  const nearestPanel = () => Math.max(0, Math.min(PANELS.length - 1, Math.round(region.scrollTop / PANEL)));

  const settle = () => {
    settleId = undefined;
    const asked = Math.round(region.scrollTop - restTop);
    if (asked === 0) return;
    if (region.dataset.mode === 'hijacked') {
      const from = Number(region.dataset.panel ?? '0');
      const next = Math.max(0, Math.min(PANELS.length - 1, from + (asked > 0 ? 1 : -1)));
      moveTo(next * PANEL);
      restTop = next * PANEL;
      setPanel(next);
      region.dataset.obeyed = 'false';
      return;
    }
    restTop = region.scrollTop;
    setPanel(nearestPanel());
    region.dataset.obeyed = 'true';
  };

  region.addEventListener('scroll', () => {
    if (ours) {
      ours = false;
      return;
    }
    clock.clearTimeout(settleId);
    settleId = clock.setTimeout(settle, SETTLE_MS);
  });

  // Each segment reaches its own state and never flips the other's (SPEC §8). Both start
  // from a whole panel, so the comparison is between two answers to the same gesture.
  part(root, 'mode').addEventListener('change', (event) => {
    const next = (event as CustomEvent<string>).detail === 'native' ? 'native' : 'hijacked';
    clock.clearTimeout(settleId);
    settleId = undefined;
    region.dataset.mode = next;
    delete region.dataset.obeyed;
    const index = nearestPanel();
    moveTo(index * PANEL);
    restTop = index * PANEL;
    setPanel(index);
    note.textContent = NOTE[next];
  });

  setPanel(0);
}
