import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`1`,label:`Name your workspace`,done:!0},{key:`2`,label:`Invite a teammate`,done:!1},{key:`3`,label:`Connect a repository`,done:!1}],r={open:`Finish these whenever you like. Nothing here expires.`,complete:`All set. Your workspace is ready to use.`},i={open:`To do`,done:`Done`},a=`width: 100%; border: 0; background: transparent; font: inherit; font-size: 13px; text-align: left; cursor: pointer`;function o(o){let s=n.map(e=>({...e}));o.innerHTML=`
    <div class="sp-app">
      <div class="sp-stack" style="width: 320px; gap: 10px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Northwind</span>
          <span class="sp-text">Home</span>
        </div>
        <div class="sp-surface" data-part="card" data-subject style="padding: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading">Get set up</span>
            <span class="sp-text" data-part="count" role="status">1 of 3 done</span>
          </div>
          <div class="sp-progress" data-part="bar" style="margin-top: 10px; --sp-value: 33%">
            <div class="sp-progress-fill"></div>
          </div>
          <div class="sp-list" style="margin-top: 6px">${s.map(e=>`
      <button class="sp-list-item" type="button" data-part="task-${e.key}" ${e.done?`data-done`:``} style="${a}">
        <span class="sp-checkbox" data-part="mark-${e.key}" aria-hidden="true" ${e.done?`data-checked`:``}></span>
        <span class="sp-grow">${e.label}</span>
        <span class="sp-text" data-part="status-${e.key}">${e.done?i.done:i.open}</span>
        ${t(`chevronRight`)}
      </button>`).join(``)}</div>
          <div data-part="slot" style="margin-top: 6px">
            <span class="sp-text" data-part="footnote">${r.open}</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`card`),l=e(o,`count`),u=e(o,`bar`),d=e(o,`slot`),f=e(o,`footnote`),p=0;for(let e of Object.values(r))f.textContent=e,p=Math.max(p,d.offsetHeight);d.style.height=`${p}px`,f.textContent=r.open;for(let t of s){let n=e(o,`status-${t.key}`),r=0;for(let e of Object.values(i))n.textContent=e,r=Math.max(r,n.offsetWidth);n.style.minWidth=`${r}px`,n.style.textAlign=`right`,n.textContent=t.done?i.done:i.open}let m=t=>{if(t.done)return;t.done=!0,e(o,`task-${t.key}`).setAttribute(`data-done`,``),e(o,`mark-${t.key}`).setAttribute(`data-checked`,``),e(o,`status-${t.key}`).textContent=i.done;let n=s.filter(e=>e.done).length;l.textContent=`${n} of ${s.length} done`,u.style.setProperty(`--sp-value`,`${Math.round(n/s.length*100)}%`),!(n<s.length)&&(c.setAttribute(`data-complete`,``),f.textContent=r.complete)};for(let t of s)e(o,`task-${t.key}`).addEventListener(`click`,()=>m(t))}export{o as mount};