import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Scheme = 'light' | 'dark';

type Palette = { canvas: string; field: string; ink: string; muted: string; line: string; accent: string };

/** The panel's own paint, so the specimen reads the same whatever theme the page is in. */
const PALETTES: Record<Scheme, Palette> = {
  light: { canvas: '#FFFFFF', field: '#F5F7FA', ink: '#1B2130', muted: '#5A6474', line: '#D5DAE4', accent: '#3557E8' },
  dark: { canvas: '#1C1F26', field: '#262A32', ink: '#E7EAF0', muted: '#9AA3B2', line: '#383D47', accent: '#7B93F5' },
};

const NOTES: Record<string, string> = {
  light: 'Declared light, so the system preference is ignored here and the browser draws its own widgets from the light set.',
  dark: 'Declared dark, so the page opts out of light rendering entirely, whatever the system asks for.',
  auto: 'Declared "light dark", so the system preference decides, and the scrollbar and checkbox follow it.',
};

const START_SCHEME = 'light';
const START_OS: Scheme = 'light';

const resolve = (declared: string, os: Scheme): Scheme => (declared === 'auto' ? os : (declared as Scheme));

/**
 * Colour scheme specimen: a small settings panel that declares which renderings it
 * supports, under a simulated system preference. The declaration is a real
 * `color-scheme` on the panel, so the native checkbox and the panel's own scrollbar are
 * repainted by the browser rather than by this demo, which is the half of the term that
 * a hand-built palette cannot show.
 *
 * The subject is the panel that carries the declaration, not the window around it: the
 * term names the element the property is set on. Both segmented controls are
 * instrumentation and stay in the context register. Palettes, the panel box, and the
 * note block are all fixed size, so changing either setting repaints and moves nothing
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = resolve(START_SCHEME, START_OS);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="System" data-part="os" data-value="${START_OS}">
            <button class="sp-segment" data-part="os-light" value="light">Light</button>
            <button class="sp-segment" data-part="os-dark" value="dark">Dark</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="color-scheme" data-part="scheme" data-value="${START_SCHEME}">
            <button class="sp-segment" data-part="scheme-light" value="light">light</button>
            <button class="sp-segment" data-part="scheme-dark" value="dark">dark</button>
            <button class="sp-segment" data-part="scheme-auto" value="auto">light dark</button>
          </sp-segmented>
        </div>

        <div data-part="panel" data-subject data-scheme="${START_SCHEME}" data-resolved="${start}"
             style="margin-top: 14px; height: 128px; display: flex; border-radius: var(--sp-radius); overflow: hidden;
                    border: 1px solid var(--cs-line); background: var(--cs-canvas); color: var(--cs-ink)">
          <div class="sp-scroll" data-part="pane"
               style="flex: 1 1 auto; overflow-y: scroll; padding: 12px 14px; scrollbar-width: auto">
            <div style="font-size: 13px; font-weight: 600">Notifications</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px">
              <input data-part="box" type="checkbox" checked style="width: 15px; height: 15px; margin: 0; accent-color: var(--cs-accent)">
              <span style="font-size: 12px">Email me about replies</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
              <input type="checkbox" style="width: 15px; height: 15px; margin: 0; accent-color: var(--cs-accent)">
              <span style="font-size: 12px">Weekly digest</span>
            </div>
            <div data-part="field"
                 style="margin-top: 12px; padding: 6px 9px; border-radius: 6px; font-size: 12px;
                        border: 1px solid var(--cs-line); background: var(--cs-field); color: var(--cs-muted)">
              you@example.com
            </div>
            <p style="margin: 10px 0 0; font-size: 12px; line-height: 1.5; color: var(--cs-muted)">
              The scrollbar beside this text, the checkbox glyphs, and the selection highlight
              are drawn by the browser from whichever set the declaration named.
            </p>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; min-height: 40px">${NOTES[START_SCHEME]}</p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');

  const dress = () => {
    const declared = panel.dataset.scheme ?? 'light';
    const os = (panel.dataset.os ?? START_OS) as Scheme;
    const resolved = resolve(declared, os);
    const palette = PALETTES[resolved];
    panel.dataset.resolved = resolved;
    // The real property: the native checkbox and this pane's scrollbar answer to it.
    panel.style.colorScheme = declared === 'auto' ? 'light dark' : declared;
    panel.style.setProperty('--cs-canvas', palette.canvas);
    panel.style.setProperty('--cs-field', palette.field);
    panel.style.setProperty('--cs-ink', palette.ink);
    panel.style.setProperty('--cs-muted', palette.muted);
    panel.style.setProperty('--cs-line', palette.line);
    panel.style.setProperty('--cs-accent', palette.accent);
    part(root, 'note').textContent = NOTES[declared] ?? '';
  };

  panel.dataset.os = START_OS;
  dress();

  part(root, 'scheme').addEventListener('change', (event) => {
    panel.dataset.scheme = (event as CustomEvent<string>).detail;
    dress();
  });

  part(root, 'os').addEventListener('change', (event) => {
    panel.dataset.os = (event as CustomEvent<string>).detail;
    dress();
  });
}
