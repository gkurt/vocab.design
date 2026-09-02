import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=340,n=150,r=28,i=254,a=116,o=128,s=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],c=60,l=i/(s.length-1),u=2,d=[{key:`harbour`,name:`Harbour`,hue:`oklch(0.55 0.17 258)`,values:[22,28,33,38,44,51]},{key:`kestrel`,name:`Kestrel`,hue:`oklch(0.6 0.16 32)`,values:[40,38,35,31,27,24]},{key:`meridian`,name:`Meridian`,hue:`oklch(0.56 0.12 158)`,values:[12,16,19,24,26,33]}],f={direct:`Each line says its own name where it ends, so the reader never leaves the plot to find out which is which.`,legend:`The key sits off to the side, so every line has to be carried across to a swatch and back: three trips out of the data.`},p=`direct`,m=e=>r+e*l,h=e=>o-e/c*a;function g(i){let l=d.map(e=>{let t=e.values.map((e,t)=>`${m(t).toFixed(1)},${h(e).toFixed(1)}`).join(` `);return`<polyline
        data-part="line-${e.key}"
        points="${t}"
        fill="none" stroke="${e.hue}" stroke-width="${u}" stroke-linecap="round" stroke-linejoin="round"
      />`}).join(``),g=d.map(e=>{let t=e.values[e.values.length-1]??0;return`<circle cx="${m(s.length-1).toFixed(1)}" cy="${h(t).toFixed(1)}" r="3" fill="${e.hue}" />`}).join(``),_=d.map(e=>{let t=e.values[e.values.length-1]??0;return`<text
        data-part="label-${e.key}"
        x="${(m(s.length-1)+7).toFixed(1)}" y="${(h(t)+3.5).toFixed(1)}"
        fill="${e.hue}" font-size="11" font-weight="600"
      >${e.name}</text>`}).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 257px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Weekly orders</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Labelling" data-value="${p}">
            <button class="sp-segment" type="button" data-part="mode-legend" value="legend" style="padding: 5px 10px; font-size: 12px">Legend</button>
            <button class="sp-segment" type="button" data-part="mode-direct" value="direct" style="padding: 5px 10px; font-size: 12px">Direct labels</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-label sp-context" style="font-size: 11px">Three teams, six months</span>
              <span
                class="sp-label"
                data-part="readout"
                data-mode="${p}"
                style="width: 130px; text-align: right; font-size: 11px; color: var(--sp-ink)"
              >Updated 2 hours ago</span>
            </div>
            <div class="sp-row" style="gap: 10px; align-items: flex-start; margin-top: 8px">
              <svg
                data-part="plot"
                role="img"
                aria-label="Weekly orders for Harbour, Kestrel and Meridian over six months"
                viewBox="0 0 ${t} ${n}"
                width="${t}"
                height="${n}"
                style="display: block; flex: 0 0 auto"
              >
                <line x1="${r}" y1="${o}" x2="282" y2="${o}" stroke="var(--sp-line)" stroke-width="${u}" />
                ${[0,.5,1].map(e=>`<text x="20" y="${(o-e*a+3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${Math.round(e*c)}</text>`).join(``)}
                ${s.map((e,t)=>`<text x="${m(t).toFixed(1)}" y="143" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${e}</text>`).join(``)}
                ${l}
                ${g}
                <g data-part="labels" data-subject style="opacity: 1">${_}</g>
              </svg>
              <div
                class="sp-stack"
                data-part="key"
                style="width: 84px; gap: 8px; padding-top: 6px; opacity: 0; transition: opacity 0.22s"
              >${d.map(e=>`<span class="sp-row" style="gap: 6px">
        <span class="sp-swatch" style="width: 10px; height: 10px; border-radius: 2px; --sp-swatch: ${e.hue}"></span>
        <span style="font-size: 11px">${e.name}</span>
      </span>`).join(``)}</div>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${f[p]}</span>
    </div>
  `;let v=e(i,`labels`),y=e(i,`key`),b=e(i,`readout`),x=e(i,`note`),S=e=>{v.style.opacity=e===`direct`?`1`:`0`,y.style.opacity=e===`legend`?`1`:`0`,b.dataset.mode=e,x.textContent=f[e]};e(i,`mode`).addEventListener(`change`,e=>{S(e.detail===`legend`?`legend`:`direct`)})}export{g as mount};