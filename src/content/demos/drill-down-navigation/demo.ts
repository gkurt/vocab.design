import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

interface Dish {
  name: string;
  price: string;
  note: string;
}

const MENU: { key: string; title: string; count: string; dishes: Dish[] }[] = [
  {
    key: 'starters',
    title: 'Starters',
    count: '4 dishes',
    dishes: [
      { name: 'Padrón peppers', price: '6.00', note: 'Blistered, sea salt, lemon.' },
      { name: 'Bread and butter', price: '4.50', note: 'Sourdough, cultured butter.' },
      { name: 'Anchovy toast', price: '7.50', note: 'White anchovy, tomato, chive.' },
    ],
  },
  {
    key: 'mains',
    title: 'Mains',
    count: '6 dishes',
    dishes: [
      { name: 'Sea bass', price: '19.00', note: 'Fennel, brown butter, capers.' },
      { name: 'Mushroom orzo', price: '15.00', note: 'Wild mushrooms, thyme, pecorino.' },
      { name: 'Lamb shoulder', price: '22.00', note: 'Slow roast, salsa verde, greens.' },
    ],
  },
  {
    key: 'desserts',
    title: 'Desserts',
    count: '3 dishes',
    dishes: [
      { name: 'Burnt cheesecake', price: '7.00', note: 'Basque style, sherry cream.' },
      { name: 'Lemon posset', price: '6.50', note: 'Shortbread, candied peel.' },
      { name: 'Affogato', price: '5.50', note: 'Espresso, vanilla ice cream.' },
    ],
  },
];

const ROW =
  'display: flex; align-items: center; gap: 8px; width: 100%; padding: 8px 10px; border: 0; border-radius: 6px; background: transparent; font: inherit; text-align: left; cursor: pointer';

/**
 * Drill-down navigation specimen: a menu on a phone-width panel, one level at a time.
 * Choosing a category replaces the list with that category's dishes, choosing a dish
 * replaces it with the dish, and the header's back control names the level it returns
 * to rather than pointing an arrow at nothing.
 *
 * The subject is the panel stack: the header and the viewport that swap levels
 * together, since neither half is the term on its own. The phone chrome around it and
 * the note under the frame are scenery (SPEC §5). No `data-pose`: every level the stack
 * reaches is the same term doing its work.
 *
 * The viewport is a fixed box and the levels slide inside it, so a deeper level with
 * fewer rows never changes the panel's size, and the back control keeps its space at
 * the root instead of appearing and shoving the title sideways (SPEC §5). Rows push and
 * the header pops: two controls travelling in opposite directions, never one toggle
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const categories = MENU.map(
    (group) => `
      <button data-part="cat-${group.key}" type="button" style="${ROW}">
        <span class="sp-grow" style="min-width: 0">
          <span class="sp-text sp-text--ink" style="display: block; font-size: 13px">${group.title}</span>
          <span class="sp-label" style="display: block; font-size: 10px">${group.count}</span>
        </span>
        ${icon('chevronRight')}
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 272px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wren &amp; Co</span>
          <span class="sp-label" style="font-size: 11px">Menu</span>
        </div>
        <div class="sp-body">
          <section class="sp-surface" data-part="stack" data-subject data-depth="0" style="display: flex; flex-direction: column; height: 100%; overflow: hidden">

            <div class="sp-row" style="position: relative; flex: 0 0 auto; gap: 6px; height: 36px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-heading" data-part="level-title" style="position: absolute; left: 0; right: 0; text-align: center; font-size: 12px">Menu</span>
              <button
                class="sp-button sp-button--quiet sp-button--sm"
                data-part="back"
                type="button"
                style="position: relative; display: inline-flex; align-items: center; gap: 4px; padding: 4px 6px; font-size: 12px; visibility: hidden"
              >
                ${icon('chevronLeft')}<span data-part="back-label">Menu</span>
              </button>
            </div>

            <div style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden">
              <div data-part="track" style="display: flex; width: 300%; height: 100%; transition: transform 0.26s var(--sp-ease)">
                <div data-part="level-0" style="flex: 0 0 33.3333%; padding: 6px">${categories}</div>
                <div data-part="level-1" style="flex: 0 0 33.3333%; padding: 6px"></div>
                <div data-part="level-2" style="flex: 0 0 33.3333%; padding: 10px"></div>
              </div>
            </div>

          </section>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="note" style="width: 420px; font-size: 11px; text-align: center">
          One panel, one level at a time. The way back up is the name of the level above.
        </span>
      </div>
    </div>
  `;

  const stack = part(root, 'stack');
  const track = part(root, 'track');
  const back = part(root, 'back');
  const backLabel = part(root, 'back-label');
  const title = part(root, 'level-title');
  const levelOne = part(root, 'level-1');
  const levelTwo = part(root, 'level-2');

  let group = MENU[1] as (typeof MENU)[number];
  let dish = group.dishes[0] as Dish;

  const go = (depth: number) => {
    stack.dataset.depth = String(depth);
    track.style.transform = `translateX(-${depth * 33.3333}%)`;
    back.style.visibility = depth === 0 ? 'hidden' : 'visible';
    backLabel.textContent = depth === 2 ? group.title : 'Menu';
    title.textContent = depth === 0 ? 'Menu' : depth === 1 ? group.title : dish.name;
  };

  const openDish = (index: number) => {
    dish = group.dishes[index] as Dish;
    levelTwo.innerHTML = `
      <div class="sp-stack" data-part="detail" style="gap: 6px">
        <span class="sp-heading" style="font-size: 14px">${dish.name}</span>
        <span class="sp-text" style="font-size: 12px">${dish.note}</span>
        <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums">${dish.price}</span>
        <button class="sp-button sp-button--sm" data-part="add" type="button" style="margin-top: 4px">Add to order</button>
      </div>`;
    go(2);
  };

  const openGroup = (key: string) => {
    group = MENU.find((candidate) => candidate.key === key) ?? group;
    levelOne.innerHTML = group.dishes
      .map(
        (item, i) => `
          <button data-part="dish-${i}" type="button" style="${ROW}">
            <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 13px">${item.name}</span>
            <span class="sp-text" style="font-size: 12px; font-variant-numeric: tabular-nums">${item.price}</span>
            ${icon('chevronRight')}
          </button>`,
      )
      .join('');
    for (let i = 0; i < group.dishes.length; i++) {
      part(levelOne, `dish-${i}`).addEventListener('click', () => openDish(i));
    }
    go(1);
  };

  for (const entry of MENU) part(root, `cat-${entry.key}`).addEventListener('click', () => openGroup(entry.key));

  back.addEventListener('click', () => {
    const depth = Number(stack.dataset.depth ?? 0);
    if (depth > 0) go(depth - 1);
  });

  go(0);
}
