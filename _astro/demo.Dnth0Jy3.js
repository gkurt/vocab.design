import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=6,n=8,r=176,i=[{key:`off-grid`,label:`broken`},{key:`on-grid`,label:`on the grid`}],a={"off-grid":`The plate takes a column it does not own and hangs off the track edges.`,"on-grid":`Every edge back on a track: the same four blocks, none of the tension.`},o=`display: grid; grid-template-columns: repeat(${t}, 1fr); grid-template-rows: 1fr 1fr; gap: ${n}px`,s=`display: grid; grid-template-columns: repeat(${t}, 1fr); gap: ${n}px`,c=`display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; min-width: 0; overflow: hidden`,l=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px"></div>`).join(``);function u(n){let u=Array.from({length:t},()=>`<div style="background: var(--sp-accent); opacity: 0.1; border-radius: 2px"></div>`).join(``);n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Feature spread, ${t} columns</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="fits" data-axis="Fit" data-term="off-grid" data-value="off-grid">
            ${i.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div style="position: relative; height: ${r}px">
            <div data-part="layout" style="position: relative; ${o}; height: 100%">
              <div class="sp-surface sp-context" data-part="block-headline" style="${c}; grid-column: 1 / 4; grid-row: 1">
                <span class="sp-label" style="color: var(--sp-ink); font-size: 11px">Headline</span>
                ${l([92,64])}
              </div>
              <div class="sp-surface sp-context" data-part="block-copy" style="${c}; grid-column: 1 / 4; grid-row: 2">
                <span class="sp-label" style="font-size: 11px">Copy</span>
                ${l([100,88,70])}
              </div>
              <div class="sp-surface sp-context" data-part="block-credit" style="${c}; grid-column: 4 / 7; grid-row: 2; justify-content: flex-end">
                <span class="sp-label" style="font-size: 11px">Credit</span>
              </div>
              <div
                data-part="plate"
                data-subject
                data-fit="off-grid"
                data-broken
                data-pose="[data-broken]"
                style="${c}; grid-column: 3 / 7; grid-row: 1; z-index: 2; justify-content: flex-end;
                       background: var(--sp-accent-soft); border: 2px solid var(--sp-accent); border-radius: 6px;
                       transform: translate(-16px, 22px); transition: transform 320ms var(--sp-ease)"
              >
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 11px">Plate</span>
              </div>
            </div>

            <div class="sp-context" data-part="tracks" style="position: absolute; inset: 0; ${s}; pointer-events: none; z-index: 3">${u}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${a[`off-grid`]}</span>
    </div>
  `;let d=e(n,`plate`),f=e(n,`note`),p=e=>{let t=e===`off-grid`;d.dataset.fit=e,t?d.dataset.broken=``:delete d.dataset.broken,d.style.gridColumn=t?`3 / 7`:`4 / 7`,d.style.transform=t?`translate(-16px, 22px)`:`translate(0, 0)`,f.textContent=a[e]??``};e(n,`fits`).addEventListener(`change`,e=>p(e.detail)),p(`off-grid`)}export{u as mount};