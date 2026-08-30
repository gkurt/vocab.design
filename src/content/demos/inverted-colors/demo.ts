import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'off' | 'classic' | 'smart';

const VERDICT = {
  off: 'The sunset is a sunset, and the card sits on dark paint.',
  classic: 'The sky came back orange, and the card sits in a bright halo.',
  smart: 'The photograph was spared. The halo under the card is unchanged.',
} as const satisfies Record<Mode, string>;

/**
 * Inverted colors specimen: a phone screen under the OS colour filter, with a pick between the
 * filter off, Classic Invert and Smart Invert. The inversion is a real CSS filter over the whole
 * screen rather than a restyle, which is the only way the two failures show up honestly: the
 * photograph coming back as a negative, and the card's shadow coming back as a halo.
 *
 * The subject is the photograph. It is the element the inversion visibly gets wrong, and the one
 * element the two invert modes disagree about, so it is where the term lands (SPEC §5). The
 * screen, the card and its shadow are scenery. A photograph with no filter
 * over it is not the term, and Smart Invert holds it back, so the honest condition is Classic
 * Invert, declared in `data-pose`, and the mount state satisfies it (SPEC §6).
 *
 * The card states its shadow inline rather than taking the kit token, for the reason the kit's
 * own neubrutalism note gives: a specimen whose shadow the context register deleted would be
 * demonstrating nothing.
 *
 * A column of three readouts used to sit beside the screen, under the labels "Photograph",
 * "Card shadow" and "What the OS did", explaining in the site's voice what each invert mode
 * had done and how Smart Invert decides. None of it is anything a phone would print. The
 * explanation is the article's, so it went; the reading of the state is a verdict, so the two
 * picture lines were merged into one `data-stage-verdict` the stage draws in the strip beside
 * the switch that produced it. The window is now only as wide as the screen it holds.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 264px; padding: 12px 14px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="classic" data-axis="Invert" data-term="classic">
          <button class="sp-segment" type="button" data-part="seg-off" value="off">Off</button>
          <button class="sp-segment" type="button" data-part="seg-classic" value="classic">Classic</button>
          <button class="sp-segment" type="button" data-part="seg-smart" value="smart">Smart</button>
        </sp-segmented>
        <p data-stage-verdict data-part="verdict" data-mode="classic">${VERDICT.classic}</p>

        <div class="sp-frame" data-part="screen" data-mode="classic"
             style="width: 236px; height: 226px; padding: 12px; gap: 9px;
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
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const photo = part(root, 'photo');
  const verdict = part(root, 'verdict');

  const apply = (mode: Mode) => {
    screen.dataset.mode = mode;
    screen.style.filter = mode === 'off' ? 'none' : 'invert(1)';
    photo.dataset.invert = mode;
    // Smart Invert holds the picture back, which on a screen already flipped means inverting it
    // a second time: the same trick the OS plays, in the one place a demo can play it.
    photo.style.filter = mode === 'smart' ? 'invert(1)' : 'none';
    verdict.dataset.mode = mode;
    verdict.textContent = VERDICT[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('classic');
}
