import{n as e}from"./parts.C-YLuC7Q.js";var t=64,n=51.2,r={tidy:{used:21.4,note:``},loaded:{used:58.6,note:`Nearly full`}},i=e=>`${e.toFixed(1)} GB`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Storage</span>
          <span class="sp-text">Studio plan</span>
        </div>
        <div
          class="sp-progress sp-progress--meter"
          data-part="meter"
          data-subject
          data-zone="ok"
          role="meter"
          aria-label="Storage used"
          aria-valuemin="0"
          aria-valuemax="${t}"
          aria-valuenow="${r.tidy.used}"
          aria-valuetext="${i(r.tidy.used)} of ${i(t)} used"
          style="--sp-value: ${r.tidy.used/t*100}%; height: 10px; margin-top: 16px"
        >
          <div class="sp-progress-fill"></div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 20px">
          <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums">21.4 GB of 64.0 GB</span>
          <span class="sp-text" data-part="note"></span>
        </div>
        <div class="sp-row sp-context" style="margin-top: 16px">
          <button class="sp-button sp-button--sm" type="button" data-part="import-video">Import 4K footage</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="empty-trash">Empty trash</button>
        </div>
      </div>
    </div>
  `;let o=e(a,`meter`),s=e(a,`readout`),c=e(a,`note`),l=e=>{let{used:r,note:a}=e;o.style.setProperty(`--sp-value`,`${r/t*100}%`),o.dataset.zone=r>=n?`warn`:`ok`,o.setAttribute(`aria-valuenow`,String(r)),o.setAttribute(`aria-valuetext`,`${i(r)} of ${i(t)} used`),s.textContent=`${i(r)} of ${i(t)}`,c.textContent=a};e(a,`import-video`).addEventListener(`click`,()=>l(r.loaded)),e(a,`empty-trash`).addEventListener(`click`,()=>l(r.tidy)),l(r.tidy)}export{a as mount};