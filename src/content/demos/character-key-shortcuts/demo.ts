import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Policy = 'always' | 'typing' | 'modifier';

const BINDINGS = { s: 'starred the message', r: 'marked it replied' } as const;

const POLICY = {
  always: {
    caps: { s: 'S', r: 'R' },
    mode: 'bare',
    verdict: 'Fails 2.1.4',
    caption:
      'The letters land in the reply and fire the shortcuts on the way. Anybody dictating this sentence stars the message and marks it replied without meaning to.',
  },
  typing: {
    caps: { s: 'S', r: 'R' },
    mode: 'bare',
    verdict: 'Passes 2.1.4',
    caption:
      'The bindings stand down while the caret is in the field, so the letters are only letters. Click back out to the message and the same S still stars it.',
  },
  modifier: {
    caps: { s: 'Ctrl + S', r: 'Ctrl + R' },
    mode: 'modifier',
    verdict: 'Passes 2.1.4',
    caption:
      'Remapped onto Ctrl, which no dictation engine and no browse-mode reader emits by accident. A bare S is now only ever a letter.',
  },
} as const satisfies Record<Policy, unknown>;

const PLACEHOLDER = 'Write a reply';

/**
 * Character key shortcuts specimen: a mail app with S for star and R for reply, and a policy
 * picker offering the three escapes WCAG 2.1.4 accepts. Under "always on" the letters typed
 * into the reply field fire both shortcuts as well, which is the whole bug; scoping the
 * bindings to focus or moving them onto Ctrl leaves the same letters as letters.
 *
 * The subject is the legend that states the bindings, the narrowest element the term names:
 * a character key shortcut is the binding, not the app that answers it and not the field the
 * letters land in. The app card, the readout, the verdict and the caption are scenery.
 * A binding that has been remapped onto Ctrl is no longer what the term names, and it is a
 * state the legend itself passes through, so the honest condition lives in `data-pose` and the
 * mount state satisfies it (SPEC §6).
 *
 * The reply field is a `tabindex="0"` box the demo fills itself rather than an `<input>`,
 * because the term is about what a keydown handler does with a letter and the demo has to see
 * that keydown. A synthesized key press inserts no text of its own, so an `<input>` would show
 * the shortcut firing and never the typing, and the real reader's path (law: the control is
 * focusable, so a keyboard can reach it) would differ from the scripted one. Here both run
 * through the same handler.
 *
 * Every key cap holds a fixed width and every readout a fixed box, so changing policy moves
 * nothing (SPEC §5). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const binding = (key: 's' | 'r', label: string) => `
    <span class="sp-row" style="gap: 6px; flex: 0 0 auto">
      <span class="sp-kbd" data-part="cap-${key}" style="min-width: 54px; justify-content: center">${POLICY.always.caps[key]}</span>
      <span class="sp-label" style="font-size: 10.5px">${label}</span>
    </span>`;

  const state = (key: string, label: string) => `
    <span class="sp-label" style="font-size: 10px; flex: 0 0 auto">${label}
      <span data-part="${key}-state" data-on="no"
            style="display: inline-block; width: 22px; color: var(--sp-ink); font-weight: 500">no</span>
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Shortcut policy</span>
          <sp-segmented class="sp-segmented" data-part="policy" data-value="always">
            <button class="sp-segment" type="button" data-part="seg-always" value="always"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Always on</button>
            <button class="sp-segment" type="button" data-part="seg-typing" value="typing"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Off in fields</button>
            <button class="sp-segment" type="button" data-part="seg-modifier" value="modifier"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Ctrl needed</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="message" style="margin-top: 10px; padding: 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 18px">
            <span class="sp-heading" data-part="subject-line" style="font-size: 12.5px">Roof survey</span>
            <div class="sp-row" style="gap: 12px; flex: 0 0 auto">
              ${state('star', 'Starred')}
              ${state('reply', 'Replied')}
            </div>
          </div>
          <div class="sp-input" data-part="compose" data-active="no" data-text="no" tabindex="0" aria-label="Reply"
               style="margin-top: 8px; height: 32px; display: flex; align-items: center; gap: 1px;
                      font-size: 12px; cursor: text">
            <span data-part="typed"></span>
            <span class="sp-caret" data-part="caret" hidden></span>
            <span class="sp-label" data-part="placeholder" style="font-size: 12px">${PLACEHOLDER}</span>
          </div>
        </div>

        <div class="sp-row sp-row--between" style="margin-top: 10px; gap: 10px; height: 22px">
          <div class="sp-row" data-part="legend" data-subject data-mode="bare" data-pose="[data-mode=bare]"
               style="gap: 14px; flex: 0 0 auto">
            ${binding('s', 'Star')}
            ${binding('r', 'Reply')}
          </div>
          <span class="sp-text sp-text--ink sp-context" data-part="verdict" data-policy="always"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${POLICY.always.verdict}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Last key</span>
          <span class="sp-text sp-text--ink" data-part="log" data-fired="no"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">nothing pressed yet</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-policy="always"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${POLICY.always.caption}</p>
      </div>
    </div>
  `;

  const legend = part(root, 'legend');
  const compose = part(root, 'compose');
  const typed = part(root, 'typed');
  const caret = part(root, 'caret');
  const placeholder = part(root, 'placeholder');
  const verdict = part(root, 'verdict');
  const caption = part(root, 'caption');
  const log = part(root, 'log');
  const starState = part(root, 'star-state');
  const replyState = part(root, 'reply-state');

  let policy: Policy = 'always';
  let active = false;
  let text = '';
  let starred = false;
  let replied = false;

  const paint = () => {
    typed.textContent = text;
    compose.dataset.text = text ? 'yes' : 'no';
    compose.dataset.active = active ? 'yes' : 'no';
    flag(compose, 'data-sim-focus', active);
    caret.hidden = !active;
    placeholder.hidden = active || text.length > 0;
    starState.dataset.on = starred ? 'yes' : 'no';
    starState.textContent = starred ? 'yes' : 'no';
    replyState.dataset.on = replied ? 'yes' : 'no';
    replyState.textContent = replied ? 'yes' : 'no';
  };

  const apply = (next: Policy) => {
    policy = next;
    active = false;
    text = '';
    starred = false;
    replied = false;
    const rule = POLICY[next];
    legend.dataset.mode = rule.mode;
    part(root, 'cap-s').textContent = rule.caps.s;
    part(root, 'cap-r').textContent = rule.caps.r;
    verdict.dataset.policy = next;
    verdict.textContent = rule.verdict;
    caption.dataset.policy = next;
    caption.textContent = rule.caption;
    log.dataset.fired = 'no';
    log.textContent = 'nothing pressed yet';
    paint();
  };

  root.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key.length !== 1 || !/[a-z]/i.test(key)) return;
    const lower = key.toLowerCase();
    const bound = lower === 's' || lower === 'r' ? (lower as keyof typeof BINDINGS) : undefined;
    const held = event.ctrlKey || event.metaKey;

    const fires = bound !== undefined && (policy === 'always' || (policy === 'typing' && !active) || (policy === 'modifier' && held));
    const types = active && !held;

    if (fires && bound === 's') starred = true;
    if (fires && bound === 'r') replied = true;
    if (types) text += key;

    const named = held ? `Ctrl + ${key}` : key;
    const did = bound !== undefined ? BINDINGS[bound] : '';
    log.dataset.fired = fires ? 'yes' : 'no';
    log.textContent = fires
      ? types
        ? `${named} typed, and ${did}`
        : `${named} ${did}`
      : types
        ? `${named} typed into the reply`
        : `${named} did nothing`;
    paint();
  });

  // The caret goes where the reader pressed: into the field, or back out to the message,
  // which is the difference the "off in fields" policy turns on.
  root.addEventListener('click', (event) => {
    active = compose.contains(event.target as Node);
    paint();
  });

  part(root, 'policy').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Policy);
  });

  apply('always');
}
