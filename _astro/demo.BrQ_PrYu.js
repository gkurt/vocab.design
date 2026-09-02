import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`node-h1`,kind:`heading`,say:`“Weekly report, heading”`},{key:`node-p`,kind:`text`,say:`“Two export formats shipped.”`},{key:`node-link1`,kind:`link`,say:`“Full changelog, link”`},{key:`node-field`,kind:`control`,say:`“Search notes, text field”`},{key:`node-button`,kind:`control`,say:`“Subscribe, button”`},{key:`node-h2`,kind:`heading`,say:`“Known issues, heading”`},{key:`node-link2`,kind:`link`,say:`“Open tracker, link”`}],r={headings:`heading`,links:`link`,controls:`control`},i={headings:`Set to Headings, a flick right walks headings and nothing else. Seven elements on the page, two stops, which is how a reader skims.`,links:`The same flick, the same page, a different unit of travel. Nothing about the document changed; the dial did.`,controls:`The rotor offers a setting only when the page contains that kind of element, so its list is a readout of the structure you shipped.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between" style="gap: 10px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Rotor" data-part="rotor" data-subject data-value="headings">
            <button class="sp-segment" data-part="seg-headings" value="headings"
                    style="padding: 5px 10px; font-size: 12px">Headings</button>
            <button class="sp-segment" data-part="seg-links" value="links"
                    style="padding: 5px 10px; font-size: 12px">Links</button>
            <button class="sp-segment" data-part="seg-controls" value="controls"
                    style="padding: 5px 10px; font-size: 12px">Form controls</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="page" data-setting="headings"
             style="margin-top: 9px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px">
          <span class="sp-heading" data-part="node-h1" style="font-size: 12.5px">Weekly report</span>
          <span class="sp-text" data-part="node-p" style="font-size: 11px">Two export formats shipped this week.</span>
          <span class="sp-text" data-part="node-link1"
                style="font-size: 11px; text-decoration: underline">Full changelog</span>
          <div class="sp-row" style="gap: 8px">
            <input class="sp-input" data-part="node-field" type="text" readonly aria-label="Search notes"
                   placeholder="Search notes" style="flex: 1 1 auto; min-width: 0; font-size: 11px; padding: 3px 8px" />
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="node-button"
                    style="flex: 0 0 auto; font-size: 11px; padding: 3px 9px; cursor: default">Subscribe</button>
          </div>
          <span class="sp-heading" data-part="node-h2" style="font-size: 12.5px">Known issues</span>
          <span class="sp-text" data-part="node-link2"
                style="font-size: 11px; text-decoration: underline">Open tracker</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="flick">Flick right</button>
          <span class="sp-text sp-text--ink" data-part="say" data-at="node-h1"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Stop 1 of 2 · ${n[0]?.say}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-setting="headings"
           style="margin: 7px 0 0; height: 32px; font-size: 11px">${i.headings}</p>
      </div>
    </div>
  `;let o=e(a,`page`),s=e(a,`say`),c=e(a,`caption`),l=`headings`,u=0,d=e=>n.filter(t=>t.kind===r[e]),f=()=>{let r=d(l),i=r[u]??r[0];if(i){for(let r of n)t(e(a,r.key),`data-sim-focus`,r.key===i.key);s.dataset.at=i.key,s.textContent=`Stop ${u+1} of ${r.length} · ${i.say}`}},p=e=>{l=e,u=0,o.dataset.setting=e,c.dataset.setting=e,c.textContent=i[e],f()};p(`headings`),e(a,`flick`).addEventListener(`click`,()=>{u=Math.min(u+1,d(l).length-1),f()}),e(a,`rotor`).addEventListener(`change`,e=>{p(e.detail)})}export{a as mount};