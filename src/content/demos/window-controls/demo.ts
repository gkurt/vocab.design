import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** No square in the kit's icon set and the kit is frozen, so the maximise glyph is drawn
    against `.sp-icon`, which carries the stroke and the size every other glyph uses. */
const SQUARE = '<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="6.5" width="11" height="11" rx="1.5"/></svg>';

const disc = (name: string, act: string, label: string, fill: string) => `
  <button
    type="button"
    data-part="${name}"
    data-act="${act}"
    data-aim
    aria-label="${label}"
    style="width: 13px; height: 13px; padding: 0; border: 0; border-radius: 50%; background: ${fill};
           box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.16); cursor: pointer"
  ></button>`;

const glyph = (name: string, act: string, label: string, mark: string) => `
  <button
    class="sp-icon-button"
    type="button"
    data-part="${name}"
    data-act="${act}"
    data-aim
    aria-label="${label}"
    style="width: 30px; height: 24px; border-radius: 4px"
  >${mark}</button>`;

/** Close is outermost on both platforms; the reversible pair sits inboard. */
const CLUSTERS: Record<string, string> = {
  macos: [
    disc('btn-close', 'close', 'Close', '#ff5f57'),
    disc('btn-min', 'minimise', 'Minimise', '#febc2e'),
    disc('btn-zoom', 'zoom', 'Zoom', '#28c840'),
  ].join(''),
  windows: [
    glyph('btn-min', 'minimise', 'Minimise', icon('minus')),
    glyph('btn-zoom', 'maximise', 'Maximise', SQUARE),
    glyph('btn-close', 'close', 'Close', icon('close')),
  ].join(''),
};

const RESTING: Record<string, string> = {
  macos: 'macOS: three discs at the left, close outermost.',
  windows: 'Windows: three glyphs at the right, close outermost.',
};

const EFFECT: Record<string, string> = {
  close: 'Close quits the window, so it sits at the outer edge.',
  minimise: 'Minimise puts the window out of the way, not away.',
  zoom: 'Zoom fits the window to what is in it.',
  maximise: 'Maximise fills the screen with the window.',
};

/**
 * Window controls specimen: one document window drawn at both conventional placements. The
 * picker moves the same cluster from the left of the title bar (macOS discs) to the right
 * (Windows glyphs), and pressing a control names what it does.
 *
 * The subject is the cluster of three buttons, not the title bar that carries it and not
 * either button alone: the term names the group. It is honestly a window control cluster
 * at both placements, so no `data-pose` condition is needed. The title, the document
 * behind it, the picker and the readout line are scenery.
 *
 * Pressing a control reports its effect rather than performing it, because a specimen may
 * not reach past the stage (SPEC §5): a demo that really closed its window would leave
 * nothing to look at. Both title bar slots are the same fixed width and the cluster keeps
 * its height, so moving it across the bar moves nothing else (SPEC §5), and the picker
 * names an absolute platform rather than flipping whatever it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 452px; height: 210px; box-shadow: var(--sp-shadow)">
        <div class="sp-topbar" data-part="titlebar" style="height: 34px; padding: 0 8px; gap: 8px">
          <div data-part="slot-left" style="display: flex; align-items: center; justify-content: flex-start; flex: 0 0 auto; width: 96px; height: 24px">
            <div data-part="cluster" data-subject data-platform="macos" data-side="left" style="display: flex; align-items: center; gap: 8px; height: 24px">
              ${CLUSTERS.macos}
            </div>
          </div>
          <span
            class="sp-context"
            data-part="title"
            style="flex: 1 1 auto; min-width: 0; font-size: 12px; font-weight: 500; text-align: center; white-space: nowrap; overflow: hidden"
          >Quarterly report.pdf</span>
          <div data-part="slot-right" style="display: flex; align-items: center; justify-content: flex-end; flex: 0 0 auto; width: 96px; height: 24px"></div>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 9px; padding: 16px 18px">
          <span class="sp-heading" style="font-size: 13px">Quarter in review</span>
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 96%"></div>
          <div class="sp-line" style="width: 64%"></div>
        </div>
      </div>

      <div class="sp-row sp-context" style="width: 452px; gap: 12px">
        <sp-segmented class="sp-segmented" data-axis="Platform" data-part="picker" data-value="macos">
          <button class="sp-segment" type="button" data-part="seg-macos" value="macos" style="padding: 4px 10px; font-size: 12px">macOS</button>
          <button class="sp-segment" type="button" data-part="seg-windows" value="windows" style="padding: 4px 10px; font-size: 12px">Windows</button>
        </sp-segmented>
        <span
          class="sp-label sp-grow"
          data-part="action"
          data-act="none"
          role="status"
          style="height: 16px; font-size: 11px; line-height: 16px; text-align: right; white-space: nowrap; overflow: hidden"
        >${RESTING.macos}</span>
      </div>
    </div>
  `;

  const cluster = part(root, 'cluster');
  const title = part(root, 'title');
  const action = part(root, 'action');

  const say = (act: string) => {
    const platform = cluster.dataset.platform ?? 'macos';
    action.dataset.act = act;
    action.textContent = (act === 'none' ? RESTING[platform] : EFFECT[act]) ?? '';
  };

  const setPlatform = (platform: string) => {
    const mac = platform !== 'windows';
    cluster.innerHTML = (mac ? CLUSTERS.macos : CLUSTERS.windows) ?? '';
    cluster.dataset.platform = mac ? 'macos' : 'windows';
    cluster.dataset.side = mac ? 'left' : 'right';
    // Discs are spaced, caption buttons are flush: the Windows cluster is one strip.
    cluster.style.gap = mac ? '8px' : '0';
    part(root, mac ? 'slot-left' : 'slot-right').append(cluster);
    // The bar keeps its height and the window below it never moves. The title does move,
    // because that is part of the same convention: macOS centres it over the discs,
    // Windows sets it flush left with the glyphs at the far end.
    part(root, 'slot-left').style.width = mac ? '96px' : '0px';
    title.style.textAlign = mac ? 'center' : 'left';
    say('none');
  };

  // Delegated, because the cluster is rebuilt whenever the platform changes.
  cluster.addEventListener('click', (event) => {
    const pressed = (event.target as Element | null)?.closest('[data-act]');
    if (!(pressed instanceof HTMLElement)) return;
    say(pressed.dataset.act ?? 'none');
  });

  part(root, 'picker').addEventListener('change', (event) => setPlatform((event as CustomEvent<string>).detail));

  setPlatform('macos');
}
