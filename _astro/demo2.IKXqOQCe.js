import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=36,n=12,r=[{key:`insurance`,label:`Travel insurance for this crossing`,price:`12.00`,subject:!0},{key:`offers`,label:`Email me offers from ferry partners`,price:``,subject:!1},{key:`card`,label:`Remember this card for next time`,price:``,subject:!1}],i={preselected:{insurance:!0,offers:!0,card:!1},fair:{insurance:!1,offers:!1,card:!1}},a={preselected:`Two answers were given before the reader got here, and one of them costs 12.00.`,fair:`Every box starts empty, so a yes on this screen is something somebody actually did.`},o=e=>e.toFixed(2);function s(e,t,n,r){return`
    <div class="sp-row" data-part="opt-${e}" data-state="clear"${r?` data-subject data-pose="[data-mode=preselected][data-state=checked]" data-mode="preselected"`:``} style="flex: 0 0 auto; gap: 10px; height: 28px; padding: 0 8px; border-radius: 6px">
      <button class="sp-checkbox" data-part="box-${e}" type="button" role="checkbox" aria-checked="false" aria-label="${t}"></button>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 12px">${t}</span>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">${n}</span>
    </div>`}function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Harbour Ferries</span><span class="sp-label">Step 2 of 3</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 6px">

          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; height: 17px">
            <span class="sp-label" style="font-size: 11px">Extras</span>
            <span class="sp-label" style="font-size: 11px">2 adults, Friday</span>
          </div>

          <div class="sp-surface" style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 1 1 auto; min-height: 0; padding: 8px">
            ${r.map(e=>s(e.key,e.label,e.price,e.subject)).join(``)}
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; height: 34px; gap: 10px">
            <span class="sp-text sp-text--ink" style="font-weight: 600; font-variant-numeric: tabular-nums">Total <span data-part="total">${o(t)}</span></span>
            <span class="sp-grow"></span>
            <button class="sp-button" data-part="pay" type="button">Pay and book</button>
          </div>

          <span class="sp-text sp-context" data-part="receipt" style="flex: 0 0 auto; height: 16px; font-size: 11px; visibility: hidden"></span>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 296px; font-size: 11px">${a.preselected}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="preselected" data-axis="Preselected opt-in" data-term="preselected">
          <button class="sp-segment" data-part="mode-preselected" value="preselected">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;let l=e(c,`verdict`),u=e(c,`total`),d=e(c,`receipt`),f=r.map(t=>({key:t.key,row:e(c,`opt-${t.key}`),box:e(c,`box-${t.key}`)})),p=e=>f.find(t=>t.key===e)?.box.getAttribute(`aria-checked`)===`true`,m=()=>{u.textContent=o(t+(p(`insurance`)?n:0))},h=(e,t)=>{let n=f.find(t=>t.key===e);n&&(n.box.setAttribute(`aria-checked`,String(t)),n.row.dataset.state=t?`checked`:`clear`,m())},g=e=>{let t=f.find(e=>e.key===`insurance`);t&&(t.row.dataset.mode=e);for(let{key:t}of f)h(t,i[e][t]===!0);l.textContent=a[e],d.textContent=``,d.removeAttribute(`data-sold`),d.style.visibility=`hidden`};for(let{key:e,box:t}of f)t.addEventListener(`click`,()=>h(e,t.getAttribute(`aria-checked`)!==`true`));e(c,`pay`).addEventListener(`click`,()=>{if(d.hasAttribute(`data-sold`))return;let e=o(t+(p(`insurance`)?n:0)),r=p(`insurance`)?`Insurance charged. `:`No insurance. `,i=p(`offers`)?`Added to partner offers.`:`No mailing list.`;d.textContent=`Charged ${e}. ${r}${i}`,d.setAttribute(`data-sold`,``),d.style.visibility=`visible`}),e(c,`mode`).addEventListener(`change`,e=>{g(e.detail===`fair`?`fair`:`preselected`)}),g(`preselected`)}export{c as mount};