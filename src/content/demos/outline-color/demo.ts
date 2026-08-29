import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Surface = {
  key: string;
  label: string;
  page: string;
  card: string;
  ink: string;
  muted: string;
  /** The two halves of the role: the edge that must be seen, and the separator that hints. */
  outline: string;
  variant: string;
};

const SURFACES: Surface[] = [
  {
    key: 'light',
    label: 'Light',
    page: '#F1F3F7',
    card: '#FFFFFF',
    ink: '#23262B',
    muted: '#79808C',
    outline: '#B9C0CC',
    variant: '#E2E6EE',
  },
  {
    key: 'dark',
    label: 'Dark',
    page: '#14171C',
    card: '#232830',
    ink: '#E8EAEF',
    muted: '#9098A6',
    outline: '#49515F',
    variant: '#333A45',
  },
];

/** The shortcut this specimen exists to argue with: a boundary written as a recipe. */
const INK_BORDER = 'rgb(0 0 0 / 0.12)';
const INK_DIVIDER = 'rgb(0 0 0 / 0.07)';

const START = 'light';

/**
 * Outline colour specimen: the same small card drawn twice on the same surface, once with a
 * border token and once with the text colour at twelve percent, and a control that moves
 * both onto a dark surface. The token card keeps its edge because each surface resolves the
 * role to a value of its own; the translucent card loses its edge entirely, because black at
 * twelve percent over a dark surface is very nearly that surface.
 *
 * The subject is the card drawn with the token, not the pair: the term names the value a
 * boundary is drawn in, and the narrowest thing wearing it here is that card. The comparison
 * card, the surface control, the token readout and the caption are all scenery and sit in
 * the context register (SPEC §5). The subject uses the token in both surfaces, so there is
 * no state in which it stops being the term.
 *
 * Both cards are laid out once and only their paint changes with the surface, so switching
 * moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = SURFACES.find((s) => s.key === START) ?? SURFACES[0];
  if (!start) return;

  const row = (name: string, value: string, part_: string, surface: Surface) => `
    <div class="sp-row sp-row--between" data-part="${part_}" style="gap: 8px; height: 19px; font-size: 11px; color: ${surface.muted}">
      <span>${name}</span><span style="color: ${surface.ink}; font-variant-numeric: tabular-nums">${value}</span>
    </div>`;

  const card = (which: 'token' | 'ink', surface: Surface) => {
    const edge = which === 'token' ? surface.outline : INK_BORDER;
    const rule = which === 'token' ? surface.variant : INK_DIVIDER;
    const subject = which === 'token' ? ` data-subject data-surface="${START}"` : '';
    return `
      <div data-part="${which}-card"${subject} style="flex: 1 1 0; min-width: 0; padding: 10px 11px; border-radius: 8px;
           background: ${surface.card}; border: 1px solid ${edge}">
        <div data-part="${which}-title" style="font-size: 11.5px; font-weight: 600; color: ${surface.ink}">Sessions</div>
        <div style="margin-top: 6px">
          ${row('Today', '12', `${which}-row-a`, surface)}
          <div data-part="${which}-rule" style="height: 1px; background: ${rule}"></div>
          ${row('This week', '48', `${which}-row-b`, surface)}
        </div>
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Surface">
            ${SURFACES.map((s) => `<button class="sp-segment" data-part="seg-${s.key}" value="${s.key}">${s.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div data-part="panel" style="margin-top: 12px; padding: 12px; border-radius: var(--sp-radius);
             background: ${start.page}; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
          <div class="sp-row" style="gap: 12px; align-items: stretch">
            ${card('token', start)}
            ${card('ink', start)}
          </div>
          <div class="sp-row" style="gap: 12px; margin-top: 6px">
            <span data-part="label-token" style="flex: 1 1 0; font-size: 10.5px; color: ${start.muted}">Border token</span>
            <span data-part="label-ink" style="flex: 1 1 0; font-size: 10.5px; color: ${start.muted}">Ink at 12 percent</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="gap: 18px; margin-top: 9px">
          <div class="sp-row" style="gap: 7px">
            <span class="sp-swatch" data-part="chip-outline" style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 3px;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${start.outline}"></span>
            <span class="sp-text" style="font-size: 10.5px">--outline</span>
            <span class="sp-text sp-text--ink" data-part="value-outline" style="font-size: 10.5px">${start.outline}</span>
          </div>
          <div class="sp-row" style="gap: 7px">
            <span class="sp-swatch" data-part="chip-variant" style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 3px;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${start.variant}"></span>
            <span class="sp-text" style="font-size: 10.5px">--outline-variant</span>
            <span class="sp-text sp-text--ink" data-part="value-variant" style="font-size: 10.5px">${start.variant}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          A translucent border is not a colour, it is a recipe, and its answer changes with every surface it lands on.
          A named role is decided once per theme.
        </p>
      </div>
    </div>
  `;

  const tokenCard = part(root, 'token-card');

  const paint = (key: string) => {
    const surface = SURFACES.find((s) => s.key === key);
    if (!surface) return;
    tokenCard.dataset.surface = key;
    part(root, 'panel').style.background = surface.page;

    tokenCard.style.background = surface.card;
    tokenCard.style.borderColor = surface.outline;
    part(root, 'token-rule').style.background = surface.variant;

    const inkCard = part(root, 'ink-card');
    inkCard.style.background = surface.card;
    inkCard.style.borderColor = INK_BORDER;
    part(root, 'ink-rule').style.background = INK_DIVIDER;

    for (const which of ['token', 'ink']) {
      part(root, `${which}-title`).style.color = surface.ink;
      for (const line of ['row-a', 'row-b']) {
        const el = part(root, `${which}-${line}`);
        el.style.color = surface.muted;
        const value = el.lastElementChild as HTMLElement | null;
        if (value) value.style.color = surface.ink;
      }
    }

    part(root, 'label-token').style.color = surface.muted;
    part(root, 'label-ink').style.color = surface.muted;
    part(root, 'chip-outline').style.setProperty('--sp-swatch', surface.outline);
    part(root, 'chip-variant').style.setProperty('--sp-swatch', surface.variant);
    part(root, 'value-outline').textContent = surface.outline;
    part(root, 'value-variant').textContent = surface.variant;
  };
  paint(START);

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
