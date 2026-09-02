import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=450,r=180,i=4,a=[{key:`flat`,label:`flat`,w:320,h:150,axis:`row`,split:!1,note:`Flat: one continuous display, one pane. The fold is still there as a seam, so nothing that must be pressed goes on it.`,second:`detail`},{key:`book`,label:`book`,w:286,h:150,axis:`row`,split:!0,second:`detail`,note:`Book: the hinge runs vertically, so the app splits either side of it. Content left, detail right, and the fold falls in the gutter.`},{key:`tabletop`,label:`tabletop`,w:176,h:r,axis:`column`,split:!0,second:`controls`,note:`Tabletop: the hinge runs horizontally with the lower half on the desk, so content sits above the fold and the controls sit below it.`}],o=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">
    ${e.label}
  </button>`,s=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``);function c(c){let l=a[0];c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Foldable, posture</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="postures" data-axis="Fold" data-value="${l.key}">
            ${a.map(o).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${n}px; height: ${r}px">
            <div
              class="sp-context"
              data-part="device"
              style="flex: 0 0 auto; width: ${l.w}px; height: ${l.h}px; padding: 5px; border-radius: 13px;
                     background: var(--sp-ink); box-shadow: var(--sp-shadow);
                     transition: width 0.42s var(--sp-ease), height 0.42s var(--sp-ease)"
            >
              <div
                data-part="app"
                data-subject
                data-posture="${l.key}"
                style="position: relative; display: flex; flex-direction: ${l.axis}; width: 100%; height: 100%;
                       border-radius: 8px; overflow: hidden; background: var(--sp-surface)"
              >
                <div
                  data-part="pane-a"
                  style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; min-height: 0;
                         padding: 7px 8px; overflow: hidden"
                >
                  <span class="sp-label" style="font-size: 11px; color: var(--sp-ink)">Harbour survey</span>
                  <div style="display: flex; flex-direction: column; gap: 5px">${s([94,80,88,66])}</div>
                </div>
                <div
                  data-part="pane-b"
                  style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; min-height: 0;
                         padding: 7px 8px; overflow: hidden; background: var(--sp-sunken)"
                >
                  <div data-part="detail" style="display: flex; flex-direction: column; gap: 6px; min-width: 0">
                    <span class="sp-label" style="font-size: 11px">Detail</span>
                    <div class="sp-surface" style="display: flex; flex-direction: column; gap: 5px; padding: 8px">
                      ${s([88,62])}
                    </div>
                  </div>
                  <div data-part="controls" style="display: flex; flex-direction: column; gap: 8px; min-width: 0" hidden>
                    <span class="sp-label" style="font-size: 11px">Controls</span>
                    <div class="sp-row" style="gap: 4px">
                      <span class="sp-icon-button">${t(`chevronLeft`)}</span>
                      <span class="sp-icon-button">${t(`plus`)}</span>
                      <span class="sp-icon-button">${t(`chevronRight`)}</span>
                    </div>
                    <div class="sp-progress" style="--sp-value: 46%"><div class="sp-progress-fill"></div></div>
                  </div>
                </div>
                <div
                  data-part="seam"
                  aria-hidden="true"
                  style="position: absolute; background: var(--sp-line); pointer-events: none"
                ></div>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; height: 40px"></span>
        </div>
      </div>
    </div>
  `;let u=e(c,`device`),d=e(c,`app`),f=e(c,`pane-b`),p=e(c,`detail`),m=e(c,`controls`),h=e(c,`seam`),g=e(c,`readout`),_=e=>{let t=a.find(t=>t.key===e);if(!t)return;let n=t.axis===`row`;d.dataset.posture=t.key,d.style.flexDirection=t.axis,u.style.width=`${t.w}px`,u.style.height=`${t.h}px`,f.hidden=!t.split,p.hidden=t.second!==`detail`,m.hidden=t.second!==`controls`,f.style.borderLeft=n?`1px solid var(--sp-line)`:`0`,f.style.borderTop=n?`0`:`1px solid var(--sp-line)`,h.style.inset=n?`0 auto 0 calc(50% - ${i/2}px)`:`calc(50% - ${i/2}px) 0 auto 0`,h.style.width=n?`${i}px`:`auto`,h.style.height=n?`auto`:`${i}px`,g.textContent=t.note};e(c,`postures`).addEventListener(`change`,e=>_(e.detail)),_(l.key)}export{c as mount};