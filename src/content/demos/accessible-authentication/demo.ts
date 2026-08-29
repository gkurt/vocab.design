import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'memory' | 'open';

/** What a password manager would have put in the field. */
const CODE = '481902';

const NOTE: Record<string, string> = {
  allowed: 'Paste, a password manager, and autofill all reach this field.',
  blocked: 'Paste was blocked. The code has to come out of your head.',
  waiting: 'Paste, a password manager, and autofill all reach this field.',
  refuses: 'This field refuses a paste, so the code has to come out of your head.',
};

const TEST: Record<Mode, string> = {
  memory: 'Cognitive function test: required',
  open: 'Cognitive function test: none',
};

const CAPTION: Record<Mode, string> = {
  memory:
    'A memorised code, and a field that refuses to be filled by anything but a person typing. Blocking paste is what turns a field into a memory test.',
  open: 'The same account, reached without recalling anything: a manager may fill the field, and a passkey skips the question altogether.',
};

/**
 * Accessible authentication specimen: one sign-in step drawn two ways through a segmented
 * control. One demands a memorised code and refuses a paste; the other lets the field be filled
 * and offers a passkey beside it. A read-out names whether the step requires a cognitive function
 * test at all.
 *
 * The subject is the authentication step, the panel that carries the challenge and the routes
 * through it, since the criterion is a property of the step rather than of any one field. The
 * picker, the read-out and the caption are scenery (SPEC §5), and the panel is narrower than the
 * whole scene, so identify still has something to point at (SPEC §6).
 *
 * The memory test is the counter-example the step itself passes through, so the honest condition
 * lives in `data-pose` and the mount state satisfies it: identify refuses to pose a step that
 * requires recall and plays on (SPEC §6). Choosing a mode clears the field and signs the reader
 * back out, so a pass joined halfway starts where every other pass started, and the passkey row
 * keeps its height in both modes so nothing moves when it goes (SPEC §5, §8). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Sign-in" data-term="open" data-part="picker" data-value="open">
            <button class="sp-segment" type="button" data-part="seg-memory" value="memory"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Tests your memory</button>
            <button class="sp-segment" type="button" data-part="seg-open" value="open"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Tests nothing you recall</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="signin" data-subject data-pose="[data-mode=open]" data-mode="open"
             style="margin-top: 8px; height: 146px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px">
          <span class="sp-heading" style="font-size: 13px">Sign in to your account</span>

          <div class="sp-row" style="gap: 8px">
            <span class="sp-label sp-context" style="flex: 0 0 96px; font-size: 10.5px">Six digit code</span>
            <input class="sp-input" data-part="code" aria-label="Six digit code"
                   style="flex: 1 1 auto; min-width: 0; height: 26px; padding: 3px 8px; font-size: 11.5px" />
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="paste"
                    style="flex: 0 0 auto; font-size: 11px; padding: 3px 9px">Paste</button>
          </div>

          <span class="sp-text sp-context" data-stage-verdict data-part="note" data-state="waiting"
                style="min-height: 15px; font-size: 10.5px">${NOTE.waiting}</span>

          <div class="sp-divider sp-context"></div>

          <div class="sp-row" style="height: 28px; gap: 10px">
            <button class="sp-button sp-button--sm" type="button" data-part="passkey"
                    style="font-size: 11.5px">Continue with a passkey</button>
            <span class="sp-text sp-context" data-part="status" data-state="out"
                  style="flex: 1 1 auto; min-width: 0; font-size: 10.5px">Not signed in yet</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" data-part="test" data-state="none" style="flex: 0 0 auto; font-size: 10.5px">${TEST.open}</span>
          <span class="sp-label" data-part="routes" data-mode="open" style="flex: 0 0 auto; font-size: 10.5px">Routes in: two</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="open"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${CAPTION.open}</p>
      </div>
    </div>
  `;

  const signin = part(root, 'signin');
  const code = part(root, 'code') as HTMLInputElement;
  const note = part(root, 'note');
  const passkey = part(root, 'passkey');
  const status = part(root, 'status');
  const test = part(root, 'test');
  const routes = part(root, 'routes');
  const caption = part(root, 'caption');

  const setNote = (state: string) => {
    note.dataset.state = state;
    note.textContent = NOTE[state] ?? '';
  };

  const apply = (next: Mode) => {
    signin.dataset.mode = next;
    code.value = '';
    flag(code, 'data-filled', false);
    flag(passkey, 'hidden', next === 'memory');
    setNote(next === 'memory' ? 'refuses' : 'waiting');
    status.dataset.state = 'out';
    status.textContent = 'Not signed in yet';
    test.dataset.state = next === 'memory' ? 'required' : 'none';
    test.textContent = TEST[next];
    routes.dataset.mode = next;
    routes.textContent = next === 'memory' ? 'Routes in: one, and it goes through your memory' : 'Routes in: two';
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
  };

  apply('open');

  // The Paste control stands in for a password manager: the point is not the button but whether
  // the field accepts anything it did not watch a person type.
  part(root, 'paste').addEventListener('click', () => {
    if (signin.dataset.mode === 'memory') {
      setNote('blocked');
      return;
    }
    code.value = CODE;
    flag(code, 'data-filled', true);
    setNote('allowed');
  });

  passkey.addEventListener('click', () => {
    status.dataset.state = 'in';
    status.textContent = 'Signed in, having recalled nothing';
  });

  part(root, 'picker').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
