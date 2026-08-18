import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The two boxes the flight runs between, stated once so the travel is their difference. */
const SOURCE = { x: 14, y: 40 };
const SLOT = { x: 294, y: 132 };
const TILE = { w: 150, h: 56 };
const FLIGHT = 1100;
/** One beat back at the source, so the start of a run is a written state rather than a value the
    browser is still holding a transition against. */
const BEAT = 60;

type Mode = 'clone' | 'move';

const NOTES: Record<Mode, string> = {
  clone: 'A second object leaves the source and the original stays put, so the new row is traceable to the track that made it.',
  move: 'Nothing is duplicated: the object itself travels, and the place it came from is left empty behind it.',
};

const tile = (attrs: string, extra: string) => `
  <div
    ${attrs}
    style="position: absolute; width: ${TILE.w}px; height: ${TILE.h}px; display: flex; align-items: center; gap: 10px;
           padding: 0 12px; border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-surface); ${extra}"
  >
    <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">FM</span>
    <span class="sp-stack" style="gap: 5px; flex: 1 1 auto">
      <span class="sp-label sp-text--ink" style="font-size: 12px">Fathom</span>
      <span class="sp-line" style="width: 62%"></span>
    </span>
  </div>`;

const row = (y: number, name: string, width: number) => `
  <div
    class="sp-row sp-context"
    style="position: absolute; left: ${SLOT.x}px; top: ${y}px; width: ${TILE.w}px; height: 40px; gap: 10px; padding: 0 12px;
           border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-surface)"
  >
    <span class="sp-avatar" style="width: 20px; height: 20px; font-size: 9px">${name}</span>
    <span class="sp-line" style="width: ${width}%"></span>
  </div>`;

/**
 * Cloning specimen: one track in a library, one playlist with a slot waiting, and an object that
 * travels between them. On the clone setting a duplicate lifts off the track and flies to the slot
 * while the original stays solid in the library, so the count goes from one object to two and the new
 * row can be traced back to the thing that made it. On the move setting the same flight happens with
 * nothing duplicated, and the library is left holding an empty outline, which is the comparison that
 * makes the difference unmistakable.
 *
 * The subject is the flying object itself, the narrowest element the term names. Move is a
 * counter-example the subject passes through rather than a separate element, so the honest condition
 * is declared in `data-pose` and the mount state satisfies it (SPEC §6): identify refuses to ring a
 * travelling object that is not a clone. The library, the playlist, the picker and the note are the
 * scene.
 *
 * The flight is a CSS transition on `transform` between two boxes stated as constants, so nothing is
 * measured and nothing can be corrupted by a style write. Its end is timed on the stage's clock rather
 * than on `transitionend`, which never fires under reduced motion, and `prefersReducedMotion` puts
 * that reader straight in the landed state instead of playing a flight they asked not to see. The
 * flier is absolutely placed and the slot is always reserved, so an arrival moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="clone" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Add</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="clone">
            <button class="sp-segment" type="button" data-part="seg-clone" value="clone">Clone</button>
            <button class="sp-segment" type="button" data-part="seg-move" value="move">Move</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="position: relative; padding: 0">
          <span class="sp-label sp-context" style="position: absolute; left: ${SOURCE.x}px; top: 12px; font-size: 11px">Library</span>
          <span class="sp-label sp-context" style="position: absolute; left: ${SLOT.x}px; top: 12px; font-size: 11px">Playlist</span>

          <div class="sp-context">
            ${tile('data-part="source-tile" data-tenant="kept"', `left: ${SOURCE.x}px; top: ${SOURCE.y}px`)}
          </div>

          ${row(40, 'HL', 58)}
          ${row(86, 'RS', 72)}

          <span
            class="sp-context" data-part="slot"
            style="position: absolute; left: ${SLOT.x}px; top: ${SLOT.y}px; width: ${TILE.w}px; height: ${TILE.h}px;
                   border: 1px dashed var(--sp-line); border-radius: 8px"
          ></span>

          <div
            class="sp-row sp-context"
            style="position: absolute; left: ${SOURCE.x}px; top: 112px; width: 170px; gap: 6px; color: var(--sp-muted)"
          >
            <span class="sp-label sp-text--ink" data-part="tenancy" style="font-size: 11px">original kept</span>
          </div>

          ${tile(
            'data-part="flier" data-subject data-pose="[data-mode=clone]" data-mode="clone" data-state="landed"',
            `left: ${SLOT.x}px; top: ${SLOT.y}px; border-color: var(--sp-accent); background: var(--sp-accent-soft);
             will-change: transform; z-index: 2`,
          )}

          <span
            class="sp-text sp-context" data-part="note"
            style="position: absolute; left: ${SOURCE.x}px; right: ${SOURCE.x}px; top: 200px; height: 32px;
                   font-size: 12px; line-height: 1.35"
          >${NOTES.clone}</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const flier = part(root, 'flier');
  const sourceTile = part(root, 'source-tile');
  const tenancy = part(root, 'tenancy');
  const note = part(root, 'note');
  const reduced = prefersReducedMotion(root);

  const dx = SOURCE.x - SLOT.x;
  const dy = SOURCE.y - SLOT.y;

  let mode: Mode = 'clone';
  let beat: number | undefined;
  let settling: number | undefined;

  const place = (at: 'source' | 'slot', ms: number) => {
    flier.style.transition = ms > 0 ? `transform ${ms}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${ms}ms ease` : 'none';
    flier.style.transform = at === 'source' ? `translate(${dx}px, ${dy}px)` : 'translate(0px, 0px)';
    flier.style.boxShadow = at === 'source' ? 'none' : 'var(--sp-shadow)';
  };

  /** What the source is left holding once the object has gone: the whole difference between the two. */
  const tenant = (kept: boolean) => {
    sourceTile.dataset.tenant = kept ? 'kept' : 'empty';
    sourceTile.style.opacity = kept ? '1' : '0.25';
    sourceTile.style.borderStyle = kept ? 'solid' : 'dashed';
    tenancy.textContent = kept ? 'original kept' : 'original gone';
  };

  const play = () => {
    clock.clearTimeout(beat);
    clock.clearTimeout(settling);
    scene.dataset.mode = mode;
    flier.dataset.mode = mode;
    note.textContent = NOTES[mode];

    // Reduced motion never sees the flight, so that reader is put on the landed state outright:
    // motion.css has already turned the transition off underneath.
    if (reduced) {
      place('slot', 0);
      flier.dataset.state = 'landed';
      tenant(mode === 'clone');
      return;
    }

    place('source', 0);
    flier.dataset.state = 'at-source';
    tenant(true);
    beat = clock.setTimeout(() => {
      place('slot', FLIGHT);
      flier.dataset.state = 'flying';
      tenant(mode === 'clone');
      settling = clock.setTimeout(() => {
        flier.dataset.state = 'landed';
      }, FLIGHT + 80);
    }, BEAT);
  };

  // Each segment names an outcome outright and Replay names a run of the current one, so no step
  // flips whatever state it happens to find (SPEC §8).
  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail as Mode;
    play();
  });
  part(root, 'replay').addEventListener('click', play);

  play();
}
