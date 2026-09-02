import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:388,h:44},r=60,i=n.w/2,a=.18,o=Math.round(a*i),s=(e,t)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-7}px; top: ${n.h+1}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Controller</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 8px; padding: 12px 16px">
            <span class="sp-label sp-context">Left stick, horizontal axis</span>

            <div
              data-part="axis"
              data-out="ignored"
              style="position: relative; width: ${n.w}px; height: ${r}px; touch-action: none; user-select: none; cursor: ew-resize"
            >
              <span class="sp-context" style="position: absolute; left: 0; right: 0; top: 0; height: ${n.h}px; border-radius: 6px; background: var(--sp-sunken)"></span>

              <span
                data-part="band"
                data-subject
                style="position: absolute; left: ${i-o}px; top: 0; width: ${o*2}px; height: ${n.h}px; border-left: 2px dashed var(--sp-accent); border-right: 2px dashed var(--sp-accent); border-radius: 3px; background: var(--sp-accent-soft)"
              ></span>

              <span
                class="sp-context"
                data-part="thumb"
                style="position: absolute; left: ${i}px; top: 6px; width: 14px; height: ${n.h-12}px; margin-left: -7px; border-radius: 4px; background: var(--sp-ink)"
              ></span>

              <span style="position: absolute; inset: 0; pointer-events: none">
                ${s(`mark-centre`,i)}
                ${s(`mark-inside`,i+Math.round(.12*i))}
                ${s(`mark-outside`,i+Math.round(.62*i))}
              </span>
            </div>

            <div class="sp-row sp-context" style="justify-content: space-between">
              <span class="sp-label">full left</span>
              <span class="sp-label">dead zone ${Math.round(a*100)}%</span>
              <span class="sp-label">full right</span>
            </div>

            <div class="sp-divider sp-context"></div>

            <div class="sp-row sp-context" style="gap: 16px; align-items: flex-end">
              <div class="sp-stack" style="gap: 2px; width: 104px">
                <span class="sp-label">Stick reads</span>
                <span class="sp-heading" data-part="raw" style="font-variant-numeric: tabular-nums">0%</span>
              </div>
              <div class="sp-stack" style="gap: 2px; width: 104px">
                <span class="sp-label">Axis emits</span>
                <span class="sp-heading" data-part="emitted" style="font-variant-numeric: tabular-nums">0%</span>
              </div>
              <div class="sp-stack sp-grow" style="gap: 4px">
                <span class="sp-label">Output</span>
                <span style="position: relative; display: block; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
                  <span data-part="out-fill" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 0; border-radius: 999px; background: var(--sp-accent)"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`axis`),u=e(c,`thumb`),d=e(c,`raw`),f=e(c,`emitted`),p=e(c,`out-fill`),m=!1,h=e=>`${e>0?`+`:``}${Math.round(e*100)}%`,g=e=>{let r=Math.max(0,Math.min(n.w,t({clientX:e,clientY:0},l).x)),o=(r-i)/i,s=Math.abs(o)<=a?0:(Math.abs(o)-a)/.8200000000000001,c=s*Math.sign(o);u.style.left=`${r}px`,d.textContent=h(o),f.textContent=h(c),p.style.left=c>=0?`50%`:`${50-s*50}%`,p.style.width=`${s*50}%`,l.dataset.out=c===0?`ignored`:`live`};l.addEventListener(`pointerdown`,e=>{e.isTrusted&&l.setPointerCapture(e.pointerId),m=!0,g(e.clientX)}),c.addEventListener(`pointermove`,e=>{m&&g(e.clientX)});let _=()=>{m=!1};c.addEventListener(`pointerup`,_),c.addEventListener(`pointercancel`,_)}export{c as mount};