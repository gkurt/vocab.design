import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** When each chunk of the result set lands, and the beat before the reader speaks a settled region. */
const CHUNK_MS = [600, 1400, 2200] as const;
const SETTLE_MS = 300;

type Mode = 'declared' | 'omitted';

const ROWS = [
  { initial: 'K', name: 'Kellerman & Co', amount: '£12,400' },
  { initial: 'N', name: 'Northbank Ltd', amount: '£8,150' },
  { initial: 'O', name: 'Orrell Trading', amount: '£3,900' },
] as const;

const CAPTION = {
  declared: 'Busy is set before the first write and cleared after the last, so the whole load is one edit and the reader speaks once.',
  omitted:
    'No flag, so every insertion is announced. The reader is still on the first row when the second lands, and a listener gets fragments.',
} as const;

/**
 * Busy state specimen: a results region that arrives in three chunks, with a pick between
 * declaring `aria-busy` for the duration of the load and leaving it off. The rows are identical
 * either way; what changes is how many times the region is spoken while it fills.
 *
 * The transcript is a portrayal, following the live region and atomic live region specimens rather
 * than inventing a second convention for the same job. It used to carry the heading "Screen reader,
 * polite queue", which is a stage direction dressed as product UI: it names an instrument the scene
 * does not draw. The quoted lines are left to read as what they are.
 *
 * The subject is the region that carries the flag. It is a container and it is still the narrowest
 * element the term names: the attribute sits on the marked region, and ringing a single row would
 * identify the thing being written rather than the thing whose announcement is at stake. The
 * picker, the transcript and the caption are scenery (SPEC §5). A region with no flag on it is
 * not what the term names, and it is a state this region passes through, so the honest condition
 * is declared in `data-pose` and the mount state satisfies it (SPEC §6).
 *
 * Every timer comes from the DemoClock, so a pose can hold a half-loaded region still. The row
 * slots and the three transcript lines hold their room whether filled or not, so nothing moves as
 * the region arrives (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const row = (index: number, initial: string, name: string, amount: string) => `
    <div class="sp-row" data-part="row-${index}" style="height: 22px; gap: 8px; opacity: 0;
                                                        transition: opacity 0.2s ease">
      <span class="sp-avatar" style="width: 18px; height: 18px; font-size: 9px">${initial}</span>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 11.5px">${name}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${amount}</span>
    </div>`;

  const logLine = (index: number) => `
    <p class="sp-text sp-text--ink" data-part="log-${index}"
       style="margin: 0; height: 15px; font-size: 11px; line-height: 15px; opacity: 0;
              transition: opacity 0.18s ease"></p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="aria-busy" data-term="declared" data-part="mode" data-value="declared" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-declared" value="declared"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Declared</button>
            <button class="sp-segment" type="button" data-part="seg-omitted" value="omitted"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Omitted</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="region" data-subject data-mode="declared" data-pose="[data-mode=declared]"
             role="status" aria-live="polite" aria-busy="true" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 16px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Payers matching “kellerman”</span>
            <span class="sp-label" data-part="count"
                  style="flex: 0 0 auto; width: 92px; text-align: right; font-size: 10px">loading</span>
          </div>
          <div class="sp-stack" style="gap: 0; margin-top: 5px; height: 66px">
            ${ROWS.map((r, i) => row(i + 1, r.initial, r.name, r.amount)).join('')}
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-stack" style="gap: 0; height: 45px">
            ${logLine(1)}${logLine(2)}${logLine(3)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="declared"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.declared}</p>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const count = part(root, 'count');
  const caption = part(root, 'caption');
  const rows = ROWS.map((_, index) => part(root, `row-${index + 1}`));
  const logs = [1, 2, 3].map((index) => part(root, `log-${index}`));
  let timers: number[] = [];

  const speak = (line: HTMLElement, text: string) => {
    line.textContent = text;
    line.style.opacity = '1';
    line.removeAttribute('data-cut');
  };

  const load = (mode: Mode) => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];

    region.dataset.mode = mode;
    flag(region, 'data-loading', true);
    if (mode === 'declared') region.setAttribute('aria-busy', 'true');
    else region.removeAttribute('aria-busy');
    count.textContent = 'loading';
    for (const el of rows) el.style.opacity = '0';
    for (const line of logs) {
      line.textContent = '';
      line.style.opacity = '0';
      line.removeAttribute('data-cut');
      line.style.textDecoration = 'none';
    }
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];

    ROWS.forEach((entry, index) => {
      const at = CHUNK_MS[index] ?? 0;
      timers.push(
        clock.setTimeout(() => {
          const el = rows[index];
          if (el) el.style.opacity = '1';
          count.textContent = `${index + 1} of 3`;
          if (mode === 'declared') return;
          // No flag, so every insertion is its own announcement, and the one before it is still
          // being read out when the next arrives.
          const previous = logs[index - 1];
          if (previous) {
            previous.setAttribute('data-cut', '');
            previous.style.textDecoration = 'line-through';
          }
          const line = logs[index];
          if (line) speak(line, `“${entry.name}”`);
        }, at),
      );
    });

    timers.push(
      clock.setTimeout(
        () => {
          flag(region, 'data-loading', false);
          count.textContent = '3 payers';
          if (mode === 'declared') {
            region.setAttribute('aria-busy', 'false');
            const line = logs[0];
            if (line) speak(line, '“3 payers matching kellerman, list”');
          }
        },
        (CHUNK_MS[CHUNK_MS.length - 1] ?? 0) + SETTLE_MS,
      ),
    );
  };

  part(root, 'mode').addEventListener('change', (event) => {
    load((event as CustomEvent<string>).detail as Mode);
  });

  load('declared');
}
