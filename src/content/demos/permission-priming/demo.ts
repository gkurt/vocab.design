import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type State = 'asking' | 'granted' | 'denied' | 'deferred';

const CARD: Record<State, { title: string; body: string; actions: boolean }> = {
  asking: {
    title: 'Turn on order updates?',
    body: 'One message when your driver leaves, and one when they arrive. Nothing else, and you can turn it off here later.',
    actions: true,
  },
  granted: {
    title: 'Order updates are on',
    body: 'The system prompt was answered once, after the reason for it had already been given.',
    actions: false,
  },
  denied: {
    title: 'Updates stayed off',
    body: 'The system prompt is spent now. Turning them on means finding this app in the phone settings.',
    actions: false,
  },
  deferred: {
    title: 'Not now, then',
    body: 'Nothing was spent. The system prompt was never shown, so the app can offer this again after the next order.',
    actions: false,
  },
};

const NOTE: Record<State, string> = {
  asking: 'Not now costs nothing: only Turn on reaches the system.',
  granted: 'One prompt, once, when its answer was already obvious.',
  denied: 'This is what a cold prompt on first launch usually buys.',
  deferred: 'A primer refused is not a permission refused.',
};

/**
 * Permission priming specimen: a delivery app that asks in its own words first, and only
 * reaches the operating system once the reader has said yes to the reason. Not now ends
 * the ask without touching the system prompt, which is the whole trade the pattern makes.
 *
 * The subject is the priming card, the narrowest element the term names. The order status
 * above it, the note under it, and the Replay control are scenery (SPEC §5). No
 * `data-pose` here: this is one of the honest patterns, and every state the card reaches
 * (granted, deferred, or the denial a spent prompt leaves behind) is still the card that
 * asked first.
 *
 * The card holds one height for every state and its action row keeps its space when the
 * buttons are gone, so answering moves nothing (SPEC §5). The system prompt is simulated,
 * never the browser's own Notification API, since a specimen may not ask a reader's
 * machine for anything. Each control reaches a named state rather than toggling, and
 * Replay returns the mount state (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Nori Kitchen</span><span class="sp-label">Order 4182</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-context" style="flex: 0 0 auto; height: 42px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-text sp-text--ink" style="font-size: 12px">Order placed, kitchen is cooking</span>
              <span class="sp-label" style="font-size: 11px">18:40</span>
            </div>
            <div class="sp-progress" style="margin-top: 8px"><div class="sp-progress-fill" style="--sp-value: 45%"></div></div>
          </div>

          <section
            class="sp-surface"
            data-part="primer"
            data-subject
            data-state="asking"
            style="display: flex; flex-direction: column; flex: 0 0 auto; height: 110px; padding: 10px 12px"
          >
            <div class="sp-row" style="gap: 8px; height: 18px">
              ${icon('bell')}
              <span class="sp-heading" data-part="primer-title" style="font-size: 13px">${CARD.asking.title}</span>
            </div>
            <span class="sp-text" data-part="primer-body" style="height: 36px; margin-top: 4px; font-size: 12px">${CARD.asking.body}</span>
            <div class="sp-row" data-part="primer-actions" style="height: 32px; margin-top: auto; gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="not-now" type="button">Not now</button>
              <span class="sp-grow"></span>
              <button class="sp-button sp-button--sm" data-part="enable" type="button">Turn on updates</button>
            </div>
          </section>

          <div class="sp-row sp-context" style="flex: 0 0 auto; height: 26px; gap: 10px">
            <span class="sp-text sp-grow" data-stage-verdict data-part="note" style="font-size: 11px">${NOTE.asking}</span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button" style="padding: 4px 10px; font-size: 12px">Replay</button>
          </div>

        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="os" role="dialog" aria-label="System permission prompt" style="width: 268px; padding: 14px 16px; text-align: center">
          <span class="sp-label" style="font-size: 10px">Simulated system prompt</span>
          <div class="sp-text sp-text--ink" style="margin-top: 6px; font-size: 13px">&ldquo;Nori Kitchen&rdquo; would like to send you notifications</div>
          <div class="sp-row" style="margin-top: 12px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm sp-grow" data-part="os-deny" type="button">Don't allow</button>
            <button class="sp-button sp-button--sm sp-grow" data-part="os-allow" type="button">Allow</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const primer = part(root, 'primer');
  const title = part(root, 'primer-title');
  const body = part(root, 'primer-body');
  const actions = part(root, 'primer-actions');
  const note = part(root, 'note');
  const scrim = part(root, 'scrim');
  const os = part(root, 'os');

  const openPrompt = (open: boolean) => {
    flag(os, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  const show = (state: State) => {
    primer.dataset.state = state;
    title.textContent = CARD[state].title;
    body.textContent = CARD[state].body;
    actions.style.visibility = CARD[state].actions ? 'visible' : 'hidden';
    note.textContent = NOTE[state];
  };

  part(root, 'enable').addEventListener('click', () => {
    if (primer.dataset.state !== 'asking') return;
    openPrompt(true);
  });

  part(root, 'not-now').addEventListener('click', () => {
    if (primer.dataset.state !== 'asking') return;
    show('deferred');
  });

  part(root, 'os-allow').addEventListener('click', () => {
    openPrompt(false);
    show('granted');
  });

  part(root, 'os-deny').addEventListener('click', () => {
    openPrompt(false);
    show('denied');
  });

  part(root, 'replay').addEventListener('click', () => {
    openPrompt(false);
    show('asking');
  });
}
