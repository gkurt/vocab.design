import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=`#f4f5f7`,r=`#23262b`,i=[{key:`border`,label:`Field border`,pass:`#8b8b8b`,fade:`#c4c4c4`,passRatio:`3.1`,fadeRatio:`1.6`},{key:`icon`,label:`Icon stroke`,pass:`#55595f`,fade:`#c4c4c4`,passRatio:`6.5`,fadeRatio:`1.6`},{key:`ring`,label:`Focus ring`,pass:`#3557e8`,fade:`#aab8f2`,passRatio:`5.2`,fadeRatio:`1.8`},{key:`chart`,label:`Series line`,pass:`#2f7d5b`,fade:`#c4c4c4`,passRatio:`4.6`,fadeRatio:`1.6`}],a={pass:`Every part that identifies a control or carries meaning clears 3:1 against the panel behind it.`,faded:`The same parts near 1.6:1. Nothing was removed, and the field, the state and the series all became guesses.`},o=`flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 8px`,s=`font-size: 10px; text-align: center; white-space: nowrap`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 16px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="pass" data-axis="Contrast" data-term="pass">
          <button class="sp-segment" data-part="seg-pass" value="pass">Meets 3:1</button>
          <button class="sp-segment" data-part="seg-faded" value="faded">Faded</button>
        </sp-segmented>

        <div data-part="row" data-subject data-pose="[data-mode=pass]" data-mode="pass"
             style="margin-top: 12px; display: flex; gap: 10px; padding: 14px 12px; border-radius: 8px;
                    background: ${n}; color: ${r}">
          ${i.map(e=>`
    <div data-part="item-${e.key}" data-mode="pass" style="${o}">
      <div data-part="art-${e.key}" style="display: flex; align-items: center; justify-content: center; height: 44px"></div>
      <span style="${s}; color: ${r}">${e.label}</span>
      <span data-part="ratio-${e.key}" data-value="${e.passRatio}"
            style="${s}; font-weight: 600; color: ${r}">${e.passRatio}:1</span>
    </div>`).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="pass"
           style="margin: 10px 0 0; height: 30px; font-size: 11px">${a.pass}</p>
      </div>
    </div>
  `;let l=e(c,`row`),u=e(c,`caption`),d={border:e=>`<span style="display: flex; align-items: center; width: 76px; height: 26px; padding: 0 8px;
                    border: 1px solid ${e}; border-radius: 5px; font-size: 11px; color: ${r}">Email</span>`,icon:e=>`<span style="display: flex; color: ${e}; transform: scale(1.5)">${t(`bell`)}</span>`,ring:e=>`<span style="display: flex; align-items: center; justify-content: center; width: 60px; height: 24px;
                    border-radius: 5px; background: #dfe1e6; color: ${r}; font-size: 11px;
                    outline: 2px solid ${e}; outline-offset: 2px">Send</span>`,chart:e=>`<svg viewBox="0 0 76 30" width="76" height="30" aria-hidden="true">
         <polyline points="2,24 14,16 26,20 38,7 50,13 62,4 74,10" fill="none" stroke="${e}"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
       </svg>`},f=t=>{l.dataset.mode=t?`pass`:`faded`;for(let n of i){let r=t?n.pass:n.fade;e(c,`art-${n.key}`).innerHTML=d[n.key](r),e(c,`item-${n.key}`).dataset.mode=t?`pass`:`faded`;let i=e(c,`ratio-${n.key}`),a=t?n.passRatio:n.fadeRatio;i.dataset.value=a,i.textContent=`${a}:1`}u.dataset.case=t?`pass`:`faded`,u.textContent=t?a.pass:a.faded};e(c,`segmented`).addEventListener(`change`,e=>{f(e.detail!==`faded`)}),f(!0)}export{c as mount};