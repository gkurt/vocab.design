import { part } from '#src/kit/parts.ts';

const PLANS = [
  { key: 'basic', name: 'Basic', price: '$0', note: '1 project, 2 editors' },
  { key: 'standard', name: 'Standard', price: '$12', note: '10 projects, 8 editors' },
  { key: 'pro', name: 'Pro', price: '$28', note: 'Unlimited, audit log' },
] as const;

const START = 'standard';
const CARD_H = 132;

/**
 * Selection card specimen: three plan tiles as one radio group, where the tile is the control.
 * The whole rectangle answers a press, the dot in the corner says which kind of choice this is,
 * and picking a tile unpicks the others, which is the radio half of the fusion the term names.
 *
 * The subject is one card, and it stays on the same card rather than following the selection:
 * the word names the control, not the state it is in, so a tile is a selection card whether or
 * not it is currently picked, and a `data-subject` that moved would swap the pin out from under
 * a reader mid-play. It needs no `data-pose` condition for the same reason. The panel chrome and
 * the value line are scenery.
 *
 * Each tile is a real button carrying `role="radio"` and `aria-checked`, so it is reachable by
 * keyboard and announces its state; the state is drawn with an inset ring and the dot rather
 * than by thickening a border, so selection changes nothing about the layout (SPEC §5). Every
 * press names a plan outright rather than toggling one (SPEC §8), and the cards share a fixed
 * height so the longest note cannot make its option look bigger than the rest.
 */
export function mount(root: HTMLElement): void {
  const card = ({ key, name, price, note }: (typeof PLANS)[number]) => `
    <button
      type="button"
      role="radio"
      aria-checked="${key === START}"
      data-part="card-${key}"
      data-plan="${key}"
      ${key === START ? 'data-subject' : ''}
      style="display: flex; flex-direction: column; align-items: stretch; gap: 6px; flex: 1 1 0; min-width: 0; height: ${CARD_H}px;
             padding: 11px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-surface);
             color: inherit; font: inherit; text-align: left; cursor: pointer"
    >
      <span class="sp-row sp-row--between" style="gap: 8px">
        <span class="sp-heading" style="font-size: 13px; white-space: nowrap">${name}</span>
        <span
          data-part="dot-${key}"
          aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 15px; height: 15px;
                 border: 1px solid var(--sp-line); border-radius: 50%; background: var(--sp-surface)"
        ><span
            data-part="fill-${key}"
            style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.14s"
          ></span></span>
      </span>
      <span class="sp-heading" style="font-size: 20px; line-height: 1.1">${price}</span>
      <span class="sp-text" style="font-size: 11.5px; line-height: 1.35">${note}</span>
      <span class="sp-grow"></span>
      <span class="sp-label" data-part="hint-${key}" style="font-size: 10.5px">per editor, monthly</span>
    </button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Choose a plan</span>
          <span class="sp-label" data-part="readout" data-plan="${START}" style="font-size: 11px; white-space: nowrap">Standard selected</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; padding: 14px">
          <div
            class="sp-row"
            data-part="group"
            role="radiogroup"
            aria-label="Plan"
            style="gap: 10px; width: 100%; align-items: stretch"
          >${PLANS.map(card).join('')}</div>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const tiles = PLANS.map((plan) => part(root, `card-${plan.key}`));

  const choose = (key: string) => {
    const plan = PLANS.find((entry) => entry.key === key);
    if (!plan) return;
    for (const tile of tiles) {
      const on = tile.dataset.plan === key;
      tile.setAttribute('aria-checked', String(on));
      // Selection is an inset ring and a wash, never a thicker border: the tile keeps its box.
      tile.style.boxShadow = on ? 'inset 0 0 0 2px var(--sp-accent)' : 'none';
      tile.style.background = on ? 'var(--sp-accent-soft)' : 'var(--sp-surface)';
      const fill = part(root, `fill-${tile.dataset.plan}`);
      fill.style.opacity = on ? '1' : '0';
      const ring = part(root, `dot-${tile.dataset.plan}`);
      ring.style.borderColor = on ? 'var(--sp-accent)' : 'var(--sp-line)';
    }
    readout.dataset.plan = key;
    readout.textContent = `${plan.name} selected`;
  };

  for (const tile of tiles) tile.addEventListener('click', () => choose(tile.dataset.plan ?? START));

  choose(START);
}
