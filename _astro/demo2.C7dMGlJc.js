import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";var n=214,r=182,i=`Take one tablet with water. Do not take more than one tablet in any six hour period, and tell your doctor if you already take blood thinners. Stop and call the clinic if the swelling returns.`,a=`Our platform empowers modern teams to unlock seamless collaboration, so you can deliver world class outcomes together at scale, wherever work happens. Built for the way teams work now.`,o=[0,1,3,8,13,18,25],s=e=>e.split(` `).map(e=>`<span data-word>${e}</span>`).join(` `);function c(c){let l=(e,t,i,a)=>`
    <div data-part="${e}-page" style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
      <div class="sp-context" style="padding: 11px 12px">
        <span class="sp-heading" style="display: block; font-size: 12px">${t}</span>
        <span class="sp-label" style="display: block; margin: 2px 0 7px">${i}</span>
        <p data-part="${e}-text" style="margin: 0; font-size: 11px; line-height: 1.62">${s(a)}</p>
      </div>
      <div data-part="${e}-trace" ${e===`read`?`data-subject`:``} style="position: absolute; pointer-events: none"></div>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 251px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Reading session 12</span>
          <span class="sp-label">fixations plotted</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 9px; padding: 10px 12px">
          <div class="sp-row" style="gap: 12px; align-items: flex-start">
            ${l(`read`,`Dose and interactions`,`${i.split(` `).length} fixations`,i)}
            ${l(`skim`,`Why teams choose us`,`${o.length} fixations`,a)}
          </div>
        </div>
      </div>
    </div>
  `;let u=(n,r,i,a)=>{let o=e(c,`${n}-page`),s=e(c,`${n}-trace`),l=[...e(c,`${n}-text`).querySelectorAll(`[data-word]`)],u=(r===`all`?l:l.filter((e,t)=>r.includes(t))).map(e=>{let n=t(e,o);return{x:n.left+n.width/2,y:n.top+n.height/2}});if(!u.length)return;let d=Math.min(...u.map(e=>e.x))-i,f=Math.min(...u.map(e=>e.y))-i,p=Math.max(...u.map(e=>e.x))+i,m=Math.max(...u.map(e=>e.y))+i;return s.style.left=`${d}px`,s.style.top=`${f}px`,s.style.width=`${p-d}px`,s.style.height=`${m-f}px`,s.innerHTML=u.map(({x:e,y:t})=>`<span style="position: absolute; left: ${e-d-i/2}px; top: ${t-f-i/2}px; width: ${i}px; height: ${i}px; border-radius: 50%; background: var(--sp-accent); opacity: ${a}"></span>`).join(``),u.length};u(`read`,`all`,9,.5),u(`skim`,o,9,.5)}export{c as mount};