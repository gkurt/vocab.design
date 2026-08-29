import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Three schemes over one set of roles. Plum is a dark scheme, so every value in the
 * card changes at once and not one of the names it is written against does.
 */
const SCHEMES: Record<string, Record<string, string>> = {
  default: {
    surface: '#FFFFFF',
    'on-surface': '#1B2130',
    outline: '#C9D0DE',
    primary: '#3557E8',
    'on-primary': '#FFFFFF',
    error: '#C2312B',
  },
  forest: {
    surface: '#F1F7F1',
    'on-surface': '#14261A',
    outline: '#BCD2BF',
    primary: '#2F7D4F',
    'on-primary': '#FFFFFF',
    error: '#A6402A',
  },
  plum: {
    surface: '#241E2E',
    'on-surface': '#F1ECFA',
    outline: '#4A3F5C',
    primary: '#C79BFF',
    'on-primary': '#241033',
    error: '#FF9A9A',
  },
};
const ROLES = ['surface', 'on-surface', 'outline', 'primary', 'on-primary', 'error'];
const START = 'default';

/**
 * Colour role specimen: a card whose every part is labelled with the job it asks for
 * rather than with the value it gets. Changing scheme repaints all six values while
 * the six names on screen stay exactly where they are, which is the claim.
 *
 * The subject is the card. No narrower element is the term: a role is not a colour on
 * screen but the reference a component makes, and the card is the smallest thing here
 * that holds a whole set of them. The scheme control and the caption stay outside it.
 */
export function mount(root: HTMLElement): void {
  const vars = (name: string) => ROLES.map((role) => `--r-${role}: ${SCHEMES[name]?.[role]}`).join('; ');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scheme" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-default" value="default">Default</button>
            <button class="sp-segment" data-part="seg-forest" value="forest">Forest</button>
            <button class="sp-segment" data-part="seg-plum" value="plum">Plum</button>
          </sp-segmented>
        </div>

        <div data-part="card" data-subject data-scheme="${START}"
             style="margin-top: 14px; padding: 14px; border-radius: var(--sp-radius); ${vars(START)};
                    background: var(--r-surface); border: 1px solid var(--r-outline); color: var(--r-on-surface)">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="color: var(--r-on-surface)">on-surface</span>
            <span class="sp-row" data-part="error-row" style="gap: 4px; color: var(--r-error); font-size: 12px; font-weight: 500">
              ${icon('alert')}error
            </span>
          </div>

          <p class="sp-text" style="margin: 6px 0 0; color: var(--r-on-surface); opacity: 0.7">
            Every part below asks for a job, never for a value.
          </p>

          <div style="height: 1px; margin: 12px 0; background: var(--r-outline)"></div>

          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--sm" data-part="cta"
                    style="background: var(--r-primary); color: var(--r-on-primary)">on-primary</button>
            <button class="sp-button sp-button--sm" data-part="ghost"
                    style="background: transparent; border: 1px solid var(--r-outline); color: var(--r-on-surface)">outline</button>
            <span class="sp-grow"></span>
            <span class="sp-label" style="color: var(--r-on-surface); opacity: 0.6">surface</span>
          </div>
        </div>

        <p class="sp-text sp-context" style="margin: 12px 0 0">
          Six values changed. Not one of the six names the card is written against did.
        </p>
      </div>
    </div>
  `;

  const card = part(root, 'card');

  const theme = (name: string) => {
    const scheme = SCHEMES[name];
    if (!scheme) return;
    card.dataset.scheme = name;
    for (const role of ROLES) card.style.setProperty(`--r-${role}`, scheme[role] ?? '');
  };
  theme(START);

  part(root, 'segmented').addEventListener('change', (event) => theme((event as CustomEvent<string>).detail));
}
