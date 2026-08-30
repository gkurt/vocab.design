/**
 * Focus ring specimen: a row of three controls with the ring walking through them,
 * one Tab at a time. Attract mode never moves real focus (SPEC §7), so the ring is
 * simulated with `data-sim-focus`, which the kit styles exactly like a real
 * `:focus-visible` outline: a reader who takes the specimen over and presses Tab
 * themselves sees the same drawing from the browser.
 *
 * The subject is the control the ring is currently on. The term names the outline,
 * and an outline is not an element of its own, so the narrowest thing that carries
 * it is the control it is drawn around. The specimen rests with the ring on the
 * first control rather than on nothing, so identify has something to point at.
 *
 * A line under the row once read "Tab moves the ring along the row, then back to the
 * first control." That is the site narrating its own choreography inside a share
 * dialog, which no share dialog would print, and the article says it already, so it
 * went rather than moving anywhere.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <span class="sp-heading sp-context">Share this file</span>
        <div class="sp-row" style="gap: 10px; margin-top: 14px">
          <button class="sp-button sp-button--ghost" type="button" data-part="control-copy" data-subject data-sim-focus>Copy link</button>
          <button class="sp-button sp-button--ghost" type="button" data-part="control-invite">Invite</button>
          <button class="sp-button" type="button" data-part="control-done">Done</button>
        </div>
      </div>
    </div>
  `;
}
