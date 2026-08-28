import { flag, part } from '#src/kit/parts.ts';

const REVEAL = {
  offer: {
    title: 'Not built yet',
    copy: 'Scheduled reports do not exist. This button is here so we can count who wants them, and nothing has been sent.',
    dismiss: 'Not now',
    act: 'Notify me',
  },
  counted: {
    title: 'Counted',
    copy: 'You are on the list. We build this only if enough people press it, and either way we will write to tell you.',
    dismiss: 'Close',
    act: 'On the list',
  },
} as const;

const BARS = [46, 62, 40, 78, 58, 90];

/**
 * Fake door specimen: a control that looks entirely shipped, sitting where the real one
 * would sit, wired to a counter instead of a feature. Pressing it opens the reveal, which
 * says the feature does not exist, says why the button is there, and offers the one real
 * thing left to do about it.
 *
 * The subject is the door itself, the narrowest element the term names: the report pane
 * behind it, the export button beside it, and the reveal it opens are all scenery, since
 * the reveal is what the door says rather than what the door is. Only the honest door is
 * portrayed, so there is no counter-example state and no `data-pose` to declare.
 *
 * The reveal is a dialog over the content pane rather than over the whole frame, so the
 * bar keeps its light and the door stays visible while its own reveal is up. The dialog
 * is absolutely positioned and both of its states are written into fixed-height slots, so
 * opening it and confirming inside it move nothing (SPEC §5). The door opens the reveal
 * and never closes it; the dismiss control is the only way back (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const bars = BARS.map(
    (height) => `<span style="flex: 1 1 0; height: ${height}px; border-radius: 3px 3px 0 0; background: var(--sp-accent)"></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">

        <div class="sp-topbar" style="gap: 8px">
          <span class="sp-heading sp-context sp-grow" style="font-size: 13px">Quarterly report</span>
          <button class="sp-button sp-button--ghost sp-button--sm sp-context" data-part="export" type="button" style="flex: 0 0 auto; white-space: nowrap">Export</button>
          <button
            class="sp-button sp-button--sm"
            data-part="door"
            data-subject
            data-open="false"
            type="button"
            style="flex: 0 0 auto; white-space: nowrap"
          >Schedule weekly</button>
        </div>

        <div class="sp-body sp-context" style="position: relative">
          <div class="sp-surface" style="height: 100%; padding: 12px; display: flex; flex-direction: column; gap: 10px">
            <span class="sp-label">Revenue by month</span>
            <div class="sp-row" style="align-items: flex-end; gap: 8px; height: 96px">${bars}</div>
            <div class="sp-stack" style="gap: 6px">
              <span class="sp-line" style="width: 70%"></span>
              <span class="sp-line" style="width: 45%"></span>
            </div>
          </div>

          <div class="sp-scrim" data-part="scrim"></div>
          <div
            class="sp-dialog"
            data-part="sheet"
            data-state="offer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fd-title"
            style="width: 300px; padding: 14px 16px"
          >
            <span class="sp-heading" data-part="sheet-title" id="fd-title" style="display: block; font-size: 14px">${REVEAL.offer.title}</span>
            <p class="sp-text" data-part="truth" style="margin: 6px 0 12px; height: 58px; font-size: 12px">${REVEAL.offer.copy}</p>
            <div class="sp-row" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="dismiss" type="button" style="flex: 1 1 0; white-space: nowrap">${REVEAL.offer.dismiss}</button>
              <button class="sp-button sp-button--sm" data-part="notify" type="button" style="flex: 1 1 0; white-space: nowrap">${REVEAL.offer.act}</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  const door = part(root, 'door');
  const scrim = part(root, 'scrim');
  const sheet = part(root, 'sheet');
  const title = part(root, 'sheet-title');
  const truth = part(root, 'truth');
  const dismiss = part(root, 'dismiss');
  const notify = part(root, 'notify');

  const render = (state: keyof typeof REVEAL) => {
    const copy = REVEAL[state];
    sheet.dataset.state = state;
    title.textContent = copy.title;
    truth.textContent = copy.copy;
    dismiss.textContent = copy.dismiss;
    notify.textContent = copy.act;
    notify.setAttribute('aria-disabled', String(state === 'counted'));
  };

  const setOpen = (open: boolean) => {
    door.dataset.open = String(open);
    flag(sheet, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  // Each control reaches one state rather than flipping what it found (SPEC §8): the door
  // opens, Notify me counts the press, and the dismiss control is the only way back.
  door.addEventListener('click', () => setOpen(true));
  notify.addEventListener('click', () => render('counted'));
  // Closing leaves the reveal as it stands rather than rewriting its copy under a fade,
  // and a press that has been counted stays counted.
  dismiss.addEventListener('click', () => setOpen(false));

  render('offer');
  setOpen(false);
}
