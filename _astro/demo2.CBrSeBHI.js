import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=158,r=[{key:`all`,label:`All`},{key:`mail`,label:`Mail`},{key:`files`,label:`Files`},{key:`people`,label:`People`}],i=[{key:`r1`,scope:`mail`,title:`Re: harbour survey`,note:`A. Okafor`,glyph:t(`inbox`)},{key:`r2`,scope:`files`,title:`harbour-survey.pdf`,note:`2.4 MB`,glyph:t(`copy`)},{key:`r3`,scope:`people`,title:`Dana Harbour`,note:`Coastal team`,glyph:`<span class="sp-avatar" style="width: 18px; height: 18px; font-size: 8px">DH</span>`},{key:`r4`,scope:`mail`,title:`Harbour fees, Q3`,note:`Billing`,glyph:t(`inbox`)},{key:`r5`,scope:`files`,title:`harbour-map.png`,note:`860 KB`,glyph:t(`copy`)}],a={all:i.length,mail:i.filter(e=>e.scope===`mail`).length,files:i.filter(e=>e.scope===`files`).length,people:i.filter(e=>e.scope===`people`).length};function o(o){let s=i.map(e=>`
      <li
        class="sp-list-item"
        data-part="row-${e.key}"
        data-scope="${e.scope}"
        style="gap: 9px; padding: 3px 10px"
      >
        <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px; color: var(--sp-muted)">${e.glyph}</span>
        <span class="sp-grow" style="font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.title}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">${e.note}</span>
      </li>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 302px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Spotlight</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-row sp-context" style="gap: 8px; padding: 0 1px">
            <span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${t(`search`)}</span>
            <input
              class="sp-input sp-grow"
              data-part="query"
              type="text"
              value="harbour"
              readonly
              aria-label="Search everything"
              style="font-size: 13px"
            />
          </div>

          <sp-segmented class="sp-segmented" data-part="bar" data-subject data-value="all" data-axis="Scope" aria-label="Search scope" style="align-self: flex-start">
            ${r.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 14px; font-size: 12px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>

          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; height: ${n}px; overflow: hidden; padding: 3px 4px">
            <ul class="sp-list sp-grow" data-part="results" style="flex: 1 1 auto">${s}</ul>
            <span class="sp-label" data-part="count" data-scope="all" style="flex: 0 0 auto; padding: 4px 8px 2px; font-size: 11px; white-space: nowrap">5 matches for “harbour”, everywhere</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`bar`),l=e(o,`count`),u=t=>{for(let n of i)e(o,`row-${n.key}`).toggleAttribute(`hidden`,t!==`all`&&n.scope!==t);l.dataset.scope=t;let n=r.find(e=>e.key===t)?.label??``;l.textContent=t===`all`?`${a.all} matches for “harbour”, everywhere`:`${a[t]} of ${a.all} matches for “harbour”, in ${n}`};c.addEventListener(`change`,e=>u(e.detail)),u(`all`)}export{o as mount};