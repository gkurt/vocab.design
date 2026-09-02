import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:420,h:190},i={w:156,h:44},a={x:r.w/2,y:95},o=84,s=.3,c=22,l=(e,t,n)=>`
  <span data-part="${e}" aria-hidden="true" style="position: absolute; left: ${t}px; top: ${n}px; width: 1px; height: 1px; pointer-events: none"></span>`;function u(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour Studio</span>
          <span class="sp-text" data-part="readout" data-pull="off" style="width: 190px; text-align: right; white-space: nowrap">At rest</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="field"
            data-hover-driven
            style="position: relative; width: ${r.w}px; height: ${r.h}px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden; touch-action: none"
          >
            <span
              class="sp-context"
              data-part="radius"
              style="position: absolute; left: ${a.x-o}px; top: ${a.y-o}px; width: 168px; height: 168px;
                     border: 2px dashed var(--sp-line); border-radius: 50%; pointer-events: none"
            ></span>
            <button
              class="sp-button"
              type="button"
              data-part="button"
              data-subject
              data-pull="off"
              style="position: absolute; left: ${a.x-i.w/2}px; top: ${a.y-i.h/2}px; width: ${i.w}px;
                     height: ${i.h}px; transform: translate(0px, 0px); transition: transform 0.34s var(--sp-ease)"
            >Start a project</button>
            ${l(`far`,36,30)}
            ${l(`near`,152,60)}
          </div>
        </div>
      </div>
    </div>
  `;let d=e(u,`field`),f=e(u,`button`),p=e(u,`readout`),m=n(u),h=(e,t,n,r)=>{m||(f.style.transform=`translate(${e.toFixed(1)}px, ${t.toFixed(1)}px)`);let i=n?`on`:`off`;f.dataset.pull=i,p.dataset.pull=i,p.textContent=n?`Leaning ${Math.round(Math.hypot(e,t))}px toward the pointer`:`At rest, pointer ${Math.round(r)}px away`};d.addEventListener(`pointermove`,e=>{let n=t(e,d),r=n.x-a.x,i=n.y-a.y,l=Math.hypot(r,i);if(l>o)return h(0,0,!1,l);let u=Math.min(s,c/Math.max(l,1));h(r*u,i*u,!0,l)}),d.addEventListener(`pointerleave`,()=>h(0,0,!1,168))}export{u as mount};