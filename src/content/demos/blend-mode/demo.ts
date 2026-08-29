import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The arithmetic each mode runs, stated in one clause so the strip is read, not guessed. */
const MODES: Record<string, string> = {
  normal: 'Normal: the top colour replaces the backdrop, and only alpha has any say.',
  multiply: 'Multiply: the channels are multiplied, so nothing gets lighter and white leaves the backdrop untouched.',
  screen: 'Screen: the inverses are multiplied, so nothing gets darker and black leaves the backdrop untouched.',
  overlay: 'Overlay: multiply where the backdrop is dark, screen where it is light, so the contrast under it grows.',
};

const START = 'multiply';

/**
 * Blend mode specimen: one warm disc laid over a cool disc and a gradient backdrop, with
 * the formula that combines them chosen as an absolute state. Every mode is a different
 * answer for the same two colours, so the overlap is where the term is legible.
 *
 * The subject is the disc that carries the mode, not the scene: `mix-blend-mode` is set
 * on one element, and the backdrop and the lower disc are what it is being blended with
 * rather than the thing being named. The caption strip takes the same mode to show the
 * formula running on type, and stays in the context register with the rest of the
 * scenery. The scene isolates itself, so the blend stops at its own edge instead of
 * reaching the page behind it. Everything is fixed size, so switching mode repaints and
 * moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 404px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Mode" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
            <button class="sp-segment" data-part="seg-multiply" value="multiply">multiply</button>
            <button class="sp-segment" data-part="seg-screen" value="screen">screen</button>
            <button class="sp-segment" data-part="seg-overlay" value="overlay">overlay</button>
          </sp-segmented>
        </div>

        <div data-part="scene" data-mode="${START}"
             style="position: relative; height: 148px; margin-top: 14px; border-radius: var(--sp-radius); overflow: hidden;
                    isolation: isolate; background: linear-gradient(115deg, #10203c 0%, #2f5c8f 46%, #d8dee7 100%)">
          <span data-part="under"
                style="position: absolute; left: 40px; top: 12px; width: 100px; height: 100px; border-radius: 50%; background: #29C2D6"></span>
          <span data-part="top" data-subject data-mode="${START}"
                style="position: absolute; left: 108px; top: 12px; width: 100px; height: 100px; border-radius: 50%;
                       background: #F2B23A; mix-blend-mode: ${START}"></span>
          <span class="sp-context" data-part="lockup"
                style="position: absolute; left: 16px; bottom: 10px; font-size: 20px; font-weight: 700; line-height: 1;
                       letter-spacing: 0.04em; color: #FFFFFF; mix-blend-mode: ${START}">OVERLAP</span>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; min-height: 40px">${MODES[START]}</p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const top = part(root, 'top');
  const lockup = part(root, 'lockup');
  const note = part(root, 'note');

  part(root, 'segmented').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail;
    scene.dataset.mode = mode;
    top.dataset.mode = mode;
    top.style.mixBlendMode = mode;
    lockup.style.mixBlendMode = mode;
    note.textContent = MODES[mode] ?? '';
  });
}
