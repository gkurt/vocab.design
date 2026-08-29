import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'semantic' | 'soup';

/** The implicit roles this scene can show, keyed by the element that carries them. */
const ROLES: Record<string, string> = {
  header: 'banner',
  nav: 'navigation',
  h1: 'heading 1',
  h2: 'heading 2',
  button: 'button',
  ul: 'list',
  li: 'listitem',
  footer: 'contentinfo',
};

/** One card, twice: same paint, same words, different elements underneath. */
function cardMarkup(mode: Mode): string {
  const semantic = mode === 'semantic';
  const wrap = (tag: string, attrs: string, body: string) =>
    semantic ? `<${tag} ${attrs}>${body}</${tag}>` : `<div ${attrs}>${body}</div>`;
  const nav = wrap(
    'nav',
    'style="display: flex; gap: 4px"',
    ['Beans', 'Cafe'].map((item) => `<span class="sp-nav-item" style="padding: 2px 6px; font-size: 12px">${item}</span>`).join(''),
  );
  const title = semantic
    ? '<h2 style="margin: 0; font-size: 13px">Roastery</h2>'
    : '<div style="font-size: 13px; font-weight: 600">Roastery</div>';
  const order = semantic
    ? '<button class="sp-button sp-button--sm" type="button" style="margin-top: 12px">Order</button>'
    : '<div class="sp-button sp-button--sm" style="display: inline-block; margin-top: 12px">Order</div>';

  return `
    ${wrap('header', 'class="sp-row sp-row--between"', `${title}${nav}`)}
    <div class="sp-line" style="margin-top: 12px; width: 100%"></div>
    <div class="sp-line" style="margin-top: 6px; width: 68%"></div>
    ${order}
    ${wrap('footer', 'class="sp-label" style="display: block; margin-top: 12px"', 'Est. 2019')}`;
}

/** Read off the live card, so the panel reports the tree the markup actually built. */
function rolesIn(card: HTMLElement): { roles: string[]; generic: number } {
  const roles: string[] = [];
  let generic = 0;
  for (const el of card.querySelectorAll('*')) {
    const role = ROLES[el.tagName.toLowerCase()];
    if (!role) {
      generic += 1;
      continue;
    }
    if (!roles.includes(role)) roles.push(role);
  }
  return { roles, generic };
}

/**
 * Semantic HTML specimen: the same card built twice, once from the elements that mean
 * what the card means and once from divs painted to match. Nothing separates them on
 * screen. The panel underneath reads the implicit roles out of whichever card is
 * selected, and the div version has none to report.
 *
 * The subject is the card built from real elements. The term names the choice of
 * element, and the card is the narrowest thing that carries a set of them: pointing at
 * the button alone would claim the term is about one control. The div twin, the
 * switcher, and the roles panel are scenery (SPEC §5), and the panel's body is a fixed
 * height, so a report of five roles and a report of none occupy the same room.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row" style="align-items: stretch; gap: 12px">
          <div class="sp-stack sp-grow" style="gap: 6px">
            <span class="sp-label sp-context">Real elements</span>
            <div class="sp-surface" data-part="semantic" data-subject style="padding: 10px"></div>
          </div>
          <div class="sp-stack sp-grow sp-context" style="gap: 6px">
            <span class="sp-label">Div soup</span>
            <div class="sp-surface" data-part="soup" style="padding: 10px"></div>
          </div>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 14px; padding: 10px 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Roles a screen reader finds</span>
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="Markup" data-part="segmented" data-value="semantic">
              <button class="sp-segment" data-part="seg-semantic" value="semantic">Real</button>
              <button class="sp-segment" data-part="seg-soup" value="soup">Divs</button>
            </sp-segmented>
          </div>
          <div class="sp-row sp-row--wrap" data-part="roles" data-state="semantic" style="margin-top: 8px; height: 54px; align-items: flex-start"></div>
        </div>
      </div>
    </div>
  `;

  const semantic = part(root, 'semantic');
  const soup = part(root, 'soup');
  const roles = part(root, 'roles');

  semantic.innerHTML = cardMarkup('semantic');
  soup.innerHTML = cardMarkup('soup');

  const report = (mode: Mode) => {
    const found = rolesIn(mode === 'semantic' ? semantic : soup);
    roles.dataset.state = mode;
    roles.innerHTML =
      found.roles.length > 0
        ? found.roles.map((role) => `<span class="sp-chip" data-part="role-chip">${role}</span>`).join('')
        : `<span class="sp-text" data-part="none">Nothing to report: ${found.generic} generic boxes, one of which takes clicks.</span>`;
  };

  report('semantic');

  part(root, 'segmented').addEventListener('change', (event) => {
    report((event as CustomEvent<string>).detail as Mode);
  });
}
