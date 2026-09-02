import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[14,20],n={w:196,h:98},r=[{name:`padding`,em:.75},{name:`icon`,em:1.25},{name:`radius`,em:.5}],i=(e,t)=>`${(e*t).toFixed(e*t===Math.round(e*t)?0:1)}px`;function a(a){let o=e=>{let t=e===`em`?{pad:`0.75em`,gap:`0.5em`,radius:`0.5em`,icon:`1.25em`,note:`0.8em`}:{pad:`10.5px`,gap:`7px`,radius:`7px`,icon:`17.5px`,note:`11px`};return`
      <div data-part="card-${e}" ${e===`em`?`data-subject data-size="14"`:``}
           class="sp-surface" style="width: 100%; padding: ${t.pad}; border-radius: ${t.radius};
                  font-size: 14px; display: flex; flex-direction: column; gap: ${t.gap}">
        <div style="display: flex; align-items: center; gap: ${t.gap}">
          <span style="flex: 0 0 auto; width: ${t.icon}; height: ${t.icon}; border-radius: 50%;
                       background: var(--sp-accent)"></span>
          <span style="font-weight: 600">Storage</span>
        </div>
        <span style="font-size: ${t.note}; color: var(--sp-muted); line-height: 1.4">42 GB of 80 GB used</span>
      </div>`},s=(e,t)=>`
    <div class="sp-stack${t===`px`?` sp-context`:``}" style="gap: 6px; width: ${n.w}px">
      <span class="sp-label${t===`px`?``:` sp-context`}">${e}</span>
      <div style="width: 100%; height: ${n.h}px">${o(t)}</div>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Font size" data-value="14">
            ${t.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}px</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 10px; align-items: flex-start">
          ${s(`em`,`em`)}
          ${s(`px`,`px`)}
        </div>
        <div class="sp-row sp-context" data-part="trace" style="gap: 16px; height: 18px;
             font-variant-numeric: tabular-nums"></div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          Only the font size changed. Padding, icon and radius are fractions of it and moved with it;
          the pixel twin keeps the shape it was given.
        </p>
      </div>
    </div>
  `;let c=e(a,`card-em`),l=e(a,`trace`),u=e=>{let n=t.find(t=>String(t)===e);n&&(c.dataset.size=String(n),c.style.fontSize=`${n}px`,l.innerHTML=r.map(e=>`<span class="sp-label">${e.name}: ${e.em}em = ${i(n,e.em)}</span>`).join(``))};u(`14`),e(a,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{a as mount};