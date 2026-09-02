import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`standard`,label:`Standard, arrives Tuesday`,note:`Free`},{key:`express`,label:`Express, arrives tomorrow`,note:`6.00`},{key:`pickup`,label:`Collect from the shop`,note:`Free`}],n={prefilled:`Three answers already given, each one saying where it came from. Changing any of them is a single tap.`,blank:`The same form assuming nothing. Every answer is now the reader’s to find, including the ones they would have agreed with.`};function r(e){let n=e===`prefilled`,r=t.map(({key:e,label:t,note:r})=>`
      <li
        class="sp-option"
        role="option"
        data-part="ship-${e}"
        data-ship="${e}"
        aria-selected="${String(n&&e===`standard`)}"
        style="display: flex; align-items: center; gap: 8px; height: 28px; padding: 0 8px"
      >
        <span class="sp-grow">${t}</span>
        ${n&&e===`standard`?`<span class="sp-chip" data-part="badge" style="padding: 1px 8px; font-size: 11px; cursor: default">Most common</span>`:`<span class="sp-label">${r}</span>`}
      </li>`).join(``);return`
    <div class="sp-row sp-row--between" style="height: 26px">
      <span class="sp-label">Country</span>
      <span class="sp-row" style="gap: 8px">
        <span class="sp-text sp-text--ink" data-part="country" data-value="${n?`gb`:``}">${n?`United Kingdom`:`Not chosen`}</span>
        <span class="sp-label" style="font-size: 11px">${n?`from your address`:``}</span>
      </span>
    </div>
    <div class="sp-row sp-row--between" style="height: 26px">
      <span class="sp-label">Delivery date</span>
      <span class="sp-row" style="gap: 8px">
        <span class="sp-text sp-text--ink" data-part="date" data-value="${n?`soonest`:``}">${n?`Tuesday 16 September`:`Not chosen`}</span>
        <span class="sp-label" style="font-size: 11px">${n?`soonest`:``}</span>
      </span>
    </div>
    <span class="sp-label" style="margin-top: 2px">Delivery method</span>
    <ul
      class="sp-listbox sp-listbox--static"
      data-part="ships"
      role="listbox"
      aria-label="Delivery method"
      style="box-shadow: none; padding: 2px; margin-top: 4px"
    >${r}</ul>`}function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout, delivery</span><span class="sp-label">Wilder &amp; Co</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div
            class="sp-surface sp-grow"
            data-part="form"
            data-subject
            data-pose="[data-mode=prefilled]"
            data-mode="prefilled"
            style="display: flex; flex-direction: column; padding: 10px 12px"
          >${r(`prefilled`)}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 300px">${n.prefilled}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="prefilled" data-axis="Fields" data-term="prefilled">
          <button class="sp-segment" data-part="mode-prefilled" value="prefilled">Defaulted</button>
          <button class="sp-segment" data-part="mode-blank" value="blank">Blank</button>
        </sp-segmented>
      
    </div>
  `;let a=e(i,`form`),o=e(i,`verdict`);a.addEventListener(`click`,n=>{let r=n.target.closest(`[data-ship]`)?.dataset.ship;if(r)for(let{key:n}of t)e(i,`ship-${n}`).setAttribute(`aria-selected`,String(n===r))}),e(i,`mode`).addEventListener(`change`,e=>{let t=e.detail===`blank`?`blank`:`prefilled`;a.dataset.mode=t,a.innerHTML=r(t),o.textContent=n[t]})}export{i as mount};