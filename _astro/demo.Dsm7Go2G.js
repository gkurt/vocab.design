import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`editing`,title:`Editing`,items:[{key:`undo`,label:`Undo`,keys:[`Ctrl`,`Z`]},{key:`redo`,label:`Redo`,keys:[`Ctrl`,`Shift`,`Z`]},{key:`duplicate`,label:`Duplicate row`,keys:[`Ctrl`,`D`]},{key:`find`,label:`Find in ledger`,keys:[`Ctrl`,`F`]}]},{key:`moving`,title:`Getting around`,items:[{key:`palette`,label:`Command palette`,keys:[`Ctrl`,`K`]},{key:`next`,label:`Next account`,keys:[`Ctrl`,`]`]},{key:`goto`,label:`Go to date`,keys:[`Ctrl`,`G`]},{key:`help`,label:`This list`,keys:[`?`]}]}],r=[{date:`04 Mar`,payee:`Harbour Supply`,amount:`248.00`},{date:`05 Mar`,payee:`Tally Coffee`,amount:`11.40`},{date:`07 Mar`,payee:`Northwind Freight`,amount:`96.50`},{date:`09 Mar`,payee:`Meridian Print`,amount:`412.00`}];function i(i){let a=n.map(({key:e,title:t,items:n})=>`
      <div class="sp-stack" data-part="group-${e}" style="flex: 1 1 0; min-width: 0; gap: 5px">
        <span class="sp-label" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em">${t}</span>
        ${n.map(e=>`
          <div class="sp-row sp-row--between" data-part="row-${e.key}" style="gap: 8px">
            <span style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.label}</span>
            <span class="sp-row" style="gap: 3px; flex: 0 0 auto">
              ${e.keys.map(e=>`<span class="sp-kbd">${e}</span>`).join(``)}
            </span>
          </div>`).join(``)}
      </div>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Ledger</span>
          <span class="sp-label" style="font-size: 12px">March</span>
        </div>

        <div class="sp-body sp-context" style="padding: 0">
          <table class="sp-table" style="--sp-cell-pad: 7px 12px">
            <thead>
              <tr><th>Date</th><th>Payee</th><th style="text-align: right">Amount</th></tr>
            </thead>
            <tbody>${r.map(e=>`
      <tr>
        <td style="font-variant-numeric: tabular-nums">${e.date}</td>
        <td>${e.payee}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums">${e.amount}</td>
      </tr>`).join(``)}</tbody>
          </table>
        </div>

        <div
          class="sp-row sp-context"
          data-part="statusbar"
          style="flex: 0 0 auto; gap: 6px; padding: 5px 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-label sp-grow" style="font-size: 11px">4 entries</span>
          <span class="sp-row" data-part="hint" style="gap: 5px">
            <span class="sp-label" style="font-size: 11px">Shortcuts</span>
            <span class="sp-kbd">?</span>
          </span>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>

        <div
          class="sp-dialog"
          data-part="dialog"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          style="width: 408px; padding: 14px 16px"
        >
          <div class="sp-row sp-row--between" style="margin-bottom: 10px">
            <span class="sp-heading" style="font-size: 14px">Keyboard shortcuts</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="close">Close</button>
          </div>
          <div class="sp-row" style="align-items: flex-start; gap: 22px">${a}</div>
        </div>
      </div>
    </div>
  `;let o=e(i,`dialog`),s=e(i,`scrim`),c=e=>{t(o,`data-open`,e),t(s,`data-open`,e)};i.addEventListener(`keydown`,e=>{let t=e.key;t===`?`&&c(!0),t===`Escape`&&c(!1)}),e(i,`close`).addEventListener(`click`,()=>c(!1)),s.addEventListener(`pointerdown`,()=>c(!1)),c(!1)}export{i as mount};