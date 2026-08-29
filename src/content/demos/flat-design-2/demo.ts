import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Look = {
  radius: string;
  media: string;
  shadow: string;
  wash: string;
  fill: string;
  lift: string;
  note: string;
};

/**
 * Two looks of one card. Flat 2.0 spends depth in three places and nowhere else: a soft
 * shadow under the card, one shallow gradient across the media band and the button, and a
 * lifted plane for the control. Strict flat is the same geometry with all three deleted.
 */
const LOOKS: Record<string, Look> = {
  flat2: {
    radius: '10px',
    media: '6px',
    shadow: '0 6px 16px rgb(16 24 40 / 0.18)',
    wash: 'linear-gradient(150deg, #5b83f6, #8a5cf0)',
    fill: 'linear-gradient(180deg, #5b83f6, #3d61d8)',
    lift: '0 2px 5px rgb(44 74 190 / 0.42)',
    note: 'A soft shadow, one shallow gradient, a lifted button: depth spent only where it says this can be acted on.',
  },
  strict: {
    radius: '0px',
    media: '0px',
    shadow: 'none',
    wash: '#5b83f6',
    fill: '#3d61d8',
    lift: 'none',
    note: 'Strict flat: identical geometry with every cue removed, so nothing on the card says which rectangle answers a click.',
  },
};

const START = 'flat2';

/**
 * Flat 2.0 specimen: the card is the subject and the style picker, the label and the note
 * below are scenery. The strict-flat state is a counter-example the subject itself passes
 * through, so the honest condition is declared in `data-pose` (SPEC §6) and the mount state
 * satisfies it: identify refuses to ring the purged version.
 *
 * Paint is stated inline because the small amount of depth is this term's own claim, and it
 * travels as custom properties on the card so switching style repaints without touching a
 * single box: only radius, shadow and fill change, and the note's height is reserved for the
 * longer of the two lines (SPEC §5). The button's hover feedback is the kit's own, which the
 * player lights as the ghost cursor arrives.
 */
export function mount(root: HTMLElement): void {
  const start = LOOKS[START];
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-stack" style="align-items: center; gap: 10px">
        <div class="sp-row sp-row--between sp-context" style="width: 236px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Style" data-term="flat2">
            <button class="sp-segment" data-part="seg-flat2" value="flat2">Flat 2.0</button>
            <button class="sp-segment" data-part="seg-strict" value="strict">Strict</button>
          </sp-segmented>
        </div>

        <div data-part="card" data-subject data-style="${START}" data-pose="[data-style=flat2]"
             style="width: 236px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                    border-radius: var(--c-radius); box-shadow: var(--c-shadow)">
          <div data-part="media" aria-hidden="true"
               style="height: 62px; border-radius: var(--c-media); background: var(--c-wash)"></div>
          <div style="margin-top: 10px; font-size: 14px; font-weight: 600">Harbour Line</div>
          <div class="sp-text" style="font-size: 12px">Departs 18:40, platform 2</div>
          <div class="sp-row" style="margin-top: 12px; gap: 8px">
            <button class="sp-button sp-button--sm" data-part="action" type="button"
                    style="border-radius: var(--c-media); background: var(--c-fill); box-shadow: var(--c-lift)">Book seat</button>
            <button class="sp-button sp-button--sm sp-button--ghost" data-part="details" type="button"
                    style="border-radius: var(--c-media)">Details</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="width: 236px; min-height: 48px; margin: 0; text-align: center; font-size: 11px">${start.note}</p>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const note = part(root, 'note');

  const apply = (name: string): void => {
    const look = LOOKS[name];
    if (!look) return;
    card.dataset.style = name;
    card.style.setProperty('--c-radius', look.radius);
    card.style.setProperty('--c-media', look.media);
    card.style.setProperty('--c-shadow', look.shadow);
    card.style.setProperty('--c-wash', look.wash);
    card.style.setProperty('--c-fill', look.fill);
    card.style.setProperty('--c-lift', look.lift);
    note.textContent = look.note;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
