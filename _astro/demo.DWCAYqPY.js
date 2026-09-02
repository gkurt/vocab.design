import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={plain:{text:`Send your documents within 30 days. If we have not received them by then, we will close your application.`,sentences:`2`,longest:`13 words`,level:`Lower secondary`,ok:!0},original:{text:`In the event that the aforementioned documentation is not received by the Department within thirty (30) days of the date of this notification, your application will be deemed to have been withdrawn and no further action will be taken in respect of it.`,sentences:`1`,longest:`43 words`,level:`Above lower secondary`,ok:!1}},n={plain:`The same instruction, the same deadline, the same consequence. Short sentences, words the reader already owns, and the action at the front.`,original:`Correct, complete and unusable. Nothing here is wrong, and nobody gets the instruction out of it on one pass, which is the failure the criterion names.`};function r(r){let i=(e,t,n,r)=>`
    <div class="sp-stack" style="flex: ${r} 1 0; min-width: 0; gap: 1px">
      <span class="sp-label" style="font-size: 9.5px">${e}</span>
      <span class="sp-text sp-text--ink" data-part="${t}" data-version="plain"
            style="font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${n}</span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="plain" data-axis="Version" data-term="plain">
            <button class="sp-segment" data-part="seg-plain" value="plain"
                    style="padding: 5px 10px; font-size: 12px">Rewritten</button>
            <button class="sp-segment" data-part="seg-original" value="original"
                    style="padding: 5px 10px; font-size: 12px">As it arrived</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="prose" data-subject data-pose="[data-version=plain]" data-version="plain"
             style="margin-top: 9px; padding: 12px 13px; height: 100px; overflow: hidden">
          <p class="sp-prose sp-text--ink" data-part="draft"
             style="margin: 0; --sp-leading: 1.55; --sp-measure: 60ch; font-size: 12px">${t.plain.text}</p>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; gap: 10px; height: 30px">
          ${i(`Sentences`,`sentences`,t.plain.sentences,`1`)}
          ${i(`Longest sentence`,`longest`,t.plain.longest,`1.2`)}
          ${i(`Reading level`,`level`,t.plain.level,`1.7`)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-version="plain"
           style="margin: 8px 0 0; height: 32px; font-size: 11px">${n.plain}</p>
      </div>
    </div>
  `;let a=e(r,`prose`),o=e(r,`draft`),s=e(r,`sentences`),c=e(r,`longest`),l=e(r,`level`),u=e(r,`caption`),d=e=>{let r=t[e];a.dataset.version=e,o.textContent=r.text;for(let[t,n]of[[s,r.sentences],[c,r.longest],[l,r.level]])t.dataset.version=e,t.textContent=n;l.dataset.ok=r.ok?`yes`:`no`,u.dataset.version=e,u.textContent=n[e]};d(`plain`),e(r,`segmented`).addEventListener(`change`,e=>{d(e.detail)})}export{r as mount};