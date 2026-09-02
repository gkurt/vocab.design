import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between">
          <span class="sp-heading">Message actions</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="reveal" aria-pressed="false">Reveal hidden text</button>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 14px">
          <button class="sp-button sp-button--ghost sp-row" data-part="labelled">
            ${n(`trash`)}<span class="sp-visually-hidden" data-part="label" data-subject>Delete message</span>
          </button>
          <button class="sp-button sp-button--ghost sp-row" data-part="unlabelled">
            ${n(`star`)}
          </button>
        </div>
        <div class="sp-surface" style="margin-top: 14px; padding: 10px">
          <span class="sp-label">Screen reader announces</span>
          <p class="sp-text sp-text--ink" data-part="transcript" style="margin-top: 4px">Focus a button.</p>
        </div>
      </div>
    </div>
  `;let i=e(r,`transcript`),a=e(r,`label`),o=e(r,`reveal`);e(r,`labelled`).addEventListener(`click`,()=>{i.textContent=`“Delete message, button”`}),e(r,`unlabelled`).addEventListener(`click`,()=>{i.textContent=`“button” (nothing to read out)`}),o.addEventListener(`click`,()=>{let e=!a.hasAttribute(`data-revealed`);t(a,`data-revealed`,e),o.setAttribute(`aria-pressed`,String(e)),t(o,`data-selected`,e)})}export{r as mount};