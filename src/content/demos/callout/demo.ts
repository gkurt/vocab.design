import { icon } from '#src/kit/icons.ts';

/**
 * Callout specimen: a note set into a page of documentation, between the
 * paragraphs it is about. The subject is the box, and the prose above and below
 * it is scenery: the term is what interrupts the reading, not the reading.
 *
 * Nothing dismisses it and nothing reveals it, which is the point. A callout is
 * written into the content and is there for every reader on every visit. The page
 * is as tall as the reading it holds, so the paragraph the note interrupts still
 * finishes on screen (SPEC §5).
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="height: 272px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Rotating an API key</span></div>
        <div class="sp-body">
          <p class="sp-prose sp-context" data-part="prose-before" style="margin: 0">
            Create the replacement key first, then update every service that signs requests with the old one.
          </p>
          <div
            class="sp-surface sp-row"
            data-part="callout"
            data-subject
            role="note"
            style="align-items: flex-start; gap: 10px; margin: 12px 0; padding: 10px 12px; background: var(--sp-accent-soft); border-color: var(--sp-accent)"
          >
            <span style="display: flex; color: var(--sp-accent)">${icon('bell')}</span>
            <span class="sp-grow">
              <span class="sp-heading" style="font-size: 13px">Revocation is immediate</span>
              <span class="sp-text" style="display: block">The old key stops working the moment you rotate. There is no grace period.</span>
            </span>
          </div>
          <p class="sp-prose sp-context" data-part="prose-after" style="margin: 0">
            Once traffic is signing cleanly, revoke the previous key from the same screen.
          </p>
        </div>
      </div>
    </div>
  `;
}
