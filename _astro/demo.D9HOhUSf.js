import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=6,n=8,r=2,i=420,a=176,o=156,s=[{key:`wide`,label:`wide`,width:i,areas:`'nav nav nav' 'promo main main' 'promo list list' 'foot foot foot'`,columns:`104px 1fr 1fr`,rows:`26px 43px 43px 26px`,thumbColumns:`10px 1fr 1fr`,thumbRows:`4px 5px 5px 4px`,note:`420px: the promo is a full height rail down the left side.`},{key:`medium`,label:`medium`,width:300,areas:`'nav nav' 'main main' 'promo list' 'foot foot'`,columns:`1fr 1fr`,rows:`26px 43px 43px 26px`,thumbColumns:`1fr 1fr`,thumbRows:`4px 5px 5px 4px`,note:`300px: the promo is a card in a two up row under the main.`},{key:`narrow`,label:`narrow`,width:190,areas:`'nav' 'promo' 'main' 'list' 'foot'`,columns:`1fr`,rows:`24px 30px 32px 22px 24px`,thumbColumns:`1fr`,thumbRows:`3px 3px 4px 3px 3px`,note:`190px: the promo is a full width band right under the nav.`}],c=[{key:`nav`,label:`Nav`,bar:0},{key:`promo`,label:`Promo`,bar:70},{key:`main`,label:`Main`,bar:82},{key:`list`,label:`List`,bar:0},{key:`foot`,label:`Footer`,bar:0}],l=(e,t,n,r)=>`
  <div
    data-part="${e}"
    ${r?`data-subject data-slot="rail"`:`class="sp-context"`}
    style="grid-area: ${e}; display: flex; flex-direction: column; gap: 3px; overflow: hidden; min-width: 0;
           padding: 4px 7px; border-radius: 5px; background: ${r?`var(--sp-accent-soft)`:`var(--sp-surface)`};
           border: 1px solid ${r?`var(--sp-accent)`:`var(--sp-line)`}"
  >
    <span style="flex: 0 0 auto; font-size: 10px; font-weight: 500; line-height: 1.2; white-space: nowrap;
                 color: ${r?`var(--sp-ink)`:`var(--sp-muted)`}">${t}</span>
    ${n?`<span style="flex: 0 0 auto; width: ${n}%; height: 5px; border-radius: 3px;
             background: ${r?`color-mix(in oklab, var(--sp-accent) 55%, transparent)`:`var(--sp-line)`}"></span>`:``}
  </div>`,u=e=>`
  <div class="sp-row" style="gap: 5px; flex: 0 0 auto">
    <div
      data-part="dia-${e.key}"
      style="display: grid; grid-template-areas: ${e.areas}; grid-template-columns: ${e.thumbColumns};
             grid-template-rows: ${e.thumbRows}; gap: 2px; flex: 0 0 auto; width: 44px; height: 28px; padding: 2px;
             border: 1px solid var(--sp-line); border-radius: 4px; background: var(--sp-surface)"
    >
      ${c.map(e=>`<span style="grid-area: ${e.key}; border-radius: 1px;
                 background: ${e.key===`promo`?`var(--sp-muted)`:`var(--sp-line)`}"></span>`).join(``)}
    </div>
    <span data-part="dia-label-${e.key}" class="sp-label" style="font-size: 10px; white-space: nowrap">${e.label}</span>
  </div>`;function d(d){d.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="plans" data-axis="Width" data-value="wide">
            ${s.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}"
                      style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div style="display: flex; justify-content: center; width: ${i}px; height: ${a}px">
            <div
              data-part="viewport"
              data-bands="four"
              style="display: grid; gap: ${t}px; width: ${i}px; height: ${a}px; padding: ${n}px;
                     background: var(--sp-sunken); border: ${r}px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >${c.map(e=>l(e.key,e.label,e.bar,e.key===`promo`)).join(``)}</div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="thumbs" style="width: 452px; height: 28px; justify-content: center; gap: 16px">
        ${s.map(e=>u(e)).join(``)}
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let f=e(d,`viewport`),p=e(d,`promo`),m=e(d,`note`),h=c.map(t=>e(d,t.key)),g=t=>{let n=s.find(e=>e.key===t);if(!n)return;f.style.width=`${n.width}px`,f.style.gridTemplateAreas=n.areas,f.style.gridTemplateColumns=n.columns,f.style.gridTemplateRows=n.rows;for(let t of s){let r=t.key===n.key;e(d,`dia-${t.key}`).style.borderColor=r?`var(--sp-accent)`:`var(--sp-line)`,e(d,`dia-label-${t.key}`).style.color=r?`var(--sp-ink)`:`var(--sp-muted)`}let r=n.width-16-4,i=p.offsetHeight>o*.5?`rail`:p.offsetWidth>r*.8?`band`:`card`;p.dataset.slot=i;let a=new Set(h.map(e=>Math.round(e.offsetTop))).size;f.dataset.bands=a===5?`five`:a===4?`four`:`three`,m.textContent=n.note};e(d,`plans`).addEventListener(`change`,e=>g(e.detail)),g(`wide`)}export{d as mount};