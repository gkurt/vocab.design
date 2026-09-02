import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#2f3d8f`,n=`#ffffff`,r=`rgb(255 255 255 / 0.74)`,i=200,a=56,o=1.4,s=`width: ${Math.ceil(i*o)+4}px; height: ${Math.ceil(a*o)+2}px`,c={100:`At native size the two are indistinguishable, which is why this ships so often.`,140:`Zoomed, the live text is laid out again at the new size. The picture only gets bigger pixels.`},l=`flex: 1 1 auto; min-width: 0; font-size: 11px`;function u(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Page zoom" data-part="segmented" data-value="100">
            <button class="sp-segment" data-part="seg-100" value="100">100%</button>
            <button class="sp-segment" data-part="seg-140" value="140">140%</button>
          </sp-segmented>
        </div>

        <div data-part="scene" data-zoom="100" style="margin-top: 12px">
          <div class="sp-row" style="gap: 12px; align-items: flex-start">
            <div style="${s}">
              <div data-part="banner-text" data-subject
                   style="width: ${i}px; height: ${a}px; padding: 8px 12px; border-radius: 6px; overflow: hidden;
                          background: ${t}; color: ${n};
                          font-family: ui-sans-serif, system-ui, sans-serif">
                <div style="font-size: 15px; font-weight: 600; line-height: 1.2">Summer reading</div>
                <div style="margin-top: 2px; font-size: 11px; color: ${r}">Ends 31 August</div>
              </div>
            </div>
            <div class="sp-context" style="${l}">
              <span class="sp-label">Live text</span>
            </div>
          </div>

          <div class="sp-row" style="margin-top: 10px; gap: 12px; align-items: flex-start">
            <div style="${s}">
              <canvas data-part="banner-image" width="${i}" height="${a}"
                      style="width: ${i}px; height: ${a}px; border-radius: 6px; image-rendering: pixelated"></canvas>
            </div>
            <div class="sp-context" style="${l}">
              <span class="sp-label">Image of text</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="100"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${c[100]}</p>
      </div>
    </div>
  `;let d=e(u,`scene`),f=e(u,`banner-text`),p=e(u,`banner-image`),m=e(u,`caption`),h=p.getContext(`2d`);h&&(h.fillStyle=t,h.fillRect(0,0,i,a),h.fillStyle=n,h.font=`600 15px ui-sans-serif, system-ui, sans-serif`,h.fillText(`Summer reading`,12,24),h.fillStyle=r,h.font=`11px ui-sans-serif, system-ui, sans-serif`,h.fillText(`Ends 31 August`,12,38));let g=e=>{d.dataset.zoom=e;let t=e===`140`?String(o):`1`;f.style.setProperty(`zoom`,t),p.style.setProperty(`zoom`,t),m.dataset.case=e,m.textContent=c[e]};e(u,`segmented`).addEventListener(`change`,e=>{g(e.detail===`140`?`140`:`100`)})}export{u as mount};