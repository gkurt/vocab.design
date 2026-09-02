import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif`,n=`'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif`,r=`Handgloves 0123`,i=30,a=406,o=54,s=200,c=(e,t)=>`<span style="position: absolute; left: 0; bottom: ${e}; width: ${a}px; height: 0; border-top: ${t}"></span>`,l=()=>`<span style="position: absolute; left: 0; bottom: 0; z-index: -1; width: ${a}px; height: 1ex;
     background: var(--sp-accent-soft); font-family: ${t}; font-size: ${i}px"></span>`,u=(e,t)=>`<span data-part="probe-${e}" style="position: absolute; left: -9999px; display: inline-block; width: 0;
     height: 1ex; font-family: ${t}; font-size: ${s}px"></span>`;function d(d){d.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Metrics" data-part="segmented" data-value="off">
            <button class="sp-segment" data-part="seg-declared" value="off">as declared</button>
            <button class="sp-segment" data-part="seg-tuned" value="on">size-adjust</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" style="margin-top: 12px">
          <span class="sp-label">requested</span>
        </div>
        <div class="sp-context" data-part="line-web"
             style="position: relative; z-index: 0; height: ${o}px; width: ${a}px; overflow: hidden;
                    white-space: nowrap; font-family: ${t}; font-size: ${i}px; line-height: ${o}px">
          <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
            ${l()}
            ${c(`0`,`1px solid var(--sp-line)`)}
          </span>${r}
        </div>
        <div class="sp-row sp-context" style="margin-top: 6px">
          <span class="sp-label">fallback</span>
        </div>
        <div data-part="fallback" data-subject data-tuned="off"
             style="position: relative; z-index: 0; height: ${o}px; width: ${a}px; overflow: hidden;
                    white-space: nowrap; font-family: ${n}; font-size: ${i}px; line-height: ${o}px">
          <span data-part="glyphs" style="font-size: ${i}px">
            <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
              ${l()}
              ${c(`0`,`1px solid var(--sp-line)`)}
              ${c(`1ex`,`1px dashed var(--sp-accent)`)}
            </span>${r}
          </span>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 4px">
          <span class="sp-text" data-part="readout"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          The tint is the x-height the real face would have brought, and the dashed rule is the one the
          stand-in brings. Closing that gap is arithmetic, not taste, and it is what stops a swap moving the page.
        </p>
        ${u(`web`,t)}${u(`fallback`,n)}
      </div>
    </div>
  `;let f=e(d,`fallback`),p=e(d,`glyphs`),m=e(d,`readout`),h=t=>e(d,`probe-${t}`).getBoundingClientRect().height/s,g=h(`web`)/h(`fallback`),_=i*g,v=Math.round(g*100),y=e=>{let t=e===`on`;f.dataset.tuned=t?`on`:`off`,p.style.fontSize=`${(t?_:i).toFixed(1)}px`,m.textContent=t?`font-size: ${i}px; size-adjust: ${v}%, drawn at ${_.toFixed(1)}px`:`font-size: ${i}px; size-adjust: none`};y(`off`),e(d,`segmented`).addEventListener(`change`,e=>y(e.detail))}export{d as mount};