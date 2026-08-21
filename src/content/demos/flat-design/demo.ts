/**
 * Flat design specimen: the same card twice. The subject refuses every depth cue,
 * so a solid fill, an edge, and colour carry the whole thing; the scenery copy beside
 * it is the pre-2013 treatment, with a gloss, a bevel, and a shadow on each piece.
 * The comparison is the demonstration, since flat is defined by what it leaves out.
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-row" style="align-items: flex-start; gap: 20px">
        <div class="sp-stack" style="gap: 8px">
          <div data-part="flat" data-subject
               style="width: 158px; padding: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line)">
            <div class="sp-swatch" style="--sp-swatch: #ef4a4a; height: 74px; border-radius: 0"></div>
            <div style="margin-top: 10px; font-weight: 600; font-size: 14px">Night Shift</div>
            <div class="sp-text" style="font-size: 12px">Ora Vance</div>
            <div style="height: 4px; margin-top: 10px; background: var(--sp-sunken)">
              <div style="width: 46%; height: 100%; background: var(--sp-accent)"></div>
            </div>
            <button class="sp-button" type="button"
                    style="width: 100%; margin-top: 12px; border-radius: 0; font-size: 13px">Play</button>
          </div>
          <span class="sp-label" style="text-align: center">flat</span>
        </div>

        <div class="sp-stack sp-context" style="gap: 8px">
          <div data-part="depth"
               style="width: 158px; padding: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 10px; box-shadow: 0 6px 14px rgb(16 24 40 / 0.28)">
            <div class="sp-swatch sp-bevel" style="--sp-swatch: #c03b3b; height: 74px"></div>
            <div style="margin-top: 10px; font-weight: 600; font-size: 14px; text-shadow: 0 1px 0 rgb(255 255 255 / 0.5)">Night Shift</div>
            <div class="sp-text" style="font-size: 12px">Ora Vance</div>
            <div style="height: 6px; margin-top: 10px; border-radius: 999px; background: var(--sp-sunken); box-shadow: inset 0 1px 2px rgb(16 24 40 / 0.4)">
              <div class="sp-bevel" style="width: 46%; height: 100%; border-radius: 999px; background-color: #6b7280"></div>
            </div>
            <button class="sp-button sp-bevel" type="button"
                    style="width: 100%; margin-top: 12px; font-size: 13px">Play</button>
          </div>
          <span class="sp-label" style="text-align: center">gloss, bevel, shadow</span>
        </div>
      </div>
    </div>
  `;
}
