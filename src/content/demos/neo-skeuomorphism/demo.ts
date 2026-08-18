/**
 * Neo-skeuomorphism specimen: the same media widget rendered three ways at once, flat,
 * neumorphic and neo-skeuomorphic, so the two comparisons the term needs are in one frame.
 * Every widget has identical structure, spacing, type sizes and hit targets. Only the paint
 * changes, which is the argument: the revival lays material over a flat-era layout rather
 * than going back to the frames and padding of 2011.
 *
 * The neumorphic copy sits on a room of exactly its own colour, because that is the term: one
 * undifferentiated material extruded from its background at contrast too low to survive a
 * check. The neo-skeuomorphic copy sits on a dark room and is made of two visibly different
 * materials, a brushed faceplate and a glossy tile, lit from one direction, with a specular
 * sweep, a knurled dial and a recessed groove for the track.
 *
 * The paint is inline (over the kit's `.sp-texture` grain and `.sp-bevel` lit face) because
 * the materials are the term. The kit is deliberately flat, with one shadow and no gradient,
 * so a material widget assembled from kit tokens would be demonstrating the kit.
 *
 * The subject is the neo-skeuomorphic widget, not the row and not its room: the term names a
 * register spent on an interface surface, and that widget is the narrowest thing on stage
 * that actually is one (SPEC §5). The flat and neumorphic copies are the evidence, and they,
 * the labels and the caption are scenery.
 *
 * Static: three widgets set side by side have no states, so there is nothing to animate and
 * no clock to take.
 */
const TILE_W = 140;
const WIDGET_W = 126;
const WIDGET_H = 128;

/** Transport glyphs, drawn rather than iconized: the kit's set has no transport controls. */
const GLYPH = {
  play: '<path d="M4 2.5 11 7l-7 4.5z"/>',
  prev: '<path d="M10 2.5 4.4 7 10 11.5z"/><rect x="2.4" y="2.5" width="1.8" height="9" rx="0.6"/>',
  next: '<path d="M4 2.5 9.6 7 4 11.5z"/><rect x="9.8" y="2.5" width="1.8" height="9" rx="0.6"/>',
} as const;

function glyph(name: keyof typeof GLYPH, size: number): string {
  return `<svg viewBox="0 0 14 14" width="${size}" height="${size}" role="presentation" fill="currentColor" style="display: block">${GLYPH[name]}</svg>`;
}

/** Everything one register paints. The structure below never changes; only these do. */
type Skin = {
  key: string;
  room: string;
  widget: string;
  art: string;
  artClass: string;
  title: string;
  sub: string;
  track: string;
  fill: string;
  transport: string;
  play: string;
  playClass: string;
  playInk: string;
  dial: string;
  /** An extra layer over the faceplate, for the register that has a specular sweep. */
  sheen: string;
};

const FLAT: Skin = {
  key: 'flat',
  room: 'background: #f2f4f8',
  widget: 'background: #ffffff; border-radius: 10px',
  art: 'background: #3d6bf0; border-radius: 7px',
  artClass: '',
  title: 'color: #1c2230',
  sub: 'color: #6b7385',
  track: 'background: #dde1ea; border-radius: 999px',
  fill: 'background: #3d6bf0',
  transport: 'color: #6b7385',
  play: 'background: #3d6bf0; border-radius: 50%',
  playClass: '',
  playInk: '#ffffff',
  dial: 'background: #dde1ea; border-radius: 50%',
  sheen: '',
};

const NEUMORPHIC: Skin = {
  key: 'neu',
  room: 'background: #e8ebf0',
  widget: 'background: #e8ebf0; border-radius: 16px; box-shadow: 6px 6px 13px rgb(163 170 184 / 0.62), -6px -6px 13px #ffffff',
  art: 'background: #e8ebf0; border-radius: 10px; box-shadow: 4px 4px 8px rgb(163 170 184 / 0.6), -4px -4px 8px #ffffff',
  artClass: '',
  title: 'color: #5f6675',
  sub: 'color: #9aa1af',
  track: 'background: #e8ebf0; border-radius: 999px; box-shadow: inset 2px 2px 4px rgb(163 170 184 / 0.75), inset -2px -2px 4px #ffffff',
  fill: 'background: #c6cbd6',
  transport: 'color: #969db0',
  play: 'background: #e8ebf0; border-radius: 50%; box-shadow: 3px 3px 7px rgb(163 170 184 / 0.62), -3px -3px 7px #ffffff',
  playClass: '',
  playInk: '#8e95a6',
  dial: 'background: #e8ebf0; border-radius: 50%; box-shadow: 3px 3px 6px rgb(163 170 184 / 0.6), -3px -3px 6px #ffffff',
  sheen: '',
};

const NEO: Skin = {
  key: 'neo',
  room: 'background: #212429',
  widget: [
    '--sp-texture-base: #4b5059',
    '--sp-texture-angle: 90deg',
    'border-radius: 11px',
    'box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.42), inset 0 -1px 0 rgb(0 0 0 / 0.55), 0 7px 15px rgb(0 0 0 / 0.55)',
  ].join('; '),
  art: 'background-color: #3d6bf0; border-radius: 7px',
  artClass: ' sp-bevel',
  title: 'color: #f1f3f7',
  sub: 'color: #aab1be',
  track: 'background: #2b2e35; border-radius: 999px; box-shadow: inset 0 2px 3px rgb(0 0 0 / 0.75), inset 0 -1px 0 rgb(255 255 255 / 0.14)',
  fill: 'background: linear-gradient(#9dbcff, #3d6bf0); border-radius: 999px; box-shadow: 0 0 6px rgb(93 137 255 / 0.6)',
  transport: 'color: #ccd2dd',
  play: 'background-color: #3d6bf0; border-radius: 50%',
  playClass: ' sp-bevel',
  playInk: '#ffffff',
  dial: [
    'border-radius: 50%',
    'background-image: repeating-conic-gradient(#6d7480 0deg 5deg, #40454e 5deg 10deg), radial-gradient(circle at 34% 26%, rgb(255 255 255 / 0.5), rgb(255 255 255 / 0) 62%)',
    'box-shadow: inset 0 0 0 2px #565c66, inset 0 1px 0 rgb(255 255 255 / 0.4), 0 2px 4px rgb(0 0 0 / 0.6)',
  ].join('; '),
  sheen:
    'position: absolute; inset: 0; border-radius: 11px; pointer-events: none; background: linear-gradient(116deg, rgb(255 255 255 / 0.26) 0%, rgb(255 255 255 / 0.02) 38%, rgb(255 255 255 / 0.12) 62%, rgb(0 0 0 / 0.12) 100%)',
};

/** One media widget. The markup is identical for every register; only the skin differs. */
function widget(skin: Skin, subject: boolean): string {
  const transportButton = (name: keyof typeof GLYPH, size: number): string => `
    <span aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; ${skin.transport}">
      ${glyph(name, size)}
    </span>`;

  return `
    <div class="${skin.key === 'neo' ? 'sp-texture' : ''}" data-part="widget-${skin.key}"${subject ? ' data-subject' : ''}
         style="position: relative; overflow: hidden; display: flex; flex-direction: column; width: ${WIDGET_W}px;
                height: ${WIDGET_H}px; padding: 9px; ${skin.widget}">
      ${skin.sheen ? `<span aria-hidden="true" data-part="${skin.key}-sheen" style="${skin.sheen}"></span>` : ''}

      <div class="sp-row" style="position: relative; gap: 8px">
        <span data-part="${skin.key}-art" class="${skin.artClass.trim()}" aria-hidden="true"
              style="flex: 0 0 34px; height: 34px; ${skin.art}"></span>
        <span class="sp-grow" style="display: flex; flex-direction: column; gap: 3px">
          <span style="font-size: 12px; font-weight: 600; line-height: 1.1; ${skin.title}">Nightjar</span>
          <span style="font-size: 10px; line-height: 1.1; ${skin.sub}">Kettle Run</span>
        </span>
      </div>

      <div data-part="${skin.key}-track" aria-hidden="true"
           style="position: relative; overflow: hidden; height: 6px; margin-top: 10px; ${skin.track}">
        <span style="position: absolute; left: 0; top: 0; bottom: 0; width: 58%; ${skin.fill}"></span>
      </div>

      <div class="sp-row sp-row--between" style="position: relative; margin-top: 4px; ${skin.sub}">
        <span style="font-size: 9px; line-height: 1.2">1:48</span>
        <span style="font-size: 9px; line-height: 1.2">3:06</span>
      </div>

      <div class="sp-row sp-row--between" style="position: relative; margin-top: auto">
        <div class="sp-row" style="gap: 4px">
          ${transportButton('prev', 12)}
          <span data-part="${skin.key}-play" class="${skin.playClass.trim()}" aria-hidden="true"
                style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px;
                       color: ${skin.playInk}; ${skin.play}">
            ${glyph('play', 12)}
          </span>
          ${transportButton('next', 12)}
        </div>
        <span data-part="${skin.key}-dial" aria-hidden="true" style="width: 24px; height: 24px; ${skin.dial}"></span>
      </div>
    </div>`;
}

/** One column of the tour: the register's room with its widget in it, then what it is showing. */
function column(skin: Skin, label: string, note: string, subject: boolean): string {
  return `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="flex: 0 0 ${TILE_W}px; gap: 5px; align-items: stretch">
      <div data-part="tile-${skin.key}"
           style="display: flex; align-items: center; justify-content: center; width: ${TILE_W}px; height: ${WIDGET_H + 14}px;
                  border-radius: 6px; ${skin.room}">
        ${widget(skin, subject)}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">One widget, three amounts of matter</span>

        <div class="sp-row" data-part="tour" style="gap: 9px; align-items: flex-start; justify-content: center">
          ${column(FLAT, 'Flat', 'Colour and space. No depth at all.', false)}
          ${column(NEUMORPHIC, 'Neumorphic', 'One material, extruded, at very low contrast.', false)}
          ${column(NEO, 'Neo-skeuomorphic', 'Two materials, lit, at real contrast.', true)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Same spacing, same type, same hit targets. Only the material came back.
      </p>
    </div>
  `;
}
