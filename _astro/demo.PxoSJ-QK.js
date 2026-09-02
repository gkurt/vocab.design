import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./motion.B5_YXmsy.js";var r=`#ffffff`,i=`#efefef`,a=120,o=56,s={slow:833,fast:125,over:0},c={slow:`0.6`,fast:`4`,over:`24`},l={slow:`0.6 a second`,fast:`4 a second`,over:`24 a second`},u={slow:`0.86`,fast:`0.86`,over:`0.03`},d={slow:`6,720px`,fast:`6,720px`,over:`62,376px`},f={slow:`yes`,fast:`yes`,over:`no`},p={slow:`Under three a second, so the thresholds never come into it.`,fast:`Over three a second and still below the threshold: the swing is too light, and the lamp too small, to count as a flash at all.`,over:`Not played. Twenty four a second at full contrast, over a region past the safe area, is the shape of the thing this criterion exists to stop.`};function m(m,h){m.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Asked for" data-part="picker" data-value="slow">
            <button class="sp-segment" type="button" data-part="seg-slow" value="slow"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">0.6 a second</button>
            <button class="sp-segment" type="button" data-part="seg-fast" value="fast"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">4 a second</button>
            <button class="sp-segment" type="button" data-part="seg-over" value="over"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">24 a second</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 8px; height: 152px; gap: 10px; align-items: stretch">
          <div class="sp-surface" data-part="region" data-subject data-rate="slow"
               style="flex: 1 1 auto; min-width: 0; padding: 10px; display: flex; flex-direction: column;
                      gap: 8px; align-items: center">
            <div data-part="lamp"
                 style="width: ${a}px; height: ${o}px; flex: 0 0 auto; border-radius: 6px;
                        background: ${r}; border: 1px solid #d4d4d4; display: flex;
                        align-items: center; justify-content: center">
              <span data-part="still" hidden style="font-size: 10px; color: #6b6b6b">Still frame</span>
            </div>
            <span class="sp-text sp-context" data-stage-verdict data-part="verdict" data-state="slow"
                  style="min-height: 52px; font-size: 10.5px; line-height: 1.35">${p.slow}</span>
          </div>

          <div class="sp-surface sp-context" data-part="meter"
               style="flex: 0 0 176px; padding: 9px 10px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Rate</span>
              <span class="sp-text--ink" data-part="rate" data-hz="0.6" style="font-size: 11.5px">${l.slow}</span>
            </span>
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Darker state</span>
              <span class="sp-text--ink" data-part="darker" style="font-size: 11.5px">${u.slow}</span>
            </span>
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Lit area</span>
              <span class="sp-text--ink" data-part="area" style="font-size: 11.5px">${d.slow}</span>
            </span>
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Below threshold</span>
              <span class="sp-text--ink" data-part="exempt" data-ok="yes" style="font-size: 11.5px">${f.slow}</span>
            </span>
            <span class="sp-text" style="margin-top: 2px; font-size: 9.5px; line-height: 1.3">
              Limits: 3 a second, 10% swing, darker state 0.80, 21,824px. Saturated red counts separately.
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let g=e(m,`region`),_=e(m,`lamp`),v=e(m,`still`),y=e(m,`verdict`),b=e(m,`rate`),x=e(m,`darker`),S=e(m,`area`),C=e(m,`exempt`),w=n(m),T=0,E=!0,D=e=>{E=!E,_.style.background=E?r:i,T=h.setTimeout(()=>D(e),e)},O=e=>{h.clearTimeout(T),E=!0,_.style.background=r,g.dataset.rate=e,t(v,`hidden`,e!==`over`),y.dataset.state=e,y.textContent=p[e],b.dataset.hz=c[e],b.textContent=l[e],x.textContent=u[e],S.textContent=d[e],C.dataset.ok=f[e],C.textContent=f[e],s[e]&&!w&&D(s[e])};O(`slow`),e(m,`picker`).addEventListener(`change`,e=>{O(e.detail)})}export{m as mount};