import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const VIEW = { w: 250, h: 170 };
const MOVE_MS = 520;
/** One beat at the entry pose, so the start of a move is a written state rather than a value the
    browser is still holding a transition against. */
const BEAT = 60;
/** How far the outgoing pane travels the other way: enough to read as parallax, not as a second pane. */
const SHIFT = 34;

type Level = 'list' | 'detail';
type Mode = 'directional' | 'undirected';

const MAILBOXES = ['All mail', 'Ferries', 'Receipts'];

const NOTES: Record<Mode, string> = {
  directional: 'Deeper comes in from the right, back comes in from the left. The motion is the geography.',
  undirected: 'Both directions animate identically, so going back feels like going forward again.',
};

const listPane = () => `
  <span class="sp-label sp-text--ink" style="font-size: 12px">Mailboxes</span>
  <ul class="sp-nav" style="margin-top: 10px">
    ${MAILBOXES.map(
      (name, i) => `
      <li>
        <span class="sp-nav-item sp-row sp-row--between" data-part="row-${i + 1}" style="gap: 8px">
          <span>${name}</span>
          ${icon('chevronRight')}
        </span>
      </li>`,
    ).join('')}
  </ul>`;

const detailPane = () => `
  <span class="sp-row" data-part="back" style="gap: 4px; color: var(--sp-accent); cursor: pointer">
    ${icon('chevronLeft')}
    <span class="sp-label" style="font-size: 12px; color: inherit">Mailboxes</span>
  </span>
  <span class="sp-heading" style="display: block; margin-top: 10px; font-size: 14px">Ferries</span>
  <div style="margin-top: 10px">
    ${[92, 74, 88, 66].map((w) => `<span class="sp-line" style="display: block; width: ${w}%; margin-bottom: 9px"></span>`).join('')}
  </div>`;

/**
 * Directionality specimen: a two-level navigation where the same two screens are reached twice, once
 * with the motion carrying the hierarchy and once with it carrying nothing. On the directional setting
 * going deeper brings the pane in from the right and going back brings it in from the left, so the
 * reader can feel which way they are travelling. On the undirected setting both moves animate
 * identically, and the read-out says so: back comes in from the right as well, which is the exact
 * moment the sense of place goes.
 *
 * The subject is the moving pane. Undirected is a counter-example the subject passes through rather
 * than a separate element, so the honest condition is declared in `data-pose` and the mount state
 * satisfies it (SPEC §6): identify refuses to ring a pane whose motion is saying nothing. The outgoing
 * pane, the picker, the read-out and the note are the scene.
 *
 * The move is a CSS transition on `transform`, gated by `motion.css` for a reader who asked for less
 * movement and by `prefersReducedMotion` here, which puts that reader straight on the arrived pane.
 * Its end is timed on the stage's clock rather than on `transitionend`, which never fires under
 * reduced motion. Both panes are absolutely placed inside a clipped view and the read-out holds its
 * own heights, so a navigation moves nothing but the panes (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="directional" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Motion</span>
          <sp-segmented class="sp-segmented" data-axis="Transition" data-term="directional" data-part="mode" data-value="directional">
            <button class="sp-segment" type="button" data-part="seg-directional" value="directional">Directional</button>
            <button class="sp-segment" type="button" data-part="seg-undirected" value="undirected">Undirected</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div class="sp-row" style="flex: 0 0 auto; align-items: flex-start; gap: 14px">
            <div
              data-part="view"
              style="position: relative; flex: 0 0 auto; width: ${VIEW.w}px; height: ${VIEW.h}px; overflow: hidden;
                     border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-surface)"
            >
              <div
                class="sp-context" data-part="pane-out"
                style="position: absolute; inset: 0; padding: 12px 14px; background: var(--sp-surface); opacity: 0"
              ></div>
              <div
                data-part="pane" data-subject data-pose="[data-mode=directional]" data-mode="directional"
                data-level="list" data-from="none" data-state="settled"
                style="position: absolute; inset: 0; z-index: 2; padding: 12px 14px; background: var(--sp-surface);
                       will-change: transform"
              >${listPane()}</div>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
              <span class="sp-label" style="font-size: 11px">Showing</span>
              <span class="sp-text--ink" data-part="where" style="font-size: 15px; font-weight: 600; line-height: 1.2">Mailboxes</span>
              <span class="sp-divider" style="margin: 2px 0"></span>
              <span class="sp-label" style="font-size: 11px">This pane arrived</span>
              <span class="sp-text sp-text--ink" data-part="say" style="height: 50px; font-size: 12px; line-height: 1.4">
                at rest, with nothing behind it yet.
              </span>
            </div>
          </div>

          <span
            class="sp-text sp-context" data-part="note"
            style="flex: 0 0 auto; height: 32px; font-size: 12px; line-height: 1.3"
          >${NOTES.directional}</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const pane = part(root, 'pane');
  const paneOut = part(root, 'pane-out');
  const where = part(root, 'where');
  const say = part(root, 'say');
  const note = part(root, 'note');
  const reduced = prefersReducedMotion(root);

  let level: Level = 'list';
  let mode: Mode = 'directional';
  let beat: number | undefined;
  let settling: number | undefined;

  const bodyOf = (next: Level) => (next === 'list' ? listPane() : detailPane());

  /**
   * One navigation. In the directional setting the sign comes from the direction of travel through
   * the hierarchy; in the undirected setting it is the same sign both ways, which is the whole
   * counter-example.
   */
  const go = (next: Level, deeper: boolean) => {
    clock.clearTimeout(beat);
    clock.clearTimeout(settling);
    const sign = mode === 'directional' && !deeper ? -1 : 1;

    paneOut.innerHTML = pane.innerHTML;
    paneOut.style.transition = 'none';
    paneOut.style.transform = 'translateX(0)';
    paneOut.style.opacity = '1';

    level = next;
    pane.innerHTML = bodyOf(next);
    pane.dataset.level = next;
    pane.dataset.from = sign > 0 ? 'right' : 'left';
    where.textContent = next === 'list' ? 'Mailboxes' : 'Ferries';
    say.textContent = `from the ${sign > 0 ? 'right' : 'left'}, ${deeper ? 'going deeper' : 'coming back out'}.`;

    if (reduced) {
      pane.style.transition = 'none';
      pane.style.transform = 'translateX(0)';
      pane.dataset.state = 'settled';
      paneOut.style.opacity = '0';
      return;
    }

    pane.style.transition = 'none';
    pane.style.transform = `translateX(${sign * 100}%)`;
    pane.dataset.state = 'moving';
    beat = clock.setTimeout(() => {
      pane.style.transition = `transform ${MOVE_MS}ms var(--sp-ease)`;
      pane.style.transform = 'translateX(0)';
      paneOut.style.transition = `transform ${MOVE_MS}ms var(--sp-ease), opacity ${MOVE_MS}ms ease`;
      paneOut.style.transform = `translateX(${-sign * SHIFT}%)`;
      paneOut.style.opacity = '0.45';
      settling = clock.setTimeout(() => {
        pane.dataset.state = 'settled';
        paneOut.style.opacity = '0';
      }, MOVE_MS + 60);
    }, BEAT);
  };

  // Delegated, because the pane's contents are replaced on every move. Nothing here synthesizes a
  // second event: one click reaches the specimen and one navigation happens (SPEC §8).
  pane.addEventListener('click', (event) => {
    const hit = (event.target as HTMLElement).closest<HTMLElement>('[data-part]');
    const name = hit?.dataset.part ?? '';
    if (name.startsWith('row') && level === 'list') return go('detail', true);
    if (name === 'back' && level === 'detail') return go('list', false);
  });

  // Each segment names a motion setting outright and leaves the reader on the screen they were on,
  // so a resumed pass lands on the setting it asked for (SPEC §8).
  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail as Mode;
    scene.dataset.mode = mode;
    pane.dataset.mode = mode;
    note.textContent = NOTES[mode];
  });
}
