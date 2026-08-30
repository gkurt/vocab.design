import { part } from '#src/kit/parts.ts';

type Scheme = {
  label: string;
  seed: string;
  primary: string;
  onPrimary: string;
  container: string;
  onContainer: string;
  surface: string;
  onSurface: string;
  outline: string;
  wallpaper: string;
};

/**
 * Three wallpapers, three schemes the system would extract from them. The values are
 * written out rather than computed: HCT extraction is not the demonstration, what a
 * whole panel doing as it is told by a wallpaper is.
 */
const SCHEMES: Record<string, Scheme> = {
  coast: {
    label: 'Coast',
    seed: '#2A5EA7',
    primary: '#2a5ea7',
    onPrimary: '#ffffff',
    container: '#d5e3ff',
    onContainer: '#001c39',
    surface: '#f7f9ff',
    onSurface: '#191c20',
    outline: '#747a86',
    wallpaper: 'linear-gradient(150deg, #0b2f61, #2a5ea7 48%, #86b6f0)',
  },
  dune: {
    label: 'Dune',
    seed: '#8A5215',
    primary: '#8a5215',
    onPrimary: '#ffffff',
    container: '#ffdcbe',
    onContainer: '#2e1500',
    surface: '#fff8f3',
    onSurface: '#211a14',
    outline: '#8a7668',
    wallpaper: 'linear-gradient(150deg, #4a2a06, #8a5215 46%, #f0b478)',
  },
  fern: {
    label: 'Fern',
    seed: '#3D6A3A',
    primary: '#3d6a3a',
    onPrimary: '#ffffff',
    container: '#c3efb8',
    onContainer: '#002204',
    surface: '#f6fbf2',
    onSurface: '#191d17',
    outline: '#71796d',
    wallpaper: 'linear-gradient(150deg, #10310f, #3d6a3a 46%, #a8dc9c)',
  },
};

const EASE = 'transition: background-color 0.3s var(--sp-ease), color 0.3s var(--sp-ease), border-color 0.3s var(--sp-ease)';

/**
 * Material You specimen: the panel is the subject, because the term names what the
 * whole scheme does when a wallpaper is chosen, and the picker below it is the
 * instrumentation that lets a reader watch it happen. Every colour in the panel is
 * read from a role variable, so one assignment re-themes the fill, the container, the
 * ink on both, and the outline at once, which is the point the term is making.
 *
 * The tinted block in the panel used to read "Container role, with its own ink" under the
 * forecast, which named the role instead of saying anything a weather card would say. It
 * carries the forecast's own second line now; the block still shows the container role and
 * its ink by being painted in them.
 */
export function mount(root: HTMLElement): void {
  const thumbs = Object.entries(SCHEMES)
    .map(
      ([key, scheme]) => `
        <button type="button" class="sp-button--quiet" data-part="wall-${key}" aria-label="${scheme.label} wallpaper"
                style="width: 52px; height: 40px; padding: 0; border: 0; border-radius: 7px; background-image: ${scheme.wallpaper}; cursor: pointer"></button>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 14px">
      <div data-part="panel" data-subject
           style="width: 290px; padding: 14px; border-radius: 18px; border: 1px solid var(--tone-outline); background: var(--tone-surface); color: var(--tone-on-surface); ${EASE}">
        <div class="sp-row sp-row--between">
          <div>
            <div style="font-size: 15px; font-weight: 600">Today</div>
            <div data-part="seed" style="font-size: 12px; color: var(--tone-outline); ${EASE}">Seed #2A5EA7</div>
          </div>
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: var(--tone-container); color: var(--tone-on-container); font-size: 12px; font-weight: 600; ${EASE}">AK</span>
        </div>

        <div style="margin-top: 12px; padding: 10px 12px; border-radius: 14px; background: var(--tone-container); color: var(--tone-on-container); ${EASE}">
          <div style="font-size: 13px; font-weight: 600">Rain until 4pm</div>
          <div style="font-size: 12px; margin-top: 2px">Heaviest around 2pm</div>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 8px">
          <button type="button" data-part="cta"
                  style="padding: 8px 16px; border: 0; border-radius: 999px; background: var(--tone-primary); color: var(--tone-on-primary); font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; ${EASE}">
            Set a reminder
          </button>
          <span style="padding: 6px 12px; border: 1px solid var(--tone-outline); border-radius: 999px; font-size: 12px; ${EASE}">Later</span>
        </div>
      </div>

      <div class="sp-context sp-row" style="gap: 10px">
        <span class="sp-label">Wallpaper</span>
        ${thumbs}
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const seed = part(root, 'seed');
  const thumbButtons = Object.keys(SCHEMES).map((key) => [key, part(root, `wall-${key}`)] as const);

  const apply = (key: string): void => {
    const scheme = SCHEMES[key];
    if (!scheme) return;
    panel.style.setProperty('--tone-primary', scheme.primary);
    panel.style.setProperty('--tone-on-primary', scheme.onPrimary);
    panel.style.setProperty('--tone-container', scheme.container);
    panel.style.setProperty('--tone-on-container', scheme.onContainer);
    panel.style.setProperty('--tone-surface', scheme.surface);
    panel.style.setProperty('--tone-on-surface', scheme.onSurface);
    panel.style.setProperty('--tone-outline', scheme.outline);
    seed.textContent = `Seed ${scheme.seed}`;
    for (const [other, button] of thumbButtons) {
      const selected = other === key;
      button.setAttribute('aria-selected', String(selected));
      // Written from script rather than from a state rule, since a demo has no
      // stylesheet of its own and this ring is one specimen's instrumentation.
      button.style.outline = selected ? '2px solid var(--sp-ink)' : 'none';
      button.style.outlineOffset = '2px';
    }
  };

  for (const [key, button] of thumbButtons) button.addEventListener('click', () => apply(key));
  apply('coast');
}
