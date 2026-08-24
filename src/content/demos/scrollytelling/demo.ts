import { part } from '#src/kit/parts.ts';

/** Where the step boundary sits in the scroller: a line the reader arrives at, not a pixel count. */
const TRIGGER = 0.42;

const STEPS = [
  {
    heading: 'A working harbour',
    lines: ['94%', '88%', '76%'],
    year: '1960',
    depth: '8.4 m',
    note: 'Dredged twice a year, and deep enough for the timber boats.',
  },
  {
    heading: 'The river changes course',
    lines: ['92%', '84%', '70%'],
    year: '1980',
    depth: '6.1 m',
    note: 'Silt arrives from upstream faster than the dredger can lift it.',
  },
  {
    heading: 'The dredger is retired',
    lines: ['90%', '80%', '74%'],
    year: '2000',
    depth: '3.9 m',
    note: 'One season without dredging costs more depth than the decade before.',
  },
  {
    heading: 'A tidal pool',
    lines: ['96%', '82%', '68%'],
    year: '2020',
    depth: '1.7 m',
    note: 'Small craft only, and only around high water.',
  },
] as const;

const BARS = [
  ['1960', 100],
  ['1980', 73],
  ['2000', 46],
  ['2020', 20],
] as const;

const bars = BARS.map(
  ([year, value], i) => `
    <div class="sp-stack" data-part="bar-${i + 1}" style="gap: 3px">
      <div class="sp-row sp-row--between">
        <span class="sp-label" style="font-size: 10px">${year}</span>
        <span class="sp-label" style="font-size: 10px">${(value * 0.084).toFixed(1)} m</span>
      </div>
      <div class="sp-progress" style="--sp-value: ${value}%"><div class="sp-progress-fill"></div></div>
    </div>`,
).join('');

const steps = STEPS.map(
  (step, i) => `
    <div class="sp-stack" data-part="step-${i + 1}" style="gap: 7px; height: 128px; justify-content: center">
      <span class="sp-heading" style="font-size: 14px">${step.heading}</span>
      ${step.lines.map((w) => `<span class="sp-line" style="width: ${w}"></span>`).join('')}
      <span class="sp-text" style="font-size: 11px">${step.note}</span>
    </div>`,
).join('');

/**
 * Scrollytelling specimen: one graphic held beside the prose while four steps of the story
 * scroll past it, each step changing what the graphic shows. The chart is the same chart
 * throughout; what the reader arriving at a paragraph changes is which decade it is reading
 * out, which is the grammar the pattern is named for.
 *
 * The subject is the pinned graphic. The prose steps are what moves while it does not, and
 * the step readout in the bar names the state out loud. The graphic sticks for the whole of
 * the story rather than for a bounded stretch, so it is never doing anything but
 * scrollytelling and needs no `data-pose` (SPEC §6): the bounded pin, with its before and
 * after, is the neighbouring term.
 *
 * The step boundary is a line across the scroller, not a scroll distance, so the story reads
 * backwards through exactly the boundaries it read forwards through. Everything is computed
 * from the scroller's own position in a scroll handler, so there is no playback and no timer.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">How the harbour silted up</span>
          <span class="sp-text" data-part="readout" style="width: 74px; text-align: right; white-space: nowrap">Step 1 of 4</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto; min-height: 0">
          <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px">
            <div style="flex: 0 0 auto; width: 176px; align-self: stretch">
              <figure
                data-part="graphic"
                data-subject
                data-step="1"
                style="position: sticky; top: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;
                       padding: 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
              >
                <span class="sp-label" style="font-size: 10px">Depth at the quay</span>
                <div class="sp-row" style="align-items: baseline; gap: 6px">
                  <span class="sp-heading" data-part="depth" style="font-size: 24px">8.4 m</span>
                  <span class="sp-text" data-part="year" style="font-size: 12px">1960</span>
                </div>
                <div class="sp-stack" style="gap: 7px">${bars}</div>
              </figure>
            </div>
            <div class="sp-stack sp-context sp-grow" style="gap: 12px">
              ${steps}
              <!-- Room past the last step, so the final paragraph can reach the boundary line
                   the way every other one does. -->
              <div style="height: 110px"></div>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" style="font-size: 11px">The chart stays; the paragraph the reader has reached chooses what it reads out.</span>
    </div>
  `;

  const page = part(root, 'page');
  const graphic = part(root, 'graphic');
  const depth = part(root, 'depth');
  const year = part(root, 'year');
  const readout = part(root, 'readout');
  const stepEls = STEPS.map((_, i) => part(root, `step-${i + 1}`));
  const barEls = BARS.map((_, i) => part(root, `bar-${i + 1}`));

  let shown = 0;

  const sync = () => {
    // The step the reader has arrived at: the last one whose top has crossed the line.
    // Entirely in client pixels, both sides: clientHeight is the specimen's own scale
    // and a rect is the card's, and a preview shows this specimen at half size.
    const pageBox = page.getBoundingClientRect();
    const line = pageBox.top + pageBox.height * TRIGGER;
    let current = 1;
    for (const [i, el] of stepEls.entries()) if (el.getBoundingClientRect().top <= line) current = i + 1;

    if (shown === current) return;
    shown = current;
    const step = STEPS[current - 1] ?? STEPS[0];
    graphic.dataset.step = String(current);
    depth.textContent = step.depth;
    year.textContent = step.year;
    readout.textContent = `Step ${current} of ${STEPS.length}`;
    // The decade under discussion keeps the accent; the rest of the chart goes quiet.
    for (const [i, bar] of barEls.entries()) {
      if (i === current - 1) bar.style.removeProperty('--sp-accent');
      else bar.style.setProperty('--sp-accent', 'var(--sp-line)');
    }
  };

  page.addEventListener('scroll', sync);
  sync();
}
