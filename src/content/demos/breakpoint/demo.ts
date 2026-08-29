import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Shape = 'stacked' | 'sidebar' | 'three';

/** This specimen's own scale: a simulated viewport width, the token that starts there, and the shape it buys. */
const STEPS: Record<string, { width: number; shape: Shape; note: string }> = {
  sm: { width: 288, shape: 'stacked', note: 'below 360px' },
  md: { width: 384, shape: 'sidebar', note: '360px and up' },
  lg: { width: 456, shape: 'three', note: '440px and up' },
};

const SHAPES: Record<Shape, { areas: string; columns: string; rows: string; aside: boolean; navRow: boolean }> = {
  stacked: { areas: "'nav' 'main'", columns: '1fr', rows: 'auto 1fr', aside: false, navRow: true },
  sidebar: { areas: "'nav main'", columns: '104px 1fr', rows: '1fr', aside: false, navRow: false },
  three: { areas: "'nav main aside'", columns: '96px 1fr 96px', rows: '1fr', aside: true, navRow: false },
};

/**
 * Breakpoint specimen: one layout region inside a simulated viewport whose width steps
 * between three named widths, re-arranging at each. The subject is the region that
 * responds, because the breakpoint is a rule about that region's shape: the viewport it
 * sits in, the width switcher, and the readout are the scene it is read against and
 * carry the context register (SPEC §5).
 *
 * The thresholds are this specimen's own (the real scales are 640/768/1024 and would not
 * fit in a stage), and the viewport really is the width its segment names, so nothing
 * here is drawn to scale from a number it is not.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="sm" data-axis="Width">
            <button class="sp-segment" type="button" data-part="seg-sm" value="sm">288px</button>
            <button class="sp-segment" type="button" data-part="seg-md" value="md">384px</button>
            <button class="sp-segment" type="button" data-part="seg-lg" value="lg">456px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center">
          <div
            data-part="viewport"
            data-bp="sm"
            style="width: ${STEPS.sm?.width}px; height: 176px; padding: 8px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              class="sp-grid"
              data-part="region"
              data-subject
              data-shape="stacked"
              style="height: 100%; grid-template-areas: ${SHAPES.stacked.areas}; grid-template-columns: ${SHAPES.stacked.columns}; grid-template-rows: ${SHAPES.stacked.rows}; padding: 8px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <nav data-part="nav" aria-label="Sections" style="grid-area: nav; min-width: 0">
                <ul class="sp-nav" data-part="nav-list" style="flex-direction: row">
                  <li><span class="sp-nav-item" data-current>Tides</span></li>
                  <li><span class="sp-nav-item">Winds</span></li>
                  <li><span class="sp-nav-item">Charts</span></li>
                </ul>
              </nav>
              <main data-part="main" style="grid-area: main; min-width: 0; padding: 2px 2px 0">
                <div class="sp-row sp-row--between">
                  <span class="sp-heading">Harbour log</span>
                  <span class="sp-label" data-part="token">sm</span>
                </div>
                <div class="sp-stack" style="margin-top: 10px">
                  <div class="sp-line" style="width: 96%"></div>
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 92%"></div>
                  <div class="sp-line" style="width: 62%"></div>
                </div>
              </main>
              <aside data-part="aside" hidden style="grid-area: aside; min-width: 0; padding: 2px 0 0">
                <span class="sp-label">Aside</span>
                <div class="sp-stack" style="margin-top: 10px">
                  <div class="sp-line" style="width: 84%"></div>
                  <div class="sp-line" style="width: 58%"></div>
                </div>
              </aside>
            </div>
          </div>
          <div class="sp-row sp-context" style="height: 20px; margin-top: 10px">
            <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const region = part(root, 'region');
  const navList = part(root, 'nav-list');
  const aside = part(root, 'aside');
  const token = part(root, 'token');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const step = STEPS[key];
    if (!step) return;
    const shape = SHAPES[step.shape];
    viewport.style.width = `${step.width}px`;
    viewport.dataset.bp = key;
    region.dataset.shape = step.shape;
    region.style.gridTemplateAreas = shape.areas;
    region.style.gridTemplateColumns = shape.columns;
    region.style.gridTemplateRows = shape.rows;
    navList.style.flexDirection = shape.navRow ? 'row' : 'column';
    aside.hidden = !shape.aside;
    token.textContent = key;
    readout.textContent = `${step.width}px · ${key} · ${step.note}`;
  };

  // Each segment names a width, so the switch lands on that width rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('sm');
}
