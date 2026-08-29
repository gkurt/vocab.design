import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The two font sizes the card is set at. Everything else about it is a ratio. */
const SIZES = [14, 20] as const;
/** Room for the card at its largest, so growing it moves nothing around it (SPEC §5). */
const SLOT = { w: 196, h: 98 };

/** The em card's declared values, and what each resolves to at a given size. */
const DECLARED = [
  { name: 'padding', em: 0.75 },
  { name: 'icon', em: 1.25 },
  { name: 'radius', em: 0.5 },
];

const px = (size: number, em: number) => `${(size * em).toFixed(size * em === Math.round(size * em) ? 0 : 1)}px`;

/**
 * Em specimen: one card written entirely in ems, set at 14px and at 20px, beside a
 * twin whose padding, icon and radius are written in pixels. The segmented pick
 * changes one declaration on the em card, its `font-size`, and every other value in
 * it follows; nothing at all moves in the pixel twin.
 *
 * The subject is the em card. The unit names what that card is built out of, so the
 * narrowest honest ring is the card itself; the twin beside it, the resolved-value
 * row and the caption are the demo's own instrumentation and stay in the context
 * register. Both slots hold the room the 20px card needs, so the growth happens
 * inside reserved space.
 */
export function mount(root: HTMLElement): void {
  const card = (kind: 'em' | 'px') => {
    const unit =
      kind === 'em'
        ? { pad: '0.75em', gap: '0.5em', radius: '0.5em', icon: '1.25em', note: '0.8em' }
        : { pad: '10.5px', gap: '7px', radius: '7px', icon: '17.5px', note: '11px' };
    return `
      <div data-part="card-${kind}" ${kind === 'em' ? 'data-subject data-size="14"' : ''}
           class="sp-surface" style="width: 100%; padding: ${unit.pad}; border-radius: ${unit.radius};
                  font-size: 14px; display: flex; flex-direction: column; gap: ${unit.gap}">
        <div style="display: flex; align-items: center; gap: ${unit.gap}">
          <span style="flex: 0 0 auto; width: ${unit.icon}; height: ${unit.icon}; border-radius: 50%;
                       background: var(--sp-accent)"></span>
          <span style="font-weight: 600">Storage</span>
        </div>
        <span style="font-size: ${unit.note}; color: var(--sp-muted); line-height: 1.4">42 GB of 80 GB used</span>
      </div>`;
  };

  const slot = (label: string, kind: 'em' | 'px') => `
    <div class="sp-stack${kind === 'px' ? ' sp-context' : ''}" style="gap: 6px; width: ${SLOT.w}px">
      <span class="sp-label${kind === 'px' ? '' : ' sp-context'}">${label}</span>
      <div style="width: 100%; height: ${SLOT.h}px">${card(kind)}</div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One card, two font sizes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Font size" data-value="14">
            ${SIZES.map((s) => `<button class="sp-segment" data-part="seg-${s}" value="${s}">${s}px</button>`).join('')}
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 10px; align-items: flex-start">
          ${slot('written in em', 'em')}
          ${slot('written in px', 'px')}
        </div>
        <div class="sp-row sp-context" data-part="trace" style="gap: 16px; height: 18px;
             font-variant-numeric: tabular-nums"></div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 4px">
          Only the font size changed. Padding, icon and radius are fractions of it and moved with it;
          the pixel twin keeps the shape it was given.
        </p>
      </div>
    </div>
  `;

  const em = part(root, 'card-em');
  const trace = part(root, 'trace');

  const apply = (value: string) => {
    const size = SIZES.find((s) => String(s) === value);
    if (!size) return;
    em.dataset.size = String(size);
    em.style.fontSize = `${size}px`;
    trace.innerHTML = DECLARED.map((d) => `<span class="sp-label">${d.name} ${d.em}em = ${px(size, d.em)}</span>`).join('');
  };

  apply('14');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
