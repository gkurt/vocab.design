import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Both themes written out as tokens, which is the point the specimen is making: the inverse
 * pair is declared per theme rather than derived by flipping the ordinary one. Fixed table,
 * so the scene paints the same on every run.
 */
type Theme = {
  name: string;
  surface: string;
  onSurface: string;
  onSurfaceMuted: string;
  line: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  /** Which way round the snackbar reads, so the choreography can name it. */
  tone: 'dark' | 'light';
};

const THEMES: Record<string, Theme> = {
  light: {
    name: 'Light',
    surface: '#FFFFFF',
    onSurface: '#1B1E24',
    onSurfaceMuted: '#6B7280',
    line: '#E3E6EC',
    inverseSurface: '#2F323A',
    inverseOnSurface: '#F1F2F6',
    inversePrimary: '#A9BEFF',
    tone: 'dark',
  },
  dark: {
    name: 'Dark',
    surface: '#1B1E24',
    onSurface: '#E9EBEF',
    onSurfaceMuted: '#8E95A2',
    line: '#333842',
    inverseSurface: '#EDEFF4',
    inverseOnSurface: '#23262C',
    inversePrimary: '#2F49B4',
    tone: 'light',
  },
};

const START = 'light';

const ROWS = [
  { title: 'Weekly digest', meta: '2 min ago' },
  { title: 'Deploy finished', meta: '18 min ago' },
];

/**
 * Inverse colour specimen: an app surface with one element on it that refuses the theme. The
 * page is light and the snackbar is charcoal with pale text and a pale accent; flip the app
 * to dark and the whole pair swaps with it, staying opposite. The readout prints the tokens
 * actually in play, so the reader can see that the inverse trio is declared per theme rather
 * than computed by inverting the ordinary roles.
 *
 * The subject is the snackbar, the narrowest element on stage that the term names. It is
 * inverse against both themes, so there is no state identify has to refuse. The app surface
 * behind it, the theme control, the readout and the caption are instrumentation, so all of
 * them sit in the context register (SPEC §5).
 *
 * Every box is fixed size and absolutely placed, and only paint and text change with the
 * theme, so nothing moves (SPEC §5). No scripted animation, so nothing needs a gate.
 */
export function mount(root: HTMLElement): void {
  const start = THEMES[START] ?? THEMES.light;
  if (!start) throw new Error('unknown theme');

  const row = (r: (typeof ROWS)[number], i: number) => `
    <div class="sp-row" data-part="row-${i}" style="height: 38px; gap: 9px; padding: 0 12px;
         border-top: ${i === 0 ? '0' : '1px'} solid var(--app-line)">
      <span data-part="row-dot-${i}" style="flex: 0 0 18px; height: 18px; border-radius: 50%; background: var(--app-line)"></span>
      <span class="sp-grow" style="font-size: 12px; color: var(--app-ink)">${r.title}</span>
      <span style="font-size: 10.5px; color: var(--app-muted)">${r.meta}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="App theme" data-value="${START}">
            ${Object.entries(THEMES)
              .map(([key, t]) => `<button class="sp-segment" data-part="seg-${key}" value="${key}">${t.name}</button>`)
              .join('')}
          </sp-segmented>
        </div>

        <div data-part="scene" data-theme="${START}"
             style="position: relative; height: 168px; margin-top: 10px; border-radius: 10px; overflow: hidden;
                    border: 1px solid var(--app-line); background: var(--app-surface)">
          <div class="sp-context" data-part="app">
            <div class="sp-row sp-row--between" style="height: 34px; padding: 0 12px; border-bottom: 1px solid var(--app-line)">
              <span style="font-size: 13px; font-weight: 600; color: var(--app-ink)">Notifications</span>
              <span style="display: flex; color: var(--app-muted)">${icon('sliders')}</span>
            </div>
            ${ROWS.map(row).join('')}
          </div>

          <div class="sp-row sp-row--between" data-part="snackbar" data-subject data-tone="${start.tone}"
               style="position: absolute; left: 14px; right: 14px; bottom: 14px; height: 42px; padding: 0 8px 0 14px;
                      gap: 10px; border-radius: 9px; background: var(--app-inverse-surface); box-shadow: var(--sp-shadow)">
            <span data-part="snack-message" style="font-size: 12px; color: var(--app-inverse-ink)">Message moved to Archive</span>
            <span data-part="snack-action" style="font-size: 12px; font-weight: 600; padding: 5px 9px; border-radius: 6px;
                  color: var(--app-inverse-accent)">Undo</span>
          </div>
        </div>

        <div class="sp-context" style="margin-top: 8px; height: 30px; font-size: 10px; line-height: 1.5;
             font-variant-numeric: tabular-nums; color: var(--sp-muted)">
          <div data-part="readout-app" style="white-space: nowrap"></div>
          <div data-part="readout-inverse" style="white-space: nowrap"></div>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 6px 0 0; height: 28px; font-size: 10.5px; line-height: 1.4">
          Both themes declare the inverse trio themselves. Nothing here is computed by inverting the ordinary roles.
        </p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const snackbar = part(root, 'snackbar');
  const readoutApp = part(root, 'readout-app');
  const readoutInverse = part(root, 'readout-inverse');

  const apply = (key: string) => {
    const t = THEMES[key] ?? THEMES.light;
    if (!t) return;
    scene.dataset.theme = key;
    snackbar.dataset.tone = t.tone;
    const vars: Record<string, string> = {
      '--app-surface': t.surface,
      '--app-ink': t.onSurface,
      '--app-muted': t.onSurfaceMuted,
      '--app-line': t.line,
      '--app-inverse-surface': t.inverseSurface,
      '--app-inverse-ink': t.inverseOnSurface,
      '--app-inverse-accent': t.inversePrimary,
    };
    for (const [name, value] of Object.entries(vars)) scene.style.setProperty(name, value);
    readoutApp.textContent = `surface ${t.surface} / on-surface ${t.onSurface}`;
    readoutInverse.textContent = `inverse-surface ${t.inverseSurface} / inverse-on-surface ${t.inverseOnSurface} / inverse-primary ${t.inversePrimary}`;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
