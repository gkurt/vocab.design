import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=40,r=356,i=9,a=58,o=298,s=1500,c=[.2,.4,.6,.8],l=e=>`translateX(${(e*o).toFixed(1)}px) rotate(${(e*45).toFixed(1)}deg)`;function u(o,u){let d=(e,t)=>`
    <span
      style="position: absolute; left: ${i}px; top: ${i}px; width: ${n}px; height: ${n}px; border-radius: 8px;
             transform: ${l(e)}; ${t?`background: var(--sp-accent)`:`border: 1px dashed var(--sp-accent); opacity: ${(.3+e*.4).toFixed(2)}`}"
    ></span>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Slide and turn</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-context" style="margin-top: 12px">
          <div style="position: relative; width: ${r}px; height: ${a}px">
            ${d(0,!0)}${c.map(e=>d(e,!1)).join(``)}${d(1,!0)}
          </div>
          <div class="sp-row sp-row--between" style="width: ${r}px; margin-top: 6px">
            <span class="sp-label" style="font-size: 11px">from</span>
            <span class="sp-label" style="font-size: 11px">generated</span>
            <span class="sp-label" style="font-size: 11px">to</span>
          </div>
        </div>

        <div style="position: relative; width: ${r}px; height: ${a}px; margin-top: 12px">
          <span
            data-part="tile"
            data-subject
            style="position: absolute; left: ${i}px; top: ${i}px; width: ${n}px; height: ${n}px; border-radius: 8px;
                   background: var(--sp-accent); transform: ${l(1)}"
          ></span>
        </div>
      </div>
    </div>
  `;let f=e(o,`panel`),p=e(o,`tile`),m,h=()=>{f.removeAttribute(`data-running`),f.setAttribute(`data-settled`,``)};e(o,`replay`).addEventListener(`click`,()=>{u.clearTimeout(m),f.removeAttribute(`data-settled`),f.setAttribute(`data-running`,``);for(let e of p.getAnimations())e.cancel();if(t(o)){h();return}p.animate([{transform:l(0)},{transform:l(1)}],{duration:s,easing:`linear`,fill:`forwards`}),m=u.setTimeout(h,1560)})}export{u as mount};