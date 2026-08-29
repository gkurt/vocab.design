import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * One lightness ladder, spent by role. Only the hue and the chroma change between the
 * three choices, so the panel's structure is identical in all of them and the only thing
 * under comparison is how much colour the greys carry.
 */
const ROLES = [
  { key: 'bg', label: 'bg', l: 0.965, c: 1 },
  { key: 'surface', label: 'surface', l: 0.995, c: 0.4 },
  { key: 'sunken', label: 'sunken', l: 0.925, c: 1.3 },
  { key: 'line', label: 'line', l: 0.86, c: 1.5 },
  { key: 'muted', label: 'muted', l: 0.575, c: 1.7 },
  { key: 'ink', label: 'ink', l: 0.27, c: 1.6 },
] as const;

/** Hue angle and the chroma unit each role's multiplier is spent in. */
const TINTS: Record<string, { hue: number; unit: number }> = {
  cool: { hue: 262, unit: 0.009 },
  warm: { hue: 68, unit: 0.009 },
  pure: { hue: 0, unit: 0 },
};

const NOTES: Record<string, string> = {
  cool: 'A trace of blue in every grey, under 0.02 chroma.',
  warm: 'The same ladder tilted warm: paper rather than screen.',
  pure: 'Chroma at zero. The greys go inert beside the accent.',
};

/** The accent never changes. It is the one thing in the panel a neutral palette is not. */
const ACCENT = '#3557E8';
const START = 'cool';

const grey = (tint: { hue: number; unit: number }, l: number, c: number) => `oklch(${l} ${(c * tint.unit).toFixed(4)} ${tint.hue})`;

/**
 * Neutral palette specimen: one small interface painted entirely from a six step grey
 * ramp, with the tint of that ramp chosen as an absolute state. The accent is the same
 * blue in every state, so what moves between cool, warm and pure is only the greys the
 * interface is built out of.
 *
 * The subject is the panel, not the ramp below it: the ramp is the derivation and the term
 * names the greys as they are worn, so the ramp, its labels and the tint control all stay
 * in the context register. Panel, ramp cells and note are fixed size, so changing the tint
 * repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const ramp = ROLES.map(
    (role) => `
      <span class="sp-stack" data-part="ramp-${role.key}" style="flex: 1 1 0; gap: 4px; align-items: center">
        <span class="sp-swatch" style="width: 100%; height: 14px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12)"></span>
        <span class="sp-label" style="font-size: 9px">${role.label}</span>
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Neutrals">
            <button class="sp-segment" data-part="seg-cool" value="cool">Cool</button>
            <button class="sp-segment" data-part="seg-warm" value="warm">Warm</button>
            <button class="sp-segment" data-part="seg-pure" value="pure">Pure</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-tint="${START}"
             style="margin-top: 10px; padding: 10px; border-radius: var(--sp-radius);
                    border: 1px solid var(--n-line); background: var(--n-bg); color: var(--n-ink)">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <span style="font-size: 13px; font-weight: 600">Members</span>
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px;
                         border-radius: 6px; background: var(--n-sunken); color: var(--n-muted)">${icon('filter')}</span>
          </div>

          <div style="margin-top: 8px; border-radius: 6px; border: 1px solid var(--n-line); background: var(--n-surface); overflow: hidden">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px">
              <span style="font-size: 12px">Ada Okonjo</span>
              <span style="font-size: 11px; color: var(--n-muted)">Owner</span>
            </div>
            <div style="height: 1px; background: var(--n-line)"></div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px">
              <span style="font-size: 12px">Ren Takahashi</span>
              <span style="font-size: 11px; color: var(--n-muted)">Can edit</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
            <span style="padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         background: ${ACCENT}; color: #ffffff">Invite</span>
            <span style="padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         border: 1px solid var(--n-line); color: var(--n-muted)">Manage</span>
          </div>
        </div>

        <div class="sp-row sp-context" data-part="ramp" style="gap: 4px; margin-top: 10px; align-items: flex-start">${ramp}</div>

        <p class="sp-text sp-context" data-part="note" style="margin: 8px 0 0; min-height: 17px; font-size: 11px">${NOTES[START]}</p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const note = part(root, 'note');

  const dress = (name: string) => {
    const tint = TINTS[name];
    if (!tint) return;
    panel.dataset.tint = name;
    for (const role of ROLES) {
      const value = grey(tint, role.l, role.c);
      panel.style.setProperty(`--n-${role.key}`, value);
      part(root, `ramp-${role.key}`).querySelector<HTMLElement>('.sp-swatch')?.style.setProperty('--sp-swatch', value);
    }
    note.textContent = NOTES[name] ?? '';
  };
  dress(START);

  part(root, 'segmented').addEventListener('change', (event) => dress((event as CustomEvent<string>).detail));
}
