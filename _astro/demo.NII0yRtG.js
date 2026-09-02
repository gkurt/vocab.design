import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=4,r=28,i=6,a=130,o=[{id:`accept`,key:`Accept`,value:`application/json`},{id:`trace`,key:`X-Trace-Id`,value:`8f2c41`},{id:`cache`,key:`Cache-Control`,value:`no-store`}];function s(s){let c=e=>`
    <div
      data-part="row-${e.id}"
      style="display: grid; grid-template-columns: 148px 1fr 24px; align-items: center; gap: 8px; height: ${r}px"
    >
      <input
        class="sp-input"
        data-part="key-${e.id}"
        data-field="name"
        aria-label="Header name"
        value="${e.key}"
        style="padding: 4px 8px; height: ${r}px"
      />
      <input
        class="sp-input"
        data-part="value-${e.id}"
        data-field="value"
        aria-label="Header value"
        value="${e.value}"
        style="padding: 4px 8px; height: ${r}px"
      />
      <button
        class="sp-icon-button"
        type="button"
        data-part="remove-${e.id}"
        aria-label="Remove ${e.key||`row`}"
        style="width: 24px; height: 24px"
      >${t(`trash`)}</button>
    </div>
  `;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Request headers</span>
          <span
            class="sp-label"
            data-part="readout"
            data-focus="none"
            style="flex: 0 0 168px; font-size: 11px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >Focus: nothing yet</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 424px; padding: 14px">
            <div data-part="editor" data-subject>
              <div style="display: grid; grid-template-columns: 148px 1fr 24px; gap: 8px; margin-bottom: 7px">
                <span class="sp-label" style="font-size: 11px">Name</span>
                <span class="sp-label" style="font-size: 11px">Value</span>
                <span></span>
              </div>

              <div data-part="rows" style="display: flex; flex-direction: column; gap: ${i}px; height: ${a}px; align-content: flex-start">
                ${o.map(c).join(``)}
              </div>

              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="add"
                style="display: inline-flex; align-items: center; gap: 6px; margin-top: 10px"
              >${t(`plus`)} Add header</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`rows`),u=e(s,`readout`),d=e(s,`add`),f=0,p=e=>{let t=e.closest(`[data-part^="row-"]`);return t?`${t.querySelector(`[data-part^="key-"]`)?.value.trim()||`new row`} ${e.dataset.field??``}`.trim():`the add control`},m=(e,t)=>{for(let e of s.querySelectorAll(`[data-sim-focus]`))e.removeAttribute(`data-sim-focus`);if(!e){u.dataset.focus=`none`,u.textContent=`Focus: nothing yet`;return}e.setAttribute(`data-sim-focus`,``),u.dataset.focus=e.dataset.part??`none`,u.textContent=`Focus: ${p(e)}`,t&&e.focus()},h=e=>{let t=[...e.querySelectorAll(`.sp-input`)],n=()=>{e.dataset.filled=String(t.every(e=>e.value.trim()!==``))};n();for(let e of t)e.addEventListener(`click`,t=>m(e,t.isTrusted)),e.addEventListener(`input`,n);e.querySelector(`[data-part^="remove-"]`)?.addEventListener(`click`,t=>{let n=[...l.children],r=n.indexOf(e),i=n[r+1]??n[r-1];e.remove();let a=i?.querySelector(`.sp-input`)??d;m(a,t.isTrusted),d.removeAttribute(`aria-disabled`)})};for(let e of[...l.children])h(e);d.addEventListener(`click`,e=>{if(l.children.length>=n)return;f+=1;let t={id:`new${f}`,key:``,value:``};l.insertAdjacentHTML(`beforeend`,c(t));let r=l.lastElementChild;h(r),m(r.querySelector(`.sp-input`)??void 0,e.isTrusted),l.children.length>=n&&d.setAttribute(`aria-disabled`,`true`)}),e(s,`editor`).addEventListener(`focusin`,e=>{let t=e.target;t instanceof HTMLElement&&(t.dataset.field||t===d)&&m(t,!1)})}export{s as mount};