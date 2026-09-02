import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[{key:`nontext`,number:`1.1.1`,title:`Non-text Content`,level:`a`,met:!0},{key:`error`,number:`3.3.1`,title:`Error Identification`,level:`a`,met:!0},{key:`contrast`,number:`1.4.3`,title:`Contrast (Minimum)`,level:`aa`,met:!0},{key:`target`,number:`2.5.8`,title:`Target Size (Minimum)`,level:`aa`,met:!1},{key:`enhanced`,number:`1.4.6`,title:`Contrast (Enhanced)`,level:`aaa`,met:!1}],r={a:`A`,aa:`AA`,aaa:`AAA`},i={a:[`a`],aa:[`a`,`aa`],aaa:[`a`,`aa`,`aaa`]},a={a:`Level A is the floor. Only the A criteria are in scope; everything above them is optional.`,aa:`AA is what a policy usually means: the A criteria plus the AA ones. One is unmet, so the claim fails.`,aaa:`AAA gathers criteria that cannot be met by all content, which is why WCAG advises against it site-wide.`};function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Level" data-part="segmented" data-value="aa">
            <button class="sp-segment" data-part="seg-a" value="a">A</button>
            <button class="sp-segment" data-part="seg-aa" value="aa">AA</button>
            <button class="sp-segment" data-part="seg-aaa" value="aaa">AAA</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="list" data-target="aa" style="margin-top: 10px; padding: 7px 10px">
          ${n.map(e=>`
    <div class="sp-row" data-part="row-${e.key}" data-scope="required" style="gap: 8px; height: 24px">
      <span data-part="mark-${e.key}" style="flex: 0 0 3px; height: 15px; border-radius: 2px; background: var(--sp-accent)"></span>
      <span class="sp-text" style="flex: 0 0 32px; font-size: 11px; font-variant-numeric: tabular-nums">${e.number}</span>
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; white-space: nowrap">${e.title}</span>
      <span class="sp-label" data-part="tag-${e.key}" ${e.key===`contrast`?`data-subject`:``} data-level="${e.level}"
            style="flex: 0 0 30px; text-align: center; font-size: 10px; font-weight: 600; padding: 2px 0; line-height: 1.2;
                   border: 1px solid var(--sp-line); border-radius: 5px; color: var(--sp-ink)">${r[e.level]}</span>
      <span class="sp-row" style="flex: 0 0 84px; gap: 4px; justify-content: flex-end; font-size: 10.5px; color: var(--sp-muted)">
        <span data-part="mark-icon-${e.key}" style="display: flex">${t(e.met?`check`:`alert`)}</span>
        <span data-part="verdict-${e.key}" style="white-space: nowrap">${e.met?`met`:`not met`}</span>
      </span>
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Criteria this claim has to satisfy</span>
          <span class="sp-text sp-text--ink" data-part="count" data-score="3-of-4"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">meets 3 of 4</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-target="aa"
           style="margin: 7px 0 0; height: 32px; font-size: 11px">${a.aa}</p>
      </div>
    </div>
  `;let s=e(o,`list`),c=e(o,`count`),l=e(o,`caption`),u=t=>{let r=i[t],u=0,d=0;for(let t of n){let n=r.includes(t.level);n&&(u+=1,t.met&&(d+=1)),e(o,`row-${t.key}`).dataset.scope=n?`required`:`extra`,e(o,`mark-${t.key}`).style.background=n?`var(--sp-accent)`:`transparent`,e(o,`mark-icon-${t.key}`).style.visibility=n?`visible`:`hidden`,e(o,`verdict-${t.key}`).textContent=n?t.met?`met`:`not met`:`not required`}s.dataset.target=t,c.dataset.score=`${d}-of-${u}`,c.textContent=`meets ${d} of ${u}`,l.dataset.target=t,l.textContent=a[t]};u(`aa`),e(o,`segmented`).addEventListener(`change`,e=>{u(e.detail)})}export{o as mount};