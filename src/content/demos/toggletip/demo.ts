import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const EDGE_MARGIN = 8;
const TIP_WIDTH = 230;

/** Written on every open, not merely revealed: a live region announces changes, not contents. */
const TIP_HTML = `
  <p class="sp-text" style="margin: 0">Keys are created under Settings, then Developers. Rotating one revokes the old key immediately.</p>
  <a href="#" data-part="tip-link" style="display: inline-block; margin-top: 8px; font-size: 13px; color: var(--sp-accent)">Read the key policy</a>
`;

/**
 * Toggletip specimen: the "i" beside a field label opens a tip on click, never on
 * hover, which is what lets it hold a link and what makes it work by touch and by
 * keyboard. The tip overlays the form rather than joining it, so opening moves
 * nothing. Its content is written into a live region each time it opens, since a
 * click-revealed tip has no other way of reaching a screen reader.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Integrations</span></div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 12px">
            <div class="sp-field">
              <div class="sp-row" style="gap: 2px">
                <label class="sp-label" for="api-key">API key</label>
                <button class="sp-icon-button" data-part="info-button" aria-label="More information about the API key">
                  <span aria-hidden="true" style="display: flex; align-items: center; justify-content: center; width: 15px; height: 15px; border: 1.4px solid currentcolor; border-radius: 50%; font-size: 10px; font-weight: 700; line-height: 1">i</span>
                </button>
              </div>
              <input class="sp-input" id="api-key" data-part="key-input" placeholder="sk_live_..." />
            </div>
            <div class="sp-field">
              <label class="sp-label" for="webhook">Webhook URL</label>
              <input class="sp-input" id="webhook" placeholder="https://example.com/hooks" />
            </div>
          </div>
        </div>
        <div class="sp-popover" data-part="tip" data-subject role="status" style="width: ${TIP_WIDTH}px"></div>
      </div>
    </div>
  `;

  const frame = root.querySelector('.sp-frame') as HTMLElement;
  const button = part(root, 'info-button');
  const tip = part(root, 'tip');

  // Anchored once on mount (SPEC §5): the tip is out of flow and its width is fixed,
  // so nothing in the form has to make room for it when it arrives.
  const rect = localBox(button, frame);
  const center = rect.left + rect.width / 2;
  const left = Math.min(Math.max(center - 26, EDGE_MARGIN), frame.offsetWidth - TIP_WIDTH - EDGE_MARGIN);
  tip.style.left = `${left}px`;
  tip.style.top = `${rect.top + rect.height + 8}px`;
  tip.style.setProperty('--sp-arrow-x', `${center - left - 4}px`);

  const setOpen = (open: boolean) => {
    if (open) tip.innerHTML = TIP_HTML;
    flag(tip, 'data-open', open);
    flag(button, 'data-open', open);
  };

  // The trigger toggles, and here the toggling is the term (SPEC §8): the script
  // drives both directions itself, so no pass can leave the tip in the wrong state.
  button.addEventListener('click', () => setOpen(!tip.hasAttribute('data-open')));

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!tip.contains(target) && !button.contains(target)) setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  // The link is the point of the pattern, not a destination: a specimen never navigates.
  tip.addEventListener('click', (event) => {
    if ((event.target as Element | null)?.closest('a')) event.preventDefault();
  });
}
