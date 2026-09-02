import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={need:`Needs to set a value without a sustained precise drag.`,category:`Users with motor impairments cannot operate this control.`},i={need:`The need names the barrier and the fix in one sentence, and it reaches everyone the drag defeats, diagnosis or not.`,category:`A category invites one question instead: how many of our users are those? A count is not a specification.`},a=[{label:`Tremor, permanent`,named:!0},{label:`Switch access, one contact`,named:!0},{label:`Wrist in a cast, three weeks`,named:!1},{label:`Trackpad, no mouse`,named:!1},{label:`One hand, phone on a train`,named:!1}];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One barrier</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="framing" data-value="need" data-axis="Framing" data-term="need" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-need" value="need"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Functional need</button>
            <button class="sp-segment" type="button" data-part="seg-category" value="category"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Disability category</button>
          </sp-segmented>
        </div>

        <p class="sp-text sp-text--ink" data-part="statement" data-framing="need" data-subject
           data-pose="[data-framing=need]"
           style="margin: 9px 0 0; height: 46px; padding: 7px 10px; border-radius: 6px;
                  background: var(--sp-accent-soft); font-size: 12.5px; line-height: 1.35">${r.need}</p>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 168px; height: 138px; padding: 9px 10px">
            <span class="sp-label" style="font-size: 11px">The barrier</span>
            <div style="position: relative; height: 18px; margin-top: 10px">
              <div style="position: absolute; left: 0; right: 0; top: 7px; height: 5px; border-radius: 3px;
                          background: var(--sp-sunken)"></div>
              <div data-part="handle"
                   style="position: absolute; left: 62px; top: 0; width: 5px; height: 18px; border-radius: 2px;
                          background: var(--sp-ink)"></div>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 10.5px; line-height: 1.35">
              Crop handle, 5px, drag only. No keyboard equivalent, no numeric entry.</p>
          </div>

          <div class="sp-surface sp-context" style="flex: 1 1 auto; min-width: 0; height: 138px; padding: 9px 10px">
            <div class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">Readers it reaches</span>
              <span class="sp-text sp-text--ink" data-part="count" data-count="5"
                    style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">5 of 5</span>
            </div>
            <div class="sp-stack" style="gap: 2px; margin-top: 6px">
              ${a.map((e,t)=>`
    <div class="sp-row" data-part="reader-${t+1}" data-covered
         style="gap: 6px; height: 19px; color: var(--sp-ink)">
      <span data-part="mark-${t+1}" style="display: flex; flex: 0 0 auto; width: 16px; height: 16px"
        >${n(`check`)}</span>
      <span style="flex: 1 1 auto; min-width: 0; font-size: 11px; white-space: nowrap">${e.label}</span>
    </div>`).join(``)}
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-framing="need"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${i.need}</p>
      </div>
    </div>
  `;let s=e(o,`statement`),c=e(o,`caption`),l=e(o,`count`),u=a.map((t,n)=>({reader:t,el:e(o,`reader-${n+1}`),mark:e(o,`mark-${n+1}`)})),d=e=>{s.dataset.framing=e,s.textContent=r[e],c.dataset.framing=e,c.textContent=i[e];let o=0;for(let{reader:r,el:i,mark:a}of u){let s=e===`need`||r.named;s&&(o+=1),t(i,`data-covered`,s),i.style.color=s?`var(--sp-ink)`:`var(--sp-muted)`,a.innerHTML=n(s?`check`:`minus`)}l.dataset.count=String(o),l.textContent=`${o} of ${a.length}`};e(o,`framing`).addEventListener(`change`,e=>{d(e.detail)}),d(`need`)}export{o as mount};