import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=123,r={false:{height:85,inner:`
      <span style="width: 64px; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
      <span class="sp-heading" style="font-size: 12px">The Kestrel Review</span>
      <span class="sp-label" style="font-size: 10px">Issue 44, February</span>`,layout:`flex-direction: column; align-items: center; justify-content: center; gap: 8px`},fixed:{height:44,inner:`
      <span class="sp-divider sp-grow"></span>
      <span class="sp-label" style="font-size: 10px">Part one ends here</span>
      <span class="sp-divider sp-grow"></span>`,layout:`flex-direction: row; align-items: center; gap: 10px; padding: 0 14px`}},i={false:`The band fills the last of the screen and reads as an ending. Two sections sit under it.`,fixed:`The same band, cut short, plus a cue: the next section now breaks the bottom edge.`},a=(e,t)=>`
  <div class="sp-surface sp-row" style="height: 40px; gap: 10px; padding: 0 10px">
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${e}</span>
    <span class="sp-label" style="font-size: 10px">${t}</span>
  </div>`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">The Kestrel Review</span>
          <span class="sp-label" style="font-size: 11px">Long read</span>
        </div>

        <div
          class="sp-scroll"
          data-part="page"
          data-at="top"
          style="flex: 1 1 auto; min-height: 0; background: var(--sp-surface); scrollbar-width: none"
        >
          <div class="sp-context sp-stack" style="height: ${n}px; gap: 8px; padding: 12px 14px 0">
            <span class="sp-heading" style="font-size: 14px">The harbour that outlived its fleet</span>
            <div class="sp-stack" style="gap: 7px">${[`96%`,`88%`,`93%`,`79%`,`61%`].map(e=>`<span class="sp-line" style="width: ${e}"></span>`).join(``)}</div>
          </div>

          <div
            data-part="band"
            data-subject
            data-mode="false"
            data-pose="[data-mode=false]"
            style="display: flex; height: ${r.false.height}px; background: var(--sp-sunken); ${r.false.layout}"
          >${r.false.inner}</div>

          <div class="sp-row sp-context" data-part="continue" hidden style="height: 26px; justify-content: center; gap: 6px">
            ${t(`chevronDown`)}
            <span class="sp-label" style="font-size: 10px">Keep reading</span>
          </div>

          <div class="sp-context sp-stack" style="gap: 8px; padding: 12px 14px 16px">
            <span class="sp-heading" data-part="more-title" style="font-size: 12px">More in this issue</span>
            ${a(`A ferry timetable, read as history`,`6 min`)}
            ${a(`The last chandlery on the quay`,`9 min`)}
          </div>
        </div>
      </div>

              <span class="sp-text" data-stage-verdict data-part="note" style="width: 272px; height: 34px; font-size: 11px">${i.false}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Closing band" data-term="false" data-part="pick" data-value="false">
          <button class="sp-segment" data-part="pick-false" value="false" style="padding: 5px 9px; font-size: 12px">False bottom</button>
          <button class="sp-segment" data-part="pick-fixed" value="fixed" style="padding: 5px 9px; font-size: 12px">Continuity cue</button>
        </sp-segmented>
      
    </div>
  `;let s=e(o,`page`),c=e(o,`band`),l=e(o,`continue`),u=e(o,`note`),d=e=>{let t=r[e];c.dataset.mode=e,c.setAttribute(`style`,`display: flex; height: ${t.height}px; background: var(--sp-sunken); ${t.layout}`),c.innerHTML=t.inner,l.hidden=e===`false`,u.textContent=i[e]};s.addEventListener(`scroll`,()=>{s.dataset.at=s.scrollTop>8?`below`:`top`}),e(o,`pick`).addEventListener(`change`,e=>{d(e.detail)}),d(`false`)}export{o as mount};