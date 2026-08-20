import { flag, part } from '#src/kit/parts.ts';

const WELL = 108;
const THUMB = 50;

/** Stand-in pictures: washes rather than photographs, so the specimen fetches nothing. */
const PHOTOS: Record<string, { wash: string; label: string }> = {
  harbour: { wash: 'linear-gradient(150deg, #6ea8fe 0%, #2b4fb8 100%)', label: 'Harbour' },
  dunes: { wash: 'linear-gradient(150deg, #f7b267 0%, #d1493f 100%)', label: 'Dunes' },
  fern: { wash: 'linear-gradient(150deg, #77d3b0 0%, #2a7f75 100%)', label: 'Fern' },
  granite: { wash: 'linear-gradient(150deg, #b0b6c4 0%, #5d6577 100%)', label: 'Granite' },
  ochre: { wash: 'linear-gradient(150deg, #e6c56a 0%, #9d7413 100%)', label: 'Ochre' },
};

const START = 'harbour';
const TRAY = ['dunes', 'fern', 'granite', 'ochre'] as const;

const SAID: Record<string, string> = {
  rest: 'Drop a picture on the well, or paste one into it',
  over: 'Ready: release to replace the picture',
  dropped: 'Replaced. The well is showing the new value',
};

/**
 * Image well specimen: an account panel whose profile picture is both the display and the
 * drop target. A picture dragged out of the tray beside it lights the well as it arrives and
 * replaces the value on release, and the tray keeps its copy, because a drop into a well is
 * not a move out of a library.
 *
 * The subject is the well, the narrowest element the term names: the panel around it is a
 * settings card, the tray is a source, and the word names the editable picture itself. It is
 * honestly an image well in every state, empty ring or full picture, so no `data-pose`
 * condition is needed. The tray, the caption and the status line are scenery.
 *
 * The drag is resolved by coordinate rather than by pointer events on the well, because a
 * held drag keeps reporting to the element it started on: the same maths serves the scripted
 * pointer and a reader's own. The pointer is captured on a trusted pointerdown so a real
 * drag survives leaving the thumbnail, and released on pointerup and pointercancel, never
 * pointerleave, which does not fire while capture holds (SPEC §7). The drop-target ring and
 * the label are drawn inside the well's own box and the status line has a fixed height, so
 * arming the well moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const thumb = (key: string) => {
    const photo = PHOTOS[key];
    return `
      <button
        type="button"
        data-part="tray-${key}"
        data-photo="${key}"
        aria-label="${photo?.label ?? key}"
        style="display: block; flex: 0 0 auto; width: ${THUMB}px; height: ${THUMB}px; padding: 0; border: 1px solid var(--sp-line);
               border-radius: 6px; background: ${photo?.wash ?? 'none'}; cursor: grab; touch-action: none"
      ></button>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 416px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Account</span>
          <span class="sp-label" style="font-size: 11px">Profile picture</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 14px 16px">
          <div class="sp-row" style="gap: 18px; align-items: flex-start">
            <div
              data-part="well"
              data-subject
              data-photo="${START}"
              role="img"
              aria-label="Profile picture"
              style="position: relative; flex: 0 0 auto; width: ${WELL}px; height: ${WELL}px; border-radius: 10px;
                     background: ${PHOTOS[START]?.wash}; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.14)"
            >
              <span
                data-part="ring"
                aria-hidden="true"
                style="position: absolute; inset: 0; border-radius: 10px; border: 2px dashed var(--sp-accent);
                       background: rgb(255 255 255 / 0.28); opacity: 0; transition: opacity 0.14s"
              ></span>
              <span
                data-part="drop-label"
                style="position: absolute; left: 50%; bottom: 8px; translate: -50% 0; padding: 2px 7px; border-radius: 999px;
                       background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 11px; font-weight: 500;
                       white-space: nowrap; opacity: 0; transition: opacity 0.14s"
                >Drop here</span
              >
            </div>

            <div class="sp-stack" style="gap: 10px; min-width: 0">
              <div class="sp-surface sp-context" data-part="tray" style="padding: 9px 10px">
                <span class="sp-label" style="display: block; font-size: 11px">Recent pictures</span>
                <div class="sp-row" style="gap: 8px; margin-top: 7px">${TRAY.map(thumb).join('')}</div>
              </div>
              <div class="sp-row sp-context" style="gap: 6px; flex-wrap: wrap">
                <span class="sp-label" style="font-size: 11px">Paste with</span>
                <span class="sp-kbd">Cmd</span>
                <span class="sp-kbd">V</span>
                <span class="sp-label" style="font-size: 11px">or clear with</span>
                <span class="sp-kbd">Delete</span>
              </div>
            </div>
          </div>

          <span
            class="sp-text sp-context"
            data-part="status"
            data-state="rest"
            style="flex: 0 0 auto; height: 18px; font-size: 12px; line-height: 18px; white-space: nowrap; overflow: hidden"
            >${SAID.rest}</span
          >
        </div>
      </div>
    </div>
  `;

  const well = part(root, 'well');
  const ring = part(root, 'ring');
  const dropLabel = part(root, 'drop-label');
  const status = part(root, 'status');

  const say = (state: keyof typeof SAID) => {
    status.dataset.state = state;
    status.textContent = SAID[state] ?? '';
  };

  const arm = (on: boolean) => {
    flag(well, 'data-over', on);
    ring.style.opacity = on ? '1' : '0';
    dropLabel.style.opacity = on ? '1' : '0';
  };

  const inside = (event: PointerEvent) => {
    const box = well.getBoundingClientRect();
    return event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  };

  for (const key of TRAY) {
    const source = part(root, `tray-${key}`);
    let held = false;

    source.addEventListener('pointerdown', (event) => {
      held = true;
      // Mandatory and invisible to every scripted pass: without it a reader's drag stops
      // reporting the moment the pointer leaves the thumbnail. Guarded, because a
      // synthesized pointer cannot be captured and the call would throw (SPEC §7).
      if (event.isTrusted) source.setPointerCapture(event.pointerId);
    });

    source.addEventListener('pointermove', (event) => {
      if (!held) return;
      const over = inside(event);
      arm(over);
      if (over) say('over');
    });

    const release = (event: PointerEvent) => {
      if (!held) return;
      held = false;
      const dropped = inside(event);
      arm(false);
      if (!dropped) return say('rest');
      // The well takes the picture it was given; the tray keeps its copy.
      well.dataset.photo = key;
      well.style.background = PHOTOS[key]?.wash ?? '';
      say('dropped');
    };

    source.addEventListener('pointerup', release);
    source.addEventListener('pointercancel', release);
  }
}
