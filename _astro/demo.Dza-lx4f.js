import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=80,r=1e3,i=[{id:`total`,name:`Total`,value:`1,284`,delay:0,dur:300},{id:`today`,name:`Today`,value:`96`,delay:120,dur:300},{id:`trend`,name:`Trend`,value:`+4.2%`,delay:240,dur:300},{id:`queue`,name:`Queue`,value:`18`,delay:360,dur:300},{id:`errors`,name:`Errors`,value:`2`,delay:480,dur:300},{id:`notes`,name:`Notes`,value:`7`,delay:600,dur:300}],a=Math.max(...i.map(e=>e.delay+e.dur));function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 424px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fleet dashboard</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body sp-row" style="align-items: flex-start; gap: 14px">
          <div
            class="sp-grid"
            data-part="group"
            data-subject
            data-state="settled"
            style="flex: 0 0 224px; grid-template-columns: repeat(2, 1fr)"
          >
            ${i.map(e=>`
      <div
        class="sp-surface"
        data-part="card-${e.id}"
        style="display: flex; flex-direction: column; justify-content: center; gap: 5px; height: 56px; padding: 8px 10px;
               opacity: 0; transform: translateY(12px)"
      >
        <span class="sp-label">${e.name}</span>
        <span class="sp-heading" style="font-size: 15px">${e.value}</span>
      </div>`).join(``)}
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px">
            <span class="sp-label">Plan</span>
            ${i.map(e=>`
      <div class="sp-row" style="gap: 8px">
        <span class="sp-label" style="flex: 0 0 42px">${e.name}</span>
        <span style="position: relative; flex: 1 1 auto; height: 6px; border-radius: 999px; background: var(--sp-sunken)">
          <span
            data-part="bar-${e.id}"
            style="position: absolute; top: 0; bottom: 0; left: ${e.delay/r*100}%;
                   width: ${e.dur/r*100}%; border-radius: 999px; background: var(--sp-accent); opacity: 0.35"
          ></span>
        </span>
      </div>`).join(``)}
            <span class="sp-label" style="align-self: flex-end">0 to ${r} ms</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`group`),l=[],u=(t,n)=>{let r=e(o,`card-${t}`);r.style.transition=n>0?`opacity ${n}ms var(--sp-ease), transform ${n}ms var(--sp-ease)`:`none`,r.style.opacity=`1`,r.style.transform=`none`,r.dataset.arrived=``,e(o,`bar-${t}`).style.opacity=`1`},d=()=>{for(let e of l)s.clearTimeout(e);if(l.length=0,t(o)){for(let e of i)u(e.id,0);c.dataset.state=`settled`;return}for(let t of i){let n=e(o,`card-${t.id}`);n.style.transition=`none`,n.style.opacity=`0`,n.style.transform=`translateY(12px)`,n.removeAttribute(`data-arrived`),e(o,`bar-${t.id}`).style.opacity=`0.35`}c.dataset.state=`playing`;for(let e of i)l.push(s.setTimeout(()=>u(e.id,e.dur),n+e.delay));l.push(s.setTimeout(()=>{c.dataset.state=`settled`},n+a+40))};e(o,`replay`).addEventListener(`click`,d),d()}export{o as mount};