import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LANDINGS = {
  field: 'The first meaningful control: the reader can start typing.',
  delete: 'The destructive action, one Enter from ruin. The mistake.',
  dialog: 'The container, so the title is read before the controls.',
} as const;

type Landing = keyof typeof LANDINGS;

/**
 * Initial focus specimen: one dialog, already open, and the three places the ring could have
 * landed the moment it appeared. The good landing is the first field; the destructive action
 * is the landing that turns a stray Enter into a deleted project, and it says so; the
 * container is the third real answer, for a dialog whose title carries the information.
 *
 * The dialog is open from mount on purpose, because the term is about the landing rather than
 * about the handover: opening and returning are focus management's specimen, and this one
 * would be demonstrating that instead.
 *
 * The subject is the field, the narrowest thing the term names: not the ring, which is not an
 * element, and not the dialog, which is where focus went into rather than what it landed on.
 * It is the control the practice chooses, so the two alternate landings are shown on the same
 * dialog as scenery states, captioned by the verdict line (SPEC §5).
 *
 * The ring is simulated throughout and never real focus (SPEC §7); an outline takes no room,
 * so moving it moves nothing, and the verdict line holds its height from mount (SPEC §5).
 * Each segment reaches its own landing rather than flipping the last one (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">It opened. Focus landed on</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="field">
            <button class="sp-segment" data-part="seg-field" value="field">First field</button>
            <button class="sp-segment" data-part="seg-delete" value="delete">Delete</button>
            <button class="sp-segment" data-part="seg-dialog" value="dialog">The dialog</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" role="dialog" aria-modal="true" aria-labelledby="vd-if-title" tabindex="-1"
             data-part="dialog" style="margin-top: 12px; padding: 14px 16px; box-shadow: var(--sp-shadow)">
          <span class="sp-heading" id="vd-if-title" style="font-size: 14px">Project settings</span>
          <div class="sp-field" style="margin-top: 10px">
            <label class="sp-label" for="vd-if-name">Project name</label>
            <input class="sp-input" id="vd-if-name" data-part="field" data-subject value="Harbour" readonly />
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 14px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="delete">Delete project</button>
            <div class="sp-row" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="cancel">Cancel</button>
              <button class="sp-button sp-button--sm" type="button" data-part="save">Save</button>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="verdict" data-case="field"
           style="margin: 10px 0 0; height: 18px; font-size: 12px; white-space: nowrap">${LANDINGS.field}</p>
      </div>
    </div>
  `;

  const targets = { field: part(root, 'field'), delete: part(root, 'delete'), dialog: part(root, 'dialog') };
  const verdict = part(root, 'verdict');

  const land = (landing: Landing) => {
    for (const [key, el] of Object.entries(targets)) flag(el, 'data-sim-focus', key === landing);
    verdict.dataset.case = landing;
    verdict.textContent = LANDINGS[landing];
  };

  land('field');

  part(root, 'segmented').addEventListener('change', (event) => {
    land((event as CustomEvent<string>).detail as Landing);
  });
}
