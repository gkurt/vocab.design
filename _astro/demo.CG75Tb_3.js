import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`tokens`,label:`Design tokens`,meta:`12 files`,checked:!0},{key:`icons`,label:`Icons`,meta:`86 files`,checked:!1},{key:`type`,label:`Type scale`,meta:`4 files`,checked:!1}],n={mixed:`Some but not all: the parent reports "mixed", which is a summary of the group and not an answer of its own.`,true:`Every child is checked, so the parent says so. Pressing it again clears the whole group.`,false:`Nothing is checked. Pressing the parent takes the group all the way to checked.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 408px; padding: 12px 16px">
        <div class="sp-row" style="gap: 10px; height: 30px">
          <button class="sp-checkbox" type="button" role="checkbox" data-part="parent" data-subject
                  data-pose="[aria-checked=mixed]" data-aim aria-checked="mixed" aria-label="Select all"></button>
          <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px; font-weight: 600">Select all</span>
          <span class="sp-text sp-context" data-part="count" style="font-size: 11px">1 of 3</span>
        </div>
        <div class="sp-divider" style="margin: 4px 0 6px"></div>

        <div class="sp-context">
          ${t.map(e=>`
    <div class="sp-row" data-part="row-${e.key}" style="gap: 10px; height: 30px">
      <button class="sp-checkbox" type="button" role="checkbox" data-part="child-${e.key}" data-aim
              aria-checked="${e.checked}" aria-label="${e.label}"></button>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px">${e.label}</span>
      <span class="sp-text" style="font-size: 11px">${e.meta}</span>
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-context" style="margin-top: 8px; height: 18px; justify-content: flex-end">
          <span class="sp-text sp-text--ink" data-part="readout" data-state="mixed"
                style="font-size: 12px; white-space: nowrap">aria-checked = mixed</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="mixed"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${n.mixed}</p>
      </div>
    </div>
  `;let i=e(r,`parent`),a=e(r,`count`),o=e(r,`readout`),s=e(r,`caption`),c=t.map(t=>({child:t,el:e(r,`child-${t.key}`)})),l=e=>e.getAttribute(`aria-checked`)===`true`,u=()=>{let e=c.filter(({el:e})=>l(e)).length,t=e===c.length?`true`:e===0?`false`:`mixed`;i.setAttribute(`aria-checked`,t),a.textContent=`${e} of ${c.length}`,o.dataset.state=t,o.textContent=`aria-checked = ${t}`,s.dataset.case=t,s.textContent=n[t]};for(let{el:e}of c)e.addEventListener(`click`,()=>{e.setAttribute(`aria-checked`,String(!l(e))),u()});i.addEventListener(`click`,()=>{let e=i.getAttribute(`aria-checked`)!==`true`;for(let{el:t}of c)t.setAttribute(`aria-checked`,String(e));u()}),u()}export{r as mount};