import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'depth' | 'flat';

const VERDICT: Record<Mode, string> = {
  depth: 'The pre-2013 treatment: a gloss on the artwork, a bevel on the button, a rounded corner and a cast shadow under the card.',
  flat: 'Every depth cue refused. A solid fill, one hairline edge and colour carry the whole card, and nothing pretends to be lit.',
};

/**
 * Flat design specimen: one card, and a switch between refusing every depth cue and the
 * treatment flat design replaced. It used to draw both cards at once, side by side with a
 * small word under each, which asks the reader to work out which half is the term and puts
 * the counter-example on stage at equal weight forever (SPEC §5.1). The switch is the
 * exhibit's, so the stage draws it in the strip.
 *
 * The subject is the card, and it is only the term in one of the two states, so the honest
 * condition is declared: identify refuses to pose the glossed state and resets to the mount
 * state, which is flat.
 *
 * Only paint changes between the states. The card's box, its copy and every child's position
 * are identical either way, so flipping the switch moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="flat"
                    data-axis="Flat design" data-term="flat">
        <button class="sp-segment" type="button" data-part="mode-depth" value="depth">Without</button>
        <button class="sp-segment" type="button" data-part="mode-flat" value="flat">With</button>
      </sp-segmented>

      <div data-part="card" data-subject data-mode="flat" data-pose="[data-mode=flat]"
           style="width: 172px; padding: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line)">
        <!-- .sp-swatch and .sp-button both declare no border and .sp-bevel adds a 1px one, so
             every element that takes the bevel reserves that border in the flat state too. The
             card would otherwise grow as the gloss arrives, which is a shift the reader did not
             ask for (SPEC §5). -->
        <div class="sp-swatch" data-part="art"
             style="--sp-swatch: #ef4a4a; height: 78px; border-radius: 0; border: 1px solid transparent"></div>
        <div data-part="title" style="margin-top: 10px; font-weight: 600; font-size: 14px">Night Shift</div>
        <div class="sp-text" style="font-size: 12px">Ora Vance</div>
        <div data-part="track" style="height: 6px; margin-top: 10px; background: var(--sp-sunken)">
          <div data-part="fill" style="width: 46%; height: 100%; background: var(--sp-accent)"></div>
        </div>
        <button class="sp-button" type="button" data-part="play"
                style="width: 100%; margin-top: 12px; border-radius: 0; font-size: 13px;
                       border: 1px solid transparent">Play</button>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="verdict" data-mode="flat"
         style="margin: 0">${VERDICT.flat}</p>
    </div>
  `;

  const card = part(root, 'card');
  const art = part(root, 'art');
  const title = part(root, 'title');
  const track = part(root, 'track');
  const fill = part(root, 'fill');
  const play = part(root, 'play');
  const verdict = part(root, 'verdict');

  const apply = (mode: Mode) => {
    const deep = mode === 'depth';
    card.dataset.mode = mode;
    card.style.borderRadius = deep ? '10px' : '';
    card.style.boxShadow = deep ? '0 6px 14px rgb(16 24 40 / 0.28)' : '';

    art.classList.toggle('sp-bevel', deep);
    art.style.setProperty('--sp-swatch', deep ? '#c03b3b' : '#ef4a4a');
    art.style.borderRadius = deep ? '' : '0';
    art.style.borderColor = deep ? 'rgb(0 0 0 / 0.34)' : 'transparent';

    title.style.textShadow = deep ? '0 1px 0 rgb(255 255 255 / 0.5)' : '';

    track.style.borderRadius = deep ? '999px' : '';
    track.style.boxShadow = deep ? 'inset 0 1px 2px rgb(16 24 40 / 0.4)' : '';
    fill.classList.toggle('sp-bevel', deep);
    fill.style.borderRadius = deep ? '999px' : '';
    fill.style.background = deep ? '#6b7280' : 'var(--sp-accent)';

    play.classList.toggle('sp-bevel', deep);
    play.style.borderRadius = deep ? '' : '0';
    play.style.borderColor = deep ? 'rgb(0 0 0 / 0.34)' : 'transparent';

    verdict.dataset.mode = mode;
    verdict.textContent = VERDICT[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
