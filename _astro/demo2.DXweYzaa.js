import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:434,h:186},r={w:178,h:112,top:46},i={w:74,h:26,top:8},a=340,o=200,s={a:{trigger:8,panel:8,origin:`0% 0%`,dot:[`0%`,`0%`]},b:{trigger:180,panel:180+i.w/2-r.w/2,origin:`50% 0%`,dot:[`50%`,`0%`]},c:{trigger:n.w-8-i.w,panel:n.w-8-r.w,origin:`100% 0%`,dot:[`100%`,`0%`]}},c={origin:`50% 50%`,dot:[`50%`,`50%`]},l=(e,t)=>`
  <button
    class="sp-button sp-button--sm" type="button" data-part="trig-${e}"
    style="position: absolute; left: ${s[e].trigger}px; top: ${i.top}px;
           width: ${i.w}px; height: ${i.h}px; justify-content: center"
  >${t}</button>`;function u(i,u){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="open" data-anchor="a" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Origin</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="trigger" data-axis="Grows from" data-term="trigger">
            <button class="sp-segment" type="button" data-part="seg-trigger" value="trigger">Trigger</button>
            <button class="sp-segment" type="button" data-part="seg-centre" value="centre">Centre</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div data-part="canvas" style="position: relative; width: ${n.w}px; height: ${n.h}px">
            <div class="sp-context">
              ${l(`a`,`Share`)}${l(`b`,`Sort`)}${l(`c`,`More`)}
            </div>

            <div
              class="sp-surface" data-part="panel" data-subject data-pose="[data-origin=trigger]" data-origin="trigger"
              style="position: absolute; left: ${s.a.panel}px; top: ${r.top}px; width: ${r.w}px;
                     height: ${r.h}px; padding: 12px; box-shadow: var(--sp-shadow); transform-origin: ${s.a.origin};
                     visibility: hidden; opacity: 0; display: flex; flex-direction: column; gap: 8px"
            >
              <span class="sp-heading" style="font-size: 13px">Share with</span>
              <span class="sp-line" style="width: 116px"></span>
              <span class="sp-line" style="width: 84px"></span>
              <button
                class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="close"
                style="margin-top: auto; align-self: flex-start"
              >Close</button>
              <span
                data-part="origin" aria-hidden="true"
                style="position: absolute; left: ${s.a.dot[0]}; top: ${s.a.dot[1]}; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px;
                       border-radius: 50%; background: var(--sp-accent)"
              ></span>
            </div>

            <span
              class="sp-label sp-context" data-part="readout"
              style="position: absolute; left: 8px; bottom: 0; font-size: 11px"
            >transform-origin: ${s.a.origin}</span>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(i,`scene`),f=e(i,`panel`),p=e(i,`origin`),m=e(i,`readout`),h=t(i),g=`a`,_=!1,v,y,b=()=>{let e=s[g],t=_?c.origin:e.origin,[n,r]=_?c.dot:e.dot;f.style.left=`${e.panel}px`,f.style.transformOrigin=t,f.dataset.origin=_?`centre`:`trigger`,p.style.left=n,p.style.top=r,m.textContent=`transform-origin: ${t}`},x=()=>{v?.cancel(),v=void 0,f.style.visibility=`visible`,f.style.opacity=`1`,f.style.transform=`none`,d.dataset.state=`open`},S=()=>{v?.cancel(),v=void 0,f.style.visibility=`hidden`,f.style.opacity=`0`,f.style.transform=`scale(0.2)`,d.dataset.state=`shut`},C=e=>{if(u.clearTimeout(y),v?.cancel(),g=e,d.dataset.anchor=e,b(),h)return x();f.style.visibility=`visible`,f.style.opacity=`1`,d.dataset.state=`opening`,v=f.animate([{transform:`scale(0.2)`,opacity:0},{transform:`scale(1)`,opacity:1}],{duration:a,easing:`cubic-bezier(0.3, 0.9, 0.3, 1)`,fill:`forwards`}),y=u.setTimeout(x,400)},w=()=>{if(u.clearTimeout(y),v?.cancel(),h)return S();d.dataset.state=`shutting`,v=f.animate([{transform:`scale(1)`,opacity:1},{transform:`scale(0.2)`,opacity:0}],{duration:o,easing:`ease-in`,fill:`forwards`}),y=u.setTimeout(S,240)};for(let t of[`a`,`b`,`c`])e(i,`trig-${t}`).addEventListener(`click`,()=>C(t));e(i,`close`).addEventListener(`click`,w),e(i,`mode`).addEventListener(`change`,e=>{_=e.detail===`centre`,C(g)}),C(`a`)}export{u as mount};