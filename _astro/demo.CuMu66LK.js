import{n as e}from"./parts.C-YLuC7Q.js";var t=[{name:`chip-status`,key:`status`,test:/unpaid|overdue|outstanding/,read:()=>`unpaid`},{name:`chip-customer`,key:`customer`,test:/acme/,read:()=>`Acme Tooling`},{name:`chip-amount`,key:`amount`,test:/(?:over|above|more than)\s*(\d[\d,]*)/,read:e=>`> ${e[1]}`},{name:`chip-period`,key:`date`,test:/last quarter/,read:()=>`Oct to Dec`}],n=[[`INV-2291`,`Acme Tooling`,`1,340.00`],[`INV-2318`,`Acme Tooling`,`1,905.00`]].map(([e,t,n])=>`
    <span class="sp-row sp-row--between" style="gap: 8px">
      <span class="sp-text" style="font-size: 11px">${e} &middot; ${t}</span>
      <span class="sp-text sp-text--ink" style="font-size: 11px">${n}</span>
    </span>`).join(``),r=(e,t,n)=>`
  <span class="sp-chip" data-part="${n}" style="cursor: default">
    <span class="sp-label" style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em">${e}</span>${t}
  </span>`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 266px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Invoices</span>
          <span class="sp-text">2,431 records</span>
        </div>
        <div style="flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--sp-sunken)">
          <div class="sp-row" style="gap: 8px">
            <input
              class="sp-input"
              data-part="query"
              data-subject
              type="text"
              autocomplete="off"
              spellcheck="false"
              placeholder="Ask for it in your own words"
              aria-label="Describe the invoices you want"
            />
            <button class="sp-button sp-button--sm sp-context" data-part="run" type="button">Run</button>
          </div>
          <div
            class="sp-row sp-row--wrap sp-context"
            data-part="chips"
            style="gap: 6px; height: 60px; align-content: flex-start"
          >
            <span class="sp-text" data-part="chips-empty" style="font-size: 11px">No filters yet</span>
          </div>
          <div
            class="sp-surface sp-context"
            data-part="results"
            style="display: flex; flex-direction: column; gap: 6px; height: 80px; padding: 8px 10px"
          >
            <span class="sp-label" data-part="result" data-state="idle">Nothing run yet</span>
            <div data-part="rows" style="display: flex; flex-direction: column; gap: 4px; opacity: 0; transition: opacity 0.2s var(--sp-ease)">
              ${n}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`query`),o=e(i,`chips`),s=e(i,`chips-empty`),c=e(i,`result`),l=e(i,`rows`),u=()=>{let e=a.value.toLowerCase(),n=t.flatMap(t=>{let n=e.match(t.test);return n?[r(t.key,t.read(n),t.name)]:[]});s.hidden=n.length>0;for(let e of o.querySelectorAll(`.sp-chip`))e.remove();return o.insertAdjacentHTML(`beforeend`,n.join(``)),n.length},d=()=>{let e=u();c.dataset.state=e>0?`ran`:`idle`,c.textContent=e>0?`2 matches, 3,245.00 total`:`Nothing understood yet, so nothing to run`,l.style.opacity=e>0?`1`:`0`};a.addEventListener(`input`,()=>{u(),c.dataset.state=`idle`,c.textContent=`Nothing run yet`,l.style.opacity=`0`}),a.addEventListener(`keydown`,e=>{e.key===`Enter`&&d()}),e(i,`run`).addEventListener(`click`,d)}export{i as mount};