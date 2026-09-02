import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,n=`Hamburg`,r=[12,24,40],i=4/3,a={w:412,h:86,baseline:64};function o(e){let r=e*i,o={emTop:r*.81,top:r*.15,cap:r*.69,x:r*.48,width:r*4},s=document.createElement(`canvas`).getContext(`2d`);if(!s)return{em:r,...o};s.font=`${r}px ${t}`;let c=s.measureText(n),l=c.fontBoundingBoxAscent,u=c.fontBoundingBoxDescent;if(!l||!u)return{em:r,...o};let d=(r-(l+u))/2+l;return{em:r,emTop:r*l/(l+u),top:a.baseline-d,cap:s.measureText(`H`).actualBoundingBoxAscent||o.cap,x:s.measureText(`x`).actualBoundingBoxAscent||o.x,width:c.width||o.width}}function s(i){let s=(e,t)=>`
    <span class="sp-row" style="gap: 6px">
      <span style="width: 16px; height: 10px; ${e}"></span>
      <span class="sp-label">${t}</span>
    </span>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Georgia Regular</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="24" data-axis="Size">
            ${r.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}pt</button>`).join(``)}
          </sp-segmented>
        </div>
        <div data-part="slot" style="position: relative; width: ${a.w}px; height: ${a.h}px; margin-top: 6px">
          <div data-part="guides" style="position: absolute; inset: 0"></div>
          <span data-part="body" data-subject data-size="24"
                style="position: absolute; left: 0; border: 2px solid var(--sp-accent); border-radius: 2px;
                       pointer-events: none"></span>
          <span data-part="word" data-size="24"
                style="position: absolute; left: 0; line-height: 1; font-family: ${t};
                       white-space: nowrap">${n}</span>
        </div>
        <div class="sp-row sp-context" data-part="legend" style="gap: 16px; height: 18px; white-space: nowrap">
          ${s(`border: 2px solid var(--sp-accent)`,`body (1 em)`)}
          ${s(`background: color-mix(in oklab, var(--sp-accent) 14%, transparent)`,`x-height`)}
          ${s(`background: color-mix(in oklab, var(--sp-accent) 34%, transparent)`,`cap height`)}
        </div>
        <div class="sp-row sp-context" data-part="readout"
             style="gap: 16px; height: 20px; margin-top: 4px; white-space: nowrap;
                    font-variant-numeric: tabular-nums"></div>
      </div>
    </div>
  `;let c=e(i,`word`),l=e(i,`body`),u=e(i,`guides`),d=e(i,`readout`),f=e=>{let t=r.find(t=>String(t)===e);if(!t)return;let n=o(t),i=Math.round(n.width)+6;c.dataset.size=String(t),c.style.fontSize=`${n.em}px`,c.style.top=`${n.top}px`,l.dataset.size=String(t),l.style.width=`${i}px`,l.style.top=`${a.baseline-n.emTop}px`,l.style.height=`${n.em}px`;let s=(e,t,n)=>`<span style="position: absolute; left: 0; width: ${i}px; top: ${a.baseline-t}px;
             height: ${t-e}px; background: color-mix(in oklab, var(--sp-accent) ${n}%, transparent)"></span>`;u.innerHTML=[s(0,n.x,14),s(n.x,n.cap,34),`<span style="position: absolute; left: -8px; width: ${i+24}px; top: ${a.baseline-1}px;
             height: 2px; background: var(--sp-ink)"></span>`].join(``),d.innerHTML=[`${t}pt`,`body ${n.em.toFixed(1)}px`,`cap ${n.cap.toFixed(1)}px`,`x-height ${n.x.toFixed(1)}px`].map(e=>`<span class="sp-label">${e}</span>`).join(``)};f(`24`),e(i,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{s as mount};