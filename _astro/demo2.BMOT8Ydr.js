import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=1500,r={left:0,right:192};function i(i,a){let o=(e,t)=>`
    <div style="position: relative; height: 34px; padding: 4px; border-radius: 8px; background: var(--sp-sunken)">
      <span
        data-part="${e}"
        ${t?`data-subject`:``}
        data-at="left"
        style="position: absolute; top: 4px; left: 4px; display: flex; align-items: center; justify-content: center;
               width: 64px; height: 26px; border-radius: 6px; background: var(--sp-accent); color: var(--sp-accent-ink);
               font-size: 12px; font-weight: 500; translate: 0 0; transition: translate ${n}ms var(--sp-ease)"
      >Sheet</span>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <div class="sp-row sp-context" style="gap: 8px">
          <span class="sp-label sp-grow">Send the sheet</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="to-left">Left</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="to-right">Right</button>
        </div>

        <div class="sp-stack" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Interruptible</span>
          </div>
          ${o(`live`,!0)}
        </div>

        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Locked out</span>
            <span class="sp-label" data-part="queue-note" style="flex: 0 0 118px; text-align: right">nothing waiting</span>
          </div>
          ${o(`queued`,!1)}
        </div>
      </div>
    </div>
  `;let s=e(i,`live`),c=e(i,`queued`),l=e(i,`queue-note`),u,d,f=()=>t(i)?20:1540,p=(e,t)=>{e.style.translate=`${r[t]}px 0`,e.dataset.at=t},m=e=>{if(u!==void 0){d=e,c.dataset.pending=e,l.textContent=`${e} is waiting`;return}p(c,e),u=a.setTimeout(()=>{u=void 0;let e=d;d=void 0,c.removeAttribute(`data-pending`),l.textContent=`nothing waiting`,e&&m(e)},f())},h=e=>{p(s,e),m(e)};e(i,`to-left`).addEventListener(`click`,()=>h(`left`)),e(i,`to-right`).addEventListener(`click`,()=>h(`right`))}export{i as mount};