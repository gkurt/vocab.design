import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'notify' | 'region';

const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
const MESSAGE = 'Copied to clipboard';

const CAPTION = {
  notify: 'One call, no element. The message is handed to the platform, so pressing again speaks again: there is no text to be unchanged.',
  region:
    'The node has to exist before the message does, and the message is text written into it. Press twice and the second write changes nothing, so nothing is spoken.',
} as const;

/**
 * ARIA notify specimen: the same announcement reached two ways, with a pick between the proposed
 * direct call and the live region trick it would replace. The DOM view is the point of the
 * contrast: one mode keeps a hidden node in the page, the other has no element at all.
 *
 * The transcript is a portrayal, labelled as one, following the live region and busy state
 * specimens rather than inventing a second convention for the same job.
 *
 * The subject is the utterance the API produces, the first transcript line: the term names how a
 * message reaches the voice, not the button that starts it and not the node the other technique
 * needs. The live region mode reaches the same utterance by the means this term exists to contrast
 * with, so the honest condition rides in `data-pose` and the mount state satisfies it (SPEC §6);
 * identify summons the line out of the silence it starts in.
 *
 * No timers: every state here is reached by a press, so the specimen needs no clock.
 */
export function mount(root: HTMLElement): void {
  const codeLine = (text: string, extra = '') =>
    `<span style="display: block; font-family: ${MONO}; font-size: 10.5px; line-height: 15px; white-space: nowrap; ${extra}">${text}</span>`;

  const transcriptLine = (index: number) => `
    <p class="sp-text sp-text--ink" data-part="line-${index}" data-kind="none"
       style="margin: 0; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap;
              opacity: 0; transition: opacity 0.18s ease"></p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Announcing a copy result</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="notify" data-axis="Method" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-notify" value="notify"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">ariaNotify</button>
            <button class="sp-segment" type="button" data-part="seg-region" value="region"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Live region</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="dom" data-mode="notify" style="margin-top: 9px; padding: 8px 10px">
          <span class="sp-label sp-context" data-part="dom-label" style="font-size: 10px">What the page carries: no announcement element</span>
          <div style="position: relative; height: 45px; margin-top: 3px">
            <div data-part="view-notify" style="position: absolute; inset: 0; transition: opacity 0.18s ease">
              <span data-part="call" data-fired="no"
                    style="display: block; padding-left: 7px; border-left: 2px solid var(--sp-line);
                           transition: border-color 0.18s ease">
                ${codeLine('document.body.ariaNotify({', 'color: var(--sp-muted)')}
                ${codeLine(`&nbsp;&nbsp;message: "${MESSAGE}"`, 'color: var(--sp-ink)')}
                ${codeLine('})', 'color: var(--sp-muted)')}
              </span>
            </div>
            <div data-part="view-region" class="sp-context"
                 style="position: absolute; inset: 0; opacity: 0; transition: opacity 0.18s ease">
              <span data-part="node" data-text="no" style="display: block; padding-left: 7px; border-left: 2px solid var(--sp-line)">
                ${codeLine('&lt;div role="status" aria-live="polite"&gt;', 'color: var(--sp-muted)')}
                ${codeLine(`<span data-part="node-text" style="opacity: 0; transition: opacity 0.18s ease">&nbsp;&nbsp;${MESSAGE}</span>`, 'color: var(--sp-ink); min-height: 15px')}
                ${codeLine('&lt;/div&gt;', 'color: var(--sp-muted)')}
              </span>
            </div>
          </div>
        </div>

        <div class="sp-row" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="copy"
                  style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Copy link</button>
          <span class="sp-label sp-context" data-part="calls"
                style="flex: 1 1 auto; min-width: 0; font-size: 10px; white-space: nowrap">Pressed 0 times</span>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <span class="sp-label" style="font-size: 10px">Screen reader, portrayed</span>
          <div class="sp-stack" style="gap: 0; margin-top: 3px; height: 30px">
            ${transcriptLine(1)}${transcriptLine(2)}
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="notify"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.notify}</p>
      </div>
    </div>
  `;

  const dom = part(root, 'dom');
  const domLabel = part(root, 'dom-label');
  const views = { notify: part(root, 'view-notify'), region: part(root, 'view-region') };
  const call = part(root, 'call');
  const node = part(root, 'node');
  const nodeText = part(root, 'node-text');
  const calls = part(root, 'calls');
  const caption = part(root, 'caption');
  const lines = [part(root, 'line-1'), part(root, 'line-2')];

  // The utterance the API produces: the subject, honest only in the mode this term names.
  lines[0]?.setAttribute('data-subject', '');
  lines[0]?.setAttribute('data-pose', '[data-mode=notify]');

  let mode: Mode = 'notify';
  let presses = 0;

  const say = (index: number, kind: 'spoken' | 'silent', text: string) => {
    const line = lines[index];
    if (!line) return;
    line.dataset.kind = kind;
    line.dataset.mode = mode;
    line.textContent = text;
    line.style.opacity = '1';
    line.style.color = kind === 'silent' ? 'var(--sp-muted)' : '';
  };

  const apply = (next: Mode) => {
    mode = next;
    presses = 0;
    dom.dataset.mode = next;
    domLabel.textContent =
      next === 'notify' ? 'What the page carries: no announcement element' : 'What the page carries: a node that must already exist';
    views.notify.style.opacity = next === 'notify' ? '1' : '0';
    views.region.style.opacity = next === 'region' ? '1' : '0';
    call.dataset.fired = 'no';
    call.style.borderColor = 'var(--sp-line)';
    node.dataset.text = 'no';
    nodeText.style.opacity = '0';
    calls.textContent = 'Pressed 0 times';
    for (const line of lines) {
      line.dataset.kind = 'none';
      line.dataset.mode = next;
      line.textContent = '';
      line.style.opacity = '0';
    }
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
  };

  part(root, 'copy').addEventListener('click', () => {
    presses += 1;
    calls.textContent = `Pressed ${presses} time${presses === 1 ? '' : 's'}`;

    if (mode === 'notify') {
      call.dataset.fired = 'yes';
      call.style.borderColor = 'var(--sp-accent)';
      say(presses - 1, 'spoken', `“${MESSAGE}”`);
      return;
    }

    // The live region trick: the text is written into a node that had to already be there, and a
    // second identical write is not a mutation, so it produces no speech at all.
    node.dataset.text = 'yes';
    nodeText.style.opacity = '1';
    if (presses === 1) say(0, 'spoken', `“${MESSAGE}”`);
    else if (presses === 2) say(1, 'silent', 'Silence. The text was already this, so nothing changed.');
  });

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('notify');
}
