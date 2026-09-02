import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=1400,r=70,i=[{id:`fps60`,name:`60 fps`,budget:`16.7 ms a frame`,interval:17},{id:`fps30`,name:`30 fps`,budget:`33 ms a frame`,interval:33},{id:`fps12`,name:`12 fps`,budget:`83 ms a frame`,interval:83}];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Frame budget</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div
          class="sp-stack"
          data-part="rates"
          data-subject
          data-state="settled"
          style="gap: 12px; margin-top: 12px"
        >
          ${i.map(e=>`
      <div class="sp-stack" style="gap: 5px">
        <div class="sp-row" style="gap: 8px">
          <span class="sp-label sp-text--ink" style="flex: 0 0 46px">${e.name}</span>
          <span class="sp-label sp-grow">${e.budget}</span>
          <span class="sp-label" data-part="count-${e.id}" style="flex: 0 0 74px; text-align: right">0 frames</span>
        </div>
        <div style="position: relative; height: 14px; border-radius: 999px; background: var(--sp-sunken)">
          <span
            data-part="dot-${e.id}"
            data-at="start"
            style="position: absolute; top: 1px; left: 0; width: 12px; height: 12px; border-radius: 50%;
                   background: var(--sp-accent); transition: none"
          ></span>
        </div>
      </div>`).join(``)}
        </div>
      </div>
    </div>
  `;let s=e(a,`rates`),c=[],l=(t,r)=>{let o=i.find(e=>e.id===t);if(!o)return;let s=Math.min(1,r*o.interval/n),c=e(a,`dot-${t}`);c.style.left=`${s*100}%`,c.style.translate=`${s*-100}% 0`,c.dataset.at=s>=1?`end`:`travel`,e(a,`count-${t}`).textContent=`${r} frames`},u=(e,t)=>{let r=i.find(t=>t.id===e);r&&(l(e,t),t*r.interval<n&&c.push(o.setTimeout(()=>u(e,t+1),r.interval)))},d=()=>{for(let e of c)o.clearTimeout(e);if(c.length=0,t(a)){for(let e of i)l(e.id,Math.ceil(n/e.interval));s.dataset.state=`settled`;return}for(let t of i){let n=e(a,`dot-${t.id}`);n.style.left=`0`,n.style.translate=`0 0`,n.dataset.at=`start`,e(a,`count-${t.id}`).textContent=`0 frames`}s.dataset.state=`playing`;let d=()=>{s.dataset.state=`settled`};for(let e of i)c.push(o.setTimeout(()=>u(e.id,1),r+e.interval));c.push(o.setTimeout(d,1610))};e(a,`replay`).addEventListener(`click`,d),d()}export{a as mount};