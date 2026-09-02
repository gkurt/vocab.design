import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`&`,n=78,r=7,i=[{key:`sunrise`,name:`--sunrise`,layers:[`#8a3413`,`#e2662b`,`#ffcb52`],read:`font-palette: --sunrise`},{key:`dusk`,name:`--dusk`,layers:[`#1d2a63`,`#4570db`,`#79dfe8`],read:`font-palette: --dusk`}],a=[`0`,`1`,`2`];function o(o){let s=(e,n)=>`<span data-part="layer-${e}" style="${n}">${t}</span>`,c=e=>`
    <span class="sp-row" style="gap: 4px; flex: 0 0 auto">
      <span class="sp-swatch" data-part="swatch-${e}"
            style="width: 22px; height: 12px; --sp-swatch: ${i[0]?.layers[e]}"></span>
      <span class="sp-label" style="white-space: nowrap">${e}</span>
    </span>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="font-palette" data-value="sunrise">
            ${i.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.name}</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="row" style="gap: 16px; align-items: flex-end; height: 108px; margin-top: 10px">
          <span class="sp-stack sp-context" style="gap: 4px; align-items: center; flex: 0 0 124px">
            <span data-part="flat" style="font-size: ${n}px; line-height: 1; font-weight: 700; color: var(--sp-ink)">${t}</span>
            <span class="sp-label" style="white-space: nowrap">Monochrome</span>
          </span>
          <span class="sp-stack" style="gap: 4px; align-items: center; flex: 0 0 124px">
            <span data-part="glyph" data-subject data-palette="sunrise"
                  style="position: relative; display: inline-block; line-height: 1; font-weight: 700;
                         font-size: ${n}px; padding: 0 ${r}px ${r}px 0">
              ${s(0,`position: absolute; left: ${r}px; top: ${r}px; color: ${i[0]?.layers[0]}`)}
              ${s(1,`position: relative; color: ${i[0]?.layers[1]}`)}
              ${s(2,`position: absolute; left: 0; top: 0; color: ${i[0]?.layers[2]}; clip-path: inset(0 0 54% 0)`)}
            </span>
            <span class="sp-label sp-context" data-part="glyph-label" style="white-space: nowrap">Layered</span>
          </span>
          <span class="sp-stack sp-context" style="gap: 4px; align-items: center; flex: 0 0 124px">
            <span data-part="emoji" style="font-size: 40px; line-height: 1">&#x1F3A8;</span>
            <span class="sp-label" style="white-space: nowrap">Emoji</span>
          </span>
        </div>
        <div class="sp-row sp-context" data-part="swatches" style="gap: 10px; height: 30px">
          <span class="sp-label" style="white-space: nowrap">layers</span>
          ${a.map((e,t)=>c(t)).join(``)}
          <span class="sp-chip" data-part="readout"
                style="cursor: default; margin-left: auto; white-space: nowrap; flex: 0 0 auto">${i[0]?.read??``}</span>
        </div>
      </div>
    </div>
  `;let l=e(o,`glyph`),u=[0,1,2].map(t=>e(o,`layer-${t}`)),d=[0,1,2].map(t=>e(o,`swatch-${t}`)),f=e(o,`readout`),p=e=>{let t=i.find(t=>t.key===e);t&&(l.dataset.palette=t.key,t.layers.forEach((e,t)=>{let n=u[t];n&&(n.style.color=e),d[t]?.style.setProperty(`--sp-swatch`,e)}),f.textContent=t.read)};e(o,`segmented`).addEventListener(`change`,e=>p(e.detail))}export{o as mount};