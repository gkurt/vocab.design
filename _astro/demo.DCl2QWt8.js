import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`bare`,label:`spacing only`},{key:`boxed`,label:`one box`},{key:`nested`,label:`a box each`}],n=[{label:`Email digest`,on:!0},{label:`Push alerts`,on:!1},{label:`Sound`,on:!0}],r=42,i={bare:`Spacing alone: a careful reader can infer the group, and nothing states it.`,boxed:`One drawn box, with a title that names what the three controls have in common.`,nested:`A border per control: four boxes, and the grouping they were for has gone.`};function a(a){let o=n.map((e,t)=>`
      <div
        class="sp-context"
        data-part="row-${t+1}"
        style="display: flex; align-items: center; justify-content: space-between; flex: 0 0 auto;
               height: ${r}px; padding: 0 10px; border: 1px solid transparent; border-radius: 6px"
      >
        <span class="sp-text sp-text--ink" style="font-size: 13px">${e.label}</span>
        <button class="sp-switch" type="button" role="switch" aria-checked="${e.on}" aria-label="${e.label}"></button>
      </div>`).join(``);a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Grouped by</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Grouping" data-term="boxed" data-value="boxed">
            ${t.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            data-part="box"
            data-subject
            data-mode="boxed"
            data-drawn
            data-pose="[data-drawn]"
            style="display: flex; flex-direction: column; gap: 8px; width: 300px; height: 192px; padding: 12px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div style="flex: 0 0 auto; height: 18px">
              <span class="sp-label" data-part="box-title" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 12px; line-height: 18px">Notifications</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px">${o}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${i.boxed}</span>
    </div>
  `;let s=e(a,`box`),c=e(a,`box-title`),l=e(a,`note`),u=n.map((t,n)=>e(a,`row-${n+1}`)),d=e=>{let t=e!==`bare`;s.dataset.mode=e,t?s.dataset.drawn=``:delete s.dataset.drawn,s.style.background=e===`nested`?`var(--sp-sunken)`:t?`var(--sp-surface)`:`transparent`,s.style.borderColor=t?`var(--sp-line)`:`transparent`,c.hidden=!t;for(let t of u){let n=e===`nested`;n?t.dataset.nested=``:delete t.dataset.nested,t.style.borderColor=n?`var(--sp-line)`:`transparent`,t.style.background=n?`var(--sp-surface)`:`transparent`}l.textContent=i[e]??``};e(a,`modes`).addEventListener(`change`,e=>d(e.detail)),d(`boxed`)}export{a as mount};