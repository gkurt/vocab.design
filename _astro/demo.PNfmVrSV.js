import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={w:240,h:180},r=84,i=n.h-r,a=620,o=240,s=(e,t,n)=>`
  <span class="sp-row sp-row--between" ${n?`data-part="${n}"`:``} style="font-size: 12px">
    <span style="color: var(--sp-muted)">${e}</span>
    <span>${t}</span>
  </span>`;function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fares</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Depth" data-term="dimensional" data-part="mode" data-value="dimensional">
            <button class="sp-segment" type="button" data-part="seg-dimensional" value="dimensional">Dimensional</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat">Flat</button>
          </sp-segmented>
        </div>

        <div class="sp-body sp-row" style="align-items: flex-start; gap: 14px">
          <div
            data-part="scene" data-mode="dimensional"
            style="position: relative; flex: 0 0 auto; width: ${n.w}px; height: ${n.h}px;
                   perspective: 760px; perspective-origin: 50% 0%"
          >
            <div
              class="sp-surface sp-context"
              style="position: absolute; left: 0; top: 0; z-index: 2; width: ${n.w}px; height: ${r}px;
                     display: flex; flex-direction: column; justify-content: space-between; padding: 12px 14px"
            >
              <span class="sp-heading" style="font-size: 13px">Kastellorizo ferry</span>
              <span class="sp-row sp-row--between" style="align-items: baseline">
                <span class="sp-label" style="font-size: 11px">Total</span>
                <span style="font-size: 17px; font-weight: 600">38.50</span>
              </span>
            </div>

            <div
              data-part="panel" data-subject data-pose="[data-mode=dimensional]"
              data-mode="dimensional" data-state="settled"
              style="position: absolute; left: 0; top: ${r}px; z-index: 1; width: ${n.w}px;
                     height: ${i}px; padding: 11px 14px; display: flex; flex-direction: column;
                     justify-content: space-between; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-top: 0; border-radius: 0 0 var(--sp-radius) var(--sp-radius);
                     transform-origin: top center; transform: rotateX(-90deg); visibility: hidden;
                     backface-visibility: hidden; will-change: transform"
            >
              ${s(`Adult fare`,`26.00`)}
              ${s(`Port fee`,`7.50`,`row-fee`)}
              ${s(`Booking`,`5.00`)}
              <span
                data-part="shade"
                style="position: absolute; inset: 0; pointer-events: none; opacity: 1;
                       border-radius: 0 0 var(--sp-radius) var(--sp-radius);
                       background: linear-gradient(to bottom, rgb(16 24 40 / 0.34), rgb(16 24 40 / 0.04))"
              ></span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Breakdown</span>
            <span class="sp-text--ink" data-part="where" style="font-size: 15px; font-weight: 600; line-height: 1.2">Hidden</span>
            <span class="sp-divider" style="margin: 1px 0"></span>
            <div class="sp-row" style="gap: 6px">
              <button class="sp-button sp-button--sm" type="button" data-part="show">Show</button>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="hide">Hide</button>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        Depth is a promise: it folds back into the edge it came out of.
      </p>
    </div>
  `;let u=e(c,`scene`),d=e(c,`panel`),f=e(c,`shade`),p=e(c,`where`),m=`dimensional`,h=!1,g,_=e=>{l.clearTimeout(g);let n=m===`dimensional`;if(d.style.transition=e?`transform ${a}ms var(--sp-ease), opacity ${o}ms linear, visibility ${a}ms linear`:`none`,f.style.transition=e?`opacity ${a}ms var(--sp-ease)`:`none`,d.style.transform=h||!n?`rotateX(0deg)`:`rotateX(-90deg)`,d.style.opacity=h||n?`1`:`0`,d.style.visibility=h?`visible`:`hidden`,f.style.opacity=n&&!h?`1`:`0`,d.dataset.mode=m,u.dataset.mode=m,t(u,`data-open`,h),p.textContent=h?`Showing`:`Hidden`,!e){d.dataset.state=`settled`;return}d.dataset.state=`moving`,g=l.setTimeout(()=>{d.dataset.state=`settled`},700)},v=e=>{h!==e&&(h=e,_(!0))};e(c,`show`).addEventListener(`click`,()=>v(!0)),e(c,`hide`).addEventListener(`click`,()=>v(!1)),e(c,`mode`).addEventListener(`change`,e=>{m=e.detail,_(!1)})}export{c as mount};