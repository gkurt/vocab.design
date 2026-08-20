import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const MENU_W = 268;
/** The menu's anchor above the composer, stated once so opening it moves nothing (SPEC §5). */
const MENU_BOTTOM = 90;

interface Model {
  key: string;
  name: string;
  /** The line that does the real work: what this option is for, in task terms, not in tokens. */
  desc: string;
  hint: string;
}

const MODELS: Model[] = [
  { key: 'lumen', name: 'Lumen 3', desc: 'Balanced. Everyday questions.', hint: 'Standard' },
  { key: 'mini', name: 'Lumen 3 Mini', desc: 'Answers in about a second.', hint: 'Fastest' },
  { key: 'atlas', name: 'Atlas Pro', desc: 'Slower, for hard problems.', hint: 'Deepest' },
];

/**
 * Model selector specimen: an assistant composer whose left-hand control says which model will
 * answer, and opens a list of the alternatives when pressed. Every option carries a name, one line
 * saying what it is for, and a small hint, because the names alone mean nothing to the person
 * reading them. The model names are invented on purpose: a specimen never impersonates a product.
 *
 * The subject is the trigger, the narrowest element the term names and the one that is always on
 * screen. The menu is the surface the trigger owns rather than the control itself, which is why the
 * choice has to land back on the trigger's own label: the menu is gone the moment it is used, so
 * that label is the only place an assert (or a reader) can read the answer. The thread, the
 * composer's own field and the send button are scenery in the context register. The trigger is
 * honestly a model selector in every state, so no `data-pose` condition is needed.
 *
 * The menu is absolutely positioned against the body and anchored above the composer, so opening it
 * shifts nothing; each row reserves its check mark whether or not it is the current one, so the
 * selection moving does not move any text. Pressing the trigger opens rather than toggles, and
 * choosing an option is the dismissal, so a pass resumed anywhere lands on a state (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const row = (model: Model) => `
    <button
      class="sp-menu-item"
      type="button"
      role="menuitemradio"
      data-part="item-${model.key}"
      style="align-items: flex-start; gap: 6px; padding: 6px 8px"
    >
      <span data-part="tick-${model.key}" style="flex: 0 0 16px; height: 16px; opacity: 0">${icon('check')}</span>
      <span style="flex: 1 1 auto; min-width: 0">
        <span class="sp-row sp-row--between" style="gap: 8px">
          <span style="font-size: 12.5px; font-weight: 500; white-space: nowrap">${model.name}</span>
          <span
            class="sp-label"
            style="flex: 0 0 auto; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 999px; font-size: 10px; white-space: nowrap"
            >${model.hint}</span
          >
        </span>
        <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px; line-height: 1.3; white-space: nowrap">${model.desc}</span>
      </span>
    </button>`;

  const bubble = (width: string, align: string) => `
    <div class="sp-stack" style="align-items: ${align}; gap: 5px; width: 100%">
      <span class="sp-surface" style="width: ${width}; padding: 7px 9px; border-radius: 9px">
        <span class="sp-line" style="display: block; width: 100%"></span>
        <span class="sp-line" style="display: block; width: 64%; margin-top: 5px"></span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Assistant</span>
          <span class="sp-label" style="font-size: 11px; white-space: nowrap">Applies to your next message</span>
        </div>

        <div class="sp-body" style="position: relative; display: flex; flex-direction: column; justify-content: flex-end; gap: 10px">
          <div class="sp-stack sp-context" data-part="thread" style="gap: 8px">
            ${bubble('58%', 'flex-end')}
            ${bubble('72%', 'flex-start')}
          </div>

          <div class="sp-surface" data-part="composer" style="padding: 8px">
            <span class="sp-text sp-context" style="display: block; height: 22px; padding: 3px 2px; font-size: 12px">Ask anything</span>
            <div class="sp-row" style="gap: 8px; margin-top: 6px">
              <button
                class="sp-button sp-button--quiet"
                type="button"
                data-part="trigger"
                data-subject
                data-model="lumen"
                aria-haspopup="menu"
                aria-expanded="false"
                style="display: inline-flex; align-items: center; gap: 5px; flex: 0 0 auto; height: 26px; padding: 0 8px; border-radius: 6px; font-size: 12px"
              >
                <span data-part="trigger-name" style="white-space: nowrap">${MODELS[0]?.name}</span>
                ${icon('chevronDown')}
              </button>
              <span class="sp-grow"></span>
              <button class="sp-icon-button sp-context" type="button" data-part="attach" aria-label="Attach" style="width: 26px; height: 26px">${icon('copy')}</button>
              <button
                class="sp-button sp-context"
                type="button"
                data-part="send"
                style="display: inline-flex; align-items: center; gap: 5px; flex: 0 0 auto; height: 26px; padding: 0 10px; font-size: 12px"
              >Send</button>
            </div>
          </div>

          <div
            class="sp-menu"
            data-part="menu"
            role="menu"
            style="left: 12px; bottom: ${MENU_BOTTOM}px; width: ${MENU_W}px; transform-origin: bottom left"
          >
            ${MODELS.map(row).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const trigger = part(root, 'trigger');
  const triggerName = part(root, 'trigger-name');
  const menu = part(root, 'menu');

  const close = () => {
    flag(menu, 'data-open', false);
    flag(trigger, 'data-open', false);
    trigger.setAttribute('aria-expanded', 'false');
  };

  const choose = (model: Model) => {
    trigger.dataset.model = model.key;
    triggerName.textContent = model.name;
    for (const other of MODELS) {
      const item = part(root, `item-${other.key}`);
      const tick = part(root, `tick-${other.key}`);
      const current = other.key === model.key;
      item.setAttribute('aria-checked', String(current));
      flag(item, 'data-current', current);
      // The mark is reserved in every row, so the selection moving moves no text (SPEC §5).
      tick.style.opacity = current ? '1' : '0';
    }
  };

  // Pressing the trigger reaches the open state rather than flipping it; only a choice closes it.
  trigger.addEventListener('click', () => {
    flag(menu, 'data-open', true);
    flag(trigger, 'data-open', true);
    trigger.setAttribute('aria-expanded', 'true');
  });

  for (const model of MODELS) {
    part(root, `item-${model.key}`).addEventListener('click', () => {
      choose(model);
      close();
    });
  }

  choose(MODELS[0] as Model);
  close();
}
