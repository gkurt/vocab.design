import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=`ABCDEFGHIJKLMNOPQRSTUVWXYZ`,r=[`OSLO`,`LIMA`,`KYIV`,`BALI`,`PISA`],i={w:58,h:76},a=90,o=1,s=`#22252c`,c=`#f4f5f7`;function l(l,u){let d=r[0],f=(e,t)=>`
    <div
      data-part="cell-${t+1}"
      ${t===1?`data-subject`:``}
      style="position: relative; width: ${i.w}px; height: ${i.h}px; border-radius: 6px; overflow: hidden;
             background: ${s}; perspective: 240px; display: flex; align-items: center; justify-content: center"
    >
      <span
        data-part="glyph-${t+1}"
        style="display: block; color: ${c}; font-size: 40px; font-weight: 600; line-height: 1;
               transform-origin: center center; will-change: transform"
      >${e}</span>
      <span
        aria-hidden="true"
        style="position: absolute; left: 0; right: 0; top: 50%; height: 2px; margin-top: -1px; background: rgb(0 0 0 / 0.55)"
      ></span>
    </div>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 204px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Departures</span>
          <span class="sp-text" data-part="readout" style="width: 150px; text-align: right; white-space: nowrap">Now showing ${d}</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="change">Change</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div class="sp-row" data-part="board" data-state="settled" style="gap: 6px">
            ${[...d].map((e,t)=>f(e,t)).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let p=e(l,`board`),m=e(l,`readout`),h=t(l),g=[...d].map((t,r)=>({el:e(l,`cell-${r+1}`),glyph:e(l,`glyph-${r+1}`),at:n.indexOf(t),target:n.indexOf(t),wait:0})),_=0,v,y=e=>{e.glyph.animate([{transform:`rotateX(-58deg)`,filter:`brightness(0.55)`},{transform:`rotateX(-10deg)`,filter:`brightness(0.92)`,offset:.5},{transform:`rotateX(0deg)`,filter:`brightness(1)`}],{duration:a*.7,easing:`cubic-bezier(0.25, 0.9, 0.35, 1)`})},b=()=>{p.dataset.state=`settled`,m.textContent=`Now showing ${r[_]}`},x=()=>{let e=!1;for(let t of g){if(t.wait>0){t.wait--,e=!0;continue}t.at!==t.target&&(t.at=(t.at+1)%26,t.glyph.textContent=n[t.at]??``,y(t),t.at!==t.target&&(e=!0))}v=e?u.setTimeout(x,a):void 0,e||b()};e(l,`change`).addEventListener(`click`,()=>{if(p.dataset.state===`flipping`)return;_=(_+1)%r.length;let e=r[_];if(g.forEach((t,r)=>{t.target=n.indexOf(e[r]??`A`),t.wait=r*o}),h){for(let e of g)e.at=e.target,e.glyph.textContent=n[e.at]??``,e.wait=0;return b()}p.dataset.state=`flipping`,m.textContent=`Flipping to ${e}`,u.clearTimeout(v),v=u.setTimeout(x,a)})}export{l as mount};