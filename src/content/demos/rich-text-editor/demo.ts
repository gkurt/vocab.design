import { part } from '#src/kit/parts.ts';

const MODEL: Record<string, string> = {
  plain: 'doc > paragraph, paragraph',
  strong: 'doc > paragraph[strong], paragraph',
  list: 'doc > paragraph[strong], bullet_list[2]',
  empty: 'doc > paragraph(empty)',
};

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px';

/**
 * Rich text editor specimen: the editing surface, not the strip above it. The subject
 * is the pane, since the toolbar is its own term and lives here as scenery: swapping it
 * for a bubble menu or a keyboard shortcut would leave this component unchanged.
 *
 * Two things the surface owns are shown alongside the paint. The readout under the pane
 * is the document model the editor actually keeps, which is what separates this from a
 * box of markup, and the placeholder is what the surface says when the model is empty.
 *
 * Every control lands on an absolute state rather than toggling what it finds (SPEC §8):
 * Bold marks the selection, List converts the second block, New draft empties the
 * document. The pane holds a fixed height, so a paragraph becoming two list items
 * rearranges the document and moves nothing around it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">Draft</span>
        </div>
        <div
          class="sp-row sp-context"
          style="flex: 0 0 auto; gap: 6px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <button
            class="sp-button sp-button--ghost sp-button--sm"
            type="button"
            data-part="fmt-bold"
            data-aim
            aria-label="Bold"
            style="width: 32px; padding: 5px 0; text-align: center; font-weight: 700"
          >B</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fmt-list">List</button>
          <span class="sp-label sp-grow" style="text-align: right; font-size: 11px">Toolbar</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            class="sp-surface"
            data-part="pane"
            data-subject
            data-doc="plain"
            role="textbox"
            aria-multiline="true"
            aria-label="Field notes"
            style="height: 118px; padding: 10px 12px; overflow: hidden; cursor: text"
          >
            <p data-part="para-1" class="sp-text sp-text--ink" style="margin: 0">
              The gulls came in <span data-part="sel" style="border-radius: 3px; background: var(--sp-accent-soft)">ahead of the weather</span>.
            </p>
            <p data-part="para-2" class="sp-text sp-text--ink" style="margin: 8px 0 0">Boats tied short by four. Tide at 6:12.</p>
            <ul data-part="list" class="sp-text sp-text--ink" hidden style="margin: 8px 0 0; padding-left: 18px">
              <li>Boats tied short by four</li>
              <li>Tide at 6:12</li>
            </ul>
            <span data-part="placeholder" class="sp-text" hidden style="display: inline-block">Write a note</span>
          </div>
          <span class="sp-label sp-context" data-part="model" data-doc="plain" style="${MONO}">${MODEL.plain}</span>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 8px">
        <span class="sp-label" style="font-size: 11px">The model is a tree, not markup.</span>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="draft">New draft</button>
      </div>
    </div>
  `;

  const pane = part(root, 'pane');
  const para1 = part(root, 'para-1');
  const para2 = part(root, 'para-2');
  const sel = part(root, 'sel');
  const list = part(root, 'list');
  const placeholder = part(root, 'placeholder');
  const model = part(root, 'model');

  const caret = root.ownerDocument.createElement('span');
  caret.className = 'sp-caret';
  caret.dataset.part = 'caret';
  caret.setAttribute('aria-hidden', 'true');
  caret.style.marginLeft = '1px';

  const state = { strong: false, list: false, empty: false };

  const render = () => {
    para1.hidden = state.empty;
    para2.hidden = state.empty || state.list;
    list.hidden = state.empty || !state.list;
    placeholder.hidden = !state.empty;
    sel.style.fontWeight = state.strong ? '700' : '400';
    if (state.strong) sel.dataset.strong = '';
    else delete sel.dataset.strong;

    const doc = state.empty ? 'empty' : state.list ? 'list' : state.strong ? 'strong' : 'plain';
    pane.dataset.doc = doc;
    model.dataset.doc = doc;
    model.textContent = MODEL[doc] ?? '';

    const host = state.empty ? placeholder : state.list ? (list.lastElementChild ?? list) : para2;
    host.append(caret);
  };

  // An empty document has nothing to mark, so the tools stay honest and do nothing.
  part(root, 'fmt-bold').addEventListener('click', () => {
    if (state.empty) return;
    state.strong = true;
    render();
  });

  part(root, 'fmt-list').addEventListener('click', () => {
    if (state.empty) return;
    state.list = true;
    render();
  });

  part(root, 'draft').addEventListener('click', () => {
    state.strong = false;
    state.list = false;
    state.empty = true;
    render();
  });

  render();
}
