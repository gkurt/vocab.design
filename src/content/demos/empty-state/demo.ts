import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Empty state specimen: the screen a container shows when it holds nothing yet.
 * It names the absence, explains what would live here, and offers the one action
 * that ends it, which is what separates it from a blank rectangle.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Projects</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="new">New</button>
        </div>
        <div class="sp-body" style="padding: 0">
          <div class="sp-empty" data-part="empty" data-subject>
            <span class="sp-empty-mark">${icon('inbox')}</span>
            <span class="sp-heading">No projects yet</span>
            <p class="sp-text" style="max-width: 30ch">A project holds your boards, files, and everyone working on them.</p>
            <button class="sp-button sp-button--sm" data-part="cta">Create your first project</button>
          </div>
          <ul class="sp-list sp-context" data-part="list" hidden>
            <li class="sp-list-item"><span class="sp-avatar">N</span><span class="sp-grow">Northwind</span><span class="sp-text">just now</span></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  const empty = part(root, 'empty');
  const list = part(root, 'list');
  const create = () => {
    empty.hidden = true;
    list.hidden = false;
  };

  part(root, 'cta').addEventListener('click', create);
  part(root, 'new').addEventListener('click', create);
}
