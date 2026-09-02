import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=[312,268,214,168,122,58,22,336],r=`#1b1f27`,i=[`linear-gradient(158deg,`,`rgb(255 255 255 / 0.6) 0%,`,`rgb(255 255 255 / 0.04) 26%,`,`rgb(255 255 255 / 0.44) 52%,`,`rgb(255 255 255 / 0.02) 74%,`,`rgb(18 22 32 / 0.24) 100%)`].join(` `),a=20,o=.25,s=4,c=3;function l(e,t){let r=n.length*c,i=[];for(let e=0;e<=r;e++){let a=n[e%n.length];i.push(`hsl(${a} 92% 62% / ${t}) ${(e/r*100).toFixed(2)}%`)}return`linear-gradient(${e}deg, ${i.join(`, `)})`}function u(){let e=n.length*c,t=[];for(let r=0;r<e;r++){let i=(r/e*100).toFixed(2),a=((r+1)/e*100).toFixed(2);t.push(`hsl(${n[r%n.length]} 90% 62%) ${i}% ${a}%`)}return`linear-gradient(90deg, ${t.join(`, `)})`}var d=`
  <svg viewBox="0 0 190 118" width="190" height="118" role="presentation"
       style="position: absolute; inset: 0; display: block; opacity: 0.3; mix-blend-mode: soft-light">
    <g fill="none" stroke="#ffffff" stroke-width="1.8">
      <path d="M-20 122a92 92 0 0 1 92-92"/>
      <path d="M-8 122a80 80 0 0 1 80-80"/>
      <path d="M4 122a68 68 0 0 1 68-68"/>
      <path d="M16 122a56 56 0 0 1 56-56"/>
    </g>
  </svg>`;function f(n){n.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">One surface, any angle</span>

        <div data-part="stage"
             style="position: relative; display: flex; align-items: center; justify-content: center; height: 168px;
                    border-radius: 8px; background: ${r}; perspective: 700px; touch-action: none; user-select: none">
          <div data-part="card" data-subject data-tilt="rest"
               style="position: relative; width: 190px; height: 118px; overflow: hidden; border-radius: 8px;
                      cursor: grab; transform: rotateX(0deg) rotateY(0deg);
                      background-image: ${i}, ${l(24,.62)}, ${l(118,1)};
                      background-size: 100% 100%, 300% 100%, 300% 100%;
                      background-position: 0% 0%, 50% 0%, 50% 0%;
                      background-blend-mode: normal, soft-light, normal;
                      transition: transform 0.15s ease-out, background-position 0.15s ease-out;
                      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.45), 0 4px 12px rgb(0 0 0 / 0.45)">
            ${d}
            <span aria-hidden="true"
                  style="position: absolute; left: 14px; top: 16px; width: 30px; height: 22px; border-radius: 4px;
                         background: linear-gradient(140deg, #f0d78d, #a9821f)"></span>
            <span aria-hidden="true"
                  style="position: absolute; left: 14px; bottom: 15px; width: 96px; height: 6px; border-radius: 3px;
                         background: rgb(28 24 34 / 0.5)"></span>
            <span aria-hidden="true"
                  style="position: absolute; left: 14px; bottom: 29px; width: 60px; height: 6px; border-radius: 3px;
                         background: rgb(28 24 34 / 0.34)"></span>
          </div>
          <span data-part="grip-left" style="position: absolute; left: 8px; top: 50%; width: 1px; height: 1px"></span>
          <span data-part="grip-right" style="position: absolute; right: 8px; top: 50%; width: 1px; height: 1px"></span>
        </div>

        <div class="sp-row" style="gap: 10px; align-items: center; margin-top: 10px">
          <div data-part="strip" aria-hidden="true"
               style="flex: 1 1 auto; height: 12px; border-radius: 3px;
                      background-image: ${u()}; background-size: 300% 100%; background-position: 50% 0;
                      transition: background-position 0.15s ease-out"></div>
          <span class="sp-text" data-part="angle" style="width: 118px; margin: 0; font-size: 11px; text-align: right">Head on</span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Drag the card. The spectral order slides with the angle, it never scrambles.
      </p>
    </div>
  `;let c=e(n,`card`),f=e(n,`strip`),p=e(n,`angle`),m=0,h=0,g=()=>{c.style.transform=`rotateX(${m.toFixed(1)}deg) rotateY(${h.toFixed(1)}deg)`;let e=50+h*.9+m*.35,t=50+h*1.4-m*.5;c.style.backgroundPosition=`0% 0%, ${t.toFixed(2)}% 0%, ${e.toFixed(2)}% 0%`,f.style.backgroundPosition=`${e.toFixed(2)}% 0`,c.dataset.tilt=Math.abs(h)<=s?`rest`:h>0?`right`:`left`,p.textContent=Math.abs(h)<=s&&Math.abs(m)<=s?`Head on`:`Tipped ${Math.abs(Math.round(h))}° ${h>0?`right`:`left`}`},_=e=>Math.min(a,Math.max(-20,e)),v=null,y={x:0,y:0,rx:0,ry:0};c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),v=e.pointerId,y={...t(e,n),rx:m,ry:h},c.style.cursor=`grabbing`}),c.addEventListener(`pointermove`,e=>{if(v!==e.pointerId)return;let r=t(e,n);h=_(y.ry+(r.x-y.x)*o),m=_(y.rx-(r.y-y.y)*o),g()});let b=e=>{v===e.pointerId&&(v=null,c.style.cursor=`grab`)};c.addEventListener(`pointerup`,b),c.addEventListener(`pointercancel`,b)}export{f as mount};