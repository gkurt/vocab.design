/**
 * Helper text specimen: the line under a field that was there before anybody
 * typed and is still there afterwards. The subject is that line alone, not the
 * field, since the field is what the word describes rather than what it names.
 *
 * Nothing here appears or disappears, so nothing can move (SPEC §5): the point
 * of the specimen is that typing changes the value and leaves the guidance
 * exactly where it was.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-heading sp-context">New workspace</div>
        <div class="sp-field" data-part="field" style="margin-top: 14px">
          <label class="sp-label" for="ht-url">Workspace address</label>
          <input
            class="sp-input"
            id="ht-url"
            data-part="input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            aria-describedby="ht-url-help"
          />
          <span class="sp-text" id="ht-url-help" data-part="helper" data-subject>
            Lowercase letters and hyphens, 3 to 20 characters.
          </span>
        </div>
        <div class="sp-field sp-context" style="margin-top: 14px">
          <label class="sp-label" for="ht-name">Display name</label>
          <input class="sp-input" id="ht-name" type="text" autocomplete="off" value="Northwind" />
        </div>
        <div class="sp-row sp-context" style="margin-top: 16px">
          <button class="sp-button" type="button">Create</button>
          <span class="sp-text">Step 2 of 3</span>
        </div>
      </div>
    </div>
  `;
}
