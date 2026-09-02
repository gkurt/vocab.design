import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{r as t}from"./measure.DK7AY2_i.js";var n=344,r=204,i=[{x:44,y:26,w:112,h:48,label:`Intake`},{x:200,y:76,w:122,h:52,label:`Survey`},{x:70,y:130,w:104,h:44,label:`Berth`},{x:228,y:152,w:112,h:44,label:`Release`}],a={x:44,y:26,w:296,h:170},o={x:-278,y:-209,scale:.1,w:94,h:64},s=(e,t,n)=>Math.min(Math.max(e,t),n),c={x:(n-a.w)/2-a.x,y:(r-a.h)/2-a.y},l=`transform 0.22s var(--sp-ease)`;function u(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Board</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Zoom" data-part="switcher" data-value="100">
            <button class="sp-segment" type="button" data-part="seg-50" value="50">50%</button>
            <button class="sp-segment" type="button" data-part="seg-100" value="100">100%</button>
            <button class="sp-segment" type="button" data-part="seg-150" value="150">150%</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fit">Fit</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div style="display: flex; gap: 10px">
          <div
            data-part="viewport"
            data-subject
            data-at="home"
            data-zoom="100"
            role="application"
            aria-label="Board canvas"
            style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); cursor: grab"
          >
            <div
              data-part="world"
              style="position: absolute; left: 0; top: 0; width: 0; height: 0; transform-origin: 0 0;
                     transform: translate(${c.x}px, ${c.y}px) scale(1); transition: ${l}"
            >
              <div
                aria-hidden="true"
                style="position: absolute; left: -900px; top: -700px; width: 2400px; height: 1800px;
                       background-image: radial-gradient(circle, var(--sp-line) 1.4px, transparent 1.6px); background-size: 26px 26px"
              ></div>
              ${i.map(e=>`
                <div class="sp-surface" style="position: absolute; left: ${e.x}px; top: ${e.y}px; width: ${e.w}px; height: ${e.h}px; padding: 8px 10px; box-shadow: var(--sp-shadow)">
                  <span class="sp-heading" style="font-size: 12px">${e.label}</span>
                  <div class="sp-line" style="width: 72%; margin-top: 7px"></div>
                </div>`).join(``)}
            </div>
            <span data-part="pan-start" aria-hidden="true" style="position: absolute; left: 236px; top: 40px; width: 26px; height: 26px; pointer-events: none"></span>
            <span data-part="pan-end" aria-hidden="true" style="position: absolute; left: 136px; top: 98px; width: 26px; height: 26px; pointer-events: none"></span>
          </div>
          <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 98px; gap: 6px">
            <span class="sp-label" style="font-size: 11px">overview</span>
            <div
              data-part="badge"
              style="position: relative; width: ${o.w}px; height: ${o.h}px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: 5px; overflow: hidden"
            >
              ${i.map(e=>`
                <span style="position: absolute; left: ${(e.x-o.x)*o.scale}px; top: ${(e.y-o.y)*o.scale}px;
                             width: ${Math.max(e.w*o.scale,3)}px; height: ${Math.max(e.h*o.scale,3)}px;
                             border-radius: 1px; background: var(--sp-muted)"></span>`).join(``)}
              <span
                data-part="badge-view"
                style="position: absolute; border: 2px solid var(--sp-ink); border-radius: 2px;
                       background: color-mix(in srgb, var(--sp-ink) 10%, transparent)"
              ></span>
            </div>
          </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 19px; font-size: 12px"></span>
        </div>
      </div>
    </div>
  `;let d=e(u,`viewport`),f=e(u,`world`),p=e(u,`badge-view`),m=e(u,`readout`),h=e(u,`switcher`),g=1,_={x:0,y:0},v=e=>({x:(n-a.w*e)/2-a.x*e,y:(r-a.h*e)/2-a.y*e}),y=()=>{f.style.transform=`translate(${_.x}px, ${_.y}px) scale(${g})`,d.dataset.zoom=String(Math.round(g*100));let e=v(1),t=g===1&&Math.abs(_.x-e.x)<3&&Math.abs(_.y-e.y)<3;d.dataset.at=t?`home`:`away`;let i=s((-_.x/g-o.x)*o.scale,0,o.w-6),a=s((-_.y/g-o.y)*o.scale,0,o.h-6);p.style.left=`${i}px`,p.style.top=`${a}px`,p.style.width=`${s(n/g*o.scale,6,o.w-i)}px`,p.style.height=`${s(r/g*o.scale,6,o.h-a)}px`,m.textContent=`Position ${Math.round(-_.x/g)}, ${Math.round(-_.y/g)}`},b=e=>{_={x:n/2-(n/2-_.x)*(e/g),y:r/2-(r/2-_.y)*(e/g)},g=e,y()};h.addEventListener(`change`,e=>b(Number(e.detail)/100)),e(u,`fit`).addEventListener(`click`,()=>{h.value=`100`,_=v(1),g=1,y()});let x=null;d.addEventListener(`pointerdown`,e=>{e.isTrusted&&d.setPointerCapture(e.pointerId),x={...t(e,u),ox:_.x,oy:_.y},f.style.transition=`none`,d.style.cursor=`grabbing`}),d.addEventListener(`pointermove`,e=>{if(!x)return;let n=t(e,u);_={x:x.ox+(n.x-x.x),y:x.oy+(n.y-x.y)},y()});let S=()=>{x=null,f.style.transition=l,d.style.cursor=`grab`};d.addEventListener(`pointerup`,S),d.addEventListener(`pointercancel`,S),_=v(1),y()}export{u as mount};