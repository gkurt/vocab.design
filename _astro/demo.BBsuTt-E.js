import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./motion.B5_YXmsy.js";var r=420,i=130,a=-70,o=360,s=1200,c=150,l=300,u=`display: block; background: var(--sp-line); border-radius: 5px`,d=`class="sp-context"`;function f(f,p){let m=e=>`<span ${d} style="${u}; width: ${e}; height: 10px"></span>`;f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Library</span>
          <span class="sp-label">Fetching</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            data-part="sweep"
            data-passes="0"
            style="position: relative; overflow: hidden; width: ${r}px; padding: 14px; border-radius: 6px;
                   background: var(--sp-surface); display: flex; flex-direction: column; gap: 10px"
          >
            <span data-part="cover" ${d} style="${u}; width: 100%; height: 64px; border-radius: 6px"></span>
            ${m(`78%`)}
            ${m(`92%`)}
            ${m(`52%`)}
            <span
              data-part="band"
              data-subject
              style="position: absolute; top: 0; bottom: 0; left: 0; width: ${i}px; pointer-events: none;
                     transform: translateX(${a}px);
                     background: linear-gradient(105deg, transparent 0%, var(--sp-surface) 50%, transparent 100%)"
            ></span>
          </div>
          <span
            class="sp-label sp-context"
            data-part="readout"
            style="align-self: flex-start; margin-left: 7px; white-space: nowrap; font-variant-numeric: tabular-nums"
          >Sweeps completed: 0. Progress reported: none.</span>
        </div>
      </div>
    </div>
  `;let h=e(f,`band`),g=e(f,`sweep`),_=e(f,`readout`);if(n(f)){h.style.transform=`translateX(${c}px)`;return}let v=h.animate([{transform:`translateX(${a}px)`},{transform:`translateX(${o}px)`}],{duration:s,iterations:1/0,easing:`linear`}),y=-1,b=()=>{let e=Math.floor(Number(v.currentTime??0)/s);e!==y&&(y=e,g.dataset.passes=String(e),t(g,`data-swept`,e>=1),_.textContent=`Sweeps completed: ${e}. Progress reported: none.`),p.setTimeout(b,l)};b()}export{f as mount};