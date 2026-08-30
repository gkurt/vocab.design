import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The card holds one physical box in every mode, so only what is inside it turns. */
const CARD_W = 214;
const CARD_H = 150;
/** The accent edge is drawn at 4px: the stage reads anything thinner as absent. */
const EDGE = 4;

interface Mode {
  key: string;
  label: string;
  /** What the mode does to the card, written as the two properties that decide flow. */
  css: string;
  /** The physical edges the logical declarations resolve to, in this mode. */
  resolved: [string, string, string];
}

const MODES: Mode[] = [
  { key: 'ltr', label: 'left to right', css: 'direction: ltr', resolved: ['border-left', 'padding-left', 'left to right'] },
  { key: 'rtl', label: 'right to left', css: 'direction: rtl', resolved: ['border-right', 'padding-right', 'right to left'] },
  { key: 'vertical', label: 'vertical', css: 'writing-mode: vertical-rl', resolved: ['border-top', 'padding-top', 'top to bottom'] },
];

/** The three declarations the card is written with, and what each one is asking for. */
const LOGICAL = ['border-inline-start', 'padding-inline-start', 'inline axis'];

const segment = (mode: Mode) => `
  <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 9px; font-size: 11px">
    ${mode.label}
  </button>`;

const mapping = (index: number) => `
  <div class="sp-surface" data-part="map-${index}" style="display: flex; flex-direction: column; gap: 2px; padding: 6px 8px; min-width: 0">
    <span class="sp-label" style="font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${LOGICAL[index] ?? ''}</span>
    <span class="sp-heading" data-part="resolved-${index}" style="font-size: 12px; white-space: nowrap"></span>
  </div>`;

/**
 * Logical properties specimen: one card whose edges are written along its own axes, rendered in
 * three writing modes, with the physical edge each declaration resolves to printed beneath it.
 *
 * The subject is the card, since the term names the way that box states its own spacing (SPEC §5).
 * Every mode is honestly the term, so no `data-pose` condition is needed. The picker, the
 * declaration block and the mapping strip are scenery in the context register.
 *
 * The card keeps one physical box in all three modes, so the accent edge and the padding travel
 * around inside it and nothing outside it moves (SPEC §5). The card's own row is a flex row, which
 * is flow relative too, so the avatar and the badge change ends without a single physical value
 * being written. Each segment names the mode it produces rather than cycling (SPEC §8).
 *
 * The title bar read "One declaration, three flows", which was the point of the term rather
 * than the name of anything the tool does. It says "Card preview" now; the article makes the
 * point at length. The declaration block was headed "Written once", which is the same claim
 * moved down a panel, so it is headed with what the block holds instead.
 */
export function mount(root: HTMLElement): void {
  const first = MODES[0] as Mode;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Card preview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-value="${first.key}" data-axis="Flow">
            ${MODES.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; gap: 14px; flex: 0 0 auto; height: ${CARD_H}px">
            <div
              data-part="card"
              data-subject
              data-mode="${first.key}"
              style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; width: ${CARD_W}px; height: ${CARD_H}px;
                     padding-inline: 20px 10px; padding-block: 14px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-inline-start: ${EDGE}px solid var(--sp-accent);
                     border-radius: var(--sp-radius); direction: ltr"
            >
              <span class="sp-avatar" data-part="lead" style="width: 26px; height: 26px">HS</span>
              <span class="sp-heading" data-part="title" style="font-size: 13px">Card</span>
              <span class="sp-chip" data-part="badge" style="margin-inline-start: auto; padding: 2px 8px; font-size: 11px">3</span>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 4px">
              <span class="sp-label">CSS</span>
              <span
                class="sp-surface"
                style="padding: 8px 10px; font-family: ui-monospace, monospace; font-size: 11px; line-height: 1.7; color: var(--sp-ink)"
              >
                border-inline-start: ${EDGE}px;<br />
                padding-inline: 20px 10px;<br />
                margin-inline-start: auto;
              </span>
              <span class="sp-label" style="margin-top: 6px">Mode</span>
              <span
                class="sp-text sp-text--ink"
                data-part="mode-css"
                style="font-family: ui-monospace, monospace; font-size: 11px; height: 18px"
              ></span>
            </div>
          </div>

          <div class="sp-grid sp-context" data-part="mapping" style="flex: 0 0 auto; grid-template-columns: repeat(3, 1fr)">
            ${[0, 1, 2].map(mapping).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const modeCss = part(root, 'mode-css');
  const resolved = [0, 1, 2].map((index) => part(root, `resolved-${index}`));

  const apply = (key: string) => {
    const mode = MODES.find((entry) => entry.key === key);
    if (!mode) return;
    card.dataset.mode = mode.key;
    card.style.direction = mode.key === 'rtl' ? 'rtl' : 'ltr';
    card.style.writingMode = mode.key === 'vertical' ? 'vertical-rl' : 'horizontal-tb';
    modeCss.textContent = mode.css;
    for (const [index, out] of resolved.entries()) out.textContent = mode.resolved[index] ?? '';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply(first.key);
}
