import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=200,r=400,i=.92,a=[{id:`library`,label:`Library`,body:`<span class="sp-label">Recently played</span>
           <span class="sp-line" style="width: 88%"></span>
           <span class="sp-line" style="width: 64%"></span>
           <span class="sp-line" style="width: 76%"></span>`},{id:`alerts`,label:`Alerts`,body:`<span class="sp-label">Two unread</span>
           <span class="sp-surface" style="padding: 8px 10px; font-size: 12px">Storm warning lifted</span>
           <span class="sp-surface" style="padding: 8px 10px; font-size: 12px">Tide table updated</span>`},{id:`account`,label:`Account`,body:`<span class="sp-row" style="gap: 8px">
             <span class="sp-avatar">RJ</span>
             <span class="sp-stack" style="gap: 3px">
               <span class="sp-heading" style="font-size: 13px">Rosa Jelen</span>
               <span class="sp-label">Harbour crew</span>
             </span>
           </span>
           <span class="sp-line" style="width: 58%"></span>`}];function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 312px; height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour</span>
          <span class="sp-label">Fade through</span>
        </div>
        <div class="sp-body">
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="picker" data-axis="View" data-value="library" style="width: 100%">
            ${a.map(e=>`<button class="sp-segment sp-grow" data-part="seg-${e.id}" value="${e.id}">${e.label}</button>`).join(``)}
          </sp-segmented>
          <div
            data-part="slot"
            data-subject
            data-showing="library"
            data-state="settled"
            style="position: relative; height: 118px; margin-top: 12px"
          >
            ${a.map((e,t)=>`
      <section
        class="sp-surface sp-stack"
        data-part="panel-${e.id}"
        aria-hidden="${t!==0}"
        style="position: absolute; inset: 0; gap: 8px; padding: 12px; opacity: ${+(t===0)};
               scale: ${t===0?1:i}; pointer-events: ${t===0?`auto`:`none`}"
      >
        ${e.body}
      </section>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`slot`),l,u,d=(t,n,r)=>{let a=e(o,`panel-${t}`);a.style.transition=r>0?`opacity ${r}ms linear, scale ${r}ms var(--sp-ease)`:`none`,a.style.opacity=n?`1`:`0`,a.style.scale=n?`1`:String(i),a.style.pointerEvents=n?``:`none`,a.setAttribute(`aria-hidden`,String(!n))},f=e=>{if((c.dataset.showing??``)!==e){if(s.clearTimeout(l),s.clearTimeout(u),c.dataset.showing=e,t(o)){for(let t of a)d(t.id,t.id===e,0);c.dataset.state=`settled`;return}c.dataset.state=`out`;for(let t of a)t.id!==e&&d(t.id,!1,n);l=s.setTimeout(()=>{c.dataset.state=`in`,d(e,!0,r)},n),u=s.setTimeout(()=>{c.dataset.state=`settled`},640)}};e(o,`picker`).addEventListener(`change`,e=>f(e.detail))}export{o as mount};