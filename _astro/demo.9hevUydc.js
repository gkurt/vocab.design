import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=42,n=[{label:`Service fee`,amount:9.6},{label:`Facility fee`,amount:5.5},{label:`Delivery, mobile ticket`,amount:4.99}],r=[`Seats`,`Delivery`,`Payment`,`Confirm`],i=t+n.reduce((e,t)=>e+t.amount,0),a={dripping:`The advertised 42.00 won the click. Each step adds a fee nobody can decline.`,honest:`One number from the first screen, with the same lines under it. Nothing to reveal later.`},o=e=>e.toFixed(2),s=(e,t,n,r)=>`
  <div class="sp-row sp-row--between" data-part="${e}" style="height: 17px${r?`; visibility: hidden`:``}">
    <span class="sp-text" style="font-size: 12px">${t}</span>
    <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">${n}</span>
  </div>`;function c(c){let l=r.map((e,t)=>`
      <li class="sp-nav-item" data-part="step-${t}" ${t===0?`data-current`:``} style="padding: 5px 8px; font-size: 12px">${e}</li>`).join(``);c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Riverside Arena</span><span class="sp-label">Checkout</span></div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 10px">

          <section class="sp-context" style="display: flex; flex-direction: column; gap: 7px; flex: 0 0 auto; width: 142px">
            <span class="sp-label" data-part="advert-label" style="height: 17px; font-size: 11px">Advertised: ${o(t)}</span>
            <ul class="sp-nav" data-part="rail">${l}</ul>
            <button class="sp-button" data-part="next" type="button" style="width: 100%; margin-top: auto">Continue</button>
          </section>

          <div style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-width: 0">
            <div class="sp-row sp-context" style="height: 17px; justify-content: flex-end">
              <span class="sp-label" data-part="stage-label" style="font-size: 11px">Step 1 of 4</span>
            </div>
            <section
              class="sp-surface"
              data-part="total"
              data-subject
              data-pose="[data-mode=dripping]"
              data-mode="dripping"
              data-step="0"
              style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 1 1 auto; min-height: 0; padding: 10px 12px"
            >
              ${s(`line-ticket`,`Standard admission &times;2`,o(t),!1)}
              ${n.map((e,t)=>s(`fee-${t}`,e.label,o(e.amount),!0)).join(``)}
              <span class="sp-divider" style="margin: 4px 0"></span>
              <div class="sp-row sp-row--between" style="height: 22px">
                <span class="sp-text sp-text--ink" style="font-weight: 600">Total</span>
                <span class="sp-heading" data-part="value-total" style="font-variant-numeric: tabular-nums">${o(t)}</span>
              </div>
              <div class="sp-row sp-row--between" style="height: 16px">
                <span class="sp-text" style="font-size: 11px">Advertised price</span>
                <span class="sp-text" data-part="advertised" style="font-size: 11px; font-variant-numeric: tabular-nums">${o(t)}</span>
              </div>
            </section>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 296px; font-size: 11px">${a.dripping}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="dripping" data-axis="Drip pricing" data-term="dripping">
          <button class="sp-segment" data-part="mode-dripping" value="dripping">With</button>
          <button class="sp-segment" data-part="mode-honest" value="honest">Without</button>
        </sp-segmented>
      
    </div>
  `;let u=e(c,`total`),d=e(c,`verdict`),f=e(c,`stage-label`),p=e(c,`value-total`),m=e(c,`advertised`),h=e(c,`advert-label`),g=e(c,`next`),_=[...e(c,`rail`).children],v=n.map((t,n)=>e(c,`fee-${n}`)),y=(e,s)=>{u.dataset.mode=e,u.dataset.step=String(s);let c=e===`honest`?n.length:s;v.forEach((e,t)=>{e.style.visibility=t<c?`visible`:`hidden`});let l=e===`honest`?i:t+n.slice(0,s).reduce((e,t)=>e+t.amount,0);p.textContent=o(l);let y=e===`honest`?i:t;m.textContent=o(y),h.textContent=`Advertised: ${o(y)}`,m.style.textDecoration=e===`dripping`&&s>0?`line-through`:`none`,f.textContent=`Step ${s+1} of ${r.length}`,d.textContent=a[e];for(let[e,t]of _.entries())e===s?t.setAttribute(`data-current`,``):t.removeAttribute(`data-current`);g.setAttribute(`aria-disabled`,String(s>=r.length-1))};g.addEventListener(`click`,()=>{let e=u.dataset.mode===`honest`?`honest`:`dripping`,t=Number(u.dataset.step??0)+1;t>=r.length||y(e,t)}),e(c,`mode`).addEventListener(`change`,e=>{y(e.detail===`honest`?`honest`:`dripping`,0)}),y(`dripping`,0)}export{c as mount};