import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'split' | 'all';
type Screen = '1' | '2' | '3' | 'review';

const TYPES = [
  { key: 'car', label: 'Car' },
  { key: 'van', label: 'Van' },
  { key: 'bike', label: 'Motorcycle' },
];

const USE = [
  { key: 'yes', label: 'Yes' },
  { key: 'no', label: 'No' },
];

const CAPTION = {
  split: 'One question a screen. There is nothing to choose between, and an error here can only be about the thing being asked.',
  all: 'The same three questions on one screen. The reader picks an order, and a complaint now has to say which field it means.',
} as const;

/** The flow only ever runs forwards, so the next screen is a lookup, never a guess. */
const NEXT: Record<Screen, Screen> = { '1': '2', '2': '3', '3': 'review', review: 'review' };

const UNANSWERED = 'Not answered';
const CHIP = 'font-size: 11px; padding: 2px 9px';

/**
 * One thing per page specimen: the same three questions built twice. The split build
 * asks one at a time, with a progress line and a Continue that goes to exactly one
 * place; the crowded build puts all three on a single screen, which is the version the
 * doctrine exists to argue against.
 *
 * The subject is the question screen, the narrowest element the term actually names.
 * The window, the state control, and the caption are scenery (SPEC §5). The crowded
 * build and the review screen are states the subject itself passes through, so the
 * honest condition is declared in `data-pose` and the mount state satisfies it:
 * identify refuses to ring a page asking three questions, or a summary asking none
 * (SPEC §6).
 *
 * Both builds fill the same fixed box and the caption holds a fixed height, so
 * changing question or build moves nothing (SPEC §5). Continue steps forward and each
 * segment reaches its own build, so no control depends on the state it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  let mode: Mode = 'split';
  let screen: Screen = '1';
  let reg = '';
  let type = '';
  let business = '';

  const chip = (name: string, group: string, key: string, label: string, on: boolean) => `
    <button class="sp-chip" type="button" role="radio" aria-checked="${String(on)}" ${on ? 'data-selected' : ''}
            data-part="${name}" data-pick="${group}" data-key="${key}" style="${CHIP}">${label}</button>`;

  const progress = (step: number) => `
    <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 4px">
      <span class="sp-label" data-part="progress" data-step="${step}">Question ${step} of 3</span>
      <div class="sp-progress" style="--sp-value: ${Math.round((step / 3) * 100)}%"><div class="sp-progress-fill"></div></div>
    </div>`;

  const question = (step: number, title: string, control: string, help: string) => `
    ${progress(step)}
    <div class="sp-stack" style="flex: 1 1 auto; min-height: 0; gap: 8px">
      <span class="sp-heading" style="font-size: 15px">${title}</span>
      ${control}
      <span class="sp-text sp-context" style="font-size: 11px">${help}</span>
    </div>
    <button class="sp-button sp-button--sm" type="button" data-part="continue" style="flex: 0 0 auto; align-self: flex-start">Continue</button>`;

  const splitScreens = {
    '1': () =>
      question(
        1,
        'What is the registration number?',
        `<input class="sp-input" type="text" data-part="field" data-field="reg" value="${reg}" spellcheck="false"
                autocomplete="off" aria-label="Registration number" style="font-size: 12px; padding: 5px 8px" />`,
        'It is on the front of the vehicle, and on the log book.',
      ),
    '2': () =>
      question(
        2,
        'What type of vehicle is it?',
        `<div class="sp-row sp-row--wrap" style="gap: 6px">${TYPES.map((t) => chip(`q2-${t.key}`, 'type', t.key, t.label, t.key === type)).join('')}</div>`,
        'Pick the one it is registered as, not the one it is used as.',
      ),
    '3': () =>
      question(
        3,
        'Is it insured for business use?',
        `<div class="sp-row sp-row--wrap" style="gap: 6px">${USE.map((u) => chip(`q3-${u.key}`, 'business', u.key, u.label, u.key === business)).join('')}</div>`,
        'Answer for the cover you hold today, not the cover you are about to buy.',
      ),
    review: () => `
      <span class="sp-heading" style="flex: 0 0 auto; font-size: 14px">Check your answers</span>
      <ul class="sp-list" style="flex: 1 1 auto; min-height: 0">
        ${[
          { name: 'reg', label: 'Registration', value: reg || UNANSWERED },
          { name: 'type', label: 'Type', value: TYPES.find((t) => t.key === type)?.label ?? UNANSWERED },
          { name: 'business', label: 'Business use', value: USE.find((u) => u.key === business)?.label ?? UNANSWERED },
        ]
          .map(
            ({ name, label, value }) => `
              <li class="sp-row" data-part="answer-${name}" data-value="${value}" style="gap: 8px; padding: 5px 0; border-top: 1px solid var(--sp-line)">
                <span class="sp-label" style="flex: 0 0 96px">${label}</span>
                <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${value}</span>
              </li>`,
          )
          .join('')}
      </ul>
      <span class="sp-text sp-context" style="flex: 0 0 auto; font-size: 11px">
        Three screens answered, one screen to read them back on.
      </span>`,
  } satisfies Record<Screen, () => string>;

  const group = (label: string, control: string) => `
    <div class="sp-stack" style="flex: 0 0 auto; gap: 3px">
      <span class="sp-label" style="font-size: 11px">${label}</span>
      ${control}
    </div>`;

  // Denser than the split build on purpose: a page carrying three questions has less
  // room for each of them, which is half of what the pattern is arguing about.
  const crowded = () => `
    <div style="display: flex; flex-direction: column; gap: 4px; height: 100%">
      ${group(
        'Registration number',
        `<input class="sp-input" type="text" data-part="all-reg" data-field="reg" value="${reg}" spellcheck="false"
                autocomplete="off" aria-label="Registration number" style="font-size: 12px; padding: 3px 8px" />`,
      )}
      ${group(
        'Vehicle type',
        `<div class="sp-row sp-row--wrap" data-part="all-type" style="gap: 6px">${TYPES.map((t) => chip(`all-type-${t.key}`, 'type', t.key, t.label, t.key === type)).join('')}</div>`,
      )}
      ${group(
        'Insured for business use',
        `<div class="sp-row sp-row--wrap" data-part="all-business" style="gap: 6px">${USE.map((u) => chip(`all-business-${u.key}`, 'business', u.key, u.label, u.key === business)).join('')}</div>`,
      )}
      <button class="sp-button sp-button--sm" type="button" data-part="continue"
              style="flex: 0 0 auto; align-self: flex-start; margin-top: auto; font-size: 12px; padding: 4px 10px">Continue</button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <div class="sp-row sp-row--between sp-context" style="height: 30px">
          <span class="sp-label">Register a vehicle</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="split" data-axis="Built" data-term="split">
            <button class="sp-segment" data-part="seg-split" value="split" style="font-size: 12px; padding: 5px 10px">One per page</button>
            <button class="sp-segment" data-part="seg-all" value="all" style="font-size: 12px; padding: 5px 10px">All at once</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="form" data-subject data-pose="[data-mode=split]:not([data-q=review])" data-mode="split" data-q="1"
             style="display: flex; flex-direction: column; gap: 8px; height: 188px; margin-top: 8px; padding: 10px 14px; overflow: hidden"></div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="split" style="margin: 8px 0 0; height: 32px; font-size: 11px"></p>
      </div>
    </div>
  `;

  const form = part(root, 'form');
  const caption = part(root, 'caption');

  const draw = () => {
    form.dataset.mode = mode;
    form.dataset.q = mode === 'all' ? 'all' : screen;
    form.innerHTML = mode === 'all' ? crowded() : splitScreens[screen]();
    caption.dataset.case = mode;
    caption.textContent = CAPTION[mode];
  };

  // Delegated: the screen's contents are rewritten every time the flow or the build moves.
  form.addEventListener('input', (event) => {
    const field = event.target as HTMLInputElement;
    if (field.dataset.field !== 'reg') return;
    reg = field.value;
  });

  form.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const picked = target.closest<HTMLElement>('[data-pick]');
    if (picked) {
      const key = picked.dataset.key ?? '';
      if (picked.dataset.pick === 'type') type = key;
      else business = key;
      for (const el of form.querySelectorAll<HTMLElement>(`[data-pick="${picked.dataset.pick}"]`)) {
        const on = el === picked;
        el.setAttribute('aria-checked', String(on));
        flag(el, 'data-selected', on);
      }
      return;
    }
    // Continue only ever goes forward, and the crowded build has nowhere further to go:
    // one screen already holds every question it asks.
    if (!target.closest('[data-part=continue]') || mode === 'all') return;
    screen = NEXT[screen];
    draw();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'all' ? 'all' : 'split';
    // Each segment reaches a whole build, so the split one always starts where it starts.
    if (mode === 'split') screen = '1';
    draw();
  });

  draw();
}
