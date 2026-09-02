import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{r as t}from"./measure.DK7AY2_i.js";var n=300,r=156,i=76,a=52,o=`#e8590c`,s={key:`dots`,label:`Dots`,step:20,color:`var(--sp-surface)`,image:`radial-gradient(circle at 1.6px 1.6px, var(--sp-line) 1.6px, transparent 1.9px)`,size:`20px 20px`},c=[s,{key:`graph`,label:`Graph paper`,step:16,color:`var(--sp-surface)`,image:[`linear-gradient(rgb(94 132 176 / 0.5) 1px, transparent 1px)`,`linear-gradient(90deg, rgb(94 132 176 / 0.5) 1px, transparent 1px)`,`linear-gradient(rgb(94 132 176 / 0.22) 1px, transparent 1px)`,`linear-gradient(90deg, rgb(94 132 176 / 0.22) 1px, transparent 1px)`].join(`, `),size:`80px 80px, 80px 80px, 16px 16px, 16px 16px`},{key:`blueprint`,label:`Blueprint`,step:24,color:`#16325e`,image:[`linear-gradient(rgb(203 224 255 / 0.55) 1px, transparent 1px)`,`linear-gradient(90deg, rgb(203 224 255 / 0.55) 1px, transparent 1px)`,`linear-gradient(rgb(203 224 255 / 0.24) 1px, transparent 1px)`,`linear-gradient(90deg, rgb(203 224 255 / 0.24) 1px, transparent 1px)`].join(`, `),size:`120px 120px, 120px 120px, 24px 24px, 24px 24px`}],l=s,u={x:40,y:40},d=[{part:`mark-a`,x:226,y:42},{part:`mark-b`,x:74,y:118}];function f(e,t,n){return`
    <span data-part="${e}" aria-hidden="true"
          style="position: absolute; left: ${t-8}px; top: ${n-8}px; width: 16px; height: 16px">
      <span style="position: absolute; left: 0; top: 7px; width: 16px; height: 2px; background: ${o}"></span>
      <span style="position: absolute; left: 7px; top: 0; width: 2px; height: 16px; background: ${o}"></span>
    </span>`}function p(o){o.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <div class="sp-row sp-row--between sp-context" style="margin-bottom: 10px">
          <span class="sp-heading" data-part="heading" style="color: var(--sp-ink)">Layout board</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Register" data-value="${l.key}">
            ${c.map(e=>`<button type="button" class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          <div data-part="board" data-subject data-register="${l.key}"
               style="position: relative; flex: 0 0 ${n}px; height: ${r}px; overflow: hidden;
                      border-radius: var(--sp-radius); box-shadow: inset 0 0 0 1px var(--sp-line);
                      background-color: ${l.color}; background-image: ${l.image}; background-size: ${l.size}">
            ${d.map(e=>f(e.part,e.x,e.y)).join(``)}
            <div class="sp-context" data-part="card"
                 style="position: absolute; left: ${u.x}px; top: ${u.y}px; width: ${i}px; height: ${a}px;
                        display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 0 10px;
                        background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px;
                        box-shadow: 0 2px 8px rgb(16 24 40 / 0.18); cursor: grab; touch-action: none;
                        transition: left 0.09s var(--sp-ease), top 0.09s var(--sp-ease)">
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 62%"></span>
            </div>
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="flex: 0 0 124px; gap: 10px">
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Field spacing</span>
              <span data-part="readout-step" style="font-size: 15px; font-weight: 600">${l.step} px</span>
            </div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Position</span>
              <span data-part="readout-pos" style="font-size: 15px; font-weight: 600">${u.x}, ${u.y}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        The field is only a scaffold if the surface actually snaps to it.
      </p>
    </div>
  `;let s=e(o,`board`),p=e(o,`card`),m=e(o,`readout-step`),h=e(o,`readout-pos`),g=l,_={...u},v,y=(e,t)=>{let n=g.step;_={x:Math.max(0,Math.min(224,Math.round(e/n)*n)),y:Math.max(0,Math.min(104,Math.round(t/n)*n))},p.style.left=`${_.x}px`,p.style.top=`${_.y}px`,h.textContent=`${_.x}, ${_.y}`},b=e=>{let t=c.find(t=>t.key===e);t&&(g=t,s.dataset.register=t.key,s.style.backgroundColor=t.color,s.style.backgroundImage=t.image,s.style.backgroundSize=t.size,m.textContent=`${t.step} px`,y(_.x,_.y))};e(o,`segmented`).addEventListener(`change`,e=>b(e.detail)),p.addEventListener(`pointerdown`,e=>{e.isTrusted&&p.setPointerCapture(e.pointerId);let n=t(e,p);v={dx:n.x,dy:n.y}}),p.addEventListener(`pointermove`,e=>{if(!v)return;let n=t(e,s);y(n.x-v.dx,n.y-v.dy)});let x=()=>{v=void 0};p.addEventListener(`pointerup`,x),p.addEventListener(`pointercancel`,x)}export{p as mount};