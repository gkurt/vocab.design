import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'true' | 'false';

const CAPTION: Record<Mode, string> = {
  true: 'The ornament still paints, pixel for pixel. It is simply not in the tree, so nothing reads it out.',
  false: 'Same pixels, and now the reader announces the decoration one character name at a time.',
};

/**
 * aria-hidden specimen: an article header whose ornament is decoration, beside the three
 * lines a screen reader would read from it. Flipping the attribute changes nothing the eye
 * can see and adds a node to the readout, which is the whole claim: the two trees disagree
 * on purpose.
 *
 * The subject is the ornament itself, the narrowest element the attribute sits on (SPEC §5).
 * The header card around it is what the attribute is applied inside, not the term. The
 * segmented control, the tree pane and the caption are scenery in the context register, and
 * `false` is the counter-example the subject passes through, so the honest condition lives
 * in `data-pose` and the mount state satisfies it (SPEC §6).
 *
 * The ornament's node is always in the readout's flow and only its opacity changes, so a
 * node arriving cannot move the lines under it (SPEC §5), and each segment reaches its own
 * value rather than flipping the one it found (SPEC §8).
 *
 * The pane was headed "What the screen reader reads", which was the site explaining the
 * drawing. The pane really is an accessibility tree inspector, roles and names in rows, so it
 * is labelled with the instrument's own name instead.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 446px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="true" data-axis="aria-hidden" data-term="true" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-true" value="true">true</button>
            <button class="sp-segment" data-part="seg-false" value="false">false</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="card"
             style="margin-top: 8px; padding: 8px 12px; display: flex; flex-direction: column;
                    align-items: center; gap: 4px">
          <span class="sp-heading" data-part="title" style="font-size: 14px">Field notes</span>
          <span data-part="ornament" data-subject data-pose='[aria-hidden="true"]' aria-hidden="true"
                style="color: var(--sp-muted); font-size: 13px; letter-spacing: 7px; line-height: 1.1">&#10022; &#10022; &#10022;</span>
          <span class="sp-label" style="font-size: 11px">Ada Lovelace &middot; March</span>
        </div>

        <div class="sp-context" style="margin-top: 9px">
          <span class="sp-label">Accessibility tree</span>
          <div class="sp-stack" style="margin-top: 6px; gap: 2px">
            <div class="sp-menu-item" data-part="node-title" style="padding: 4px 8px; gap: 6px; cursor: default">
              <span style="color: var(--sp-accent); font-weight: 600">heading</span>
              <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">&ldquo;Field notes&rdquo;</span>
            </div>
            <div class="sp-menu-item" data-part="node-ornament"
                 style="padding: 4px 8px; gap: 6px; cursor: default; opacity: 0; transition: opacity 0.18s">
              <span style="color: var(--sp-accent); font-weight: 600">text</span>
              <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">&ldquo;black four pointed star&rdquo; &times;3</span>
            </div>
            <div class="sp-menu-item" data-part="node-byline" style="padding: 4px 8px; gap: 6px; cursor: default">
              <span style="color: var(--sp-accent); font-weight: 600">text</span>
              <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">&ldquo;Ada Lovelace, March&rdquo;</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="true"
           style="margin: 8px 0 0; height: 34px; font-size: 11px">${CAPTION.true}</p>
      </div>
    </div>
  `;

  const ornament = part(root, 'ornament');
  const node = part(root, 'node-ornament');
  const caption = part(root, 'caption');

  const apply = (mode: Mode) => {
    ornament.setAttribute('aria-hidden', mode);
    node.style.opacity = mode === 'true' ? '0' : '1';
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
