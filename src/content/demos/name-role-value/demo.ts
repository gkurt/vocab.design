import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Each build knocks out one leg of the trio, and none of them changes a pixel. */
const BUILDS = {
  complete: { role: 'switch', named: true, exposesValue: true, verdict: 'All three exposed. This one passes.' },
  unnamed: { role: 'switch', named: false, exposesValue: true, verdict: 'No name: announced as “switch”. WCAG 4.1.2.' },
  roleless: { role: '', named: true, exposesValue: false, verdict: 'No role, no state: announced as a plain button.' },
} as const;

type Build = keyof typeof BUILDS;

const MISSING = '(none)';

/**
 * Name, role, value specimen: one switch, three ways of building it, and the readout of what
 * assistive technology gets in each case. The control is painted identically throughout and
 * answers a press identically, so the only thing the segmented control changes is what is
 * exposed. Pressing the switch shows the third leg doing its job: the state changes in the
 * readout as well as on screen, except in the build that never exposed one.
 *
 * The subject is the readout panel. The term does not name the switch, it names the three
 * facts a switch has to publish about itself, and the narrowest element that holds those
 * facts is the panel they are printed in. The control, the segmented control, and the
 * verdict line are scenery (SPEC §5).
 *
 * The readouts are computed from the control's own attributes rather than written out, so
 * the panel cannot claim a name the element does not have. Each value column holds a fixed
 * width from mount and every row keeps its height, so nothing moves as the strings change
 * (SPEC §5). Pressing reaches the on state rather than flipping whatever it found, and each
 * segment reaches its own build (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="complete" data-axis="Build">
            <button class="sp-segment" data-part="seg-complete" value="complete">Switch</button>
            <button class="sp-segment" data-part="seg-unnamed" value="unnamed">No label</button>
            <button class="sp-segment" data-part="seg-roleless" value="roleless">No role</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 12px; padding: 10px 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-text sp-text--ink" id="vd-nrv-label">Auto-save</span>
            <button class="sp-switch" type="button" data-part="control" role="switch" aria-checked="false"
                    aria-labelledby="vd-nrv-label"></button>
          </div>
        </div>

        <div class="sp-surface" data-part="panel" data-subject style="margin-top: 12px; padding: 10px 12px">
          <span class="sp-label">What assistive technology gets</span>
          <div class="sp-row sp-row--between" style="height: 20px; margin-top: 6px">
            <span class="sp-label">Name</span>
            <span class="sp-text sp-text--ink" data-part="name" data-state="named"
                  style="font-size: 12px; white-space: nowrap">“Auto-save”</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 20px">
            <span class="sp-label">Role</span>
            <span class="sp-text sp-text--ink" data-part="role" data-state="switch"
                  style="font-size: 12px; white-space: nowrap">switch</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 20px">
            <span class="sp-label">Value</span>
            <span class="sp-text sp-text--ink" data-part="value" data-state="off"
                  style="font-size: 12px; white-space: nowrap">off</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="verdict" data-case="complete"
           style="margin: 10px 0 0; height: 18px; font-size: 12px; white-space: nowrap">${BUILDS.complete.verdict}</p>
      </div>
    </div>
  `;

  const control = part(root, 'control');
  const name = part(root, 'name');
  const role = part(root, 'role');
  const value = part(root, 'value');
  const verdict = part(root, 'verdict');

  let build: Build = 'complete';
  let on = false;

  /** Read the three facts back off the element, the way the browser's own walk would. */
  const readout = () => {
    const labelled = control.getAttribute('aria-labelledby');
    const named = labelled ? (root.querySelector(`#${labelled}`)?.textContent ?? '') : control.textContent?.trim();
    name.dataset.state = named ? 'named' : 'missing';
    name.textContent = named ? `“${named}”` : MISSING;

    const exposed = control.getAttribute('role') ?? 'button';
    role.dataset.state = exposed;
    role.textContent = exposed;

    const checked = control.getAttribute('aria-checked');
    value.dataset.state = checked === null ? 'missing' : checked === 'true' ? 'on' : 'off';
    value.textContent = checked === null ? MISSING : checked === 'true' ? 'on' : 'off';
  };

  const apply = (next: Build) => {
    build = next;
    const spec = BUILDS[next];
    if (spec.role) control.setAttribute('role', spec.role);
    else control.removeAttribute('role');
    if (spec.named) control.setAttribute('aria-labelledby', 'vd-nrv-label');
    else control.removeAttribute('aria-labelledby');
    if (spec.exposesValue) control.setAttribute('aria-checked', String(on));
    else control.removeAttribute('aria-checked');
    verdict.dataset.case = next;
    verdict.textContent = spec.verdict;
    readout();
  };

  // The paint is the same in every build: `data-checked` is what the reader sees, and
  // `aria-checked` is the only thing that says so out loud.
  control.addEventListener('click', () => {
    on = true;
    flag(control, 'data-checked', true);
    if (BUILDS[build].exposesValue) control.setAttribute('aria-checked', 'true');
    readout();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Build);
  });
}
