import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:200,h:186},i={x:r.w/2,y:r.h/2},a={r:78,size:26},o={r:50,size:18},s={slow:{outer:11e3,inner:8200,note:`Slow: one turn every 11 seconds.`},steady:{outer:7e3,inner:5200,note:`Steady: one turn every 7 seconds.`},quick:{outer:3800,inner:2800,note:`Quick: one turn every 3.8 seconds, and already too eager.`}},c={outer:-34,inner:128},l=(e,t)=>`
  <span
    class="sp-context"
    data-part="${t}"
    style="position: absolute; left: ${i.x-e}px; top: ${i.y-e}px; width: ${e*2}px; height: ${e*2}px;
           border: 2px solid var(--sp-line); border-radius: 50%"
  ></span>`;function u(u){u.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: 380px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sync</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="speed" data-value="steady" data-axis="Speed">
            <button class="sp-segment" type="button" data-part="seg-slow" value="slow">Slow</button>
            <button class="sp-segment" type="button" data-part="seg-steady" value="steady">Steady</button>
            <button class="sp-segment" type="button" data-part="seg-quick" value="quick">Quick</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div data-part="scene" style="position: relative; width: ${r.w}px; height: ${r.h}px">
            ${l(a.r,`path-outer`)}
            ${l(o.r,`path-inner`)}

            <span
              class="sp-context"
              data-part="hub"
              style="position: absolute; left: ${i.x-28}px; top: ${i.y-28}px; width: 56px; height: 56px;
                     display: flex; align-items: center; justify-content: center; border-radius: 16px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); color: var(--sp-ink);
                     box-shadow: var(--sp-shadow)"
            >${t(`inbox`)}</span>

            <span
              data-part="arm-inner"
              style="position: absolute; left: ${i.x-o.r}px; top: ${i.y-o.r}px;
                     width: ${o.r*2}px; height: ${o.r*2}px; pointer-events: none"
            >
              <span
                class="sp-context"
                data-part="moon"
                style="position: absolute; left: ${o.r-o.size/2}px; top: ${-o.size/2}px;
                       width: ${o.size}px; height: ${o.size}px; display: flex; align-items: center;
                       justify-content: center; border-radius: 50%; background: var(--sp-accent);
                       color: var(--sp-accent-ink)"
              >${t(`star`)}</span>
            </span>

            <span
              data-part="arm-outer"
              style="position: absolute; left: ${i.x-a.r}px; top: ${i.y-a.r}px;
                     width: ${a.r*2}px; height: ${a.r*2}px; pointer-events: none"
            >
              <span
                data-part="satellite"
                data-subject
                data-speed="steady"
                style="position: absolute; left: ${a.r-a.size/2}px; top: ${-a.size/2}px;
                       width: ${a.size}px; height: ${a.size}px; display: flex; align-items: center;
                       justify-content: center; border-radius: 50%; background: var(--sp-accent);
                       color: var(--sp-accent-ink); box-shadow: var(--sp-shadow)"
              >${t(`bell`)}</span>
            </span>
          </div>
        </div>
      </div>

              <span data-stage-verdict data-part="note">${s.steady?.note}</span>
      
    </div>
  `;let d=e(u,`note`),f=e(u,`satellite`),p=n(u),m=[{arm:e(u,`arm-outer`),rider:f,rest:c.outer,key:`outer`},{arm:e(u,`arm-inner`),rider:e(u,`moon`),rest:c.inner,key:`inner`}],h=e=>{let t=s[e];if(t){d.textContent=t.note,f.dataset.speed=e;for(let e of m){for(let t of[e.arm,e.rider])for(let e of t.getAnimations())e.cancel();if(p){e.arm.style.transform=`rotate(${e.rest}deg)`,e.rider.style.transform=`rotate(${-e.rest}deg)`;continue}e.arm.style.transform=`none`,e.rider.style.transform=`none`;let n=t[e.key],r={duration:n,iterations:1/0,easing:`linear`},i=e.arm.animate([{transform:`rotate(0deg)`},{transform:`rotate(360deg)`}],r),a=e.rider.animate([{transform:`rotate(0deg)`},{transform:`rotate(-360deg)`}],r),o=(e.rest%360+360)%360/360*n;i.currentTime=o,a.currentTime=o}}};e(u,`speed`).addEventListener(`change`,e=>h(e.detail)),h(`steady`)}export{u as mount};