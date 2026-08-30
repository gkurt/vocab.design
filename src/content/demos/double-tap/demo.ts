import { flag, part } from '#src/kit/parts.ts';

/** How far the pair of taps takes the picture, and how long the move takes to land. */
const ZOOM = 2;
const ZOOM_EASE = 'transform 0.26s var(--sp-ease)';

/** Stand-in photography: a horizon, a sun, and two headlands, so there is detail to enlarge. */
const PICTURE = `
  <div style="position: absolute; inset: 0; background: linear-gradient(#9fc7e8, #dfeaf2 62%, #cfd9c9)"></div>
  <div style="position: absolute; left: 22%; top: 18%; width: 34px; height: 34px; border-radius: 50%; background: #f6d27a"></div>
  <div style="position: absolute; left: -12%; bottom: 26%; width: 62%; height: 44%; border-radius: 50% 50% 0 0; background: #7d94a3"></div>
  <div style="position: absolute; right: -6%; bottom: 26%; width: 54%; height: 32%; border-radius: 50% 50% 0 0; background: #61798a"></div>
  <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 26%; background: #4d6a7c"></div>
  <div style="position: absolute; left: 30%; bottom: 12%; width: 26px; height: 8px; border-radius: 3px; background: #2f4657"></div>
`;

/**
 * Double tap specimen: a photo where one tap selects and two zoom in on the point
 * that was touched. The subject is the tile both gestures land on, since the term
 * names what the reader does to it rather than any part of the picture.
 *
 * The screen carries the touch persona (`data-touch`), because the pair of taps is
 * a finger's gesture: the script's taps land as a fingertip disc carrying
 * `pointerType: 'touch'`, no hover is dispatched inside it, and the kit hides the
 * native cursor, which is why the tile states no cursor of its own: how far the
 * picture is zoomed reads off the read-out and off `data-zoom` instead.
 *
 * Both behaviours are wired on the same element, because the pair is only legible
 * beside the single tap it is built out of: the first `click` still fires, and the
 * demo lets it. The zoom reaches a state rather than flipping one (SPEC §8), so a
 * second pair leaves the picture where it is and the scenery control is the way
 * back. The scale happens inside a tile of fixed size, so nothing in the scene
 * moves when the picture grows.
 *
 * Under the control there used to be a line reading "One tap picks the photo. Two enlarge it.",
 * which is the site instructing the reader from inside a photo viewer. The gesture and the Fit
 * read-out are the demonstration and the article explains the pair, so it went and the frame
 * gave back the 28px it was holding.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 244px; height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour</span>
          <span class="sp-label" data-part="readout">Fit</span>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="tile"
            data-subject
            role="button"
            tabindex="0"
            style="position: relative; overflow: hidden; width: 196px; height: 148px; user-select: none"
          >
            <div
              data-part="photo"
              data-zoom="1"
              style="position: absolute; inset: 0; transform: scale(1); transform-origin: 50% 50%; transition: ${ZOOM_EASE}"
            >${PICTURE}</div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Fit to frame</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const tile = part(root, 'tile');
  const photo = part(root, 'photo');
  const readout = part(root, 'readout');

  const say = (text: string) => {
    readout.textContent = text;
  };

  // The single tap keeps a job of its own, so nobody is stranded by not knowing the
  // pair exists, and the first click of a pair is never swallowed waiting for it.
  tile.addEventListener('click', () => {
    flag(tile, 'data-selected', true);
    tile.style.borderColor = 'var(--sp-accent)';
    tile.style.boxShadow = '0 0 0 2px var(--sp-accent-soft)';
    if (photo.dataset.zoom === '1') say('Selected');
  });

  tile.addEventListener('dblclick', (event) => {
    const rect = tile.getBoundingClientRect();
    // Two taps enlarge around the spot they landed on, not around the middle.
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    photo.style.transformOrigin = `${x.toFixed(1)}% ${y.toFixed(1)}%`;
    photo.style.transform = `scale(${ZOOM})`;
    photo.dataset.zoom = String(ZOOM);
    say(`Zoomed ${ZOOM}x`);
  });

  part(root, 'reset').addEventListener('click', () => {
    photo.style.transform = 'scale(1)';
    photo.dataset.zoom = '1';
    say(tile.hasAttribute('data-selected') ? 'Selected' : 'Fit');
  });
}
