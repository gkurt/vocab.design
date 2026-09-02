import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=1600,r=17,i=244,a=70,o=[{at:320,ms:190},{at:820,ms:130},{at:1180,ms:240}];function s(){let e=[],t=0;for(let i=r;i<n;i+=r)o.some(e=>i>=e.at&&i<e.at+e.ms)||(e.push({time:i,late:i-t>34}),t=i);return e.push({time:n,late:n-t>34}),e}var c=s(),l=c.filter(e=>e.late).length;function u(r,o){let s=(e,t)=>`
    <div style="position: relative; height: 20px; padding: 3px; border-radius: 999px; background: var(--sp-sunken)">
      <span
        data-part="marble-${e}"
        ${t?`data-subject data-state="rest"`:``}
        style="position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%;
               background: var(--sp-accent); translate: 0 0"
      ></span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Marble run</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Steady</span>
            <span class="sp-label" style="flex: 0 0 96px; text-align: right">0 holds</span>
          </div>
          ${s(`steady`,!1)}
        </div>

        <div class="sp-stack" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Stalling</span>
            <span class="sp-label" data-part="holds" data-count="0" style="flex: 0 0 96px; text-align: right">0 holds</span>
          </div>
          ${s(`jank`,!0)}
        </div>
      </div>
    </div>
  `;let u=e(r,`marble-steady`),d=e(r,`marble-jank`),f=e(r,`holds`),p,m=()=>{u.style.transition=`none`,u.style.translate=`${i}px 0`,d.style.translate=`${i}px 0`,d.dataset.state=`landed`,f.dataset.count=String(l),f.textContent=`${l} holds`},h=e=>{let t=c[e];if(!t)return;if(d.style.translate=`${t.time/n*i}px 0`,t.late){let e=Number(f.dataset.count)+1;f.dataset.count=String(e),f.textContent=`${e} holds`}let r=c[e+1];if(!r){d.dataset.state=`landed`;return}p=o.setTimeout(()=>h(e+1),r.time-t.time)},g=()=>{if(o.clearTimeout(p),t(r)){m();return}u.style.transition=`none`,u.style.translate=`0 0`,d.style.translate=`0 0`,d.dataset.state=`rolling`,f.dataset.count=`0`,f.textContent=`0 holds`,u.offsetWidth,u.style.transition=`translate ${n}ms linear ${a}ms`,u.style.translate=`${i}px 0`,p=o.setTimeout(()=>h(0),87)};e(r,`replay`).addEventListener(`click`,g),g()}export{u as mount};