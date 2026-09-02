import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";var n=[{id:`overview`,label:`Overview`},{id:`catalogue`,label:`Catalogue`},{id:`loans`,label:`Loans`},{id:`holds`,label:`Holds`}],r=`left 0.22s var(--sp-ease), width 0.22s var(--sp-ease)`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 392px">
        <div class="sp-row sp-context" role="tablist" style="gap: 2px" data-part="tabs">${n.map(e=>`<button class="sp-segment" type="button" role="tab" aria-selected="false" data-part="tab-${e.id}" value="${e.id}">${e.label}</button>`).join(``)}</div>
        <div data-part="rail" style="position: relative; height: 3px; margin-top: 2px">
          <span
            data-part="indicator"
            data-subject
            data-at="overview"
            style="position: absolute; top: 0; left: 0; width: 0; height: 3px; border-radius: 999px; background: var(--sp-accent)"
          ></span>
        </div>
        <div class="sp-divider sp-context"></div>
        <div class="sp-stack sp-context" style="gap: 8px; margin-top: 12px; min-height: 62px">
          <span class="sp-heading" data-part="panel-title" style="font-size: 14px">Overview</span>
          <span class="sp-line" style="width: 92%"></span>
          <span class="sp-line" style="width: 74%"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`indicator`),o=e(i,`rail`),s=e(i,`panel-title`),c=(c,l)=>{let u=n.find(e=>e.id===c);if(!u)return;let d=e(i,`tab-${u.id}`),f=t(d,o),p=Math.round(f.left),m=Math.round(f.width);a.style.transition=l?r:`none`,a.style.left=`${p}px`,a.style.width=`${m}px`,a.dataset.at=u.id;for(let t of n)e(i,`tab-${t.id}`).setAttribute(`aria-selected`,String(t.id===u.id));s.textContent=u.label};for(let t of n)e(i,`tab-${t.id}`).addEventListener(`click`,()=>c(t.id,!0));c(`overview`,!1)}export{i as mount};