import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=38,r=60,i=46,a=e=>`<div class="sp-line" style="width: ${e}%"></div>`,o=`
  <div class="sp-list" style="width: 320px">
    ${[`Harbour Board`,`Trinity Pilots`,`Customs office`].map((e,t)=>`
      <div class="sp-list-item" style="padding: 6px 8px">
        <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${e.slice(0,1)}</span>
        <span class="sp-grow sp-stack" style="gap: 5px">
          <span style="font-size: 12px; font-weight: 500">${e}</span>
          ${a(60+t*12)}
        </span>
      </div>`).join(``)}
  </div>`,s=`
  <div class="sp-stack" style="gap: 6px">
    <div class="sp-row" style="gap: 4px">
      ${[`M`,`T`,`W`,`T`,`F`,`S`,`S`].map(e=>`<span class="sp-label" style="width: 26px; text-align: center; font-size: 10px">${e}</span>`).join(``)}
    </div>
    ${[0,1,2].map(e=>`
      <div class="sp-row" style="gap: 4px">
        ${Array.from({length:7},(t,n)=>{let r=e*7+n+1;return`<span class="sp-day"${r===9?` data-today`:``} style="width: 26px; height: 24px; font-size: 11px">${r}</span>`}).join(``)}
      </div>`).join(``)}
  </div>`,c=`
  <div class="sp-row" style="gap: 10px">
    ${[`Survey.pdf`,`Berths.csv`,`Tides.xlsx`].map(e=>`
      <div class="sp-surface" style="width: 96px; padding: 10px; background: var(--sp-sunken)">
        <div class="sp-stack" style="gap: 6px">
          <div style="height: 34px; border-radius: 4px; background: var(--sp-line)"></div>
          <span class="sp-label" style="font-size: 10px">${e}</span>
        </div>
      </div>`).join(``)}
  </div>`,l=[{key:`inbox`,label:`Inbox`,title:`Inbox`,body:o,note:`Three screens, one frame. The inbox hands the scaffold a list.`},{key:`calendar`,label:`Calendar`,title:`March`,body:s,note:`A month now, and the bar, the rail and the action button did not move.`},{key:`files`,label:`Files`,title:`Files`,body:c,note:`Cards now. A screen chooses its content, never its arrangement.`}];function u(a){let o=(e,n)=>`
    <span class="sp-nav-item" data-part="rail-${n}" style="display: flex; justify-content: center; padding: 7px 0">${t(e)}</span>`;a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="position: relative; width: 476px; height: 226px">
        <div
          class="sp-topbar sp-context"
          data-part="slot-bar"
          style="flex: 0 0 auto; height: ${n}px; padding: 0 14px"
        >
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Inbox</span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">K</span>
        </div>

        <div class="sp-body" style="display: flex; padding: 0; background: var(--sp-surface)">
          <div
            class="sp-nav sp-context"
            data-part="slot-rail"
            style="flex: 0 0 ${r}px; gap: 4px; padding: 8px; background: var(--sp-sunken); border-right: 1px solid var(--sp-line)"
          >
            ${o(`inbox`,`inbox`)}
            ${o(`calendar`,`calendar`)}
            ${o(`copy`,`files`)}
          </div>

          <div
            class="sp-context"
            data-part="slot-body"
            data-screen="inbox"
            style="position: relative; flex: 1 1 auto; min-width: 0; display: flex; align-items: center; justify-content: center; padding: 12px 64px 12px 16px; overflow: hidden"
          >
            <div data-part="content"></div>
            <button
              class="sp-button sp-context"
              type="button"
              data-part="fab"
              aria-label="Compose"
              style="position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; justify-content: center;
                     width: ${i}px; height: ${i}px; padding: 0; border-radius: 16px; box-shadow: var(--sp-shadow)"
            >${t(`plus`)}</button>
          </div>
        </div>

        <div
          data-part="slots"
          data-subject
          data-slots=""
          aria-hidden="true"
          style="position: absolute; inset: 0; pointer-events: none"
        >
          <span style="position: absolute; left: 4px; right: 4px; top: 4px; height: 30px; border: 2px dashed var(--sp-accent); border-radius: 6px"></span>
          <span style="position: absolute; left: 4px; top: 42px; width: 52px; bottom: 4px; border: 2px dashed var(--sp-accent); border-radius: 6px"></span>
          <span style="position: absolute; left: 64px; right: 4px; top: 42px; bottom: 4px; border: 2px dashed var(--sp-accent); border-radius: 6px"></span>
          <span style="position: absolute; right: 10px; bottom: 10px; width: 54px; height: 54px; border: 2px dashed var(--sp-accent); border-radius: 20px"></span>
          <span class="sp-label" style="position: absolute; left: 50%; top: 11px; translate: -50% 0; font-size: 10px; color: var(--sp-accent)">app bar</span>
          <span class="sp-label" style="position: absolute; left: 12px; bottom: 10px; font-size: 10px; color: var(--sp-accent)">rail</span>
          <span class="sp-label" style="position: absolute; left: 70px; top: 48px; font-size: 10px; color: var(--sp-accent)">body</span>
          <span class="sp-label" style="position: absolute; right: 12px; bottom: 68px; font-size: 10px; color: var(--sp-accent)">action</span>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-part="screens" data-value="inbox" data-axis="Screen">
          ${l.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 12px; font-size: 12px">${e.label}</button>`).join(``)}
        </sp-segmented>
        <span class="sp-label" data-stage-verdict data-part="note" role="status" style="height: 16px; width: 452px; font-size: 11px; line-height: 16px; text-align: center"></span>
      
    </div>
  `;let s=e(a,`slot-bar`),c=e(a,`slot-rail`),u=e(a,`slot-body`),d=e(a,`slots`),f=e(a,`content`),p=e(a,`title`),m=e(a,`note`),h=new Map(l.map(t=>[t.key,e(a,`rail-${t.key}`)])),g=e=>{let t=l.find(t=>t.key===e);if(t){f.innerHTML=t.body,p.textContent=t.title,u.dataset.screen=t.key,m.textContent=t.note;for(let[e,n]of h)e===t.key?n.setAttribute(`data-current`,``):n.removeAttribute(`data-current`);d.dataset.slots=[Math.round(s.offsetHeight),Math.round(c.offsetWidth),Math.round(u.offsetWidth),Math.round(u.offsetHeight)].join(`-`)}};e(a,`screens`).addEventListener(`change`,e=>g(e.detail)),g(`inbox`)}export{u as mount};