import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=426,n=168,r=36,i=14,a=380,o=132,s=146,c=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],l=a/c.length,u=30,d=[0,1/3,2/3,1],f=2,p=`transition: transform 0.45s var(--sp-ease)`,m={revenue:{label:`Revenue`,legend:`Revenue, thousands of pounds`,values:[42,55,48,61,72,84],max:90,target:70,tick:e=>String(e),format:e=>`£${e}k`},signups:{label:`Signups`,legend:`Signups, people`,values:[310,280,420,390,505,610],max:750,target:450,tick:e=>String(e),format:e=>String(e)}},h=`revenue`,g=(e,t)=>e/t*o,_=(e,t)=>s-g(e,t),v=e=>r+e*l+l/2;function y(a){let y=m[h],b=d.map(e=>{let t=(s-e*o).toFixed(1);return`<line x1="${r}" y1="${t}" x2="416" y2="${t}" stroke="var(--sp-line)" stroke-width="${f}" />`}).join(``),x=d.map((e,t)=>`<text data-part="tick-${t}" x="28" y="${(s-e*o+3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${y.tick(Math.round(e*y.max))}</text>`).join(``),S=c.map((e,t)=>{let n=y.values[t]??0,i=(r+t*l+(l-u)/2).toFixed(1);return`<rect
        data-part="bar-${e.toLowerCase()}"
        x="${i}" y="${_(n,y.max).toFixed(1)}" width="${u}" height="${g(n,y.max).toFixed(1)}"
        rx="3" fill="var(--sp-accent)"
        style="transition: y 0.45s var(--sp-ease), height 0.45s var(--sp-ease)"
      />`}).join(``),C=c.map((e,t)=>`<text x="${v(t).toFixed(1)}" y="161" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${e}</text>`).join(``),w=Math.max(...y.values),T=y.values.indexOf(w);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Half year, Harbour Supply</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Series" data-part="switcher" data-value="${h}">
            <button class="sp-segment" type="button" data-part="seg-revenue" value="revenue">Revenue</button>
            <button class="sp-segment" type="button" data-part="seg-signups" value="signups">Signups</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row" data-part="legend" style="gap: 16px; height: 17px">
              <span class="sp-row" style="gap: 6px">
                <span class="sp-swatch" style="width: 12px; height: 12px; border-radius: 3px; --sp-swatch: var(--sp-accent)"></span>
                <span data-part="legend-series" style="font-size: 11px">${y.legend}</span>
              </span>
              <span class="sp-row" style="gap: 6px">
                <span aria-hidden="true" style="width: 16px; height: ${f}px; background: repeating-linear-gradient(to right, var(--sp-muted) 0 5px, transparent 5px 9px)"></span>
                <span class="sp-label" data-part="legend-target" style="font-size: 11px">Target ${y.target}</span>
              </span>
            </div>
            <svg
              data-part="plot"
              data-subject
              data-series="${h}"
              data-peak="${w}"
              role="img"
              aria-label="Monthly revenue for the last six months, peaking in June"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block; margin-top: 8px"
            >
              ${b}
              ${x}
              <line x1="${r}" y1="${i}" x2="${r}" y2="${s}" stroke="var(--sp-muted)" stroke-width="${f}" />
              <line x1="${r}" y1="${s}" x2="416" y2="${s}" stroke="var(--sp-muted)" stroke-width="${f}" />
              ${S}
              ${C}
              <g data-part="target" style="transform-box: view-box; transform: translate(0, ${(_(y.target,y.max)-s).toFixed(1)}px); ${p}">
                <line x1="${r}" y1="${s}" x2="416" y2="${s}" stroke="var(--sp-muted)" stroke-width="${f}" stroke-dasharray="7 5" />
              </g>
              <g
                data-part="value-label"
                data-value="${w}"
                style="transform-box: view-box; transform: translate(0, ${(_(w,y.max)-s).toFixed(1)}px); ${p}"
              >
                <text
                  data-part="value-text"
                  x="${v(T).toFixed(1)}" y="139"
                  text-anchor="middle" fill="var(--sp-ink)" font-size="12" font-weight="600"
                >${y.format(w)}</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;let E=e(a,`plot`),D=e(a,`legend-series`),O=e(a,`legend-target`),k=e(a,`target`),A=e(a,`value-label`),j=e(a,`value-text`),M=t=>{let n=m[t];if(!n)return;let r=Math.max(...n.values);E.dataset.series=t,E.dataset.peak=String(r),E.setAttribute(`aria-label`,`Monthly ${n.label.toLowerCase()} for the last six months, peaking in June`);for(let[t,r]of d.entries())e(a,`tick-${t}`).textContent=n.tick(Math.round(r*n.max));for(let[t,r]of c.entries()){let i=e(a,`bar-${r.toLowerCase()}`),o=n.values[t]??0;i.setAttribute(`y`,_(o,n.max).toFixed(1)),i.setAttribute(`height`,g(o,n.max).toFixed(1))}k.style.transform=`translate(0, ${(_(n.target,n.max)-s).toFixed(1)}px)`,A.dataset.value=String(r),A.style.transform=`translate(0, ${(_(r,n.max)-s).toFixed(1)}px)`,j.textContent=n.format(r),D.textContent=n.legend,O.textContent=`Target ${n.target}`};e(a,`switcher`).addEventListener(`change`,e=>M(e.detail))}export{y as mount};