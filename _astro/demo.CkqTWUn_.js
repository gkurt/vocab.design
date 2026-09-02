import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`search`,name:`Search`,order:1},{key:`filters`,name:`Filters`,order:0},{key:`results`,name:`Results`,order:0},{key:`sort`,name:`Sort`,order:-1},{key:`saved`,name:`Saved`,order:0},{key:`help`,name:`Help`,order:0}],r={"flex-visual":`The container reads along its own lines, so the sequence runs 1 to 6 across the grid and Tab moves the way the eye does.`,normal:`Back to source order. Two tiles were moved by CSS order, so the sequence jumps backwards twice and nothing on screen says why.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="flex-visual" data-axis="Container declares" data-term="flex-visual">
            <button class="sp-segment" data-part="seg-flow" value="flex-visual">flex-visual</button>
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
          </sp-segmented>
        </div>

        <div data-part="grid" data-subject data-pose="[data-flow=flex-visual]" data-flow="flex-visual"
             style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; reading-flow: flex-visual">
          ${n.map((e,t)=>`
    <div class="sp-surface" data-part="tile-${e.key}" data-key="${e.key}"
         style="flex: 1 1 128px; min-width: 0; height: 52px; padding: 6px 8px; order: ${e.order}">
      <div class="sp-row" style="gap: 6px">
        <span data-part="badge-${e.key}"
              style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
                     border-radius: 50%; background: var(--sp-accent-soft); font-size: 11px; font-weight: 600"></span>
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">${e.name}</span>
      </div>
      <span class="sp-label" style="display: block; margin-top: 3px; font-size: 10px">source ${t+1}</span>
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; height: 18px; gap: 10px">
          <span class="sp-label">Tab lands on</span>
          <span class="sp-text sp-text--ink" data-part="walk" data-state="idle" style="font-size: 11px">Nothing yet</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; gap: 10px">
          <p class="sp-text" data-stage-verdict data-part="caption" data-case="flex-visual"
             style="margin: 0; flex: 1 1 auto; height: 50px; font-size: 11px">${r[`flex-visual`]}</p>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab" style="flex: 0 0 auto">Press Tab</button>
        </div>
      </div>
    </div>
  `;let a=e(i,`grid`),o=e(i,`walk`),s=e(i,`caption`),c=`flex-visual`,l=-1,u=()=>n.map((e,t)=>({t:e,i:t})).sort((e,t)=>e.t.order-t.t.order||e.i-t.i).map(e=>e.t),d=()=>c===`flex-visual`?u():n,f=()=>{let r=d(),a=r[l];for(let o of n)e(i,`badge-${o.key}`).textContent=String(r.indexOf(o)+1),t(e(i,`tile-${o.key}`),`data-sim-focus`,a?.key===o.key),e(i,`tile-${o.key}`).dataset.place=String(r.indexOf(o)+1);o.dataset.state=a?`walking`:`idle`,o.textContent=a?`${a.name}, stop ${l+1} of ${r.length}`:`Nothing yet`},p=e=>{c=e,l=-1,a.dataset.flow=e,a.style.setProperty(`reading-flow`,e),s.dataset.case=e,s.textContent=r[e],f()};p(`flex-visual`),e(i,`tab`).addEventListener(`click`,()=>{l=Math.min(l+1,n.length-1),f()}),e(i,`segmented`).addEventListener(`change`,e=>{p(e.detail===`normal`?`normal`:`flex-visual`)})}export{i as mount};