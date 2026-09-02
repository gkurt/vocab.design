import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{n as r}from"./measure.DK7AY2_i.js";var i=[{key:`product`,label:`Product`,links:[{key:`analytics`,label:`Analytics`,note:`What happened last week`},{key:`automations`,label:`Automations`,note:`Rules that run without you`},{key:`warehouse`,label:`Warehouse`,note:`Your data, queryable`}]},{key:`learn`,label:`Learn`,links:[{key:`docs`,label:`Documentation`,note:`Guides and reference`},{key:`changelog`,label:`Changelog`,note:`What shipped, and when`},{key:`community`,label:`Community`,note:`Forum and office hours`}]}];function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="frame" style="height: 268px">
        <div class="sp-topbar" data-part="topbar">
          <span class="sp-heading sp-context">Northwind</span>
          <nav class="sp-row sp-grow" data-part="menu" data-subject aria-label="Main" style="gap: 2px; justify-content: flex-end">
            ${i.map(({key:e,label:t})=>`
      <button
        class="sp-button sp-button--quiet sp-button--sm sp-row"
        type="button"
        data-part="nav-${e}"
        data-key="${e}"
        aria-expanded="false"
        aria-controls="vd-nav-panel-${e}"
        style="gap: 4px"
      >${t}${n(`chevronDown`)}</button>`).join(``)}
            <a class="sp-button sp-button--quiet sp-button--sm" data-part="link-pricing" data-key="pricing" href="#pricing">Pricing</a>
            ${i.map(({key:e,label:t,links:n})=>`
      <div class="sp-menu" id="vd-nav-panel-${e}" data-part="panel-${e}" aria-label="${t}" style="width: 208px; padding: 6px">
        <ul class="sp-nav">
          ${n.map(({key:e,label:t,note:n})=>`
            <li>
              <a class="sp-nav-item" href="#${e}" data-part="link-${e}" data-key="${e}" style="padding: 7px 10px">
                <span class="sp-text sp-text--ink" style="display: block">${t}</span>
                <span class="sp-label" style="display: block; margin-top: 1px">${n}</span>
              </a>
            </li>`).join(``)}
        </ul>
      </div>`).join(``)}
          </nav>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 10px">
            <div class="sp-line" style="width: 54%; height: 12px"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 76%"></div>
            <div class="sp-line" style="width: 82%"></div>
          </div>
          <div class="sp-divider" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Now showing</span>
            <span class="sp-text" data-part="status" data-page="home">Home</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`frame`),s=e(a,`topbar`),c=e(a,`status`),l=i.map(({key:t})=>({key:t,trigger:e(a,`nav-${t}`),panel:e(a,`panel-${t}`)})),u=s.offsetHeight+6;for(let{trigger:e,panel:t}of l){let{left:n}=r(e,o);t.style.top=`${u}px`,t.style.left=`${Math.min(Math.max(n,10),o.offsetWidth-t.offsetWidth-10)}px`}let d=e=>{for(let n of l){let r=n.key===e;t(n.panel,`data-open`,r),t(n.trigger,`data-open`,r),n.trigger.setAttribute(`aria-expanded`,String(r))}};for(let{key:e,trigger:t}of l)t.addEventListener(`click`,()=>d(e));for(let e of a.querySelectorAll(`a[data-key]`))e.addEventListener(`click`,t=>{t.preventDefault(),c.dataset.page=e.dataset.key??`home`,c.textContent=(e.querySelector(`.sp-text`)?.textContent??e.textContent??``).trim(),d(null)});a.addEventListener(`keydown`,e=>{e.key===`Escape`&&d(null)}),a.addEventListener(`pointerdown`,e=>{let t=e.target;l.some(({trigger:e,panel:n})=>e.contains(t)||n.contains(t))||d(null)})}export{a as mount};