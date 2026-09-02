import{n as e}from"./parts.C-YLuC7Q.js";import{i as t}from"./measure.DK7AY2_i.js";var n=28,r=[{key:`mug`,name:`Enamel mug, speckled`,price:`14.00`},{key:`tote`,name:`Cotton tote, natural`,price:`22.00`}],i={basket:`A basket is an intention to buy now. Saving moves the item sideways instead, and the row it left keeps the undo.`,saved:`The item is parked, not bought and not deleted, and the basket total no longer counts it.`},a=e=>`<div style="height: ${n}px">${e}</div>`,o=({key:e,name:t,price:r})=>`
  <div class="sp-surface sp-context sp-row" data-part="cart-${e}" style="height: ${n}px; gap: 8px; padding: 0 8px">
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${t}</span>
    <span class="sp-text" style="font-size: 12px">${r}</span>
    <button class="sp-button sp-button--ghost sp-button--sm" data-part="save-${e}" type="button" style="padding: 2px 8px; font-size: 11px">
      Save for later
    </button>
  </div>`,s=({key:e,name:t})=>`
  <div
    class="sp-surface sp-context sp-row"
    data-part="undo-${e}"
    hidden
    style="height: ${n}px; gap: 8px; padding: 0 8px; border-style: dashed"
  >
    <span class="sp-text sp-grow" style="min-width: 0; font-size: 11px">${t} moved to Saved for later</span>
    <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo-btn-${e}" type="button" style="padding: 2px 8px; font-size: 11px">
      Undo
    </button>
  </div>`,c=(e,t,r,i,a,o)=>`
  <div
    class="sp-surface sp-row"
    data-part="saved-${e}"
    ${a?`hidden`:``}
    ${o}
    style="height: ${n}px; gap: 8px; padding: 0 8px"
  >
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${t}</span>
    <span class="sp-text" style="font-size: 12px">${r}</span>
    <span class="sp-label" style="font-size: 10px">${i}</span>
  </div>`;function l(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Basket</span>
          <span class="sp-label" data-part="basket-count" style="font-size: 11px">2 items</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-stack" data-part="basket" style="flex: 0 0 auto; gap: 6px">${r.map(e=>a(`${o(e)}${s(e)}`)).join(``)}</div>

          <div class="sp-divider sp-context" style="flex: 0 0 auto"></div>

          <div class="sp-stack" style="flex: 0 0 auto; gap: 6px">
            <span class="sp-label sp-context" data-part="saved-label" style="height: 12px; font-size: 11px">Saved for later (1)</span>
            <div class="sp-stack" data-part="saved-list" data-count="1" style="gap: 6px">${[c(`notebook`,`Field notebook, ruled`,`9.00`,`Saved 3 Feb`,!1,`data-subject`),c(`mug`,`Enamel mug, speckled`,`14.00`,`Saved just now`,!0,`class="sp-context"`),c(`tote`,`Cotton tote, natural`,`22.00`,`Saved just now`,!0,`class="sp-context"`)].map(a).join(``)}</div>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 440px; font-size: 11px">${i.basket}</span>
      
    </div>
  `;let l=e(n,`saved-list`),u=e(n,`saved-label`),d=e(n,`basket-count`),f=e(n,`note`),p=new Set,m=new Set,h=()=>{for(let{key:t}of r){let r=p.has(t);e(n,`cart-${t}`).hidden=r,e(n,`undo-${t}`).hidden=!(r&&m.has(t)),e(n,`saved-${t}`).hidden=!r}let t=p.size+1;l.dataset.count=String(t),u.textContent=`Saved for later (${t})`;let a=r.length-p.size;d.textContent=a===1?`1 item`:`${a} items`,f.textContent=p.size>0?i.saved:i.basket};for(let{key:t}of r)e(n,`save-${t}`).addEventListener(`click`,()=>{p.has(t)||(p.add(t),m.add(t),h())}),e(n,`undo-btn-${t}`).addEventListener(`click`,()=>{p.has(t)&&(p.delete(t),m.delete(t),h())});h(),f.style.height=`${Math.ceil(t(f).height)}px`}export{l as mount};