import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`street`,label:`Street`,value:`12 Ash Lane`},{key:`city`,label:`City`,value:`Sheffield`},{key:`postcode`,label:`Postcode`,value:`S1 4QP`}],r={retype:`The delivery address is the billing address, and the process asks for all of it again. Criterion 3.3.7 is Level A, so this is not a refinement.`,carried:`One control offers what the process already holds. Prefilling the fields outright satisfies the criterion just as well: it asks for either.`},i=`display: flex; align-items: center; gap: 8px; height: 24px`,a=`flex: 0 0 54px; font-size: 10.5px`,o=`flex: 1 1 auto; min-width: 0; font-size: 11.5px; padding: 3px 8px; height: 24px`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">This checkout</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="flow" data-axis="Flow" data-value="carried">
            <button class="sp-segment" type="button" data-part="seg-retype" value="retype"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Asks again</button>
            <button class="sp-segment" type="button" data-part="seg-carried" value="carried"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Carries it forward</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 8px; height: 158px; gap: 10px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="step-one"
               style="flex: 1 1 0; min-width: 0; padding: 10px; display: flex; flex-direction: column; gap: 8px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">Step 1 of 2, billing address</span>
            <div style="height: 26px; display: flex; align-items: center">
              <span class="sp-text" style="font-size: 10.5px">Answered on the previous screen</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px">${n.map(({key:e,label:t,value:n})=>`
      <div style="${i}">
        <span class="sp-label" style="${a}">${t}</span>
        <span class="sp-text sp-text--ink" data-part="given-${e}" style="flex: 1 1 auto; min-width: 0; font-size: 11.5px">${n}</span>
      </div>`).join(``)}</div>
          </div>

          <div class="sp-surface" data-part="step-two" data-retyped="0"
               style="flex: 1 1 0; min-width: 0; padding: 10px; display: flex; flex-direction: column; gap: 8px">
            <span class="sp-label sp-context" style="font-size: 9.5px">Step 2 of 2, delivery address</span>
            <div style="height: 26px; display: flex; align-items: center">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="use-billing"
                      style="font-size: 11px; padding: 3px 9px">Use the billing address</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px">${n.map(({key:e,label:t},n)=>`
      <div style="${i}">
        <span class="sp-label sp-context" style="${a}">${t}</span>
        <input class="sp-input" data-part="${e}" ${n===0?`data-subject`:``} aria-label="${t}" style="${o}" />
      </div>`).join(``)}</div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-flow="carried"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${r.carried}</p>
      </div>
    </div>
  `;let c=n.map(({key:t,value:n})=>({key:t,value:n,el:e(s,t)})),l=e(s,`use-billing`),u=e(s,`step-two`),d=e(s,`caption`),f=new Set,p=()=>{u.dataset.retyped=String(f.size)},m=e=>{f.clear();for(let{el:e}of c)e.value=``,t(e,`data-filled`,!1);t(l,`hidden`,e===`retype`),d.dataset.flow=e,d.textContent=r[e],p()};m(`carried`),l.addEventListener(`click`,()=>{for(let{el:e,value:n}of c)e.value=n,t(e,`data-filled`,!0)});for(let{key:e,el:n}of c)n.addEventListener(`input`,()=>{n.value.length>0?f.add(e):f.delete(e),t(n,`data-filled`,n.value.length>0),p()});e(s,`flow`).addEventListener(`change`,e=>{m(e.detail)})}export{s as mount};