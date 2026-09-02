import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=92,r=66,i=300,a=520,o=[{id:`card`,name:`Card body`,delay:0,drag:0},{id:`avatar`,name:`Avatar`,delay:70,drag:22},{id:`chip`,name:`Badge`,delay:130,drag:34}],s=Math.max(...o.map(e=>e.delay))+a+50,c=e=>[{offset:0,transform:`translateX(${e}px)`,easing:`cubic-bezier(0.16, 1, 0.3, 1)`},{offset:.82,transform:`translateX(-3px)`,easing:`ease-out`},{offset:1,transform:`translateX(0)`}];function l(l,u){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" style="width: 404px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Notifications</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div
          style="position: relative; height: ${n}px; margin-top: 10px; border-radius: 6px;
                 background: var(--sp-sunken); overflow: hidden"
        >
          <div
            class="sp-surface sp-row"
            data-part="card"
            data-subject
            style="position: absolute; left: 12px; right: 12px; top: ${26/2}px; height: ${r}px;
                   gap: 10px; padding: 0 12px; box-shadow: var(--sp-shadow); transform: translateX(0)"
          >
            <span class="sp-avatar" data-part="avatar">HR</span>
            <span class="sp-stack sp-grow" style="gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 600">Harbour report</span>
              <span class="sp-label">Tide table updated</span>
            </span>
            <span
              data-part="chip"
              style="flex: 0 0 auto; padding: 3px 9px; border-radius: 999px; background: var(--sp-accent-soft);
                     color: var(--sp-ink); font-size: 11px; font-weight: 600"
            >New</span>
          </div>
        </div>
        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 12px">
          ${o.map(e=>{let t=e.delay/s*100,n=a/s*100;return`
      <div class="sp-row" style="gap: 8px">
        <span class="sp-label" style="flex: 0 0 66px; font-size: 11px">${e.name}</span>
        <span style="position: relative; flex: 1 1 auto; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
          <span
            style="position: absolute; top: 0; bottom: 0; left: ${t.toFixed(1)}%; width: ${n.toFixed(1)}%;
                   border-radius: 999px; background: var(--sp-accent)"
          ></span>
        </span>
        <span class="sp-label" style="flex: 0 0 48px; text-align: right; font-size: 11px">+${e.delay} ms</span>
      </div>`}).join(``)}
        </div>
      </div>
    </div>
  `;let d=e(l,`scene`),f=e(l,`card`),p=o.filter(e=>e.drag>0),m,h=()=>{d.removeAttribute(`data-running`),d.setAttribute(`data-settled`,``)},g=()=>{u.clearTimeout(m),d.removeAttribute(`data-settled`),d.setAttribute(`data-running`,``);for(let t of o)for(let n of e(l,t.id).getAnimations())n.cancel();if(t(l)){h();return}f.animate([{transform:`translateX(${i}px)`},{transform:`translateX(0)`}],{duration:a,easing:`cubic-bezier(0.16, 1, 0.3, 1)`,fill:`forwards`});for(let t of p)e(l,t.id).animate(c(t.drag),{duration:a,delay:t.delay,fill:`forwards`});m=u.setTimeout(h,s)};e(l,`replay`).addEventListener(`click`,g),g()}export{l as mount};