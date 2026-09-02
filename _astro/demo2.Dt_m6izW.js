import{a as e}from"./touch.Bg97t8LB.js";import{n as t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";var r=322,i=152,a=1,o=4,s=`
  <div style="position: absolute; inset: 0; background: linear-gradient(#a9cbe6, #e2edf3 58%, #cdd8c6)"></div>
  <div style="position: absolute; left: 18%; top: 14%; width: 30px; height: 30px; border-radius: 50%; background: #f7d685"></div>
  <div style="position: absolute; left: -14%; bottom: 30%; width: 64%; height: 40%; border-radius: 50% 50% 0 0; background: #8298a7"></div>
  <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 30%; background: #527082"></div>
  <div style="position: absolute; left: 60.6%; top: 36%; width: 9px; height: 26px; border-radius: 2px 2px 0 0; background: #f4f1ea"></div>
  <div style="position: absolute; left: 60.6%; top: 36%; width: 9px; height: 7px; border-radius: 2px 2px 0 0; background: #c0503f"></div>
  <div style="position: absolute; left: 24%; bottom: 12%; width: 30px; height: 9px; border-radius: 3px; background: #33495a"></div>
`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lighthouse</span>
          <span class="sp-text" data-part="readout" style="width: 108px; text-align: right">Scale 1x</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-touch
            data-scale="1"
            style="position: relative; overflow: hidden; width: ${r}px; height: ${i}px; touch-action: none; user-select: none"
          >
            <div
              data-part="scene"
              style="position: absolute; inset: 0; transform: translate(0px, 0px) scale(1); transform-origin: 0 0; transition: transform 0.09s linear"
            >${s}</div>
            <span
              data-part="anchor"
              style="position: absolute; left: 0; top: 0; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.2s var(--sp-ease)"
            ></span>
            <span data-part="grip-a" style="position: absolute; left: 62%; top: 42%; width: 1px; height: 1px"></span>
            <span data-part="grip-b" style="position: absolute; left: 30%; top: 45%; width: 1px; height: 1px"></span>
          </div>
        </div>
      </div>
    </div>
  `;let l=t(c,`canvas`),u=t(c,`scene`),d=t(c,`anchor`),f=t(c,`readout`),p=1,m=0,h=0,g=e=>{u.style.transform=`translate(${e.tx}px, ${e.ty}px) scale(${e.s})`,l.dataset.scale=String(Number(e.s.toFixed(1))),f.textContent=`Scale ${Number(e.s.toFixed(1))}x`},_=(e,t,n)=>Math.min(n,Math.max(t,e)),v=(e,t,n={s:p,tx:m,ty:h})=>{let s=_(n.s*e,a,o);return{s,tx:_(t.x-(t.x-n.tx)/n.s*s,r*(1-s),0),ty:_(t.y-(t.y-n.ty)/n.s*s,i*(1-s),0)}},y=e=>n({clientX:e.x,clientY:e.y},l),b=e=>{d.style.left=`${e.x}px`,d.style.top=`${e.y}px`,d.style.opacity=`1`},x={s:1,tx:0,ty:0,at:{x:0,y:0}};e(l,{onStart:e=>{x={s:p,tx:m,ty:h,at:y(e)},b(x.at)},onPinch:e=>g(v(e,x.at,x)),onEnd:e=>{({s:p,tx:m,ty:h}=v(e,x.at,x)),g({s:p,tx:m,ty:h})}}),l.addEventListener(`wheel`,e=>{if(!e.ctrlKey)return;e.preventDefault();let t=y({x:e.clientX,y:e.clientY});b(t),{s:p,tx:m,ty:h}=v(Math.exp(-e.deltaY*.0035),t),g({s:p,tx:m,ty:h})},{passive:!1})}export{c as mount};