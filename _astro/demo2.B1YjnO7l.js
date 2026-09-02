import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as t}from"./measure.DK7AY2_i.js";var n=`'Geist Variable', ui-sans-serif, system-ui, sans-serif`,r=`Handgloves`,i=34,a=[`1.8`,`2.3`,`2.8`],o=e=>a.includes(e),s=Math.round(i*2.8)+8;function c(c,l){let u=(e,t,n=``)=>`
    <span data-part="${e}" ${n} style="position: absolute; left: 0; right: 0; ${t}: 0; height: 0;
          background: color-mix(in oklab, var(--sp-accent) 32%, transparent)"></span>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Line height" data-value="1.8">
            ${a.map(e=>`<button class="sp-segment" data-part="seg-${e.replace(`.`,`-`)}" value="${e}">${e}</button>`).join(``)}
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; height: ${s}px; margin-top: 4px">
          <span data-part="box" style="position: relative; display: inline-block">
            <span data-part="line" data-leading="1.8"
                  style="display: block; font-family: ${n}; font-size: ${i}px; line-height: 1.8; white-space: nowrap">
              <span data-part="content" style="background: color-mix(in oklab, var(--sp-ink) 15%, transparent)">${r}</span>
            </span>
            ${u(`band-top`,`top`,`data-subject`)}
            ${u(`band-bottom`,`bottom`)}
          </span>
        </div>
        <div class="sp-row sp-row--between sp-context" style="height: 26px">
          <span class="sp-label" style="color: var(--sp-ink)">grey: content area</span>
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          The leftover is halved, never appended: one half above the letters, one below.
        </p>
      </div>
    </div>
  `;let d=e(c,`line`),f=e(c,`content`),p=e(c,`band-top`),m=e(c,`band-bottom`),h=e(c,`readout`),g=t(f).height,_=e=>{let t=Math.max(0,Math.round((i*Number(e)-g)/2));p.style.height=`${t}px`,m.style.height=`${t}px`,h.textContent=`${t}px above, ${t}px below`};_(`1.8`),l.setTimeout(()=>{g=t(f).height;let e=d.dataset.leading;e&&o(e)&&_(e)},400),e(c,`segmented`).addEventListener(`change`,e=>{let t=e.detail;o(t)&&(d.dataset.leading=t,d.style.lineHeight=t,_(t))})}export{c as mount};