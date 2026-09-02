import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=16,r=60,i=12,a=44,o=380,s=[{key:`on`,label:`on the keyline`},{key:`off`,label:`ragged`}],c={on:`Four leading elements of different widths, and one line the text starts on.`,off:`Text following each element instead: three rows now miss the line.`},l=[{key:`1`,lead:32,markup:`<span class="sp-avatar" style="width: 32px; height: 32px">AL</span>`,lines:[64,40]},{key:`2`,lead:24,markup:`<span class="sp-icon-button" style="width: 24px; height: 24px; border: 1px solid var(--sp-line)">${t(`bell`)}</span>`,lines:[56,44]},{key:`3`,lead:20,markup:`<span style="width: 20px; height: 20px; border-radius: 5px; background: var(--sp-line)"></span>`,lines:[68,36]},{key:`4`,lead:28,markup:`<span class="sp-avatar">RM</span>`,lines:[52,46]}];function u(t){let u=l.map(e=>`
      <div class="sp-context" data-part="row-${e.key}" style="display: flex; align-items: center; gap: ${44-e.lead}px; height: ${a}px; padding-left: ${n}px; transition: gap 320ms var(--sp-ease)">
        ${e.markup}
        <span
          data-part="text-${e.key}"
          data-fit="on"
          style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0; padding-right: ${n}px"
        >
          <span class="sp-line" style="width: ${e.lines[0]}%; height: 7px"></span>
          <span class="sp-line" style="width: ${e.lines[1]}%; height: 6px"></span>
        </span>
      </div>`).join(``);t.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Row text</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Rows" data-value="on">
            ${s.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div class="sp-surface" data-part="list" data-align="on" style="position: relative; width: ${o}px; padding: 6px 0; overflow: hidden">
            ${u}
            <div class="sp-context" data-part="edge" style="position: absolute; top: 6px; bottom: 6px; left: 14px; width: 2px; background: var(--sp-accent); opacity: 0.5"></div>
            <div
              data-part="keyline"
              data-subject
              style="position: absolute; top: 4px; bottom: 4px; left: 59px; width: 3px; z-index: 2;
                     background: var(--sp-accent); border-radius: 2px"
            ></div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${c.on}</span>
    </div>
  `;let d=e(t,`list`),f=e(t,`note`),p=a=>{d.dataset.align=a;for(let o of l){let s=n+o.lead+i;e(t,`row-${o.key}`).style.gap=`${a===`on`?44-o.lead:i}px`,e(t,`text-${o.key}`).dataset.fit=a===`on`||s===r?`on`:`off`}f.textContent=c[a]??``};e(t,`modes`).addEventListener(`change`,e=>p(e.detail)),p(`on`)}export{u as mount};