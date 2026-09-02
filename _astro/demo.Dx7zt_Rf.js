import{n as e,t}from"./parts.C-YLuC7Q.js";var n=320,r=232,i=12,a=244,o=76,s=[{no:`01`,title:`Cormorant Bay`},{no:`02`,title:`Salt Pier`},{no:`03`,title:`Longstone Light`},{no:`04`,title:`Bell Rock`}];function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 228px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lighthouses</span>
          <span class="sp-label">scroll-snap-type: x mandatory</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-scroll"
            data-part="scroller"
            data-subject
            data-index="0"
            style="display: flex; width: ${n}px; overflow-y: hidden; scroll-snap-type: x mandatory"
          >
            ${s.map((e,t)=>`
      <article
        class="sp-surface"
        data-part="card-${t}"
        style="flex: 0 0 ${r}px; scroll-snap-align: start; margin-right: ${i}px; padding: 12px"
      >
        <div class="sp-row sp-row--between">
          <span class="sp-heading">${e.title}</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${e.no}</span>
        </div>
        <div class="sp-stack" style="margin-top: 12px">
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 78%"></div>
          <div class="sp-line" style="width: 86%"></div>
          <div class="sp-line" style="width: 58%"></div>
        </div>
      </article>`).join(``)}
            <span aria-hidden="true" style="flex: 0 0 ${o}px"></span>
          </div>
          <div class="sp-row sp-context" data-part="dots" style="height: 12px; gap: 6px">${s.map((e,t)=>`<span data-part="dot-${t}" style="width: 7px; height: 7px; border-radius: 50%"></span>`).join(``)}</div>
        </div>
      </div>
    </div>
  `;let l=e(c,`scroller`),u=s.map((t,n)=>e(c,`dot-${n}`)),d=()=>{let e=l.scrollLeft,n=Math.min(s.length-1,Math.max(0,Math.round(e/a)));l.dataset.index=String(n),t(l,`data-settled`,Math.abs(e-n*a)<=3);for(let[e,r]of u.entries())t(r,`data-current`,e===n),r.style.background=e===n?`var(--sp-ink)`:`var(--sp-line)`};l.addEventListener(`scroll`,d),d()}export{c as mount};