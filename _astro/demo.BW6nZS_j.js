import{n as e,r as t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[{key:`pass`,name:`api`,word:`Passing`,glyph:`check`,color:`#2f7d5b`},{key:`fail`,name:`web`,word:`Failing`,glyph:`alert`,color:`#d2453b`},{key:`idle`,name:`docs`,word:`Queued`,glyph:`minus`,color:`#8b8f98`}],i=Array.from({length:12},(e,t)=>`oklch(0.7 0.16 ${t*30})`),a=`0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0`,o={hue:`Hue carries the status alone. The left panel reads fine, and its deuteranopia simulation loses the pass/fail pair.`,redundant:`The same statuses said twice, with a shape and a word. Both panels answer, so the hues stop being load-bearing.`};function s(s){let c=e=>`
    <div class="sp-row" data-part="ramp-${e}" style="gap: 2px; height: 14px">
      ${i.map(e=>`<span class="sp-swatch" style="flex: 1 1 0; height: 14px; border-radius: 2px; --sp-swatch: ${e}"></span>`).join(``)}
    </div>`,l=e=>`
    <div class="sp-stack" style="gap: 4px; margin-top: 8px">
      ${r.map(t=>`
        <div class="sp-row" style="gap: 6px; height: 18px">
          <span class="sp-swatch" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 50%; --sp-swatch: ${t.color}"></span>
          <span data-part="${e}-icon-${t.key}" style="flex: 0 0 14px; color: ${t.color}; visibility: hidden">
            ${n(t.glyph,``)}
          </span>
          <span class="sp-text sp-text--ink" style="flex: 1 1 auto; font-size: 11px">${t.name}</span>
          <span data-part="${e}-word-${t.key}" class="sp-text" style="flex: 0 0 auto; font-size: 11px; visibility: hidden">${t.word}</span>
        </div>`).join(``)}
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <svg width="0" height="0" aria-hidden="true" style="position: absolute">
        <filter id="sp-cvd-deutan" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="${a}"></feColorMatrix>
        </filter>
      </svg>

      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Status coding" data-part="segmented" data-value="hue">
            <button class="sp-segment" data-part="seg-hue" value="hue" style="font-size: 12px">Hue only</button>
            <button class="sp-segment" data-part="seg-redundant" value="redundant" style="font-size: 12px">Hue, shape, word</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 10px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="panel-normal" style="flex: 1 1 0; min-width: 0; padding: 8px 10px 10px">
            <span class="sp-label" style="display: block; font-size: 10px">As drawn</span>
            <div style="margin-top: 6px">${c(`normal`)}</div>
            ${l(`normal`)}
          </div>

          <div class="sp-surface" data-part="panel-sim" data-subject data-coding="hue"
               style="flex: 1 1 0; min-width: 0; padding: 8px 10px 10px; filter: url(#sp-cvd-deutan)">
            <span class="sp-label" style="display: block; font-size: 10px">Deuteranopia, simulated</span>
            <div style="margin-top: 6px">${c(`sim`)}</div>
            ${l(`sim`)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-coding="hue"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${o.hue}</p>
      </div>
    </div>
  `;let u=e(s,`panel-sim`),d=e(s,`caption`),f=r.flatMap(e=>[...t(s,`normal-icon-${e.key}`),...t(s,`sim-icon-${e.key}`),...t(s,`normal-word-${e.key}`),...t(s,`sim-word-${e.key}`)]),p=e=>{for(let t of f)t.style.visibility=e===`redundant`?`visible`:`hidden`;u.dataset.coding=e,d.dataset.coding=e,d.textContent=o[e]};p(`hue`),e(s,`segmented`).addEventListener(`change`,e=>{p(e.detail===`redundant`?`redundant`:`hue`)})}export{s as mount};