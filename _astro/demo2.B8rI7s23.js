import{n as e,r as t}from"./parts.C-YLuC7Q.js";import{t as n}from"./motion.B5_YXmsy.js";var r=`#63e7ff`,i=`rgb(99 231 255 / 0.32)`,a=`'Courier New', ui-monospace, monospace`,o=`repeating-linear-gradient(0deg, rgb(99 231 255 / 0.07) 0 1px, transparent 1px 14px), repeating-linear-gradient(90deg, rgb(99 231 255 / 0.07) 0 1px, transparent 1px 14px)`,s=[`0x7C1D`,`0xA34B`,`0x0F92`,`0xD6E8`,`0x38B5`,`0xC94F`,`0x51A0`],c=[`0x4F2A`,`0x91C7`,`0xB03E`,`0x2D55`,`0xE7A1`],l=7,u=90,d={idle:[`118`,`132`],locked:[`41`,`68`]},f={idle:`-40px 20px`,locked:`0 0`};function p(p,m){let h=(e,t)=>`
    <svg data-part="${e}" viewBox="0 0 60 60" aria-hidden="true" style="width: 52px; height: 52px">
      <circle cx="30" cy="30" r="24" fill="none" stroke="${i}" stroke-width="1"/>
      <circle cx="30" cy="30" r="17" fill="none" stroke="${i}" stroke-width="1" stroke-dasharray="2 5"/>
      <circle data-part="arc" cx="30" cy="30" r="24" fill="none" stroke="${r}" stroke-width="3" stroke-linecap="round"
              stroke-dasharray="150.8" stroke-dashoffset="${t}" transform="rotate(-90 30 30)"
              style="transition: stroke-dashoffset 0.6s cubic-bezier(0.3, 0.9, 0.3, 1)"/>
    </svg>`,g=c.map((e,t)=>`<div data-part="hex-row" style="font-family: ${a}; font-size: 9px; line-height: 1.5; color: ${r}">${s[t]??``}</div>`).join(``),_=[6,11,4,15,9,18,7,13,5,16,10,8,14,6,12,9,17,5].map(e=>`<span style="width: 2px; height: ${e}px; background: ${r}; opacity: 0.7"></span>`).join(``);p.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="screen" data-subject data-state="idle"
           style="position: relative; width: 268px; padding: 10px; overflow: hidden; background-color: #05080e;
                  background-image: ${o}; border: 1px solid rgb(99 231 255 / 0.28); color: ${r}">

        <div data-part="header" class="sp-row sp-row--between"
             style="font-family: ${a}; font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase">
          <span>ORB-7 // telemetry</span>
          <span style="opacity: 0.6">sector 4F</span>
        </div>

        <div class="sp-row" style="gap: 8px; margin-top: 8px; align-items: stretch">
          <div class="sp-stack" style="gap: 4px; flex: 0 0 auto">
            ${h(`gauge-a`,d.idle[0]??`118`)}
            ${h(`gauge-b`,d.idle[1]??`132`)}
          </div>

          <div data-part="field"
               style="position: relative; flex: 1 1 auto; overflow: hidden; border: 1px solid ${i}; background: rgb(99 231 255 / 0.04)">
            <span data-part="target" aria-hidden="true"
                  style="position: absolute; left: 62px; top: 48px; width: 5px; height: 5px; border-radius: 50%; background: #ff5ea8"></span>
            <span data-part="reticle" aria-hidden="true"
                  style="position: absolute; left: 50px; top: 36px; width: 29px; height: 29px; border: 1px solid ${r};
                         border-radius: 50%; translate: ${f.idle};
                         transition: translate 0.6s cubic-bezier(0.3, 0.9, 0.3, 1)">
              <span style="position: absolute; left: 50%; top: -5px; bottom: -5px; width: 1px; background: ${r}; opacity: 0.8"></span>
              <span style="position: absolute; top: 50%; left: -5px; right: -5px; height: 1px; background: ${r}; opacity: 0.8"></span>
            </span>
          </div>

          <div data-part="hex" style="flex: 0 0 54px">${g}</div>
        </div>

        <div class="sp-row sp-row--between" style="margin-top: 8px; align-items: flex-end">
          <div class="sp-row" style="gap: 2px; align-items: flex-end">${_}</div>
          <span data-part="lock"
                style="padding: 1px 6px; border: 1px solid #ff5ea8; color: #ff5ea8; font-family: ${a}; font-size: 8.5px;
                       letter-spacing: 0.16em; opacity: 0; transition: opacity 0.2s linear">LOCK</span>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 6px">
        <button class="sp-button sp-button--sm" data-part="scan" type="button">Scan</button>
      </div>
    </div>
  `;let v=e(p,`screen`),y=e(p,`reticle`),b=e(p,`lock`),x=t(p,`arc`),S=t(p,`hex-row`),C=[],w=e=>{x.forEach((t,n)=>{t.setAttribute(`stroke-dashoffset`,e[n]??`0`)})},T=e=>{S.forEach((t,n)=>{t.textContent=e===void 0?c[n]??``:s[(n+e)%s.length]??``})},E=()=>{v.dataset.state=`locked`,w(d.locked),T(void 0),y.style.translate=f.locked,b.style.opacity=`1`};e(p,`scan`).addEventListener(`click`,()=>{for(let e of C)m.clearTimeout(e);if(C=[],n(p)){E();return}v.dataset.state=`scanning`,b.style.opacity=`0`,w(d.idle),y.style.translate=f.idle,C=Array.from({length:l},(e,t)=>m.setTimeout(()=>T(t),t*u)),C.push(m.setTimeout(E,630))})}export{p as mount};