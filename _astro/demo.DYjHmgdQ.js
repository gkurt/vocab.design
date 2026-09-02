import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:156,h:108},n={x:12,y:12,w:90,h:84,r:10},r={x:62,y:14,d:82},i=r.d/2,a={x:r.x+i-n.x,y:r.y+i-n.y},o=`rgb(53 87 232 / 0.75)`,s=`rgb(226 84 58 / 0.75)`,c=`0.75`,l=[{key:`over`,label:`Over`,name:`source-over`,note:`The source lands on top. Where both cover the same pixel, both alphas contribute and neither wins outright.`},{key:`atop`,label:`Atop`,name:`source-atop`,note:`The source survives only where the backdrop already had coverage. Everything past that edge is discarded.`},{key:`out`,label:`Out`,name:`destination-out`,note:`The source is spent as a stencil: it removes the backdrop it covers and paints nothing of its own.`}],u=`over`,d=`radial-gradient(circle at ${a.x}px ${a.y}px, transparent ${i-.5}px, #000000 ${i+.5}px)`;function f(i){let a=l.find(e=>e.key===u)??l[0];if(!a)return;let f=(e,t)=>`
    <div class="sp-row" style="gap: 7px">
      <span class="sp-swatch" style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 3px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${t}"></span>
      <span class="sp-text sp-grow" style="font-size: 11px">${e}</span>
      <span class="sp-text sp-text--ink" style="font-size: 11px; font-variant-numeric: tabular-nums">alpha ${c}</span>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Operator" data-value="${u}">
            ${l.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-context" data-part="board" style="flex: 0 0 auto; position: relative; width: ${t.w+28}px;
               height: ${t.h+28}px; border-radius: var(--sp-radius); overflow: hidden;
               background-image: repeating-conic-gradient(var(--sp-line) 0% 25%, var(--sp-surface) 0% 50%);
               background-size: 14px 14px; box-shadow: inset 0 0 0 1px var(--sp-line)">

            <div data-part="stack" data-subject data-op="${u}"
                 style="position: absolute; left: 14px; top: 14px; width: ${t.w}px; height: ${t.h}px">
              <div data-part="dest" style="position: absolute; left: ${n.x}px; top: ${n.y}px; width: ${n.w}px;
                   height: ${n.h}px; border-radius: ${n.r}px; background: ${o}"></div>

              <div data-part="clip" hidden style="position: absolute; left: ${n.x}px; top: ${n.y}px; width: ${n.w}px;
                   height: ${n.h}px; border-radius: ${n.r}px; overflow: hidden">
                <div style="position: absolute; left: ${r.x-n.x}px; top: ${r.y-n.y}px; width: ${r.d}px;
                     height: ${r.d}px; border-radius: 50%; background: ${s}"></div>
              </div>

              <div data-part="src" style="position: absolute; left: ${r.x}px; top: ${r.y}px; width: ${r.d}px;
                   height: ${r.d}px; border-radius: 50%; background: ${s}"></div>

              <div data-part="stencil" hidden style="position: absolute; left: ${r.x}px; top: ${r.y}px; width: ${r.d}px;
                   height: ${r.d}px; border-radius: 50%; border: 2px dashed rgb(226 84 58 / 0.9)"></div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 7px">
            <span class="sp-text sp-text--ink" data-part="op-name" style="font-size: 11.5px">${a.name}</span>
            ${f(`Backdrop`,o)}
            ${f(`Source`,s)}
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 2px 0 0; height: 58px; font-size: 10.5px; line-height: 1.35">${a.note}</p>
          </div>
        </div>
      </div>
    </div>
  `;let p=e(i,`stack`),m=e(i,`dest`),h=e(i,`clip`),g=e(i,`src`),_=e(i,`stencil`),v=t=>{let n=l.find(e=>e.key===t);if(!n)return;p.dataset.op=t;let r=t===`out`?d:`none`;m.style.setProperty(`mask-image`,r),m.style.setProperty(`-webkit-mask-image`,r),g.hidden=t!==`over`,h.hidden=t!==`atop`,_.hidden=t!==`out`,e(i,`op-name`).textContent=n.name,e(i,`note`).textContent=n.note};v(u),e(i,`segmented`).addEventListener(`change`,e=>v(e.detail))}export{f as mount};