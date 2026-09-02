import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=48,r=150,i=150,a={"1x":12,"2x":6,"3x":4},o={"1x":{label:`mdpi`,scale:1},"2x":{label:`xhdpi`,scale:2},"3x":{label:`xxhdpi`,scale:3}},s={"1x":`At 1x a dp is one device pixel, so the two phones are drawing the button the same way.`,"2x":`At 2x the same 48 dp button is painted with 96 device pixels and stays exactly as large.`,"3x":`At 3x it takes 144 device pixels to draw the same button. Density buys detail, never room.`},c=e=>{let t=a[e]??12,n=`color-mix(in srgb, var(--sp-muted) 26%, transparent)`;return`repeating-linear-gradient(to right, ${n} 0 1px, transparent 1px ${t}px), repeating-linear-gradient(to bottom, ${n} 0 1px, transparent 1px ${t}px)`},l=e=>{let t=o[e];return t?`${e} ${t.label} &middot; ${n} dp = ${n*t.scale} px`:``};function u(a){let o=(e,a,o)=>`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
      <div
        data-part="phone-${e}"
        data-density="${a}"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
               width: ${r}px; height: ${i}px; padding: 10px; border-radius: 16px;
               background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden;
               background-image: ${c(a)}"
      >
        <button
          class="sp-button"
          type="button"
          data-part="button-${e}"
          ${o?`data-subject`:``}
          aria-label="New booking"
          style="display: flex; align-items: center; justify-content: center; width: ${n}px; height: ${n}px; padding: 0; border-radius: 14px"
        >${t(`plus`)}</button>
        <span style="display: flex; flex-direction: column; align-items: center; gap: 4px">
          <span style="width: ${n}px; height: 4px; border-radius: 2px; background: var(--sp-muted); opacity: 0.6"></span>
          <span class="sp-label sp-context" style="font-size: 10px">${n} dp</span>
        </span>
      </div>
      <span class="sp-label sp-context" data-part="px-${e}" style="font-size: 11px">${l(a)}</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Device preview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Screen density" data-value="3x">
            <button class="sp-segment" type="button" data-part="seg-1x" value="1x">1x</button>
            <button class="sp-segment" type="button" data-part="seg-2x" value="2x">2x</button>
            <button class="sp-segment" type="button" data-part="seg-3x" value="3x">3x</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 10px 12px">
          <div style="display: flex; justify-content: center; gap: 24px; flex: 0 0 auto">
            ${o(`a`,`1x`,!1)}${o(`b`,`3x`,!0)}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="caption" style="height: 40px; max-width: 428px; text-align: center">${s[`3x`]}</span>
        </div>
      </div>
    </div>
  `;let u=e(a,`phone-b`),d=e(a,`px-b`),f=e(a,`caption`),p=e=>{let t=s[e];t&&(u.dataset.density=e,u.style.backgroundImage=c(e),d.innerHTML=l(e),f.textContent=t)};e(a,`switcher`).addEventListener(`change`,e=>p(e.detail))}export{u as mount};