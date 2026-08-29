import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'consistent' | 'vary';
type IconName = 'inbox' | 'copy' | 'check';

const SCREENS = [
  { id: 1, title: 'Invoice' },
  { id: 2, title: 'Contacts' },
  { id: 3, title: 'Settings' },
] as const;

/** The same function on all three screens; only what it is called changes. */
const NAMING: Record<Mode, { word: string; glyph: IconName; spoken: string; name: string }[]> = {
  consistent: [
    { word: 'Save', glyph: 'inbox', spoken: '“Save, button”', name: 'save' },
    { word: 'Save', glyph: 'inbox', spoken: '“Save, button”', name: 'save' },
    { word: 'Save', glyph: 'inbox', spoken: '“Save, button”', name: 'save' },
  ],
  vary: [
    { word: 'Save', glyph: 'inbox', spoken: '“Save, button”', name: 'save' },
    { word: 'Store', glyph: 'copy', spoken: '“Store, button”', name: 'store' },
    { word: '', glyph: 'check', spoken: '“button”, no name', name: 'none' },
  ],
};

const CAPTION = {
  consistent: 'One name, one glyph, three screens. A reader learns the control once and finds it everywhere.',
  vary: 'Same function, three identifications. The reader who learned Save has to work out that Store and the bare glyph are the same thing.',
} as const;

/**
 * Consistent identification specimen: one function on three screens, with a pick between naming it
 * the same way everywhere and naming it three ways. Pressing the control on any screen commits the
 * record either way, which is the point: the function never changed, only what it is called.
 *
 * The transcript here is a name list rather than an announcement stream: it says what the reader
 * hears when they reach the control on each screen, which is the thing this criterion is about.
 *
 * The subject is the control's name, given an element of its own (SPEC §5): the term names what a
 * control is called, not the control and not the screen it sits on. The three-way naming is the
 * failure this criterion exists against, and it is a state the name passes through, so the honest
 * condition rides in `data-pose` and the mount state satisfies it (SPEC §6). The screens, the
 * transcript, the picker and the caption are scenery.
 *
 * No timers: every state here is reached by a press, so the specimen needs no clock. The label slot
 * and the result line hold their room in every state, so renaming a control moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const screen = (id: number, title: string) => `
    <div class="sp-frame ${id === 2 ? '' : 'sp-context'}" data-part="screen-${id}"
         style="flex: 1 1 0; min-width: 0; width: auto; height: 98px">
      <div class="sp-topbar" style="padding: 4px 8px">
        <span class="sp-label" style="font-size: 9.5px">${title}</span>
      </div>
      <div class="sp-body sp-stack" style="padding: 7px 8px; gap: 5px">
        <span class="sp-line" style="width: 82%"></span>
        <span class="sp-line" style="width: 58%"></span>
        <button class="sp-button sp-button--sm" type="button" data-part="btn-${id}"
                style="display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: 100%;
                       height: 24px; font-size: 11px; white-space: nowrap">
          <span data-part="glyph-${id}" style="display: flex; width: 16px; height: 16px"></span>
          <span data-part="name-${id}" style="white-space: nowrap"></span>
        </button>
        <span class="sp-label" data-part="done-${id}" data-state="idle"
              style="height: 12px; font-size: 9.5px; white-space: nowrap; opacity: 0;
                     transition: opacity 0.18s ease">Saved to the record</span>
      </div>
    </div>`;

  const spokenLine = (id: number, title: string) => `
    <div class="sp-row" style="gap: 8px; height: 15px">
      <span class="sp-label" style="flex: 0 0 auto; width: 62px; font-size: 10px">${title}</span>
      <span class="sp-text sp-text--ink" data-part="say-${id}" data-name="save"
            style="flex: 1 1 auto; min-width: 0; font-size: 11px; line-height: 15px; white-space: nowrap">“Save, button”</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One function, three screens</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Naming" data-term="consistent" data-value="consistent" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-consistent" value="consistent"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">One name</button>
            <button class="sp-segment" type="button" data-part="seg-vary" value="vary"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Three names</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 8px; align-items: stretch">
          ${SCREENS.map((s) => screen(s.id, s.title)).join('')}
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 7px 10px">
          <span class="sp-label" style="font-size: 10px">What the reader hears at the control</span>
          <div class="sp-stack" style="gap: 0; margin-top: 2px">
            ${SCREENS.map((s) => spokenLine(s.id, s.title)).join('')}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="consistent"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.consistent}</p>
      </div>
    </div>
  `;

  const caption = part(root, 'caption');
  const names = SCREENS.map((s) => part(root, `name-${s.id}`));
  const glyphs = SCREENS.map((s) => part(root, `glyph-${s.id}`));
  const says = SCREENS.map((s) => part(root, `say-${s.id}`));
  const dones = SCREENS.map((s) => part(root, `done-${s.id}`));

  // What the middle screen's control is called: the subject, honest only while one function has one name.
  names[1]?.setAttribute('data-subject', '');
  names[1]?.setAttribute('data-pose', '[data-mode=consistent]');

  const apply = (next: Mode) => {
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];

    NAMING[next].forEach((naming, index) => {
      const name = names[index];
      const glyph = glyphs[index];
      const say = says[index];
      const done = dones[index];
      if (!name || !glyph || !say || !done) return;
      name.textContent = naming.word;
      name.dataset.mode = next;
      name.style.display = naming.word ? '' : 'none';
      glyph.innerHTML = icon(naming.glyph);
      say.textContent = naming.spoken;
      say.dataset.name = naming.name;
      done.dataset.state = 'idle';
      done.style.opacity = '0';
    });
  };

  // Absolute rather than a toggle: the press commits the record, whatever state it found (SPEC §8).
  for (const [index, s] of SCREENS.entries()) {
    part(root, `btn-${s.id}`).addEventListener('click', () => {
      const done = dones[index];
      if (!done) return;
      done.dataset.state = 'saved';
      done.style.opacity = '1';
    });
  }

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('consistent');
}
