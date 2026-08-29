import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The hue angle each choice fixes. Everything else in the palette is derived from it. */
const HUES: Record<string, number> = { indigo: 262, teal: 190, clay: 42 };

/**
 * One role per step: lightness walks the ramp and chroma tapers at both ends, which is
 * what keeps the light steps from glowing and the dark ones from going to mud.
 */
const ROLES = [
  { key: 'bg', label: 'bg', l: 0.97, c: 0.018 },
  { key: 'surface', label: 'surface', l: 0.995, c: 0.006 },
  { key: 'sunken', label: 'sunken', l: 0.93, c: 0.032 },
  { key: 'line', label: 'line', l: 0.86, c: 0.05 },
  { key: 'muted', label: 'muted', l: 0.58, c: 0.07 },
  { key: 'accent', label: 'accent', l: 0.52, c: 0.16 },
  { key: 'ink', label: 'ink', l: 0.27, c: 0.08 },
] as const;

const START = 'indigo';

const step = (hue: number, l: number, c: number) => `oklch(${l} ${c} ${hue})`;

/**
 * Monochromatic palette specimen: one hue angle built into a full set of roles and then
 * spent on a small interface, with the hue chosen as an absolute state. Every surface,
 * border, label and accent in the panel is the same angle on the wheel, so the only
 * separation anywhere in it comes from lightness and chroma.
 *
 * The subject is the panel the palette is spent on, not the ramp beside it: the ramp is
 * the derivation, and the term names the scheme as it is worn. The hue control and the
 * ramp both stay in the context register. The panel, the ramp cells and the readout are
 * all fixed size, so changing hue repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const hue = HUES[START] ?? 262;

  const ramp = ROLES.map(
    (role) => `
      <span class="sp-stack" data-part="ramp-${role.key}" style="flex: 1 1 0; gap: 4px; align-items: center">
        <span class="sp-swatch" style="width: 100%; height: 26px; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.12);
                                       --sp-swatch: ${step(hue, role.l, role.c)}"></span>
        <span class="sp-label" style="font-size: 10px">${role.label}</span>
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Hue">
            <button class="sp-segment" data-part="seg-indigo" value="indigo">262</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">190</button>
            <button class="sp-segment" data-part="seg-clay" value="clay">42</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-hue="${START}"
             style="margin-top: 14px; padding: 12px; border-radius: var(--sp-radius);
                    border: 1px solid var(--mo-line); background: var(--mo-bg); color: var(--mo-ink)">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <span style="font-size: 13px; font-weight: 600">Storage</span>
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px;
                         border-radius: 50%; background: var(--mo-sunken); color: var(--mo-muted)">${icon('inbox')}</span>
          </div>

          <div style="margin-top: 10px; padding: 10px; border-radius: 6px;
                      border: 1px solid var(--mo-line); background: var(--mo-surface)">
            <div style="display: flex; align-items: baseline; justify-content: space-between">
              <span style="font-size: 12px">Project archive</span>
              <span style="font-size: 11px; color: var(--mo-muted)">61 of 80 GB</span>
            </div>
            <span style="display: block; height: 6px; margin-top: 8px; border-radius: 999px; background: var(--mo-sunken)">
              <span style="display: block; width: 76%; height: 100%; border-radius: inherit; background: var(--mo-accent)"></span>
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px">
            <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         background: var(--mo-accent); color: var(--mo-surface)">Upgrade</span>
            <span style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
                         border: 1px solid var(--mo-line); color: var(--mo-muted)">Manage</span>
          </div>
        </div>

        <div class="sp-row sp-context" data-part="ramp" style="gap: 4px; margin-top: 12px; align-items: flex-start">${ramp}</div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');

  const dress = (name: string) => {
    const angle = HUES[name];
    if (angle === undefined) return;
    panel.dataset.hue = name;
    for (const role of ROLES) {
      const value = step(angle, role.l, role.c);
      panel.style.setProperty(`--mo-${role.key}`, value);
      part(root, `ramp-${role.key}`).querySelector<HTMLElement>('.sp-swatch')?.style.setProperty('--sp-swatch', value);
    }
  };
  dress(START);

  part(root, 'segmented').addEventListener('change', (event) => dress((event as CustomEvent<string>).detail));
}
