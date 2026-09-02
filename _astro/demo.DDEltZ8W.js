import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{title:`Your details`,hint:`Name and email`},{title:`Delivery address`,hint:`Where it goes`},{title:`Payment`,hint:`Card or transfer`},{title:`Review`,hint:`Check and confirm`}],r=2,i={done:`var(--sp-accent)`,current:`var(--sp-accent-soft)`,todo:`var(--sp-sunken)`};function a(a){let o=n.map((e,t)=>`
      <span
        data-part="seg-${t+1}"
        data-state="todo"
        style="flex: 1 1 0; height: 6px; border-radius: 999px; background: ${i.todo}; transition: background-color 0.2s var(--sp-ease)"
      ></span>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout</span><span class="sp-label">Wilder &amp; Co</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="meter"
            data-subject
            data-step="${r}"
            role="group"
            aria-label="Progress through checkout"
            style="padding: 10px 12px"
          >
            <div class="sp-row sp-row--between">
              <span class="sp-heading" data-part="readout" style="font-size: 13px">Step ${r} of ${n.length}</span>
              <span class="sp-text" data-part="left" data-remaining="${n.length-r}" style="font-size: 12px"></span>
            </div>
            <div class="sp-row" style="gap: 4px; margin-top: 9px">${o}</div>
          </div>
          <div class="sp-stack sp-context sp-grow" data-part="form" style="justify-content: center; gap: 10px">
            <span class="sp-heading" data-part="form-title" style="font-size: 13px"></span>
            <span class="sp-label" data-part="form-hint"></span>
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 61%"></div>
          </div>
          <div class="sp-row sp-row--between sp-context">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
            <button class="sp-button sp-button--sm" type="button" data-part="continue">Continue</button>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`meter`),c=e(a,`readout`),l=e(a,`left`),u=e(a,`form-title`),d=e(a,`form-hint`),f=e(a,`back`),p=e(a,`continue`),m=r,h=()=>{let r=n.length-m;s.dataset.step=String(m),c.textContent=`Step ${m} of ${n.length}`,l.dataset.remaining=String(r),l.textContent=r===0?`Last step`:`${r} step${r===1?``:`s`} left`;for(let[t,r]of n.entries()){let n=e(a,`seg-${t+1}`),o=t+1<m?`done`:t+1===m?`current`:`todo`;n.dataset.state=o,n.style.background=i[o],n.style.boxShadow=o===`current`?`inset 0 0 0 1px var(--sp-accent)`:``,t+1===m&&(u.textContent=r.title,d.textContent=r.hint)}f.setAttribute(`aria-disabled`,String(m===1)),p.textContent=m===n.length?`Place order`:`Continue`,t(s,`data-last`,m===n.length)};p.addEventListener(`click`,()=>{m!==n.length&&(m+=1,h())}),f.addEventListener(`click`,()=>{m!==1&&(--m,h())}),h()}export{a as mount};