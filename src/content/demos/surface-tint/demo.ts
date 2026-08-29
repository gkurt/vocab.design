import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Material's tonal elevation table: how much of the primary colour a surface takes at each
 * level, and the shadow the same level would have been given instead. Four of the six levels,
 * far enough apart that the ladder can actually be read.
 */
const LEVELS = [
  { key: 'l5', label: 'Level 5', dp: 12, pct: 14, shadow: '0 8px 16px rgb(0 0 0 / 0.34)' },
  { key: 'l3', label: 'Level 3', dp: 6, pct: 11, shadow: '0 4px 9px rgb(0 0 0 / 0.3)' },
  { key: 'l1', label: 'Level 1', dp: 1, pct: 5, shadow: '0 1px 3px rgb(0 0 0 / 0.26)' },
  { key: 'l0', label: 'Level 0', dp: 0, pct: 0, shadow: 'none' },
] as const;

/**
 * Two plates, each a fixed scheme rather than the page's. The whole argument is that the same
 * four levels behave differently on a pale surface and a near black one, which a specimen that
 * followed the reader's theme could only ever show half of. Values are the Material 3 baseline
 * light and dark schemes.
 */
const PLATES = [
  { key: 'light', name: 'Light scheme', surface: '#FEF7FF', tint: '#6750A4', ink: '#1D1B20', edge: 'rgb(16 24 40 / 0.16)' },
  { key: 'dark', name: 'Dark scheme', surface: '#141218', tint: '#D0BCFF', ink: '#E6E0E9', edge: 'rgb(255 255 255 / 0.14)' },
] as const;

const MODES = [
  { key: 'tonal', name: 'Tonal', tinted: true, shadowed: false },
  { key: 'shadow', name: 'Shadow', tinted: false, shadowed: true },
  { key: 'both', name: 'Both', tinted: true, shadowed: true },
] as const;

const START = 'tonal';

const modeOf = (key: string) => MODES.find((m) => m.key === key) ?? MODES[0];

const channel = (hex: string, i: number) => Number.parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);

/** The tint laid over the surface at one opacity, resolved to the value that ends up painted. */
function blend(surface: string, tint: string, pct: number): string {
  const a = pct / 100;
  const mixed = [0, 1, 2].map((i) => Math.round(channel(surface, i) * (1 - a) + channel(tint, i) * a));
  return `#${mixed
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
}

/**
 * Surface tint specimen: the same four elevation levels built twice, once on a light scheme and
 * once on a dark one, with the mode control deciding whether height is carried by tone, by
 * shadow, or by both. Every card prints the percentage of primary mixed into it and the hex that
 * mix resolves to, so the ladder is a set of measured values rather than an impression.
 *
 * The demonstration is what the dark plate does under Shadow. The four levels there are one
 * colour with four shadows nobody can see, which is the problem tonal elevation was invented to
 * solve; under Tonal the same four levels separate cleanly with no shadow at all. Both plates
 * carry fixed schemes rather than the reader's, because the comparison is the term.
 *
 * The subject is the level 5 card on the dark plate: the narrowest element the term names is one
 * tinted surface, not the ladder it belongs to and not the plate behind it. The light plate, the
 * other cards, the mode control and the caption are what it is read against, so they sit in the
 * context register (SPEC §5). Shadow is the counter-example the term exists to argue with, so
 * the honest condition lives in `data-pose` and the mount state satisfies it: identify refuses
 * to ring a surface carrying no tint and plays on (SPEC §6).
 *
 * Every card is a fixed size and only paint, shadow and text change with the mode, so nothing
 * moves (SPEC §5). Each value is blended from the tables above, so the specimen renders
 * identically on every run.
 */
export function mount(root: HTMLElement): void {
  const card = (plate: (typeof PLATES)[number], level: (typeof LEVELS)[number]) => {
    const subject = plate.key === 'dark' && level.key === 'l5' ? 'data-subject data-pose="[data-tinted]"' : '';
    return `
      <div class="sp-row sp-row--between" data-part="card-${plate.key}-${level.key}" ${subject}
           data-mode="${START}" data-tint="${level.pct}"
           style="height: 32px; padding: 0 9px; border-radius: 5px; color: ${plate.ink};
                  box-shadow: inset 0 0 0 1px ${plate.edge}">
        <span style="font-size: 9.5px; font-weight: 600">${level.label} · ${level.dp}dp</span>
        <span data-part="value-${plate.key}-${level.key}"
              style="font-size: 8.5px; font-variant-numeric: tabular-nums; opacity: 0.85"></span>
      </div>`;
  };

  // The light plate is scenery entire; the dark one holds the subject, so it takes no register.
  const plate = (p: (typeof PLATES)[number]) => `
    <div class="sp-stack${p.key === 'light' ? ' sp-context' : ''}" style="flex: 1 1 0; min-width: 0; gap: 4px">
      <div class="sp-row sp-row--between sp-context" style="height: 16px">
        <span class="sp-label">${p.name}</span>
        <span class="sp-text" style="font-size: 9px; font-variant-numeric: tabular-nums">tint ${p.tint}</span>
      </div>
      <div class="sp-stack" data-part="plate-${p.key}"
           style="gap: 6px; padding: 10px; border-radius: 6px; background: ${p.surface};
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.28)">
        ${LEVELS.map((level) => card(p, level)).join('')}
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="height: 31px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Height cue" data-term="tonal" data-value="${START}">
            ${MODES.map((m) => `<button class="sp-segment" data-part="seg-${m.key}" value="${m.key}">${m.name}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          ${PLATES.map(plate).join('')}
        </div>

        <p class="sp-text sp-context" data-part="caption"
           style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;

  const apply = (key: string) => {
    const mode = modeOf(key);
    if (!mode) return;

    for (const p of PLATES) {
      for (const level of LEVELS) {
        const pct = mode.tinted ? level.pct : 0;
        const painted = blend(p.surface, p.tint, pct);
        const el = part(root, `card-${p.key}-${level.key}`);
        el.dataset.mode = mode.key;
        el.dataset.tint = String(pct);
        if (mode.tinted && level.pct > 0) el.setAttribute('data-tinted', '');
        else el.removeAttribute('data-tinted');
        el.style.background = painted;
        el.style.boxShadow = `inset 0 0 0 1px ${p.edge}${mode.shadowed && level.shadow !== 'none' ? `, ${level.shadow}` : ''}`;
        part(root, `value-${p.key}-${level.key}`).textContent = `+${pct}% · ${painted}`;
      }
    }

    const captions: Record<string, string> = {
      tonal: 'Height is colour: each level takes more of the primary, and no shadow is drawn anywhere.',
      shadow: 'The same four levels lifted by shadow alone. On the dark scheme they are one colour with four invisible shadows.',
      both: 'What Material 3 actually ships: the tint carries the height and the shadow adds an edge on the pale scheme.',
    };
    part(root, 'caption').textContent = captions[mode.key] ?? '';
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
