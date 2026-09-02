import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`l5`,label:`Level 5`,dp:12,pct:14,shadow:`0 8px 16px rgb(0 0 0 / 0.34)`},{key:`l3`,label:`Level 3`,dp:6,pct:11,shadow:`0 4px 9px rgb(0 0 0 / 0.3)`},{key:`l1`,label:`Level 1`,dp:1,pct:5,shadow:`0 1px 3px rgb(0 0 0 / 0.26)`},{key:`l0`,label:`Level 0`,dp:0,pct:0,shadow:`none`}],n=[{key:`light`,name:`Light scheme`,surface:`#FEF7FF`,tint:`#6750A4`,ink:`#1D1B20`,edge:`rgb(16 24 40 / 0.16)`},{key:`dark`,name:`Dark scheme`,surface:`#141218`,tint:`#D0BCFF`,ink:`#E6E0E9`,edge:`rgb(255 255 255 / 0.14)`}],r=[{key:`tonal`,name:`Tonal`,tinted:!0,shadowed:!1},{key:`shadow`,name:`Shadow`,tinted:!1,shadowed:!0},{key:`both`,name:`Both`,tinted:!0,shadowed:!0}],i=`tonal`,a=e=>r.find(t=>t.key===e)??r[0],o=(e,t)=>Number.parseInt(e.slice(1+t*2,3+t*2),16);function s(e,t,n){let r=n/100;return`#${[0,1,2].map(n=>Math.round(o(e,n)*(1-r)+o(t,n)*r)).map(e=>e.toString(16).padStart(2,`0`)).join(``).toUpperCase()}`}function c(o){let c=(e,t)=>{let n=e.key===`dark`&&t.key===`l5`?`data-subject data-pose="[data-tinted]"`:``;return`
      <div class="sp-row sp-row--between" data-part="card-${e.key}-${t.key}" ${n}
           data-mode="${i}" data-tint="${t.pct}"
           style="height: 32px; padding: 0 9px; border-radius: 5px; color: ${e.ink};
                  box-shadow: inset 0 0 0 1px ${e.edge}">
        <span style="font-size: 9.5px; font-weight: 600">${t.label} · ${t.dp}dp</span>
        <span data-part="value-${e.key}-${t.key}"
              style="font-size: 8.5px; font-variant-numeric: tabular-nums; opacity: 0.85"></span>
      </div>`};o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Height cue" data-term="tonal" data-value="${i}">
            ${r.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.name}</button>`).join(``)}
          </sp-segmented>

        <div class="sp-row" style="gap: 12px; margin-top: 10px; align-items: flex-start">
          ${n.map(e=>`
    <div class="sp-stack${e.key===`light`?` sp-context`:``}" style="flex: 1 1 0; min-width: 0; gap: 4px">
      <div class="sp-row sp-row--between sp-context" style="height: 16px">
        <span class="sp-label">${e.name}</span>
        <span class="sp-text" style="font-size: 9px; font-variant-numeric: tabular-nums">tint ${e.tint}</span>
      </div>
      <div class="sp-stack" data-part="plate-${e.key}"
           style="gap: 6px; padding: 10px; border-radius: 6px; background: ${e.surface};
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.28)">
        ${t.map(t=>c(e,t)).join(``)}
      </div>
    </div>`).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;let l=r=>{let i=a(r);if(!i)return;for(let r of n)for(let n of t){let t=i.tinted?n.pct:0,a=s(r.surface,r.tint,t),c=e(o,`card-${r.key}-${n.key}`);c.dataset.mode=i.key,c.dataset.tint=String(t),i.tinted&&n.pct>0?c.setAttribute(`data-tinted`,``):c.removeAttribute(`data-tinted`),c.style.background=a,c.style.boxShadow=`inset 0 0 0 1px ${r.edge}${i.shadowed&&n.shadow!==`none`?`, ${n.shadow}`:``}`,e(o,`value-${r.key}-${n.key}`).textContent=`+${t}% · ${a}`}let c={tonal:`Height is colour: each level takes more of the primary, and no shadow is drawn anywhere.`,shadow:`The same four levels lifted by shadow alone. On the dark scheme they are one colour with four invisible shadows.`,both:`What Material 3 actually ships: the tint carries the height and the shadow adds an edge on the pale scheme.`};e(o,`caption`).textContent=c[i.key]??``};l(i),e(o,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{c as mount};