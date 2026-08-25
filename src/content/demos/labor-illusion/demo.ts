import '#src/kit/segmented.ts';
import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long one source takes to check. Four of them are the whole wait. */
const STEP_MS = 560;
/** The beat after the last source, so both modes cost the same 2.6 seconds. */
const TAIL_MS = 360;

const SOURCES = [
  { name: 'Meridian', fares: 9 },
  { name: 'Kestrel Air', fares: 14 },
  { name: 'Nordwind', fares: 6 },
  { name: 'Costa Sul', fares: 11 },
] as const;

const TOTAL = SOURCES.reduce((sum, source) => sum + source.fares, 0);

/**
 * Labor illusion specimen: the same search, the same 2.6 seconds, spent two ways. One
 * names each source as it checks it and ticks them off; the other says only that it is
 * searching. The segmented control picks which one runs, in absolute picks rather than
 * as a toggle, and the Search button is the only thing that starts a run, so no run is
 * ever cut off by another (SPEC §8).
 *
 * The subject is the worklist, the element that IS the visible labour, not the panel
 * around it. It carries `data-pose` because the silent mode is a counter-example the
 * subject itself passes through: a worklist with nothing on it is the absence of the
 * term, and identify must never ring it there.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = SOURCES.map(
    (source, i) => `
      <div class="sp-row" data-part="src-${i + 1}" data-state="pending" style="gap: 9px">
        <span data-part="tick-${i + 1}" style="flex: 0 0 16px; color: var(--sp-accent); opacity: 0; transition: opacity 0.2s var(--sp-ease)">${icon('check')}</span>
        <span class="sp-text sp-text--ink sp-grow">${source.name}</span>
        <span class="sp-text" data-part="note-${i + 1}" style="flex: 0 0 78px; text-align: right">queued</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lisbon, 12 to 19 May</span>
          <button class="sp-button sp-button--sm" data-part="search">Search</button>
        </div>
        <div class="sp-body" style="padding: 12px 14px">
          <div class="sp-surface" style="position: relative; height: 100%; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px">
            <div class="sp-stack" data-part="worklist" data-subject data-mode="transparent" data-state="idle" data-pose="[data-mode=transparent]" style="gap: 6px">
              ${rows}
            </div>
            <span class="sp-text sp-text--ink" data-part="result" hidden>${TOTAL} fares from ${SOURCES.length} carriers</span>
            <div class="sp-row sp-context" data-part="silent-wait" hidden style="position: absolute; inset: 0; justify-content: center; gap: 10px">
              <span class="sp-pulse" style="width: 14px; height: 14px; border-radius: 50%; background: var(--sp-muted)"></span>
              <span class="sp-text">Searching</span>
            </div>
          </div>
        </div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 12px; padding: 8px 12px; border-top: 1px solid var(--sp-line)">
          <sp-segmented class="sp-segmented" data-part="mode" data-value="transparent" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-transparent" value="transparent">Show the work</button>
            <button class="sp-segment" data-part="seg-silent" value="silent">Silent</button>
          </sp-segmented>
          <span class="sp-text sp-grow">The same 2.6 seconds either way.</span>
        </div>
      </div>
    </div>
  `;

  const worklist = part(root, 'worklist');
  const result = part(root, 'result');
  const silent = part(root, 'silent-wait');
  const items = SOURCES.map((source, i) => ({
    source,
    row: part(root, `src-${i + 1}`),
    tick: part(root, `tick-${i + 1}`),
    note: part(root, `note-${i + 1}`),
  }));
  const timers: number[] = [];

  const rest = () => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers.length = 0;
    worklist.dataset.state = 'idle';
    result.hidden = true;
    silent.hidden = true;
    for (const item of items) {
      item.row.dataset.state = 'pending';
      item.note.textContent = 'queued';
      item.tick.style.opacity = '0';
    }
  };

  const setMode = (mode: string) => {
    rest();
    worklist.dataset.mode = mode;
    // The worklist is still there in the silent mode, with nothing on it: that
    // emptiness is the comparison, so it is not swapped out for another panel.
    for (const item of items) item.row.hidden = mode === 'silent';
  };

  part(root, 'mode').addEventListener('change', (event) => {
    setMode((event as CustomEvent<string>).detail);
  });

  part(root, 'search').addEventListener('click', () => {
    rest();
    const transparent = worklist.dataset.mode === 'transparent';
    worklist.dataset.state = 'running';
    silent.hidden = transparent;

    items.forEach((item, i) => {
      if (!transparent) return;
      timers.push(
        clock.setTimeout(() => {
          item.row.dataset.state = 'checking';
          item.note.textContent = 'checking';
        }, i * STEP_MS),
      );
      timers.push(
        clock.setTimeout(
          () => {
            item.row.dataset.state = 'done';
            item.note.textContent = `${item.source.fares} fares`;
            item.tick.style.opacity = '1';
          },
          (i + 1) * STEP_MS,
        ),
      );
    });

    timers.push(
      clock.setTimeout(
        () => {
          worklist.dataset.state = 'done';
          silent.hidden = true;
          result.hidden = false;
        },
        SOURCES.length * STEP_MS + TAIL_MS,
      ),
    );
  });
}
