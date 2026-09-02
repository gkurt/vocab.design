import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=200,r=800,i=1100,a={idle:`not fetched`,fetching:`fetching`,ready:`prerendered`};function o(o,s){let c=e=>e.map(e=>`<span class="sp-line" style="width: ${e}%"></span>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <button class="sp-icon-button" data-part="back" aria-label="Back">${t(`chevronLeft`)}</button>
          <span class="sp-text sp-grow" data-part="address">example.site/kit</span>
        </div>
        <div class="sp-body" style="padding: 14px 16px">
          <div data-part="screen" data-state="index" style="height: 100%">
            <div data-part="page-index" class="sp-stack" style="gap: 10px">
              <span class="sp-label sp-context">Read next</span>
              <div class="sp-row">
                <a class="sp-nav-item sp-grow" role="link" tabindex="0" data-part="covered" data-subject style="color: var(--sp-ink); text-decoration: underline; text-underline-offset: 3px">Colour ramps</a>
                <span class="sp-text" data-part="covered-mark" data-state="idle" style="flex: 0 0 92px; text-align: right">${a.idle}</span>
              </div>
              <div class="sp-row sp-context">
                <a class="sp-nav-item sp-grow" role="link" tabindex="0" data-part="plain" style="color: var(--sp-ink); text-decoration: underline; text-underline-offset: 3px">Spacing scale</a>
                <span class="sp-text" style="flex: 0 0 92px; text-align: right">no rule</span>
              </div>
            </div>
            <div data-part="page-covered" class="sp-stack" style="gap: 10px" hidden>
              <span class="sp-heading">Colour ramps</span>
              <div class="sp-stack sp-context" style="gap: 7px">${c([96,88,72])}</div>
              <span class="sp-text sp-context">Already fetched and rendered before the click, so the click had nothing left to do.</span>
            </div>
            <div data-part="page-plain" class="sp-stack" style="gap: 10px" hidden>
              <span class="sp-heading">Spacing scale</span>
              <div class="sp-stack sp-context" style="gap: 7px">${c([92,80,64])}</div>
              <span class="sp-text sp-context">Fetched after the click, which is the wait the rule was there to remove.</span>
            </div>
            <div data-part="page-waiting" class="sp-stack sp-context" style="gap: 10px; height: 100%; justify-content: center; align-items: center" hidden>
              <span class="sp-text">Fetching example.site/kit/spacing-scale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(o,`screen`),u=e(o,`covered`),d=e(o,`plain`),f=e(o,`covered-mark`),p=e(o,`address`),m={index:e(o,`page-index`),covered:e(o,`page-covered`),plain:e(o,`page-plain`),waiting:e(o,`page-waiting`)},h,g,_=!1,v=(e,t,n)=>{l.dataset.state=e,p.textContent=n;for(let[e,n]of Object.entries(m))n.hidden=e!==t},y=e=>{f.dataset.state=e,f.textContent=a[e]};u.addEventListener(`pointerenter`,()=>{_||h!==void 0||(h=s.setTimeout(()=>{h=void 0,y(`fetching`),s.setTimeout(()=>{_=!0,y(`ready`)},r)},n))}),u.addEventListener(`pointerleave`,()=>{s.clearTimeout(h),h=void 0}),u.addEventListener(`click`,()=>{if(_){v(`instant`,`covered`,`example.site/kit/colour-ramps`);return}v(`waiting`,`waiting`,`example.site/kit/colour-ramps`),g=s.setTimeout(()=>v(`arrived`,`covered`,`example.site/kit/colour-ramps`),i)}),d.addEventListener(`click`,()=>{v(`waiting`,`waiting`,`example.site/kit/spacing-scale`),g=s.setTimeout(()=>v(`arrived`,`plain`,`example.site/kit/spacing-scale`),i)}),e(o,`back`).addEventListener(`click`,()=>{s.clearTimeout(g),v(`index`,`index`,`example.site/kit`)})}export{o as mount};