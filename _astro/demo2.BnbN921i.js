import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{i as n,r}from"./measure.DK7AY2_i.js";var i={w:152,h:94},a=22,o={x:300,y:14},s=[{key:`preview`,name:`Preview`,glyph:`eye`},{key:`adjust`,name:`Adjust`,glyph:`sliders`},{key:`mark`,name:`Mark`,glyph:`star`}],c={1:`linear-gradient(180deg, #23364f 0%, #4c6f93 46%, #d0a878 100%)`,2:`linear-gradient(180deg, #3b1f3a 0%, #8d4a52 52%, #e8a765 100%)`,3:`linear-gradient(180deg, #10222a 0%, #2f5d63 50%, #8fb5a4 100%)`};function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 288px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">IMG_2841.raw</span>
          <span class="sp-label" style="font-size: 11px">Nothing docked, nothing cropped</span>
        </div>

        <div
          data-part="canvas"
          data-shot="1"
          style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; background: ${c[1]};
                 transition: background 0.3s ease"
        >
          <span style="position: absolute; left: 58px; top: 34px; width: 44px; height: 44px; border-radius: 50%;
                       background: rgb(255 245 214 / 0.86); filter: blur(1px)"></span>
          <span style="position: absolute; left: -40px; bottom: 42px; width: 340px; height: 170px; border-radius: 50% 50% 0 0;
                       background: rgb(18 26 38 / 0.42)"></span>
          <span style="position: absolute; right: -60px; bottom: 34px; width: 320px; height: 130px; border-radius: 50% 50% 0 0;
                       background: rgb(12 18 28 / 0.55)"></span>

          <div
            data-part="strip"
            class="sp-row"
            style="position: absolute; left: 0; right: 0; bottom: 10px; justify-content: center; gap: 8px"
          >
            ${[`1`,`2`,`3`].map(e=>`
    <button
      type="button"
      data-part="thumb-${e}"
      aria-label="Frame ${e}"
      style="width: 52px; height: 34px; padding: 0; border-radius: 5px; border: 2px solid rgb(255 255 255 / 0.28);
             background: ${c[e]}; cursor: pointer"
    ></button>
  `).join(``)}
          </div>

          <span data-part="aim-left" aria-hidden="true" style="position: absolute; left: 108px; top: 42px; width: 4px; height: 4px"></span>

          <div
            data-part="hud"
            data-subject
            data-corner="tr"
            role="group"
            aria-label="Image tools"
            style="position: absolute; left: ${o.x}px; top: ${o.y}px; width: ${i.w}px; height: ${i.h}px;
                   border-radius: 10px; background: rgb(14 18 26 / 0.58); border: 1px solid rgb(255 255 255 / 0.18);
                   box-shadow: 0 10px 24px rgb(4 8 14 / 0.42); backdrop-filter: blur(9px) saturate(1.2); color: #eef2f8;
                   display: flex; flex-direction: column; overflow: hidden"
          >
            <div
              data-part="grip"
              style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: ${a}px; padding: 0 8px;
                     border-bottom: 1px solid rgb(255 255 255 / 0.14); background: rgb(255 255 255 / 0.06);
                     cursor: grab; touch-action: none; font-size: 11px; font-weight: 500"
            >
              <span style="flex: 1 1 auto">Tools</span>
              <span data-part="readout" data-tool="none" style="opacity: 0.7; font-weight: 400">none</span>
            </div>
            <div class="sp-row" style="gap: 6px; padding: 8px; justify-content: center">
              ${s.map(e=>`
    <button
      class="sp-icon-button"
      type="button"
      data-part="tool-${e.key}"
      aria-label="${e.name}"
      style="width: 34px; height: 30px; border-radius: 7px; color: #f2f5fa; background: rgb(255 255 255 / 0.08);
             border: 1px solid rgb(255 255 255 / 0.14)"
    >${t(e.glyph)}</button>
  `).join(``)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`canvas`),d=e(l,`hud`),f=e(l,`grip`),p=e(l,`readout`),m=(e,t,n)=>{let r=Math.min(Math.max(0,e),n.width-i.w),a=Math.min(Math.max(0,t),n.height-i.h);d.style.left=`${r}px`,d.style.top=`${a}px`;let o=r+i.w/2<n.width/2?`l`:`r`;d.dataset.corner=`${a+i.h/2<n.height/2?`t`:`b`}${o}`},h,g={x:0,y:0};f.addEventListener(`pointerdown`,e=>{e.isTrusted&&f.setPointerCapture(e.pointerId),h=n(u),g=r(e,d),f.style.cursor=`grabbing`}),f.addEventListener(`pointermove`,e=>{if(!h)return;let t=r(e,u);m(t.x-g.x,t.y-g.y,h)});let _=()=>{h=void 0,f.style.cursor=`grab`};f.addEventListener(`pointerup`,_),f.addEventListener(`pointercancel`,_);let v=t=>{for(let n of s){let r=e(l,`tool-${n.key}`),i=n.key===t;i?r.setAttribute(`data-selected`,``):r.removeAttribute(`data-selected`),r.style.background=i?`rgb(255 255 255 / 0.3)`:`rgb(255 255 255 / 0.08)`,r.style.borderColor=i?`rgb(255 255 255 / 0.52)`:`rgb(255 255 255 / 0.14)`}let n=s.find(e=>e.key===t);p.dataset.tool=t,p.textContent=n?n.name.toLowerCase():`none`},y=t=>{u.dataset.shot=t,u.style.background=c[t]??``;for(let n of[`1`,`2`,`3`]){let r=e(l,`thumb-${n}`);n===t?r.setAttribute(`data-selected`,``):r.removeAttribute(`data-selected`),r.style.borderColor=n===t?`rgb(255 255 255 / 0.92)`:`rgb(255 255 255 / 0.28)`}};for(let t of s)e(l,`tool-${t.key}`).addEventListener(`click`,()=>v(t.key));for(let t of[`1`,`2`,`3`])e(l,`thumb-${t}`).addEventListener(`click`,()=>y(t));y(`1`)}export{l as mount};