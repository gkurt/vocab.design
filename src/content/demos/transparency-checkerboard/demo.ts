import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The convention itself, spelled out once: white paper, one light neutral, and a small
 * lattice. These are the values every editor lands within a shade of, and the cell size
 * is a tool's "medium" grid rather than anything the file knows about.
 */
const CELL = '18px';
const CHECK = '#d9dee7';
const PAPER = '#ffffff';

/** The page the asset is actually headed for, so the transparent regions can be proved empty. */
const PAGE = '#20586b';

/** One brand colour for the artwork, opaque everywhere it exists. */
const MARK = '#e24a2e';

const NOTES: Record<string, string> = {
  checker: `The grid is the tool talking, not the file. It fills the space where the export has no pixels, so the
    surround and the hole through the ring read as empty rather than as white.`,
  white: `The same file with white behind it. Nothing in the image changed, but empty and white now look identical,
    and the canvas can no longer answer which one this is.`,
  page: `The file where it will ship. The page shows through exactly the regions the grid was marking, which is
    what the grid was promising: those pixels have no colour of their own.`,
};

/**
 * Transparency checkerboard specimen: one exported mark with genuinely transparent regions,
 * over the three things a tool can put behind it. The checker states the emptiness, plain
 * white hides it (is that paint, or nothing?), and the destination page settles it.
 *
 * The subject is the checker backing, a real drawn element, not the artwork on top of it and
 * not the canvas that holds all three backings. The term names the grid.
 *
 * The backings switch by presence rather than by fading. A fade would leave the subject
 * mid-flight when identify interrupts a pass, and a cut is also what a tool's own
 * "show transparency grid" toggle does. All three are absolutely positioned inside a fixed
 * canvas and the note box is a fixed height, so nothing moves as the pick changes (SPEC §5).
 * No timers, so `mount` takes no clock.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="height: 31px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Behind the artwork" data-part="segmented" data-value="checker">
            <button class="sp-segment" data-part="seg-checker" value="checker">Checker</button>
            <button class="sp-segment" data-part="seg-white" value="white">White</button>
            <button class="sp-segment" data-part="seg-page" value="page">Page</button>
          </sp-segmented>
        </div>

        <div data-part="canvas" data-backing="checker"
             style="position: relative; height: 150px; margin-top: 10px; border-radius: 3px; overflow: hidden;
                    box-shadow: 0 0 0 1px var(--sp-line)">
          <span data-part="page" hidden style="position: absolute; inset: 0; background: ${PAGE}"></span>
          <span data-part="plain" hidden style="position: absolute; inset: 0; background: ${PAPER}"></span>
          <span data-part="checker" data-subject
                style="position: absolute; inset: 0; background-color: ${PAPER};
                       background-image: conic-gradient(${CHECK} 0deg 90deg, transparent 90deg 180deg,
                         ${CHECK} 180deg 270deg, transparent 270deg 360deg);
                       background-size: ${CELL} ${CELL}"></span>

          <span class="sp-context" data-part="art" aria-hidden="true"
                style="position: absolute; left: 50%; top: 50%; translate: -50% -50%; display: flex;
                       align-items: center; gap: 15px; filter: drop-shadow(0 3px 5px rgb(31 41 51 / 0.32))">
            <span data-part="ring" style="width: 68px; height: 68px; border-radius: 50%; border: 16px solid ${MARK}"></span>
            <span style="font-size: 27px; font-weight: 700; letter-spacing: 0.07em; line-height: 1; color: ${MARK}">ORBIT</span>
          </span>
        </div>

        <p class="sp-text sp-context" data-part="note"
           style="margin: 10px 0 0; height: 44px; font-size: 10px; line-height: 1.4">${NOTES.checker}</p>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const note = part(root, 'note');
  const backings: Record<string, HTMLElement> = {
    checker: part(root, 'checker'),
    white: part(root, 'plain'),
    page: part(root, 'page'),
  };

  const apply = (mode: string) => {
    canvas.dataset.backing = mode;
    for (const [key, el] of Object.entries(backings)) el.hidden = key !== mode;
    note.textContent = NOTES[mode] ?? NOTES.checker ?? '';
  };
  apply('checker');

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
