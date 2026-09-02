import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Fira Code', ui-monospace, monospace`,n=40,r=[{text:`-&gt;`,part:`arrow`,label:`arrow`},{text:`!=`,part:`noteq`,label:`not equal`},{text:`n-1`,part:`plain`,label:`hyphen`}],i={on:`calt 1`,off:`calt 0`},a={on:`Each pair is drawn as one glyph. The hyphen between two digits is left as typed.`,off:`Every character is drawn as typed, including the two the face has a rule for.`},o=e=>e in i;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-variant-ligatures</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="font-variant-ligatures" data-term="on" data-part="segmented" data-value="on">
            <button class="sp-segment" data-part="seg-off" value="off">no-contextual</button>
            <button class="sp-segment" data-part="seg-on" value="on">contextual</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="samples" style="justify-content: center; gap: 12px; height: 84px; margin-top: 14px">
          ${r.map(({text:e,part:r,label:i})=>`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 130px">
      <span data-part="run-${r}"${r===`arrow`?` data-subject data-pose="[data-calt=on]"`:``} data-calt="on"
            style="display: inline-block; font-family: ${t}; font-size: ${n}px; line-height: 1.15">${e}</span>
      <span class="sp-label" style="text-align: center; line-height: 1.3">${i}</span>
    </div>`).join(``)}
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${i.on}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">${a.on}</p>
      </div>
    </div>
  `;let c=e(s,`readout`),l=e(s,`caption`),u=t=>{if(o(t)){for(let{part:n}of r){let r=e(s,`run-${n}`);r.dataset.calt=t,r.style.fontVariantLigatures=t===`on`?`contextual`:`no-contextual`,r.style.fontFeatureSettings=t===`on`?`'calt' 1`:`'calt' 0`}c.textContent=i[t],l.textContent=a[t]}};u(`on`),e(s,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{s as mount};