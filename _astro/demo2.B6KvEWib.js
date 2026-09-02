import{n as e}from"./parts.C-YLuC7Q.js";var t=20,n=100;function r(e){let t=7.5625,n=2.75;if(e<1/n)return t*e*e;if(e<2/n){let r=e-1.5/n;return t*r*r+.75}if(e<2.5/n){let r=e-2.25/n;return t*r*r+.9375}let r=e-2.625/n;return t*r*r+.984375}var i=Array.from({length:21},(e,n)=>Number(r(n/t).toFixed(3))),a=`linear(${i.join(`, `)})`,o=`linear(${i.slice(0,4).join(`, `)}, …)`,s=i.map((e,r)=>`${(r/t*n).toFixed(1)},${(n-e*n).toFixed(1)}`).join(` `),c=i.map((e,r)=>`<circle cx="${(r/t*n).toFixed(1)}" cy="${(n-e*n).toFixed(1)}" r="1.9" fill="var(--sp-accent)" />`).join(``);function l(t,n){let r=(e,t,n)=>`
    <div class="sp-stack" style="gap: 6px">
      <span class="sp-text sp-text--ink" style="font-size: 11.5px; font-family: ui-monospace, monospace">${t}</span>
      <div class="sp-row">
        <span class="sp-track" data-part="track-${e}" style="--sp-timing: ${n}">
          <span class="sp-dot" data-part="dot-${e}"></span>
        </span>
      </div>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: center; gap: 16px; margin-top: 10px">
          <svg
            data-part="graph"
            data-subject
            viewBox="-16 -8 124 128"
            style="display: block; width: 140px; height: 144px; flex: 0 0 auto; overflow: visible"
            role="img"
            aria-label="${i.length} sampled stops plotted as a bounce, against the straight line of the linear keyword"
          >
            <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--sp-line)" stroke-width="1" />
            <path d="M0 100 L100 0" fill="none" stroke="var(--sp-line)" stroke-width="1" stroke-dasharray="3 3" />
            <polyline points="${s}" fill="none" stroke="var(--sp-accent)" stroke-width="2.2" stroke-linejoin="round" />
            ${c}
            <text x="50" y="114" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">time</text>
            <text transform="translate(-7 50) rotate(-90)" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">progress</text>
          </svg>
          <div class="sp-stack sp-context" data-part="race" style="flex: 1 1 auto; gap: 14px">
            ${r(`stops`,o,a)}
            ${r(`keyword`,`linear`,`linear`)}
          </div>
        </div>
      </div>
    </div>
  `;let l=e(t,`race`),u,d=()=>{l.removeAttribute(`data-running`),l.setAttribute(`data-settled`,``)},f=()=>{n.clearTimeout(u),l.removeAttribute(`data-settled`),l.removeAttribute(`data-running`),l.offsetWidth,l.setAttribute(`data-running`,``),u=n.setTimeout(d,1180)};e(t,`replay`).addEventListener(`click`,f),f()}export{l as mount};