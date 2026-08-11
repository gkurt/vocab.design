import { part } from '#src/kit/parts.ts';

const PAGES = [
  { title: 'Capture anything', tag: 'Welcome' },
  { title: 'Find it later', tag: 'Search' },
  { title: 'Share a shelf', tag: 'Together' },
] as const;

/**
 * Page indicator specimen: the dots under a three screen onboarding flow. The
 * subject is the dot row alone, since that row is the term: the screens it counts
 * are the thing being paged through, not the indicator.
 *
 * Every dot is an absolute destination, so a press means that page whichever one
 * was showing (SPEC §8). The current dot is marked by fill and by scale, which
 * takes no room, so the row never re-spaces itself as the pages change (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const screens = PAGES.map(
    ({ title, tag }, i) => `
      <div
        class="sp-stack"
        data-part="page-${i + 1}"
        role="group"
        aria-label="Page ${i + 1} of ${PAGES.length}"
        style="flex: 0 0 100%; height: 100%; align-items: center; justify-content: center; gap: 10px; padding: 0 24px"
      >
        <div class="sp-swatch" style="width: 56px; height: 56px; --sp-swatch: var(--sp-sunken)"></div>
        <span class="sp-label">${tag}</span>
        <span class="sp-heading">${title}</span>
        <div class="sp-line" style="width: 82%"></div>
        <div class="sp-line" style="width: 62%"></div>
      </div>`,
  ).join('');

  const dots = PAGES.map(
    (_, i) => `
      <button
        class="sp-icon-button"
        type="button"
        data-part="dot-${i + 1}"
        aria-label="Page ${i + 1} of ${PAGES.length}"
        style="width: 20px; height: 20px"
      >
        <span
          data-part="pip-${i + 1}"
          aria-hidden="true"
          style="width: 9px; height: 9px; border-radius: 50%; background: var(--sp-line); transition: background-color 0.2s ease, scale 0.2s var(--sp-ease)"
        ></span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 280px; height: 250px">
        <div class="sp-context sp-grow" style="overflow: hidden">
          <div
            class="sp-row"
            data-part="track"
            data-index="0"
            style="height: 100%; gap: 0; align-items: stretch; translate: 0 0; transition: translate 0.34s var(--sp-ease)"
          >${screens}</div>
        </div>
        <div
          class="sp-row"
          data-part="dots"
          data-subject
          role="group"
          aria-label="Pages"
          style="flex: 0 0 auto; justify-content: center; gap: 6px; padding: 12px 0 14px"
        >${dots}</div>
      </div>
    </div>
  `;

  const track = part(root, 'track');
  const screensOf = PAGES.map((_, i) => part(root, `page-${i + 1}`));
  const buttons = PAGES.map((_, i) => part(root, `dot-${i + 1}`));
  const pips = PAGES.map((_, i) => part(root, `pip-${i + 1}`));

  let index = 0;

  const go = (to: number) => {
    index = Math.min(PAGES.length - 1, Math.max(0, to));
    track.dataset.index = String(index);
    track.style.translate = `${index * -100}% 0`;
    screensOf.forEach((screen, i) => {
      screen.setAttribute('aria-hidden', String(i !== index));
    });
    buttons.forEach((button, i) => {
      if (i === index) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    pips.forEach((pip, i) => {
      // Fill and size, not tint alone: the current page has to survive a black and
      // white screenshot, and scale costs the row no width.
      pip.style.background = i === index ? 'var(--sp-accent)' : 'var(--sp-line)';
      pip.style.scale = i === index ? '1.35' : '1';
    });
  };

  buttons.forEach((button, i) => {
    button.addEventListener('click', () => go(i));
  });

  go(0);
}
