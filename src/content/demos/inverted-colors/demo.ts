import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'off' | 'classic' | 'smart';

const MODE = {
  off: {
    photo: 'As shipped. A sunset is a sunset.',
    shadow: 'Reads as depth: dark paint under a raised card.',
    caption: 'No filter. Every colour is the one the design chose, which is also the only state most teams ever look at.',
  },
  classic: {
    photo: 'Flipped to a negative. The sky is orange, the hills are pink.',
    shadow: 'Reads as a glow: the dark blur came back as a bright halo.',
    caption:
      'Classic Invert negates every pixel on the way to the display, photographs and video included. Nothing opts out and no markup is consulted.',
  },
  smart: {
    photo: 'Held back, still itself. The heuristic caught this one.',
    shadow: 'Still a glow. Elevation is painted, so it inverts with everything else.',
    caption:
      'Smart Invert spares images, video and interface that is already dark. It reads the rendered result, so it is a heuristic, and it can do nothing about a shadow.',
  },
} as const satisfies Record<Mode, unknown>;

/**
 * Inverted colors specimen: a phone screen under the OS colour filter, with a pick between the
 * filter off, Classic Invert and Smart Invert. The inversion is a real CSS filter over the whole
 * screen rather than a restyle, which is the only way the two failures show up honestly: the
 * photograph coming back as a negative, and the card's shadow coming back as a halo.
 *
 * The subject is the photograph. It is the element the inversion visibly gets wrong, and the one
 * element the two invert modes disagree about, so it is where the term lands (SPEC §5). The
 * screen, the card, the shadow and the three readouts are scenery. A photograph with no filter
 * over it is not the term, and Smart Invert holds it back, so the honest condition is Classic
 * Invert, declared in `data-pose`, and the mount state satisfies it (SPEC §6).
 *
 * The card states its shadow inline rather than taking the kit token, for the reason the kit's
 * own neubrutalism note gives: a specimen whose shadow the context register deleted would be
 * demonstrating nothing. Every readout holds a fixed box, so switching filter moves nothing
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const readout = (label: string, name: string, height: number, value: string) => `
    <span class="sp-label" style="font-size: 10px">${label}</span>
    <p class="sp-text sp-text--ink" data-part="${name}" data-mode="classic"
       style="margin: 2px 0 0; height: ${height}px; font-size: 11px; line-height: 1.35">${value}</p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Display, colour filters</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="classic" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-off" value="off"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Off</button>
            <button class="sp-segment" type="button" data-part="seg-classic" value="classic"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Classic</button>
            <button class="sp-segment" type="button" data-part="seg-smart" value="smart"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Smart</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 10px">
          <div class="sp-frame" data-part="screen" data-mode="classic"
               style="flex: 0 0 auto; width: 236px; height: 226px; padding: 12px; gap: 9px;
                      background: var(--sp-bg); filter: invert(1); transition: filter 0.3s ease">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Reading list</span>

            <div style="flex: 0 0 auto; padding: 10px; border-radius: var(--sp-radius);
                        background: var(--sp-surface); border: 1px solid var(--sp-line);
                        box-shadow: 0 8px 22px rgb(16 24 40 / 0.42)">
              <div data-part="photo" data-subject data-invert="classic" data-pose="[data-invert=classic]"
                   style="position: relative; height: 78px; border-radius: 6px; overflow: hidden;
                          background: linear-gradient(180deg, #74b6e4 0%, #ffd39c 60%, #ea9a5c 100%)">
                <span style="position: absolute; left: 24px; top: 13px; width: 24px; height: 24px;
                             border-radius: 50%; background: #fff2c2"></span>
                <span style="position: absolute; left: -24px; bottom: 0; width: 150px; height: 40px;
                             border-radius: 50% 50% 0 0; background: #4f6b4c"></span>
                <span style="position: absolute; right: -20px; bottom: 0; width: 130px; height: 30px;
                             border-radius: 50% 50% 0 0; background: #3a5540"></span>
              </div>
              <p class="sp-text sp-text--ink" style="margin: 8px 0 0; font-size: 12.5px; font-weight: 600">
                The long way to Cape Wrath</p>
              <p class="sp-text" style="margin: 3px 0 0; font-size: 11px">Nine days on foot, saved for later</p>
              <div class="sp-row" style="gap: 8px; margin-top: 9px">
                <button class="sp-button sp-button--sm" type="button" style="font-size: 11.5px">Read now</button>
                <button class="sp-button sp-button--quiet sp-button--sm" type="button"
                        style="font-size: 11.5px">Remove</button>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <div>${readout('Photograph', 'photo-verdict', 30, MODE.classic.photo)}</div>
            <div>${readout('Card shadow', 'shadow-verdict', 30, MODE.classic.shadow)}</div>
            <div>${readout('What the OS did', 'caption', 72, MODE.classic.caption)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const photo = part(root, 'photo');
  const photoVerdict = part(root, 'photo-verdict');
  const shadowVerdict = part(root, 'shadow-verdict');
  const caption = part(root, 'caption');

  const apply = (mode: Mode) => {
    const rule = MODE[mode];
    screen.dataset.mode = mode;
    screen.style.filter = mode === 'off' ? 'none' : 'invert(1)';
    photo.dataset.invert = mode;
    // Smart Invert holds the picture back, which on a screen already flipped means inverting it
    // a second time: the same trick the OS plays, in the one place a demo can play it.
    photo.style.filter = mode === 'smart' ? 'invert(1)' : 'none';

    for (const [el, text] of [
      [photoVerdict, rule.photo],
      [shadowVerdict, rule.shadow],
      [caption, rule.caption],
    ] as const) {
      el.dataset.mode = mode;
      el.textContent = text;
    }
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('classic');
}
