import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:320,h:208},n={cols:5,rows:5},r={clean:{opacity:0,note:`No mark at all: nothing here says this page is unfinished.`},light:{opacity:.16,note:`Tiled and turned across the whole page, faint enough to read through.`},heavy:{opacity:.5,note:`Heavy enough to survive a screenshot, and heavy enough to stop you reading.`}};function i(i){let a=Array.from({length:n.cols*n.rows},()=>`<span style="font-size: 13px; font-weight: 700; letter-spacing: 2px; white-space: nowrap; transform: rotate(-24deg)">DRAFT</span>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Service agreement</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Strength" data-part="picker" data-value="light">
            <button class="sp-segment" type="button" data-part="seg-clean" value="clean" style="padding: 4px 9px; font-size: 12px">Clean</button>
            <button class="sp-segment" type="button" data-part="seg-light" value="light" style="padding: 4px 9px; font-size: 12px">Watermarked</button>
            <button class="sp-segment" type="button" data-part="seg-heavy" value="heavy" style="padding: 4px 9px; font-size: 12px">Too heavy</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="sheet"
            style="position: relative; width: ${t.w}px; height: ${t.h}px; padding: 14px 16px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
          >
            <div class="sp-context">
              <span class="sp-heading" style="font-size: 12.5px">Renewal and notice</span>
              <p class="sp-text" style="margin: 7px 0 0; font-size: 11px; line-height: 1.5">
                This copy is circulated for review only and has not been signed by either party.
              </p>
              <p class="sp-text" style="margin: 7px 0 0; font-size: 11px; line-height: 1.5">
                Section 3 sets the renewal date. Section 4 sets the notice each side owes the other, and the
                form that notice has to take.
              </p>
              <p class="sp-text" style="margin: 7px 0 0; font-size: 11px; line-height: 1.5">
                Nothing in this copy is binding. Figures shown in Schedule B are still under discussion.
              </p>
            </div>

            <div
              data-part="mark"
              data-subject
              data-weight="light"
              aria-hidden="true"
              style="position: absolute; inset: 0; overflow: hidden; pointer-events: none; color: var(--sp-ink);
                     opacity: ${r.light.opacity}; transition: opacity 0.2s"
            >
              <div
                style="position: absolute; inset: 0; display: grid; grid-template-columns: repeat(${n.cols}, 1fr);
                       grid-template-rows: repeat(${n.rows}, 1fr); place-items: center"
              >${a}</div>
            </div>
          </div>
        </div>

        <span class="sp-label sp-context" data-stage-verdict data-part="note" data-state="light" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; height: 34px; padding: 0 16px; text-align: center; line-height: 1.4; font-size: 11px"
          >${r.light.note}</span
        >
      </div>
    </div>
  `;let o=e(i,`mark`),s=e(i,`note`),c=e(i,`picker`),l=e=>{o.dataset.weight=e,o.style.opacity=String(r[e].opacity),s.dataset.state=e,s.textContent=r[e].note};c.addEventListener(`change`,e=>l(e.detail)),l(`light`)}export{i as mount};