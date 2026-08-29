import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const PANELS = [
  { id: 'reef', label: 'Reef', tag: 'Chapter one', title: 'Reef habitats', lines: ['92%', '68%'] },
  { id: 'kelp', label: 'Kelp', tag: 'Chapter two', title: 'Kelp forests', lines: ['78%', '86%'] },
];

const FADE_MS = 500;

/**
 * Crossfade specimen: two panels stacked in the same box, one going down while
 * the other comes up over the same span. Both are absolutely positioned so
 * neither is ever in the flow, which is what lets them overlap at the midpoint
 * without the frame growing to hold two of them (SPEC §5).
 *
 * Opacity is the only thing that moves, and it is eased linearly on purpose: an
 * eased pair sags visibly in the middle of the overlap. The subject is the stack
 * rather than either panel, since the term names what happens between them.
 *
 * The segmented control resolves to an absolute panel id, so a script that is
 * fast-forwarded or resumed lands on the panel it named rather than on whichever
 * one was not showing (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const segments = PANELS.map(
    (panel) => `<button class="sp-segment sp-grow" data-part="seg-${panel.id}" value="${panel.id}">${panel.label}</button>`,
  ).join('');

  const panels = PANELS.map(
    (panel, index) => `
      <article
        class="sp-surface sp-row"
        data-part="panel-${panel.id}"
        style="position: absolute; inset: 0; gap: 12px; padding: 12px; opacity: ${index === 0 ? 1 : 0}; transition: opacity ${FADE_MS}ms linear"
      >
        <span class="sp-swatch" style="flex: 0 0 76px; height: 100%; --sp-swatch: var(--sp-accent-soft)"></span>
        <span class="sp-stack sp-grow" style="gap: 7px">
          <span class="sp-label">${panel.tag}</span>
          <span class="sp-heading">${panel.title}</span>
          <span class="sp-line" style="width: ${panel.lines[0]}"></span>
          <span class="sp-line" style="width: ${panel.lines[1]}"></span>
        </span>
      </article>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 360px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field guide</span>
          <span class="sp-label">Coastal</span>
        </div>
        <div class="sp-body">
          <sp-segmented class="sp-segmented sp-context" data-part="picker" data-axis="Panel" data-value="reef" style="width: 100%">
            ${segments}
          </sp-segmented>
          <div data-part="stack" data-subject style="position: relative; height: 124px; margin-top: 12px">
            ${panels}
          </div>
        </div>
      </div>
    </div>
  `;

  const show = (id: string) => {
    for (const panel of PANELS) {
      const el = part(root, `panel-${panel.id}`);
      const on = panel.id === id;
      el.style.opacity = on ? '1' : '0';
      el.setAttribute('aria-hidden', String(!on));
      // The panel on its way out must not swallow a press meant for the one arriving.
      el.style.pointerEvents = on ? '' : 'none';
    }
  };

  part(root, 'picker').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
  show('reef');
}
