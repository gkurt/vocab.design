import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=150,r=26,i=124,a=1400,o=[{offset:0,y:0,easing:`ease-in`},{offset:.42,y:i,easing:`ease-out`},{offset:.6,y:84,easing:`ease-in`},{offset:.76,y:i,easing:`ease-out`},{offset:.87,y:110,easing:`ease-in`},{offset:1,y:i}],s=[{offset:0,y:0,easing:`cubic-bezier(0.3, 0, 0.4, 1)`},{offset:.42,y:i},{offset:1,y:i}],c=e=>e.map(e=>({offset:e.offset,easing:e.easing,transform:`translateY(${e.y}px)`}));function l(l,u){let d=(e,t,a)=>`
    <div class="sp-stack${a?``:` sp-context`}" style="flex: 1 1 0; gap: 8px">
      <div style="position: relative; height: ${n}px">
        <span
          class="sp-chip"
          data-part="badge-${e}"
          ${a?`data-subject`:``}
          style="position: absolute; top: 0; left: 50%; margin-left: -34px; width: 68px; height: ${r}px;
                 justify-content: center; cursor: default; background: var(--sp-accent); border-color: var(--sp-accent);
                 color: var(--sp-accent-ink); font-weight: 600; transform: translateY(${i}px)"
        >12 new</span>
        <span style="position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
      </div>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${t}</span>
    </div>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 384px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-end; gap: 26px; margin-top: 10px">
          ${d(`bounce`,`Bounce`,!0)}
          ${d(`plain`,`Ease out`,!1)}
        </div>
      </div>
    </div>
  `;let f=e(l,`panel`),p=e(l,`badge-bounce`),m=e(l,`badge-plain`),h,g=()=>{f.removeAttribute(`data-running`),f.setAttribute(`data-settled`,``)};e(l,`replay`).addEventListener(`click`,()=>{u.clearTimeout(h),f.removeAttribute(`data-settled`),f.setAttribute(`data-running`,``);for(let e of[p,m])for(let t of e.getAnimations())t.cancel();if(t(l)){g();return}p.animate(c(o),{duration:a,fill:`forwards`}),m.animate(c(s),{duration:a,fill:`forwards`}),h=u.setTimeout(g,1460)})}export{l as mount};