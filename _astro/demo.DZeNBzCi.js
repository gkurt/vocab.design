import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=424,n=140,r=34,i=14,a=380,o=106,s=120,c=2,l=600,u=[0,200,400,600],d=[180,210,195,240,260,250,430,470,455,500,520,540],f=a/(d.length-1),p=6,m=400,h=2,g=5,_=e=>r+e*f,v=e=>s-e/l*o,y={callout:`A callout pins a finding to one mark, so the spike arrives already explained.`,span:`A span is the only form that can say something about a stretch of the domain.`,reference:`A rule across the plot answers the question a bare line cannot: compared to what.`},b=[`callout`,`span`,`reference`],x=`callout`;function S(a){let l=u.map(e=>{let t=v(e).toFixed(1);return`<line x1="${r}" y1="${t}" x2="414" y2="${t}" stroke="var(--sp-line)" stroke-width="${c}" />`}).join(``),f=u.map(e=>`<text x="28" y="${(v(e)+3).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${e}</text>`).join(``),S=d.map((e,t)=>`${_(t).toFixed(1)},${v(e).toFixed(1)}`).join(` `),C=[0,3,6,9].map(e=>`<text x="${_(e).toFixed(1)}" y="134" text-anchor="middle" fill="var(--sp-muted)" font-size="9">Wk ${e+1}</text>`).join(``),w=_(p),T=v(d[p]??0),E=_(h),D=_(g)-E,O=v(m);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders, twelve weeks</span>
          <span class="sp-label" style="font-size: 12px">Harbour Supply</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="height: 17px">
              <span class="sp-label">Orders per week</span>
              <span class="sp-label" style="font-size: 11px">Weekly, to last Sunday</span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Weekly orders over twelve weeks, stepping up sharply in week seven"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block; margin-top: 6px"
            >
              <g class="sp-context">
                ${l}
                ${f}
                <line x1="${r}" y1="${s}" x2="414" y2="${s}" stroke="var(--sp-muted)" stroke-width="${c}" />
                <polyline
                  points="${S}"
                  fill="none" stroke="var(--sp-accent)" stroke-width="${c}"
                  stroke-linejoin="round" stroke-linecap="round"
                />
                ${C}
              </g>

              <g data-part="annotation" data-subject data-kind="${x}">
                <g data-part="note-callout">
                  <rect
                    x="44" y="18" width="112" height="34" rx="5"
                    fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${c}"
                  />
                  <text x="52" y="32" fill="var(--sp-ink)" font-size="11" font-weight="600">Launch week</text>
                  <text x="52" y="45" fill="var(--sp-muted)" font-size="9">Orders up 72 per cent</text>
                  <path
                    d="M156 36 L${(w-6).toFixed(1)} ${(T-2).toFixed(1)}"
                    fill="none" stroke="var(--sp-accent)" stroke-width="${c}"
                  />
                  <circle cx="${w.toFixed(1)}" cy="${T.toFixed(1)}" r="4" fill="var(--sp-accent)" />
                </g>

                <g data-part="note-span" hidden>
                  <rect
                    x="${E.toFixed(1)}" y="${i}" width="${D.toFixed(1)}" height="${o}"
                    fill="var(--sp-accent)" fill-opacity="0.12"
                  />
                  <line
                    x1="${E.toFixed(1)}" y1="${i}" x2="${E.toFixed(1)}" y2="${s}"
                    stroke="var(--sp-accent)" stroke-width="${c}"
                  />
                  <line
                    x1="${(E+D).toFixed(1)}" y1="${i}" x2="${(E+D).toFixed(1)}" y2="${s}"
                    stroke="var(--sp-accent)" stroke-width="${c}"
                  />
                  <text
                    x="${(E+D/2).toFixed(1)}" y="26"
                    text-anchor="middle" fill="var(--sp-ink)" font-size="10" font-weight="600"
                  >Supply outage</text>
                </g>

                <g data-part="note-reference" hidden>
                  <line
                    x1="${r}" y1="${O.toFixed(1)}" x2="414" y2="${O.toFixed(1)}"
                    stroke="var(--sp-accent)" stroke-width="${c}" stroke-dasharray="7 5"
                  />
                  <rect
                    x="${346 .toFixed(1)}" y="${(O-9).toFixed(1)}" width="68" height="18" rx="9"
                    fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${c}"
                  />
                  <text
                    x="${380 .toFixed(1)}" y="${(O+4).toFixed(1)}"
                    text-anchor="middle" fill="var(--sp-ink)" font-size="10" font-weight="600"
                  >Target 400</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-axis="Annotation" data-part="picker" data-value="${x}">
          <button class="sp-segment" type="button" data-part="seg-callout" value="callout" style="padding: 4px 10px; font-size: 12px">Callout</button>
          <button class="sp-segment" type="button" data-part="seg-span" value="span" style="padding: 4px 10px; font-size: 12px">Span</button>
          <button class="sp-segment" type="button" data-part="seg-reference" value="reference" style="padding: 4px 10px; font-size: 12px">Rule</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-kind="${x}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${y[x]}</span>
      
    </div>
  `;let k=e(a,`annotation`),A=e(a,`note`),j=b.map(t=>e(a,`note-${t}`)),M=e=>{if(b.includes(e)){k.dataset.kind=e;for(let[t,n]of j.entries())b[t]===e?n.removeAttribute(`hidden`):n.setAttribute(`hidden`,``);A.dataset.kind=e,A.textContent=y[e]??``}};e(a,`picker`).addEventListener(`change`,e=>M(e.detail)),M(x)}export{S as mount};