import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={s:{title:13,body:11,meta:10,gap:12,name:`Small`,stack:!1},m:{title:16,body:13,meta:11,gap:12,name:`Default`,stack:!1},l:{title:19,body:16,meta:13,gap:12,name:`Large`,stack:!1},xl:{title:23,body:20,meta:16,gap:2,name:`Accessibility XL`,stack:!0}},n=144;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Text size" data-value="m">${Object.entries(t).map(([e])=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e.toUpperCase()}</button>`).join(``)}</sp-segmented>
        </div>
        <div class="sp-surface" data-part="screen" style="height: ${n}px; padding: 12px; margin-top: 8px">
          <div class="sp-stack" data-part="notice" data-subject data-step="m" style="gap: 6px">
            <div data-part="head" data-flow="row"
                 style="display: flex; gap: 12px; align-items: baseline; justify-content: space-between">
              <span data-part="title" style="font-weight: 600; line-height: 1.25">Storage almost full</span>
              <span data-part="time" style="color: var(--sp-muted); line-height: 1.4; white-space: nowrap">2m ago</span>
            </div>
            <p data-part="body" style="margin: 0; line-height: 1.35">Backup needs more room before it can finish.</p>
          </div>
        </div>
        <div class="sp-row sp-context" data-part="readout" style="gap: 6px; height: 18px; margin-top: 6px">
          <span class="sp-label">reader's setting</span>
          <span class="sp-label" data-part="numbers" style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          The app asks for a role, never a number. At the accessibility step the timestamp leaves the
          title's line rather than shortening it.
        </p>
      </div>
    </div>
  `;let i=e(r,`notice`),a=e(r,`head`),o=e(r,`title`),s=e(r,`time`),c=e(r,`body`),l=e(r,`numbers`),u=e=>{let n=t[e];n&&(i.dataset.step=e,o.style.fontSize=`${n.title}px`,s.style.fontSize=`${n.meta}px`,c.style.fontSize=`${n.body}px`,a.style.gap=`${n.gap}px`,a.style.flexDirection=n.stack?`column`:`row`,a.style.alignItems=n.stack?`flex-start`:`baseline`,a.dataset.flow=n.stack?`stack`:`row`,l.textContent=n.name)};u(`m`),e(r,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{r as mount};