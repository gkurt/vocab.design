import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Q3 report</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trigger" aria-expanded="false">Share</button>
        </div>
        <div class="sp-body sp-context" data-part="page">
          <div class="sp-stack">
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 61%"></div>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 22px">
            <span class="sp-label" data-part="caption">Closed by</span>
            <span class="sp-text sp-text--ink" data-part="reason" style="width: 118px; text-align: right">nothing yet</span>
          </div>
        </div>
        <div class="sp-popover" data-part="popover" data-subject role="dialog" aria-label="Share" style="top: 46px; right: 12px; width: 190px; --sp-arrow-x: 150px">
          <span class="sp-label">Anyone with the link</span>
          <div class="sp-stack" style="margin-top: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px">${n(`copy`)} Copy link</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px">${n(`share`)} Send by email</button>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`popover`),a=e(r,`trigger`),o=e(r,`reason`),s=e=>{t(i,`data-open`,e),a.setAttribute(`aria-expanded`,String(e))},c=e=>{i.hasAttribute(`data-open`)&&(o.textContent=e,s(!1))};a.addEventListener(`click`,()=>s(!0)),r.addEventListener(`pointerdown`,e=>{i.contains(e.target)||a.contains(e.target)||c(`outside click`)}),r.addEventListener(`keydown`,e=>{e.key===`Escape`&&c(`Escape`)})}export{r as mount};