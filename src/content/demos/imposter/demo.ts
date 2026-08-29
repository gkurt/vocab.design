import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The badge's box, and the gap the column of text is set with. */
const BADGE = { width: 168, height: 42 };
const GAP = 8;

const PARAGRAPHS = [
  'The winter crossing runs all year, weather permitting, and leaves the pontoon on the hour from first light.',
  'Foot passengers board from the inner steps, and bicycles are carried free of charge whenever the deck is clear.',
  'Tickets are sold at the kiosk on the quay and stay valid for the return leg on any sailing the same day.',
];

/**
 * Imposter specimen: one badge over a column of text, shown the two ways it could be
 * positioned. Given a place in the flow it sits between the first and second paragraphs and
 * everything below it moves down; as an imposter it is pinned to the centre of the column and
 * the paragraphs are exactly where they were, with the badge over the top of them.
 *
 * The subject is the badge itself, `data-part="badge"`, which is the element the term names.
 * The `in the flow` pick is a counter-example the subject passes through, so the badge declares
 * the honest condition as `data-pose="[data-mode=imposter]"`: identify refuses to ring a badge
 * that is currently taking part in the flow, and the mount state is the honest one (SPEC §6).
 * The frame, the picker, the text and the caption are scenery in the context register.
 *
 * `data-text` is measured rather than claimed. The demo records where the last paragraph sits
 * with the badge out of the flow and compares on every change, so an assert can prove the text
 * did not move rather than trusting that it did not. The panel reserves the room the taller
 * arrangement needs, so nothing outside the column moves either (SPEC §5), and nothing here
 * transitions a position, so the read after the write is the real one.
 */
export function mount(root: HTMLElement): void {
  const paragraph = (i: number) =>
    `<p class="sp-text sp-context" data-part="para-${i + 1}" style="margin: 0; font-size: 12px; line-height: 1.5">${PARAGRAPHS[i]}</p>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">The badge is</span>
          <sp-segmented class="sp-segmented" data-part="modes" data-value="imposter" data-axis="Placement" data-term="imposter">
            <button class="sp-segment" type="button" data-part="seg-flow" value="flow" style="padding: 4px 11px; font-size: 11px">in the flow</button>
            <button class="sp-segment" type="button" data-part="seg-imposter" value="imposter" style="padding: 4px 11px; font-size: 11px">an imposter</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div
            data-part="panel"
            style="height: 100%; padding: 12px 14px; overflow: hidden; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div data-part="column" data-text="untouched" style="position: relative; display: flex; flex-direction: column; gap: ${GAP}px">
              ${paragraph(0)}
              <div
                class="sp-surface"
                data-part="badge"
                data-subject
                data-mode="imposter"
                data-pose="[data-mode=imposter]"
                style="position: absolute; top: 50%; left: 50%; translate: -50% -50%; z-index: 1;
                       display: flex; align-items: center; justify-content: center; align-self: center;
                       width: ${BADGE.width}px; height: ${BADGE.height}px; box-shadow: var(--sp-shadow)"
              >
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 13px">Closed for winter</span>
              </div>
              ${paragraph(1)}
              ${paragraph(2)}
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const column = part(root, 'column');
  const badge = part(root, 'badge');
  const note = part(root, 'note');
  const last = part(root, 'para-3');

  /** Where the text ends up with the badge out of the flow: measured on the mounted state. */
  const baseline = last.offsetTop;

  const apply = (mode: string) => {
    const imposter = mode !== 'flow';
    badge.dataset.mode = imposter ? 'imposter' : 'flow';
    badge.style.position = imposter ? 'absolute' : 'static';
    badge.style.top = imposter ? '50%' : '';
    badge.style.left = imposter ? '50%' : '';
    badge.style.translate = imposter ? '-50% -50%' : '';
    // Read back on boxes nothing transitions: whether the text moved is the whole claim.
    column.dataset.text = last.offsetTop > baseline + 1 ? 'pushed' : 'untouched';
    note.textContent = imposter
      ? 'Out of the flow: the badge is over the text, which has not moved.'
      : 'In the flow: the badge takes a place, so the text below it moves down.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('imposter');
}
