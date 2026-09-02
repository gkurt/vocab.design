import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=2,i=[`Tide tables for October`,`Slipway repairs begin Monday`,`Ferry timetable, winter`];function a(a,o){let s=i.map((e,t)=>`
      <li class="sp-list-item" style="padding: 7px 4px">
        <span class="sp-grow ${t===0?`sp-text sp-text--ink`:`sp-text`}"
              ${t===0?`data-part="link" role="link" tabindex="0" style="text-decoration: underline; cursor: pointer"`:``}>${e}</span>
      </li>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-icon-button" aria-hidden="true" style="width: 22px; height: 22px">${n(`chevronLeft`)}</span>
          <span class="sp-chip sp-grow" data-part="url" style="justify-content: flex-start; cursor: default">harbour-times.example</span>
        </div>
        <div class="sp-body" style="position: relative; padding: 0">
          <div class="sp-context" data-part="site" style="height: 100%; padding: 10px 12px">
            <span class="sp-heading" style="font-size: 14px">Harbour Times</span>
            <ul class="sp-list" style="margin-top: 4px">${s}</ul>
          </div>
          <div
            data-part="ad"
            data-subject
            role="group"
            aria-label="Sponsored message"
            hidden
            style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
                   gap: 8px; padding: 18px; text-align: center; background: var(--sp-surface)"
          >
            <span class="sp-label" style="font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase">Advertisement</span>
            <span class="sp-heading" style="font-size: 16px">Harbour Times Premium</span>
            <span class="sp-text" style="max-width: 260px">Every tide table, every slipway notice, on any device.</span>
            <button class="sp-button" type="button" data-part="offer" style="margin-top: 2px">Subscribe for 4.00 a month</button>
            <button
              class="sp-button sp-button--quiet sp-button--sm"
              type="button"
              data-part="skip"
              aria-disabled="true"
              style="width: 210px; color: var(--sp-muted)"
            >Continue in ${r}</button>
          </div>
          <div class="sp-context" data-part="article" hidden style="position: absolute; inset: 0; background: var(--sp-surface); padding: 10px 12px">
            <span class="sp-heading" style="font-size: 14px">${i[0]}</span>
            <div class="sp-stack" style="margin-top: 10px">
              <div class="sp-line" style="width: 96%"></div>
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 61%"></div>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back" style="margin-top: 14px">Back to the index</button>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(a,`site`),l=e(a,`ad`),u=e(a,`article`),d=e(a,`skip`),f=e(a,`url`),p=r,m,h=()=>{d.textContent=p>0?`Continue in ${p}`:`Continue to the article`,d.setAttribute(`aria-disabled`,String(p>0)),d.style.color=p>0?`var(--sp-muted)`:`var(--sp-ink)`,t(d,`data-ready`,p===0)},g=()=>{p<=0||(m=o.setTimeout(()=>{--p,h(),g()},1e3))},_=e=>{o.clearTimeout(m),c.hidden=e!==`site`,l.hidden=e!==`ad`,u.hidden=e!==`article`,f.textContent=e===`ad`?`harbour-times.example/interstitial`:`harbour-times.example`,e===`ad`&&(p=r,h(),g())};e(a,`link`).addEventListener(`click`,()=>_(`ad`)),d.addEventListener(`click`,()=>{p>0||_(`article`)}),e(a,`back`).addEventListener(`click`,()=>_(`site`))}export{a as mount};