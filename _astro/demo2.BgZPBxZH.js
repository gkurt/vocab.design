import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r={inbox:`/inbox/notes.txt`,archive:`/archive/notes.txt`,trash:`/trash/notes.txt`},i=[{key:`inbox`,part:`to-inbox`,label:`Move to /inbox`},{key:`archive`,part:`to-archive`,label:`Move to /archive`},{key:`trash`,part:`to-trash`,label:`Move to /trash`}];function a(a){let o=i.map(e=>`
      <button class="sp-button sp-button--ghost sp-button--sm" data-part="${e.part}" type="button" style="width: 100%; text-align: left">
        ${e.label}
      </button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Files</span>
        </div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 10px">

          <div style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: 212px">
            <span class="sp-label sp-context" style="height: 16px; font-size: 11px">Desk</span>
            <div
              class="sp-surface"
              data-part="desk"
              data-subject
              data-where="inbox"
              style="display: flex; align-items: center; justify-content: space-between; gap: 8px; height: 122px; padding: 10px"
            >
              <div style="position: relative; flex: 0 0 auto; width: 50px; height: 64px">
                <div
                  data-part="page"
                  style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 5px; padding: 7px 6px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 4px; box-shadow: var(--sp-shadow); cursor: grab; touch-action: none"
                >
                  <span class="sp-line" style="height: 5px"></span>
                  <span class="sp-line" style="height: 5px; width: 80%"></span>
                  <span class="sp-line" style="height: 5px; width: 60%"></span>
                  <span class="sp-label" style="margin-top: auto; font-size: 10px">Notes</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 0 0 auto; width: 62px">
                <div data-part="folder" style="position: relative; width: 58px; height: 46px">
                  <span style="position: absolute; left: 0; top: 0; width: 24px; height: 9px; border-radius: 3px 3px 0 0; background: var(--sp-accent)"></span>
                  <span
                    data-part="folder-page"
                    style="position: absolute; left: 13px; top: -7px; width: 32px; height: 24px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 2px; visibility: hidden"
                  ></span>
                  <span style="position: absolute; left: 0; right: 0; top: 8px; bottom: 0; border: 1px solid var(--sp-accent); border-radius: 0 4px 4px 4px; background: var(--sp-accent-soft)"></span>
                </div>
                <span class="sp-label" style="font-size: 11px">Archive</span>
              </div>

              <div style="display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 0 0 auto; width: 52px">
                <div data-part="trash" style="position: relative; display: flex; align-items: flex-end; justify-content: center; width: 48px; height: 46px">
                  <span
                    data-part="trash-page"
                    style="position: absolute; left: 12px; top: 0; width: 24px; height: 16px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 2px; visibility: hidden"
                  ></span>
                  <span style="display: flex; margin-bottom: 4px; transform: scale(1.8); transform-origin: bottom center">${n(`trash`)}</span>
                </div>
                <span class="sp-label" style="font-size: 11px">Trash</span>
              </div>
            </div>
          </div>

          <div class="sp-context" style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0">
            <span class="sp-label" style="height: 16px; font-size: 11px">File system</span>
            <div class="sp-surface" data-part="readout" data-where="inbox" style="display: flex; flex-direction: column; gap: 6px; padding: 8px 10px">
              <div class="sp-row" style="gap: 6px">
                ${n(`copy`)}
                <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">notes.txt</span>
              </div>
              <span class="sp-text" data-part="path-text" style="height: 16px; font-size: 11px">${r.inbox}</span>
              <span class="sp-divider"></span>
              <div class="sp-stack" style="gap: 5px">${o}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;let s=e(a,`desk`),c=e(a,`page`),l=e(a,`folder`),u=e(a,`trash`),d=e(a,`folder-page`),f=e(a,`trash-page`),p=e(a,`readout`),m=e(a,`path-text`),h=i.map(t=>({key:t.key,el:e(a,t.part)})),g=!1,_=e=>{s.dataset.where=e,p.dataset.where=e,c.style.visibility=e===`inbox`?`visible`:`hidden`,d.style.visibility=e===`archive`?`visible`:`hidden`,f.style.visibility=e===`trash`?`visible`:`hidden`,m.textContent=r[e];for(let n of h)t(n.el,`data-selected`,n.key===e)},v=(e,t,n)=>{let r=e.getBoundingClientRect();return t>=r.left&&t<=r.right&&n>=r.top&&n<=r.bottom},y=(e,n)=>{t(e,`data-over`,n),e.style.outline=n?`2px solid var(--sp-accent)`:``,e.style.outlineOffset=`3px`};c.addEventListener(`pointerdown`,e=>{s.dataset.where===`inbox`&&(e.isTrusted&&c.setPointerCapture(e.pointerId),g=!0)}),a.addEventListener(`pointermove`,e=>{g&&(y(l,v(l,e.clientX,e.clientY)),y(u,v(u,e.clientX,e.clientY)))});let b=e=>{if(!g)return;g=!1;let t=v(l,e.clientX,e.clientY),n=v(u,e.clientX,e.clientY);y(l,!1),y(u,!1),t?_(`archive`):n&&_(`trash`)};a.addEventListener(`pointerup`,b),a.addEventListener(`pointercancel`,b);for(let e of h)e.el.addEventListener(`click`,()=>_(e.key));_(`inbox`)}export{a as mount};