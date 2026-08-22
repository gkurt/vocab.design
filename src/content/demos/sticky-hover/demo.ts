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

/** The subject first, then the neighbour a tap can move the stranded paint to. */
const PHOTOS = [
  { key: 'card', name: 'Harbour, 6am', size: '2.4 MB', wash: 'linear-gradient(150deg, #4a7290, #d8c39a)' },
  { key: 'card-jetty', name: 'Jetty, noon', size: '1.8 MB', wash: 'linear-gradient(150deg, #7c6a86, #e0cdb4)' },
] as const;

const photo = ({ key, name, size, wash }: (typeof PHOTOS)[number], first: boolean) => {
  const own = first ? 'data-part="card" data-subject data-pose="[data-stuck]" data-stuck' : `data-part="${key}"`;
  const row = first ? 'actions' : `actions-${key}`;
  return `
    <div
      class="sp-surface${first ? '' : ' sp-context'}"
      ${own}
      style="width: 200px; padding: 8px; border: ${first ? HOVERED.border : RESTING.border}; box-shadow: ${first ? HOVERED.shadow : RESTING.shadow}"
    >
      <div style="height: 96px; border-radius: 6px; background: ${wash}"></div>
      <div class="sp-row sp-row--between" style="margin-top: 8px">
        <span class="sp-heading" style="font-size: 13px">${name}</span>
        <span class="sp-label">${size}</span>
      </div>
      <div
        class="sp-row"
        data-part="${row}"
        style="margin-top: 8px; gap: 6px; opacity: ${first ? 1 : 0}; visibility: ${first ? 'visible' : 'hidden'}; transition: opacity 0.16s"
      >
        <button class="sp-button sp-button--ghost sp-button--sm" type="button">Save</button>
        <button class="sp-icon-button" type="button" aria-label="Favourite">${icon('heart')}</button>
      </div>
    </div>`;
};

/**
 * Sticky hover specimen: a gallery of photo cards whose actions are revealed by hover, resting
 * in the state a touch device leaves it in. The subject card mounts already painted and already
 * revealed with nothing hovering it, because that stranded state is the term rather than a
 * moment inside it, and `data-pose` holds identify to it: the gated version is the fix, and a
 * ring around the fix would be pointing at a different word.
 *
 * The tap is performed, not replayed by a control. The gallery is a touch surface
 * (`data-touch`), so a scripted tap on a card arrives as a real `pointerType: 'touch'` press
 * with no hover of its own, and the demo answers it the way a touch browser does: the hover
 * state lands on the tapped card and nothing ever takes it off again. The compatibility
 * enter and leave a touch press carries are ignored on purpose, since the leave is exactly
 * the event a finger never really sends; what clears the paint is a tap somewhere else, which
 * is why tapping the neighbour moves the stranding to it. Nothing here answers travel at all,
 * for the script or for a reader: inside a touch scope a mouse is playing a finger, so a
 * reader's press is this term's tap and their movement is nothing. Handing them the one thing
 * a finger cannot do, on the specimen whose whole subject is what happens when a finger tries,
 * would be the costume the persona forbids (SPEC §7).
 *
 * The subject is the first card, not the action row it reveals. The paint that has nothing to
 * clear it belongs to the card, and the stranded actions are the consequence; the neighbour is
 * scenery in the context register, quieter but live, and the mode control is instrumentation for
 * the CSS the page was written with, not for the input. Each action row keeps its space in both
 * states, so revealing it moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Saved photos</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap">Nothing is hovering this card</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div data-part="gallery" data-touch data-mode="ungated" style="display: flex; gap: 12px; touch-action: manipulation">
            ${PHOTOS.map((entry, index) => photo(entry, index === 0)).join('')}
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

  const gallery = part(root, 'gallery');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');
  const cards = PHOTOS.map((entry, index) => ({
    ...entry,
    el: part(root, index === 0 ? 'card' : entry.key),
    actions: part(root, index === 0 ? 'actions' : `actions-${entry.key}`),
  }));
  const subject = cards[0] as (typeof cards)[number];

  /** Paint and reveal together: on a pointer device they are the same state. */
  const paint = (target: HTMLElement | null, text: string) => {
    const gated = gallery.dataset.mode === 'gated';
    for (const card of cards) {
      const on = card.el === target;
      const revealed = on || gated;
      flag(card.el, 'data-stuck', on);
      card.el.style.border = on ? HOVERED.border : RESTING.border;
      card.el.style.boxShadow = on ? HOVERED.shadow : RESTING.shadow;
      card.actions.style.opacity = revealed ? '1' : '0';
      card.actions.style.visibility = revealed ? 'visible' : 'hidden';
    }
    readout.textContent = text;
  };

  // A tap, and only a tap. The press itself is what strands the paint, so the hover state
  // is applied here and no leave is ever honoured: the compatibility pointerleave a touch
  // press carries is the event a finger does not really send, and treating it as one would
  // clear exactly the paint this term is about. What does clear it is a tap elsewhere.
  //
  // Every pointer type counts, because this gallery is a touch surface: a reader on a mouse
  // is playing a finger here (the stage draws their pointer as the disc), so their press is
  // this term's tap. Nothing answers travel, which is the point. Wiring pointerenter here
  // would hand a reader the one thing a finger cannot do, on the specimen whose whole
  // subject is what happens when a finger tries (SPEC §7).
  gallery.addEventListener('pointerdown', (event) => {
    if (gallery.dataset.mode === 'gated') return paint(null, 'Gated: the tap strands nothing');
    const hit = cards.find((card) => card.el.contains(event.target as Node));
    if (!hit) return paint(null, 'The hover moved on');
    paint(hit.el, hit === subject ? 'Tapped: nothing will clear this' : 'The hover moved to that card');
  });

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'gated' ? 'gated' : 'ungated';
    gallery.dataset.mode = next;
    caption.textContent = CAPTION[next];
    if (next === 'gated') return paint(null, 'Gated: the actions just stay');
    paint(null, 'As written: nothing is tapped yet');
  });

  paint(subject.el, 'Nothing is hovering this card');
}
