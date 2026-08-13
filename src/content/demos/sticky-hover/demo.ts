import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const CAPTION = {
  ungated: 'The reveal is on hover alone',
  gated: 'The reveal is behind @media (hover: hover)',
} as const;

type Mode = keyof typeof CAPTION;

/** The card's two looks, stated inline because the paint is this term's own claim. */
const RESTING = { border: '1px solid var(--sp-line)', shadow: 'none' };
const HOVERED = { border: '1px solid var(--sp-accent)', shadow: 'var(--sp-shadow)' };

/**
 * Sticky hover specimen: a photo card whose actions are revealed by hover, resting in the
 * state a touch device leaves it in. The card mounts already painted and already revealed
 * with nothing hovering it, because that stranded state is the term rather than a moment
 * inside it, and `data-pose` holds identify to it: the gated version is the fix, and a
 * ring around the fix would be pointing at a different word.
 *
 * The subject is the card, not the action row it reveals. The paint that has nothing to
 * clear it belongs to the card, and the stranded actions are the consequence; the sim
 * controls and the mode control are instrumentation and stay in the context register.
 *
 * A tap cannot be scripted as a tap (the choreography has no touch step, SPEC §8), so the
 * touch sequence is replayed by a labelled control that does what a browser does: apply
 * the hover state and never send the leave. A real pointer is wired properly alongside it,
 * enter and leave both, so a reader who takes the stage over gets the honest mouse
 * behaviour. The action row keeps its space in both states, so revealing it moves nothing
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Saved photos</span>
          <span class="sp-text" data-part="readout" style="width: 214px; text-align: right; white-space: nowrap">Nothing is hovering this card</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="card"
            data-subject
            data-pose="[data-stuck]"
            data-mode="ungated"
            data-stuck
            style="width: 200px; padding: 8px; border: ${HOVERED.border}; box-shadow: ${HOVERED.shadow}"
          >
            <div style="height: 96px; border-radius: 6px; background: linear-gradient(150deg, #4a7290, #d8c39a)"></div>
            <div class="sp-row sp-row--between" style="margin-top: 8px">
              <span class="sp-heading" style="font-size: 13px">Harbour, 6am</span>
              <span class="sp-label">2.4 MB</span>
            </div>
            <div
              class="sp-row"
              data-part="actions"
              style="margin-top: 8px; gap: 6px; opacity: 1; visibility: visible; transition: opacity 0.16s"
            >
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="save" type="button">Save</button>
              <button class="sp-icon-button" data-part="favourite" type="button" aria-label="Favourite">${icon('heart')}</button>
            </div>
          </div>
          <div class="sp-stack sp-context" style="width: 178px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="tap-card" type="button">Tap the card (as touch)</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="tap-away" type="button">Tap somewhere else</button>
            <span class="sp-text" style="font-size: 11px">A tap hovers the card. Lifting the finger sends no leave.</span>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="caption" style="font-size: 11px; width: 236px">${CAPTION.ungated}</span>
        <sp-segmented class="sp-segmented" data-part="mode" data-value="ungated">
          <button class="sp-segment" data-part="mode-ungated" value="ungated">As written</button>
          <button class="sp-segment" data-part="mode-gated" value="gated">Gated</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const actions = part(root, 'actions');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  /** Paint and reveal together: on a pointer device they are the same state. */
  const setHover = (on: boolean, text: string) => {
    const gated = card.dataset.mode === 'gated';
    const revealed = on || gated;
    flag(card, 'data-stuck', on);
    card.style.border = on ? HOVERED.border : RESTING.border;
    card.style.boxShadow = on ? HOVERED.shadow : RESTING.shadow;
    actions.style.opacity = revealed ? '1' : '0';
    actions.style.visibility = revealed ? 'visible' : 'hidden';
    readout.textContent = text;
  };

  // The real pointer, wired the way the card would really be wired.
  card.addEventListener('pointerenter', () => setHover(true, 'Hovered by a pointer'));
  card.addEventListener('pointerleave', () => setHover(false, 'The pointer left, so did the paint'));

  part(root, 'tap-card').addEventListener('click', () => {
    // What a touch browser does with a tap: the hover state is applied, and no leave
    // ever follows it, because the finger did not move anywhere.
    if (card.dataset.mode === 'gated') return setHover(false, 'Gated: the tap strands nothing');
    setHover(true, 'Tapped: nothing will clear this');
  });

  // A tap on some other element is what usually takes the phantom hover away.
  part(root, 'tap-away').addEventListener('click', () => setHover(false, 'The hover moved on'));

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'gated' ? 'gated' : 'ungated';
    card.dataset.mode = next;
    caption.textContent = CAPTION[next];
    if (next === 'gated') return setHover(false, 'Gated: the actions just stay');
    setHover(true, 'Nothing is hovering this card');
  });
}
