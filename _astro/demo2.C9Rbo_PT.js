import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=440,i=178,a=136,o=84,s=92,c={beside:`Wide window: the pane sits beside the focus pane and takes about a third of it.`,below:`Narrower: a third of this window would be too narrow to read, so the pane drops below.`,behind:`Narrowest: no room beside or below, so the pane waits behind a control and arrives as a sheet.`},l={position:`absolute`,width:`auto`,height:`${s}px`,borderTop:`1px solid var(--sp-line)`,borderLeft:`0`,boxShadow:`var(--sp-shadow)`,clipPath:`inset(100% 0 0 0)`,opacity:`0`,visibility:`hidden`},u={clipPath:`inset(0 0 0 0)`,opacity:`1`,visibility:`visible`},d={beside:{position:`static`,width:`${a}px`,height:`auto`,borderTop:`0`,borderLeft:`1px solid var(--sp-line)`,boxShadow:`none`,clipPath:`none`,opacity:`1`,visibility:`visible`},below:{position:`static`,width:`auto`,height:`${o}px`,borderTop:`1px solid var(--sp-line)`,borderLeft:`0`,boxShadow:`none`,clipPath:`none`,opacity:`1`,visibility:`visible`},behind:l},f=(e,t)=>`
  <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 10px; font-size: 12px">
    ${t}
  </button>`,p=(e,t)=>`
  <span style="display: flex; align-items: center; gap: 7px; flex: 0 0 auto; height: 18px">
    <span class="sp-avatar" style="width: 18px; height: 18px; font-size: 9px">${e}</span>
    <span class="sp-line" style="flex: 1 1 auto; width: ${t}%; height: 6px"></span>
  </span>`,m=e=>e.map(e=>`<span class="sp-line" style="flex: 0 0 auto; width: ${e}%; height: 7px"></span>`).join(``);function h(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Review</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="sizes" data-axis="Placement" data-value="beside">
            ${f(`beside`,`beside`)}${f(`below`,`below`)}${f(`behind`,`behind`)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="window"
            data-placement="beside"
            style="position: relative; display: flex; flex: 0 0 auto; width: ${r}px; height: ${i}px;
                   overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius)"
          >
            <div
              class="sp-context"
              data-part="focus"
              style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0; min-height: 0; padding: 10px 12px"
            >
              <span style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: 24px">
                <span class="sp-heading sp-grow" style="font-size: 12px">Berth agreement</span>
                <span style="display: flex; justify-content: flex-end; flex: 0 0 auto; width: 104px; height: 24px">
                  <button
                    class="sp-button sp-button--ghost sp-button--sm"
                    type="button"
                    data-part="open-support"
                    hidden
                    style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; font-size: 11px"
                  >
                    ${n(`inbox`)} Comments
                  </button>
                </span>
              </span>
              <div class="sp-scroll" style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-height: 0">
                ${m([96,88,93,72,90,84,66,91,58])}
              </div>
            </div>

            <div
              data-part="support"
              data-subject
              data-placement="beside"
              style="display: flex; flex-direction: column; gap: 6px; left: 0; right: 0; bottom: 0; z-index: 1;
                     flex: 0 0 auto; width: ${a}px; padding: 8px; overflow: hidden;
                     background: var(--sp-surface); border-left: 1px solid var(--sp-line);
                     transition: clip-path 0.26s var(--sp-ease), opacity 0.2s, visibility 0.26s"
            >
              <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 20px">
                <span class="sp-label sp-grow">Comments</span>
                <span style="display: flex; justify-content: flex-end; flex: 0 0 auto; width: 20px; height: 20px">
                  <button class="sp-icon-button" type="button" data-part="close-support" aria-label="Close" hidden style="width: 20px; height: 20px">
                    ${n(`close`)}
                  </button>
                </span>
              </span>
              ${p(`RA`,100)}${p(`MK`,82)}
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; height: 40px; max-width: ${r}px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let s=e(o,`window`),h=e(o,`support`),g=e(o,`open-support`),_=e(o,`close-support`),v=e(o,`readout`),y=e=>{let n=d[e],r=c[e];!n||!r||(s.dataset.placement=e,h.dataset.placement=e,s.style.flexDirection=e===`beside`?`row`:`column`,Object.assign(h.style,n),t(g,`hidden`,e!==`behind`),t(_,`hidden`,e!==`behind`),v.textContent=r)};g.addEventListener(`click`,()=>{h.dataset.placement===`behind`&&Object.assign(h.style,u)}),_.addEventListener(`click`,()=>{h.dataset.placement===`behind`&&Object.assign(h.style,l)}),e(o,`sizes`).addEventListener(`change`,e=>y(e.detail)),y(`beside`)}export{h as mount};