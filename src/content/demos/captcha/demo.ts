import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the widget spends deciding, which is the only thing it actually does. */
const CHECKING_MS = 1200;

/** Nine painted squares. Nothing here is a photograph, and nothing is really scored. */
const TILES = [
  'linear-gradient(150deg, #6b7f9e, #cfd8e3)',
  'linear-gradient(20deg, #4f6f5a, #a9c2a0)',
  'linear-gradient(120deg, #8a6f52, #d8c3a1)',
  'linear-gradient(200deg, #3f5470, #8fa6bd)',
  'linear-gradient(60deg, #6d5a7a, #c3b0cd)',
  'linear-gradient(160deg, #7e6a4e, #cbbb95)',
  'linear-gradient(30deg, #405e6b, #9cb9c0)',
  'linear-gradient(140deg, #5f6f4a, #b6c48f)',
  'linear-gradient(80deg, #7a5f5f, #cfa9a9)',
];

const dot = (index: number) => `
  <span
    class="sp-pulse"
    style="width: 4px; height: 4px; border-radius: 50%; background: var(--sp-accent); animation-delay: -${(index * 0.6).toFixed(1)}s"
  ></span>`;

const brand = `
  <span class="sp-stack" style="flex: 0 0 auto; gap: 2px; align-items: center">
    <span style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px;
                 border-radius: 6px; background: var(--sp-accent-soft); color: var(--sp-accent)">${icon('check')}</span>
    <span style="font-size: 9px; color: var(--sp-muted)">Human check</span>
  </span>`;

const CHECKBOX_BODY = `
  <div class="sp-row" style="gap: 12px; padding: 14px">
    <span style="position: relative; flex: 0 0 auto; width: 20px; height: 20px">
      <button
        class="sp-checkbox"
        type="button"
        role="checkbox"
        aria-checked="false"
        aria-label="I am not a robot"
        data-part="check"
        style="position: absolute; left: 2px; top: 2px"
      ></button>
      <span class="sp-row" data-part="spin" hidden style="position: absolute; inset: 0; gap: 3px; justify-content: center"
        >${dot(0)}${dot(1)}${dot(2)}</span
      >
    </span>
    <span class="sp-text sp-text--ink sp-grow" data-part="status">I am not a robot</span>
    ${brand}
  </div>`;

const GRID_BODY = `
  <div style="padding: 8px 10px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 12px">
    Select every square with a <strong>bridge</strong>
  </div>
  <div class="sp-grid" data-part="tiles" style="grid-template-columns: repeat(3, 1fr); gap: 4px; padding: 4px">
    ${TILES.map(
      (paint, index) => `
      <button
        type="button"
        data-part="tile-${index}"
        aria-pressed="false"
        aria-label="Square ${index + 1}"
        style="height: 32px; padding: 0; border: 0; border-radius: 3px; background-image: ${paint}; cursor: pointer"
      ></button>`,
    ).join('')}
  </div>
  <div class="sp-row sp-row--between" style="padding: 5px 10px; border-top: 1px solid var(--sp-line)">
    <span class="sp-label" data-part="status">Nine squares, none of them real</span>
    <button class="sp-button sp-button--sm" type="button" data-part="verify">Verify</button>
  </div>`;

const BODY = { checkbox: CHECKBOX_BODY, grid: GRID_BODY } as const;

type Mode = keyof typeof BODY;

/**
 * CAPTCHA specimen: the widget a form puts in front of you, simulated honestly. The
 * checkbox version ticks, sits on the clock pretending to weigh evidence, and reports
 * a verdict; the segmented control swaps in the image grid version of the same gate.
 * Nothing is scored, no request is made, and the footer says so.
 *
 * The subject is the widget, not the form around it: the term names the challenge, and
 * the sign-up step it is guarding is the scene. Both modes are the term, so no pose
 * condition is needed; the widget keeps one element and swaps its body, which is what
 * keeps a single `data-subject` across the switch.
 *
 * The two versions are different heights, so the widget sits at the top of a slot tall
 * enough for the larger one and the footer never moves (SPEC §5). A tile click always
 * selects rather than toggling, so a script resumed anywhere reaches the same state
 * (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 310px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Create account</span>
          <span class="sp-label">Step 2 of 2</span>
        </div>
        <div class="sp-body">
          <div data-part="slot" style="position: relative; height: 100%">
            <div
              data-part="widget"
              data-subject
              data-mode="checkbox"
              data-state="idle"
              style="position: absolute; left: 50%; top: 0; translate: -50% 0; width: 300px; overflow: hidden;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >${CHECKBOX_BODY}</div>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 8px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-text" style="font-size: 11px">Simulated. Nothing is really tested.</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="checkbox" data-axis="Challenge">
            <button class="sp-segment" data-part="mode-checkbox" value="checkbox">Checkbox</button>
            <button class="sp-segment" data-part="mode-grid" value="grid">Image grid</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;

  const widget = part(root, 'widget');
  let timer: number | undefined;

  const wireCheckbox = () => {
    const check = part(widget, 'check');
    const spin = part(widget, 'spin');
    const status = part(widget, 'status');

    const verified = () => {
      widget.dataset.state = 'verified';
      spin.hidden = true;
      check.hidden = false;
      check.setAttribute('aria-checked', 'true');
      status.textContent = 'Verified';
    };

    // Always a check from nothing, whenever in a run the press arrives.
    check.addEventListener('click', () => {
      clock.clearTimeout(timer);
      widget.dataset.state = 'checking';
      check.hidden = true;
      spin.hidden = false;
      status.textContent = 'Checking your browser';
      timer = clock.setTimeout(verified, CHECKING_MS);
    });
  };

  const wireGrid = () => {
    const status = part(widget, 'status');
    const verify = part(widget, 'verify');

    for (const tile of [...part(widget, 'tiles').children] as HTMLElement[]) {
      tile.addEventListener('click', () => {
        tile.setAttribute('data-selected', '');
        tile.setAttribute('aria-pressed', 'true');
        tile.style.boxShadow = 'inset 0 0 0 3px var(--sp-accent)';
      });
    }

    verify.addEventListener('click', () => {
      widget.dataset.state = 'verified';
      status.textContent = 'Verified';
      verify.setAttribute('aria-disabled', 'true');
    });
  };

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'grid' ? 'grid' : 'checkbox';
    clock.clearTimeout(timer);
    widget.dataset.mode = next;
    widget.dataset.state = 'idle';
    widget.innerHTML = BODY[next];
    if (next === 'grid') wireGrid();
    else wireCheckbox();
  });

  wireCheckbox();
}
