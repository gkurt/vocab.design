import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The four settings this specimen offers, and what each role measures at them.
 * Written as a table rather than as one multiplier, because that is how the
 * platforms ship it: an app names a role and is handed a size, and the steps are
 * not a straight scaling of each other at the accessibility end.
 */
const STEPS: Record<string, { title: number; body: number; meta: number; gap: number; name: string; stack: boolean }> = {
  s: { title: 13, body: 11, meta: 10, gap: 12, name: 'small', stack: false },
  m: { title: 16, body: 13, meta: 11, gap: 12, name: 'default', stack: false },
  l: { title: 19, body: 16, meta: 13, gap: 12, name: 'large', stack: false },
  xl: { title: 23, body: 20, meta: 16, gap: 2, name: 'accessibility XL', stack: true },
};

/** Room for the accessibility setting, held at every smaller one, so nothing below moves (SPEC §5). */
const SCREEN = 144;

/**
 * Dynamic Type specimen: one notification, redrawn at four system text sizes.
 * Every role moves together, and at the accessibility step the title and its
 * timestamp stop sharing a line and stack instead. Nothing is clipped and
 * nothing is cut short at the largest setting, which is the whole accessibility
 * claim: the reader's size is honoured or it is not.
 *
 * The subject is the text block, not the card around it. The term names the text
 * that answers the setting, and the card, the picker, the readout and the caption
 * are the demo's own instrumentation (SPEC §5). Growth is the term here, so it is
 * contained: the card holds the room the largest setting needs at every setting,
 * and the readout and caption under it never move.
 */
export function mount(root: HTMLElement): void {
  const segments = Object.entries(STEPS)
    .map(([key]) => `<button class="sp-segment" data-part="seg-${key}" value="${key}">${key.toUpperCase()}</button>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Text size" data-value="m">${segments}</sp-segmented>
        </div>
        <div class="sp-surface" data-part="screen" style="height: ${SCREEN}px; padding: 12px; margin-top: 8px">
          <div class="sp-stack" data-part="notice" data-subject data-step="m" style="gap: 6px">
            <div data-part="head" data-flow="row"
                 style="display: flex; gap: 12px; align-items: baseline; justify-content: space-between">
              <span data-part="title" style="font-weight: 600; line-height: 1.25">Storage almost full</span>
              <span data-part="time" style="color: var(--sp-muted); line-height: 1.4; white-space: nowrap">2m ago</span>
            </div>
            <p data-part="body" style="margin: 0; line-height: 1.35">Backup needs more room before it can finish.</p>
          </div>
        </div>
        <div class="sp-row sp-context" data-part="readout" style="gap: 6px; height: 18px; margin-top: 6px">
          <span class="sp-label">reader's setting</span>
          <span class="sp-label" data-part="numbers" style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 4px">
          The app asks for a role, never a number. At the accessibility step the timestamp leaves the
          title's line rather than shortening it.
        </p>
      </div>
    </div>
  `;

  const notice = part(root, 'notice');
  const head = part(root, 'head');
  const title = part(root, 'title');
  const time = part(root, 'time');
  const body = part(root, 'body');
  const numbers = part(root, 'numbers');

  const apply = (key: string) => {
    const step = STEPS[key];
    if (!step) return;
    notice.dataset.step = key;
    title.style.fontSize = `${step.title}px`;
    time.style.fontSize = `${step.meta}px`;
    body.style.fontSize = `${step.body}px`;
    head.style.gap = `${step.gap}px`;
    head.style.flexDirection = step.stack ? 'column' : 'row';
    head.style.alignItems = step.stack ? 'flex-start' : 'baseline';
    head.dataset.flow = step.stack ? 'stack' : 'row';
    numbers.textContent = `${step.name}, body ${step.body}px, title ${step.title}px`;
  };

  apply('m');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
