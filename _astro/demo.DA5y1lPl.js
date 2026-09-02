import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=340,n=118,r=30,i=304,a=92,o=100,s=2,c=80,l=[0,20,40,60,80],u=`transition: y 0.4s var(--sp-ease), height 0.4s var(--sp-ease)`,d=[`jul`,`aug`,`sep`,`oct`,`nov`],f=i/d.length,p=32,m=[{key:`retail`,name:`Retail`,colour:`oklch(0.58 0.16 262)`,values:[22,26,24,30,28]},{key:`trade`,name:`Trade`,colour:`oklch(0.62 0.15 330)`,values:[14,12,18,16,22]},{key:`online`,name:`Online`,colour:`oklch(0.62 0.11 172)`,values:[9,13,16,20,26]}],h={right:{slot:`slot-right`,direction:`column`,gap:`4px`},top:{slot:`slot-top`,direction:`row`,gap:`8px`},inline:{slot:`slot-inline`,direction:`row`,gap:`6px`}},g=`right`,_=`all`,v=e=>r+e*f+f/2,y=e=>`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style="display: block; flex: 0 0 auto">
     <rect width="12" height="12" rx="2" fill="url(#fill-${e})" />
   </svg>`;function b(i){let b=m.map(e=>{let t=e.key===`trade`?`<line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" stroke-width="2.6" stroke-opacity="0.8" />`:e.key===`online`?`<circle cx="4" cy="4" r="1.7" fill="#ffffff" fill-opacity="0.85" />`:``,n=e.key===`trade`?` patternTransform="rotate(45)"`:``;return`<pattern id="fill-${e.key}" width="8" height="8" patternUnits="userSpaceOnUse"${n}>
        <rect width="8" height="8" fill="${e.colour}" />
        ${t}
      </pattern>`}).join(``),x=l.map(e=>{let t=(o-e/c*a).toFixed(1);return`<line x1="${r}" y1="${t}" x2="334" y2="${t}" stroke="var(--sp-line)" stroke-width="${s}" />`}).join(``),S=l.map(e=>`<text x="24" y="${(o-e/c*a+3).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${e}</text>`).join(``),C=d.map((e,t)=>{let n=(r+t*f+(f-p)/2).toFixed(1),i=o;return[...m].reverse().map(r=>{let o=(r.values[t]??0)/c*a;return i-=o,`<rect
          data-part="band-${e}-${r.key}"
          x="${n}" y="${i.toFixed(1)}" width="${p}" height="${o.toFixed(1)}"
          fill="url(#fill-${r.key})" style="${u}"
        />`}).join(``)}).join(``),w=d.map((e,t)=>`<text x="${v(t).toFixed(1)}" y="113" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${e[0]?.toUpperCase()}${e.slice(1)}</text>`).join(``),T=m.map(e=>`
      <button
        class="sp-button sp-button--quiet"
        type="button"
        data-part="key-${e.key}"
        data-series="${e.key}"
        data-shown
        style="display: inline-flex; align-items: center; gap: 6px; padding: 2px 6px; font-size: 11px; line-height: 15px"
      >${y(e.key)}<span>${e.name}</span></button>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 233px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour Supply</span>
          <span
            class="sp-label"
            data-part="readout"
            role="status"
            style="width: 74px; text-align: right; font-size: 12px; font-variant-numeric: tabular-nums"
          >296k shown</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 448px; padding: 8px 10px">
            <div class="sp-row" style="gap: 8px; height: 20px">
              <span class="sp-label sp-context" style="flex: 0 0 auto">Revenue by channel, Q3</span>
              <span data-part="slot-inline" class="sp-row" style="flex: 1 1 auto; min-width: 0; min-height: 16px; gap: 6px"></span>
            </div>

            <div data-part="slot-top" class="sp-row" style="height: 22px; gap: 8px"></div>

            <div class="sp-row" style="gap: 8px; align-items: flex-start">
              <svg
                class="sp-context"
                data-part="plot"
                data-only="${_}"
                role="img"
                aria-label="Revenue by channel over five months, stacked, retail largest throughout"
                viewBox="0 0 ${t} ${n}"
                width="${t}"
                height="${n}"
                style="display: block; flex: 0 0 auto"
              >
                <defs>${b}</defs>
                ${x}
                ${S}
                <line x1="${r}" y1="${o}" x2="334" y2="${o}" stroke="var(--sp-muted)" stroke-width="${s}" />
                ${C}
                ${w}
              </svg>

              <div data-part="slot-right" style="flex: 0 0 78px; width: 78px; padding-top: 2px"></div>
            </div>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-axis="Placement" data-part="picker" data-value="${g}">
          <button class="sp-segment" type="button" data-part="seg-right" value="right" style="padding: 4px 10px; font-size: 12px">Beside</button>
          <button class="sp-segment" type="button" data-part="seg-top" value="top" style="padding: 4px 10px; font-size: 12px">Above</button>
          <button class="sp-segment" type="button" data-part="seg-inline" value="inline" style="padding: 4px 10px; font-size: 12px">Inline</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >Beside the plot, ordered like the stack, so the key reads as a map of the bar.</span>
      
    </div>
  `;let E=`
    <div
      data-part="legend"
      data-subject
      data-place="${g}"
      data-only="${_}"
      role="group"
      aria-label="Channels"
      style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start"
    >
      ${T}
      <button
        class="sp-button sp-button--quiet"
        type="button"
        data-part="key-all"
        data-series="${_}"
        style="padding: 2px 6px; font-size: 11px; line-height: 15px; color: var(--sp-muted)"
      >Show all</button>
    </div>`;e(i,h[g]?.slot??`slot-right`).insertAdjacentHTML(`afterbegin`,E);let D=e(i,`legend`),O=e(i,`plot`),k=e(i,`readout`),A=e(i,`note`),j=m.map(t=>e(i,`key-${t.key}`)),M={right:`Beside the plot, ordered like the stack, so the key reads as a map of the bar.`,top:`Above the plot: the key is on the reading path before the marks are looked at.`,inline:`Inline in the title line, which only holds while there are two or three series.`},N=t=>{for(let[n,r]of d.entries()){let s=o;for(let o of[...m].reverse()){let l=t===_||t===o.key?(o.values[n]??0)/c*a:0;s-=l;let u=e(i,`band-${r}-${o.key}`);u.setAttribute(`y`,s.toFixed(1)),u.setAttribute(`height`,l.toFixed(1))}}},P=e=>{D.dataset.only=e,O.dataset.only=e;let t=0;for(let[n,r]of m.entries()){let i=e===_||e===r.key,a=j[n];a&&(i?a.setAttribute(`data-shown`,``):a.removeAttribute(`data-shown`),a.style.opacity=i?`1`:`0.4`),i&&(t+=r.values.reduce((e,t)=>e+t,0))}k.textContent=`${t}k shown`,N(e)},F=t=>{let n=h[t];n&&(D.dataset.place=t,D.style.flexDirection=n.direction,D.style.gap=n.gap,D.style.alignItems=n.direction===`column`?`flex-start`:`center`,e(i,n.slot).appendChild(D),A.textContent=M[t]??``)};for(let[e,t]of m.entries())j[e]?.addEventListener(`click`,()=>P(t.key));e(i,`key-all`).addEventListener(`click`,()=>P(_)),e(i,`picker`).addEventListener(`change`,e=>F(e.detail)),F(g),P(_)}export{b as mount};