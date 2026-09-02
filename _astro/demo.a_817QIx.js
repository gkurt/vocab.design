import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#d2453b`,n=`#2f7d5b`,r=`#c1443b`,i=`repeating-linear-gradient(45deg, rgb(255 255 255 / 0.62) 0 3px, transparent 3px 7px)`,a={redundant:{cues:`Asterisk, underline, pattern`,caption:`Every difference is said twice, so none of it depends on telling one hue from another.`},hue:{cues:`None. Hue is the only difference.`,caption:`The marks are gone and hue carries the meaning alone. This is the 1.4.1 failure.`}},o=`width: 30px; border-radius: 3px 3px 0 0`,s=`width: 30px; text-align: center; font-size: 10px`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="redundant" data-axis="Coded with" data-term="redundant">
            <button class="sp-segment" data-part="seg-redundant" value="redundant">Colour plus a mark</button>
            <button class="sp-segment" data-part="seg-hue" value="hue">Colour only</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="example" data-subject data-pose="[data-mode=redundant]" data-mode="redundant"
             style="margin-top: 12px; padding: 12px 14px; display: flex; gap: 18px; align-items: flex-start">
          <div style="flex: 1 1 auto; min-width: 0">
            <div class="sp-row" style="gap: 4px; height: 16px">
              <span class="sp-text sp-text--ink" data-part="field-label" style="font-size: 12px">Work email</span>
              <span data-part="star" style="color: ${t}; font-size: 12px; line-height: 1">*</span>
              <span data-part="required-word" style="color: ${t}; font-size: 11px">required</span>
            </div>
            <div class="sp-input" style="margin-top: 5px; border-color: ${t}; color: var(--sp-muted)">ada@</div>
            <p class="sp-text" style="margin: 10px 0 0; font-size: 12px">
              We only use it for <a href="#" data-part="link" data-cue="underline"
              style="color: var(--sp-accent); text-decoration: underline">delivery updates</a>.
            </p>
          </div>

          <div style="flex: 0 0 auto">
            <span class="sp-label" style="display: block">Deliveries</span>
            <div class="sp-row" style="gap: 10px; margin-top: 6px; height: 46px; align-items: flex-end">
              <span data-part="bar-a" style="${o}; height: 40px; background: ${n}"></span>
              <span data-part="bar-b" style="${o}; height: 26px; background: ${r}; background-image: ${i}"></span>
            </div>
            <div class="sp-row" data-part="series-labels" style="gap: 10px; margin-top: 4px; height: 14px">
              <span class="sp-text" style="${s}">Sent</span>
              <span class="sp-text" style="${s}">Late</span>
            </div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Second cue</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-state="redundant"
                style="font-size: 12px; white-space: nowrap">${a.redundant.cues}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="redundant"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${a.redundant.caption}</p>
      </div>
    </div>
  `;let l=e(c,`example`),u=e(c,`field-label`),d=e(c,`star`),f=e(c,`required-word`),p=e(c,`link`),m=e(c,`bar-b`),h=e(c,`series-labels`),g=e(c,`readout`),_=e(c,`caption`),v=e=>{let n=e===`redundant`;l.dataset.mode=e,d.style.visibility=n?`visible`:`hidden`,f.style.visibility=n?`visible`:`hidden`,h.style.visibility=n?`visible`:`hidden`,u.style.color=n?``:t,p.dataset.cue=n?`underline`:`hue`,p.style.textDecoration=n?`underline`:`none`,m.style.backgroundImage=n?i:`none`,g.dataset.state=e,g.textContent=a[e].cues,_.dataset.case=e,_.textContent=a[e].caption};e(c,`segmented`).addEventListener(`change`,e=>{v(e.detail===`hue`?`hue`:`redundant`)})}export{c as mount};