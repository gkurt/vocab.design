import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";var r=254,i=[{l:.95,c:.02,from:0,to:3,label:`0 to 3`},{l:.86,c:.05,from:4,to:7,label:`4 to 7`},{l:.74,c:.09,from:8,to:11,label:`8 to 11`},{l:.6,c:.13,from:12,to:15,label:`12 to 15`},{l:.45,c:.13,from:16,to:99,label:`16 up`}],a=[[2,5,9,14,18,11,4],[3,8,13,19,21,15,6],[1,6,12,17,16,9,3],[0,4,7,11,10,5,2]],o=4,s=e=>{let t=i[e];return t?`oklch(${t.l} ${t.c} ${r})`:`transparent`},c=e=>i.findIndex(t=>e>=t.from&&e<=t.to),l=`inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)`;function u(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Orders per hour</span>
          <span class="sp-text" style="font-size: 11px">Mon to Sun</span>
        </div>

        <div class="sp-surface" data-part="plot" data-subject data-bin="${o}"
             style="margin-top: 10px; padding: 12px; display: flex; gap: 14px; align-items: flex-start">
          <div class="sp-grid" data-part="grid" style="grid-template-columns: repeat(7, 26px); gap: 4px">${a.flatMap((e,t)=>e.map((e,n)=>`
        <span class="sp-swatch" data-part="cell" data-bin="${c(e)}" data-at="${n}-${t}"
              style="width: 26px; height: 26px; border-radius: 4px; --sp-swatch: ${s(c(e))}"></span>`)).join(``)}</div>
          <div class="sp-stack sp-grow" data-part="ramp" style="gap: 2px">${i.map((e,t)=>`
      <button class="sp-button sp-button--quiet" data-part="stop-${t}"
              style="display: flex; align-items: center; gap: 8px; width: 100%; padding: 3px 6px; font-size: 11px; font-weight: 500">
        <span class="sp-swatch" style="flex: 0 0 auto; width: 14px; height: 14px;
              box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.14); --sp-swatch: ${s(t)}"></span>
        <span>${e.label}</span>
      </button>`).join(``)}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; height: 18px">
          <span class="sp-label">Step</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-bin="${o}" style="font-size: 12px"></span>
        </div>
      </div>
    </div>
  `;let u=e(r,`plot`),d=e(r,`readout`),f=t(r,`cell`),p=i.map((t,n)=>e(r,`stop-${n}`)),m=e=>{let t=i[e];if(!t)return;u.dataset.bin=String(e);let r=0;for(let t of f){let n=t.dataset.bin===String(e);n&&(r+=1),t.style.boxShadow=n?l:``}p.forEach((t,r)=>{let i=r===e;n(t,`data-selected`,i),t.style.boxShadow=i?`inset 0 0 0 1px var(--sp-ink)`:``}),d.dataset.bin=String(e),d.textContent=`${t.label} orders · ${r} cells · L ${t.l.toFixed(2)}`};m(o),p.forEach((e,t)=>{e.addEventListener(`click`,()=>m(t))})}export{u as mount};