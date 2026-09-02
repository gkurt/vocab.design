import{n as e}from"./parts.C-YLuC7Q.js";var t=`SPRING10`,n=.06,r=4.5,i=[{name:`Reading lamp, brass`,qty:1,price:48},{name:`Linen shade`,qty:2,price:7}],a=i.reduce((e,t)=>e+t.qty*t.price,0),o=e=>e.toFixed(2);function s(e,t,n,r=``){return`
    <div class="sp-row sp-row--between" data-part="line-${e}" style="height: 17px${r}">
      <span class="sp-text" style="font-size: 12px">${t}</span>
      <span class="sp-text sp-text--ink" data-part="value-${e}" style="font-size: 12px; font-variant-numeric: tabular-nums">${n}</span>
    </div>`}function c(c){let l=i.map(({name:e,qty:t,price:n})=>`
      <div class="sp-row sp-row--between" style="gap: 8px; height: 18px">
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${e}</span>
        <span class="sp-text" style="font-size: 12px">&times;${t}</span>
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">${o(t*n)}</span>
      </div>`).join(``);c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 306px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout</span><span class="sp-label">Step 3 of 3</span></div>
        <div class="sp-body" style="display: flex; flex-direction: row; gap: 10px">

          <section class="sp-context" style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0">
            <span class="sp-heading" style="font-size: 14px">Payment</span>
            <span class="sp-text" style="font-size: 12px">Contact and delivery are done. Card details next.</span>
            <input class="sp-input" data-part="card" type="text" value="4242 4242 4242 4242" readonly aria-label="Card number" />
            <div class="sp-row" style="gap: 8px">
              <input class="sp-input" type="text" value="04/29" readonly aria-label="Expiry" style="width: 70px" />
              <input class="sp-input" type="text" value="123" readonly aria-label="Security code" style="width: 62px" />
            </div>
            <button class="sp-button" data-part="pay" type="button" style="margin-top: auto">Pay <span data-part="pay-total">${o(a+r+a*n)}</span></button>
          </section>

          <section class="sp-surface" data-part="summary" data-subject
                   style="display: flex; flex-direction: column; gap: 5px; flex: 0 0 auto; width: 214px; padding: 9px 10px">
            <span class="sp-label">Order summary</span>
            ${l}
            <span class="sp-divider"></span>
            ${s(`subtotal`,`Subtotal`,o(a))}
            ${s(`shipping`,`Shipping, 2 to 4 days`,o(r))}
            ${s(`tax`,`Tax at 6%`,o(a*n))}
            ${s(`discount`,`Discount, ${t}`,`0.00`,`; visibility: hidden`)}
            <span class="sp-divider"></span>
            <div class="sp-row sp-row--between" data-part="line-total" style="height: 20px">
              <span class="sp-text sp-text--ink" style="font-weight: 600">Total</span>
              <span class="sp-text sp-text--ink" data-part="value-total" style="font-weight: 600; font-variant-numeric: tabular-nums">${o(a+r+a*n)}</span>
            </div>
            <div class="sp-row" style="gap: 6px; margin-top: auto">
              <input class="sp-input sp-grow" data-part="promo" type="text" spellcheck="false" placeholder="Promo code" aria-label="Promo code" style="min-width: 0; font-size: 12px" />
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="apply" type="button" style="padding: 5px 8px; font-size: 12px">Apply</button>
            </div>
          </section>

        </div>
      </div>
    </div>
  `;let u=e(c,`summary`),d=e(c,`promo`),f=e(c,`line-discount`),p=e=>{let t=a-e;return t+r+t*n};e(c,`apply`).addEventListener(`click`,()=>{if(u.hasAttribute(`data-discounted`)||d.value.trim().toUpperCase()!==t)return;let r=a*.1;u.setAttribute(`data-discounted`,``),f.style.visibility=`visible`,e(c,`value-discount`).textContent=`-${o(r)}`,e(c,`value-tax`).textContent=o((a-r)*n),e(c,`value-total`).textContent=o(p(r)),e(c,`pay-total`).textContent=o(p(r)),d.readOnly=!0})}export{c as mount};