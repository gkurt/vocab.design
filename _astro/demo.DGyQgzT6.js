import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{r as n}from"./measure.DK7AY2_i.js";import{t as r}from"./motion.B5_YXmsy.js";var i={w:420,h:190},a=34,o=8,s=26,c=52,l={x:10,y:8},u=12,d=96,f=[{glyph:`inbox`,wash:`linear-gradient(160deg, #5b8def, #2f5bd0)`},{glyph:`calendar`,wash:`linear-gradient(160deg, #ef7c5c, #d1492f)`},{glyph:`search`,wash:`linear-gradient(160deg, #4fc3a1, #1f8f74)`},{glyph:`pencil`,wash:`linear-gradient(160deg, #f2b134, #d18e12)`},{glyph:`heart`,wash:`linear-gradient(160deg, #e8637f, #c23b5c)`},{glyph:`star`,wash:`linear-gradient(160deg, #8f7bf0, #5f4bd4)`},{glyph:`bell`,wash:`linear-gradient(160deg, #56b7d6, #2b8bb0)`},{glyph:`trash`,wash:`linear-gradient(160deg, #8c95a6, #626b7c)`}],p=f.length*a+(f.length-1)*o,m=(i.w-(p+l.x*2))/2+l.x,h=e=>m+e*42+a/2,g=e=>a+s*Math.exp(-((e/c)**2));function _(s){s.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desktop</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="scene"
            data-hover-driven
            style="position: relative; width: ${i.w}px; height: ${i.h}px; border-radius: 8px; overflow: hidden;
                   background: linear-gradient(165deg, #2f3b63 0%, #4a5a92 52%, #7d6ba8 100%); touch-action: none"
          >
            <div class="sp-context" style="position: absolute; left: 26px; top: 22px; width: 190px; height: 76px; border-radius: 7px;
                                           background: rgb(255 255 255 / 0.16); border: 1px solid rgb(255 255 255 / 0.24)"></div>
            <div class="sp-context" style="position: absolute; left: 226px; top: 40px; width: 158px; height: 58px; border-radius: 7px;
                                           background: rgb(255 255 255 / 0.11); border: 1px solid rgb(255 255 255 / 0.2)"></div>
            <span
              data-part="away"
              aria-hidden="true"
              style="position: absolute; left: ${i.w/2}px; top: 18px; width: 1px; height: 1px; pointer-events: none"
            ></span>
            <span
              data-part="baseline"
              aria-hidden="true"
              style="position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px;
                     background: rgb(255 255 255 / 0.5); pointer-events: none"
            ></span>
            <div
              class="sp-row"
              data-part="dock"
              data-subject
              data-mag="off"
              style="position: absolute; left: 50%; bottom: ${u}px; translate: -50% 0; align-items: flex-end; gap: ${o}px;
                     padding: ${l.y}px ${l.x}px; border-radius: 16px; background: rgb(255 255 255 / 0.2);
                     border: 1px solid rgb(255 255 255 / 0.3); backdrop-filter: blur(8px)"
            >${f.map((e,n)=>`
    <span
      data-part="tile-${n+1}"
      style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${a}px; height: ${a}px;
             border-radius: 9px; background: ${e.wash}; color: #ffffff; box-shadow: 0 2px 6px rgb(16 24 40 / 0.3)"
    >${t(e.glyph)}</span>`).join(``)}</div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`scene`),p=e(s,`dock`),m=f.map((t,n)=>e(s,`tile-${n+1}`)),_=r(s),v=e=>{p.dataset.mag=e?`on`:`off`},y=()=>{for(let e of m)e.style.width=`${a}px`,e.style.height=`${a}px`;v(!1)},b=e=>{if(_)return v(!0);m.forEach((t,n)=>{let r=g(Math.abs(e-h(n)));t.style.width=`${r.toFixed(1)}px`,t.style.height=`${r.toFixed(1)}px`}),v(!0)};c.addEventListener(`pointermove`,e=>{let t=n(e,c);if(t.y<i.h-d)return y();b(t.x)}),c.addEventListener(`pointerleave`,y)}export{_ as mount};