import{n as e,t}from"./parts.C-YLuC7Q.js";var n=108,r=50,i={harbour:{wash:`linear-gradient(150deg, #6ea8fe 0%, #2b4fb8 100%)`,label:`Harbour`},dunes:{wash:`linear-gradient(150deg, #f7b267 0%, #d1493f 100%)`,label:`Dunes`},fern:{wash:`linear-gradient(150deg, #77d3b0 0%, #2a7f75 100%)`,label:`Fern`},granite:{wash:`linear-gradient(150deg, #b0b6c4 0%, #5d6577 100%)`,label:`Granite`},ochre:{wash:`linear-gradient(150deg, #e6c56a 0%, #9d7413 100%)`,label:`Ochre`}},a=`harbour`,o=[`dunes`,`fern`,`granite`,`ochre`],s={rest:`Drop a picture here`,over:`Ready: release to replace the picture`,dropped:`Profile picture updated`};function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 416px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Account</span>
          <span class="sp-label" style="font-size: 11px">Profile picture</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 14px 16px">
          <div class="sp-row" style="gap: 18px; align-items: flex-start">
            <div
              data-part="well"
              data-subject
              data-photo="${a}"
              role="img"
              aria-label="Profile picture"
              style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${n}px; border-radius: 10px;
                     background: ${i[a]?.wash}; box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.14)"
            >
              <span
                data-part="ring"
                aria-hidden="true"
                style="position: absolute; inset: 0; border-radius: 10px; border: 2px dashed var(--sp-accent);
                       background: rgb(255 255 255 / 0.28); opacity: 0; transition: opacity 0.14s"
              ></span>
              <span
                data-part="drop-label"
                style="position: absolute; left: 50%; bottom: 8px; translate: -50% 0; padding: 2px 7px; border-radius: 999px;
                       background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 11px; font-weight: 500;
                       white-space: nowrap; opacity: 0; transition: opacity 0.14s"
                >Drop here</span
              >
            </div>

            <div class="sp-stack" style="gap: 10px; min-width: 0">
              <div class="sp-surface sp-context" data-part="tray" style="padding: 9px 10px">
                <span class="sp-label" style="display: block; font-size: 11px">Recent pictures</span>
                <div class="sp-row" style="gap: 8px; margin-top: 7px">${o.map(e=>{let t=i[e];return`
      <button
        type="button"
        data-part="tray-${e}"
        data-photo="${e}"
        aria-label="${t?.label??e}"
        style="display: block; flex: 0 0 auto; width: ${r}px; height: ${r}px; padding: 0; border: 1px solid var(--sp-line);
               border-radius: 6px; background: ${t?.wash??`none`}; cursor: grab; touch-action: none"
      ></button>`}).join(``)}</div>
              </div>
            </div>
          </div>

          <span
            class="sp-text sp-context"
            data-part="status"
            data-state="rest"
            style="flex: 0 0 auto; height: 18px; font-size: 12px; line-height: 18px; white-space: nowrap; overflow: hidden"
            >${s.rest}</span
          >
        </div>
      </div>
    </div>
  `;let l=e(c,`well`),u=e(c,`ring`),d=e(c,`drop-label`),f=e(c,`status`),p=e=>{f.dataset.state=e,f.textContent=s[e]??``},m=e=>{t(l,`data-over`,e),u.style.opacity=e?`1`:`0`,d.style.opacity=e?`1`:`0`},h=e=>{let t=l.getBoundingClientRect();return e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom};for(let t of o){let n=e(c,`tray-${t}`),r=!1;n.addEventListener(`pointerdown`,e=>{r=!0,e.isTrusted&&n.setPointerCapture(e.pointerId)}),n.addEventListener(`pointermove`,e=>{if(!r)return;let t=h(e);m(t),t&&p(`over`)});let a=e=>{if(!r)return;r=!1;let n=h(e);if(m(!1),!n)return p(`rest`);l.dataset.photo=t,l.style.background=i[t]?.wash??``,p(`dropped`)};n.addEventListener(`pointerup`,a),n.addEventListener(`pointercancel`,a)}}export{c as mount};