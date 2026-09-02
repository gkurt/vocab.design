import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=20,n=17,r=[`repeating-linear-gradient(to bottom, transparent 0 58px, var(--sp-accent) 58px 60px)`,`repeating-linear-gradient(to bottom, transparent 0 19px, var(--sp-line) 19px ${t}px)`].join(`, `),i={on:`Both columns keep the ${t}px line, so their lines rest on the same rules.`,off:`The right column is set at ${n}px and never lands on a rule again.`};function a(a){let o=(e,n,r,i)=>`
    <div data-part="col-${e}" style="width: 196px; height: 140px; overflow: hidden; font-size: 13px">
      <p data-part="head-${e}" style="margin: 0; font-weight: 600; line-height: ${t}px">${n}</p>
      <p class="sp-text" data-part="one-${e}" style="margin: ${t}px 0 0; line-height: ${t}px">${r}</p>
      <p class="sp-text" data-part="two-${e}" style="margin: ${t}px 0 0; line-height: ${t}px">${i}</p>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Right column</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="on" data-axis="Alignment">
            <button class="sp-segment" type="button" data-part="seg-on" value="on">on the grid</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">off the grid</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div class="sp-row sp-context" style="flex: 0 0 auto; width: 444px; gap: 24px; padding: 0 14px">
            <span class="sp-label" style="width: 196px">left column</span>
            <span class="sp-label" style="width: 196px">right column</span>
          </div>
          <div
            data-part="page"
            style="position: relative; flex: 0 0 auto; width: 444px; height: 164px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div
              data-part="lattice"
              data-subject
              style="position: absolute; left: 14px; top: 14px; width: 416px; height: 140px; background-image: ${r}"
            ></div>
            <div class="sp-row" style="position: absolute; left: 14px; top: 14px; width: 416px; height: 140px; gap: 24px; align-items: flex-start">
              ${o(`left`,`Harbour works`,`The slipway reopens on Thursday after repairs.`,`Tide tables are posted at the harbour gate.`)}
              ${o(`right`,`Ferry times`,`The winter timetable adds a late Friday sailing.`,`Moorings must be renewed before October.`)}
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let s=e(a,`readout`),c=[`head-right`,`one-right`,`two-right`].map(t=>e(a,t)),l=e=>{let r=i[e];if(!r)return;let a=e===`on`?t:n;for(let[e,t]of c.entries())t.style.lineHeight=`${a}px`,e>0&&(t.style.marginTop=`${a}px`);s.textContent=r};e(a,`switcher`).addEventListener(`change`,e=>l(e.detail)),l(`on`)}export{a as mount};