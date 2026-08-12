import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const PANEL = 148;

/**
 * Off canvas specimen: the panel is drawn where it actually lives, in the strip beyond the
 * viewport's left edge, and slides in over the content when the trigger asks for it. A real
 * page clips that strip away (`overflow-x: hidden` on the wrapper, which is the point of the
 * technique); the specimen leaves it showing, because where the panel waits is the term and
 * a demo that hid it would be demonstrating a drawer.
 *
 * The subject is the panel. The viewport it slides into, the strip it waits in, the trigger,
 * and the scrim are the scene, so they carry the context register (SPEC §5).
 *
 * The slide is an inline transition, so the kit's reduced-motion rule outranks it and the
 * open state lands instantly for a reader who asked for less movement.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 6px">
      <div class="sp-row" style="align-items: stretch; gap: 0">
        <div
          class="sp-context"
          data-part="strip"
          style="flex: 0 0 ${PANEL}px; border: 1px dashed var(--sp-line); border-right: 0; border-radius: var(--sp-radius) 0 0 var(--sp-radius)"
        ></div>
        <div class="sp-frame" style="width: 320px; height: 236px; overflow: visible">
          <div class="sp-topbar sp-context">
            <button class="sp-icon-button" data-part="trigger" aria-label="Open sections">${icon('menu')}</button>
            <span class="sp-heading sp-grow">Almanac</span>
          </div>
          <div class="sp-body sp-context">
            <div class="sp-stack">
              <span class="sp-heading">Spring tides</span>
              <div class="sp-line" style="width: 94%"></div>
              <div class="sp-line" style="width: 86%"></div>
              <div class="sp-line" style="width: 90%"></div>
              <div class="sp-line" style="width: 62%"></div>
            </div>
          </div>
          <div class="sp-scrim sp-context" data-part="scrim"></div>
          <nav
            data-part="panel"
            data-subject
            aria-label="Sections"
            style="position: absolute; top: 0; bottom: 0; left: -${PANEL}px; width: ${PANEL}px; display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius) 0 0 var(--sp-radius); transform: translateX(0); transition: transform 0.26s var(--sp-ease)"
          >
            <div class="sp-row">
              <span class="sp-heading sp-grow">Sections</span>
              <button class="sp-icon-button" data-part="close" aria-label="Close">${icon('close')}</button>
            </div>
            <ul class="sp-nav">
              <li><span class="sp-nav-item" data-current>Tides</span></li>
              <li><span class="sp-nav-item">Moon</span></li>
              <li><span class="sp-nav-item">Sunrise</span></li>
              <li><span class="sp-nav-item">Weather</span></li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 0; width: 468px">
        <span class="sp-label" style="flex: 0 0 ${PANEL}px; text-align: center">off canvas</span>
        <span class="sp-label" style="flex: 1 1 auto; text-align: center">viewport</span>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const scrim = part(root, 'scrim');

  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    flag(scrim, 'data-open', open);
    panel.style.transform = `translateX(${open ? PANEL : 0}px)`;
  };

  // The trigger opens and dismissal is explicit, so a script can never reach the state it
  // did not ask for (SPEC §8).
  part(root, 'trigger').addEventListener('click', () => setOpen(true));
  part(root, 'close').addEventListener('click', () => setOpen(false));
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  setOpen(false);
}
