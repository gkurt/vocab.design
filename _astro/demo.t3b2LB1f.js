import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`amber-100`,rung:`100`,hex:`#FEF3D6`,ink:`#241C08`},{key:`amber-200`,rung:`200`,hex:`#FCE3A4`,ink:`#241C08`},{key:`amber-300`,rung:`300`,hex:`#F7C948`,ink:`#241C08`},{key:`amber-400`,rung:`400`,hex:`#DE9B12`,ink:`#241C08`},{key:`amber-500`,rung:`500`,hex:`#B45309`,ink:`#FFFFFF`},{key:`amber-600`,rung:`600`,hex:`#7C3A06`,ink:`#FFFFFF`}],n=e=>t.find(t=>t.key===e)??t[4],r=[{key:`warning`,name:`color-warning`,component:`banner-warning-bg`},{key:`pending`,name:`color-pending`,component:`chip-pending-bg`}],i={light:{warning:`amber-500`,pending:`amber-200`},dark:{warning:`amber-300`,pending:`amber-600`}},a=`light`,o=102;function s(s){let c=e=>`<div class="sp-row" style="flex: 1 1 auto; gap: 3px; min-width: 0">${t.map(e).join(``)}</div>`,l=e=>c(t=>`<span data-part="mark-${e}-${t.key}"
                    style="flex: 1 1 0; min-width: 0; height: 5px; border-radius: 3px;
                           background: rgb(127 137 156 / 0.22)"></span>`);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Theme" data-part="segmented" data-value="${a}">
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
          </sp-segmented>
        </div>

        <div class="sp-context" data-part="scale" style="margin-top: 10px">
          <div class="sp-row" style="gap: 0; height: 14px">
            <span class="sp-label" style="flex: 0 0 ${o}px">Primitive scale</span>
            <span class="sp-text" style="font-size: 9.5px">amber</span>
          </div>
          <div class="sp-row" style="gap: 0; margin-top: 4px">
            <span style="flex: 0 0 ${o}px"></span>
            ${c(e=>`<span class="sp-swatch" data-part="rung-${e.key}"
                            style="flex: 1 1 0; min-width: 0; height: 34px; --sp-swatch: ${e.hex};
                                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></span>`)}
          </div>
          <div class="sp-row" style="gap: 0">
            <span style="flex: 0 0 ${o}px"></span>
            ${c(e=>`<span style="flex: 1 1 0; min-width: 0; height: 11px; text-align: center; font-size: 9.5px;
                                   font-variant-numeric: tabular-nums">${e.rung}</span>`)}
          </div>
          <div class="sp-row" style="gap: 0">
            <span style="flex: 0 0 ${o}px"></span>
            ${c(e=>`<span class="sp-text" style="flex: 1 1 0; min-width: 0; height: 11px; text-align: center;
                                   font-size: 8.5px; font-variant-numeric: tabular-nums">${e.hex}</span>`)}
          </div>
        </div>

        <div data-part="alias-layer" data-subject style="margin-top: 10px">
          ${r.map(e=>`
    <div class="sp-row" data-part="alias-${e.key}" data-points="${i[a]?.[e.key]}"
         style="gap: 0; height: 28px">
      <span style="flex: 0 0 ${o}px; line-height: 1.25">
        <span style="display: block; font-size: 10.5px">${e.name}</span>
        <span class="sp-text" data-part="points-${e.key}"
              style="display: block; font-size: 9px; font-variant-numeric: tabular-nums"></span>
      </span>
      ${l(e.key)}
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-context" style="gap: 14px; margin-top: 8px; height: 32px">
          ${r.map(e=>`
    <div class="sp-row" style="flex: 1 1 0; min-width: 0; gap: 7px">
      <span class="sp-swatch" data-part="comp-${e.component}" data-resolves="${i[a]?.[e.key]}"
            style="flex: 0 0 44px; height: 24px; display: flex; align-items: center; justify-content: center;
                   font-size: 9px; font-weight: 600; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">Aa</span>
      <span style="font-size: 10px">${e.component}</span>
    </div>`).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 6px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;let u=a=>{let o=i[a]??i.light;if(!o)return;for(let i of r){let r=o[i.key]??`amber-500`,a=n(r);e(s,`alias-${i.key}`).dataset.points=r,e(s,`points-${i.key}`).textContent=`= ${r} ${a.hex}`;for(let n of t){let t=e(s,`mark-${i.key}-${n.key}`),o=n.key===r;t.style.height=o?`14px`:`5px`,t.style.background=o?a.hex:`rgb(127 137 156 / 0.22)`,t.style.boxShadow=o?`inset 0 0 0 1px rgb(127 137 156 / 0.4)`:`none`}let c=e(s,`comp-${i.component}`);c.dataset.resolves=r,c.style.setProperty(`--sp-swatch`,a.hex),c.style.color=a.ink}let c=r.map(e=>`${e.component} = ${e.name} = ${o[e.key]}`);e(s,`caption`).textContent=`${c.join(`. `)}. Only the middle line changed.`};u(a),e(s,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{s as mount};