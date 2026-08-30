import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** A control with the possibility and nothing that says so. */
const BARE = [
  'appearance: none',
  'border: 0',
  'background: transparent',
  'padding: 6px 4px',
  'font: inherit',
  'font-size: 13px',
  'color: var(--sp-ink)',
  'cursor: default',
].join('; ');

const grip = `
  <span aria-hidden="true" style="display: flex; align-items: center; color: var(--sp-muted)">
    <span style="display: flex">${icon('kebab', 'sp-icon--dots')}</span>
    <span style="display: flex; margin-left: -9px">${icon('kebab', 'sp-icon--dots')}</span>
  </span>`;

const CUES: { part: string; reads: string; says: string }[] = [
  { part: 'sig-button', reads: 'pressable', says: 'Edge, fill, and a verb: reads as pressable' },
  { part: 'sig-link', reads: 'link', says: 'Underline and colour: reads as somewhere to go' },
  { part: 'sig-grip', reads: 'grip', says: 'Grip dots and a grab cursor: reads as liftable' },
];

const BARES = ['bare-button', 'bare-link', 'bare-grip'];

/**
 * Signifier specimen: the same three actions offered twice, once with nothing to
 * advertise them and once with the marks that do. The subject is the signified row, since
 * the term names the cues rather than the actions (both rows have those) or the panel they
 * sit in.
 *
 * Both rows offer the same three actions, so the difference on show is entirely what each
 * one looks like it allows. The readout names what the element under the pointer is saying
 * rather than what it does, which is the distinction the term is for. The columns are held
 * to one width, and the readout is sized for its longest line and held to one, so naming a
 * cue cannot push the rows below it down (SPEC §5).
 *
 * Three pieces of commentary have gone from inside the frame: an opening line, "The same
 * three actions, twice.", a row of callouts under the signified controls naming each mark
 * ("edge and fill", "underline, colour", "grip dots, grab cursor"), and the two row labels,
 * which read "Possible, unsignified" and "Possible, and signified" and now read "No cues"
 * and "With cues". The readout already names the mark under the pointer, and the article
 * carries the rest. The frame lost 50px of height with them, so nothing gapes.
 *
 * The kit's own hover paint is left to the stage: the pointer is mirrored into
 * `data-hovered` (SPEC §7), so the signified controls light up under the ghost cursor and
 * the bare ones stay exactly as silent as they are.
 *
 * Every cue's readout is cleared by its own leave, so the pass ends at its mount state and the
 * tree persists across attract iterations (`data-loop="keep"`).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 238px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Release 4.2</span>
          <span class="sp-text" data-part="readout" data-reads="away" style="width: 320px; text-align: right; white-space: nowrap">Pointer away</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 10px 12px">
            <div class="sp-label" style="margin-bottom: 8px">No cues</div>
            <div class="sp-row" style="gap: 10px">
              <button type="button" data-part="bare-button" style="${BARE}; width: 96px; text-align: left">Publish</button>
              <button type="button" data-part="bare-link" style="${BARE}; width: 112px; text-align: left">Release notes</button>
              <span class="sp-row" data-part="bare-grip" style="width: 124px; gap: 8px; padding: 6px 4px; font-size: 13px; cursor: default">Reorder</span>
            </div>
          </div>
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-label sp-context" style="margin-bottom: 8px">With cues</div>
            <div class="sp-row" data-part="signified" data-subject style="gap: 10px">
              <button class="sp-button sp-button--sm" type="button" data-part="sig-button" style="width: 96px">Publish</button>
              <button
                type="button"
                data-part="sig-link"
                style="appearance: none; border: 0; background: transparent; font: inherit; font-size: 13px; width: 112px; text-align: left; color: var(--sp-accent); text-decoration: underline; text-underline-offset: 2px; padding: 6px 4px; cursor: pointer"
              >Release notes</button>
              <span
                class="sp-row"
                data-part="sig-grip"
                style="width: 124px; gap: 6px; padding: 5px 8px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface); font-size: 13px; cursor: grab"
              >${grip}Reorder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');

  const says = (reads: string, text: string) => {
    readout.dataset.reads = reads;
    readout.textContent = text;
  };

  const away = () => says('away', 'Pointer away');

  for (const cue of CUES) {
    const el = part(root, cue.part);
    el.addEventListener('pointerenter', () => says(cue.reads, cue.says));
    el.addEventListener('pointerleave', away);
  }

  // The bare twins answer the pointer with nothing, which is the thing to be shown: the
  // action is available on every one of them.
  for (const name of BARES) {
    const el = part(root, name);
    el.addEventListener('pointerenter', () => says('none', 'The action is here. Nothing says so.'));
    el.addEventListener('pointerleave', away);
  }
}
