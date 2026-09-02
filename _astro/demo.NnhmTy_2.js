import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=12,n=360/t,r={amber:1,teal:5,violet:9},i=`amber`,a=78,o=78,s=(e,t)=>{let n=(t-90)*Math.PI/180;return`${(a+e*Math.cos(n)).toFixed(2)} ${(o+e*Math.sin(n)).toFixed(2)}`},c=(e,t,n,r)=>`M${s(t,n)} A${t} ${t} 0 0 1 ${s(t,r)} L${s(e,r)} A${e} ${e} 0 0 0 ${s(e,n)} Z`,l=(e,t=.68,n=.14)=>`oklch(${t} ${n} ${e})`,u=e=>[0,1,2].map(r=>(e+r)%t*n);function d(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${i}" data-axis="Set" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">Teal</button>
            <button class="sp-segment" data-part="seg-violet" value="violet">Violet</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <svg viewBox="0 0 156 156" style="flex: 0 0 auto; display: block; width: 152px; height: 152px" aria-hidden="true">
            <g class="sp-context">${Array.from({length:t},(e,t)=>`<path data-part="wheel-step" d="${c(40,62,t*n+1.2,(t+1)*n-1.2)}" fill="${l(t*n)}" opacity="0.34"></path>`).join(``)}</g>
            <g data-part="set" data-subject data-set="${i}">${[0,1,2].map(e=>`<path data-part="lifted-${e}" d="" fill="#000000"></path>`).join(``)}</g>
            <text data-part="span-label" x="78" y="82" text-anchor="middle"
                  style="font-size: 11px; font-weight: 600; fill: var(--sp-ink)">60&#176;</text>
          </svg>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <div data-part="poster" style="height: 118px; padding: 12px; border-radius: var(--sp-radius); overflow: hidden;
                 background: var(--an-1)">
              <span style="display: block; width: 46px; height: 46px; border-radius: 50%; background: var(--an-2)"></span>
              <span style="display: block; width: 82%; height: 9px; margin-top: 12px; border-radius: 999px; background: var(--an-3)"></span>
              <span style="display: block; width: 54%; height: 9px; margin-top: 6px; border-radius: 999px; background: var(--an-3); opacity: 0.55"></span>
              <span style="display: block; width: 34%; height: 6px; margin-top: 10px; border-radius: 999px; background: #23262b"></span>
            </div>
            <span class="sp-text" data-part="angles" style="font-size: 11px">30, 60, 90</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`set`),s=e(a,`poster`),d=e(a,`angles`),f=i=>{let f=r[i];if(f===void 0)return;o.dataset.set=i;let p=u(f);p.forEach((r,i)=>{let o=(f+i)%t,s=e(a,`lifted-${i}`);s.setAttribute(`d`,c(38,72,o*n+1.2,(o+1)*n-1.2)),s.setAttribute(`fill`,l(r))}),s.style.setProperty(`--an-1`,l(p[0]??0,.93,.045)),s.style.setProperty(`--an-2`,l(p[1]??0,.66,.15)),s.style.setProperty(`--an-3`,l(p[2]??0,.44,.12)),d.textContent=p.map(e=>`${Math.round(e)}`).join(`, `)};f(i),e(a,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{d as mount};