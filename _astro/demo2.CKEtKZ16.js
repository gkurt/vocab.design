import{o as e}from"./touch.Bg97t8LB.js";import{n as t}from"./parts.C-YLuC7Q.js";var n={w:300,h:132},r={w:268,h:52},i=40,a=.55,o=[{key:`light`,name:`Light`,below:.4},{key:`medium`,name:`Medium`,below:.8},{key:`firm`,name:`Firm`,below:1/0}],s=e=>o.find(t=>e<t.below)??o[o.length-1],c=e=>({half:2+e*10,alpha:.4+e*.6}),l=e=>{let t=[],n=[];for(let r=0;r<=i;r++){let a=r/i,o=10+248*a,s=38-22*Math.sin(Math.PI*a),c=e*(.14+.86*Math.sin(Math.PI*a)**.9);t.push(`${o.toFixed(1)},${(s-c).toFixed(1)}`),n.push(`${o.toFixed(1)},${(s+c).toFixed(1)}`)}return`M ${t.join(` L `)} L ${n.reverse().join(` L `)} Z`};function u(i,o){let u=s(a);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sketch</span>
          <span class="sp-text" data-part="readout" style="width: 168px; text-align: right; white-space: nowrap">${u?.name} press</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div class="sp-row" style="gap: 10px; align-items: flex-start">
            <div
              class="sp-surface"
              data-part="paper"
              data-touch
              style="position: relative; flex: 0 0 auto; width: ${n.w+2}px; height: ${n.h+2}px; overflow: hidden; touch-action: none"
            >
              <span
                class="sp-context"
                style="position: absolute; inset: 0; background-image: radial-gradient(var(--sp-line) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.7"
              ></span>
              <div
                data-part="stroke"
                data-subject
                data-level="${u?.key}"
                style="position: absolute; left: ${(n.w-r.w)/2}px; top: ${(n.h-r.h)/2}px; width: ${r.w}px; height: ${r.h}px"
              >
                <svg viewBox="0 0 ${r.w} ${r.h}" width="${r.w}" height="${r.h}" style="display: block" aria-hidden="true">
                  <path data-part="ink" d="" fill="var(--sp-accent)" fill-opacity="0.76"></path>
                </svg>
              </div>
            </div>

            <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
              <span class="sp-label">Reported</span>
              <span class="sp-heading" data-part="value" style="font-size: 17px; font-variant-numeric: tabular-nums">0.55</span>
              <div class="sp-progress"><div class="sp-progress-fill" data-part="meter" style="--sp-value: 55%"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let d=t(i,`stroke`),f=d.querySelector(`path`),p=t(i,`readout`),m=t(i,`value`),h=t(i,`meter`),g=(e,t)=>{let n=s(e),{half:r,alpha:i}=c(e);d.dataset.level=n?.key??`medium`,f.setAttribute(`d`,l(r)),f.setAttribute(`fill-opacity`,i.toFixed(2)),m.textContent=e.toFixed(2),h.style.setProperty(`--sp-value`,`${Math.round(e*100)}%`),p.textContent=t?`Reading the press: ${e.toFixed(2)}`:`${n?.name} press`};e(t(i,`paper`),o,{onForce:e=>g(e,!0),onEnd:e=>g(e,!1)}),g(a,!1)}export{u as mount};