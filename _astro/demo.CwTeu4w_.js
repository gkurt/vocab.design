import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[`Cart`,`Shipping`,`Payment`];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout</span></div>
        <div class="sp-body">
          <ol class="sp-row" data-part="steps" data-subject aria-label="Checkout progress" style="margin: 0; padding: 0 2px; list-style: none; gap: 8px">
            ${n.map((e,t)=>`
      <li
        class="sp-row"
        data-part="step-${t+1}"
        data-state="${t===0?`current`:`todo`}"
        ${t===0?`aria-current="step"`:``}
        style="flex: 1 1 0; gap: 8px; min-width: 0"
      >
        <span
          data-part="marker-${t+1}"
          aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 22px; height: 22px; border: 1px solid var(--sp-line); border-radius: 50%; font-size: 12px; font-weight: 600"
        >${t+1}</span>
        <span class="sp-label" data-part="label-${t+1}" style="min-width: 0">${e}</span>
        ${t<n.length-1?`<span class="sp-divider sp-grow" aria-hidden="true"></span>`:``}
      </li>`).join(``)}
          </ol>
          <div class="sp-surface sp-context" style="margin-top: 14px; padding: 12px; height: 138px">
            <span class="sp-heading" data-part="panel-title">Cart</span>
            <div class="sp-stack" style="margin-top: 12px; gap: 9px">
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 74%"></div>
              <div class="sp-line" style="width: 58%"></div>
            </div>
            <div class="sp-row sp-row--between" style="margin-top: 14px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
              <button class="sp-button sp-button--sm" type="button" data-part="continue">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=n.map((t,n)=>e(r,`step-${n+1}`)),a=n.map((t,n)=>e(r,`marker-${n+1}`)),o=e(r,`panel-title`),s=e(r,`back`),c=e(r,`continue`),l=0,u=()=>{i.forEach((n,r)=>{let i=r<l?`done`:r===l?`current`:`todo`;n.dataset.state=i,i===`current`?n.setAttribute(`aria-current`,`step`):n.removeAttribute(`aria-current`);let o=e(n,`label-${r+1}`);o.className=i===`todo`?`sp-label`:`sp-label sp-text--ink`;let s=a[r];s&&(s.innerHTML=i===`done`?t(`check`):String(r+1),s.style.background=i===`todo`?``:`var(--sp-accent)`,s.style.borderColor=i===`todo`?``:`var(--sp-accent)`,s.style.color=i===`todo`?``:`var(--sp-accent-ink)`)}),o.textContent=n[l]??``;for(let[e,t]of[[s,l===0],[c,l===n.length-1]])e.setAttribute(`aria-disabled`,String(t))},d=e=>{let t=Math.min(n.length-1,Math.max(0,e));t!==l&&(l=t,u())};c.addEventListener(`click`,()=>d(l+1)),s.addEventListener(`click`,()=>d(l-1)),u()}export{r as mount};