import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=424,n=140,r=36,i=12,a=374,o=104,s=116,c=2,l=60,u=[38,41,36,44,47,43,51,55,52],d=[0,.25,.5,.75,1],f=e=>r+e*a/(u.length-1),p=e=>s-e/l*o,m={heavy:5+u.length+u.length+d.length,mid:d.length+1+d.length,keep:3,data:1+u.length},h={full:{heavy:!0,mid:!0,note:`Fill, frame, legend, two grids, every tick: ${m.heavy+m.mid+m.keep} marks around ${m.data}.`},restrained:{heavy:!1,mid:!0,note:`Frame, fill, legend and the vertical grid erased. The readings held.`},reduced:{heavy:!1,mid:!1,note:`Marks, a baseline, two dates. An exact value now costs a squint.`}},g=`full`,_=e=>m.data+m.keep+(e.mid?m.mid:0)+(e.heavy?m.heavy:0),v=e=>{let t=_(e);return`${m.data} of ${t} marks carry data · ${Math.round(m.data/t*100)}% data ink`};function y(m){let _=u.map((e,t)=>`${f(t).toFixed(1)},${p(e).toFixed(1)}`).join(` `),y=u.map((e,t)=>`<circle cx="${f(t).toFixed(1)}" cy="${p(e).toFixed(1)}" r="3.2" fill="var(--sp-accent)" />`).join(``);m.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Reservoir, percent of capacity</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Ink" data-value="${g}">
            <button class="sp-segment" type="button" data-part="seg-full" value="full" style="padding: 4px 9px; font-size: 11px">as charted</button>
            <button class="sp-segment" type="button" data-part="seg-restrained" value="restrained" style="padding: 4px 9px; font-size: 11px">erase once</button>
            <button class="sp-segment" type="button" data-part="seg-reduced" value="reduced" style="padding: 4px 9px; font-size: 11px">erase again</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 10px 12px">
          <div class="sp-surface" style="flex: 0 0 auto; width: 444px; padding: 8px 9px">
            <svg
              data-part="plot"
              role="img"
              aria-label="Nine monthly reservoir readings rising from thirty six to fifty five percent of capacity"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block"
            >
              <g data-part="chrome-heavy" class="sp-context" data-state="on" style="transition: opacity 0.4s var(--sp-ease)">
                <rect x="${r}" y="${i}" width="${a}" height="${o}" fill="var(--sp-sunken)" />
                <rect x="3" y="3" width="418" height="134" rx="3" fill="none" stroke="var(--sp-muted)" stroke-width="3" />
                ${u.map((e,t)=>{let n=f(t).toFixed(1);return`<line x1="${n}" y1="${i}" x2="${n}" y2="${s}" stroke="var(--sp-line)" stroke-width="${c}" />`}).join(``)}
                ${u.map((e,t)=>{let n=f(t).toFixed(1);return`<line x1="${n}" y1="${s}" x2="${n}" y2="121" stroke="var(--sp-muted)" stroke-width="${c}" />`}).join(``)}
                ${d.map(e=>{let t=(s-e*o).toFixed(1);return`<line x1="31" y1="${t}" x2="${r}" y2="${t}" stroke="var(--sp-muted)" stroke-width="${c}" />`}).join(``)}
                <rect x="44" y="86" width="86" height="22" rx="4" fill="var(--sp-surface)" stroke="var(--sp-line)" stroke-width="${c}" />
                <rect x="52" y="92" width="10" height="10" rx="2" fill="var(--sp-muted)" />
                <text x="68" y="101" fill="var(--sp-muted)" font-size="10">Level</text>
              </g>

              <g data-part="chrome-mid" class="sp-context" data-state="on" style="transition: opacity 0.4s var(--sp-ease)">
                ${d.map(e=>{let t=(s-e*o).toFixed(1);return`<line x1="${r}" y1="${t}" x2="410" y2="${t}" stroke="var(--sp-line)" stroke-width="${c}" />`}).join(``)}
                <line x1="${r}" y1="${i}" x2="${r}" y2="${s}" stroke="var(--sp-muted)" stroke-width="${c}" />
                ${d.map(e=>`<text x="27" y="${(s-e*o+3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9"
        style="font-variant-numeric: tabular-nums">${Math.round(e*l)}</text>`).join(``)}
              </g>

              <g class="sp-context">
                <line x1="${r}" y1="${s}" x2="410" y2="${s}" stroke="var(--sp-muted)" stroke-width="${c}" />
                <text x="${r}" y="132" fill="var(--sp-muted)" font-size="10">Jan</text>
                <text x="410" y="132" text-anchor="end" fill="var(--sp-muted)" font-size="10">Sep</text>
              </g>

              <g data-part="marks" data-subject>
                <polyline points="${_}" fill="none" stroke="var(--sp-accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
                ${y}
              </g>
            </svg>
          </div>

          <span
            class="sp-text sp-text--ink"
            data-part="ratio"
            data-level="${g}"
            style="flex: 0 0 auto; height: 17px; font-size: 12px; font-weight: 500; line-height: 17px; white-space: nowrap;
                   font-variant-numeric: tabular-nums"
          >${v(h[g])}</span>

          <span
            class="sp-label sp-context"
            data-stage-verdict data-part="note"
            data-level="${g}"
            role="status"
            style="flex: 0 0 auto; width: 444px; height: 15px; font-size: 11px; line-height: 15px; text-align: center;
                   white-space: nowrap; overflow: hidden"
          >${h[g].note}</span>
        </div>
      </div>
    </div>
  `;let b=e(m,`chrome-heavy`),x=e(m,`chrome-mid`),S=e(m,`ratio`),C=e(m,`note`),w=(e,t)=>{e.dataset.state=t?`on`:`ghost`,e.style.opacity=t?`1`:`0.13`},T=e=>{let t=h[e];t&&(w(b,t.heavy),w(x,t.mid),S.dataset.level=e,S.textContent=v(t),C.dataset.level=e,C.textContent=t.note)};e(m,`picker`).addEventListener(`change`,e=>T(e.detail)),T(g)}export{y as mount};