import{n as e,t}from"./parts.C-YLuC7Q.js";var n=`display: flex; align-items: center; flex: 0 0 auto; width: auto; background: var(--sp-sunken); color: var(--sp-muted); white-space: nowrap`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Listing</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px; padding: 14px 16px">
          <div class="sp-field">
            <label class="sp-label sp-context" id="vd-ig-label" for="vd-ig-amount">Nightly rate</label>
            <div class="sp-row" data-part="group" data-subject style="gap: 0; align-items: stretch; width: 236px">
              <span class="sp-input" data-part="prefix" style="${n}; border-radius: 6px 0 0 6px; border-right: 0">£</span>
              <input
                class="sp-input sp-grow"
                type="text"
                id="vd-ig-amount"
                data-part="amount"
                inputmode="numeric"
                placeholder="0"
                aria-describedby="vd-ig-prefix-note"
                style="border-radius: 0; text-align: right"
              />
              <span class="sp-input" data-part="suffix" style="${n}; border-radius: 0 6px 6px 0; border-left: 0">per night</span>
            </div>
            <span class="sp-text sp-context" id="vd-ig-prefix-note" style="font-size: 12px">
              Pounds, before the cleaning fee.
            </span>
          </div>
          <div class="sp-divider sp-context"></div>
          <div class="sp-stack sp-context" data-part="aside" style="gap: 6px">
            <span class="sp-label">Search listings</span>
            <div class="sp-row" data-part="search" style="gap: 0; align-items: stretch; width: 236px">
              <input
                class="sp-input sp-grow"
                type="text"
                value="harbour"
                aria-label="Search listings"
                style="border-radius: 6px 0 0 6px; border-right: 0"
                readonly
              />
              <button class="sp-button" type="button" data-part="search-go" style="border-radius: 0 6px 6px 0; padding: 6px 12px">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`group`),a=e(r,`amount`),o=()=>t(i,`data-sim-focus`,!0);for(let t of[`prefix`,`suffix`,`amount`])e(r,t).addEventListener(`pointerdown`,o);a.addEventListener(`input`,()=>t(a,`data-filled`,a.value.trim()!==``)),r.addEventListener(`pointerdown`,e=>{i.contains(e.target)||t(i,`data-sim-focus`,!1)})}export{r as mount};