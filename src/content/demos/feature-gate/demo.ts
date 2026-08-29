import { flag, part } from '#src/kit/parts.ts';

const NOTE = {
  closed: 'The row keeps its label and its place in the list, and says which plan it is on.',
  open: 'Selecting it names the plan and the benefit. Not now closes it and nothing else changes.',
} as const;

/** A padlock, drawn here because the kit's icon set has none and the kit is closed. */
const LOCK = `
  <span data-part="lock" style="position: relative; display: inline-block; flex: 0 0 auto; width: 12px; height: 14px; color: var(--sp-muted)">
    <span style="position: absolute; left: 2px; top: 0; width: 8px; height: 8px; border: 2px solid currentcolor; border-bottom: 0; border-radius: 4px 4px 0 0"></span>
    <span style="position: absolute; left: 0; bottom: 0; width: 12px; height: 8px; border-radius: 2px; background: currentcolor"></span>
  </span>`;

const row = (label: string, detail: string, checked: boolean) => `
  <div class="sp-surface sp-context sp-row" style="gap: 10px; height: 40px; padding: 0 10px">
    <span class="sp-grow" style="min-width: 0">
      <span class="sp-text sp-text--ink" style="display: block; font-size: 12px">${label}</span>
      <span class="sp-label" style="display: block; font-size: 10px">${detail}</span>
    </span>
    <button class="sp-switch" type="button" role="switch" aria-checked="${checked}" aria-label="${label}"></button>
  </div>`;

/**
 * Feature gate specimen: a settings list where two rows work and the third is on a plan
 * this account is not on. The gated row keeps its label, its detail line, and its place
 * between the other two, and says which plan it belongs to instead of disappearing.
 *
 * The subject is the gated row, the narrowest element the term names. The working rows
 * around it, the upgrade panel it opens, and the note under the frame are scenery
 * (SPEC §5): the panel is what the gate says, not what the gate is. No `data-pose`, and
 * no locked-away variant: hiding the feature is the failure this term is defined
 * against, and building it would be a picture of the wrong word.
 *
 * The panel is a popover over the pane, so explaining the price never moves the list
 * (SPEC §5). The row opens it and Not now closes it: two controls, two directions,
 * never one toggle (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Workspace settings</span>
          <span class="sp-label" style="font-size: 11px">Studio plan</span>
        </div>
        <div class="sp-body sp-stack" style="position: relative; gap: 8px">

          ${row('Weekly digest email', 'Every Monday, to the whole workspace', true)}

          <button
            class="sp-surface sp-row"
            data-part="gate"
            data-subject
            data-open="false"
            type="button"
            style="appearance: none; width: 100%; gap: 10px; height: 40px; padding: 0 10px; font: inherit; text-align: left; cursor: pointer"
          >
            <span class="sp-grow" style="min-width: 0">
              <span class="sp-text sp-text--ink" style="display: block; font-size: 12px">Custom domain</span>
              <span class="sp-label" style="display: block; font-size: 10px">Point a domain you own at this workspace</span>
            </span>
            <span class="sp-chip" data-part="plan-badge" style="padding: 2px 8px; font-size: 11px; cursor: pointer">Team plan</span>
            ${LOCK}
          </button>

          ${row('Two-factor authentication', 'Required for everyone in the workspace', false)}

          <div
            class="sp-popover sp-context"
            data-part="panel"
            role="dialog"
            aria-label="Custom domain is on the Team plan"
            style="left: 96px; top: 98px; width: 250px; --sp-arrow-x: 120px; box-shadow: 0 4px 16px rgb(16 24 40 / 0.14)"
          >
            <span class="sp-heading" data-part="panel-title" style="display: block; font-size: 13px">On the Team plan</span>
            <span class="sp-text" style="display: block; margin-top: 4px; font-size: 11px">
              Serve this workspace from a domain you own. Nothing else on this page changes.
            </span>
            <div class="sp-row" style="margin-top: 10px; gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm sp-grow" data-part="not-now" type="button">Not now</button>
              <button class="sp-button sp-button--sm sp-grow" data-part="see-plans" type="button">See plans</button>
            </div>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 420px; font-size: 11px">${NOTE.closed}</span>
      
    </div>
  `;

  const gate = part(root, 'gate');
  const panel = part(root, 'panel');
  const note = part(root, 'note');

  const show = (open: boolean) => {
    gate.dataset.open = String(open);
    flag(panel, 'data-open', open);
    note.textContent = open ? NOTE.open : NOTE.closed;
  };

  // The row opens the panel; it never closes it, so a second press cannot land the
  // specimen in the state the script did not ask for (SPEC §8).
  gate.addEventListener('click', () => show(true));
  part(root, 'not-now').addEventListener('click', () => show(false));

  show(false);
}
