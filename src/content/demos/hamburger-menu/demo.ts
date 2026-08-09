import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Hamburger menu specimen: three stacked lines in the corner of a narrow layout,
 * standing in for the navigation that does not fit. The button is the subject;
 * the panel is what it is holding.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 240px">
        <div class="sp-topbar">
          <button class="sp-icon-button" data-part="trigger" data-subject aria-expanded="false" aria-controls="nav" aria-label="Menu">
            ${icon('menu')}
          </button>
          <span class="sp-heading sp-grow sp-context">Field guide</span>
          <span class="sp-avatar sp-context">GK</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-line" style="width: 80%"></div>
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 64%"></div>
            <div class="sp-line" style="width: 86%"></div>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <nav class="sp-drawer" data-part="panel" id="nav" aria-label="Main">
          <span class="sp-label">Menu</span>
          <ul class="sp-nav">
            <li><span class="sp-nav-item" data-current>Species</span></li>
            <li><span class="sp-nav-item">Habitats</span></li>
            <li><span class="sp-nav-item">Tracks</span></li>
            <li><span class="sp-nav-item">Field notes</span></li>
          </ul>
        </nav>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const scrim = part(root, 'scrim');
  const trigger = part(root, 'trigger');
  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    flag(scrim, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  trigger.addEventListener('click', () => setOpen(!panel.hasAttribute('data-open')));
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
