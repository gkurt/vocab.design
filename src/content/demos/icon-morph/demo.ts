import { flag, part } from '#src/kit/parts.ts';

/** Where each bar of the hamburger goes when the glyph becomes a cross. */
const MORPHED: Record<string, { transform: string; opacity: string }> = {
  'bar-top': { transform: 'translateY(5px) rotate(45deg)', opacity: '1' },
  'bar-mid': { transform: 'scaleX(0.1)', opacity: '0' },
  'bar-bot': { transform: 'translateY(-5px) rotate(-45deg)', opacity: '1' },
};

const BARS = Object.keys(MORPHED);

/** Declared on each bar so the move is a transition the kit's motion rules can drop. */
const BAR_STYLE = 'transform-box: fill-box; transform-origin: center; transition: transform 0.26s var(--sp-ease), opacity 0.18s linear';

const ROWS = ['Rent', 'Utilities', 'Groceries', 'Transit'];

/**
 * Icon morph specimen: the three bars of a hamburger travel to the middle and cross,
 * so one control shows the change instead of cutting between two drawings. The subject
 * is the glyph, not the button around it: the button would be an icon button either
 * way, and it is the artwork that carries the term.
 *
 * The move is a transition on inline transforms rather than a state rule, because a
 * demo has no stylesheet to put a state rule in, and a transition is something the kit
 * already answers for: reduced motion collapses every transition in the specimen, so
 * the glyph snaps between its two readings without the demo asking the question.
 *
 * The bars flip both ways under script, which is the one shape a toggle is right for
 * (SPEC §8): the flip is the term here, so the choreography drives both directions and
 * there is no state a resumed pass could read backwards.
 *
 * The panel lives inside the body, not the frame, so it slides in beneath the app bar
 * rather than over it. The kit drawer covers the frame's full height, which would put
 * it on top of the trigger: the glyph would be covered at the exact moment it performs,
 * and the control that has just promised "Close menu" would be unreachable to a reader
 * who takes the stage over.
 */
export function mount(root: HTMLElement): void {
  const bars = BARS.map(
    (name, index) => `<line data-part="${name}" x1="4" y1="${7 + index * 5}" x2="20" y2="${7 + index * 5}" style="${BAR_STYLE}" />`,
  ).join('');

  const rows = ROWS.map(
    (name) => `
      <li class="sp-list-item">
        <span class="sp-grow sp-text sp-text--ink">${name}</span>
        <span class="sp-text">paid</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 224px">
        <div class="sp-topbar">
          <button class="sp-icon-button" type="button" data-part="trigger" aria-expanded="false" aria-label="Open menu">
            <svg class="sp-icon" data-part="glyph" data-subject viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px">
              ${bars}
            </svg>
          </button>
          <span class="sp-heading sp-grow sp-context">Ledger</span>
        </div>
        <div class="sp-body sp-context" style="position: relative; padding: 0">
          <ul class="sp-list">${rows}</ul>
          <div class="sp-drawer sp-context" data-part="panel" aria-label="Sections">
            <span class="sp-label">Sections</span>
            <ul class="sp-nav">
              <li><span class="sp-nav-item" data-current>This month</span></li>
              <li><span class="sp-nav-item">Last month</span></li>
              <li><span class="sp-nav-item">Categories</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const trigger = part(root, 'trigger');
  const glyph = part(root, 'glyph');
  const panel = part(root, 'panel');

  const setOpen = (open: boolean) => {
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    flag(glyph, 'data-open', open);
    flag(panel, 'data-open', open);
    for (const [name, morph] of Object.entries(MORPHED)) {
      const bar = part(root, name);
      bar.style.transform = open ? morph.transform : 'none';
      bar.style.opacity = open ? morph.opacity : '1';
    }
  };

  trigger.addEventListener('click', () => setOpen(trigger.getAttribute('aria-expanded') !== 'true'));
}
