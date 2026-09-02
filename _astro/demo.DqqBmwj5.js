import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=422,n=140,r=72,i=14,a=340,o=106,s=120,c=2,l=300,u=[0,100,200,300],d=[168,152,181,205,174,143,158,232,268,241,196,163,149,137],f=a/(d.length-1),p=220,m=Math.round(d.reduce((e,t)=>e+t,0)/d.length),h=150,g=250,_=e=>r+e*f,v=e=>s-e/l*o,y={target:{breaches:e=>e>p,tally:e=>`${e} of ${d.length} days over target`,note:`A target is a constant somebody committed to, so every mark reads as met or missed.`},average:{breaches:e=>e>m,tally:e=>`${e} of ${d.length} days above the mean`,note:`A mean is derived from the series, so it moves when the data does. Still a reference.`},band:{breaches:e=>e<h||e>g,tally:e=>`${e} of ${d.length} days outside budget`,note:`A band is a reference with a tolerance, for a standard that is honestly a range.`}},b=[`target`,`average`,`band`],x=`target`,S=(e,t)=>`
  <rect
    x="2" y="${(v(e)-9).toFixed(1)}" width="66" height="18" rx="9"
    fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${c}"
  />
  <text
    x="35" y="${(v(e)+3.5).toFixed(1)}"
    text-anchor="middle" fill="var(--sp-ink)" font-size="10" font-weight="600"
  >${t}</text>`,C=e=>`
  <line
    x1="${r}" y1="${v(e).toFixed(1)}" x2="412" y2="${v(e).toFixed(1)}"
    stroke="var(--sp-accent)" stroke-width="${c}" stroke-dasharray="7 5"
  />`;function w(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Page latency</span>
          <span
            class="sp-label"
            data-part="tally"
            data-kind="${x}"
            data-out="0"
            role="status"
            style="width: 172px; text-align: right; font-size: 12px; white-space: nowrap"
          ></span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="height: 17px">
              <span class="sp-label">p95 response, ms</span>
              <span class="sp-label" style="font-size: 11px">Fourteen days, to yesterday</span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Daily p95 latency over fourteen days, mostly between 140 and 270 milliseconds"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block; margin-top: 6px"
            >
              <g class="sp-context">
                ${u.map(e=>{let t=v(e).toFixed(1);return`<line x1="${r}" y1="${t}" x2="412" y2="${t}" stroke="var(--sp-line)" stroke-width="${c}" />`}).join(``)}
                ${[0,l].map(e=>`<text x="66" y="${(v(e)+3).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${e}</text>`).join(``)}
                <line x1="${r}" y1="${i}" x2="${r}" y2="${s}" stroke="var(--sp-muted)" stroke-width="${c}" />
                <polyline
                  points="${d.map((e,t)=>`${_(t).toFixed(1)},${v(e).toFixed(1)}`).join(` `)}"
                  fill="none" stroke="var(--sp-accent)" stroke-width="${c}"
                  stroke-linejoin="round" stroke-linecap="round"
                />
                ${d.map((e,t)=>`
      <circle
        data-mark="${t}" data-value="${e}"
        cx="${_(t).toFixed(1)}" cy="${v(e).toFixed(1)}" r="3.4"
        fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${c}"
      />`).join(``)}
                ${[0,4,9,13].map(e=>`<text x="${_(e).toFixed(1)}" y="134" text-anchor="middle" fill="var(--sp-muted)" font-size="9">${e+1}</text>`).join(``)}
              </g>

              <g data-part="reference" data-subject data-kind="${x}">
                <g data-part="ref-target">
                  ${C(p)}
                  ${S(p,`Target ${p}`)}
                </g>

                <g data-part="ref-average" hidden>
                  ${C(m)}
                  ${S(m,`Mean ${m}`)}
                </g>

                <g data-part="ref-band" hidden>
                  <rect
                    x="${r}" y="${v(g).toFixed(1)}"
                    width="${a}" height="${(v(h)-v(g)).toFixed(1)}"
                    fill="var(--sp-accent)" fill-opacity="0.12"
                  />
                  ${C(g)}
                  ${C(h)}
                  ${S(g,`Max ${g}`)}
                  ${S(h,`Min ${h}`)}
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Kind" data-value="${x}">
          <button class="sp-segment" type="button" data-part="seg-target" value="target" style="padding: 4px 10px; font-size: 12px">Target</button>
          <button class="sp-segment" type="button" data-part="seg-average" value="average" style="padding: 4px 10px; font-size: 12px">Mean</button>
          <button class="sp-segment" type="button" data-part="seg-band" value="band" style="padding: 4px 10px; font-size: 12px">Band</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-kind="${x}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        ></span>
      
    </div>
  `;let f=e(o,`reference`),w=e(o,`tally`),T=e(o,`note`),E=b.map(t=>e(o,`ref-${t}`)),D=[...o.querySelectorAll(`[data-mark]`)],O=e=>{let t=y[e];if(!t)return;f.dataset.kind=e;for(let[t,n]of E.entries())b[t]===e?n.removeAttribute(`hidden`):n.setAttribute(`hidden`,``);let n=0;for(let e of D){let r=t.breaches(Number(e.dataset.value));r&&(n+=1),e.setAttribute(`fill`,r?`var(--sp-accent)`:`var(--sp-surface)`),e.setAttribute(`r`,r?`4.2`:`3.4`)}w.dataset.kind=e,w.dataset.out=String(n),w.textContent=t.tally(n),T.dataset.kind=e,T.textContent=t.note};e(o,`picker`).addEventListener(`change`,e=>O(e.detail)),O(x)}export{w as mount};