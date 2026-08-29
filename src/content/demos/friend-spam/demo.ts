import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'vague' | 'exact';

interface Ask {
  head: string;
  body: string;
  message: string;
  cta: string;
}

const ASK: Record<Mode, Ask> = {
  vague: {
    head: 'Find your friends',
    body: 'Loomly is better with people you already cook with. Connect your address book to see who is here.',
    message: '',
    cta: 'Connect contacts',
  },
  exact: {
    head: 'Invite people yourself',
    body: 'We read your address book to show you who is here. Nothing is sent until you pick names.',
    message: 'Each invitation will read: Dana asked to swap recipes with you on Loomly.',
    cta: 'Show me my contacts',
  },
};

interface Outcome {
  state: string;
  count: string;
  line: string;
  note: string;
}

const OUTCOME: Record<Mode, { pending: Outcome; after: Outcome }> = {
  vague: {
    pending: { state: 'pending', count: '0 sent', line: 'Nothing has left yet.', note: 'The ask mentions seeing, not sending.' },
    after: {
      state: 'sent',
      count: '214 sent',
      line: 'From: Dana Ruiz. To: everyone in the address book.',
      note: 'The reader never saw the list, the wording, or the count before it went.',
    },
  },
  exact: {
    pending: {
      state: 'pending',
      count: '0 sent',
      line: 'Nothing has left yet.',
      note: 'The ask names the act, the recipients, and the words.',
    },
    after: {
      state: 'held',
      count: '0 sent',
      line: '214 contacts read and shown to the reader.',
      note: 'Names are picked next, and the count on the send button is what was chosen.',
    },
  },
};

const NOTE: Record<Mode, string> = {
  vague: 'One permission, two different acts. The mail is not the deception; the sentence that collected the address book is.',
  exact: 'The same address book, the same integration, the same button. Only the ask changed, and now the consent covers what happens.',
};

/**
 * Friend spam specimen: the same contact-list permission asked two ways, with what actually
 * leaves the product shown underneath. The vague ask talks about seeing and then mails
 * everybody in the reader's name; the exact ask names the act, the recipients and the
 * wording, and sending waits for the reader.
 *
 * The subject is the consent ask, since the deception lives in what that ask claims rather
 * than in the mail that follows. The exact ask is a state in which the subject stops being
 * the term, so the vague condition is declared in `data-pose` and the specimen mounts
 * vague: identify refuses to ring the honest ask and summons this state instead (SPEC §6).
 * The outbox, the mode picker, the topbar and the caption are scenery (SPEC §5).
 *
 * Every swappable line keeps a box of its own height, including the message line the vague
 * ask leaves empty, so switching modes moves nothing (SPEC §5). Picking a mode resets the
 * outbox to pending, so the click that follows is the same click in both states rather than
 * one that depends on what it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Loomly, first run</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="vague" data-axis="Friend spam" data-term="vague" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-vague" type="button" value="vague" style="padding: 4px 9px; font-size: 11.5px">With</button>
            <button class="sp-segment" data-part="mode-exact" type="button" value="exact" style="padding: 4px 9px; font-size: 11.5px">Without</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div
            class="sp-surface"
            data-part="ask"
            data-subject
            data-pose="[data-mode=vague]"
            data-mode="vague"
            style="flex: 0 0 auto; height: 130px; padding: 11px 12px; background: var(--sp-surface)"
          >
            <span class="sp-heading" data-part="ask-head" style="display: block; height: 20px; line-height: 20px; font-size: 13px">${ASK.vague.head}</span>
            <span class="sp-text" data-part="ask-body" style="display: block; height: 32px; margin-top: 3px; font-size: 11.5px; line-height: 1.35">${ASK.vague.body}</span>
            <span class="sp-text" data-part="ask-message" style="display: block; height: 16px; margin-top: 2px; font-size: 11px; line-height: 16px; font-style: italic">${ASK.vague.message}</span>
            <div class="sp-row" style="gap: 8px; margin-top: 9px">
              <button class="sp-button sp-button--sm" data-part="consent" type="button" style="flex: 0 0 auto; white-space: nowrap">${ASK.vague.cta}</button>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="decline" type="button" style="flex: 0 0 auto; color: var(--sp-muted); white-space: nowrap">Not now</button>
            </div>
          </div>

          <div class="sp-surface sp-context" data-part="outbox" data-state="pending" style="flex: 1 1 auto; padding: 8px 11px">
            <div class="sp-row" style="gap: 8px; height: 18px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">Outbox</span>
              <span class="sp-chip" data-part="count" style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; cursor: default; white-space: nowrap">${OUTCOME.vague.pending.count}</span>
            </div>
            <span class="sp-text sp-text--ink" data-part="outbox-line" style="display: block; height: 15px; font-size: 11px; line-height: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${OUTCOME.vague.pending.line}</span>
            <span class="sp-text" data-part="outbox-note" style="display: block; height: 15px; font-size: 10.5px; line-height: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${OUTCOME.vague.pending.note}</span>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 30px; font-size: 11px; line-height: 1.35">${NOTE.vague}</span>
    </div>
  `;

  const ask = part(root, 'ask');
  const askHead = part(root, 'ask-head');
  const askBody = part(root, 'ask-body');
  const askMessage = part(root, 'ask-message');
  const consent = part(root, 'consent');
  const outbox = part(root, 'outbox');
  const count = part(root, 'count');
  const line = part(root, 'outbox-line');
  const outNote = part(root, 'outbox-note');
  const note = part(root, 'note');

  let mode: Mode = 'vague';

  const showOutcome = (outcome: Outcome) => {
    outbox.dataset.state = outcome.state;
    count.textContent = outcome.count;
    line.textContent = outcome.line;
    outNote.textContent = outcome.note;
  };

  const showAsk = () => {
    const copy = ASK[mode];
    ask.dataset.mode = mode;
    askHead.textContent = copy.head;
    askBody.textContent = copy.body;
    askMessage.textContent = copy.message;
    consent.textContent = copy.cta;
    note.textContent = NOTE[mode];
    showOutcome(OUTCOME[mode].pending);
  };

  consent.addEventListener('click', () => showOutcome(OUTCOME[mode].after));
  part(root, 'decline').addEventListener('click', () => showOutcome(OUTCOME[mode].pending));

  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'exact' ? 'exact' : 'vague';
    showAsk();
  });
}
