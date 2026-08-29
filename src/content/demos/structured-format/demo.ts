import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const HINT = {
  split: 'For example, 31 03 1994. Filling a box sends the next character to the next box.',
  one: 'For example, 31/03/1994. One box, and the reader types the separators.',
};

interface Box {
  el: HTMLInputElement;
  max: number;
}

/**
 * Structured format specimen: one date entered two ways. Three boxes with fixed shapes,
 * where filling one sends the next character to the next box, and one field with a format
 * hint. Both are typed character by character, so the boxes the value crosses are counted
 * as they happen rather than described.
 *
 * The subject is the split field set: the term names the arrangement of boxes, not any one
 * of them, and the set is narrower than the card, the form or the frame (SPEC §5). It is
 * absent in the single-field state rather than dishonest there, so identify summons it and
 * no `data-pose` is needed. The mode picker, the parsed readout and the crossing count are
 * scenery.
 *
 * Both entry blocks live in one region of fixed height, so switching arrangements moves
 * nothing (SPEC §5). Auto-advance is drawn with the kit's simulated focus ring, and real
 * focus moves only for a real reader's own keystrokes, since attract must never take the
 * keyboard (SPEC §7).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 270px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 12.5px">Membership form</span>
          <sp-segmented class="sp-segmented" data-axis="Fields" data-part="mode" data-value="split" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-split" type="button" value="split" style="padding: 4px 9px; font-size: 11.5px">Three boxes</button>
            <button class="sp-segment" data-part="seg-one" type="button" value="one" style="padding: 4px 9px; font-size: 11.5px">One field</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 11px">
            <span class="sp-label" style="display: block; height: 15px; font-size: 11px">Date of birth</span>

            <div style="position: relative; height: 54px; margin-top: 4px">
              <div class="sp-row" data-part="split" data-subject style="position: absolute; inset: 0; gap: 8px; align-items: flex-end">
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Day</span>
                  <input class="sp-input" data-part="sub-day" type="text" inputmode="numeric" aria-label="Day" style="width: 48px; text-align: center" />
                </span>
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Month</span>
                  <input class="sp-input" data-part="sub-month" type="text" inputmode="numeric" aria-label="Month" style="width: 48px; text-align: center" />
                </span>
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Year</span>
                  <input class="sp-input" data-part="sub-year" type="text" inputmode="numeric" aria-label="Year" style="width: 68px; text-align: center" />
                </span>
              </div>

              <div class="sp-row" data-part="single" style="position: absolute; inset: 0; display: none; gap: 8px; align-items: flex-end">
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Date</span>
                  <input class="sp-input" data-part="one" type="text" inputmode="numeric" aria-label="Date of birth" placeholder="DD/MM/YYYY" style="width: 164px" />
                </span>
              </div>
            </div>

            <span class="sp-text" data-part="hint" style="display: block; height: 14px; margin-top: 7px; font-size: 10.5px; line-height: 14px">${HINT.split}</span>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 auto; padding: 7px 11px">
            <span class="sp-label" style="display: block; height: 14px; font-size: 10.5px">What the form received</span>
            <span class="sp-text sp-text--ink" data-part="status" data-state="waiting" style="display: block; height: 16px; font-size: 11.5px; line-height: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Nothing yet.</span>
          </div>

          <span class="sp-text sp-context" data-part="moves" data-count="0" style="flex: 0 0 auto; height: 15px; font-size: 10.5px; line-height: 15px">Boxes crossed while typing: 0</span>
        </div>
      </div>
    </div>
  `;

  const boxes: Box[] = [
    { el: part(root, 'sub-day') as HTMLInputElement, max: 2 },
    { el: part(root, 'sub-month') as HTMLInputElement, max: 2 },
    { el: part(root, 'sub-year') as HTMLInputElement, max: 4 },
  ];
  const one = part(root, 'one') as HTMLInputElement;
  const split = part(root, 'split');
  const single = part(root, 'single');
  const hint = part(root, 'hint');
  const status = part(root, 'status');
  const moves = part(root, 'moves');

  let crossings = 0;
  let active = 0;
  let entered = false;

  const setCrossings = (count: number) => {
    crossings = count;
    moves.dataset.count = String(count);
    moves.textContent = `Boxes crossed while typing: ${count}`;
  };

  const setStatus = (state: string, text: string) => {
    status.dataset.state = state;
    status.textContent = text;
  };

  const paintActive = () => {
    boxes.forEach((box, index) => {
      flag(box.el, 'data-sim-focus', entered && index === active);
    });
  };

  /** Keep each box to its own shape and pass the surplus along, which is what auto-advance is. */
  const distribute = (from: number) => {
    for (let index = from; index < boxes.length; index++) {
      const box = boxes[index];
      if (!box) continue;
      const digits = box.el.value.replace(/\D/g, '');
      if (digits.length > box.max) {
        box.el.value = digits.slice(0, box.max);
        const next = boxes[index + 1];
        if (next) next.el.value += digits.slice(box.max);
      } else {
        box.el.value = digits;
      }
      flag(box.el, 'data-filled', box.el.value.length === box.max);
    }
  };

  const spell = (day: string, month: string, year: string) => `${Number(day)} ${MONTHS[Number(month) - 1] ?? month} ${year}`;

  const readSplit = () => {
    const values = boxes.map((box) => box.el.value);
    const [day = '', month = '', year = ''] = values;
    if (day.length !== 2 || month.length !== 2 || year.length !== 4) return setStatus('waiting', 'Nothing yet.');
    setStatus('complete', spell(day, month, year));
  };

  boxes.forEach((box, index) => {
    box.el.addEventListener('input', (event) => {
      entered = true;
      distribute(index);
      const open = boxes.findIndex((candidate) => candidate.el.value.length < candidate.max);
      const landed = open === -1 ? boxes.length - 1 : open;
      if (landed > active) setCrossings(crossings + (landed - active));
      active = landed;
      paintActive();
      readSplit();
      // A real reader's own keystrokes move real focus; attract's never do (SPEC §7).
      if (event.isTrusted && landed !== index) boxes[landed]?.el.focus();
    });
  });

  one.addEventListener('input', () => {
    one.value = one.value.replace(/[^\d/]/g, '');
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(one.value);
    if (!match) return setStatus('waiting', 'Nothing yet.');
    setStatus('complete', spell(match[1] ?? '', match[2] ?? '', match[3] ?? ''));
  });

  const render = (mode: 'split' | 'one') => {
    split.style.display = mode === 'split' ? 'flex' : 'none';
    single.style.display = mode === 'one' ? 'flex' : 'none';
    hint.textContent = HINT[mode];
    for (const box of boxes) {
      box.el.value = '';
      box.el.removeAttribute('data-filled');
    }
    one.value = '';
    active = 0;
    entered = false;
    setCrossings(0);
    setStatus('waiting', 'Nothing yet.');
    paintActive();
  };

  part(root, 'mode').addEventListener('change', (event) => {
    render((event as CustomEvent<string>).detail === 'one' ? 'one' : 'split');
  });

  render('split');
}
