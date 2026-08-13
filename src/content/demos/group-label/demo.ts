import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Stop = { key: string; label: string; kind: 'field' | 'radio' };

/** The reading order the walker follows: both address fields, then both radios. */
const STOPS: Stop[] = [
  { key: 'street', label: 'Street', kind: 'field' },
  { key: 'postcode', label: 'Postcode', kind: 'field' },
  { key: 'standard', label: 'Standard', kind: 'radio' },
  { key: 'express', label: 'Express', kind: 'radio' },
];

const CAPTION = {
  labelled: 'The legend and the aria-labelledby do the same job: every field arrives with the set it belongs to.',
  bare: 'The heading is still on screen and joined to nothing, so Standard and Express arrive with no question attached.',
} as const;

type Mode = keyof typeof CAPTION;

const SPEED_ID = 'vd-gl-speed';

/**
 * Group label specimen: a shipping address in a fieldset with a legend, a delivery speed radio
 * set named by aria-labelledby, and the line assistive technology says on arriving at each
 * control. Taking the group name off the radio set changes nothing on screen and takes the
 * question away from both answers, which is the whole of the term.
 *
 * The subject is the radio group, the narrowest element a group label actually names. The
 * address fieldset beside it is scenery showing the native spelling of the same idea, and the
 * walker, the readout, and the caption are scenery too (SPEC §5). The unnamed build is a state
 * the subject itself passes through, so the honest condition is declared in `data-pose` and the
 * mount state satisfies it: identify refuses to ring a group with no label (SPEC §6).
 *
 * The announcement is computed by walking up from the control to its group and reading that
 * group's own name, the way a browser's name computation does, so the readout cannot claim a
 * label the markup does not carry. Only attributes change between builds, so nothing moves
 * (SPEC §5); the walk clamps at the last stop and each segment reaches its own build, so a
 * pass joined halfway still ends where a whole one does (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const field = (stop: Stop) => `
    <div class="sp-row" style="gap: 6px; height: 30px">
      <label class="sp-label" for="vd-gl-${stop.key}" style="flex: 0 0 56px">${stop.label}</label>
      <input class="sp-input sp-grow" id="vd-gl-${stop.key}" data-part="stop-${stop.key}" autocomplete="off" />
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">The radio set is</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="labelled">
            <button class="sp-segment" data-part="seg-labelled" value="labelled">Named group</button>
            <button class="sp-segment" data-part="seg-bare" value="bare">Unnamed group</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 12px; align-items: flex-start">
          <div class="sp-grow">
            <fieldset class="sp-context" data-part="address"
                      style="min-width: 0; margin: 0; padding: 2px 10px 10px; border: 1px solid var(--sp-line); border-radius: 6px">
              <legend class="sp-label" style="padding: 0 4px">Shipping address</legend>
              <div class="sp-stack" style="gap: 6px">
                ${STOPS.filter((s) => s.kind === 'field')
                  .map(field)
                  .join('')}
              </div>
            </fieldset>

            <div class="sp-surface" data-part="speed" data-subject data-pose="[data-mode=labelled]" data-mode="labelled"
                 role="radiogroup" aria-labelledby="${SPEED_ID}" style="margin-top: 8px; padding: 10px 12px">
              <span class="sp-label" id="${SPEED_ID}">Delivery speed</span>
              <div class="sp-row" style="margin-top: 6px; gap: 8px">
                <button class="sp-chip" type="button" role="radio" aria-checked="true"
                        data-part="stop-standard" data-selected>Standard</button>
                <button class="sp-chip" type="button" role="radio" aria-checked="false"
                        data-part="stop-express">Express</button>
              </div>
            </div>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 160px; padding: 10px 12px">
            <span class="sp-label">Announced on arrival</span>
            <p class="sp-text sp-text--ink" data-part="voice" data-state="street-named"
               style="margin: 6px 0 0; height: 60px; font-size: 11px; line-height: 1.4; overflow: hidden"></p>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="next"
                    style="margin-top: 8px; width: 100%">Next field</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-case="labelled"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${CAPTION.labelled}</p>
      </div>
    </div>
  `;

  const speed = part(root, 'speed');
  const voice = part(root, 'voice');
  const caption = part(root, 'caption');
  const radios = STOPS.filter((stop) => stop.kind === 'radio');

  let at = 0;

  /** The group a control belongs to, and the name that group carries, computed not written. */
  const groupOf = (el: HTMLElement) => el.closest('fieldset, [role=group], [role=radiogroup]');

  const nameOf = (group: Element | null): string => {
    if (!group) return '';
    const ids = group.getAttribute('aria-labelledby');
    if (ids) return root.querySelector(`#${ids}`)?.textContent?.trim() ?? '';
    return group.querySelector('legend')?.textContent?.trim() ?? '';
  };

  const roleOf = (group: Element | null): string => (group?.getAttribute('role') === 'radiogroup' ? 'radio group' : 'group');

  const describe = (stop: Stop): string => {
    if (stop.kind === 'field') return `${stop.label}, edit text`;
    const index = radios.findIndex((r) => r.key === stop.key) + 1;
    const checked = part(root, `stop-${stop.key}`).getAttribute('aria-checked') === 'true';
    return `${stop.label}, radio button, ${index} of ${radios.length}, ${checked ? 'selected' : 'not selected'}`;
  };

  const announce = () => {
    const stop = STOPS[at];
    if (!stop) return;
    const control = part(root, `stop-${stop.key}`);
    const group = groupOf(control);
    const name = nameOf(group);
    const prefix = name ? `“${name}”, ${roleOf(group)}. ` : group ? `${roleOf(group)}, unnamed. ` : '';
    voice.dataset.state = `${stop.key}-${name ? 'named' : 'unnamed'}`;
    voice.textContent = prefix + describe(stop);
    for (const [index, other] of STOPS.entries()) flag(part(root, `stop-${other.key}`), 'data-sim-focus', index === at);
  };

  const apply = (mode: Mode) => {
    speed.dataset.mode = mode;
    if (mode === 'labelled') speed.setAttribute('aria-labelledby', SPEED_ID);
    else speed.removeAttribute('aria-labelledby');
    caption.dataset.case = mode;
    caption.textContent = CAPTION[mode];
    // Both builds are read from the same starting point, so the second walk is heard as the
    // missing name rather than as a different field.
    at = 0;
    announce();
  };

  apply('labelled');

  part(root, 'next').addEventListener('click', () => {
    at = Math.min(at + 1, STOPS.length - 1);
    announce();
  });

  for (const [index, radio] of radios.entries()) {
    const el = part(root, `stop-${radio.key}`);
    el.addEventListener('click', () => {
      for (const other of radios) {
        const button = part(root, `stop-${other.key}`);
        const on = other.key === radio.key;
        button.setAttribute('aria-checked', String(on));
        flag(button, 'data-selected', on);
      }
      at = STOPS.length - radios.length + index;
      announce();
    });
  }

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'bare' ? 'bare' : 'labelled');
  });
}
