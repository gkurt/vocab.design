import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Pick = 'none' | 'three' | 'six';

/** Cups actually bought at each stop. Both cards need eight, whatever their denominator says. */
const BOUGHT: Record<Pick, number> = { none: 0, three: 3, six: 6 };

const GIVEN = 2;
const PLAIN_SLOTS = 8;
const ENDOWED_SLOTS = 10;

const NOTE = {
  none: 'Both cards cost eight cups. The welcome card just does not start the reader at nothing.',
  three: 'Three cups bought. Five to go on either card, and the welcome card reads half filled.',
  six: 'Six cups bought. Two to go on either card, and the welcome card is at eight of ten.',
} as const;

const SLOT = [
  'width: 18px',
  'height: 18px',
  'border-radius: 50%',
  'border: 2px dashed var(--sp-line)',
  'background: transparent',
  'transition: background-color 0.3s var(--sp-ease), border-color 0.3s var(--sp-ease)',
].join('; ');

const grid = (kind: string, count: number) =>
  Array.from({ length: count }, (_, i) => `<span data-slot="${kind}" data-i="${i}" style="${SLOT}"></span>`).join('');

/**
 * Endowed progress specimen: two loyalty cards that cost the same eight cups, one with
 * eight spaces starting empty and one with ten spaces that arrives with two already
 * stamped. The segmented control buys cups for both at once, and the strip underneath
 * keeps saying that the number still to buy is the same on either card, which is the only
 * way to see that the head start moved the framing and not the deal.
 *
 * The subject is the endowed card, the narrowest element the term names (SPEC §5). The
 * plain card is the comparison and sits in the context register, and the shop chrome, the
 * remaining strip and the note row are scenery. The two granted stamps are drawn as
 * granted rather than as earned, which is the honest form of the pattern, so the subject
 * needs no `data-pose`: it is the endowed card in every state the script reaches.
 *
 * Stamps are slots that change fill, never elements that arrive, so buying a cup moves
 * nothing (SPEC §5), and each segment buys an absolute number rather than adding to
 * whatever it found (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Coffee</span>
          <span class="sp-label" style="font-size: 11px">Loyalty</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div style="display: flex; align-items: stretch; gap: 10px; flex: 0 0 auto">

            <div class="sp-surface sp-context" data-part="plain" data-filled="0"
                 style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 10px">
              <div class="sp-row sp-row--between" style="height: 18px">
                <span class="sp-heading" style="font-size: 12px">Plain card</span>
                <span class="sp-text" data-part="plain-count" style="font-size: 11px">0 of ${PLAIN_SLOTS}</span>
              </div>
              <div class="sp-grid" style="grid-template-columns: repeat(5, 18px); gap: 7px">${grid('plain', PLAIN_SLOTS)}</div>
              <span class="sp-label" style="height: 12px; font-size: 10px">Every space is a cup you buy</span>
            </div>

            <div class="sp-surface" data-part="endowed" data-subject data-filled="2"
                 style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 10px">
              <div class="sp-row sp-row--between" style="height: 18px">
                <span class="sp-heading" style="font-size: 12px">Welcome card</span>
                <span class="sp-text sp-text--ink" data-part="endowed-count" style="font-size: 11px">${GIVEN} of ${ENDOWED_SLOTS}</span>
              </div>
              <div class="sp-grid" style="grid-template-columns: repeat(5, 18px); gap: 7px">${grid('endowed', ENDOWED_SLOTS)}</div>
              <span class="sp-label" style="height: 12px; font-size: 10px">The first two stamps are on us</span>
            </div>

          </div>

          <div class="sp-surface sp-context sp-row" data-part="remaining" data-left="8"
               style="flex: 0 0 auto; height: 30px; justify-content: center; padding: 0 10px">
            <span class="sp-text sp-text--ink" data-part="remaining-text" style="font-size: 12px">8 more cups on either card</span>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="note" style="width: 264px; height: 34px; font-size: 11px">${NOTE.none}</span>
        <sp-segmented class="sp-segmented" data-part="pick" data-value="none">
          <button class="sp-segment" data-part="pick-none" value="none" style="padding: 5px 9px; font-size: 12px">0 bought</button>
          <button class="sp-segment" data-part="pick-three" value="three" style="padding: 5px 9px; font-size: 12px">3 bought</button>
          <button class="sp-segment" data-part="pick-six" value="six" style="padding: 5px 9px; font-size: 12px">6 bought</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const plain = part(root, 'plain');
  const endowed = part(root, 'endowed');
  const plainCount = part(root, 'plain-count');
  const endowedCount = part(root, 'endowed-count');
  const remaining = part(root, 'remaining');
  const remainingText = part(root, 'remaining-text');
  const note = part(root, 'note');
  const slots = (kind: string) => [...root.querySelectorAll<HTMLElement>(`[data-slot="${kind}"]`)];

  const paint = (slot: HTMLElement, state: 'empty' | 'earned' | 'given') => {
    slot.dataset.state = state;
    if (state === 'earned') {
      slot.style.background = 'var(--sp-accent)';
      slot.style.borderColor = 'var(--sp-accent)';
      slot.style.borderStyle = 'solid';
      return;
    }
    if (state === 'given') {
      // Stamped, and visibly stamped by the shop rather than earned: the honest form.
      slot.style.background = 'radial-gradient(circle at center, var(--sp-accent) 0 3.5px, var(--sp-accent-soft) 3.5px)';
      slot.style.borderColor = 'var(--sp-accent)';
      slot.style.borderStyle = 'solid';
      return;
    }
    slot.style.background = 'transparent';
    slot.style.borderColor = 'var(--sp-line)';
    slot.style.borderStyle = 'dashed';
  };

  const show = (pick: Pick) => {
    const bought = BOUGHT[pick];
    slots('plain').forEach((slot, i) => {
      paint(slot, i < bought ? 'earned' : 'empty');
    });
    slots('endowed').forEach((slot, i) => {
      paint(slot, i < GIVEN ? 'given' : i < GIVEN + bought ? 'earned' : 'empty');
    });
    const left = PLAIN_SLOTS - bought;
    plain.dataset.filled = String(bought);
    endowed.dataset.filled = String(GIVEN + bought);
    plainCount.textContent = `${bought} of ${PLAIN_SLOTS}`;
    endowedCount.textContent = `${GIVEN + bought} of ${ENDOWED_SLOTS}`;
    remaining.dataset.left = String(left);
    remainingText.textContent = left === 1 ? '1 more cup on either card' : `${left} more cups on either card`;
    note.textContent = NOTE[pick];
  };

  part(root, 'pick').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail as Pick);
  });

  show('none');
}
