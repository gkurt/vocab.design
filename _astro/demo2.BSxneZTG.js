import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=244,r=38,i=62,a=4,o=174,s={mass:1,stiffness:180,damping:12},c=940,l=520,u=`cubic-bezier(0.16, 1, 0.3, 1)`,d=56;function f(e){let t=Math.sqrt(s.stiffness/s.mass),n=s.damping/(2*Math.sqrt(s.stiffness*s.mass)),r=t*Math.sqrt(1-n*n),i=[];for(let a=0;a<=d;a++){let o=a/d,s=o*c/1e3,l=1-Math.exp(-n*t*s)*(Math.cos(r*s)+n*t/r*Math.sin(r*s));i.push({offset:o,transform:`translateX(${(l*e).toFixed(2)}px)`})}return i}function p(s,d){let p=(e,t)=>`
    <div
      data-part="rail-${e}"
      style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px;
             border-radius: var(--sp-radius); background: var(--sp-sunken)"
    >
      <span
        class="sp-surface"
        data-part="tile-${e}"
        ${t?`data-subject`:``}
        style="position: absolute; top: ${a}px; left: ${a}px; display: flex; align-items: center;
               justify-content: center; width: ${i}px; height: 30px;
               border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 11px;
               font-weight: 600; transform: translateX(0)"
      >Card</span>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 396px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" data-part="row-spring" style="gap: 12px; margin-top: 16px">
          <span class="sp-stack sp-context" style="width: 104px; gap: 2px">
            <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Spring</span>
            <span class="sp-label" style="font-size: 11px">stiffness 180, damping 12</span>
          </span>
          ${p(`spring`,!0)}
        </div>
        <div class="sp-row sp-context" data-part="row-ease" style="gap: 12px; margin-top: 12px">
          <span class="sp-stack" style="width: 104px; gap: 2px">
            <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Fixed ease</span>
            <span class="sp-label" style="font-size: 11px">ease-out, ${l}ms</span>
          </span>
          ${p(`ease`,!1)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 14px 0 0">
          The spring is told how heavy and how stiff, never how long.
        </p>
      </div>
    </div>
  `;let m=e(s,`panel`),h=e(s,`tile-spring`),g=e(s,`tile-ease`),_,v=()=>{m.removeAttribute(`data-running`),m.setAttribute(`data-settled`,``)};e(s,`replay`).addEventListener(`click`,()=>{d.clearTimeout(_),m.removeAttribute(`data-settled`),m.setAttribute(`data-running`,``);for(let e of[h,g])for(let t of e.getAnimations())t.cancel();if(t(s)){for(let e of[h,g])e.style.transform=`translateX(${o}px)`;v();return}for(let e of[h,g])e.style.transform=`translateX(0)`;h.animate(f(o),{duration:c,easing:`linear`,fill:`forwards`}),g.animate([{transform:`translateX(0)`},{transform:`translateX(${o}px)`}],{duration:l,easing:u,fill:`forwards`}),_=d.setTimeout(v,1e3)})}export{p as mount};