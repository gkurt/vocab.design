import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=12,n=6,r=6,i=176,a=[{key:`offset`,label:`starts on 4`,start:4},{key:`flush`,label:`starts on 1`,start:1}],o={offset:`Starts on track 4: the three tracks before it stay empty on purpose.`,flush:`Flush to the start on track 1: the same six tracks, no offset at all.`},s=`display: grid; grid-template-columns: repeat(${t}, 1fr); gap: ${n}px`,c=`display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; overflow: hidden`,l=`background-color: color-mix(in oklab, var(--sp-accent) 7%, transparent);
  background-image: repeating-linear-gradient(45deg, color-mix(in oklab, var(--sp-accent) 26%, transparent) 0 2px, transparent 2px 6px);
  border-radius: 4px`;function u(n){let u=Array.from({length:t},()=>`<div style="background: var(--sp-accent); opacity: 0.12; border-radius: 2px"></div>`).join(``);n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">${t} tracks, ${r}-track column</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="starts" data-axis="Start" data-term="offset" data-value="offset">
            ${a.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div style="position: relative; height: ${i}px">
            <div class="sp-context" data-part="tracks" style="position: absolute; inset: 0; ${s}; pointer-events: none">${u}</div>

            <div style="position: relative; ${s}; grid-template-rows: 38px 1fr; height: 100%">
              <div class="sp-surface sp-context" data-part="masthead" style="${c}; grid-column: 1 / -1; grid-row: 1; justify-content: center">
                <span class="sp-label" style="color: var(--sp-ink); font-size: 11px">Masthead, all ${t} tracks</span>
              </div>

              <div class="sp-context" data-part="empty" style="grid-column: 1 / 4; grid-row: 2; ${l}"></div>

              <div
                data-part="column"
                data-start="4"
                data-offset
                data-subject
                data-pose="[data-offset]"
                style="${c}; grid-column: 4 / 10; grid-row: 2; justify-content: center; gap: 8px;
                       background: var(--sp-accent-soft); border: 2px solid var(--sp-accent); border-radius: 6px"
              >
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 11px">Form</span>
                <div class="sp-line" style="width: 88%; height: 6px"></div>
                <div class="sp-line" style="width: 64%; height: 6px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${o.offset}</span>
    </div>
  `;let d=e(n,`column`),f=e(n,`empty`),p=e(n,`note`),m=e=>{let t=a.find(t=>t.key===e);if(!t)return;let n=t.start>1;d.dataset.start=String(t.start),n?d.dataset.offset=``:delete d.dataset.offset,d.style.gridColumn=`${t.start} / ${t.start+r}`,f.hidden=!n,p.textContent=o[e]??``};e(n,`starts`).addEventListener(`change`,e=>m(e.detail)),m(`offset`)}export{u as mount};