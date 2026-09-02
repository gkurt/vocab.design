import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=426,n=150,r=42,i=12,a=374,o=114,s=126,c=[`Q1`,`Q2`,`Q3`,`Q4`],l=[46.8,47.4,48,48.4],u=a/c.length,d=44,f=[0,1/3,2/3,1],p=2,m=`transition: transform 0.45s var(--sp-ease)`,h={truncated:{from:46.4,to:48.8,label:e=>(46.4+e*2.4).toFixed(1),readout:`Axis 46.4 to 48.8`,note:`Cut at 46.4 the four bars fan out. Share rose 3.4 percent across the year, and the last bar is drawn five times the height of the first.`},zero:{from:0,to:60,label:e=>String(Math.round(e*60)),readout:`Axis 0 to 60`,note:`From zero the same four numbers are the same four numbers: a 3.4 percent rise, drawn at the length a 3.4 percent rise has.`}},g=`truncated`,_=(e,t)=>Math.max(0,(e-t.from)/(t.to-t.from)*o),v=e=>r+e*u+u/2;function y(a){let y=h[g],b=f.map(e=>{let t=(s-e*o).toFixed(1);return`<line x1="${r}" y1="${t}" x2="416" y2="${t}" stroke="var(--sp-line)" stroke-width="${p}" />`}).join(``),x=f.map((e,t)=>`<text data-part="tick-${t}" x="34" y="${(s-e*o+3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${y.label(e)}</text>`).join(``),S=c.map((e,t)=>{let n=_(l[t]??0,y),i=(r+t*u+(u-d)/2).toFixed(1);return`<rect
        data-part="bar-${e.toLowerCase()}"
        x="${i}" y="${(s-n).toFixed(1)}" width="${d}" height="${n.toFixed(1)}"
        rx="3" fill="var(--sp-accent)"
        style="transition: y 0.45s var(--sp-ease), height 0.45s var(--sp-ease)"
      />`}).join(``),C=c.map((e,t)=>{let n=l[t]??0;return`<g
        data-part="value-${e.toLowerCase()}"
        style="transform-box: view-box; transform: translate(0, ${(-_(n,y)).toFixed(1)}px); ${m}"
      >
        <text x="${v(t).toFixed(1)}" y="120" text-anchor="middle" fill="var(--sp-ink)" font-size="10">${n.toFixed(1)}</text>
      </g>`}).join(``),w=c.map((e,t)=>`<text x="${v(t).toFixed(1)}" y="142" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${e}</text>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 257px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Handset share, %</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="domain" data-value="${g}" data-axis="Y axis" data-term="truncated">
            <button class="sp-segment" type="button" data-part="domain-zero" value="zero" style="padding: 5px 10px; font-size: 12px">From zero</button>
            <button class="sp-segment" type="button" data-part="domain-truncated" value="truncated" style="padding: 5px 10px; font-size: 12px">Cut at 46.4</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-label sp-context" style="font-size: 11px">Q1 to Q4 +3.4%</span>
              <span
                class="sp-label"
                data-part="readout"
                data-mode="${g}"
                style="width: 190px; text-align: right; font-size: 11px; color: var(--sp-ink)"
              >${y.readout}</span>
            </div>
            <svg
              data-part="plot"
              role="img"
              aria-label="Handset share by quarter, four bars, drawn against an axis cut at 46.4 percent"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block; margin-top: 8px"
            >
              ${b}
              <line x1="${r}" y1="${s}" x2="416" y2="${s}" stroke="var(--sp-muted)" stroke-width="${p}" />
              ${S}
              ${C}
              ${w}
              <g data-part="axis" data-subject data-pose="[data-mode=truncated]" data-mode="${g}">
                <line x1="${r}" y1="${i}" x2="${r}" y2="${s}" stroke="var(--sp-muted)" stroke-width="${p}" />
                ${x}
              </g>
            </svg>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${y.note}</span>
    </div>
  `;let T=e(a,`axis`),E=e(a,`plot`),D=e(a,`readout`),O=e(a,`note`),k=t=>{let n=h[t];if(n){T.dataset.mode=t,D.dataset.mode=t,D.textContent=n.readout,O.textContent=n.note,E.setAttribute(`aria-label`,t===`zero`?`Handset share by quarter, four bars, drawn against an axis starting at zero`:`Handset share by quarter, four bars, drawn against an axis cut at 46.4 percent`);for(let[t,r]of f.entries())e(a,`tick-${t}`).textContent=n.label(r);for(let[t,r]of c.entries()){let i=_(l[t]??0,n),o=e(a,`bar-${r.toLowerCase()}`);o.setAttribute(`y`,(s-i).toFixed(1)),o.setAttribute(`height`,i.toFixed(1)),e(a,`value-${r.toLowerCase()}`).style.transform=`translate(0, ${(-i).toFixed(1)}px)`}}};e(a,`domain`).addEventListener(`change`,e=>k(e.detail))}export{y as mount};