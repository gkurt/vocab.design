import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[`vocabulary`,`vocal range`,`vocative case`,`voice onset`,`void ratio`],r=[[`vocabulary`,`visited yesterday`],[`vocal range`,`visited last week`]];function i(i){let a=r.map(([e,n])=>`
      <div class="sp-row sp-row--between" style="height: 26px">
        <span class="sp-row" style="gap: 6px; font-size: 12px">${t(`search`)}${e}</span>
        <span class="sp-label" style="font-size: 10px">${n}</span>
      </div>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Glossary</span><span class="sp-text">${n.length} entries</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <span class="sp-label sp-context">Jump to an entry</span>
          <div
            class="sp-input"
            data-part="field"
            data-guess=""
            style="position: relative; display: flex; align-items: center; height: 36px; padding: 0 10px; font-size: 15px; overflow: hidden"
          >
            <span class="sp-text--ink" data-part="typed" style="white-space: pre"></span>
            <span class="sp-caret" style="margin: 0 1px"></span>
            <span
              data-part="remainder"
              data-subject
              hidden
              style="white-space: pre; background: var(--sp-accent); color: var(--sp-accent-ink); border-radius: 2px"
            ></span>
            <input
              data-part="editor"
              type="text"
              autocomplete="off"
              spellcheck="false"
              aria-label="Jump to an entry"
              style="position: absolute; inset: 0; width: 100%; border: 0; padding: 0; background: transparent; font: inherit; opacity: 0"
            />
          </div>
          <div class="sp-surface sp-context" style="padding: 4px 10px">${a}</div>
          <span class="sp-text sp-context" data-part="readout" role="status" style="font-size: 11px">Type to jump to an entry</span>
        </div>
      </div>
    </div>
  `;let o=e(i,`field`),s=e(i,`typed`),c=e(i,`remainder`),l=e(i,`readout`),u=e(i,`editor`),d=()=>{let e=u.value,t=e===``?void 0:n.find(t=>t.length>e.length&&t.startsWith(e.toLowerCase()));s.textContent=e,c.textContent=t?t.slice(e.length):``,c.hidden=!t,o.dataset.guess=t??``,e?t?l.textContent=`Enter to open ${t}`:l.textContent=`No entry starts with ${e}`:l.textContent=`Type to jump to an entry`};u.addEventListener(`input`,d),d()}export{i as mount};