import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`Handgloves`,r=100,i=[{wght:300,name:`Light`,read:`Light · wght 300`},{wght:400,name:`Regular`,read:`Regular · wght 400`},{wght:600,name:`Semibold`,read:`Semibold · wght 600`},{wght:900,name:`Black`,read:`Black · wght 900`}],a={wght:520,name:`520`,read:`wght 520 · no named instance`},o=[...i,a],s=e=>(e-r)/800*100,c=e=>`calc(7px + (100% - 14px) * ${(e-r)/800})`;function l(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="400" data-axis="Instance" data-term="400">
            ${o.map(({wght:e,name:t})=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${t}</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: 54px; margin-top: 8px">
          <span data-part="sample" data-subject data-wght="400" data-named data-pose="[data-named]"
                style="font-size: 36px; line-height: 1.2; white-space: nowrap;
                       font-variation-settings: 'wght' 400">${n}</span>
        </div>
        <div class="sp-stack sp-context" data-part="axis" style="gap: 6px">
          <div data-part="track" style="position: relative; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
            ${i.map(({wght:e})=>`<span data-part="tick-${e}" style="position: absolute; left: ${c(e)}; top: -3px; width: 2px; height: 14px;
           background: var(--sp-accent); translate: -1px 0"></span>`).join(``)}
            <span data-part="marker" style="position: absolute; top: 50%; left: ${c(400)}; width: 14px; height: 14px;
                  border-radius: 50%; background: var(--sp-accent); translate: -50% -50%;
                  transition: left 0.28s var(--sp-ease)"></span>
          </div>
          <div data-part="tick-labels" style="position: relative; height: 14px">
            ${i.map(({wght:e,name:t})=>`<span style="position: absolute; ${s(e)>=100?`right: 0`:`left: ${c(e)}; translate: -50% 0`}; top: 0; font-size: 10px;
            color: var(--sp-muted); white-space: nowrap">${t}</span>`).join(``)}
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">wght 100</span>
            <span class="sp-chip" data-part="readout" style="cursor: default">${i[1]?.read??``}</span>
            <span class="sp-label">wght 900</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          The ticks are the coordinates this family named. Everything between them is drawable type with
          nothing to call it, which is the freedom the format bought and the vocabulary it cost.
        </p>
      </div>
    </div>
  `;let l=e(r,`sample`),u=e(r,`marker`),d=e(r,`readout`),f=e=>{let n=o.find(t=>String(t.wght)===e);n&&(l.dataset.wght=e,l.style.fontVariationSettings=`'wght' ${n.wght}`,t(l,`data-named`,n!==a),u.style.left=c(n.wght),d.textContent=n.read)};e(r,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{l as mount};