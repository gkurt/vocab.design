import{n as e,t}from"./parts.C-YLuC7Q.js";var n=324,r=302,i=700,a=240,o=`cubic-bezier(0.16, 1, 0.3, 1)`,s=[{id:`short`,label:`short`,ms:150},{id:`long`,label:`long`,ms:620}],c=Math.max(...s.map(e=>e.ms));function l(l,u){let d=(e,t,r,o)=>{let s=Math.round(a/i*r);return`
      <div class="sp-stack" data-part="lane-${e}" style="gap: 6px; margin-top: 14px">
        <div class="sp-row sp-context">
          <span class="sp-label" style="width: 54px; flex: 0 0 auto">${t}</span>
          <span class="sp-track" style="flex: 0 0 auto; width: ${n}px">
            <span class="sp-dot" data-part="dot-${e}" style="transform: translateX(0px)"></span>
          </span>
        </div>
        <div class="sp-row${o?``:` sp-context`}">
          <span style="width: 54px; flex: 0 0 auto"></span>
          <span
            data-part="bar-${e}"${o?` data-subject`:``}
            style="width: ${s}px; height: 8px; flex: 0 0 auto; border-radius: 4px; background: var(--sp-accent)"
          ></span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">${r} ms</span>
        </div>
      </div>`};l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="stage" data-state="rest" style="width: 428px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        ${s.map(e=>d(e.id,e.label,e.ms,e.id===`long`)).join(``)}
      </div>
    </div>
  `;let f=e(l,`stage`),p=[];e(l,`replay`).addEventListener(`click`,()=>{for(let e of p)u.clearTimeout(e);p=[],f.dataset.state=`running`;for(let n of s){let r=e(l,`dot-${n.id}`);t(e(l,`lane-${n.id}`),`data-arrived`,!1),r.style.transition=`none`,r.style.transform=`translateX(0px)`}f.offsetWidth;for(let n of s){let i=e(l,`dot-${n.id}`);i.style.transition=`transform ${n.ms}ms ${o}`,i.style.transform=`translateX(${r}px)`,p.push(u.setTimeout(()=>t(e(l,`lane-${n.id}`),`data-arrived`,!0),n.ms+40))}p.push(u.setTimeout(()=>{f.dataset.state=`done`},c+140))})}export{l as mount};