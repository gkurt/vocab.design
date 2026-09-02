import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=426,n=150,r=40,i=12,a=346,o=116,s=128,c=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`],l=[312,328,341,355,369,380,394,408],u=[88,86,90,89,93,92,96,97],d=480,f=a/c.length,p=24,m=[0,1/3,2/3,1],h=2,g=`oklch(0.6 0.16 32)`,_={wide:{axes:`dual`,from:0,to:240,note:`Right axis 0 to 240. The complaint line lies low and almost flat under the bars, and the chart says complaints are a rounding error.`},tight:{axes:`dual`,from:84,to:102,note:`Right axis 84 to 102. Not one number moved. The same eight counts now climb most of the plot, steeper than the bars, and the chart says complaints are outrunning revenue.`},single:{axes:`single`,from:0,to:d,note:`One axis, in thousands. Counts against currency lie flat at the bottom, which is the honest picture of two series that share no unit, and the reason a second axis is tempting.`}},v=`wide`,y=e=>r+e*f+f/2,b=e=>s-e/d*o,x=(e,t)=>s-(e-t.from)/(t.to-t.from)*o;function S(e){return`<polyline points="${u.map((t,n)=>`${y(n).toFixed(1)},${x(t,e).toFixed(1)}`).join(` `)}" fill="none" stroke="${g}" stroke-width="${h}" stroke-linecap="round" stroke-linejoin="round" />${u.map((t,n)=>`<circle cx="${y(n).toFixed(1)}" cy="${x(t,e).toFixed(1)}" r="2.6" fill="${g}" />`).join(``)}`}function C(a){let u=_[v],x=m.map(e=>{let t=(s-e*o).toFixed(1);return`<line x1="${r}" y1="${t}" x2="386" y2="${t}" stroke="var(--sp-line)" stroke-width="${h}" />`}).join(``),C=m.map(e=>`<text x="33" y="${(s-e*o+3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${Math.round(e*d)}</text>`).join(``),w=m.map((e,t)=>{let n=(s-e*o+3.5).toFixed(1),r=u.from+e*(u.to-u.from);return`<text data-part="right-tick-${t}" x="393" y="${n}" fill="var(--sp-muted)" font-size="10">${Math.round(r)}</text>`}).join(``),T=l.map((e,t)=>{let n=b(e);return`<rect x="${(r+t*f+(f-p)/2).toFixed(1)}" y="${n.toFixed(1)}" width="${p}" height="${(s-n).toFixed(1)}" rx="2" fill="var(--sp-accent)" />`}).join(``),E=c.map((e,t)=>`<text x="${y(t).toFixed(1)}" y="143" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${e}</text>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 257px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Revenue, complaints</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="scale" data-axis="Scale" data-value="${v}">
            <button class="sp-segment" type="button" data-part="scale-wide" value="wide" style="padding: 5px 9px; font-size: 12px">0 to 240</button>
            <button class="sp-segment" type="button" data-part="scale-tight" value="tight" style="padding: 5px 9px; font-size: 12px">84 to 102</button>
            <button class="sp-segment" type="button" data-part="scale-single" value="single" style="padding: 5px 9px; font-size: 12px">One axis</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-row" style="gap: 10px">
                <span class="sp-row" style="gap: 5px">
                  <span class="sp-swatch" style="width: 10px; height: 10px; border-radius: 2px; --sp-swatch: var(--sp-accent)"></span>
                  <span style="font-size: 11px">Revenue, thousands</span>
                </span>
                <span class="sp-row" style="gap: 5px">
                  <span class="sp-swatch" style="width: 10px; height: 10px; border-radius: 2px; --sp-swatch: ${g}"></span>
                  <span style="font-size: 11px">Complaints</span>
                </span>
              </span>
            </div>
            <svg
              data-part="plot"
              role="img"
              aria-label="Revenue as bars against a left axis and complaints as a line against a right axis scaled 0 to 240"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block; margin-top: 8px"
            >
              ${x}
              <line x1="${r}" y1="${s}" x2="386" y2="${s}" stroke="var(--sp-muted)" stroke-width="${h}" />
              ${T}
              <g data-part="series">${S(u)}</g>
              ${E}
              <g>
                <line x1="${r}" y1="${i}" x2="${r}" y2="${s}" stroke="var(--sp-muted)" stroke-width="${h}" />
                ${C}
              </g>
              <g
                data-part="right-axis"
                data-subject
                data-pose="[data-axes=dual]"
                data-axes="${u.axes}"
                style="opacity: 1; transition: opacity 0.2s"
              >
                <line x1="386" y1="${i}" x2="386" y2="${s}" stroke="var(--sp-muted)" stroke-width="${h}" />
                ${w}
              </g>
            </svg>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" data-mode="${v}" style="width: 452px; height: 32px; font-size: 11px">${u.note}</span>
    </div>
  `;let D=e(a,`right-axis`),O=e(a,`plot`),k=e(a,`series`),A=e(a,`note`),j=t=>{let n=_[t];if(n){D.dataset.axes=n.axes,D.style.opacity=n.axes===`dual`?`1`:`0`,A.dataset.mode=t,A.textContent=n.note,k.innerHTML=S(n),O.setAttribute(`aria-label`,n.axes===`dual`?`Revenue as bars against a left axis and complaints as a line against a right axis scaled ${n.from} to ${n.to}`:`Revenue as bars and complaints as a line, both against one left axis in thousands`);for(let[t,r]of m.entries())e(a,`right-tick-${t}`).textContent=String(Math.round(n.from+r*(n.to-n.from)))}};e(a,`scale`).addEventListener(`change`,e=>j(e.detail))}export{C as mount};