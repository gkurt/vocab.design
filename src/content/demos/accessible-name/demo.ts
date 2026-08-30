import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Named = { name: string; source: string; note: string };

/**
 * The precedence walk, shortened to the four steps this scene can show:
 * aria-labelledby, aria-label, a native label, then the element's own content.
 * Run against the live DOM rather than answered from a table, so the readout is a
 * computation and not a caption someone typed.
 */
function computeName(control: HTMLElement, root: ParentNode): Named {
  const labelledby = control.getAttribute('aria-labelledby');
  const referenced = labelledby ? root.querySelector(`#${labelledby}`)?.textContent?.trim() : '';
  if (referenced) return { name: referenced, source: 'labelledby', note: 'aria-labelledby, text borrowed from elsewhere' };

  const label = control.getAttribute('aria-label')?.trim();
  if (label) return { name: label, source: 'aria-label', note: 'aria-label, written for this control alone' };

  const native = control.id ? root.querySelector(`label[for="${control.id}"]`)?.textContent?.trim() : '';
  if (native) return { name: native, source: 'label', note: 'its <label for>, the same words the reader sees' };

  const content = control.textContent?.trim();
  if (content) return { name: content, source: 'content', note: 'its own text content' };

  return { name: '(no name)', source: 'none', note: 'nothing named it, so it announces as “button”' };
}

const CONTROLS = ['control-input', 'control-icon', 'control-text'];

/**
 * Accessible name specimen: three controls that get their names three different
 * ways, and a readout that computes each one on the spot. Point at any of them and
 * the panel says what a screen reader would announce and which rung of the
 * precedence ladder produced it.
 *
 * The subject is the icon-only button, because that is the control whose name lives
 * nowhere on screen: the other two carry their names as text a reader can already
 * see. The readout is instrumentation and stays scenery, with its two lines held at
 * a fixed height so inspecting a control cannot move the panel (SPEC §5). Its resting
 * state is an inspector's empty one ("No control inspected", second line blank): it used
 * to read "Point at a control" over "Computed from the first rung that answers", which
 * instructed the reader and explained the ladder in the site's voice rather than the
 * panel's.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row" style="gap: 12px; align-items: flex-end">
          <div class="sp-field sp-grow">
            <label class="sp-label" for="vd-an-project">Project name</label>
            <input class="sp-input" id="vd-an-project" data-part="control-input" value="Harbour" readonly />
          </div>
          <button class="sp-icon-button" type="button" aria-label="Delete draft" data-part="control-icon" data-subject>
            ${icon('trash')}
          </button>
          <button class="sp-button" type="button" data-part="control-text">Publish</button>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 16px; padding: 10px 12px">
          <span class="sp-label">Accessible name</span>
          <div data-part="readout" data-source="none">
            <p class="sp-text sp-text--ink" data-part="computed" style="margin: 4px 0 0; height: 20px">No control inspected</p>
            <p class="sp-text" data-part="from" style="margin: 2px 0 0; height: 20px; font-size: 12px"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const computed = part(root, 'computed');
  const from = part(root, 'from');

  const inspect = (control: HTMLElement) => {
    const named = computeName(control, root);
    readout.dataset.source = named.source;
    computed.textContent = `“${named.name}”`;
    from.textContent = `from ${named.note}`;
  };

  for (const key of CONTROLS) {
    const control = part(root, key);
    // Hover is how an inspector is used, and the ghost cursor carries hover (SPEC §8);
    // the click keeps the same reading reachable where there is no pointer at all.
    control.addEventListener('pointerenter', () => inspect(control));
    control.addEventListener('click', () => inspect(control));
  }
}
