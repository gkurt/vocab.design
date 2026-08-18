import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The row is a vocabulary, not a sample: six covers the jobs, and more costs scanning. */
const REACTIONS = [
  { key: 'thumb', emoji: '👍', label: 'Thumbs up' },
  { key: 'heart', emoji: '❤️', label: 'Heart' },
  { key: 'laugh', emoji: '😂', label: 'Laughing' },
  { key: 'party', emoji: '🎉', label: 'Party popper' },
  { key: 'eyes', emoji: '👀', label: 'Eyes' },
  { key: 'check', emoji: '✅', label: 'Done' },
];

/** How long the teammate takes to join a reaction, which is what makes it a count. */
const SECOND_READER_MS = 1400;

const MESSAGES = [
  { who: 'Ola', initials: 'OA', at: '9:32', text: 'Invoices are out, we are clear for the week.' },
  { who: 'Priya', initials: 'PR', at: '9:33', text: 'Great. I will close the ledger this afternoon.' },
  { who: 'Dale', initials: 'DF', at: '9:35', text: 'Van 4821 left the depot with the last pallet.' },
  { who: 'Ola', initials: 'OA', at: '9:36', text: 'Perfect. That is the quarter done, then.' },
];

const message = (index: number) => {
  const m = MESSAGES[index] as (typeof MESSAGES)[number];
  return `
    <div class="sp-row sp-context" style="gap: 10px; align-items: flex-start">
      <span class="sp-avatar" style="width: 26px; height: 26px; font-size: 10px">${m.initials}</span>
      <span class="sp-stack sp-grow" style="gap: 1px">
        <span class="sp-row" style="gap: 6px">
          <span class="sp-heading" style="font-size: 12px">${m.who}</span>
          <span class="sp-label" style="font-size: 11px">${m.at}</span>
        </span>
        <span class="sp-text sp-text--ink" style="font-size: 12px">${m.text}</span>
      </span>
    </div>`;
};

/**
 * Reaction picker specimen: a thread whose first message already carries one reaction, a
 * trigger on that message that opens a row of quick reactions, and a choice that attaches
 * one to the message as a count a second reader then joins.
 *
 * The subject is the picker, `data-part="picker"`: the small surface the row of emoji lives
 * in, not the message, not the trigger, and not the reaction chips the choice produces. The
 * thread, the channel bar and the messages are scenery in the context register; the
 * reactions row stays out of it, because a chip that has gone chroma-free could not show
 * which reaction is the reader's own.
 *
 * The trigger opens and dismissal is explicit, either by choosing an emoji or by Escape,
 * never a toggle (SPEC §8), so a pass resumed at any point still opens the picker rather
 * than closing one that was already up. All six chips exist from mount and are revealed as
 * they are used, so a new reaction never rebuilds the row, and the row keeps its height
 * whether it holds one reaction or six (SPEC §5).
 *
 * The second reader arrives on the clock the stage hands `mount`, which is the whole point
 * of the count: a reaction is not a character inserted into a reader's own text but a typed
 * response other people join.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const chips = REACTIONS.map(
    (reaction) => `
      <button
        class="sp-chip"
        type="button"
        data-part="chip-${reaction.key}"
        data-count="0"
        aria-label="${reaction.label}, no reactions"
        hidden
        style="padding: 2px 8px; gap: 4px; font-size: 12px"
      ><span aria-hidden="true">${reaction.emoji}</span><span data-part="count-${reaction.key}" style="font-variant-numeric: tabular-nums">0</span></button>`,
  ).join('');

  const picks = REACTIONS.map(
    (reaction) => `
      <button
        class="sp-icon-button"
        type="button"
        data-part="pick-${reaction.key}"
        data-emoji="${reaction.key}"
        aria-label="React with ${reaction.label.toLowerCase()}"
        style="width: 26px; height: 26px; font-size: 15px; line-height: 1"
      >${reaction.emoji}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 264px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">harbour-crew</span>
          <span class="sp-row" style="gap: 4px">
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 9px">OA</span>
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 9px">PR</span>
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 9px">DF</span>
          </span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; padding: 12px">
          ${message(0)}

          <div
            data-part="reactions"
            class="sp-row"
            style="position: relative; gap: 6px; height: 26px; margin-left: 36px"
          >
            <button
              class="sp-icon-button"
              type="button"
              data-part="trigger"
              aria-label="Add reaction"
              aria-expanded="false"
              style="flex: 0 0 auto; width: 24px; height: 24px; border: 1px solid var(--sp-line)"
            >${icon('plus')}</button>
            ${chips}

            <div
              class="sp-popover"
              data-part="picker"
              data-subject
              role="group"
              aria-label="Quick reactions"
              style="z-index: 3; top: calc(100% + 8px); left: 0; min-width: 0; padding: 5px; --sp-arrow-x: 14px"
            >
              <span class="sp-row" style="gap: 2px">${picks}</span>
            </div>
          </div>

          ${message(1)}
          ${message(2)}
          ${message(3)}
        </div>
      </div>
    </div>
  `;

  const picker = part(root, 'picker');
  const trigger = part(root, 'trigger');

  const setOpen = (open: boolean) => {
    flag(picker, 'data-open', open);
    flag(trigger, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  const counts = new Map<string, number>(REACTIONS.map((reaction) => [reaction.key, 0]));
  const mine = new Set<string>();

  const paint = (key: string) => {
    const reaction = REACTIONS.find((r) => r.key === key);
    if (!reaction) return;
    const count = counts.get(key) ?? 0;
    const chip = part(root, `chip-${key}`);
    part(root, `count-${key}`).textContent = String(count);
    chip.dataset.count = String(count);
    chip.setAttribute('aria-label', `${reaction.label}, ${count} ${count === 1 ? 'reaction' : 'reactions'}`);
    flag(chip, 'hidden', count === 0);
    flag(chip, 'data-selected', mine.has(key));
  };

  const add = (key: string, isMine: boolean) => {
    counts.set(key, (counts.get(key) ?? 0) + 1);
    if (isMine) mine.add(key);
    paint(key);
  };

  const choose = (key: string) => {
    setOpen(false);
    add(key, true);
    // Somebody else joins the same reaction a beat later, which is the difference between
    // a reaction and a character typed into a message.
    clock.setTimeout(() => add(key, false), SECOND_READER_MS);
  };

  trigger.addEventListener('click', () => setOpen(true));
  for (const reaction of REACTIONS) part(root, `pick-${reaction.key}`).addEventListener('click', () => choose(reaction.key));
  root.addEventListener('keydown', (event) => {
    if ((event as KeyboardEvent).key === 'Escape') setOpen(false);
  });

  // The message arrives with one reaction already on it, from somebody who is not the reader.
  counts.set('thumb', 2);
  paint('thumb');
}
