import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:200,h:214},i=176,a=112,o=.5,s=300,c=e=>Math.min(Math.max(e,0),1),l=e=>e.map(e=>`<span class="sp-line" style="display: block; width: ${e}%; margin-bottom: 9px"></span>`).join(``),u=(e,t)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: 50%; top: ${t-4}px; width: 8px; height: 8px; margin-left: -4px;
           border-radius: 50%; background: var(--sp-ink); opacity: 0.5"
  ></span>`;function d(d,f){d.innerHTML=`
    <div class="sp-app">
      <div
        class="sp-frame sp-frame--wide" data-part="scene"
        data-detent="collapsed" data-outcome="none" data-partway="no" style="height: 286px"
      >
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sheet</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 14px; padding: 12px">
          <div
            data-part="screen"
            style="position: relative; flex: 0 0 auto; width: ${r.w}px; height: ${r.h}px; overflow: hidden;
                   border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-surface);
                   touch-action: none; user-select: none"
          >
            <div
              class="sp-context" data-part="behind"
              style="position: absolute; inset: 0; padding: 14px 12px; transform-origin: 50% 34%"
            >
              <span class="sp-label sp-text--ink" style="font-size: 12px">Ferry timetable</span>
              <div style="margin-top: 10px">${l([88,70,92,64])}</div>
            </div>

            <span
              data-part="dim"
              style="position: absolute; inset: 0; background: var(--sp-scrim); opacity: 0; pointer-events: none"
            ></span>

            <div
              data-part="sheet" data-subject data-state="rested"
              style="position: absolute; left: 0; right: 0; bottom: 0; height: ${i}px; padding: 12px;
                     background: var(--sp-surface); border-top: 1px solid var(--sp-line); border-radius: 14px 14px 0 0;
                     box-shadow: 0 -8px 20px rgb(16 24 40 / 0.18); transform: translateY(${a}px);
                     cursor: grab; will-change: transform"
            >
              <span
                data-part="grabber"
                style="display: block; width: 40px; height: 5px; margin: 0 auto 12px; border-radius: 999px;
                       background: var(--sp-line)"
              ></span>
              <span class="sp-label sp-text--ink" style="font-size: 12px">Departures</span>
              <div style="margin-top: 10px">${l([76,90,66])}</div>
            </div>

            <span style="position: absolute; inset: 0; z-index: 3; pointer-events: none">
              ${u(`dot-top`,58)}
              ${u(`dot-near`,78)}
              ${u(`dot-mid`,128)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; justify-content: center; gap: 7px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Transition progress</span>
            <span
              class="sp-text--ink" data-part="pct"
              style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.15"
            >0%</span>
            <span style="position: relative; height: 6px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
              <span
                data-part="fill"
                style="display: block; width: 0%; height: 100%; border-radius: 999px; background: var(--sp-accent)"
              ></span>
            </span>
            <span class="sp-text sp-text--ink" data-part="say" style="height: 18px; font-size: 12px; line-height: 18px">Collapsed</span>
          </div>
        </div>
      </div>
    </div>
  `;let p=e(d,`scene`),m=e(d,`sheet`),h=e(d,`behind`),g=e(d,`dim`),_=e(d,`pct`),v=e(d,`fill`),y=e(d,`say`),b=n(d),x=0,S=0,C,w,T=e=>{let t=Math.round(S*100);_.textContent=`${t}%`,v.style.width=`${t}%`,y.textContent=e},E=(e,t)=>{S=c(e);let n=t?`transform ${s}ms cubic-bezier(0.2, 1.4, 0.4, 1)`:`none`;m.style.transition=n,m.style.transform=`translateY(${((1-S)*a).toFixed(1)}px)`,h.style.transition=t?`transform ${s}ms var(--sp-ease)`:`none`,h.style.transform=`scale(${(1-.07*S).toFixed(3)})`,g.style.transition=t?`opacity ${s}ms ease`:`none`,g.style.opacity=(.5*S).toFixed(3)};d.addEventListener(`pointerdown`,e=>{m.contains(e.target)&&(e.isTrusted&&d.setPointerCapture(e.pointerId),f.clearTimeout(w),C=t(e,d).y,p.dataset.outcome=`scrubbing`,p.dataset.partway=`no`,m.dataset.state=`held`,E(x,!1),T(`Held`))}),d.addEventListener(`pointermove`,e=>{C!==void 0&&(E(x+(C-t(e,d).y)/a,!1),Math.abs(S-x)>.12&&(p.dataset.partway=`seen`),T(`Scrubbing`))});let D=()=>{if(C===void 0)return;C=void 0;let e=+(S>=o),t=e!==x;p.dataset.outcome=t?`completed`:`reversed`,m.dataset.state=`settling`,x=e,E(e,!b),T(t?`Completing`:`Reversing`),w=f.setTimeout(()=>{p.dataset.detent=x===1?`expanded`:`collapsed`,m.dataset.state=`rested`,T(x===1?`Expanded`:`Collapsed`)},b?0:340)};d.addEventListener(`pointerup`,D),d.addEventListener(`pointercancel`,D),E(0,!1),T(`Collapsed`)}export{d as mount};