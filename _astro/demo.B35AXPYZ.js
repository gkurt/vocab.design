import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Roboto Flex Variable', system-ui, sans-serif`,n=`Handgloves`,r=`quick brown fox`,i=[{key:`minus200`,grade:-200,wght:300,gradeRead:`GRAD -200`,weightRead:`wght 300 Light`,verdict:`The grade thins the strokes and its marker has not moved. The lighter weight narrows every glyph and pulls its marker left.`},{key:`zero`,grade:0,wght:400,gradeRead:`GRAD 0`,weightRead:`wght 400 Regular`,verdict:`Both lines are at the family’s own setting, so the two markers start level.`},{key:`plus150`,grade:150,wght:700,gradeRead:`GRAD 150`,weightRead:`wght 700 Bold`,verdict:`The grade thickens the strokes and its marker has not moved. The heavier weight widens every glyph and pushes its marker right.`}],a=i[1];function o(o){let s=(e,i,o,s)=>`
    <div class="sp-stack${e===`weight`?` sp-context`:``}" style="gap: 6px">
      <div class="sp-row sp-row--between sp-context">
        <span class="sp-label" style="white-space: nowrap">${i}</span>
        <span class="sp-chip" data-part="read-${e}" style="cursor: default; white-space: nowrap; flex: 0 0 auto">${o}</span>
      </div>
      <div class="sp-row" data-part="line-${e}" style="gap: 8px; height: 42px; align-items: center">
        <span data-part="${e}"${e===`grade`?` data-subject`:``} data-stop="${a.key}"
              style="font-family: ${t}; font-size: 28px; line-height: 1.2; white-space: nowrap;
                     font-variation-settings: ${s}">${n}</span>
        <span data-part="mark-${e}" style="flex: 0 0 auto; width: 2px; height: 34px; background: var(--sp-accent)"></span>
        <span class="sp-text sp-context" data-part="tail-${e}" style="white-space: nowrap">${r}</span>
      </div>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="GRAD" data-value="${a.key}">
            ${i.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.grade}</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-stack" style="gap: 12px; margin-top: 10px">
          ${s(`grade`,`Grade`,a.gradeRead,`'GRAD' ${a.grade}`)}
          ${s(`weight`,`Weight`,a.weightRead,`'wght' ${a.wght}`)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">${a.verdict}</p>
      </div>
    </div>
  `;let c=e(o,`grade`),l=e(o,`weight`),u=e(o,`read-grade`),d=e(o,`read-weight`),f=e(o,`caption`),p=e=>{let t=i.find(t=>t.key===e);t&&(c.dataset.stop=t.key,c.style.fontVariationSettings=`'GRAD' ${t.grade}`,u.textContent=t.gradeRead,l.dataset.stop=t.key,l.style.fontVariationSettings=`'wght' ${t.wght}`,d.textContent=t.weightRead,f.textContent=t.verdict)};e(o,`segmented`).addEventListener(`change`,e=>p(e.detail))}export{o as mount};