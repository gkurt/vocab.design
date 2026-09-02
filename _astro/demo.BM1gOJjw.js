import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:420,h:190},i={w:232,h:150},a={x:r.w/2,y:r.h/2},o=8,s=(e,t,n)=>`
  <span data-part="${e}" aria-hidden="true" style="position: absolute; left: ${t}px; top: ${n}px; width: 1px; height: 1px; pointer-events: none"></span>`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Now playing</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="field"
            data-hover-driven
            style="position: relative; width: ${r.w}px; height: ${r.h}px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: 6px; perspective: 800px; touch-action: none"
          >
            <div
              data-part="card"
              data-subject
              data-tilt="flat"
              style="position: absolute; left: ${a.x-i.w/2}px; top: ${a.y-i.h/2}px; width: ${i.w}px; height: ${i.h}px;
                     border-radius: 10px; padding: 14px; overflow: hidden; background: linear-gradient(150deg, var(--sp-accent), #6f4bd8);
                     color: var(--sp-accent-ink); box-shadow: var(--sp-shadow); display: flex; flex-direction: column; justify-content: flex-end;
                     transform: rotateX(0deg) rotateY(0deg); transition: transform 0.28s var(--sp-ease)"
            >
              <span
                data-part="sheen"
                aria-hidden="true"
                style="position: absolute; inset: 0; pointer-events: none; opacity: 0;
                       background: radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0.5), transparent 62%); transition: opacity 0.28s linear"
              ></span>
              <span style="position: relative; font-size: 15px; font-weight: 600">Slipway Sessions</span>
              <span style="position: relative; font-size: 12px; opacity: 0.85">Harbour Quartet, 2021</span>
            </div>
            ${s(`top-left`,140,58)}
            ${s(`bottom-right`,280,132)}
            ${s(`centre`,a.x,a.y)}
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`field`),u=e(c,`card`),d=e(c,`sheen`),f=n(c),p=e=>Math.min(Math.max(e,-1),1);l.addEventListener(`pointermove`,e=>{let n=t(e,l),r=p((n.x-a.x)/(i.w/2)),s=p((n.y-a.y)/(i.h/2)),c=r*o,m=-s*o,h=r<-.2?`left`:r>.2?`right`:`centre`,g=s<-.2?`top`:s>.2?`bottom`:`middle`;u.dataset.tilt=h===`centre`&&g===`middle`?`flat`:`${g}-${h}`,!f&&(u.style.transform=`rotateX(${m.toFixed(2)}deg) rotateY(${c.toFixed(2)}deg)`,d.style.background=`radial-gradient(circle at ${(50+r*40).toFixed(0)}% ${(50+s*40).toFixed(0)}%, rgb(255 255 255 / 0.5), transparent 62%)`,d.style.opacity=`1`)}),l.addEventListener(`pointerleave`,()=>{u.dataset.tilt=`flat`,!f&&(u.style.transform=`rotateX(0deg) rotateY(0deg)`,d.style.opacity=`0`)})}export{c as mount};