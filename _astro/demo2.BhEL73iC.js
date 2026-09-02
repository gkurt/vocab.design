import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={title:{line:`The Rise and Fall of a Harbour with No Ships`,note:`and, of and a stay down. "with" is the edge: Chicago keeps it down, AP raises it.`},sentence:{line:`The rise and fall of a harbour with no ships`,note:`The first word only, plus any name. The same line, one register quieter.`}},n=28;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 14px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="title" data-axis="Capitalisation" data-term="title">
            <button class="sp-segment" data-part="seg-title" value="title">Title</button>
            <button class="sp-segment" data-part="seg-sentence" value="sentence">sentence</button>
          </sp-segmented>
        </div>
        <div style="height: 56px; margin-top: 10px">
          <h3 data-part="headline" data-subject data-case="title" data-pose="[data-case=title]"
              style="margin: 0; font-size: 20px; font-weight: 600; line-height: ${n}px">${t.title?.line}</h3>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 6px 0 0; height: 34px; font-size: 12px; line-height: 17px"></p>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <div class="sp-stack sp-context" data-part="menu" style="gap: 5px">
          <span class="sp-label">File</span>
          <div class="sp-row" style="gap: 4px">
            <span class="sp-button sp-button--sm sp-button--quiet" data-part="menu-save">Save As</span>
            <span class="sp-button sp-button--sm sp-button--quiet" data-part="menu-duplicate">Duplicate Window</span>
            <span class="sp-button sp-button--sm sp-button--quiet" data-part="menu-trash">Move to Trash</span>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`headline`),a=e(r,`note`),o=e=>{let n=t[e];n&&(i.dataset.case=e,i.textContent=n.line,a.textContent=n.note)};o(`title`),e(r,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{r as mount};