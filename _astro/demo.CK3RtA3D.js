import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={width:400,height:168},r={width:96,height:28},i={width:132,height:54},a={"block-end":{anchor:{left:152,top:70},box:{left:134,top:106},code:`position-area: block-end`,note:`The default: the box sits under its anchor and centred on it.`},"block-start":{anchor:{left:152,top:70},box:{left:134,top:8},code:`position-area: block-start`,note:`Same tether, other side. Nothing was measured to place it.`},"inline-end":{anchor:{left:152,top:70},box:{left:256,top:57},code:`position-area: inline-end`,note:`Beside the anchor, in logical terms, so a mirrored page follows.`},fallback:{anchor:{left:274,top:96},box:{left:256,top:34},ghost:{left:256,top:132},code:`position-try-fallbacks: flip-block`,note:`Below would run off the page (dashed), so the first fallback wins.`}};function o(o){let s=[`92%`,`78%`,`86%`,`70%`,`88%`].map(e=>`<div class="sp-line" style="width: ${e}"></div>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 274px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Placement</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="block-end" data-axis="Side">
            <button class="sp-segment" type="button" data-part="seg-below" value="block-end">below</button>
            <button class="sp-segment" type="button" data-part="seg-above" value="block-start">above</button>
            <button class="sp-segment" type="button" data-part="seg-beside" value="inline-end">beside</button>
            <button class="sp-segment" type="button" data-part="seg-edge" value="fallback">at the edge</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px">
          <div
            data-part="scene"
            data-place="block-end"
            style="position: relative; flex: 0 0 auto; width: ${n.width}px; height: ${n.height}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div class="sp-context sp-stack" aria-hidden="true" style="position: absolute; inset: 0; padding: 12px; gap: 9px">${s}</div>
            <div
              data-part="ghost"
              hidden
              style="position: absolute; width: ${i.width}px; height: ${i.height}px; border: 1px dashed var(--sp-warn); border-radius: var(--sp-radius)"
            >
              <span class="sp-label" style="position: absolute; left: 0; right: 0; top: 6px; text-align: center; color: var(--sp-warn)">requested</span>
            </div>
            <span
              class="sp-button sp-button--sm sp-context"
              data-part="anchor"
              style="position: absolute; display: inline-flex; align-items: center; justify-content: center; width: ${r.width}px; height: ${r.height}px; padding: 0; cursor: default; transition: left 0.26s var(--sp-ease), top 0.26s var(--sp-ease)"
            >Berth 14</span>
            <div
              class="sp-surface"
              data-part="box"
              data-subject
              style="position: absolute; display: flex; flex-direction: column; gap: 5px; width: ${i.width}px; height: ${i.height}px; padding: 8px; box-shadow: var(--sp-shadow); transition: left 0.26s var(--sp-ease), top 0.26s var(--sp-ease)"
            >
              <span class="sp-heading" style="font-size: 13px">Tide today</span>
              <div class="sp-line" style="width: 84%"></div>
              <div class="sp-line" style="width: 62%"></div>
            </div>
          </div>
          <span
            class="sp-label sp-context"
            data-part="code"
            style="flex: 0 0 auto; color: var(--sp-ink); padding: 3px 9px; border-radius: 5px; background: var(--sp-sunken); white-space: nowrap"
          ></span>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let c=e(o,`scene`),l=e(o,`anchor`),u=e(o,`box`),d=e(o,`ghost`),f=e(o,`code`),p=e(o,`readout`),m=e=>{let n=a[e];n&&(c.dataset.place=e,l.style.left=`${n.anchor.left}px`,l.style.top=`${n.anchor.top}px`,u.style.left=`${n.box.left}px`,u.style.top=`${n.box.top}px`,n.ghost&&(d.style.left=`${n.ghost.left}px`,d.style.top=`${n.ghost.top}px`),t(d,`hidden`,!n.ghost),f.textContent=n.code,p.textContent=n.note)};e(o,`switcher`).addEventListener(`change`,e=>m(e.detail)),m(`block-end`)}export{o as mount};