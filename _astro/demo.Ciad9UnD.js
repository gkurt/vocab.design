import{n as e}from"./touch.Bg97t8LB.js";import{n as t,r as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var r={answers:`The sheet answers the scrub itself, so the gesture closes the sheet and leaves the list underneath exactly where it was.`,ignores:`The sheet ignores it, so the platform takes the scrub instead and steps back a level: the sheet goes, and so does the page it was covering.`};function i(i){i.innerHTML=`
    <div style="display: grid; gap: 10px; width: 476px; margin: 0 auto">
      <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scrub" data-part="mode" aria-label="When the sheet is scrubbed">
        <button class="sp-segment" type="button" value="answers" data-part="seg-answers">Sheet answers</button>
        <button class="sp-segment" type="button" value="ignores" data-part="seg-ignores">Sheet ignores</button>
      </sp-segmented>
      <div class="sp-frame sp-frame--wide" data-touch data-part="screen" data-result="open" style="position: relative; height: 168px; overflow: hidden">
        <div class="sp-stack" data-part="list" style="gap: 6px; padding: 12px">
          <span class="sp-label">Bookings</span>
          <div class="sp-row" style="gap: 6px"><span class="sp-chip">Tue 12</span><span class="sp-chip">Wed 13</span></div>
          <div class="sp-row" style="gap: 6px"><span class="sp-chip">Thu 14</span><span class="sp-chip">Fri 15</span></div>
        </div>
        <div class="sp-surface" data-part="sheet" data-subject data-open
          style="position: absolute; inset: auto 0 0 0; height: 118px; border-radius: 12px 12px 0 0; padding: 12px; display: grid; gap: 8px; align-content: start">
          <span class="sp-label">Filter</span>
          <div class="sp-row" style="gap: 6px"><span class="sp-chip">Morning</span><span class="sp-chip">Evening</span></div>
        </div>
        <div class="sp-surface" data-part="gone" hidden
          style="position: absolute; inset: 0; display: grid; place-items: center; gap: 4px">
          <span class="sp-text sp-text--quiet" style="font-size: 12px">Back at Home</span>
          <span class="sp-text sp-text--quiet" style="font-size: 11px">the bookings list was left behind too</span>
        </div>
      </div>
      <p class="sp-text sp-text--quiet" data-stage-verdict data-part="caption" style="margin: 0; min-height: 30px; font-size: 12px">${r.answers}</p>
    </div>`;let a=t(i,`sheet`),o=t(i,`screen`),s=t(i,`gone`),c=t(i,`caption`),l=t(i,`mode`),u=`answers`,d=()=>{a.setAttribute(`data-open`,``),a.hidden=!1,o.dataset.result=`open`,s.hidden=!0};l.addEventListener(`change`,()=>{u=l.value===`ignores`?`ignores`:`answers`;for(let e of n(i,`caption`))e.textContent=r[u];d()}),e(a,{onScrub:()=>{if(a.removeAttribute(`data-open`),a.hidden=!0,u===`answers`){o.dataset.result=`dismissed`;return}o.dataset.result=`stranded`,s.hidden=!1}}),d(),c.textContent=r.answers}export{i as mount};