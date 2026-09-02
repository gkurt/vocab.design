import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`home`,label:`Home`,title:`Welcome back`},{key:`plans`,label:`Plans`,title:`Choose a plan`},{key:`cart`,label:`Cart`,title:`Your basket`}],n={consistent:{home:`bar`,plans:`bar`,cart:`bar`},wandering:{home:`bar`,plans:`footer`,cart:`float`}},r={consistent:`Meets 3.2.6`,wandering:`Fails 3.2.6`},i=`width: 64px; height: 22px; display: flex; align-items: center; justify-content: flex-end; flex: 0 0 auto`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 476px; padding: 12px 14px">
        <div class="sp-row sp-row--between" style="gap: 10px">
          <div class="sp-row sp-context" style="gap: 8px; flex: 0 0 auto">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="page-picker" data-axis="Page" data-value="home">
              ${t.map(e=>`
                <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}"
                        style="padding: 4px 9px; font-size: 11.5px">${e.label}</button>`).join(``)}
            </sp-segmented>
          </div>
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="policy-picker" data-axis="Where" data-term="consistent" data-value="consistent">
            <button class="sp-segment" type="button" data-part="seg-consistent" value="consistent"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Consistent</button>
            <button class="sp-segment" type="button" data-part="seg-wandering" value="wandering"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Wandering</button>
          </sp-segmented>
        </div>

        <div class="sp-frame" data-part="site" style="margin-top: 10px; width: 448px; height: 140px">
          <div class="sp-topbar" style="padding: 8px 12px">
            <span class="sp-heading sp-context" style="font-size: 12px; flex: 0 0 auto">Northwind</span>
            <div class="sp-row sp-grow sp-context" style="gap: 2px">
              ${t.map(e=>`
    <span class="sp-nav-item" data-part="nav-${e.key}" ${e.key===`home`?`data-current`:``}
          style="font-size: 11px; padding: 3px 8px; cursor: default">${e.label}</span>`).join(``)}
            </div>
            <div data-part="slot-bar" style="${i}"></div>
          </div>

          <div class="sp-body" style="position: relative; padding: 10px 12px">
            <span class="sp-heading sp-context" data-part="title" data-page="home" style="font-size: 12px">${t[0]?.title}</span>
            <div class="sp-stack sp-context" style="margin-top: 9px; gap: 7px">
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 64%"></div>
            </div>
            <div data-part="slot-float" style="${i}; position: absolute; right: 12px; bottom: 8px"></div>
          </div>

          <div class="sp-row sp-row--between"
               style="flex: 0 0 auto; height: 34px; padding: 0 12px; border-top: 1px solid var(--sp-line)">
            <div class="sp-row sp-context" style="gap: 12px; flex: 0 0 auto">
              <span class="sp-label" style="font-size: 10px">Terms</span>
              <span class="sp-label" style="font-size: 10px">Privacy</span>
            </div>
            <div data-part="slot-footer" style="${i}"></div>
          </div>
        </div>

        <span class="sp-text sp-text--ink" data-stage-verdict data-part="verdict" data-policy="consistent"
              style="font-size: 11px; white-space: nowrap">${r.consistent}</span>
      </div>
    </div>
  `;let o=a.ownerDocument.createElement(`button`);o.className=`sp-chip`,o.type=`button`,o.textContent=`Help`,o.dataset.part=`help`,o.dataset.where=`bar`,o.dataset.policy=`consistent`,o.setAttribute(`data-subject`,``),o.setAttribute(`data-pose`,`[data-policy=consistent]`),o.style.cssText=`font-size: 10.5px; padding: 3px 9px; cursor: default`;let s=e(a,`title`),c=e(a,`verdict`),l=`home`,u=`consistent`,d=()=>{let i=n[u][l];e(a,`slot-${i}`).append(o),o.dataset.where=i,o.dataset.policy=u;let d=t.find(e=>e.key===l)??t[0];s.dataset.page=l,s.textContent=d?.title??``;for(let n of t){let t=e(a,`nav-${n.key}`);n.key===l?t.setAttribute(`data-current`,``):t.removeAttribute(`data-current`)}c.dataset.policy=u,c.textContent=r[u]};e(a,`page-picker`).addEventListener(`change`,e=>{l=e.detail,d()}),e(a,`policy-picker`).addEventListener(`change`,e=>{u=e.detail,d()}),d()}export{a as mount};