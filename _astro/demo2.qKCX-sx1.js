import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=148,r=34,i=114,a=1600,o=[{offset:0,y:0,sx:1,sy:1,easing:`ease-in`},{offset:.26,y:i,sx:.88,sy:1.16,easing:`ease-out`},{offset:.31,y:i,sx:1.24,sy:.72,easing:`ease-in`},{offset:.36,y:i,sx:.9,sy:1.12,easing:`ease-out`},{offset:.56,y:i*.36,sx:1,sy:1,easing:`ease-in`},{offset:.76,y:i,sx:.94,sy:1.08,easing:`ease-out`},{offset:.8,y:i,sx:1.14,sy:.84,easing:`ease-in`},{offset:.84,y:i,sx:.97,sy:1.04,easing:`ease-out`},{offset:.93,y:i*.86,sx:1,sy:1,easing:`ease-in`},{offset:1,y:i,sx:1,sy:1}],s=e=>o.map(t=>({offset:t.offset,easing:t.easing,transform:`translateY(${t.y.toFixed(1)}px) scale(${e?t.sx:1}, ${e?t.sy:1})`}));function c(o,c){let l=(e,t,a)=>`
    <div class="sp-stack${a?``:` sp-context`}" style="flex: 1 1 0; gap: 8px">
      <div data-part="arena-${e}" style="position: relative; height: ${n}px">
        <span
          data-part="ball-${e}"
          ${a?`data-subject`:``}
          style="position: absolute; top: 0; left: 50%; width: ${r}px; height: ${r}px; margin-left: ${-34/2}px;
                 border-radius: 50%; background: var(--sp-accent); transform-origin: bottom center;
                 transform: translateY(${i}px)"
        ></span>
      </div>
      <span class="sp-divider"></span>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${t}</span>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 392px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-end; gap: 28px; margin-top: 12px">
          ${l(`soft`,`Flexible`,!0)}
          ${l(`rigid`,`Rigid`,!1)}
        </div>
      </div>
    </div>
  `;let u=e(o,`panel`),d=e(o,`ball-soft`),f=e(o,`ball-rigid`),p,m=()=>{u.removeAttribute(`data-running`),u.setAttribute(`data-settled`,``)};e(o,`replay`).addEventListener(`click`,()=>{c.clearTimeout(p),u.removeAttribute(`data-settled`),u.setAttribute(`data-running`,``);for(let e of[d,f])for(let t of e.getAnimations())t.cancel();if(t(o)){for(let e of[d,f])e.style.transform=`translateY(${i}px)`;m();return}d.animate(s(!0),{duration:a,fill:`forwards`}),f.animate(s(!1),{duration:a,fill:`forwards`}),p=c.setTimeout(m,1660)})}export{c as mount};