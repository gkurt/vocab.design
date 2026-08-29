import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Three fills and the foreground each one ships with. Amber is the whole argument:
 * its on-colour is near black, so a component that hardcoded white would break here
 * and nowhere else.
 */
const PALETTES: Record<string, { fill: string; on: string; wrong: string }> = {
  indigo: { fill: '#4F46E5', on: '#FFFFFF', wrong: '#7C75EC' },
  amber: { fill: '#F2B23A', on: '#241802', wrong: '#F6C86E' },
  teal: { fill: '#0F766E', on: '#FFFFFF', wrong: '#3E958E' },
};
const START = 'indigo';

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/** WCAG relative luminance, so the specimen states the ratio rather than claiming one. */
const luminance = (hex: string) => 0.2126 * linear(channel(hex, 1)) + 0.7152 * linear(channel(hex, 3)) + 0.0722 * linear(channel(hex, 5));

const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
};

/**
 * On-colour specimen: one fill shown twice, once with the foreground that ships with
 * it and once with a foreground taken from the fill's own family. Switching palette
 * re-resolves both, and the on-colour changes from white to near black without the
 * panel being told anything except which palette it is on.
 *
 * The subject is the foreground content itself, not the panel it sits on: the term
 * names the colour the label is drawn in, and the fill under it is the other half of
 * the pair rather than the thing being named.
 */
export function mount(root: HTMLElement): void {
  const panel = (parts: { part: string; subject?: boolean; label: string }) => `
    <div class="sp-stack sp-grow" style="gap: 6px">
      <div data-part="${parts.part}" style="height: 106px; padding: 14px; border-radius: var(--sp-radius); background: ${PALETTES[START]?.fill}">
        <div class="sp-stack" data-part="${parts.part}-ink" ${parts.subject ? 'data-subject' : ''} style="gap: 6px; color: ${parts.subject ? PALETTES[START]?.on : PALETTES[START]?.wrong}">
          <div class="sp-row" style="gap: 6px">${icon('check')}<span class="sp-heading">Published</span></div>
          <span class="sp-text" style="color: inherit; opacity: 0.86">Live for everyone on the team.</span>
        </div>
      </div>
      <div class="sp-row sp-row--between">
        <span class="sp-label">${parts.label}</span>
        <span class="sp-text" data-part="${parts.part}-ratio" style="width: 96px; text-align: right">&nbsp;</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Primary">
            <button class="sp-segment" data-part="seg-indigo" value="indigo">Indigo</button>
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">Teal</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="pair" data-palette="${START}" style="gap: 12px; margin-top: 14px; align-items: flex-start">
          ${panel({ part: 'paired', subject: true, label: 'on-primary' })}
          <div class="sp-context sp-grow" style="display: flex">${panel({ part: 'unpaired', label: 'primary on primary' })}</div>
        </div>

        <p class="sp-text sp-context" style="margin: 12px 0 0">
          The prefix names the surface, not the colour: on-primary is whatever reads against primary.
        </p>
      </div>
    </div>
  `;

  const pair = part(root, 'pair');

  const dress = (name: string) => {
    const palette = PALETTES[name];
    if (!palette) return;
    pair.dataset.palette = name;
    for (const side of ['paired', 'unpaired'] as const) {
      const ink = side === 'paired' ? palette.on : palette.wrong;
      part(root, side).style.background = palette.fill;
      part(root, `${side}-ink`).style.color = ink;
      const value = ratio(palette.fill, ink);
      part(root, `${side}-ratio`).textContent = `${value.toFixed(1)}:1 ${value >= 4.5 ? 'passes' : 'fails'}`;
    }
  };
  dress(START);

  part(root, 'segmented').addEventListener('change', (event) => dress((event as CustomEvent<string>).detail));
}
