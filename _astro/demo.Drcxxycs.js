import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=1,r=8,i=24;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-context" style="gap: 10px">
          <div class="sp-swatch" style="width: 40px; height: 40px; --sp-swatch: var(--sp-sunken)"></div>
          <div class="sp-stack" style="gap: 6px; flex: 1 1 auto">
            <span class="sp-heading">Enamel mug</span>
            <span class="sp-text">$${i}.00 each</span>
          </div>
        </div>
        <div class="sp-row sp-row--between" style="margin-top: 16px">
          <span class="sp-label sp-context" id="vd-qty-label">Quantity</span>
          <div
            class="sp-surface sp-row"
            data-part="stepper"
            data-subject
            role="group"
            aria-labelledby="vd-qty-label"
            style="gap: 0; padding: 2px"
          >
            <button class="sp-icon-button" type="button" data-part="decrease" aria-label="Fewer">${t(`minus`)}</button>
            <span
              class="sp-text sp-text--ink"
              data-part="value"
              data-value="${n}"
              role="spinbutton"
              tabindex="0"
              aria-labelledby="vd-qty-label"
              aria-valuemin="${n}"
              aria-valuemax="${r}"
              aria-valuenow="${n}"
              style="width: 30px; text-align: center; font-variant-numeric: tabular-nums"
            >${n}</span>
            <button class="sp-icon-button" type="button" data-part="increase" aria-label="More">${t(`plus`)}</button>
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 16px 0 10px"></div>
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-text">Subtotal</span>
          <span class="sp-text sp-text--ink" data-part="subtotal" style="width: 64px; text-align: right; font-variant-numeric: tabular-nums">$${i}.00</span>
        </div>
      </div>
    </div>
  `;let o=e(a,`stepper`),s=e(a,`value`),c=e(a,`decrease`),l=e(a,`increase`),u=e(a,`subtotal`),d=n,f=()=>{s.textContent=String(d),s.dataset.value=String(d),s.setAttribute(`aria-valuenow`,String(d)),u.textContent=`$${(d*i).toFixed(2)}`;for(let[e,t]of[[c,d===n],[l,d===r]])e.setAttribute(`aria-disabled`,String(t))},p=e=>{let t=Math.min(r,Math.max(n,d+e));t!==d&&(d=t,f())};c.addEventListener(`click`,()=>p(-1)),l.addEventListener(`click`,()=>p(1)),o.addEventListener(`keydown`,e=>{if(e.key===`ArrowUp`||e.key===`ArrowRight`)p(1);else if(e.key===`ArrowDown`||e.key===`ArrowLeft`)p(-1);else if(e.key===`Home`)p(n-d);else if(e.key===`End`)p(r-d);else return;e.preventDefault()}),f()}export{a as mount};