import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n as r}from"./measure.DK7AY2_i.js";var i=444,a=184,o=[`Plan`,`Berth`,`Power`,`Night rate`],s=[[`Short stay`,`8 m`,`16 A`,`£22`],[`Weekly`,`10 m`,`16 A`,`£96`],[`Monthly`,`12 m`,`32 A`,`£310`],[`Season`,`14 m`,`32 A`,`£1,240`]],c={table:`Across row one, down, then back the other way: every second row is read right to left.`,cards:`Stacked into cards there are no rows to mow, and the four plans read as one serial run.`},l={table:()=>`
    <table class="sp-table" data-part="table" style="--sp-cell-pad: 8px 12px">
      <thead><tr>${o.map(e=>`<th>${e}</th>`).join(``)}</tr></thead>
      <tbody>
        ${s.map(e=>`<tr data-part="row">${e.map(e=>`<td>${e}</td>`).join(``)}</tr>`).join(``)}
      </tbody>
    </table>`,cards:()=>`
    <div class="sp-stack" style="gap: 7px; padding: 8px 12px 8px 24px">
      ${s.map(e=>`
        <div class="sp-surface" data-part="card" style="display: flex; align-items: center; gap: 10px; padding: 7px 10px">
          <span class="sp-heading" style="flex: 1 1 auto; font-size: 12px">${e[0]}</span>
          ${e.slice(1).map((e,t)=>`<span class="sp-label">${o[t+1]} <span style="color: var(--sp-ink)">${e}</span></span>`).join(``)}
        </div>`).join(``)}
    </div>`};function u(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Berth pricing</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-part="switcher" data-value="table">
            <button class="sp-segment" type="button" data-part="seg-table" value="table">table</button>
            <button class="sp-segment" type="button" data-part="seg-cards" value="cards">stacked</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${i}px; height: ${a}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" data-part="view"></div>
            <svg data-part="mow" data-subject aria-hidden="true" style="position: absolute; pointer-events: none; overflow: visible"></svg>
            <svg data-part="serial" hidden aria-hidden="true" style="position: absolute; pointer-events: none; overflow: visible"></svg>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 40px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let s=e(o,`page`),u=e(o,`view`),d=e(o,`mow`),f=e(o,`serial`),p=e(o,`readout`),m=(e,t,n)=>{let i=n?16:6,a=[];t.forEach((e,t)=>{let o=r(e,s),c=o.top+o.height/2,l=o.left+i,u=o.left+o.width-i;if(!n){a.push([l,c]);return}t%2==0?a.push([l,c],[u,c]):a.push([u,c],[l,c])});let o=a.map(([e])=>e),c=a.map(([,e])=>e),l=Math.min(...o)-12,u=Math.min(...c)-12,d=Math.max(...o)-l+12,f=Math.max(...c)-u+12;e.setAttribute(`viewBox`,`0 0 ${d} ${f}`),e.style.left=`${l}px`,e.style.top=`${u}px`,e.style.width=`${d}px`,e.style.height=`${f}px`;let p=a.map(([e,t])=>[e-l,t-u]),m=p.map(([e,t],n)=>`${n===0?`M`:`L`}${e} ${t}`).join(` `),h=n?p.filter((e,t)=>t%2==0):p;e.innerHTML=`
      <path d="${m}" fill="none" stroke="var(--sp-accent)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="0.32" />
      ${h.map(([e,t])=>`<circle cx="${e}" cy="${t}" r="9" fill="var(--sp-accent)" />`).join(``)}
      ${h.map(([e,t],n)=>`<text x="${e}" y="${t+4}" fill="var(--sp-accent-ink)" font-size="11" font-weight="600" text-anchor="middle" font-family="inherit">${n+1}</text>`).join(``)}`},h=e=>{u.innerHTML=l[e](),p.textContent=c[e],n(d,`hidden`,e!==`table`),n(f,`hidden`,e!==`cards`),e===`table`?m(d,t(u,`row`),!0):m(f,t(u,`card`),!1)};e(o,`switcher`).addEventListener(`change`,e=>h(e.detail)),h(`table`)}export{u as mount};