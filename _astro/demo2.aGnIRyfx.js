import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:396,h:92},r=40,i=14,a=n.w-r-28,o=520,s=e=>`
  <span
    data-part="tail-${e}"
    style="position: absolute; top: 0; bottom: 0; left: -62px; width: 82px; border-radius: 9px;
           background: linear-gradient(to right, transparent, var(--sp-accent)); filter: blur(4px); opacity: 0"
  ></span>
  <span
    data-part="head-${e}"
    style="position: absolute; inset: 0; border-radius: 9px; background: var(--sp-accent)"
  ></span>`;function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="rested" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Speed</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="on" data-axis="Blur" data-term="on">
            <button class="sp-segment" type="button" data-part="seg-off" value="off">Off</button>
            <button class="sp-segment" type="button" data-part="seg-on" value="on">Blurred</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div
            data-part="lane"
            style="position: relative; width: ${n.w}px; height: ${n.h}px; border-radius: 8px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line)"
          >
            <span
              aria-hidden="true"
              style="position: absolute; left: ${i}px; right: ${i}px; top: 50%; height: 2px; margin-top: -1px;
                     background: var(--sp-line)"
            ></span>
            <div
              data-part="box"
              data-subject
              data-blur="on"
              data-pose="[data-blur=on]"
              style="position: absolute; left: ${i}px; top: ${(n.h-r)/2}px; width: ${r}px; height: ${r}px;
                     transform: translateX(0); will-change: transform"
            >${s(`live`)}</div>
          </div>

          <div
            class="sp-context"
            data-part="still"
            data-blur="on"
            style="display: flex; align-items: center; gap: 12px; width: ${n.w}px; padding: 8px 12px;
                   border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
          >
            <span style="position: relative; flex: 0 0 auto; width: 102px; height: ${r}px">
              <span style="position: absolute; right: 0; top: 0; width: ${r}px; height: ${r}px">${s(`still`)}</span>
            </span>
            <span class="sp-stack" style="gap: 2px; min-width: 0">
              <span class="sp-label" style="font-size: 11px">Single frame</span>
              <span class="sp-text sp-text--ink" data-stage-verdict data-part="verdict" style="font-size: 12px; white-space: nowrap">Smeared along its direction of travel</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(c,`scene`),d=e(c,`box`),f=e(c,`still`),p=e(c,`verdict`),m=e(c,`tail-live`),h=e(c,`head-live`),g=e(c,`tail-still`),_=e(c,`head-still`),v=t(c),y=!0,b,x,S,C=(e,t)=>{e.style.left=t===1?`-62px`:`${r/2}px`,e.style.background=`linear-gradient(to ${t===1?`right`:`left`}, transparent, var(--sp-accent))`},w=e=>{let t=y&&e;m.style.opacity=t?`1`:`0`,h.style.filter=t?`blur(1.6px)`:`none`},T=e=>{y=e!==`off`,d.dataset.blur=y?`on`:`off`,f.dataset.blur=y?`on`:`off`,g.style.opacity=y?`1`:`0`,_.style.filter=y?`blur(1.6px)`:`none`,p.textContent=y?`Smeared along its direction of travel`:`Sharp, so the move reads as a jump`,w(u.dataset.state===`crossing`)},E=(e,t,n)=>{C(m,n),w(!0),b?.cancel(),b=d.animate([{transform:`translateX(${e}px)`},{transform:`translateX(${t}px)`}],{duration:o,easing:`cubic-bezier(0.35, 0, 0.25, 1)`,fill:`forwards`})},D=()=>{if(l.clearTimeout(x),l.clearTimeout(S),v){b?.cancel(),d.style.transform=`translateX(${a}px)`,u.dataset.state=`rested`,w(!1);return}u.dataset.state=`crossing`,E(0,a,1),x=l.setTimeout(()=>E(a,0,-1),760),S=l.setTimeout(()=>{u.dataset.state=`rested`,w(!1)},1320)};e(c,`mode`).addEventListener(`change`,e=>T(e.detail)),e(c,`replay`).addEventListener(`click`,D),C(g,1),T(`on`),D()}export{c as mount};