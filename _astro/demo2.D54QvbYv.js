import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=244,r=38,i=62,a=4,o=174,s={mass:1,stiffness:180,damping:20},c=400,l=`cubic-bezier(0.2, 0, 0, 1)`,u=900,d=.01,f=60;function p(e){let t=Math.sqrt(s.stiffness/s.mass),n=s.damping/(2*Math.sqrt(s.stiffness*s.mass)),r=t*Math.sqrt(1-n*n);return 1-Math.exp(-n*t*e)*(Math.cos(r*e)+n*t/r*Math.sin(r*e))}function m(){for(let e=u;e>0;e--)if(Math.abs(1-p(e/1e3))>=d)return e;return 0}function h(){let e=[];for(let t=0;t<=f;t++){let n=t/f;e.push({offset:n,transform:`translateX(${(p(n*u/1e3)*o).toFixed(2)}px)`})}return e}function g(s,d){let f=m(),p=Math.round(f/10)*10,g=e=>(e/u*n).toFixed(1),_=(e,t)=>`
    <div
      data-part="rail-${e}"
      style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px;
             border-radius: var(--sp-radius); background: var(--sp-sunken)"
    >
      <span
        class="sp-surface"
        data-part="tile-${e}"
        style="position: absolute; top: ${a}px; left: ${a}px; display: flex; align-items: center;
               justify-content: center; width: ${i}px; height: 30px;
               border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 11px;
               font-weight: 600; transform: translateX(0)"
      >${t?`Spring`:`Tween`}</span>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Arrival time</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-stack" data-part="compare" data-subject data-state="settled" style="gap: 12px; margin-top: 14px">
          <div class="sp-row" style="gap: 12px">
            <span class="sp-stack" style="width: 116px; gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Spring</span>
              <span class="sp-label" style="font-size: 11px">measured ${p} ms</span>
            </span>
            ${_(`spring`,!0)}
          </div>
          <div class="sp-row" style="gap: 12px">
            <span class="sp-stack" style="width: 116px; gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Tween</span>
              <span class="sp-label" style="font-size: 11px">specified ${c} ms</span>
            </span>
            ${_(`tween`,!1)}
          </div>
          <div class="sp-row" style="gap: 12px">
            <span class="sp-label" style="width: 116px; font-size: 11px">Measured against</span>
            <div data-part="ruler" style="position: relative; width: ${n}px; height: 30px">
              <span class="sp-label" style="position: absolute; left: 0; top: 0; font-size: 10px">0</span>
              <span
                class="sp-label"
                style="position: absolute; left: ${g(c)}px; top: 0; font-size: 10px; transform: translateX(-50%)"
              >${c}</span>
              <span
                class="sp-label"
                style="position: absolute; left: ${g(f)}px; top: 0; font-size: 10px; transform: translateX(-50%);
                       color: var(--sp-ink); font-weight: 600"
              >${p}</span>
              <span class="sp-label" style="position: absolute; right: 0; top: 0; font-size: 10px">${u} ms</span>
              <span style="position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: var(--sp-line)"></span>
              <span style="position: absolute; left: ${g(c)}px; top: 15px; width: 1px; height: 9px; background: var(--sp-muted)"></span>
              <span
                data-part="flag"
                style="position: absolute; left: ${g(f)}px; top: 13px; width: 2px; height: 11px; background: var(--sp-ink)"
              ></span>
              <span
                data-part="playhead"
                style="position: absolute; left: 0; top: 14px; width: 2px; height: 16px; background: var(--sp-accent);
                       transform: translateX(0); transition: transform ${u}ms linear"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let v=e(s,`compare`),y=e(s,`tile-spring`),b=e(s,`tile-tween`),x=e(s,`playhead`),S=[],C=()=>{for(let e of[y,b])e.style.transform=`translateX(${o}px)`;x.style.transform=`translateX(242px)`},w=()=>{for(let e of S)d.clearTimeout(e);S.length=0;for(let e of[y,b])for(let t of e.getAnimations())t.cancel();if(t(s)){C(),v.dataset.state=`settled`;return}for(let e of[y,b])e.style.transform=`translateX(0)`;x.style.transition=`none`,x.style.transform=`translateX(0)`,x.offsetWidth,x.style.transition=`transform ${u}ms linear`,x.style.transform=`translateX(242px)`,v.dataset.state=`running`,y.animate(h(),{duration:u,easing:`linear`,fill:`forwards`}),b.animate([{transform:`translateX(0)`},{transform:`translateX(${o}px)`}],{duration:c,easing:l,fill:`forwards`}),S.push(d.setTimeout(()=>{v.dataset.state=`quotable`},f)),S.push(d.setTimeout(()=>{v.dataset.state=`settled`},960))};e(s,`replay`).addEventListener(`click`,w),w()}export{g as mount};