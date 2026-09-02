import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=132,r=52,i=104,a=900,o=[{offset:0,y:i,easing:`cubic-bezier(0.2, 0.7, 0.4, 1)`},{offset:.56,y:-13,easing:`ease-in-out`},{offset:.76,y:4,easing:`ease-in-out`},{offset:.9,y:-1.5,easing:`ease-out`},{offset:1,y:0}],s=[{offset:0,y:i,easing:`cubic-bezier(0.16, 1, 0.3, 1)`},{offset:1,y:0}],c=e=>e.map(e=>({offset:e.offset,easing:e.easing,transform:`translateY(${e.y}px)`}));function l(i,l){let u=(e,t,i)=>`
    <div class="sp-stack${i?``:` sp-context`}" style="flex: 1 1 0; gap: 8px">
      <div style="position: relative; height: ${n}px; overflow: hidden; border-radius: 6px; background: var(--sp-sunken)">
        <span
          style="position: absolute; left: 8px; right: 8px; bottom: 70px; height: 0;
                 border-top: 1px dashed var(--sp-muted); opacity: 0.8"
        ></span>
        <span class="sp-label" style="position: absolute; left: 10px; bottom: 74px; font-size: 10px">target</span>
        <span
          class="sp-surface"
          data-part="sheet-${e}"
          ${i?`data-subject`:``}
          style="position: absolute; left: 8px; right: 8px; bottom: 18px; height: ${r}px; display: flex;
                 align-items: center; padding: 0 12px; font-size: 12px; font-weight: 500; box-shadow: var(--sp-shadow);
                 transform: translateY(0)"
        >Share sheet</span>
      </div>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${t}</span>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 392px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Share sheet arrival</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 20px; margin-top: 10px">
          ${u(`over`,`Overshoot`,!0)}
          ${u(`plain`,`Ease out`,!1)}
        </div>
      </div>
    </div>
  `;let d=e(i,`panel`),f=e(i,`sheet-over`),p=e(i,`sheet-plain`),m,h=()=>{d.removeAttribute(`data-running`),d.setAttribute(`data-settled`,``)};e(i,`replay`).addEventListener(`click`,()=>{l.clearTimeout(m),d.removeAttribute(`data-settled`),d.setAttribute(`data-running`,``);for(let e of[f,p])for(let t of e.getAnimations())t.cancel();if(t(i)){h();return}f.animate(c(o),{duration:a,fill:`forwards`}),p.animate(c(s),{duration:a,fill:`forwards`}),m=l.setTimeout(h,960)})}export{l as mount};