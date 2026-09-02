import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=2600,r=17,i=358,a=3,o=14,s=338,c=70,l=700,u=1e3,d=(()=>{let e=[];for(let t=r;t<n;t+=r)t>=l&&t<1700||e.push(t);return e.push(n),e})();function f(r,f){let p=(e,t,n)=>`
    <div style="position: relative; width: ${i}px; height: 20px; padding: ${a}px;
                border-radius: 999px; background: var(--sp-sunken)">
      <span
        data-part="mover-${e}"
        data-state="rest"
        ${t?`data-subject`:``}
        style="position: absolute; top: ${a}px; left: ${a}px; width: ${o}px; height: ${o}px;
               border-radius: 50%; background: var(--sp-accent); ${n}"
      ></span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" data-thread="idle" style="width: 400px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-stack sp-context" style="gap: 4px; margin-top: 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Main thread</span>
            <span class="sp-label" data-part="thread" style="flex: 0 0 130px; text-align: right">idle</span>
          </div>
          <div style="position: relative; width: ${i}px; height: 6px; border-radius: 999px; background: var(--sp-sunken)">
            <span
              style="position: absolute; top: 0; bottom: 0; left: ${(l/n*100).toFixed(1)}%;
                     width: ${(u/n*100).toFixed(1)}%; border-radius: 999px; background: var(--sp-warn)"
            ></span>
          </div>
        </div>

        <div class="sp-stack" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-context">
            <span class="sp-label sp-text--ink">translate</span>
          </div>
          ${p(`gpu`,!0,`translate: 0 0; transition: translate ${n}ms linear ${c}ms`)}
        </div>

        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 12px">
          <div class="sp-row">
            <span class="sp-label sp-text--ink">left</span>
          </div>
          ${p(`main`,!1,`transition: none`)}
        </div>
      </div>
    </div>
  `;let m=e(r,`scene`),h=e(r,`mover-gpu`),g=e(r,`mover-main`),_=e(r,`thread`),v=[],y=e=>{m.dataset.thread=e?`busy`:`idle`,_.textContent=e?`blocked for ${u} ms`:`idle`,g.dataset.state=e?`stalled`:`rolling`},b=()=>{h.style.transition=`none`,h.style.translate=`${s}px 0`,h.dataset.state=`landed`,g.style.left=`341px`,g.dataset.state=`landed`,m.dataset.state=`landed`,m.dataset.thread=`idle`,_.textContent=`idle`},x=e=>{let t=d[e];if(t===void 0)return;g.style.left=`${a+t/n*s}px`;let r=d[e+1];r!==void 0&&v.push(f.setTimeout(()=>x(e+1),r-t))},S=()=>{for(let e of v)f.clearTimeout(e);if(v.length=0,t(r)){b();return}h.style.transition=`none`,h.style.translate=`0 0`,g.style.left=`${a}px`,h.offsetWidth,h.style.transition=`translate ${n}ms linear ${c}ms`,h.style.translate=`${s}px 0`,h.dataset.state=`gliding`,g.dataset.state=`rolling`,m.dataset.state=`running`,y(!1),v.push(f.setTimeout(()=>x(0),87)),v.push(f.setTimeout(()=>y(!0),770)),v.push(f.setTimeout(()=>y(!1),1770)),v.push(f.setTimeout(()=>{h.dataset.state=`landed`,g.dataset.state=`landed`,m.dataset.state=`landed`},2750))};e(r,`replay`).addEventListener(`click`,S),S()}export{f as mount};