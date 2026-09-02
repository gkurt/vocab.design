import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=32,i=900;function a(a,o){let s=(e,t)=>`
    <div class="sp-stack" style="gap: 5px">
      <div class="sp-line" style="width: ${e}"></div>
      <div class="sp-line" style="width: ${t}"></div>
    </div>`,c=(e,t)=>`
    <div
      class="sp-surface"
      data-part="${e}"
      data-state="waiting"
      ${t}
      style="display: flex; flex-direction: column; gap: 6px; width: 205px; height: 162px; padding: 8px; overflow: hidden"
    >
      <span class="sp-heading" style="font-size: 13px">Harbour dues</span>
      ${s(`94%`,`78%`)}
      <div
        data-part="slot-${e}"
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; overflow: hidden; border-radius: 5px"
      >
        <span class="sp-label" data-part="slot-label-${e}" style="white-space: nowrap"></span>
      </div>
      ${s(`88%`,`66%`)}
      <span
        class="sp-button sp-button--sm"
        data-part="pay-${e}"
        style="align-self: flex-start; cursor: default"
      >Pay now</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Late advert</span>
          <button class="sp-button sp-button--sm sp-button--ghost" type="button" data-part="reload">Reload</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px 8px">
          <div class="sp-row" style="align-items: flex-start; gap: 26px">
            <div class="sp-stack" style="gap: 6px; align-items: flex-start">
              <div class="sp-row sp-context" style="height: 26px; gap: 8px">
                <span class="sp-label" style="color: var(--sp-ink)">no slot reserved</span>
                <span class="sp-chip" data-part="badge" hidden>${n(`alert`)} moved ${r}px</span>
              </div>
              ${c(`article`,`data-subject`)}
            </div>
            <div class="sp-stack sp-context" style="gap: 6px; align-items: flex-start">
              <div class="sp-row" style="height: 26px">
                <span class="sp-label">slot reserved</span>
              </div>
              ${c(`steady`,``)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(a,`article`),u=e(a,`steady`),d=e(a,`slot-article`),f=e(a,`slot-steady`),p=e(a,`slot-label-article`),m=e(a,`slot-label-steady`),h=e(a,`badge`),g=e=>{let n=e===`arrived`;l.dataset.state=e,u.dataset.state=e,d.style.height=n?`${r}px`:`0`,d.style.background=n?`var(--sp-accent-soft)`:`transparent`,p.textContent=n?`advert`:``,f.style.height=`${r}px`,f.style.background=n?`var(--sp-accent-soft)`:`transparent`,f.style.boxShadow=n?`none`:`inset 0 0 0 1px var(--sp-line)`,m.textContent=n?`advert`:`reserved`,t(h,`hidden`,!n)},_;e(a,`reload`).addEventListener(`click`,()=>{o.clearTimeout(_),g(`waiting`),_=o.setTimeout(()=>g(`arrived`),i)}),g(`waiting`)}export{a as mount};