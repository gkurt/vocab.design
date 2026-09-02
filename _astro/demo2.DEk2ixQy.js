import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`link-1`,title:`Renew your card`,note:`Expires after three years.`},{key:`link-2`,title:`Reserve a room`,note:`Holds up to six people.`},{key:`link-3`,title:`Opening hours`,note:`Varies in August.`}],n=`Read more`,r={descriptive:`Each link names its own destination, so the links list reads as a table of contents.`,vague:`The words moved out of the link. Three destinations, one name, and the list says nothing.`},i=`color: var(--sp-accent); text-decoration: underline; font-size: 12px; white-space: nowrap`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="descriptive" data-axis="Link text" data-term="descriptive">
            <button class="sp-segment" data-part="seg-descriptive" value="descriptive">Names the page</button>
            <button class="sp-segment" data-part="seg-vague" value="vague">“Read more”</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 12px; align-items: flex-start">
          <div class="sp-surface sp-grow" data-part="results" data-subject data-pose="[data-mode=descriptive]"
               data-mode="descriptive" style="padding: 10px 12px">
            <span class="sp-label">Search results</span>
            <div style="margin-top: 6px">${t.map(e=>`
    <div data-part="row-${e.key}" style="height: 42px">
      <p class="sp-text" data-part="copy-${e.key}" style="margin: 0; font-size: 12px; line-height: 1.4"></p>
    </div>`).join(``)}</div>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 156px; padding: 10px 12px">
            <span class="sp-label">Links list</span>
            <div style="margin-top: 6px">${t.map(e=>`
    <p class="sp-text sp-text--ink" data-part="readout-${e.key}" data-state="descriptive"
       style="margin: 0; height: 18px; font-size: 12px; white-space: nowrap; overflow: hidden"></p>`).join(``)}</div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="descriptive"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${r.descriptive}</p>
      </div>
    </div>
  `;let o=e(a,`results`),s=e(a,`caption`),c=()=>{let r=t.map(t=>e(a,t.key).textContent?.trim()??``);for(let[i,o]of t.entries()){let t=e(a,`readout-${o.key}`),s=r[i]??``;t.textContent=s,t.dataset.state=s===n?`vague`:`descriptive`}},l=l=>{o.dataset.mode=l;for(let r of t){let t=e(a,`copy-${r.key}`);t.innerHTML=l===`descriptive`?`<a href="#" data-part="${r.key}" data-state="descriptive" style="${i}">${r.title}</a>
             <span style="font-size: 11px">${r.note}</span>`:`<span class="sp-text--ink" style="font-size: 12px">${r.title}.</span>
             <span style="font-size: 11px">${r.note}</span>
             <a href="#" data-part="${r.key}" data-state="vague" style="${i}">${n}</a>`}s.dataset.case=l,s.textContent=r[l],c()};l(`descriptive`),e(a,`segmented`).addEventListener(`change`,e=>{l(e.detail===`vague`?`vague`:`descriptive`)})}export{a as mount};