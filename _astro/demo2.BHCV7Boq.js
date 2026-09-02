import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`rest`,step:0,name:`Rest`,dp:0,shadow:`none`,night:`#1B1E24`},{key:`raised`,step:1,name:`Raised`,dp:1,shadow:`0 1px 2px rgb(16 24 40 / 0.18)`,night:`#22262E`},{key:`float`,step:2,name:`Floating`,dp:6,shadow:`0 4px 10px rgb(16 24 40 / 0.2)`,night:`#2A2F38`},{key:`overlay`,step:3,name:`Overlay`,dp:12,shadow:`0 10px 22px rgb(16 24 40 / 0.26)`,night:`#333944`}],n={paper:{name:`Paper`,page:`#EEF0F4`,surface:`#FFFFFF`,ink:`#23262B`,rung:`#6B7280`,edge:`rgb(16 24 40 / 0.1)`,shadowed:!0,lifted:!1},night:{name:`Night`,page:`#0E1015`,surface:`#1B1E24`,ink:`#E8EAEF`,rung:`#8D93A0`,edge:`rgb(255 255 255 / 0.08)`,shadowed:!0,lifted:!1},lifted:{name:`Night, lifted`,page:`#0E1015`,surface:`#1B1E24`,ink:`#E8EAEF`,rung:`#8D93A0`,edge:`rgb(255 255 255 / 0.08)`,shadowed:!1,lifted:!0}},r={paper:`Four named steps, drawn as shadow. Offset and blur both grow with the step, so height is readable at a glance.`,night:`The same four steps, same shadows. A dark smudge on a dark page has nothing left to darken, and the ladder collapses.`,lifted:`The scale kept, the signal changed: each step raises the surface lightness instead, which is what a dark theme ships.`},i=`paper`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px 15px">
        <div class="sp-row sp-row--between sp-context" style="height: 30px">
          <span class="sp-label">Elevation scale</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="ground" data-axis="Ground" data-value="${i}">
            ${Object.entries(n).map(([e,t])=>`<button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="white-space: nowrap">${t.name}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-stack" data-part="plate"
             style="gap: 8px; margin-top: 9px; padding: 14px 14px 16px; border-radius: 7px;
                    box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.26)">
          ${t.map(e=>{let t=e.key===`overlay`?` data-subject`:``;return`
      <div class="sp-row" style="gap: 10px">
        <span class="sp-context" data-part="rung-${e.key}"
              style="flex: 0 0 auto; width: 16px; text-align: right; font-size: 10px;
                     font-variant-numeric: tabular-nums; color: var(--sp-muted)">${e.step}</span>
        <div class="sp-row sp-row--between" data-part="card-${e.key}"${t}
             data-ground="${i}" data-step="${e.step}"
             style="flex: 1 1 auto; min-width: 0; height: 34px; padding: 0 11px; border-radius: 6px;
                    white-space: nowrap">
          <span style="font-size: 11px; font-weight: 600">${e.name}</span>
          <span data-part="value-${e.key}"
                style="font-size: 9.5px; font-variant-numeric: tabular-nums; opacity: 0.72">${e.dp}dp</span>
        </div>
      </div>`}).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 9px 0 0; height: 30px; font-size: 10px; line-height: 1.45"></p>
      </div>
    </div>
  `;let o=i=>{let o=n[i];if(o){e(a,`plate`).style.background=o.page;for(let n of t){let t=e(a,`card-${n.key}`);t.dataset.ground=i,t.style.color=o.ink,t.style.background=o.lifted?n.night:o.surface;let r=o.shadowed&&n.shadow!==`none`?`, ${n.shadow}`:``;t.style.boxShadow=`inset 0 0 0 1px ${o.edge}${r}`}for(let n of t)e(a,`rung-${n.key}`).style.color=o.rung;e(a,`caption`).textContent=r[i]}};o(i),e(a,`ground`).addEventListener(`change`,e=>o(e.detail))}export{a as mount};