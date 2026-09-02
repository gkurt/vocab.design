function e(e){e.innerHTML=`
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
  `}export{e as mount};