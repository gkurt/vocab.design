import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=400,r=`translate ${n}ms var(--sp-ease)`,i=`opacity ${n}ms linear`,a=-30,o=[`pane-0`,`pane-1`,`pane-2`];function s(n,s){let c=e=>`<span
       data-part="veil-${e}"
       aria-hidden="true"
       style="position: absolute; inset: 0; background: var(--sp-scrim); opacity: 0; pointer-events: none; transition: ${i}"
     ></span>`,l=(e,t,n)=>`
    <section
      data-part="pane-${e}"
      style="position: absolute; inset: 0; overflow: hidden; background: ${t}; translate: 0 0; transition: ${r}"
    >
      ${n}
      ${c(e)}
    </section>`,u=(e,n,r)=>`
    <li class="sp-list-item" ${r?`data-part="${r}"`:``} style="cursor: ${r?`pointer`:`default`}">
      <span class="sp-grow">${e}</span>
      <span class="sp-text">${n}</span>
      ${t(`chevronRight`)}
    </li>`,d=(e,n)=>`
    <div class="sp-row" style="gap: 8px; padding: 8px 10px; border-bottom: 1px solid var(--sp-line)">
      <button class="sp-icon-button" type="button" data-part="back-${e}" aria-label="Back">${t(`chevronLeft`)}</button>
      <span class="sp-heading" style="font-size: 14px">${n}</span>
    </div>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 396px; height: 266px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Song book</span>
          <span class="sp-label" data-part="depth">1 of 3</span>
        </div>
        <div
          data-part="slot"
          data-subject
          data-level="0"
          data-dir="push"
          data-state="settled"
          style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden"
        >
          ${l(0,`var(--sp-sunken)`,`<ul class="sp-list" style="padding: 6px">
               ${u(`Sea shanties`,`12 songs`,`row-shanties`)}
               ${u(`Ballads`,`9 songs`)}
               ${u(`Reels`,`14 songs`)}
             </ul>`)}
          ${l(1,`var(--sp-surface)`,`${d(1,`Sea shanties`)}
             <ul class="sp-list" style="padding: 6px">
               ${u(`Haul away Joe`,`2:41`,`row-haul`)}
               ${u(`Spanish ladies`,`3:12`)}
               ${u(`Leave her Johnny`,`2:58`)}
             </ul>`)}
          ${l(2,`var(--sp-surface)`,`${d(2,`Haul away Joe`)}
             <div class="sp-stack" style="gap: 10px; padding: 12px">
               <span class="sp-swatch" style="height: 52px; --sp-swatch: var(--sp-accent-soft)"></span>
               <span class="sp-text">Capstan shanty, collected 1904. Two verses and a chorus.</span>
               <span class="sp-line" style="width: 78%"></span>
             </div>`)}
        </div>
      </div>
    </div>
  `;let f=e(n,`slot`),p=e(n,`depth`),m,h=t=>{let s=Number(f.dataset.level);o.forEach((o,c)=>{let l=e(n,o),u=c===s;l.style.transition=t?r:`none`,l.style.translate=u?`0 0`:c>s?`100% 0`:`${a}% 0`,l.style.pointerEvents=u?``:`none`,l.setAttribute(`aria-hidden`,String(!u)),u?l.dataset.current=``:l.removeAttribute(`data-current`);let d=e(n,`veil-${c}`);d.style.transition=t?i:`none`,d.style.opacity=c<s?`0.5`:`0`}),p.textContent=`${s+1} of ${o.length}`},g=e=>{let t=Number(f.dataset.level);t!==e&&(s.clearTimeout(m),f.dataset.level=String(e),f.dataset.dir=e>t?`push`:`pop`,f.dataset.state=`moving`,h(!0),m=s.setTimeout(()=>{f.dataset.state=`settled`},510))};e(n,`row-shanties`).addEventListener(`click`,()=>g(1)),e(n,`row-haul`).addEventListener(`click`,()=>g(2)),e(n,`back-1`).addEventListener(`click`,()=>g(0)),e(n,`back-2`).addEventListener(`click`,()=>g(1)),h(!1)}export{s as mount};