import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=360,r=30,i=330,a=124,o=1800,s={offset:1,y:-86,rot:270},c=[{offset:0,y:0,rot:0,easing:`ease-out`},{offset:.3,y:-64,rot:90,easing:`ease-in-out`},{offset:.62,y:-24,rot:180,easing:`ease-out`},s],l=e=>`translate(${(e.offset*i).toFixed(1)}px, ${e.y}px) rotate(${e.rot}deg)`,u=()=>c.map(e=>({offset:e.offset,easing:e.easing,transform:l(e)}));function d(d,f){let p=c.map(e=>`
      <span
        style="position: absolute; left: 0; bottom: 0; width: ${r}px; height: ${r}px; border-radius: 7px;
               border: 1px dashed var(--sp-accent); transform: ${l(e)}"
      ></span>`).join(``),m=c.map(e=>`
      <span
        style="position: absolute; top: 0; left: ${(r/2+e.offset*i).toFixed(1)}px; transform: translateX(-50%);
               display: flex; flex-direction: column; align-items: center; gap: 5px"
      >
        <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-accent)"></span>
        <span class="sp-label" style="font-size: 11px">${Math.round(e.offset*100)}%</span>
      </span>`).join(``);d.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Timeline</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div style="position: relative; width: ${n}px; height: ${a}px; margin-top: 10px">
          <div class="sp-context" style="position: absolute; inset: 0; pointer-events: none">${p}</div>
          <span
            data-part="tile"
            data-subject
            style="position: absolute; left: 0; bottom: 0; width: ${r}px; height: ${r}px; border-radius: 7px;
                   background: var(--sp-accent); transform: ${l(s)}"
          ></span>
        </div>
        <div class="sp-context" style="position: relative; width: ${n}px; height: 30px; margin-top: 8px">
          <span style="position: absolute; top: 3px; left: ${r/2}px; right: ${r/2}px; height: 1px; background: var(--sp-line)"></span>
          ${m}
        </div>
      </div>
    </div>
  `;let h=e(d,`panel`),g=e(d,`tile`),_,v=()=>{h.removeAttribute(`data-running`),h.setAttribute(`data-settled`,``)};e(d,`replay`).addEventListener(`click`,()=>{f.clearTimeout(_),h.removeAttribute(`data-settled`),h.setAttribute(`data-running`,``);for(let e of g.getAnimations())e.cancel();if(t(d)){v();return}g.animate(u(),{duration:o,fill:`forwards`}),_=f.setTimeout(v,1860)})}export{d as mount};