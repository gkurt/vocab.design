import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The ladder: four named steps, the budget a real system spends. Each carries the shadow it
 * would be drawn with on a pale ground and the surface lightness a dark theme would raise it
 * to instead, so one table describes the scale under every ground below.
 */
const STEPS = [
  { key: 'rest', step: 0, name: 'Rest', dp: 0, role: 'the page', shadow: 'none', night: '#1B1E24' },
  { key: 'raised', step: 1, name: 'Raised', dp: 1, role: 'a card', shadow: '0 1px 2px rgb(16 24 40 / 0.18)', night: '#22262E' },
  {
    key: 'float',
    step: 2,
    name: 'Floating',
    dp: 6,
    role: 'a button that follows',
    shadow: '0 4px 10px rgb(16 24 40 / 0.2)',
    night: '#2A2F38',
  },
  {
    key: 'overlay',
    step: 3,
    name: 'Overlay',
    dp: 12,
    role: 'a menu, a dialog',
    shadow: '0 10px 22px rgb(16 24 40 / 0.26)',
    night: '#333944',
  },
] as const;

/**
 * Three grounds, each a fixed scheme rather than the reader's, because the comparison IS the
 * term: the same four steps have to be seen failing on one ground and working on another, and
 * a specimen following the page theme could only ever show one of them.
 */
const GROUNDS = {
  paper: {
    name: 'Paper',
    page: '#EEF0F4',
    surface: '#FFFFFF',
    ink: '#23262B',
    rung: '#6B7280',
    edge: 'rgb(16 24 40 / 0.1)',
    shadowed: true,
    lifted: false,
  },
  night: {
    name: 'Night',
    page: '#0E1015',
    surface: '#1B1E24',
    ink: '#E8EAEF',
    rung: '#8D93A0',
    edge: 'rgb(255 255 255 / 0.08)',
    shadowed: true,
    lifted: false,
  },
  lifted: {
    name: 'Night, lifted',
    page: '#0E1015',
    surface: '#1B1E24',
    ink: '#E8EAEF',
    rung: '#8D93A0',
    edge: 'rgb(255 255 255 / 0.08)',
    shadowed: false,
    lifted: true,
  },
} as const;

type GroundKey = keyof typeof GROUNDS;

const CAPTIONS: Record<GroundKey, string> = {
  paper: 'Four named steps, drawn as shadow. Offset and blur both grow with the step, so height is readable at a glance.',
  night: 'The same four steps, same shadows. A dark smudge on a dark page has nothing left to darken, and the ladder collapses.',
  lifted: 'The scale kept, the signal changed: each step raises the surface lightness instead, which is what a dark theme ships.',
};

const START: GroundKey = 'paper';

/**
 * Elevation specimen: the scale itself, four named steps side by side on a ground the picker
 * chooses. Every card prints its token and its height in dp, so the ladder reads as a set of
 * named values rather than as an impression of depth, and the picker is what makes the term's
 * central fact visible: a shadow says height on a pale ground and says almost nothing on a
 * near black one, which is the whole reason elevation-overlay and surface-tint exist.
 *
 * The subject is the OVERLAY card, one surface at one step, which is the narrowest element the
 * term names (SPEC §5). The other three cards are peer instances of the same term rather than
 * scenery, so they keep the full palette and take no register: dimming them would dim the
 * comparison. What is scenery is the picker, the step ruler and the caption, and those carry
 * `.sp-context`. Every ground is honest elevation (the collapse on Night is the term doing its
 * work badly, not the term being absent), so no `data-pose` is needed and identify can land at
 * any resting state (SPEC §6, §7).
 *
 * Nothing moves when the ground changes: the plate, the ruler and every card are fixed sizes,
 * and only paint, shadow and one line of caption text differ (SPEC §5). The caption's box is
 * reserved at two lines so the longest wording cannot push the frame.
 */
export function mount(root: HTMLElement): void {
  const row = (s: (typeof STEPS)[number]) => {
    const subject = s.key === 'overlay' ? ' data-subject' : '';
    return `
      <div class="sp-row" style="gap: 10px">
        <span class="sp-context" data-part="rung-${s.key}"
              style="flex: 0 0 auto; width: 16px; text-align: right; font-size: 10px;
                     font-variant-numeric: tabular-nums; color: var(--sp-muted)">${s.step}</span>
        <div class="sp-row sp-row--between" data-part="card-${s.key}"${subject}
             data-ground="${START}" data-step="${s.step}"
             style="flex: 1 1 auto; min-width: 0; height: 34px; padding: 0 11px; border-radius: 6px;
                    white-space: nowrap">
          <span style="font-size: 11px; font-weight: 600">${s.name}</span>
          <span data-part="value-${s.key}"
                style="font-size: 9.5px; font-variant-numeric: tabular-nums; opacity: 0.72">${s.role} · ${s.dp}dp</span>
        </div>
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px 15px">
        <div class="sp-row sp-row--between sp-context" style="height: 30px">
          <span class="sp-label">Elevation scale</span>
          <sp-segmented class="sp-segmented" data-part="ground" data-value="${START}">
            ${Object.entries(GROUNDS)
              .map(
                ([key, g]) =>
                  `<button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="white-space: nowrap">${g.name}</button>`,
              )
              .join('')}
          </sp-segmented>
        </div>

        <div class="sp-stack" data-part="plate"
             style="gap: 8px; margin-top: 9px; padding: 14px 14px 16px; border-radius: 7px;
                    box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.26)">
          ${STEPS.map(row).join('')}
        </div>

        <p class="sp-text sp-context" data-part="caption"
           style="margin: 9px 0 0; height: 30px; font-size: 10px; line-height: 1.45"></p>
      </div>
    </div>
  `;

  const apply = (key: string): void => {
    const ground = GROUNDS[key as GroundKey];
    if (!ground) return;

    part(root, 'plate').style.background = ground.page;

    for (const s of STEPS) {
      const card = part(root, `card-${s.key}`);
      card.dataset.ground = key;
      card.style.color = ground.ink;
      card.style.background = ground.lifted ? s.night : ground.surface;
      const shadow = ground.shadowed && s.shadow !== 'none' ? `, ${s.shadow}` : '';
      card.style.boxShadow = `inset 0 0 0 1px ${ground.edge}${shadow}`;
    }

    // The ruler sits ON the plate rather than on the window, so its ink follows the ground:
    // the kit's muted grey is legible against one of these two and not against the other.
    for (const s of STEPS) part(root, `rung-${s.key}`).style.color = ground.rung;

    part(root, 'caption').textContent = CAPTIONS[key as GroundKey];
  };
  apply(START);

  // Each segment names one ground outright, so a pass picked up anywhere lands the same
  // way rather than flipping whatever it found (SPEC §8).
  part(root, 'ground').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
