/**
 * De Stijl specimen: one composition in the whole vocabulary. Unequal tracks, heavy black
 * rules, three primary fields and the rest left white, balanced by weight rather than by
 * symmetry.
 *
 * The rules are the grid's own gaps showing through a black ground, which is the honest
 * construction: a rule here is two fields sharing an edge, not a border drawn around a box.
 * The primaries and the paper white are stated inline because the palette is the term, and
 * the kit has one accent and no red or yellow at all.
 *
 * Static: a painting has no states, so the specimen is looked at rather than watched.
 */
const INK = '#141414';
const PAPER = '#f7f5ef';
const RED = '#d42f21';
const YELLOW = '#f5c400';
const BLUE = '#1b47a8';
const RULE = 7;

/** One field of the composition. Colour and grid placement are all a field ever carries. */
function field(area: string, colour: string, part?: string): string {
  const tag = part ? ` data-part="${part}"` : '';
  return `<span${tag} style="grid-area: ${area}; background: ${colour}"></span>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="composition" data-subject aria-hidden="true"
           style="display: grid; width: 238px; height: 222px; padding: ${RULE}px; gap: ${RULE}px; background: ${INK};
                  grid-template-columns: 0.5fr 0.22fr 1.15fr 0.3fr;
                  grid-template-rows: 1.45fr 0.4fr 0.55fr">
        ${field('1 / 1 / 2 / 3', PAPER)}
        ${field('1 / 3 / 2 / 5', RED, 'field-red')}
        ${field('2 / 1 / 3 / 2', PAPER)}
        ${field('2 / 2 / 3 / 5', PAPER)}
        ${field('3 / 1 / 4 / 2', BLUE, 'field-blue')}
        ${field('3 / 2 / 4 / 4', PAPER, 'field-white')}
        ${field('3 / 4 / 4 / 5', YELLOW, 'field-yellow')}
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 250px; margin: 0; text-align: center">
        Unequal tracks, three primaries, no curve and no diagonal anywhere.
      </p>
    </div>
  `;
}
