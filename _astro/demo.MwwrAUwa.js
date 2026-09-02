import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=3e3,r=76,i=76,a=8,o=12,s=60;function c(e){let t=Math.sin((e+.5)/a*Math.PI*2)*12,n=-t*.7;return`
    <svg width="${i}" height="${i}" viewBox="0 0 ${i} ${i}" aria-hidden="true" style="display: block; flex: 0 0 auto">
      <g stroke="var(--sp-accent)" stroke-width="3" stroke-linecap="round" fill="none">
        <circle cx="38" cy="21" r="7" fill="var(--sp-accent)" stroke="none" />
        <path d="M38 30 V48" />
        <path d="M38 48 L${(38+t).toFixed(1)} 62" />
        <path d="M38 48 L${(38-t).toFixed(1)} 62" />
        <path d="M38 35 L${(38+n).toFixed(1)} 45" />
        <path d="M38 35 L${(38-n).toFixed(1)} 45" />
      </g>
    </svg>`}function l(e,t){let n=Array.from({length:o},(e,t)=>{let n=t/o*Math.PI*2-Math.PI/2,i=r/2;return`<line x1="${(i+Math.cos(n)*30).toFixed(1)}" y1="${(i+Math.sin(n)*30).toFixed(1)}"
                  x2="${(i+Math.cos(n)*34).toFixed(1)}" y2="${(i+Math.sin(n)*34).toFixed(1)}"
                  stroke="var(--sp-line)" stroke-width="2" stroke-linecap="round" />`}).join(``);return`
    <svg data-part="dial-${t}" width="${r}" height="${r}" viewBox="0 0 ${r} ${r}" aria-hidden="true" style="display: block">
      <circle cx="${r/2}" cy="${r/2}" r="36" fill="var(--sp-sunken)" stroke="var(--sp-line)" />
      ${n}
      ${e}
      <circle cx="${r/2}" cy="${r/2}" r="3" fill="var(--sp-accent)" />
    </svg>`}function u(u,d){let f=(e,t)=>`
    <line
      data-part="hand-${e}"
      x1="${r/2}" y1="${r/2}" x2="${r/2}" y2="${r/2-26}"
      stroke="var(--sp-accent)" stroke-width="2.5" stroke-linecap="round"
      style="transform-origin: ${r/2}px ${r/2}px; transform: rotate(0deg);
             transition: transform ${n}ms ${t} ${s}ms"
    />`,p=(e,t)=>`
    <div class="sp-stack" style="width: 118px; gap: 4px; align-items: center; text-align: center">
      ${e}
      <span class="sp-label sp-text--ink" style="font-size: 10px">${t}</span>
    </div>`,m=Array.from({length:a},(e,t)=>c(t)).join(``);u.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 428px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Easing preview</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-row" style="gap: 14px; align-items: flex-start; margin-top: 12px">
          <div class="sp-row" data-part="stepped" data-subject style="gap: 0">
            ${p(l(f(`step`,`steps(${o}, jump-end)`),`step`),`steps(${o}, jump-end)`)}
            ${p(`<div
                 style="width: ${i}px; height: ${i}px; overflow: hidden; border-radius: 6px;
                        background: var(--sp-sunken)"
               ><div
                   data-part="strip"
                   style="display: flex; width: 608px; transform: translateX(0);
                          transition: transform ${n}ms steps(${a}, jump-none) ${s}ms"
                 >${m}</div></div>`,`steps(${a}, jump-none)`)}
          </div>
          <div style="flex: 0 0 1px; align-self: stretch; background: var(--sp-line)"></div>
          <div class="sp-context">
            ${p(l(f(`sweep`,`linear`),`sweep`),`linear`)}
          </div>
        </div>
      </div>
    </div>
  `;let h=e(u,`scene`),g=e(u,`hand-step`),_=e(u,`hand-sweep`),v=e(u,`strip`),y,b=e=>{g.style.transform=`rotate(${e?360:0}deg)`,_.style.transform=`rotate(${e?360:0}deg)`,v.style.transform=`translateX(${e?-532:0}px)`},x=()=>{if(d.clearTimeout(y),t(u)){b(!0),h.dataset.state=`rested`;return}for(let e of[g,_,v])e.style.transition=`none`;b(!1),v.offsetWidth,g.style.transition=`transform ${n}ms steps(${o}, jump-end) ${s}ms`,_.style.transition=`transform ${n}ms linear ${s}ms`,v.style.transition=`transform ${n}ms steps(${a}, jump-none) ${s}ms`,b(!0),h.dataset.state=`ticking`,y=d.setTimeout(()=>{h.dataset.state=`rested`},3120)};e(u,`replay`).addEventListener(`click`,x),x()}export{u as mount};