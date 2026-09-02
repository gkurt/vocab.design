import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,n,t as r}from"./measure.DK7AY2_i.js";var i=`To`,a=64,o=3;function s(s,c){let l=(e,t)=>`
    <div class="sp-row" style="gap: 14px; height: 72px; align-items: center">
      <span class="sp-label sp-context" style="width: 132px; flex: 0 0 auto">font-kerning: ${t}</span>
      <div style="position: relative; flex: 0 0 auto">
        <span data-part="${e}" style="display: inline-block; font-size: ${a}px; line-height: 1; font-weight: 500;
              white-space: nowrap; font-kerning: ${t}">${i}</span>
      </div>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div>
          ${l(`pair-none`,`none`)}
          ${l(`pair-normal`,`normal`)}
        </div>
        <div data-part="gap-layer" style="position: relative; height: 0"></div>
        <div class="sp-row sp-row--between sp-context" style="height: 18px; margin-top: 6px">
          <span class="sp-label" style="color: var(--sp-ink)">T + o</span>
          <span class="sp-label" data-part="measured" style="font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px; height: 40px">
          The band is the correction, drawn to scale: what this face takes out from between a T and a
          round o, and from no other pair on the line.
        </p>
      </div>
    </div>
  `;let u=e(s,`pair-none`),d=e(s,`pair-normal`),f=e(s,`gap-layer`),p=e=>{let t=e.firstChild;if(!(t instanceof Text))return n(e,f).left;let i=r(f),a=f.getBoundingClientRect(),o=document.createRange();return o.setStart(t,0),o.setEnd(t,1),(o.getBoundingClientRect().right-a.left)/i},m=document.createElement(`span`);m.dataset.part=`kern-band`,m.setAttribute(`data-subject`,``),m.style.cssText=`position: absolute; border-radius: 2px; background: var(--sp-accent)`,f.append(m);let h=()=>{let r=t(u).width-t(d).width,i=Math.max(r,o),c=n(u,f).top;m.style.left=`${p(u)-i}px`,m.style.top=`${c+a*.14}px`,m.style.width=`${i}px`,m.style.height=`${a*.72}px`,e(s,`measured`).textContent=r>=.5?`kerned by ${r.toFixed(1)}px at ${a}px, or ${(r/a).toFixed(3)}em`:`this face carries no kern for the pair`};h(),c.setTimeout(h,400)}export{s as mount};