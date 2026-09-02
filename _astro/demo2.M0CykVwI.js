import{n as e}from"./parts.C-YLuC7Q.js";var t=116,n=12,r=128,i=[{title:`Continue watching`,items:[`Long Field`,`Harbour`,`Nine Bridges`,`Salt Road`,`Winter Ferry`]},{title:`New this week`,items:[`Cold Harvest`,`Signal Hill`,`Marlow`,`Two Rivers`,`Blue Ridge`]}],a=(e,n,r)=>`
  <div
    data-part="card-${e}-${n}"
    ${e===0&&n===0?`data-focused`:``}
    style="flex: 0 0 auto; width: ${t}px; border-radius: 8px; background: var(--sp-surface); overflow: hidden;
           outline: 3px solid transparent; outline-offset: 3px; transition: outline-color 0.16s var(--sp-ease)"
  >
    <span style="display: block; height: 50px; background: var(--sp-line)"></span>
    <span style="display: block; padding: 4px 8px; font-size: 13px; font-weight: 500; white-space: nowrap;
                 overflow: hidden; text-overflow: ellipsis">${r}</span>
  </div>`,o=(e,{title:t,items:r})=>`
  <div style="display: flex; flex-direction: column; gap: 6px">
    <span style="font-size: 17px; font-weight: 600">${t}</span>
    <div style="overflow: hidden; padding: 6px 0; margin: -6px 0">
      <div
        data-part="rail-${e}"
        style="display: flex; gap: ${n}px; padding-left: 6px; transform: translateX(0);
               transition: transform 0.26s var(--sp-ease)"
      >${r.map((t,n)=>a(e,n,t)).join(``)}</div>
    </div>
  </div>`;function s(t){t.innerHTML=`
    <div class="sp-app" data-subject>
      <div
        class="sp-frame sp-frame--wide"
        data-part="screen"
        tabindex="0"
        role="application"
        aria-label="Television home screen"
        style="height: 280px; background: var(--sp-sunken)"
      >
        <span
          data-part="safe-area"
          aria-hidden="true"
          style="position: absolute; inset: 18px; border: 2px dashed var(--sp-line); border-radius: 6px; pointer-events: none"
        ></span>
        <span style="position: absolute; top: 22px; right: 24px; font-size: 10px; color: var(--sp-muted)">title-safe margin</span>
        <div style="position: absolute; inset: 18px; display: flex; flex-direction: column; gap: 12px; padding: 16px 14px 0">
          ${i.map((e,t)=>o(t,e)).join(``)}
        </div>
      </div>
    </div>
  `;let n=i.map((n,r)=>n.items.map((n,i)=>e(t,`card-${r}-${i}`))),a=i.map((n,r)=>e(t,`rail-${r}`)),s=0,c=0,l=()=>{for(let[e,t]of n.entries())for(let[n,r]of t.entries()){let t=e===s&&n===c;r.style.outlineColor=t?`var(--sp-accent)`:`transparent`,t?r.setAttribute(`data-focused`,``):r.removeAttribute(`data-focused`)}for(let[e,t]of a.entries()){let n=e===s?Math.max(0,c-2):0;t.style.transform=`translateX(${-n*r}px)`}},u={ArrowRight:[0,1],ArrowLeft:[0,-1],ArrowDown:[1,0],ArrowUp:[-1,0]};e(t,`screen`).addEventListener(`keydown`,e=>{let t=u[e.key];t&&(e.preventDefault(),s=Math.min(Math.max(s+t[0],0),n.length-1),c=Math.min(Math.max(c+t[1],0),(n[s]?.length??1)-1),l())}),l()}export{s as mount};