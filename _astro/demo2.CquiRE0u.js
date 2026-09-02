import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`margin: 0; padding: 4px 12px 10px; min-inline-size: 0; border: 1px solid var(--sp-line);
             border-radius: var(--sp-radius); background: var(--sp-surface);
             transition: border-color 0.2s ease, background-color 0.2s ease`,n=`padding: 0 6px; font-size: 11px; font-weight: 600; color: var(--sp-ink)`,r={grouped:`"Delivery address, group. Street, edit text."`,flat:`"Street, edit text." Which street?`},i=(e,r,i,a,o)=>`
  <fieldset
    data-part="${e}"
    data-mode="grouped"
    ${i?`data-subject data-pose="[data-mode=grouped]"`:`class="sp-context"`}
    style="${t}"
  >
    <legend data-part="${e}-legend" style="${n}">${r}</legend>
    <div class="sp-row" style="gap: 10px; align-items: flex-end">
      <div class="sp-field sp-grow" style="gap: 3px">
        <label class="sp-label" for="vd-${e}-street">Street</label>
        <input class="sp-input" id="vd-${e}-street" data-part="${e}-street" type="text" value="${a}" autocomplete="off" spellcheck="false" />
      </div>
      <div class="sp-field" style="gap: 3px; flex: 0 0 auto; width: 116px">
        <label class="sp-label" for="vd-${e}-postcode">Postcode</label>
        <input class="sp-input" id="vd-${e}-postcode" data-part="${e}-postcode" type="text" value="${o}" autocomplete="off" spellcheck="false" />
      </div>
    </div>
  </fieldset>`;function a(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Fields" data-term="grouped" data-part="picker" data-value="grouped">
            <button class="sp-segment" type="button" data-part="seg-grouped" value="grouped" style="padding: 4px 10px; font-size: 12px">Grouped</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat" style="padding: 4px 10px; font-size: 12px">Flat</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <form class="sp-stack" data-part="form" novalidate style="gap: 10px">
            ${i(`delivery`,`Delivery address`,!0,`12 Harbour Lane`,`BS1 4TR`)}
            ${i(`billing`,`Billing address`,!1,`4 Mill Row`,`BS8 2QN`)}
          </form>

                      <span
              data-stage-announce data-part="announce"
              data-named="true"
              style="height: 16px; font-size: 12px; line-height: 16px; white-space: nowrap; overflow: hidden"
            >${r.grouped}</span>
          
        </div>
      </div>
    </div>
  `;let n=e(t,`picker`),a=e(t,`announce`),o=[e(t,`delivery`),e(t,`billing`)],s=[e(t,`delivery-legend`),e(t,`billing-legend`)],c=e=>{let t=e!==`flat`;for(let e of o)e.dataset.mode=t?`grouped`:`flat`,e.style.borderColor=t?`var(--sp-line)`:`transparent`,e.style.background=t?`var(--sp-surface)`:`transparent`;for(let e of s)e.style.visibility=t?``:`hidden`;a.dataset.named=String(t),a.textContent=r[t?`grouped`:`flat`]??``};n.addEventListener(`change`,e=>c(e.detail)),c(`grouped`)}export{a as mount};