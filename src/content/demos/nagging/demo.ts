import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Mode = 'first' | 'third' | 'remembered';

interface Dress {
  nag: 'on' | 'off';
  ask: number;
  askLabel: string;
  title: string;
  body: string;
  note: string;
}

const DRESS: Record<Mode, Dress> = {
  first: {
    nag: 'on',
    ask: 1,
    askLabel: 'Ask 1',
    title: 'Turn on notifications?',
    body: 'We will let you know when someone replies to a note.',
    note: 'The first ask is not the pattern yet. It becomes one the moment the answer is not kept.',
  },
  third: {
    nag: 'on',
    ask: 3,
    askLabel: 'Ask 3',
    title: 'Turn on notifications?',
    body: 'We will let you know when someone replies to a note.',
    note: 'The same prompt, third time, word for word. Nothing has changed except the reader, who now has a cheaper way to make it stop than refusing again.',
  },
  remembered: {
    nag: 'off',
    ask: 1,
    askLabel: 'Asked once',
    title: 'Notifications are off',
    body: 'You said no, and that answer was kept. The switch waits in Settings for whenever it is wanted.',
    note: 'The refusal is remembered and the ask moves to where it belongs: a row that is available forever and interrupts nothing.',
  },
};

/** How long the dismissed prompt stays gone before it comes back, on the stage's clock. */
const RETURN_AFTER = 1200;

/** Notifications leads the list on purpose: it is the row the remembered state points at. */
const SETTINGS = [
  ['Notifications', 'Off'],
  ['Sync', 'On'],
  ['Theme', 'System'],
  ['Downloads', 'Wi-Fi only'],
] as const;

/**
 * Nagging specimen: one permission prompt in three dresses. Dismissing it in either nagging
 * state hides it and the stage's clock brings it straight back with the ask counter one
 * higher, which is the pattern stated as a mechanism: the refusal is not recorded, so
 * refusing costs attention every time and consenting costs it once. The remembered state is
 * the repair, the same card saying the answer was kept and pointing at Settings.
 *
 * The subject is the prompt itself, the narrowest element the term names, and it mounts on
 * the third ask because the nagging is the term (SPEC §6). It declares the nagging condition
 * in `data-pose`, so identify refuses to ring the remembered version, which is a picture of
 * the opposite word.
 *
 * The prompt is docked over the settings panel at a fixed size in all three states, and the
 * action row keeps its height when its buttons swap, so nothing in the scene moves (SPEC §5).
 * Dismissal is an explicit step and the return is the demo's own doing, never a toggle
 * (SPEC §8), and the return timer comes from the clock the stage can freeze, so a pose taken
 * during the gap cannot be interrupted by it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = SETTINGS.map(
    ([label, value]) => `<div class="sp-row sp-row--between" style="height: 30px; border-top: 1px solid var(--sp-line)">
        <span style="font-size: 12px">${label}</span>
        <span class="sp-label" style="font-size: 11px">${value}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Marrow</span>
          <sp-segmented class="sp-segmented" data-axis="Occasion" data-term="third" data-part="mode" data-value="third">
            <button class="sp-segment" type="button" data-part="mode-first" value="first" style="padding: 5px 9px; font-size: 12px">First ask</button>
            <button class="sp-segment" type="button" data-part="mode-third" value="third" style="padding: 5px 9px; font-size: 12px">Third ask</button>
            <button class="sp-segment" type="button" data-part="mode-remembered" value="remembered" style="padding: 5px 9px; font-size: 12px">Remembered</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="position: relative">

          <div class="sp-surface sp-context" style="height: 100%; padding: 8px 12px">
            <div class="sp-label" style="height: 20px; font-size: 11px">Settings</div>
            ${rows}
          </div>

          <div class="sp-scrim" data-part="scrim" data-open></div>

          <div
            class="sp-surface"
            data-part="prompt"
            data-subject
            data-pose="[data-nag=on]"
            data-nag="on"
            role="dialog"
            aria-label="Turn on notifications"
            style="position: absolute; left: 12px; right: 12px; bottom: 12px; height: 110px; padding: 10px 12px;
                   box-shadow: var(--sp-shadow); transition: opacity 0.24s, translate 0.24s var(--sp-ease)"
          >
            <div class="sp-row sp-row--between" style="height: 20px">
              <span class="sp-heading" data-part="title" style="font-size: 14px">${DRESS.third.title}</span>
              <span class="sp-chip" data-part="counter" data-ask="3" style="padding: 2px 8px; font-size: 11px; cursor: default">${DRESS.third.askLabel}</span>
            </div>
            <div class="sp-text" data-part="body" style="height: 32px; margin-top: 4px; font-size: 11px">${DRESS.third.body}</div>
            <div class="sp-row sp-row--between" style="height: 32px; margin-top: 4px">
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="not-now" style="color: var(--sp-muted); font-size: 12px">Not now</button>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="settings-link" hidden>Open Settings</button>
              <button class="sp-button sp-button--sm" type="button" data-part="allow">Turn on</button>
            </div>
          </div>

        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px">${DRESS.third.note}</span>
    </div>
  `;

  const prompt = part(root, 'prompt');
  const scrim = part(root, 'scrim');
  const title = part(root, 'title');
  const counter = part(root, 'counter');
  const body = part(root, 'body');
  const notNow = part(root, 'not-now');
  const settingsLink = part(root, 'settings-link');
  const allow = part(root, 'allow');
  const note = part(root, 'note');

  let mode: Mode = 'third';
  let ask = DRESS.third.ask;
  let coming: number | undefined;

  const showPrompt = (open: boolean) => {
    prompt.style.opacity = open ? '1' : '0';
    prompt.style.translate = open ? '0 0' : '0 12px';
    flag(scrim, 'data-open', open && DRESS[mode].nag === 'on');
  };

  const label = () => (mode === 'remembered' ? DRESS.remembered.askLabel : `Ask ${ask}`);

  const dress = (next: Mode) => {
    mode = next;
    ask = DRESS[next].ask;
    clock.clearTimeout(coming);
    prompt.dataset.nag = DRESS[next].nag;
    title.textContent = DRESS[next].title;
    body.textContent = DRESS[next].body;
    counter.dataset.ask = String(ask);
    counter.textContent = label();
    note.textContent = DRESS[next].note;
    const nagging = DRESS[next].nag === 'on';
    flag(notNow, 'hidden', !nagging);
    flag(allow, 'hidden', !nagging);
    flag(settingsLink, 'hidden', nagging);
    showPrompt(true);
  };

  part(root, 'mode').addEventListener('change', (event) => dress((event as CustomEvent<string>).detail as Mode));

  // The dismissal is honoured, briefly. The return is what makes the pattern the pattern,
  // and it is scheduled on the clock the stage hands the demo so a pose can hold the gap.
  notNow.addEventListener('click', () => {
    showPrompt(false);
    clock.clearTimeout(coming);
    coming = clock.setTimeout(() => {
      ask += 1;
      counter.dataset.ask = String(ask);
      counter.textContent = label();
      showPrompt(true);
    }, RETURN_AFTER);
  });
}
