import{n as e}from"./parts.C-YLuC7Q.js";var t=300,n=400,r=170,i=20,a=r/n,o=(e,t,i)=>`
  <div class="sp-context" style="position: relative; width: ${r}px; height: 50px">
    <span
      class="sp-label"
      style="position: absolute; left: ${t}px; top: 0; font-size: 10px; white-space: nowrap; transform: translateX(${t===0?`0`:`-50%`})"
    >${i}</span>
    <span style="position: absolute; left: ${t}px; top: 14px; width: 1px; height: 8px; background: var(--sp-muted)"></span>
    <span
      data-part="pip-${e}"
      style="position: absolute; left: ${t-3}px; top: 21px; width: 7px; height: 7px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.12s"
    ></span>
    <span style="position: absolute; left: 0; right: 0; top: 22px; height: 5px; border-radius: 3px; background: var(--sp-sunken)"></span>
    <span
      data-part="fill-${e}"
      style="position: absolute; left: 0; top: 22px; width: 0; height: 5px; border-radius: 3px; background: var(--sp-accent)"
    ></span>
    <span style="position: absolute; left: 0; top: 27px; width: 1px; height: 8px; background: var(--sp-muted)"></span>
    <span class="sp-label" style="position: absolute; left: 0; top: 34px; font-size: 10px">tap</span>
    <span class="sp-label" style="position: absolute; right: 0; top: 34px; font-size: 10px">${n} ms</span>
  </div>`;function s(n,r){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Shop</span>
          <span class="sp-text" data-part="readout" style="width: 268px; text-align: right; white-space: nowrap">No tap yet</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: stretch; justify-content: center; gap: 14px">
          <div class="sp-surface" style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 202px; padding: 12px">
            <span class="sp-label sp-context" style="height: 36px; text-align: center">Without <code>touch-action: manipulation</code></span>
            <button class="sp-button" type="button" data-part="legacy" data-subject data-delay="none" style="width: 100%">Add to cart</button>
            ${o(`legacy`,t*a,`click ${t} ms`)}
          </div>

          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 202px; padding: 12px">
            <span class="sp-label" style="height: 36px; text-align: center">With <code>touch-action: manipulation</code></span>
            <button class="sp-button" type="button" data-part="modern" data-delay="none" style="width: 100%">Add to cart</button>
            ${o(`modern`,0,`click 0 ms`)}
          </div>
        </div>
      </div>
    </div>
  `;let s=e(n,`legacy`),c=e(n,`modern`),l=e(n,`readout`),u,d=0,f=e=>{l.textContent=e},p=()=>{r.clearTimeout(u),u=void 0,d=0;for(let e of[s,c])e.removeAttribute(`data-fired`),e.dataset.delay=`none`;for(let t of[`legacy`,`modern`])e(n,`fill-${t}`).style.width=`0`,e(n,`pip-${t}`).style.opacity=`0`},m=(t,r,i,a)=>{t.setAttribute(`data-fired`,``),t.dataset.delay=String(i),e(n,`pip-${r}`).style.opacity=`1`,f(a)},h=()=>{if(d+=i,e(n,`fill-legacy`).style.width=`${Math.min(d,t)*a}px`,d>=t)return u=void 0,m(s,`legacy`,t,`Click dispatched ${t} ms after the tap`);u=r.setTimeout(h,i)};s.addEventListener(`click`,()=>{p(),f(`Tapped, holding ${t} ms`),u=r.setTimeout(h,i)}),c.addEventListener(`click`,()=>{p(),m(c,`modern`,0,`Click dispatched with the tap`)})}export{s as mount};