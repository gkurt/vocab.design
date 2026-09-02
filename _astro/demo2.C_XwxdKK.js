import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,r as n}from"./measure.DK7AY2_i.js";import{t as r}from"./motion.B5_YXmsy.js";var i=520;function a(a,o){let s=(e,t)=>`<span data-part="spot-${e}" aria-hidden="true" style="position: absolute; top: 50%; left: ${t}; width: 1px; height: 1px"></span>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 336px">
        <span class="sp-heading sp-context">Sea Birds of the North Atlantic</span>
        <button
          class="sp-button"
          type="button"
          data-part="surface"
          data-subject
          style="position: relative; overflow: hidden; width: 100%; height: 46px; margin-top: 12px; font-size: 14px"
        >
          <span style="position: relative">Add to library</span>
          ${s(`left`,`22%`)}
          ${s(`right`,`78%`)}
        </button>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; min-height: 20px">
          <span class="sp-label">Origin</span>
          <span class="sp-label" data-part="readout" data-origin="none">no press yet</span>
        </div>
      </div>
    </div>
  `;let c=e(a,`surface`),l=e(a,`readout`),u,d=e=>{e.remove(),c.removeAttribute(`data-rippling`)};c.addEventListener(`pointerdown`,e=>{let s=t(c),{x:f,y:p}=n(e,c),m=Math.max(Math.hypot(f,p),Math.hypot(s.width-f,p),Math.hypot(f,s.height-p),Math.hypot(s.width-f,s.height-p)),h=r(a);o.clearTimeout(u);for(let e of[...c.querySelectorAll(`[data-ink]`)])e.remove();let g=document.createElement(`span`);g.dataset.ink=``,g.setAttribute(`aria-hidden`,`true`),g.style.cssText=h?`position: absolute; inset: 0; background: currentcolor; opacity: 0.16; pointer-events: none`:`position: absolute; left: ${f-m}px; top: ${p-m}px; width: ${m*2}px; height: ${m*2}px;
         border-radius: 50%; background: currentcolor; pointer-events: none; transform: scale(0); opacity: 0.38`,c.append(g),c.setAttribute(`data-rippling`,``),l.dataset.origin=f<s.width/2?`left`:`right`,l.textContent=`${Math.round(f)}px, ${Math.round(p)}px from the top left`,h||g.animate([{transform:`scale(0)`,opacity:.38},{transform:`scale(1)`,opacity:0}],{duration:i,easing:`cubic-bezier(0.2, 0.6, 0.3, 1)`,fill:`forwards`}),u=o.setTimeout(()=>d(g),580)})}export{a as mount};