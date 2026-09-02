import{n as e}from"./parts.C-YLuC7Q.js";import"./combobox.9HjM0ItI.js";var t=[{key:`mill-12`,text:`12 Mill Lane, Whitby, YO21 3PU`},{key:`church`,text:`5 Church Street, Whitby, YO22 4DE`},{key:`mill-14`,text:`14 Mill Lane, Whitby, YO21 3PU`},{key:`millgate`,text:`3 Millgate, Whitby, YO22 4AB`},{key:`harbour`,text:`27 Harbour Road, Whitby, YO21 1PR`}],n=[{key:`street`,label:`Street`},{key:`town`,label:`Town`},{key:`postcode`,label:`Postcode`}],r={idle:`One line to type into. The parts below stay empty until an address is chosen.`,filled:`One choice wrote three fields, and every part is still on screen to be corrected.`},i=[`display: flex`,`align-items: center`,`flex: 1 1 0`,`min-width: 0`,`height: 24px`,`padding: 0 8px`,`border: 1px dashed var(--sp-line)`,`border-radius: 5px`,`font-size: 12px`].join(`; `);function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wren &amp; Halliday</span>
          <span class="sp-label" style="font-size: 11px">Delivery address</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-field" style="flex: 0 0 auto">
            <span class="sp-label sp-context" style="font-size: 11px">Find your address</span>
            <sp-combobox data-part="lookup" data-subject>
              <input
                class="sp-input"
                data-part="lookup-input"
                type="text"
                aria-label="Find your address by street or postcode"
                placeholder="Start typing a street or postcode"
              />
              <ul class="sp-listbox" data-part="list" aria-label="Matching addresses" style="max-height: 138px">${t.map(({key:e,text:t})=>`<li class="sp-option" data-part="opt-${e}" style="padding: 4px 8px; font-size: 12px">${t}</li>`).join(``)}</ul>
            </sp-combobox>
          </div>

          <div class="sp-stack sp-context" data-part="fields" data-filled="0" style="flex: 0 0 auto; gap: 6px">${n.map(({key:e,label:t})=>`
      <div class="sp-row" style="height: 24px; gap: 8px">
        <span class="sp-label" style="width: 62px; font-size: 11px">${t}</span>
        <span class="sp-text sp-text--ink" data-part="val-${e}" data-state="empty" style="${i}"></span>
      </div>`).join(``)}</div>

          <span class="sp-label sp-context" data-part="status" role="status" style="flex: 0 0 auto; height: 16px; font-size: 11px">
            Nothing filled in yet
          </span>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-stage-verdict data-part="note" style="width: 288px; height: 34px; font-size: 11px">${r.idle}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reset" type="button">Start again</button>
      </div>
    </div>
  `;let o=e(a,`lookup`),s=e(a,`lookup-input`),c=e(a,`fields`),l=e(a,`status`),u=e(a,`note`),d=n.map(({key:t})=>e(a,`val-${t}`)),f=e=>{d.forEach((t,n)=>{let r=e[n]??``;t.textContent=r,t.dataset.state=r?`filled`:`empty`,t.style.borderStyle=r?`solid`:`dashed`});let t=e.filter(Boolean).length;c.dataset.filled=String(t),l.textContent=t===0?`Nothing filled in yet`:`${t} fields written from one choice`,u.textContent=t===0?r.idle:r.filled};o.addEventListener(`select`,e=>{f(e.detail.split(`, `))}),e(a,`reset`).addEventListener(`click`,()=>{s.value=``,s.dispatchEvent(new Event(`input`,{bubbles:!0})),s.dispatchEvent(new KeyboardEvent(`keydown`,{key:`Escape`,bubbles:!0})),f([])}),f([])}export{a as mount};