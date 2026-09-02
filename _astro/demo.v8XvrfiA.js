import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[4,8,12,16,24,32,48],r=e=>`space-${e/4}`,i={scale:{pad:16,row:8,block:24,note:`Padding 16, row gap 8, block gap 24: three steps off the ladder, and nothing invented.`},off:{pad:13,row:7,block:22,note:`Padding 13, row gap 7, block gap 22: each one defensible on its own, none of them on the ladder.`}};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Card values</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Spacing" data-part="switcher" data-value="scale">
            <button class="sp-segment" type="button" data-part="seg-scale" value="scale">on the scale</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">off the scale</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 28px">
            <div class="sp-stack" data-part="ruler" data-subject data-mode="scale" style="gap: 6px">
              <span class="sp-label" style="color: var(--sp-ink)">Allowed steps</span>
              ${n.map(e=>`
      <div class="sp-row" data-part="step-${e}" style="gap: 8px; height: 16px">
        <span class="sp-label" style="flex: 0 0 auto; width: 56px">${r(e)}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 24px; text-align: right; font-variant-numeric: tabular-nums">${e}</span>
        <span data-part="bar-${e}" style="height: 10px; width: ${e}px; border-radius: 3px; background: var(--sp-line)"></span>
      </div>`).join(``)}
            </div>
            <div
              class="sp-surface sp-context"
              data-part="card"
              data-mode="scale"
              style="width: 214px; height: 164px; padding: 16px; display: flex; flex-direction: column"
            >
              <div class="sp-row" data-part="card-head" style="gap: 8px">
                <span class="sp-avatar" style="width: 24px; height: 24px">KE</span>
                <span class="sp-heading" style="font-size: 13px">Kestrel</span>
              </div>
              <div class="sp-stack" data-part="card-body" style="gap: 8px; margin-top: 24px">
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 74%"></div>
              </div>
              <div class="sp-row" data-part="card-foot" style="margin-top: 24px">
                <span class="sp-button sp-button--sm" style="cursor: default">Open</span>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 34px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let o=e(a,`ruler`),s=e(a,`card`),c=e(a,`card-head`),l=e(a,`card-body`),u=e(a,`card-foot`),d=e(a,`readout`),f=n.map(t=>({value:t,row:e(a,`step-${t}`),bar:e(a,`bar-${t}`)})),p=e=>{let n=i[e];if(!n)return;o.dataset.mode=e,s.dataset.mode=e,s.style.padding=`${n.pad}px`,c.style.gap=`${n.row}px`,l.style.gap=`${n.row}px`,l.style.marginTop=`${n.block}px`,u.style.marginTop=`${n.block}px`;let r=new Set([n.pad,n.row,n.block]);for(let{value:e,row:n,bar:i}of f){let a=r.has(e);t(n,`data-used`,a),i.style.background=a?`var(--sp-accent)`:`var(--sp-line)`}d.textContent=n.note};e(a,`switcher`).addEventListener(`change`,e=>p(e.detail)),p(`scale`)}export{a as mount};