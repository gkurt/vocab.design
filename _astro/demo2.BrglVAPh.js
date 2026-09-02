import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n={w:408,h:176},r={x:368,y:16},i=32,a=412,o=900,s=60,c=`cubic-bezier(0.2, 0, 0.1, 1)`,l=e=>`circle(${e}px at ${r.x}px ${r.y}px)`,u=(e,t)=>`
  <div class="sp-row sp-row--between">
    <span class="sp-text sp-text--ink">${e}</span>
    <span class="sp-text sp-text--ink" style="font-variant-numeric: tabular-nums">${t}</span>
  </div>`;function d(r,d){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="rest" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
          <span class="sp-text" data-part="readout" style="width: 176px; text-align: right; white-space: nowrap">Uncovered</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div style="position: relative; width: ${n.w}px; height: ${n.h}px">
            <div
              class="sp-context"
              data-part="placeholder"
              aria-hidden="true"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                     border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-label">The panel already has this room</span>
            </div>
            <div
              data-part="panel"
              data-subject
              data-clip="open"
              style="position: absolute; inset: 0; padding: 14px 16px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius);
                     clip-path: ${l(a)}"
            >
              <div class="sp-row sp-row--between">
                <span class="sp-heading">Order 4471</span>
                <span class="sp-chip" data-part="badge" style="border-color: var(--sp-accent); background: var(--sp-accent-soft)">Shipped</span>
              </div>
              <div class="sp-stack" style="margin-top: 12px; gap: 8px">
                ${u(`Stovetop kettle, matte black`,`64.00`)}
                ${u(`Filter papers, two packs`,`8.50`)}
                ${u(`Delivery, Thursday`,`3.95`)}
              </div>
              <div class="sp-divider" style="margin: 12px 0"></div>
              <div class="sp-row sp-row--between">
                <span class="sp-label">Total</span>
                <span class="sp-heading" style="font-variant-numeric: tabular-nums">76.45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(r,`scene`),p=e(r,`panel`),m=e(r,`readout`),h,g=()=>{p.dataset.clip=`open`,f.dataset.state=`revealed`,m.textContent=`Uncovered`},_=()=>{if(d.clearTimeout(h),t(r)){p.style.transition=`none`,p.style.clipPath=l(a),g();return}p.style.transition=`none`,p.style.clipPath=l(i),p.offsetWidth,p.style.transition=`clip-path ${o}ms ${c} ${s}ms`,p.style.clipPath=l(a),p.dataset.clip=`growing`,f.dataset.state=`revealing`,m.textContent=`Clip growing from the corner`,h=d.setTimeout(g,1020)};e(r,`replay`).addEventListener(`click`,_),_()}export{d as mount};