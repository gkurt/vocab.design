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
 * rather than what it does, which is the distinction the term is for, and the callout
 * labels sit outside the subject because naming a cue is commentary, not part of it. The
 * columns are held to one width so the labels line up under the marks they name.
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
      <div class="sp-frame sp-frame--wide" style="height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Release 4.2</span>
          <span class="sp-text" data-part="readout" data-reads="away" style="width: 234px; text-align: right">Pointer away</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <span class="sp-label sp-context">The same three actions, twice.</span>
          <div class="sp-surface sp-context" style="padding: 10px 12px">
            <div class="sp-label" style="margin-bottom: 8px">Possible, unsignified</div>
            <div class="sp-row" style="gap: 10px">
              <button type="button" data-part="bare-button" style="${BARE}; width: 96px; text-align: left">Publish</button>
              <button type="button" data-part="bare-link" style="${BARE}; width: 112px; text-align: left">Release notes</button>
              <span class="sp-row" data-part="bare-grip" style="width: 124px; gap: 8px; padding: 6px 4px; font-size: 13px; cursor: default">Reorder</span>
            </div>
          </div>
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-label sp-context" style="margin-bottom: 8px">Possible, and signified</div>
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
          <div class="sp-row sp-context" style="gap: 10px; padding-left: 13px">
            <span class="sp-label" style="width: 96px">edge and fill</span>
            <span class="sp-label" style="width: 112px">underline, colour</span>
            <span class="sp-label" style="width: 124px">grip dots, grab cursor</span>
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
