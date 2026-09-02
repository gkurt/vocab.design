import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=424,n=140,r=48,i=12,a=366,o=106,s=118,c=2,l=`transition: y 0.45s var(--sp-ease), height 0.45s var(--sp-ease)`,u=[{name:`core`,value:3},{name:`icons`,value:26},{name:`forms`,value:140},{name:`charts`,value:900},{name:`editor`,value:3200},{name:`bundle`,value:8600}],d=a/u.length,f=34,p=[0,.25,.5,.75,1],m={raw:{domain:`0 to 8,600`,step:`2,150`,tick:e=>Math.round(e*8600),height:e=>e/8600*o,note:`Ticks straight off the data: every label is an accident of the maximum.`},nice:{domain:`0 to 10,000`,step:`2,500`,tick:e=>Math.round(e*1e4),height:e=>e/1e4*o,note:`A rounded domain: round labels, bought with headroom above the tallest bar.`},log:{domain:`1 to 10,000`,step:`x10`,tick:e=>Math.round(10**(e*4)),height:e=>Math.log10(e)/4*o,note:`Each line ten times the last, which is what makes the small bars readable.`}},h=`raw`,g=e=>e.toLocaleString(`en-GB`),_=e=>r+e*d+d/2;function v(a){let v=m[h],y=p.map(e=>{let t=(s-e*o).toFixed(1);return`<line x1="${r}" y1="${t}" x2="414" y2="${t}" stroke="var(--sp-line)" stroke-width="${c}" />`}).join(``),b=p.map((e,t)=>{let n=s-e*o,i=v.tick(e);return`
      <line x1="43" y1="${n.toFixed(1)}" x2="${r}" y2="${n.toFixed(1)}" stroke="var(--sp-ink)" stroke-width="${c}" />
      <text
        data-part="tick-${t}"
        data-value="${i}"
        x="38" y="${(n+3.5).toFixed(1)}"
        text-anchor="end" fill="var(--sp-ink)" font-size="10"
        style="font-variant-numeric: tabular-nums"
      >${g(i)}</text>`}).join(``),x=u.map((e,t)=>{let n=Math.max(0,v.height(e.value)),i=(r+t*d+(d-f)/2).toFixed(1);return`<rect
        data-part="bar-${e.name}"
        x="${i}" y="${(s-n).toFixed(1)}" width="${f}" height="${n.toFixed(1)}"
        rx="3" fill="var(--sp-accent)" style="${l}"
      />`}).join(``),S=u.map((e,t)=>`<text x="${_(t).toFixed(1)}" y="132" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${e.name}</text>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Bundle audit</span>
          <span class="sp-label" style="font-size: 12px">Six packages</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 17px">
              <span class="sp-label">Package size, kB</span>
              <span class="sp-row" style="gap: 8px">
                <span class="sp-label">Domain</span>
                <span
                  data-part="domain"
                  data-scale="${h}"
                  style="width: 76px; text-align: right; font-size: 11px; font-weight: 500; font-variant-numeric: tabular-nums"
                >${v.domain}</span>
                <span class="sp-label">Step</span>
                <span
                  data-part="step"
                  style="width: 38px; text-align: right; font-size: 11px; font-weight: 500; font-variant-numeric: tabular-nums"
                >${v.step}</span>
              </span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Six package sizes in kilobytes, from three up to eight thousand six hundred"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block; margin-top: 6px"
            >
              ${y}
              <line x1="${r}" y1="${s}" x2="414" y2="${s}" stroke="var(--sp-muted)" stroke-width="${c}" />
              <g class="sp-context">${x}</g>
              ${S}
              <g data-part="axis" data-subject data-scale="${h}">
                <line x1="${r}" y1="${i}" x2="${r}" y2="${s}" stroke="var(--sp-ink)" stroke-width="${c}" />
                ${b}
              </g>
            </svg>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="${h}" data-axis="Scale">
          <button class="sp-segment" type="button" data-part="seg-raw" value="raw" style="padding: 4px 10px; font-size: 12px">Data extent</button>
          <button class="sp-segment" type="button" data-part="seg-nice" value="nice" style="padding: 4px 10px; font-size: 12px">Nice scale</button>
          <button class="sp-segment" type="button" data-part="seg-log" value="log" style="padding: 4px 10px; font-size: 12px">Log</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-scale="${h}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${v.note}</span>
      
    </div>
  `;let C=e(a,`axis`),w=e(a,`domain`),T=e(a,`step`),E=e(a,`note`),D=t=>{let n=m[t];if(n){C.dataset.scale=t,w.dataset.scale=t,w.textContent=n.domain,T.textContent=n.step;for(let[t,r]of p.entries()){let i=e(a,`tick-${t}`),o=n.tick(r);i.dataset.value=String(o),i.textContent=g(o)}for(let t of u){let r=e(a,`bar-${t.name}`),i=Math.max(0,n.height(t.value));r.setAttribute(`y`,(s-i).toFixed(1)),r.setAttribute(`height`,i.toFixed(1))}E.dataset.scale=t,E.textContent=n.note}};e(a,`picker`).addEventListener(`change`,e=>D(e.detail)),D(h)}export{v as mount};