import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** This specimen's own scale: a simulated viewport width and the arrangement it has earned. */
const STEPS: Record<string, { width: number; areas: string; columns: string; detail: boolean; related: boolean }> = {
  sm: { width: 258, areas: "'main'", columns: '1fr', detail: false, related: false },
  md: { width: 348, areas: "'main detail'", columns: '1fr 104px', detail: true, related: false },
  lg: { width: 438, areas: "'main detail related'", columns: '1fr 104px 92px', detail: true, related: true },
};

/** Where each rule starts applying, in this specimen's own scale. */
const MD_FROM = 340;
const LG_FROM = 420;

/**
 * Mobile first specimen: one stylesheet in source order beside the layout it produces.
 * The base rule carries no query and is always in force, so the narrow state is the
 * complete one; each wider state arrives as a `min-width` block that only adds a region.
 *
 * The subject is the rule list rather than the page, because mobile first is a claim
 * about the order the rules are written in, not about the result. A ring around the page
 * would say the layout is responsive, which is a different word (SPEC §5). The simulated
 * viewport, the page inside it and the width switcher are the result the rules are read
 * against, so they carry the context register.
 */
export function mount(root: HTMLElement): void {
  const rule = (key: string, when: string, code: string) => `
    <div
      class="sp-row"
      data-part="rule-${key}"
      style="gap: 8px; padding: 2px 6px; border-radius: 5px; transition: background-color 0.2s ease"
    >
      <span data-part="rule-${key}-mark" style="display: flex; flex: 0 0 auto; color: var(--sp-accent)">${icon('check')}</span>
      <span class="sp-label" style="flex: 0 0 auto; width: 84px">${when}</span>
      <span class="sp-text" data-part="rule-${key}-code" style="font-size: 12px; white-space: nowrap">${code}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 302px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="sm">
            <button class="sp-segment" type="button" data-part="seg-sm" value="sm">258px</button>
            <button class="sp-segment" type="button" data-part="seg-md" value="md">348px</button>
            <button class="sp-segment" type="button" data-part="seg-lg" value="lg">438px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; padding: 12px">
          <div
            class="sp-context"
            data-part="viewport"
            data-width="sm"
            style="width: ${STEPS.sm?.width}px; height: 114px; padding: 8px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              class="sp-grid"
              data-part="page"
              style="height: 100%; gap: 6px; padding: 8px; grid-template-areas: ${STEPS.sm?.areas}; grid-template-columns: ${STEPS.sm?.columns}; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div data-part="main" style="grid-area: main; min-width: 0">
                <span class="sp-heading" style="font-size: 13px">Kestrel</span>
                <div class="sp-stack" style="margin-top: 6px; gap: 6px">
                  <div class="sp-line" style="width: 94%"></div>
                  <div class="sp-line" style="width: 86%"></div>
                  <div class="sp-line" style="width: 68%"></div>
                </div>
              </div>
              <div data-part="detail" hidden style="grid-area: detail; min-width: 0; border-left: 1px solid var(--sp-line); padding-left: 8px">
                <span class="sp-label">Details</span>
                <div class="sp-stack" style="margin-top: 6px; gap: 6px">
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 64%"></div>
                </div>
              </div>
              <div data-part="related" hidden style="grid-area: related; min-width: 0; border-left: 1px solid var(--sp-line); padding-left: 8px">
                <span class="sp-label">Related</span>
                <div class="sp-stack" style="margin-top: 6px; gap: 6px">
                  <div class="sp-line" style="width: 82%"></div>
                  <div class="sp-line" style="width: 58%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="sp-stack" data-part="rules" data-subject style="width: 100%; gap: 3px; margin-top: 10px">
            <span class="sp-label sp-context">stylesheet, in source order</span>
            ${rule('base', 'always', '.page { grid-template-areas: "main" }')}
            ${rule('md', `${MD_FROM}px and up`, '@media (min-width: 340px) { + details }')}
            ${rule('lg', `${LG_FROM}px and up`, '@media (min-width: 420px) { + related }')}
          </div>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const page = part(root, 'page');
  const detail = part(root, 'detail');
  const related = part(root, 'related');

  const setRule = (key: string, applied: boolean) => {
    const row = part(root, `rule-${key}`);
    flag(row, 'data-applied', applied);
    row.style.background = applied ? 'var(--sp-accent-soft)' : 'transparent';
    part(root, `rule-${key}-mark`).style.opacity = applied ? '1' : '0.18';
    part(root, `rule-${key}-code`).className = applied ? 'sp-text sp-text--ink' : 'sp-text';
  };

  const apply = (key: string) => {
    const step = STEPS[key];
    if (!step) return;
    viewport.style.width = `${step.width}px`;
    viewport.dataset.width = key;
    page.style.gridTemplateAreas = step.areas;
    page.style.gridTemplateColumns = step.columns;
    detail.hidden = !step.detail;
    related.hidden = !step.related;
    // The base rule carries no query, so it is never the one that switches off.
    setRule('base', true);
    setRule('md', step.width >= MD_FROM);
    setRule('lg', step.width >= LG_FROM);
  };

  // Each segment names a width, so the switch lands on that width rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('sm');
}
