import { flag, part } from '#src/kit/parts.ts';

const SHOTS = [
  { key: '1', name: 'Harbour, dusk', wash: 'linear-gradient(135deg, #5b8def, #9b6ef3)' },
  { key: '2', name: 'Rooftop, noon', wash: 'linear-gradient(135deg, #f2913d, #e0554f)' },
  { key: '3', name: 'Estuary, dawn', wash: 'linear-gradient(135deg, #2fb8a5, #3d7ff2)' },
  { key: '4', name: 'Terrace, rain', wash: 'linear-gradient(135deg, #f6c15b, #ef7d5a)' },
];

/**
 * Thumbnail specimen: a filmstrip of previews under the pane they open. The
 * subject is one thumbnail, not the strip: the word names the small stand-in
 * image, and the peers beside it stay in the normal register because they are
 * more of the same thing rather than scenery.
 *
 * Every thumbnail is the same box whatever it stands for, which is the cropping
 * decision the term is about, and the pane and its caption are fixed height so a
 * different pick moves nothing (SPEC §5). Selection is set, never flipped (§8).
 */
export function mount(root: HTMLElement): void {
  const strip = SHOTS.map(
    ({ key, name, wash }) => `
      <button
        class="sp-button sp-button--ghost"
        type="button"
        data-part="thumb-${key}"
        ${key === '2' ? 'data-subject' : ''}
        aria-label="${name}"
        style="padding: 3px; width: 62px; height: 46px; flex: 0 0 auto"
      >
        <span class="sp-swatch" style="display: block; width: 100%; height: 100%; --sp-swatch: ${wash}"></span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Shoot 04</span></div>
        <div class="sp-body sp-context">
          <div class="sp-swatch" data-part="preview" style="height: 100px; --sp-swatch: ${SHOTS[0]?.wash}"></div>
          <div class="sp-text sp-text--ink" data-part="caption" style="margin: 8px 2px 10px; min-height: 20px">${SHOTS[0]?.name}</div>
        </div>
        <div class="sp-row" data-part="strip" style="flex: 0 0 auto; gap: 8px; padding: 0 12px 12px">${strip}</div>
      </div>
    </div>
  `;

  const preview = part(root, 'preview');
  const caption = part(root, 'caption');
  const thumbs = SHOTS.map((shot) => ({ shot, el: part(root, `thumb-${shot.key}`) }));

  const show = (key: string) => {
    for (const { shot, el } of thumbs) {
      const on = shot.key === key;
      flag(el, 'data-selected', on);
      if (on) {
        el.setAttribute('aria-current', 'true');
        preview.style.setProperty('--sp-swatch', shot.wash);
        caption.textContent = shot.name;
      } else el.removeAttribute('aria-current');
    }
  };

  for (const { shot, el } of thumbs) el.addEventListener('click', () => show(shot.key));
  show('1');
}
