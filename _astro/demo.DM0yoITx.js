import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=`<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="6.5" width="11" height="11" rx="1.5"/></svg>`,r=(e,t,n,r)=>`
  <button
    type="button"
    data-part="${e}"
    data-act="${t}"
    data-aim
    aria-label="${n}"
    style="width: 13px; height: 13px; padding: 0; border: 0; border-radius: 50%; background: ${r};
           box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.16); cursor: pointer"
  ></button>`,i=(e,t,n,r)=>`
  <button
    class="sp-icon-button"
    type="button"
    data-part="${e}"
    data-act="${t}"
    data-aim
    aria-label="${n}"
    style="width: 30px; height: 24px; border-radius: 4px"
  >${r}</button>`,a={macos:[r(`btn-close`,`close`,`Close`,`#ff5f57`),r(`btn-min`,`minimise`,`Minimise`,`#febc2e`),r(`btn-zoom`,`zoom`,`Zoom`,`#28c840`)].join(``),windows:[i(`btn-min`,`minimise`,`Minimise`,t(`minus`)),i(`btn-zoom`,`maximise`,`Maximise`,n),i(`btn-close`,`close`,`Close`,t(`close`))].join(``)},o={macos:`macOS: three discs at the left, close outermost.`,windows:`Windows: three glyphs at the right, close outermost.`},s={close:`Close quits the window, so it sits at the outer edge.`,minimise:`Minimise puts the window out of the way, not away.`,zoom:`Zoom fits the window to what is in it.`,maximise:`Maximise fills the screen with the window.`};function c(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 452px; height: 210px; box-shadow: var(--sp-shadow)">
        <div class="sp-topbar" data-part="titlebar" style="height: 34px; padding: 0 8px; gap: 8px">
          <div data-part="slot-left" style="display: flex; align-items: center; justify-content: flex-start; flex: 0 0 auto; width: 96px; height: 24px">
            <div data-part="cluster" data-subject data-platform="macos" data-side="left" style="display: flex; align-items: center; gap: 8px; height: 24px">
              ${a.macos}
            </div>
          </div>
          <span
            class="sp-context"
            data-part="title"
            style="flex: 1 1 auto; min-width: 0; font-size: 12px; font-weight: 500; text-align: center; white-space: nowrap; overflow: hidden"
          >Quarterly report.pdf</span>
          <div data-part="slot-right" style="display: flex; align-items: center; justify-content: flex-end; flex: 0 0 auto; width: 96px; height: 24px"></div>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 9px; padding: 16px 18px">
          <span class="sp-heading" style="font-size: 13px">Quarter in review</span>
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 96%"></div>
          <div class="sp-line" style="width: 64%"></div>
        </div>
      </div>

      <div class="sp-row sp-context" style="width: 452px; gap: 12px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Platform" data-part="picker" data-value="macos">
          <button class="sp-segment" type="button" data-part="seg-macos" value="macos" style="padding: 4px 10px; font-size: 12px">macOS</button>
          <button class="sp-segment" type="button" data-part="seg-windows" value="windows" style="padding: 4px 10px; font-size: 12px">Windows</button>
        </sp-segmented>
        <span
          class="sp-label sp-grow"
          data-stage-verdict
          data-part="action"
          data-act="none"
          role="status"
          style="height: 16px; font-size: 11px; line-height: 16px; text-align: right; white-space: nowrap; overflow: hidden"
        >${o.macos}</span>
      </div>
    </div>
  `;let n=e(t,`cluster`),r=e(t,`title`),i=e(t,`action`),c=e=>{let t=n.dataset.platform??`macos`;i.dataset.act=e,i.textContent=(e===`none`?o[t]:s[e])??``},l=i=>{let o=i!==`windows`;n.innerHTML=(o?a.macos:a.windows)??``,n.dataset.platform=o?`macos`:`windows`,n.dataset.side=o?`left`:`right`,n.style.gap=o?`8px`:`0`,e(t,o?`slot-left`:`slot-right`).append(n),e(t,`slot-left`).style.width=o?`96px`:`0px`,r.style.textAlign=o?`center`:`left`,c(`none`)};n.addEventListener(`click`,e=>{let t=e.target?.closest(`[data-act]`);t instanceof HTMLElement&&c(t.dataset.act??`none`)}),e(t,`picker`).addEventListener(`change`,e=>l(e.detail)),l(`macos`)}export{c as mount};