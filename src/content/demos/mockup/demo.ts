import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type State = 'mockup' | 'hand';

/** The name in the header: the one the author typed, and one a reader really has. */
const NAME: Record<State, string> = { mockup: 'Ana Diaz', hand: 'Konstantina Papadopoulou' };

const INITIALS: Record<State, string> = { mockup: 'AD', hand: 'KP' };

const NOTE_TITLE: Record<State, string> = {
  mockup: 'What the picture assumes',
  hand: 'What the reader brought',
};

const NOTE: Record<State, string> = {
  mockup:
    'Everything is at its best. The name is short because the author typed it, the list has rows because the author added them, nothing has failed, and the type is the size it was drawn at.',
  hand: 'The same screen with a reader in it: their own name, their first run with nothing saved yet, an expired card, and the type size they set. None of these four was drawn.',
};

/**
 * Mockup specimen: one settled screen, shown twice. The mount state is the picture as
 * it leaves the file, where every value is the author's; the other state is the same
 * screen meeting somebody, where the name is long, the list is empty, an error is
 * showing, and the type is at the size the reader chose.
 *
 * The subject is the screen pane. In the second state that pane has stopped being a
 * mockup and become a screen with a reader in it, so the honest condition is declared
 * in `data-pose` (SPEC §6): identify refuses to pose the reader's state and plays on
 * or resets to the mount state, which satisfies it. The picker, the note beside the
 * pane, and the footnote are scenery in the context register (SPEC §5).
 *
 * Every box in the pane is sized for the larger type rather than for the type on
 * screen at mount, so the header, the message slot, the list region and the button
 * all hold their place across the pick and nothing below them moves (SPEC §5). The
 * type scale is the one change allowed to be visible inside those boxes, because it
 * is half of what the term's failure is made of. No timers: both states are a pick.
 */
export function mount(root: HTMLElement): void {
  const row = (n: number, title: string, value: string) => `
    <li class="sp-list-item" data-part="row-${n}" style="padding: 3px 8px; font-size: inherit; gap: 8px">
      <span style="flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${title}</span>
      <span style="flex: 0 0 auto; font-size: 0.85em; color: var(--sp-muted)">${value}</span>
    </li>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 11px 14px 13px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One settled screen</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="state" data-value="mockup" data-axis="Shown as" data-term="mockup" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-mockup" value="mockup"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Mockup</button>
            <button class="sp-segment" type="button" data-part="seg-hand" value="hand"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">In the hand</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface" data-part="pane" data-subject data-pose="[data-state=mockup]" data-state="mockup"
               style="display: flex; flex-direction: column; flex: 0 0 auto; gap: 6px;
                      width: 232px; height: 238px; padding: 10px; font-size: 13px; overflow: hidden">

            <div class="sp-row" data-part="header" style="gap: 8px; height: 34px; flex: 0 0 auto">
              <span class="sp-avatar" data-part="avatar" style="width: 26px; height: 26px; font-size: 10px">AD</span>
              <span data-part="name" style="flex: 1 1 auto; min-width: 0; font-size: 0.95em; font-weight: 600;
                                            line-height: 1.2; max-height: 34px; overflow: hidden">${NAME.mockup}</span>
              <span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${icon('chevronRight')}</span>
            </div>

            <div data-part="alert" style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 24px;
                                          padding: 0 8px; border-radius: 6px; color: var(--sp-warn);
                                          background: color-mix(in oklab, var(--sp-warn) 13%, transparent);
                                          font-size: 0.82em; line-height: 1.2; opacity: 0; visibility: hidden;
                                          transition: opacity 0.2s, visibility 0.2s">
              <span style="display: flex; flex: 0 0 auto">${icon('alert')}</span>
              <span style="flex: 1 1 auto; min-width: 0">Payment card expired</span>
            </div>

            <span data-part="section" style="flex: 0 0 auto; font-size: 0.76em; font-weight: 500;
                                             line-height: 14px; color: var(--sp-muted)">Recent trips</span>

            <div style="position: relative; flex: 0 0 auto; height: 88px">
              <ul class="sp-list" data-part="list"
                  style="position: absolute; inset: 0; transition: opacity 0.2s, visibility 0.2s">
                ${row(1, 'Lisbon', '12 Mar')}${row(2, 'Turin', '4 Apr')}${row(3, 'Bergen', '29 May')}
              </ul>
              <div class="sp-empty" data-part="empty"
                   style="position: absolute; inset: 0; gap: 6px; padding: 6px; opacity: 0; visibility: hidden;
                          transition: opacity 0.2s, visibility 0.2s">
                <span class="sp-empty-mark" style="width: 32px; height: 32px">${icon('inbox')}</span>
                <span style="font-size: 0.8em; color: var(--sp-muted)">No trips saved yet</span>
              </div>
            </div>

            <button class="sp-button" type="button" data-part="cta"
                    style="flex: 0 0 auto; height: 30px; padding: 0 14px; margin-top: auto">Plan a trip</button>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; height: 238px; gap: 6px">
            <span class="sp-label" data-part="note-title" data-state="mockup" style="font-size: 10px">${NOTE_TITLE.mockup}</span>
            <p class="sp-text" data-part="note" data-state="mockup"
               style="margin: 0; flex: 0 0 auto; height: 132px; font-size: 11px; line-height: 1.35">${NOTE.mockup}</p>
            <span class="sp-divider"></span>
            <p class="sp-text" data-part="footnote"
               style="margin: 0; flex: 1 1 auto; font-size: 10.5px; line-height: 1.35">
              A mockup is a claim about the best case. Every question worth asking of one is about a case it left out.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const pane = part(root, 'pane');
  const name = part(root, 'name');
  const avatar = part(root, 'avatar');
  const alert = part(root, 'alert');
  const list = part(root, 'list');
  const empty = part(root, 'empty');
  const note = part(root, 'note');
  const noteTitle = part(root, 'note-title');

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
    el.style.visibility = on ? 'visible' : 'hidden';
  };

  const apply = (next: State) => {
    const hand = next === 'hand';
    pane.dataset.state = next;
    pane.style.fontSize = hand ? '15.5px' : '13px';
    name.textContent = NAME[next];
    avatar.textContent = INITIALS[next];
    flag(name, 'data-long', hand);
    show(alert, hand);
    show(list, !hand);
    show(empty, hand);
    note.textContent = NOTE[next];
    note.dataset.state = next;
    noteTitle.textContent = NOTE_TITLE[next];
    noteTitle.dataset.state = next;
  };

  part(root, 'state').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'hand' ? 'hand' : 'mockup');
  });
}
