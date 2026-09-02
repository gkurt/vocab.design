import{n as e}from"./parts.C-YLuC7Q.js";function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 220px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Issue 482</span></div>
        <div class="sp-body">
          <div class="sp-stack sp-context" style="gap: 8px">
            <span class="sp-heading">Ligatures drop in the type ramp</span>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 64%"></div>
          </div>
          <div class="sp-row sp-row--wrap" data-part="tags" style="margin-top: 16px; min-height: 26px">
            <span class="sp-chip" data-part="tag-typography" data-subject style="cursor: default">typography</span>
            <span class="sp-chip" data-part="tag-docs" style="cursor: default">docs</span>
            <span class="sp-chip" data-part="tag-triage" style="cursor: default">
              needs triage
              <button class="sp-chip-remove" data-part="tag-triage-remove" aria-label="Remove needs triage">✕</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `,e(t,`tag-triage-remove`).addEventListener(`click`,()=>e(t,`tag-triage`).remove())}export{t as mount};