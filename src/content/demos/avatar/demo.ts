import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Stand-in for a photograph: paint through the kit's swatch hook, never a network request. */
const PHOTO =
  'radial-gradient(circle at 62% 26%, rgb(255 255 255 / 0.5), transparent 56%), linear-gradient(150deg, #f0b27a, #d9695a 46%, #6d4b7a)';

/** The last link in the chain. The kit's icon set has no person, and it is frozen. */
const PERSON =
  '<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 26px; height: 26px"><circle cx="12" cy="9" r="3.6"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/></svg>';

/** What the record carries, and the layer that answers for it. */
const RESOLVES: Record<string, string> = { photo: 'photo', name: 'initials', nothing: 'glyph' };

/**
 * Avatar specimen: one person's entry, drawn at whatever the record can support.
 * The subject is the circle itself, and the demonstration is the chain behind it:
 * the photo when there is one, the initials taken from the name when there is not,
 * a generic person when there is not even that.
 *
 * The picker is instrumentation, so it is scenery (SPEC §5), and it *chooses* a
 * record rather than toggling one (SPEC §8): every pass reaches the same three
 * states in the same order, whichever one it was interrupted in. Nothing moves
 * while the chain resolves, because all three layers swap inside a circle whose
 * size was never in question.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 292px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Directory</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row" style="gap: 12px">
              <span
                class="sp-avatar"
                data-part="avatar"
                data-subject
                data-source="photo"
                role="img"
                aria-label="Ada Marceau"
                style="width: 48px; height: 48px; font-size: 16px; overflow: hidden"
              >
                <span class="sp-swatch" data-part="photo" style="--sp-swatch: ${PHOTO}; width: 100%; height: 100%"></span>
                <span data-part="initials" hidden>AM</span>
                <span class="sp-text" data-part="glyph" hidden>${PERSON}</span>
              </span>
              <div class="sp-stack sp-context" style="gap: 2px">
                <span class="sp-heading">Ada Marceau</span>
                <span class="sp-text">Design systems, Berlin</span>
              </div>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px; margin-top: 12px">
            <sp-segmented data-stage-mode class="sp-segmented sp-grow" data-part="record" data-axis="Record has" data-value="photo">
              <button class="sp-segment sp-grow" data-part="rec-photo" value="photo">Photo</button>
              <button class="sp-segment sp-grow" data-part="rec-name" value="name">Name only</button>
              <button class="sp-segment sp-grow" data-part="rec-nothing" value="nothing">Nothing</button>
            </sp-segmented>
          </div>
          <ul class="sp-list sp-context" style="margin-top: 6px">
            <li class="sp-list-item"><span class="sp-avatar">JO</span><span class="sp-grow">Jun Okafor</span><span class="sp-text">Research</span></li>
            <li class="sp-list-item"><span class="sp-avatar">N</span><span class="sp-grow">Northwind</span><span class="sp-text">Workspace</span></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  const avatar = part(root, 'avatar');
  const layers = {
    photo: part(root, 'photo'),
    initials: part(root, 'initials'),
    glyph: part(root, 'glyph'),
  };

  const resolve = (record: string) => {
    const layer = RESOLVES[record] ?? 'glyph';
    avatar.dataset.source = layer;
    for (const [name, el] of Object.entries(layers)) el.hidden = name !== layer;
  };

  part(root, 'record').addEventListener('change', (event) => resolve((event as CustomEvent<string>).detail));
  resolve('photo');
}
