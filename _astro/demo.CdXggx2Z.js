import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:300,h:148},n={x:132,y:62},r={card:`The card answered`,image:`The photo answered`,overlay:`The gradient overlay answered`,badge:`The badge answered`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gallery</span>
          <span class="sp-text" data-part="readout" data-hit="none" style="width: 214px; text-align: right; white-space: nowrap">Nothing clicked yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="stack"
            data-subject
            data-layer="card"
            data-rule="auto"
            style="position: relative; width: ${t.w}px; height: ${t.h}px; overflow: hidden"
          >
            <span
              data-part="image"
              data-layer="image"
              style="position: absolute; inset: 0; background: linear-gradient(150deg, #24303d, #4a7290 58%, #8fb8c9)"
            ></span>
            <span
              data-part="overlay"
              data-layer="overlay"
              style="position: absolute; inset: 0; background: linear-gradient(180deg, rgb(16 24 40 / 0) 44%, rgb(16 24 40 / 0.62))"
            >
              <span style="position: absolute; left: 12px; bottom: 10px; color: #ffffff; font-size: 12px; font-weight: 500">Harbour at dusk</span>
            </span>
            <span class="sp-chip" data-part="badge" data-layer="badge" style="position: absolute; right: 10px; top: 10px; cursor: default">RAW</span>
            <span
              data-part="aim-photo"
              style="position: absolute; left: ${n.x-9}px; top: ${n.y-9}px; width: 18px; height: 18px; pointer-events: none"
            ></span>
          </div>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Overlay" data-part="mode" data-value="auto">
            <button class="sp-segment" data-part="mode-auto" value="auto" style="padding: 5px 10px">pointer-events: auto</button>
            <button class="sp-segment" data-part="mode-none" value="none" style="padding: 5px 10px">none</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;let a=e(i,`stack`),o=e(i,`overlay`),s=e(i,`readout`),c=e(i,`mode`),l=a.getRootNode(),u=(e,t)=>l.elementFromPoint?l.elementFromPoint(e,t):document.elementFromPoint(e,t),d=(e,t)=>{s.dataset.hit=e,s.textContent=t};a.addEventListener(`click`,e=>{let t=u(e.clientX,e.clientY)?.closest(`[data-layer]`),n=t instanceof HTMLElement?t.dataset.layer??`card`:`card`;d(n,r[n]??r.card??``)}),c.addEventListener(`change`,()=>{let e=c.value===`none`;o.style.pointerEvents=e?`none`:``,a.dataset.rule=e?`none`:`auto`,d(`none`,`Nothing clicked yet`)})}export{i as mount};