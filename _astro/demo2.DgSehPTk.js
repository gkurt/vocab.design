import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`csv`,label:`Spreadsheet`,note:`default`},{key:`json`,label:`Data file`,note:``},{key:`pdf`,label:`Printable`,note:``}],r=[{key:`month`,label:`Last 30 days`,note:`default`},{key:`quarter`,label:`This quarter`,note:``},{key:`all`,label:`Everything`,note:``}],i=[`RFC 4180 delimited`,`UTF-8 with BOM`,`ISO 8601 timestamps`,`NDJSON stream`,`Gzip envelope`,`Epoch seconds`,`Rolling 30d window`,`Fiscal Q window`,`Unbounded extract`],a={calm:`Two questions, grouped, in the reader’s own words, both already answered. The load left is the load the task really carries.`,dense:`One task, nine ungrouped options, named after the file format and answered by nobody. Everything added here is extraneous load.`},o=`padding: 6px 10px; border: 1px solid var(--sp-line); border-radius: 6px`;function s(s){let c=(e,t,n)=>`
    <button class="sp-chip" type="button" role="radio" data-part="${e}-${t.key}"
            data-pick="${e}" data-key="${t.key}" aria-checked="${String(n)}"
            ${n?`data-selected`:``} style="font-size: 11px; padding: 3px 9px">
      ${t.label}${t.note?`<span class="sp-label" style="font-size: 10px">${t.note}</span>`:``}
    </button>`,l=()=>`
    <div class="sp-stack" style="gap: 8px">
      <div style="${o}">
        <span class="sp-label">What should it open in?</span>
        <div class="sp-row sp-row--wrap" style="margin-top: 4px; gap: 6px">
          ${n.map(e=>c(`fmt`,e,e.key===`csv`)).join(``)}
        </div>
      </div>
      <div style="${o}">
        <span class="sp-label">How far back?</span>
        <div class="sp-row sp-row--wrap" style="margin-top: 4px; gap: 6px">
          ${r.map(e=>c(`range`,e,e.key===`month`)).join(``)}
        </div>
      </div>
    </div>`,u=()=>`
    <div>
      <span class="sp-label" style="font-size: 11px">
        Configure the extract profile. Unset fields inherit the workspace policy, which may differ per region.
      </span>
      <div class="sp-row sp-row--wrap" style="margin-top: 6px; gap: 5px">
        ${i.map((e,t)=>`<button class="sp-chip" type="button" data-part="dense-${t}"
             style="font-size: 11px; padding: 3px 9px">${e}</button>`).join(``)}
      </div>
    </div>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Export your orders, built</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-term="calm" data-part="segmented" data-value="calm">
            <button class="sp-segment" data-part="seg-calm" value="calm">Chunked</button>
            <button class="sp-segment" data-part="seg-dense" value="dense">Dense</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="task" data-subject data-pose="[data-mode=calm]" data-mode="calm"
             style="margin-top: 10px; padding: 10px 12px; height: 156px; overflow: hidden">${l()}</div>

        <div class="sp-row sp-context" style="justify-content: flex-end; margin-top: 10px; height: 18px">
          <span class="sp-text sp-text--ink" data-part="readout" data-state="calm"
                style="font-size: 12px; white-space: nowrap">Spreadsheet, last 30 days</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="calm"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${a.calm}</p>
      </div>
    </div>
  `;let d=e(s,`task`),f=e(s,`readout`),p=e(s,`caption`),m=(e,t)=>{let n=d.querySelector(`[data-pick="${e}"][aria-checked="true"]`)?.dataset.key;return t.find(e=>e.key===n)?.label??``},h=()=>d.dataset.mode===`dense`?`Nothing set yet`:`${m(`fmt`,n)}, ${m(`range`,r).toLowerCase()}`;d.addEventListener(`click`,e=>{let n=e.target.closest(`[data-pick]`);if(!n)return;let r=n.dataset.pick;for(let e of d.querySelectorAll(`[data-pick="${r}"]`)){let r=e===n;e.setAttribute(`aria-checked`,String(r)),t(e,`data-selected`,r)}f.textContent=h()}),e(s,`segmented`).addEventListener(`change`,e=>{let t=e.detail===`dense`?`dense`:`calm`;d.dataset.mode=t,d.innerHTML=t===`dense`?u():l(),f.dataset.state=t,f.textContent=h(),p.dataset.case=t,p.textContent=a[t]})}export{s as mount};