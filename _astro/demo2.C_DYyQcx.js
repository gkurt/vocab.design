import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`blue-300`,hex:`#8FA8F7`,ink:`#14171C`},{key:`blue-500`,hex:`#3557E8`,ink:`#FFFFFF`},{key:`white`,hex:`#FFFFFF`,ink:`#14171C`},{key:`slate-900`,hex:`#14171C`,ink:`#F1F3F8`}],n={light:{"color-action":`blue-500`,"color-surface":`white`},dark:{"color-action":`blue-300`,"color-surface":`slate-900`}},r=[{key:`button-bg`,role:`color-action`},{key:`card-bg`,role:`color-surface`}],i=[`color-action`,`color-surface`],a=`light`,o=e=>t.find(t=>t.key===e)??t[1],s=24,c=30,l=114,u=e=>e*c+s/2,d=[12,72],f=e=>(d[e]??0)+s/2,p=38,m=32,h=(e,t,n)=>`M 1 ${t} C ${e*.55} ${t}, ${e*.45} ${n}, ${e-9} ${n} M ${e-14} ${n-4.5} L ${e-9} ${n} L ${e-14} ${n+4.5}`,g=e=>i.map((r,i)=>{let a=n[e]?.[r]??`blue-500`;return`<path data-part="arrow-${r}" d="${h(p,u(t.findIndex(e=>e.key===a)),f(i))}" fill="none"
                  stroke="var(--sp-muted)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`}).join(``);function _(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Theme" data-value="${a}">
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" style="gap: 0; margin-top: 12px; align-items: flex-end">
          <span class="sp-label" style="width: 134px">Primitive</span>
          <span style="width: ${p}px"></span>
          <span class="sp-label" style="width: 100px">Semantic</span>
          <span style="width: ${m}px"></span>
          <span class="sp-label" style="width: 104px">Component</span>
        </div>

        <div class="sp-row" data-part="diagram" data-mode="${a}"
             style="gap: 0; margin-top: 6px; height: ${l}px; align-items: flex-start">
          <div style="position: relative; width: 134px; height: ${l}px">
            ${t.map((e,t)=>`
    <div class="sp-row" data-part="prim-${e.key}" ${e.key===`blue-500`?`data-subject`:``}
         style="position: absolute; top: ${t*c}px; left: 0; width: 134px; height: ${s}px; gap: 6px;
                padding: 0 7px; border-radius: 6px; border: 1px solid var(--sp-line); background: var(--sp-surface)">
      <span class="sp-swatch" style="flex: 0 0 12px; height: 12px; border-radius: 3px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${e.hex}"></span>
      <span class="sp-grow" style="font-size: 10.5px">${e.key}</span>
      <span class="sp-text" style="font-size: 9.5px; font-variant-numeric: tabular-nums">${e.hex}</span>
    </div>`).join(``)}
          </div>
          <svg data-part="arrows-primitive" width="${p}" height="${l}" viewBox="0 0 ${p} ${l}"
               aria-hidden="true" style="flex: 0 0 ${p}px; display: block">${g(a)}</svg>
          <div class="sp-context" style="position: relative; width: 100px; height: ${l}px">
            ${i.map((e,t)=>`
    <div class="sp-row" data-part="role-${e}"
         style="position: absolute; top: ${d[t]}px; left: 0; width: 100px; height: ${s}px; gap: 6px;
                padding: 0 7px; border-radius: 6px; border: 1px dashed var(--sp-line); background: var(--sp-surface)">
      <span class="sp-swatch" data-part="role-chip-${e}" style="flex: 0 0 12px; height: 12px; border-radius: 3px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)"></span>
      <span class="sp-grow" style="font-size: 10.5px">${e}</span>
    </div>`).join(``)}
          </div>
          <svg data-part="arrows-role" width="${m}" height="${l}" viewBox="0 0 ${m} ${l}"
               aria-hidden="true" style="flex: 0 0 ${m}px; display: block">
            ${i.map((e,t)=>`<path d="${h(m,f(t),f(t))}" fill="none" stroke="var(--sp-muted)"
                               stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`).join(``)}
          </svg>
          <div class="sp-context" style="position: relative; width: 104px; height: ${l}px">
            ${r.map((e,t)=>`
    <div data-part="comp-${e.key}"
         style="position: absolute; top: ${d[t]}px; left: 0; width: 104px; height: ${s}px; display: flex;
                align-items: center; padding: 0 9px; border-radius: 6px; font-size: 10.5px;
                box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4)">${e.key}</div>`).join(``)}
          </div>
        </div>

        <p class="sp-text sp-context" data-part="readout"
           style="margin: 10px 0 0; height: 30px; font-size: 10.5px; line-height: 1.4"></p>
      </div>
    </div>
  `;let _=e(u,`diagram`),v=e(u,`arrows-primitive`),y=e(u,`readout`),b=t=>{let a=n[t]??n.light;if(!a)return;_.dataset.mode=t,v.innerHTML=g(t);for(let t of i){let n=a[t]??`blue-500`;e(u,`role-chip-${t}`).style.setProperty(`--sp-swatch`,o(n).hex),e(u,`role-${t}`).dataset.points=n}for(let t of r){let n=a[t.role]??`blue-500`,r=o(n),i=e(u,`comp-${t.key}`);i.style.background=r.hex,i.style.color=r.ink,i.dataset.resolves=n}let s=r.map(e=>{let t=a[e.role]??`blue-500`;return`${e.key} = ${e.role} = ${t} ${o(t).hex}`});y.textContent=`${s.join(`. `)}.`};b(a),e(u,`segmented`).addEventListener(`change`,e=>b(e.detail))}export{_ as mount};