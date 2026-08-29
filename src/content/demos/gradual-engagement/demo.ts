import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'gradual' | 'gated';
type Note = Mode | 'asking';

const NOTE: Record<Note, string> = {
  gradual: 'The tool works before anything is asked. The account comes up at the save, the first moment having one changes the outcome.',
  asking: 'The deferred ask, arriving on the save. The short link already works, so an account is about keeping it, not about getting in.',
  gated: 'The counter-example: registration at the front door, the tool blurred out behind it. Nothing useful has happened yet.',
};

const field = (label: string) => `
  <div style="flex: 1 1 0; min-width: 0">
    <span class="sp-label" style="display: block; font-size: 10px">${label}</span>
    <input class="sp-input" type="text" aria-label="${label}" style="width: 100%; height: 22px; margin-top: 2px; padding: 0 8px; font-size: 11px" />
  </div>`;

const sketch = (width: number, height: number) =>
  `<div style="width: ${width}%; height: ${height}px; border-radius: 5px; background: var(--sp-line)"></div>`;

/**
 * Gradual engagement specimen: one product's first screen, offered as the working tool
 * and, for comparison, gated behind a registration form with the tool blurred out behind
 * it. In the gradual state the account ask is deferred to the save, where it opens on its
 * own trigger and closes on its own dismissal (SPEC §8), so the term is never mistaken
 * for a product that simply never asks.
 *
 * The subject is the first screen's primary element, which is the working tool: the frame,
 * its topbar, the mode pick and the note line are scenery (SPEC §5). The brief's other
 * candidate, an element that is a form in one state and the tool in the other, could not
 * stay honest, since a ring around the registration form would identify the very thing the
 * term replaces. Here the tool is absent in the counter-example rather than repaired, so
 * identify summons the gradual state back instead of posing the gate, and no `data-pose`
 * is needed (SPEC §6).
 *
 * Both states are absolutely placed in one box of fixed height, and inside the tool the
 * result row and the ask slot each keep their own box in every state, so shortening a
 * link, opening the ask, and switching modes move nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Snipline</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Order" data-part="mode" data-value="gradual" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-gradual" type="button" value="gradual" style="padding: 4px 9px; font-size: 11px">Tool first</button>
            <button class="sp-segment" data-part="mode-gated" type="button" value="gated" style="padding: 4px 9px; font-size: 11px">Sign-up first</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="position: relative">
          <div style="position: relative; height: 100%">

            <div data-part="tool" data-subject style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px">
              <span class="sp-heading" style="flex: 0 0 auto; height: 20px; font-size: 13px">Shorten a link</span>
              <div class="sp-row" style="flex: 0 0 auto; gap: 8px">
                <input class="sp-input sp-grow" data-part="url" type="text" aria-label="Long link" placeholder="Paste a long link" style="height: 28px; padding: 0 9px; font-size: 11px" />
                <button class="sp-button sp-button--sm" data-part="shorten" type="button" style="flex: 0 0 auto">Shorten</button>
              </div>
              <div class="sp-surface" data-part="result" data-state="empty" style="position: relative; flex: 0 0 auto; height: 40px; background: var(--sp-surface)">
                <span class="sp-label" data-part="result-empty" style="position: absolute; inset: 0; padding: 13px 11px; font-size: 11px">The short link lands here, for anyone, signed in or not.</span>
                <div class="sp-row" data-part="result-link" hidden style="position: absolute; inset: 0; gap: 9px; padding: 0 11px">
                  <span style="flex: 0 0 auto">
                    <span class="sp-text sp-text--ink" style="display: block; font-size: 12px; font-weight: 600; line-height: 15px">snipline.co/k3f9</span>
                    <span class="sp-text" data-part="result-from" style="display: block; max-width: 190px; font-size: 10px; line-height: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">from the pasted link</span>
                  </span>
                  <span class="sp-grow"></span>
                  <button class="sp-icon-button" data-part="copy" type="button" aria-label="Copy" style="flex: 0 0 auto; width: 26px; height: 26px">${icon('copy')}</button>
                  <button class="sp-button sp-button--ghost sp-button--sm" data-part="save" type="button" style="flex: 0 0 auto; font-size: 11.5px">Save to my links</button>
                </div>
              </div>
              <div data-part="slot" style="position: relative; flex: 1 1 auto; min-height: 0">
                <span class="sp-label" data-part="ask-rest" style="position: absolute; inset: 0; padding-top: 6px; font-size: 11px; line-height: 1.4">An account is asked for at the save, not at the door. Nothing has been kept yet.</span>
                <div class="sp-surface" data-part="ask" hidden style="position: absolute; inset: 0; padding: 9px 11px; background: var(--sp-surface)">
                  <span class="sp-heading" style="font-size: 12.5px">Keep this link?</span>
                  <span class="sp-text" style="display: block; margin-top: 1px; font-size: 11px">The link works either way. An account is what remembers it.</span>
                  <div class="sp-row" style="gap: 8px; margin-top: 8px">
                    <input class="sp-input sp-grow" data-part="ask-email" type="text" aria-label="Email" placeholder="you@example.com" style="height: 26px; padding: 0 9px; font-size: 11px" />
                    <button class="sp-button sp-button--sm" data-part="ask-create" type="button" style="flex: 0 0 auto">Create account</button>
                    <button class="sp-button sp-button--quiet sp-button--sm" data-part="ask-dismiss" type="button" style="flex: 0 0 auto; color: var(--sp-muted); font-size: 12px">Not now</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="sp-context" data-part="gate" hidden style="position: absolute; inset: 0">
              <div aria-hidden="true" style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; opacity: 0.5; filter: blur(3px)">
                ${sketch(42, 14)}
                ${sketch(100, 28)}
                ${sketch(100, 44)}
                ${sketch(74, 12)}
                ${sketch(60, 12)}
              </div>
              <div class="sp-surface" data-part="gate-form" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 306px; padding: 10px 14px; background: var(--sp-surface)">
                <span class="sp-heading" style="font-size: 13px">Create your account</span>
                <span class="sp-text" style="display: block; margin-top: 1px; font-size: 11px">Then you can shorten a link.</span>
                <div class="sp-row" style="gap: 10px; margin-top: 8px; align-items: flex-end">${field('Full name')}${field('Email')}</div>
                <div class="sp-row" style="gap: 10px; margin-top: 6px; align-items: flex-end">${field('Password')}${field('Confirm password')}</div>
                <div class="sp-row" style="gap: 9px; margin-top: 9px">
                  <button class="sp-button sp-button--sm" data-part="gate-submit" type="button" style="flex: 0 0 auto">Create account</button>
                  <span class="sp-label" style="font-size: 10px">No, there is no other way in.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${NOTE.gradual}</span>
    </div>
  `;

  const tool = part(root, 'tool');
  const gate = part(root, 'gate');
  const url = part(root, 'url') as HTMLInputElement;
  const result = part(root, 'result');
  const resultEmpty = part(root, 'result-empty');
  const resultLink = part(root, 'result-link');
  const from = part(root, 'result-from');
  const ask = part(root, 'ask');
  const rest = part(root, 'ask-rest');
  const note = part(root, 'note');

  const say = (which: Note) => {
    note.textContent = NOTE[which];
  };

  const openAsk = (open: boolean) => {
    ask.hidden = !open;
    rest.hidden = open;
    say(open ? 'asking' : 'gradual');
  };

  part(root, 'shorten').addEventListener('click', () => {
    const typed = url.value.trim();
    from.textContent = typed ? `from ${typed}` : 'from the pasted link';
    result.dataset.state = 'filled';
    resultEmpty.hidden = true;
    resultLink.hidden = false;
  });

  part(root, 'save').addEventListener('click', () => openAsk(true));
  part(root, 'ask-dismiss').addEventListener('click', () => openAsk(false));

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'gated' ? 'gated' : 'gradual';
    tool.hidden = next !== 'gradual';
    gate.hidden = next !== 'gated';
    say(next === 'gated' ? 'gated' : ask.hidden ? 'gradual' : 'asking');
  });
}
