import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'on' | 'off';

/** Written to the width of the box that holds them: one line each, no wrapping (SPEC §5). */
const ACTIVE = {
  none: 'document.activeElement is <body>. Nothing has been clicked yet.',
  inner: 'document.activeElement is the input in <my-field>. The host passed it on.',
  nowhere: 'document.activeElement is <body>. The press stopped at the host.',
} as const;

const CAPTION = {
  on: 'A press on the host reaches the control, so the padding is part of the field. Nothing tells the two hosts apart.',
  off: 'The same press lands on an element that cannot hold focus, so typing does nothing and Tab restarts from the top.',
} as const;

/**
 * Focus delegation specimen: a custom element with generous padding, and a pick between a shadow
 * root that forwards a press on the host into the input and one that does not. The two look
 * identical, which is the point; what differs is where focus is after the press.
 *
 * The subject is the host's padding region, drawn as an element of its own because the feature has
 * none in the markup (SPEC §5, §8): the term names the band of host that is not a control, where a
 * press is either forwarded or swallowed. The input, the picker, the readout and the caption are
 * scenery. A region that swallows the press is the counter-example rather than the term, and it is
 * a state this same region passes through, so the honest condition is declared in `data-pose` and
 * the mount state satisfies it (SPEC §6).
 *
 * The ring is simulated (`data-sim-focus`), because attract mode never moves real focus (SPEC §7);
 * the input is a real input, so a reader's own Tab still reaches it. No timers: a press and a pick
 * are the only state here.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Shadow root" data-term="on" data-value="on" style="flex: 0 0 auto; margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-on" value="on"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">delegatesFocus: true</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">false</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="host" style="margin-top: 8px; padding: 0; overflow: hidden">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; padding: 6px 10px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">&#60;my-field&#62;</span>
            <span class="sp-label" data-part="flagline" style="flex: 0 0 auto; font-size: 10px">shadow root, one input inside</span>
          </div>
          <div data-part="pad" data-subject data-delegated data-pose="[data-delegated]"
               style="display: flex; align-items: center; justify-content: center; height: 38px;
                      background: var(--sp-sunken); border-top: 1px solid var(--sp-line);
                      border-bottom: 1px solid var(--sp-line)">
            <span class="sp-label sp-context" style="font-size: 10px">the host's own padding, no control here</span>
          </div>
          <div style="padding: 8px 12px 10px">
            <label class="sp-label sp-context" for="focus-delegation-input" style="font-size: 10px">Postcode</label>
            <input class="sp-input" id="focus-delegation-input" data-part="field" tabindex="0" placeholder="SW1A 2AA"
                   style="margin-top: 4px; height: 30px; font-size: 12px" />
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 8px; padding: 8px 10px">
          <span class="sp-label" style="font-size: 10px">After the press, where focus is</span>
          <p class="sp-text sp-text--ink" data-part="active" data-state="none"
             style="margin: 3px 0 0; height: 17px; line-height: 17px; font-size: 11.5px; white-space: nowrap">${ACTIVE.none}</p>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="on"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.on}</p>
      </div>
    </div>
  `;

  const pad = part(root, 'pad');
  const field = part(root, 'field');
  const active = part(root, 'active');
  const caption = part(root, 'caption');
  let mode: Mode = 'on';

  const report = (state: keyof typeof ACTIVE) => {
    active.dataset.state = state;
    active.textContent = ACTIVE[state];
  };

  // Real focus is never moved from here: the ring is the kit's simulated one (SPEC §7), so a
  // scripted press cannot hijack the keyboard of somebody scrolling past.
  pad.addEventListener('click', () => {
    const delegated = mode === 'on';
    flag(field, 'data-sim-focus', delegated);
    report(delegated ? 'inner' : 'nowhere');
  });

  const apply = (next: Mode) => {
    mode = next;
    flag(pad, 'data-delegated', next === 'on');
    flag(field, 'data-sim-focus', false);
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    report('none');
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('on');
}
