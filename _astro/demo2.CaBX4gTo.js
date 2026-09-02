import{n as e,t}from"./parts.C-YLuC7Q.js";var n=700,r=`inset 0 2px 5px rgb(16 24 40 / 0.35)`,i=[{key:`rest`,label:`Rest`,attr:``},{key:`hovered`,label:`Hovered`,attr:`data-hovered`},{key:`pressed`,label:`Pressed`,attr:`data-pressed`}];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
          <span class="sp-text" data-part="count" data-presses="0" style="width: 116px; text-align: right">Presses: 0</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px">
          <button
            class="sp-button"
            type="button"
            data-part="button"
            data-subject
            style="width: 168px; padding: 10px 16px; touch-action: none; transition: box-shadow 0.09s linear"
          >Place order</button>
          <div class="sp-row sp-context" style="gap: 12px">${i.map(({key:e,label:t,attr:n})=>`
      <div class="sp-stack" style="align-items: center; gap: 6px; width: 84px">
        <button
          class="sp-button sp-button--sm"
          type="button"
          tabindex="-1"
          data-part="ref-${e}"
          ${n}
          style="width: 100%; ${e===`pressed`?`box-shadow: ${r}`:``}"
        >Buy</button>
        <span class="sp-label">${t}</span>
      </div>`).join(``)}</div>
        </div>
      </div>
    </div>
  `;let s=e(a,`button`),c=e(a,`count`),l=!1,u=0,d,f=e=>{t(s,`data-pressed`,e),s.style.boxShadow=e?r:``},p=()=>{o.clearTimeout(d),d=void 0,f(!1)};s.addEventListener(`pointerdown`,()=>{l=!0,o.clearTimeout(d),d=void 0,f(!0)}),s.addEventListener(`pointerup`,()=>{l&&(l=!1,u+=1,c.textContent=`Presses: ${u}`,c.dataset.presses=String(u),d=o.setTimeout(p,n))});for(let e of[`pointerleave`,`pointercancel`])s.addEventListener(e,()=>{l&&(l=!1,p())})}export{a as mount};