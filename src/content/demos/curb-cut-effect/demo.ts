import { flag, part } from '#src/kit/parts.ts';

type Key = 'wheelchair' | 'pram' | 'trolley' | 'suitcase';

/** Each traveller drawn from the ground up, so one group can be dropped on any surface point. */
const GLYPH: Record<Key, string> = {
  wheelchair:
    '<circle cx="-2" cy="-7" r="6.5"/><circle cx="8" cy="-3.5" r="3"/><path d="M-6 -16v6h5l4 3h4"/><circle cx="-6" cy="-19" r="2.4"/>',
  pram: '<circle cx="-5" cy="-2.5" r="2.5"/><circle cx="6" cy="-2.5" r="2.5"/><path d="M-7 -6h11"/><path d="M-3 -15a9 9 0 0 1 8 9"/><path d="M-3 -15h-3l-3 9"/><path d="M5 -15l4-3"/>',
  trolley:
    '<circle cx="-4" cy="-2.5" r="2.5"/><circle cx="5" cy="-2.5" r="2.5"/><rect x="-7" y="-15" width="14" height="9" rx="1.5"/><path d="M7 -15l3-3"/>',
  suitcase:
    '<circle cx="-3" cy="-2" r="2"/><circle cx="4" cy="-2" r="2"/><rect x="-5" y="-14" width="10" height="10" rx="1.5"/><path d="M3 -14v-5h4"/>',
};

const NAME: Record<Key, string> = {
  wheelchair: 'Wheelchair',
  pram: 'Pram',
  trolley: 'Delivery trolley',
  suitcase: 'Suitcase',
};

const READOUT: Record<Key, string> = {
  wheelchair: 'The user the ramp was cut for',
  pram: 'A parent, never named in the brief',
  trolley: 'A courier, never named in the brief',
  suitcase: 'A traveller, never named in the brief',
};

/** Where each traveller stands: x along the drawing, y on the surface under it. */
const SPOT: Record<Key, [number, number]> = {
  pram: [72, 32],
  wheelchair: [173, 45],
  trolley: [262, 58],
  suitcase: [338, 58],
};

const START: Key = 'wheelchair';

/** The digital kerb cuts, each one built for a named group and used by everyone. */
const ROWS = [
  { name: 'Captions', built: 'deaf viewers', also: 'noisy gyms, quiet offices' },
  { name: 'Autocomplete', built: 'limited motor control', also: 'anyone typing on a phone' },
  { name: 'High contrast', built: 'low vision', also: 'a screen in direct sunlight' },
];

/**
 * Curb cut effect specimen: the founding exhibit drawn in profile, one ramp cut through a kerb
 * with four wheeled travellers on it, only one of whom the ramp was built for. The legend
 * picks a traveller, which lights that figure in the drawing and says who they are, and the
 * rows underneath repeat the same shape three times in software.
 *
 * The subject is the kerb drawing, the narrowest element that is the term: the effect is the
 * ramp together with the crowd using it, so ringing the wedge alone would name a curb cut and
 * ringing the whole scene would withdraw identify (SPEC §5, §6). The legend, the readout, the
 * software rows, and the caption are scenery. Every figure is drawn at mount and only its
 * colour changes, and the readout holds one line, so picking moves nothing. Each legend button
 * reaches its own traveller rather than cycling (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const figure = (key: Key) => {
    const [x, y] = SPOT[key];
    return `<g data-part="figure-${key}" transform="translate(${x} ${y})" style="color: var(--sp-muted)">${GLYPH[key]}</g>`;
  };

  const legend = (Object.keys(NAME) as Key[])
    .map(
      (key) => `
      <button class="sp-button sp-button--quiet" data-part="pick-${key}"
              style="display: flex; align-items: center; gap: 5px; padding: 2px 6px; font-size: 10.5px; font-weight: 500">
        <svg width="20" height="20" viewBox="-11 -22 24 24" fill="none" stroke="currentcolor" stroke-width="1.6"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPH[key]}</svg>
        <span>${NAME[key]}</span>
      </button>`,
    )
    .join('');

  const rows = ROWS.map(
    (row) => `
      <div class="sp-row" style="gap: 8px; height: 18px">
        <span class="sp-text sp-text--ink" style="flex: 0 0 82px; font-size: 11px">${row.name}</span>
        <span class="sp-text" style="flex: 0 0 auto; font-size: 11px">built for ${row.built}</span>
        <span class="sp-text" style="flex: 1 1 auto; min-width: 0; font-size: 11px; text-align: right">also ${row.also}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One ramp, cut for one person</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-who="${START}"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${READOUT[START]}</span>
        </div>

        <div class="sp-surface" data-part="kerb" data-subject data-who="${START}" style="margin-top: 10px; padding: 6px 10px 4px">
          <svg viewBox="0 0 400 78" width="100%" height="78" fill="none" stroke="currentcolor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: block">
            <path d="M4 32H140l66 26h190v20H4Z" fill="var(--sp-sunken)" stroke="none"/>
            <path d="M4 32H140l66 26h190" stroke="var(--sp-muted)" stroke-width="2"/>
            <path d="M140 32l66 26" data-part="ramp" stroke="var(--sp-accent)" stroke-width="3.5"/>
            <text x="8" y="26" font-size="9.5" fill="var(--sp-muted)" stroke="none">pavement</text>
            <text x="214" y="52" font-size="9.5" fill="var(--sp-muted)" stroke="none">road</text>
            <text x="140" y="72" font-size="9.5" fill="var(--sp-muted)" stroke="none">the cut</text>
            ${figure('pram')}
            ${figure('wheelchair')}
            ${figure('trolley')}
            ${figure('suitcase')}
          </svg>
          <div class="sp-row sp-row--wrap" data-part="legend" style="gap: 2px 4px; margin-top: 4px">${legend}</div>
        </div>

        <div class="sp-stack sp-context" data-part="software" style="gap: 2px; margin-top: 10px">
          <span class="sp-label" style="font-size: 10px">The same cut, in software</span>
          ${rows}
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 8px 0 0; height: 34px; font-size: 11px">
          The kerb was cut for the wheelchair. Everyone else on it is a bystander the ramp was never justified by, and there are more of them.
        </p>
      </div>
    </div>
  `;

  const kerb = part(root, 'kerb');
  const readout = part(root, 'readout');
  const keys = Object.keys(NAME) as Key[];

  const pick = (key: Key) => {
    kerb.dataset.who = key;
    for (const other of keys) {
      const on = other === key;
      part(root, `figure-${other}`).style.color = on ? 'var(--sp-accent)' : 'var(--sp-muted)';
      part(root, `figure-${other}`).style.strokeWidth = on ? '2.2' : '1.6';
      const button = part(root, `pick-${other}`);
      flag(button, 'data-selected', on);
      button.style.boxShadow = on ? 'inset 0 0 0 1px var(--sp-ink)' : '';
    }
    readout.dataset.who = key;
    readout.textContent = READOUT[key];
  };

  pick(START);

  for (const key of keys) {
    part(root, `pick-${key}`).addEventListener('click', () => pick(key));
  }
}
