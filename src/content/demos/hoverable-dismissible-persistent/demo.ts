import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Mode = 'compliant' | 'timed' | 'gap';

/** How long the self-closing variant leaves the panel up before taking it away. */
const AUTO_MS = 1400;

/** Where the panel's top edge sits under the trigger. Flush is the hover bridge. */
const TOP = { compliant: 44, timed: 44, gap: 54 } as const;

const MET: Record<Mode, { hoverable: string; dismissible: string; persistent: string }> = {
  compliant: { hoverable: 'yes', dismissible: 'yes', persistent: 'yes' },
  timed: { hoverable: 'yes', dismissible: 'yes', persistent: 'no' },
  gap: { hoverable: 'no', dismissible: 'yes', persistent: 'yes' },
};

const CAPTION: Record<Mode, string> = {
  compliant:
    'The panel sits flush under its trigger, so the pointer can travel onto it and read the clause, and Escape takes it away without the pointer moving at all.',
  timed:
    'The panel leaves on its own after a beat and a half. At four times magnification, finding it and reading it takes longer than that, every time.',
  gap: 'Ten pixels of nothing between the trigger and the panel. The pointer leaves the trigger, the panel goes, and the button inside it can never be pressed.',
};

const CLOSED_BY = { none: 'nothing yet', left: 'the pointer leaving', timer: 'its own timer', escape: 'Escape' } as const;

const CONDITIONS = [
  { name: 'hoverable', label: 'Hoverable' },
  { name: 'dismissible', label: 'Dismissible' },
  { name: 'persistent', label: 'Persistent' },
] as const;

/**
 * Hoverable, dismissible, persistent specimen: a glossary term whose flyout is built three
 * ways. The compliant panel is anchored flush under its trigger so the pointer can reach it,
 * stays until something asks it to go, and answers Escape. The other two fail one condition
 * each, a timer that takes the panel away and a gap the pointer cannot cross.
 *
 * The subject is the flyout, since the three conditions are conditions on the revealed
 * content rather than on the word that reveals it. The picker, the glossary row, the
 * condition readout and the caption are scenery (SPEC §5). Both failing variants are states
 * the panel itself passes through, so the honest condition is declared in `data-pose` and
 * the mount state satisfies it (SPEC §6); identify summons the panel, which is closed at rest.
 *
 * Hover is tracked from one bubbling `pointerover` listener on the root rather than from
 * enter and leave on each surface: enter and leave do not bubble, so the panel would never
 * hear the pointer arrive on the button inside it. One listener answers a real pointer and
 * the ghost cursor identically, and it is what makes the gap variant fail honestly, since
 * the pointer's next landing is simply not the trigger any more.
 *
 * Nothing here is ever clicked: hovering the word is the whole interaction, so the trigger
 * carries `data-hover-driven` and a reader's dwell on it takes the stage over (SPEC §7).
 * Whether the pointer can cross to the panel, and whether the panel is still there when it
 * arrives, are claims only a reader's own pointer can settle, never a spectator's view of
 * the ghost's.
 *
 * The self-closing timer comes from the DemoClock, so a pose can stop it mid-inspection.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const condition = (name: string, label: string) => `
    <span class="sp-label" style="font-size: 10.5px; flex: 0 0 auto">${label}
      <span data-part="cond-${name}" data-met="yes"
            style="display: inline-block; width: 22px; color: var(--sp-ink); font-weight: 500">yes</span>
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Flyout</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="compliant" data-axis="Behaviour" data-term="compliant">
            <button class="sp-segment" type="button" data-part="seg-compliant" value="compliant"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">All three</button>
            <button class="sp-segment" type="button" data-part="seg-timed" value="timed"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Self-closing</button>
            <button class="sp-segment" type="button" data-part="seg-gap" value="gap"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Gap</button>
          </sp-segmented>
        </div>

        <div data-part="scene" style="position: relative; margin-top: 10px; height: 132px">
          <span class="sp-heading sp-context" style="font-size: 12.5px">Motor policy</span>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 18px; gap: 10px">
            <span data-part="trigger" data-closed="none" data-hover-driven
                  style="flex: 0 0 auto; font-size: 12.5px; cursor: help; border-bottom: 2px dotted var(--sp-muted)">Excess</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12.5px">350</span>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 6px; height: 18px; gap: 10px">
            <span class="sp-text" style="flex: 0 0 auto; font-size: 12.5px">Cover level</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12.5px">Comprehensive</span>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 6px; height: 18px; gap: 10px">
            <span class="sp-text" style="flex: 0 0 auto; font-size: 12.5px">Renewal</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12.5px">4 April</span>
          </div>

          <div class="sp-popover" data-part="flyout" data-subject data-mode="compliant" data-pose="[data-mode=compliant]"
               role="tooltip" style="left: 0; top: ${TOP.compliant}px; width: 288px; --sp-arrow-x: 14px; padding: 10px">
            <p class="sp-text sp-text--ink" style="margin: 0; font-size: 11.5px; line-height: 1.35; height: 32px">
              The first part of any claim that you pay yourself, before the insurer pays anything.
            </p>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="flyout-link"
                    style="margin-top: 8px; font-size: 11px; padding: 4px 9px">Read the clause</button>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 20px; gap: 10px">
          <div class="sp-row" style="gap: 12px; flex: 0 0 auto">
            ${CONDITIONS.map((item) => condition(item.name, item.label)).join('')}
          </div>
          <span class="sp-text sp-text--ink" data-part="closed" data-by="none"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">Closed by ${CLOSED_BY.none}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="compliant"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.compliant}</p>
      </div>
    </div>
  `;

  const flyout = part(root, 'flyout');
  const trigger = part(root, 'trigger');
  const closed = part(root, 'closed');
  const caption = part(root, 'caption');

  let mode: Mode = 'compliant';
  let timer: number | undefined;

  const shut = (by: keyof typeof CLOSED_BY) => {
    clock.clearTimeout(timer);
    if (!flyout.hasAttribute('data-open')) return;
    flag(flyout, 'data-open', false);
    trigger.dataset.closed = by;
    closed.dataset.by = by;
    closed.textContent = `Closed by ${CLOSED_BY[by]}`;
  };

  const reveal = () => {
    if (flyout.hasAttribute('data-open')) return;
    flag(flyout, 'data-open', true);
    trigger.dataset.closed = 'none';
    closed.dataset.by = 'none';
    closed.textContent = `Closed by ${CLOSED_BY.none}`;
    if (mode === 'timed') timer = clock.setTimeout(() => shut('timer'), AUTO_MS);
  };

  const apply = (next: Mode) => {
    mode = next;
    clock.clearTimeout(timer);
    flag(flyout, 'data-open', false);
    flyout.dataset.mode = next;
    flyout.style.top = `${TOP[next]}px`;
    trigger.dataset.closed = 'none';
    closed.dataset.by = 'none';
    closed.textContent = `Closed by ${CLOSED_BY.none}`;
    for (const item of CONDITIONS) {
      const cell = part(root, `cond-${item.name}`);
      cell.dataset.met = MET[next][item.name];
      cell.textContent = MET[next][item.name];
    }
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
  };

  // One bubbling listener, because enter and leave do not bubble: wherever the pointer
  // lands, this is where it is now, and the panel's fate follows from that alone.
  root.addEventListener('pointerover', (event) => {
    const at = event.target as Node;
    if (trigger.contains(at)) return reveal();
    if (flyout.contains(at) && mode !== 'gap') return;
    shut('left');
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') shut('escape');
  });

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('compliant');
}
