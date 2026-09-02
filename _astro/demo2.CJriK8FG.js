import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";var r=10,i=68,a=46,o=4,s=3,c=44,l=30,u=292,d=158,f=(e,t,n)=>Math.min(Math.max(e,t),n);function p(p){let m=[];for(let e=0;e<=s;e++)for(let t=0;t<=o;t++)m.push(`<span data-part="dot-${t+1}-${e+1}" style="position: absolute; left: ${r+t*i-2}px; top: ${r+e*a-2}px; width: 4px; height: 4px; border-radius: 50%; background: var(--sp-line)"></span>`);p.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 233px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
          <span class="sp-text" data-part="readout" style="width: 118px; text-align: right">Column 2, row 2</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-surface" data-part="canvas" style="position: relative; width: ${u}px; height: ${d}px">
            <div class="sp-context" data-part="grid">${m.join(``)}</div>
            <div
              data-part="ghost"
              style="position: absolute; left: 0; top: 0; width: ${c}px; height: ${l}px; border: 1px dashed var(--sp-accent); border-radius: 5px; visibility: hidden"
            ></div>
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              data-cell="2-2"
              style="position: absolute; display: flex; align-items: center; justify-content: center; width: ${c}px; height: ${l}px; font-size: 12px; cursor: grab; touch-action: none; background: var(--sp-accent-soft); border-color: var(--sp-accent)"
            >
              Tile
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let h=e(p,`canvas`),g=e(p,`card`),_=e(p,`ghost`),v=e(p,`readout`),y,b=(e,t)=>{g.style.left=`${f(e,0,248)}px`,g.style.top=`${f(t,0,128)}px`},x=(e,t)=>{let n=f(Math.round((e-r)/i),0,3),o=f(Math.round((t-r)/a),0,2);return{c:n,r:o,x:r+n*i,y:r+o*a}},S=(e,t)=>{let{c:n,r,x:i,y:a}=x(e,t);b(i,a),g.dataset.cell=`${n+1}-${r+1}`,v.textContent=`Column ${n+1}, row ${r+1}`};S(78,56),g.addEventListener(`pointerdown`,e=>{e.isTrusted&&g.setPointerCapture(e.pointerId),y=n(e,g),t(g,`data-dragging`,!0),g.style.boxShadow=`var(--sp-shadow)`}),p.addEventListener(`pointermove`,e=>{if(!y)return;let t=n(e,h),r=t.x-y.x,i=t.y-y.y;b(r,i);let a=x(f(r,0,248),f(i,0,128));_.style.left=`${a.x}px`,_.style.top=`${a.y}px`,_.style.visibility=`visible`});let C=e=>{if(!y)return;let r=n(e,h),i=r.x-y.x,a=r.y-y.y;y=void 0,t(g,`data-dragging`,!1),g.style.boxShadow=``,_.style.visibility=`hidden`,S(i,a)};p.addEventListener(`pointerup`,C),p.addEventListener(`pointercancel`,C)}export{p as mount};