import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";var r=214,i=r/4,a=`transform 0.28s var(--sp-ease)`,o=[{key:`harbour`,title:`Harbour`,lines:[92,74,60]},{key:`lighthouse`,title:`Lighthouse`,lines:[80,88,52]},{key:`boatyard`,title:`Boatyard`,lines:[70,94,66]}],s=(e,t,n)=>Math.min(Math.max(e,t),n);function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 250px; height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gallery</span>
          <span class="sp-label" data-part="readout">1 of 3</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="pager"
            data-subject
            data-page="1"
            style="position: relative; overflow: hidden; width: ${r}px; height: 132px; cursor: grab; touch-action: none"
          >
            <div class="sp-row" data-part="track" style="gap: 0; height: 100%; align-items: stretch; transition: ${a}">${o.map(({key:e,title:t,lines:n})=>`
      <div
        data-part="page-${e}"
        style="flex: 0 0 ${r}px; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; padding: 12px; background: var(--sp-sunken)"
      >
        <span class="sp-heading">${t}</span>
        ${n.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``)}
      </div>`).join(``)}</div>
            <span data-part="grip-left" style="position: absolute; left: 0; top: 0; bottom: 0; width: 22px"></span>
            <span data-part="grip-right" style="position: absolute; right: 0; top: 0; bottom: 0; width: 22px"></span>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">${o.map(({key:e})=>`<span data-part="dot-${e}" style="width: 6px; height: 6px; border-radius: 50%; background: var(--sp-line)"></span>`).join(``)}</div>
        </div>
      </div>
    </div>
  `;let l=e(c,`pager`),u=e(c,`track`),d=e(c,`readout`),f=0,p,m=e=>{u.style.transform=`translateX(${e}px)`},h=n=>{f=s(n,0,o.length-1),m(-f*r),l.dataset.page=String(f+1),d.textContent=`${f+1} of ${o.length}`;for(let[n,r]of o.entries()){let i=e(c,`dot-${r.key}`);t(i,`data-current`,n===f),i.style.background=n===f?`var(--sp-accent)`:`var(--sp-line)`}};h(0),l.addEventListener(`pointerdown`,e=>{e.isTrusted&&l.setPointerCapture(e.pointerId),p=n(e,c).x,u.style.transition=`none`,l.style.cursor=`grabbing`}),l.addEventListener(`pointermove`,e=>{if(p===void 0)return;let t=n(e,c).x-p,i=f===0&&t>0||f===o.length-1&&t<0;m(-f*r+(i?t/3:t))});let g=e=>{if(p===void 0)return;let t=n(e,c).x-p;p=void 0,u.style.transition=a,l.style.cursor=`grab`,h(t<=-53.5?f+1:t>=i?f-1:f)};l.addEventListener(`pointerup`,g),l.addEventListener(`pointercancel`,g)}export{c as mount};