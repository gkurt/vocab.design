import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=200,r=30,i=40,a=4,o=152,s=180,c=1,l=1400,u=72,d=[{id:`under`,name:`Underdamped`,zeta:.35},{id:`critical`,name:`Critically damped`,zeta:1},{id:`over`,name:`Overdamped`,zeta:1.8}];function f(e,t){let n=Math.sqrt(s/c);if(t<1){let r=n*Math.sqrt(1-t*t);return 1-Math.exp(-t*n*e)*(Math.cos(r*e)+t*n/r*Math.sin(r*e))}if(t===1)return 1-(1+n*e)*Math.exp(-n*e);let r=n*Math.sqrt(t*t-1),i=-t*n+r,a=-t*n-r;return 1-(a*Math.exp(i*e)-i*Math.exp(a*e))/(a-i)}function p(e){let t=[];for(let n=0;n<=u;n++){let r=n/u;t.push({offset:r,transform:`translateX(${(f(r*l/1e3,e)*o).toFixed(2)}px)`})}return t}function m(s,c){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Damping</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-stack" data-part="compare" data-subject data-settled style="gap: 10px; margin-top: 14px">
          ${d.map(e=>`
      <div class="sp-row" style="gap: 12px">
        <span class="sp-stack" style="width: 150px; gap: 1px">
          <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${e.name}</span>
          <span class="sp-label" style="font-size: 11px">ratio ${e.zeta.toFixed(2)}</span>
        </span>
        <div
          data-part="rail-${e.id}"
          style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px;
                 border-radius: 6px; background: var(--sp-sunken)"
        >
          <span
            style="position: absolute; top: 3px; bottom: 3px; left: 156px; width: 0;
                   border-left: 1px dashed var(--sp-muted); opacity: 0.85"
          ></span>
          <span
            data-part="tile-${e.id}"
            style="position: absolute; top: ${a}px; left: ${a}px; width: ${i}px;
                   height: 22px; border-radius: 5px; background: var(--sp-accent);
                   transform: translateX(0)"
          ></span>
        </div>
      </div>`).join(``)}
        </div>
      </div>
    </div>
  `;let u=e(s,`compare`),f,m=()=>{u.removeAttribute(`data-running`),u.setAttribute(`data-settled`,``)},h=()=>{c.clearTimeout(f),u.removeAttribute(`data-settled`),u.setAttribute(`data-running`,``);for(let t of d){let n=e(s,`tile-${t.id}`);for(let e of n.getAnimations())e.cancel()}if(t(s)){for(let t of d)e(s,`tile-${t.id}`).style.transform=`translateX(${o}px)`;m();return}for(let t of d){let n=e(s,`tile-${t.id}`);n.style.transform=`translateX(0)`,n.animate(p(t.zeta),{duration:l,easing:`linear`,fill:`forwards`})}f=c.setTimeout(m,1480)};e(s,`replay`).addEventListener(`click`,h),h()}export{m as mount};