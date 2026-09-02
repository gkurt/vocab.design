import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`linear-gradient(158deg, #3c5a76 0%, #22384c 55%, #4a6580 100%)`,n=[{time:`09:30`,title:`Site visit`,lead:!0},{time:`11:00`,title:`Tide check`,lead:!1},{time:`14:15`,title:`Yard call`,lead:!0},{time:`16:45`,title:`Chart review`,lead:!1}],r=160,i={small:{w:76,h:76,cells:`2 × 2 cells`,note:`One glance, one fact: the date, and the next thing on it.`},medium:{w:r,h:76,cells:`4 × 2 cells`,note:`Twice the width buys the times as well as the titles.`},large:{w:r,h:r,cells:`4 × 4 cells`,note:`The rest of the day, and a count of what comes after it.`}},a=`small`,o=e=>`<span style="flex: 0 0 auto; width: 5px; height: 5px; border-radius: 50%; background: var(--sp-${e?`accent`:`muted`})"></span>`,s=e=>{let t=n[e];return t?`
    <div class="sp-row" data-part="row-${e+1}" style="gap: 6px; min-width: 0; height: 13px">
      ${o(t.lead)}
      <span style="flex: 0 0 auto; font-size: 9.5px; line-height: 13px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${t.time}</span>
      <span class="sp-grow" style="font-size: 10.5px; line-height: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${t.title}</span>
    </div>`:``},c=e=>`
  <div class="sp-stack" style="gap: 1px">
    <span style="font-size: 9px; line-height: 11px; font-weight: 600; letter-spacing: 0.07em; color: var(--sp-accent)">TUE</span>
    <span style="font-size: ${e}px; line-height: ${e+1}px; font-weight: 600">17</span>
  </div>`,l={small:()=>`
    <div style="display: flex; flex-direction: column; height: 100%">
      ${c(22)}
      <div data-part="row-1" style="margin-top: auto; min-width: 0">
        <span style="display: block; font-size: 9px; line-height: 11px; color: var(--sp-muted)">${n[0]?.time}</span>
        <span style="display: block; font-size: 10.5px; line-height: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${n[0]?.title}</span>
      </div>
    </div>`,medium:()=>`
    <div style="display: flex; height: 100%; gap: 9px">
      <div style="flex: 0 0 auto">${c(22)}</div>
      <div style="flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 7px">
        ${s(0)}${s(1)}
      </div>
    </div>`,large:()=>`
    <div style="display: flex; flex-direction: column; height: 100%; gap: 7px">
      <div class="sp-row sp-row--between" style="align-items: flex-end">
        ${c(20)}
        <span style="font-size: 10px; line-height: 13px; color: var(--sp-muted)">August</span>
      </div>
      <div class="sp-divider"></div>
      <div class="sp-stack" style="gap: 7px">${n.map((e,t)=>s(t)).join(``)}</div>
      <span style="margin-top: auto; font-size: 9.5px; line-height: 12px; color: var(--sp-muted)">3 more tomorrow</span>
    </div>`};function u(n){let r=i[a];n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home screen</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="sizer" data-axis="Size" data-value="${a}">
            ${Object.keys(i).map(e=>`<button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 10px; font-size: 12px">${e[0]?.toUpperCase()}${e.slice(1)}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; gap: 16px; align-items: center">
          <div
            style="flex: 0 0 auto; width: 184px; padding: 12px; border-radius: 18px; background: ${t};
                   border: 1px solid rgb(255 255 255 / 0.16)"
          >
            <div data-part="slot" style="width: 164px; height: 164px; border: 2px dashed rgb(255 255 255 / 0.24); border-radius: 16px">
              <div
                data-part="widget"
                data-subject
                data-size="${a}"
                role="group"
                aria-label="Calendar widget"
                style="width: ${r.w}px; height: ${r.h}px; padding: 8px 10px; overflow: hidden;
                       background: var(--sp-surface); border-radius: 14px; box-shadow: var(--sp-shadow);
                       transition: width 0.3s var(--sp-ease), height 0.3s var(--sp-ease)"
              >${l[a]?.()}</div>
            </div>
            <div class="sp-row" style="margin-top: 12px; gap: 10px; justify-content: center">
              ${Array.from({length:4},()=>`<span style="width: 30px; height: 30px; border-radius: 9px; background: rgb(255 255 255 / 0.2)"></span>`).join(``)}
            </div>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; min-width: 0">
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 11px">Slot</span>
              <span data-part="cells" style="font-size: 13px">${r.cells}</span>
            </div>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; height: 54px; font-size: 12px">${r.note}</p>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(n,`widget`),s=e(n,`cells`),c=e(n,`note`),u=e=>{let t=i[e],n=l[e];!t||!n||(o.dataset.size=e,o.style.width=`${t.w}px`,o.style.height=`${t.h}px`,o.innerHTML=n(),s.textContent=t.cells,c.textContent=t.note)};e(n,`sizer`).addEventListener(`change`,e=>u(e.detail))}export{u as mount};