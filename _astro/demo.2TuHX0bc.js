import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=900,i=60;function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Workspace settings</span>
          <span class="sp-text" data-part="readout" data-outcome="idle" style="width: 270px; text-align: right; white-space: nowrap"></span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 14px">
          <div class="sp-surface sp-context" style="width: 100%; padding: 10px 12px">
            <div class="sp-heading" style="font-size: 13px">Delete this workspace</div>
            <div class="sp-text" style="font-size: 12px">Removes 14 projects, every build log, and the deploy keys.</div>
          </div>
          <button
            class="sp-button sp-button--ghost"
            type="button"
            data-part="hold"
            data-subject
            data-state="idle"
            style="position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 186px; touch-action: none; user-select: none"
          >
            <span
              data-part="fill"
              aria-hidden="true"
              style="position: absolute; left: 0; top: 0; bottom: 0; width: 0%; background: var(--sp-accent-soft)"
            ></span>
            <span style="position: relative; display: inline-flex; align-items: center; gap: 8px">
              ${n(`trash`)}
              <span data-part="label">Hold to delete</span>
            </span>
          </button>
          <div style="position: relative; width: 100%; height: 32px">
            <div
              class="sp-surface sp-context"
              data-part="receipt-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
            >
              Nothing has been deleted
            </div>
            <div
              class="sp-surface"
              data-part="receipt"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 13px"
            >
              Workspace deleted after a ${r} ms hold
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`hold`),c=e(a,`fill`),l=e(a,`label`),u=e(a,`readout`),d,f=0,p=!1,m=(e,t)=>{u.dataset.outcome=e,u.textContent=t},h=()=>{o.clearTimeout(d),d=void 0,f=0,c.style.width=`0%`},g=()=>{h(),p=!0,s.dataset.state=`confirmed`,t(s,`data-confirmed`,!0),c.style.width=`100%`,l.textContent=`Deleted`,e(a,`receipt`).hidden=!1,e(a,`receipt-empty`).hidden=!0,m(`confirmed`,`Held ${r} ms: deleted`)},_=()=>{if(f+=i,c.style.width=`${Math.min(f/r,1)*100}%`,f>=r)return g();d=o.setTimeout(_,i)},v=()=>{p||(h(),s.dataset.state=`holding`,m(`holding`,`Holding: keep pressing to commit`),d=o.setTimeout(_,i))},y=()=>{if(p||d===void 0)return;let e=f;h(),s.dataset.state=`idle`,m(`cancelled`,`Released after ${e} ms: nothing deleted`)};s.addEventListener(`pointerdown`,v);for(let e of[`pointerup`,`pointerleave`,`pointercancel`])s.addEventListener(e,y);s.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p||m(`idle`,`Keys repeat rather than hold: use a pointer`))})}export{a as mount};