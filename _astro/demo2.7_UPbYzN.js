import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[`Overview`,`Orders`,`Stock`,`Reports`,`Settings`],i=76,a=70,o=10,s={wide:434,medium:302,narrow:196},c={wide:`Everything fits, so nothing is hidden and there is no More control at all.`,medium:`Two of five fit. Ranks three to five moved into More, in that order.`,narrow:`One fits. The top priority keeps the bar and the rest are one press away.`},l=[`display: inline-flex`,`align-items: center`,`justify-content: center`,`flex: 0 0 auto`,`width: 14px`,`height: 14px`,`border-radius: 50%`,`background: var(--sp-sunken)`,`font-size: 9px`,`font-weight: 600`].join(`; `),u=`flex: 0 0 ${i}px; display: flex; align-items: center; gap: 5px; padding: 6px; font-size: 11px`,d=`display: flex; align-items: center; gap: 6px; width: 100%; padding: 6px 8px; font-size: 12px`;function f(e){let t=e-20;return r.length*i<=t?r.length:Math.max(1,Math.floor((t-a)/i))}function p(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 224px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Supply</span>
          <span class="sp-label" data-part="width-label" style="font-size: 11px">Window 434px</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; align-items: flex-start">

          <div class="sp-surface" data-part="window" style="flex: 0 0 auto; width: ${s.wide}px; height: 140px">

            <div
              class="sp-row"
              data-part="nav"
              data-subject
              data-visible="5"
              style="position: relative; height: 40px; gap: 0; padding: 0 ${o}px; border-bottom: 1px solid var(--sp-line)"
            >
              <span data-part="bar" style="display: flex; align-items: center; gap: 0; min-width: 0"></span>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="more" type="button"
                      style="flex: 0 0 ${a}px; margin-left: auto; display: flex; align-items: center; justify-content: center; gap: 4px; padding: 6px; font-size: 11px">
                More ${n(`chevronDown`)}
              </button>
              <div class="sp-menu" data-part="menu" role="menu" aria-label="More pages"
                   style="top: 36px; right: 6px; min-width: 148px"></div>
            </div>

            <div class="sp-context sp-stack" style="gap: 8px; padding: 12px">
              <span class="sp-heading" data-part="page-title" style="font-size: 13px">Overview</span>
              <span class="sp-line" style="width: 88%"></span>
              <span class="sp-line" style="width: 74%"></span>
              <span class="sp-line" style="width: 81%"></span>
            </div>

          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 262px; height: 34px; font-size: 11px">${c.wide}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="pick" data-axis="Width" data-value="wide">
          <button class="sp-segment" data-part="pick-wide" value="wide" style="padding: 5px 9px; font-size: 12px">Wide</button>
          <button class="sp-segment" data-part="pick-medium" value="medium" style="padding: 5px 9px; font-size: 12px">Medium</button>
          <button class="sp-segment" data-part="pick-narrow" value="narrow" style="padding: 5px 9px; font-size: 12px">Narrow</button>
        </sp-segmented>
      
    </div>
  `;let p=e(i,`window`),m=e(i,`nav`),h=e(i,`bar`),g=e(i,`menu`),_=e(i,`more`),v=e(i,`width-label`),y=e(i,`page-title`),b=e(i,`note`),x=r.map((e,t)=>{let n=document.createElement(`span`);return n.className=`sp-nav-item`,n.dataset.part=`item-${t+1}`,n.dataset.rank=String(t+1),n.innerHTML=`<span style="${l}">${t+1}</span><span class="sp-grow" style="min-width: 0; text-align: left">${e}</span>`,n}),S=0,C=`wide`,w=()=>{let e=s[C],n=f(e);p.style.width=`${e}px`,v.textContent=`Window ${e}px`,m.dataset.visible=String(n),x.forEach((e,r)=>{let i=r<n;e.setAttribute(`style`,i?u:d),(i?h:g).append(e),t(e,`data-current`,r===S)}),_.hidden=n===r.length,t(_,`data-current`,S>=n),t(g,`data-open`,!1),t(_,`data-open`,!1),y.textContent=r[S]??r[0],b.textContent=c[C]};_.addEventListener(`click`,()=>{t(g,`data-open`,!0),t(_,`data-open`,!0)}),x.forEach((e,t)=>{e.addEventListener(`click`,()=>{S=t,w()})}),e(i,`pick`).addEventListener(`change`,e=>{C=e.detail,w()}),w()}export{p as mount};