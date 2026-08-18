import { part } from '#src/kit/parts.ts';

const PANEL = { w: 300, h: 160 };
const TILE = { w: 124, h: 54 };

const TILES = [
  { key: 'play', name: 'Play', note: 'Resume the film' },
  { key: 'share', name: 'Share', note: 'Send to a room' },
  { key: 'details', name: 'Details', note: 'Cast and crew' },
  { key: 'close', name: 'Close', note: 'Put it away' },
];

/**
 * Look and pinch specimen: a spatial panel whose targets are chosen by the eyes and committed
 * by the hand. The highlight follows wherever the reader is looking, and it does nothing at all
 * on its own: the panel only acts when the pinch lands, which is the whole of the split.
 *
 * **This is a labelled simulation, and it says so on its face.** There is no eye tracker on this
 * page, so the ghost cursor stands in for gaze and its click stands for the pinch. The rest is
 * honest: the highlight moves on arrival and never on departure, since eyes are always somewhere
 * and a gaze that went nowhere would be a lie about how the input works.
 *
 * The subject is the target the eyes are on, so the specimen marks the one the gaze rests on at
 * mount and declares the honest condition in `data-pose`. A ring drawn around a tile nobody is
 * looking at would identify an ordinary button rather than this term, so identify refuses that
 * state and plays on until the gaze comes back. The panel, the readouts and the caption are the
 * scene around it in the context register.
 *
 * Arrival is listened for directly, which is the one case SPEC §7 leaves to the demo: this is
 * not a repaint of hover the player already mirrors, it is the specimen's own subject matter,
 * and the demo has to know which target a pinch would land on. There is no departure listener
 * for the same reason there is no resting state with nothing highlighted.
 *
 * Targets are widely spaced on purpose (gaze lands within about a degree, not on a pixel), the
 * ring is a shadow rather than a border, and every readout holds its box, so looking around and
 * committing move nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Spatial</span>
          <span class="sp-text" data-part="readout" style="width: 330px; text-align: right; white-space: nowrap">Looking at Play, and nothing has been committed</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 10px">
          <div
            class="sp-surface"
            data-part="panel"
            data-committed="none"
            style="position: relative; flex: 0 0 auto; width: ${PANEL.w + 2}px; height: ${PANEL.h + 2}px; display: grid; grid-template-columns: repeat(2, ${TILE.w}px); gap: 16px; padding: 18px; justify-content: center; align-content: center"
          >
            ${TILES.map(
              (tile) => `
              <button
                class="sp-button sp-button--ghost"
                type="button"
                data-part="tile-${tile.key}"${tile.key === 'play' ? ' data-subject data-pose="[data-gazed]"' : ''}
                style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px; width: ${TILE.w}px; height: ${TILE.h}px; padding: 0 12px; text-align: left"
              >
                <span class="sp-heading" style="font-size: 13px">${tile.name}</span>
                <span class="sp-label" style="font-size: 11px">${tile.note}</span>
              </button>`,
            ).join('')}
          </div>

          <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
            <span class="sp-label">Eyes are on</span>
            <span class="sp-heading" data-part="gaze-name" style="font-size: 14px">Play</span>
            <div class="sp-divider"></div>
            <span class="sp-label">Pinch committed</span>
            <span class="sp-heading" data-part="commit-name" style="font-size: 14px">Nothing yet</span>
            <div class="sp-divider"></div>
            <span class="sp-text" style="font-size: 11px; line-height: 1.35">Looking is never activating.</span>
          </div>
        </div>

        <span class="sp-label sp-context" style="padding: 0 14px 9px; text-align: center; line-height: 1.4">
          There is no eye tracker here, so the ghost cursor is standing in for the gaze and its click is standing in for the pinch.
        </span>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const readout = part(root, 'readout');
  const gazeName = part(root, 'gaze-name');
  const commitName = part(root, 'commit-name');

  let gazed = TILES[0];
  let committed: (typeof TILES)[number] | undefined;

  const say = () => {
    const done = committed ? `${committed.name} is running` : 'nothing has been committed';
    readout.textContent = `Looking at ${gazed?.name ?? 'nothing'}, and ${done}`;
  };

  const gazeAt = (next: (typeof TILES)[number]) => {
    gazed = next;
    for (const tile of TILES) {
      const el = part(root, `tile-${tile.key}`);
      const on = tile.key === next.key;
      if (on) el.setAttribute('data-gazed', '');
      else el.removeAttribute('data-gazed');
      el.style.boxShadow = on ? '0 0 0 3px var(--sp-accent)' : 'none';
    }
    gazeName.textContent = next.name;
    say();
  };

  for (const tile of TILES) {
    const el = part(root, `tile-${tile.key}`);
    // Arrival only. The eyes are always on something, so the highlight moves, it never clears.
    el.addEventListener('pointerenter', () => gazeAt(tile));
    // The pinch, which is the only thing that commits anything.
    el.addEventListener('click', () => {
      committed = tile;
      panel.dataset.committed = tile.key;
      commitName.textContent = tile.name;
      say();
    });
  }

  // The eyes have to be somewhere before the first move, and there is no pointer on stage yet,
  // so the specimen states the resting gaze itself (SPEC §7).
  if (gazed) gazeAt(gazed);
}
