import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const FACE_INK = '#0c0e13';

interface Slot {
  left: number;
  top: number;
  width: number;
  height: number;
  form: 'large' | 'medium' | 'small';
}

interface Family {
  slot: Slot;
  temp: Slot;
  battery: Slot;
  time: { left: number; top: number; align: string };
  date: boolean;
  size: string;
  grants: string;
  note: string;
}

/** Three faces, three slots for the same complication. Positions are absolute inside the
    face, so a family change re-lays the face without moving anything outside it (SPEC §5). */
const FAMILIES: Record<string, Family> = {
  modular: {
    slot: { left: 12, top: 82, width: 166, height: 42, form: 'large' },
    temp: { left: 24, top: 136, width: 52, height: 52, form: 'medium' },
    battery: { left: 114, top: 136, width: 52, height: 52, form: 'medium' },
    time: { left: 12, top: 34, align: 'left' },
    date: true,
    size: '166 by 42',
    grants: 'ring, name, value',
    note: 'A wide slot, so the same complication can afford its icon, its name and its full figure.',
  },
  circular: {
    slot: { left: 16, top: 104, width: 52, height: 52, form: 'medium' },
    temp: { left: 69, top: 104, width: 52, height: 52, form: 'medium' },
    battery: { left: 122, top: 104, width: 52, height: 52, form: 'medium' },
    time: { left: 12, top: 40, align: 'center' },
    date: true,
    size: '52 by 52',
    grants: 'ring and value',
    note: 'A round slot the size of a coin: the ring and an abbreviated figure survive, the name does not.',
  },
  corner: {
    slot: { left: 14, top: 14, width: 34, height: 34, form: 'small' },
    temp: { left: 142, top: 14, width: 34, height: 34, form: 'small' },
    battery: { left: 142, top: 166, width: 34, height: 34, form: 'small' },
    time: { left: 12, top: 88, align: 'center' },
    date: false,
    size: '34 by 34',
    grants: 'ring only',
    note: 'A corner grants a ring and nothing else, so the figure has to be readable as an arc alone.',
  },
};

/** `named` is what puts `data-part` on the pieces: only the subject carries them, so a
    choreography selector can never resolve to one of the scenery complications instead. */
const ring = (size: number, fill: number, value: string, showValue: boolean, named: boolean) => `
  <span
    style="position: relative; flex: 0 0 auto; width: ${size}px; height: ${size}px; border-radius: 50%;
           background: conic-gradient(var(--sp-accent) 0 ${fill}%, rgb(255 255 255 / 0.16) ${fill}% 100%)"
  >
    <span style="position: absolute; inset: ${Math.max(3, Math.round(size * 0.11))}px; border-radius: 50%; background: ${FACE_INK}"></span>
    ${
      showValue
        ? `<span ${named ? 'data-part="comp-value"' : ''} style="position: absolute; inset: 0; display: flex; align-items: center;
             justify-content: center; font-size: ${size > 44 ? 12 : 10}px; font-weight: 600; font-variant-numeric: tabular-nums">${value}</span>`
        : ''
    }
  </span>`;

/** The same reading, drawn at whatever size the slot granted. */
const complication = (form: Slot['form'], name: string, short: string, long: string, fill: number, named: boolean) => {
  if (form === 'large') {
    return `<span style="display: flex; align-items: center; gap: 10px; width: 100%; height: 100%; padding: 0 12px;
              border-radius: 12px; background: rgb(255 255 255 / 0.07)">
        ${ring(26, fill, short, false, named)}
        <span style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
          <span style="font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sp-muted)">${name}</span>
          <span ${named ? 'data-part="comp-value"' : ''} style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums">${long}</span>
        </span>
      </span>`;
  }
  if (form === 'medium') return ring(52, fill, short, true, named);
  return ring(34, fill, short, false, named);
};

const place = (el: HTMLElement, slot: Slot) => {
  el.style.left = `${slot.left}px`;
  el.style.top = `${slot.top}px`;
  el.style.width = `${slot.width}px`;
  el.style.height = `${slot.height}px`;
};

/**
 * Complication specimen: one watch face whose family the reader picks, and one step count
 * rendered into whatever slot that family grants it. The wide slot affords a ring, a name and
 * the full figure; the round slot keeps the ring and an abbreviated figure; the corner slot
 * grants a ring alone, and the number drops rather than being truncated into a lie.
 *
 * The subject is that one complication, `data-part="comp"`, not the face around it: the term
 * names the thing in the slot. The time, the date and the two other complications are scenery.
 * It is honestly a complication at all three sizes, so no `data-pose` condition is needed.
 *
 * Every slot is absolutely positioned inside the face, so changing family re-lays the face and
 * moves nothing outside it (SPEC §5), and the picker names an absolute family rather than
 * flipping whatever it finds (SPEC §8). The face restates the kit's neutrals locally, the way a
 * dark panel would, so `.sp-context` still quiets the scenery on a black face.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Watch face</span>
          <span class="sp-label" style="font-size: 12px">Step count from Trails</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; gap: 18px">
          <div
            data-part="face"
            data-family="modular"
            style="position: relative; flex: 0 0 auto; width: 190px; height: 214px; border-radius: 42px; background: ${FACE_INK};
                   box-shadow: 0 0 0 5px #2a2e36, var(--sp-shadow); overflow: hidden;
                   --sp-accent: #6ea8ff; --sp-ink: #f3f5f9; --sp-muted: #9aa3b2;
                   --sp-context-accent: #8e97a5; --sp-context-accent-soft: #262b34; color: #f3f5f9"
          >
            <span
              class="sp-context"
              data-part="date"
              style="position: absolute; left: 12px; top: 12px; font-size: 10px; letter-spacing: 0.08em; color: var(--sp-muted)"
            >TUE 12</span>
            <span
              class="sp-context"
              data-part="time"
              style="position: absolute; left: 12px; top: 34px; width: 166px; font-size: 36px; font-weight: 600;
                     font-variant-numeric: tabular-nums; line-height: 1.1"
            >10:09</span>

            <span data-part="comp" data-subject data-size="large" style="position: absolute; display: flex"></span>
            <span class="sp-context" data-part="comp-temp" style="position: absolute; display: flex"></span>
            <span class="sp-context" data-part="comp-battery" style="position: absolute; display: flex"></span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 10px">
            <sp-segmented class="sp-segmented" data-axis="Face" data-part="picker" data-value="modular" style="align-self: flex-start">
              <button class="sp-segment" type="button" data-part="seg-modular" value="modular" style="padding: 4px 9px; font-size: 12px">Modular</button>
              <button class="sp-segment" type="button" data-part="seg-circular" value="circular" style="padding: 4px 9px; font-size: 12px">Circular</button>
              <button class="sp-segment" type="button" data-part="seg-corner" value="corner" style="padding: 4px 9px; font-size: 12px">Corner</button>
            </sp-segmented>

            <div class="sp-row sp-row--between">
              <span class="sp-label">Slot granted</span>
              <span class="sp-text sp-text--ink" data-part="slot-size" style="font-size: 12px; font-variant-numeric: tabular-nums">166 by 42</span>
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label">Room for</span>
              <span class="sp-text sp-text--ink" data-part="slot-grants" style="font-size: 12px">ring, name, value</span>
            </div>
            <p class="sp-text" data-part="note" style="margin: 0; height: 48px; font-size: 11px; line-height: 1.45">${FAMILIES.modular?.note ?? ''}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const face = part(root, 'face');
  const comp = part(root, 'comp');
  const temp = part(root, 'comp-temp');
  const battery = part(root, 'comp-battery');
  const time = part(root, 'time');
  const date = part(root, 'date');
  const note = part(root, 'note');

  const setFamily = (name: string) => {
    const family = FAMILIES[name] ?? FAMILIES.modular;
    if (!family) return;

    place(comp, family.slot);
    comp.dataset.size = family.slot.form;
    comp.innerHTML = complication(family.slot.form, 'Steps', '7.4K', '7,420', 62, true);

    place(temp, family.temp);
    temp.innerHTML = complication(family.temp.form, 'Temp', '18°', '18°C', 44, false);

    place(battery, family.battery);
    battery.innerHTML = complication(family.battery.form, 'Battery', '81%', '81%', 81, false);

    time.style.left = `${family.time.left}px`;
    time.style.top = `${family.time.top}px`;
    time.style.textAlign = family.time.align;
    date.hidden = !family.date;

    face.dataset.family = name;
    part(root, 'slot-size').textContent = family.size;
    part(root, 'slot-grants').textContent = family.grants;
    note.textContent = family.note;
  };

  part(root, 'picker').addEventListener('change', (event) => setFamily((event as CustomEvent<string>).detail));

  setFamily('modular');
}
