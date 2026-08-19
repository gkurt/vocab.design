import { flag, part } from '#src/kit/parts.ts';

type Frame = { id: string; name: string; wash: string };

/** Stand-ins for photographs: paint through the kit's swatch hook, never a request. */
const FRAMES = [
  { id: '1', name: 'Harbour wall, dusk', wash: 'linear-gradient(140deg, #5b8def, #9b6ef3)' },
  { id: '2', name: 'Ferry slip, low tide', wash: 'linear-gradient(140deg, #2fb8a5, #3d7ff2)' },
  { id: '3', name: 'Kestrel over the dunes', wash: 'linear-gradient(140deg, #f6c15b, #ef7d5a)' },
  { id: '4', name: 'Boatyard, first light', wash: 'linear-gradient(140deg, #f2913d, #d9455f)' },
  { id: '5', name: 'Cliff path, rain', wash: 'linear-gradient(140deg, #7b8794, #3b4551)' },
  { id: '6', name: 'Salt flats, noon', wash: 'linear-gradient(140deg, #b0e0a8, #3f9f7f)' },
  { id: '7', name: 'Old pier, long exposure', wash: 'linear-gradient(140deg, #6a5acd, #22203f)' },
  { id: '8', name: 'Storm light, harbour', wash: 'linear-gradient(140deg, #f5a05a, #7a3b8f)' },
] as const satisfies readonly Frame[];

const RAIL_H = 200;

/**
 * Filmstrip specimen: a rail of eight frames beside the one being looked at. The rail
 * holds more than fits, so it scrolls without the pane beside it moving; picking a
 * frame changes the pane and moves the current marker, and the rail never advances on
 * its own.
 *
 * The subject is the rail, `data-part="rail"`: the term names the strip, not the
 * thumbnails in it (that word is `thumbnail`) and not the pane it drives, which is
 * `.sp-context` here along with the window chrome. The rail is honestly a filmstrip in
 * every state, so no `data-pose` condition is needed.
 *
 * Both regions are fixed sizes and the caption has a reserved line, so scrolling the
 * rail and changing the frame move nothing (SPEC §5). A thumbnail press selects that
 * frame rather than stepping, so a pass resumed anywhere lands the same way (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const thumbs = FRAMES.map(
    (frame) => `
      <button
        class="sp-button sp-button--ghost"
        type="button"
        data-part="thumb-${frame.id}"
        aria-label="Frame ${frame.id}, ${frame.name}"
        style="flex: 0 0 auto; height: 54px; padding: 3px"
      >
        <span class="sp-swatch" style="display: block; width: 100%; height: 100%; --sp-swatch: ${frame.wash}"></span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 266px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kirkwall, roll 12</span>
          <span class="sp-label" style="font-size: 11px">8 frames</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: row; gap: 12px">
          <div
            class="sp-stack sp-scroll"
            data-part="rail"
            data-subject
            role="listbox"
            aria-label="Frames"
            style="flex: 0 0 auto; width: 96px; height: ${RAIL_H}px; gap: 8px; padding: 6px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${thumbs}</div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; min-width: 0">
            <span class="sp-swatch" data-part="preview" data-frame="1" style="height: 168px; --sp-swatch: ${FRAMES[0]?.wash}"></span>
            <span class="sp-text sp-text--ink" data-part="caption" style="height: 24px; font-size: 12px; line-height: 24px; white-space: nowrap; overflow: hidden"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const preview = part(root, 'preview');
  const caption = part(root, 'caption');

  const show = (id: string) => {
    const frame = FRAMES.find((candidate) => candidate.id === id);
    if (!frame) return;
    preview.dataset.frame = frame.id;
    preview.style.setProperty('--sp-swatch', frame.wash);
    caption.textContent = `${frame.id} of ${FRAMES.length} · ${frame.name}`;
    for (const other of FRAMES) {
      const thumb = part(root, `thumb-${other.id}`);
      const on = other.id === frame.id;
      flag(thumb, 'data-selected', on);
      if (on) thumb.setAttribute('aria-current', 'true');
      else thumb.removeAttribute('aria-current');
    }
  };

  for (const frame of FRAMES) part(root, `thumb-${frame.id}`).addEventListener('click', () => show(frame.id));

  show('1');
}
