import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The panel and the control state their own colours, so every ratio printed below is a
 * measurement against a named value rather than against whatever the page theme happened
 * to be. All four numbers in TREATMENTS are computed from these three.
 */
const PANEL = '#f4f5f7';
const PANEL_INK = '#23262b';
const CONTROL = '#dfe1e6';
const CONTROL_EDGE = '#9aa0a8';
const RING = '#3557e8';
const RING_PALE = '#aab8f2';

type Key = 'solid' | 'thin' | 'recolour';

type Treatment = {
  /** Ring geometry: how far outside the control's box it is drawn, and how thick. */
  inset: number;
  width: number;
  colour: string;
  thickness: string;
  /** The 3:1 test: these pixels focused, against the same pixels unfocused. */
  change: string;
  verdict: string;
  caption: string;
};

const TREATMENTS: Record<Key, Treatment> = {
  solid: {
    inset: -4,
    width: 2,
    colour: RING,
    thickness: '2 px',
    change: '5.2:1',
    verdict: 'Passes 2.4.13',
    caption:
      'Two pixels thick, drawn clear of the control, and 5.2:1 against the page colour it covers. That is every part of the criterion answered.',
  },
  thin: {
    inset: -4,
    width: 1,
    colour: RING_PALE,
    thickness: '1 px',
    change: '1.8:1',
    verdict: 'Fails 2.4.13',
    caption:
      'One pixel is thinner than the criterion allows in any direction, and a pale tint of the same blue changes the page by only 1.8:1.',
  },
  recolour: {
    inset: 0,
    width: 2,
    colour: RING,
    thickness: '2 px',
    change: '2.2:1',
    verdict: 'Fails 2.4.13',
    caption:
      'The indicator sits on the two pixels the border already occupied, so no area was added. Grey to blue measures 2.2:1, under the 3:1 the change itself owes.',
  },
};

const READOUT = [
  { key: 'thickness', label: 'Thickness, needs 2 px' },
  { key: 'change', label: 'Change from unfocused, needs 3:1' },
  { key: 'verdict', label: 'Focus Appearance (2.4.13)' },
] as const;

/**
 * Focus appearance specimen: one control wearing three focus indicators in turn, with the
 * two numbers the criterion actually asks for printed under each. The compliant ring is two
 * pixels thick and sits clear of the control; the failing pair are a one pixel pale ring and
 * a recolour of the border the control already had, which adds no area for a reader to find.
 *
 * The subject is the ring, and a ring is not part of the button, so it gets an element of its
 * own tracing the indicator's extent (SPEC §5): an absolutely positioned box whose border is
 * the indicator. Marking the button instead would identify the control rather than its focus
 * appearance. The picker, the readout and the caption are scenery.
 *
 * Focus is stated with `data-sim-focus` and nothing here calls `.focus()`: attract never moves
 * real focus (SPEC §7). The kit's own outline is switched off on the button inline, because in
 * this one specimen the indicator's geometry is the term under examination and the kit draws a
 * single compliant ring that would sit on top of all three treatments.
 *
 * A failing indicator is a state the ring itself passes through, so the honest condition lives
 * in `data-pose` and the mount state satisfies it: identify refuses to ring the version that
 * fails the criterion it is named for (SPEC §6). The ring is absolutely positioned, so changing
 * treatment moves nothing else in the scene (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cell = (key: string, label: string, value: string) => `
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 2px">
      <span class="sp-label" style="font-size: 9.5px; line-height: 1.25; height: 24px">${label}</span>
      <span class="sp-text sp-text--ink" data-part="${key}" data-treatment="solid"
            style="font-size: 12px; font-weight: 500; white-space: nowrap">${value}</span>
    </div>`;

  const first = TREATMENTS.solid;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="treatment" data-value="solid" data-axis="Indicator" data-term="solid">
            <button class="sp-segment" type="button" data-part="seg-solid" value="solid"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Solid 2 px</button>
            <button class="sp-segment" type="button" data-part="seg-thin" value="thin"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Thin, pale</button>
            <button class="sp-segment" type="button" data-part="seg-recolour" value="recolour"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Recolour</button>
          </sp-segmented>
        </div>

        <div data-part="panel"
             style="margin-top: 10px; height: 96px; display: flex; align-items: center; justify-content: center;
                    border-radius: 8px; background: ${PANEL}; color: ${PANEL_INK}">
          <span style="position: relative; display: inline-flex">
            <button type="button" data-part="control" data-sim-focus
                    style="appearance: none; font: inherit; font-size: 14px; font-weight: 500; outline: none;
                           width: 136px; height: 40px; border-radius: 8px; cursor: default;
                           border: 2px solid ${CONTROL_EDGE}; background: ${CONTROL}; color: ${PANEL_INK}">Publish</button>
            <span data-part="ring" data-subject data-pose="[data-treatment=solid]" data-treatment="solid"
                  style="position: absolute; inset: ${first.inset}px; border-radius: 10px;
                         border: ${first.width}px solid ${first.colour}"></span>
          </span>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; height: 44px; gap: 12px; align-items: stretch">
          ${READOUT.map((row) => cell(row.key, row.label, first[row.key])).join('')}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-treatment="solid"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${first.caption}</p>
      </div>
    </div>
  `;

  const ring = part(root, 'ring');
  const caption = part(root, 'caption');

  const apply = (key: Key) => {
    const treatment = TREATMENTS[key];
    ring.dataset.treatment = key;
    ring.style.inset = `${treatment.inset}px`;
    ring.style.borderWidth = `${treatment.width}px`;
    ring.style.borderColor = treatment.colour;
    // A recolour lands on the control's own edge, so it takes the control's radius.
    ring.style.borderRadius = treatment.inset === 0 ? '8px' : '10px';
    for (const row of READOUT) {
      const el = part(root, row.key);
      el.dataset.treatment = key;
      el.textContent = treatment[row.key];
    }
    caption.dataset.treatment = key;
    caption.textContent = treatment.caption;
  };

  part(root, 'treatment').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Key);
  });

  apply('solid');
}
