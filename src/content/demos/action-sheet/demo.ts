import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Choice = { key: string; label: string; result: string };

const CHOICES = [
  { key: 'copy', label: 'Copy link', result: 'Link copied' },
  { key: 'save', label: 'Add to favourites', result: 'Added to favourites' },
  { key: 'hide', label: 'Hide from feed', result: 'Hidden from your feed' },
] as const satisfies readonly Choice[];

const GLYPH = { copy: 'copy', save: 'star', hide: 'eyeOff' } as const;

/**
 * Action sheet specimen: the Share button raises a modal strip of choices at the end
 * of a phone screen, Cancel last. The sheet is the subject; the note it was raised
 * from, and the line reporting what happened, are scenery.
 *
 * The sheet is out of flow along the bottom edge and slides over the content, so
 * nothing in the screen makes room for it (SPEC §5). The trigger only ever opens;
 * every row in the sheet, Cancel included, is a way out (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = CHOICES.map(
    (choice) => `
      <button class="sp-menu-item" type="button" data-part="act-${choice.key}">${icon(GLYPH[choice.key])}${choice.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 214px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <button class="sp-icon-button" data-part="share" aria-label="Share this note">${icon('share')}</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-stack sp-grow" style="gap: 7px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 72%"></div>
            <div class="sp-line" style="width: 80%"></div>
            <div class="sp-line" style="width: 46%"></div>
          </div>
          <span class="sp-text" data-part="status" data-value="none" role="status" style="white-space: nowrap">Nothing shared yet</span>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-surface"
          data-part="sheet"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Share this note"
          style="position: absolute; left: 0; right: 0; bottom: 0; padding: 8px; border-width: 1px 0 0; border-radius: 14px 14px 0 0; box-shadow: var(--sp-shadow); transform: translateY(100%); visibility: hidden; transition: transform 0.26s var(--sp-ease), visibility 0.26s"
        >
          ${rows}
          <div class="sp-divider" style="margin: 6px 4px"></div>
          <button class="sp-menu-item" type="button" data-part="act-cancel" style="justify-content: center; font-weight: 500">Cancel</button>
        </div>
      </div>
    </div>
  `;

  const sheet = part(root, 'sheet');
  const scrim = part(root, 'scrim');
  const status = part(root, 'status');

  const setOpen = (open: boolean) => {
    sheet.style.transform = open ? 'translateY(0)' : 'translateY(100%)';
    sheet.style.visibility = open ? 'visible' : 'hidden';
    flag(scrim, 'data-open', open);
  };

  const choose = (choice: Choice) => {
    status.dataset.value = choice.key;
    status.textContent = choice.result;
    setOpen(false);
  };

  part(root, 'share').addEventListener('click', () => setOpen(true));
  for (const choice of CHOICES) part(root, `act-${choice.key}`).addEventListener('click', () => choose(choice));
  part(root, 'act-cancel').addEventListener('click', () => setOpen(false));
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
