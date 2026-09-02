import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`street`,label:`Street`,kind:`field`},{key:`postcode`,label:`Postcode`,kind:`field`},{key:`standard`,label:`Standard`,kind:`radio`},{key:`express`,label:`Express`,kind:`radio`}],r={labelled:`The legend and the aria-labelledby do the same job: every field arrives with the set it belongs to.`,bare:`The heading is still on screen and joined to nothing, so Standard and Express arrive with no question attached.`},i=`vd-gl-speed`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="labelled" data-axis="Radio set" data-term="labelled">
            <button class="sp-segment" data-part="seg-labelled" value="labelled">Named group</button>
            <button class="sp-segment" data-part="seg-bare" value="bare">Unnamed group</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 12px; align-items: flex-start">
          <div class="sp-grow">
            <fieldset class="sp-context" data-part="address"
                      style="min-width: 0; margin: 0; padding: 2px 10px 10px; border: 1px solid var(--sp-line); border-radius: 6px">
              <legend class="sp-label" style="padding: 0 4px">Shipping address</legend>
              <div class="sp-stack" style="gap: 6px">
                ${n.filter(e=>e.kind===`field`).map(e=>`
    <div class="sp-row" style="gap: 6px; height: 30px">
      <label class="sp-label" for="vd-gl-${e.key}" style="flex: 0 0 56px">${e.label}</label>
      <input class="sp-input sp-grow" id="vd-gl-${e.key}" data-part="stop-${e.key}" autocomplete="off" />
    </div>`).join(``)}
              </div>
            </fieldset>

            <div class="sp-surface" data-part="speed" data-subject data-pose="[data-mode=labelled]" data-mode="labelled"
                 role="radiogroup" aria-labelledby="${i}" style="margin-top: 8px; padding: 10px 12px">
              <span class="sp-label" id="${i}">Delivery speed</span>
              <div class="sp-row" style="margin-top: 6px; gap: 8px">
                <button class="sp-chip" type="button" role="radio" aria-checked="true"
                        data-part="stop-standard" data-selected>Standard</button>
                <button class="sp-chip" type="button" role="radio" aria-checked="false"
                        data-part="stop-express">Express</button>
              </div>
            </div>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 160px; padding: 10px 12px">
            <span class="sp-label">Announced on arrival</span>
            <p class="sp-text sp-text--ink" data-part="voice" data-state="street-named"
               style="margin: 6px 0 0; height: 60px; font-size: 11px; line-height: 1.4; overflow: hidden"></p>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="next"
                    style="margin-top: 8px; width: 100%">Next field</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="labelled"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${r.labelled}</p>
      </div>
    </div>
  `;let o=e(a,`speed`),s=e(a,`voice`),c=e(a,`caption`),l=n.filter(e=>e.kind===`radio`),u=0,d=e=>e.closest(`fieldset, [role=group], [role=radiogroup]`),f=e=>{if(!e)return``;let t=e.getAttribute(`aria-labelledby`);return t?a.querySelector(`#${t}`)?.textContent?.trim()??``:e.querySelector(`legend`)?.textContent?.trim()??``},p=e=>e?.getAttribute(`role`)===`radiogroup`?`radio group`:`group`,m=t=>{if(t.kind===`field`)return`${t.label}, edit text`;let n=l.findIndex(e=>e.key===t.key)+1,r=e(a,`stop-${t.key}`).getAttribute(`aria-checked`)===`true`;return`${t.label}, radio button, ${n} of ${l.length}, ${r?`selected`:`not selected`}`},h=()=>{let r=n[u];if(!r)return;let i=e(a,`stop-${r.key}`),o=d(i),c=f(o),l=c?`“${c}”, ${p(o)}. `:o?`${p(o)}, unnamed. `:``;s.dataset.state=`${r.key}-${c?`named`:`unnamed`}`,s.textContent=l+m(r);for(let[r,i]of n.entries())t(e(a,`stop-${i.key}`),`data-sim-focus`,r===u)},g=e=>{o.dataset.mode=e,e===`labelled`?o.setAttribute(`aria-labelledby`,i):o.removeAttribute(`aria-labelledby`),c.dataset.case=e,c.textContent=r[e],u=0,h()};g(`labelled`),e(a,`next`).addEventListener(`click`,()=>{u=Math.min(u+1,n.length-1),h()});for(let[r,i]of l.entries())e(a,`stop-${i.key}`).addEventListener(`click`,()=>{for(let n of l){let r=e(a,`stop-${n.key}`),o=n.key===i.key;r.setAttribute(`aria-checked`,String(o)),t(r,`data-selected`,o)}u=n.length-l.length+r,h()});e(a,`segmented`).addEventListener(`change`,e=>{g(e.detail===`bare`?`bare`:`labelled`)})}export{a as mount};