import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=42,n=68,r=30,i=32,a=12,o=.72,s=34,c={light:6,regular:12,bold:18},l=e=>e in c,u={w:84,h:120},d=80;function f(f){let p=`fill: color-mix(in oklab, var(--sp-accent) 32%, var(--sp-surface))`,m=`fill="none" stroke="currentColor" stroke-linecap="butt"`,h=`viewBox="0 0 ${u.w} ${u.h}" width="${d}" height="${Math.round(d*u.h/u.w)}"`;f.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Weight" data-value="regular">
            <button class="sp-segment" data-part="seg-light" value="light">light</button>
            <button class="sp-segment" data-part="seg-regular" value="regular">regular</button>
            <button class="sp-segment" data-part="seg-bold" value="bold">bold</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 26px; align-items: flex-start; justify-content: center; margin-top: 4px">
          <div class="sp-stack" data-part="panel-o" style="gap: 2px; align-items: center">
            <svg data-part="letter-o" ${h} role="img" aria-label="A lowercase o with its counter filled" style="display: block">
              <ellipse data-part="counter" data-subject cx="${t}" cy="${n}" style="${p}"></ellipse>
              <ellipse data-part="o-ring" ${m} cx="${t}" cy="${n}"></ellipse>
            </svg>
          </div>
          <div class="sp-stack sp-context" data-part="panel-b" style="gap: 2px; align-items: center">
            <svg ${h} aria-hidden="true" style="display: block">
              <ellipse data-part="b-counter" cx="${t}" cy="${n}" style="${p}"></ellipse>
              <ellipse data-part="b-bowl" ${m} cx="${t}" cy="${n}"></ellipse>
              <line data-part="b-stem" ${m} y1="16" y2="100"></line>
            </svg>
          </div>
          <div class="sp-stack sp-context" data-part="panel-e" style="gap: 2px; align-items: center">
            <svg ${h} aria-hidden="true" style="display: block">
              <path data-part="e-counter" style="${p}"></path>
              <path data-part="e-ring" ${m}></path>
              <line data-part="e-bar" ${m} x1="${a}" x2="72" y1="${n}" y2="${n}"></line>
            </svg>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 8px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          The e has one of each: the lens above the crossbar is enclosed, the gap below it is where the
          stroke stops instead of closing.
        </p>
      </div>
    </div>
  `;let g=(e,t)=>{for(let[n,r]of Object.entries(t))e.setAttribute(n,String(r))},_=e(f,`counter`),v=e(f,`o-ring`),y=e(f,`b-counter`),b=e(f,`b-bowl`),x=e(f,`b-stem`),S=e(f,`e-counter`),C=e(f,`e-ring`),w=e(f,`e-bar`),T=e(f,`readout`),E=e=>Math.round(e*100)/100,D=e=>{if(!l(e))return;let u=c[e],d=r-u/2,f=i-u/2,p=r-u,m=i-u,h=u*o;_.dataset.weight=e,g(_,{rx:p,ry:m}),g(v,{rx:d,ry:f,"stroke-width":u}),g(y,{rx:p,ry:m}),g(b,{rx:d,ry:f,"stroke-width":u}),g(x,{x1:a+u/2,x2:a+u/2,"stroke-width":u});let D=s*Math.PI/180,O=E(t+d*Math.cos(D)),k=E(n+f*Math.sin(D));g(C,{d:`M ${O} ${k} A ${d} ${f} 0 1 1 ${E(t+d)} ${n}`,"stroke-width":u}),g(w,{"stroke-width":h});let A=n-h/2,j=m>0?Math.sqrt(Math.max(0,1-(h/2/m)**2)):0,M=E(p*j);g(S,{d:`M ${E(t-M)} ${E(A)} A ${p} ${m} 0 0 1 ${E(t+M)} ${E(A)} Z`}),T.textContent=`stroke ${u} · counter ${2*p} units`};D(`regular`),e(f,`segmented`).addEventListener(`change`,e=>D(e.detail))}export{f as mount};