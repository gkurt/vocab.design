import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`summary`,name:`Summary`,body:`4 shipments`},{key:`chart`,name:`Chart`,body:`Last 30 days`},{key:`alerts`,name:`Alerts`,body:`2 delayed`},{key:`notes`,name:`Notes`,body:`None`}],r={matched:{summary:0,chart:0,alerts:0,notes:0},reordered:{summary:0,chart:0,alerts:-1,notes:0}},i={matched:`Every card is where the markup put it, so speech, Tab, and the eye all take the row in the same sequence.`,reordered:`Alerts is pulled to the front with CSS order. It is first on screen and still third in the source, and nothing on screen says so.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="matched" data-axis="Laid out" data-term="matched">
            <button class="sp-segment" data-part="seg-matched" value="matched">In source order</button>
            <button class="sp-segment" data-part="seg-reordered" value="reordered">With CSS order</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="row" data-subject data-pose="[data-mode=matched]" data-mode="matched" role="list"
             style="margin-top: 10px; padding: 10px; display: flex; gap: 8px">${n.map(e=>`
    <div class="sp-surface" data-part="card-${e.key}" data-key="${e.key}" role="listitem"
         style="flex: 1 1 0; min-width: 0; padding: 8px; height: 58px; display: flex; flex-direction: column; gap: 4px">
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">${e.name}</span>
      <span class="sp-text" style="font-size: 11px">${e.body}</span>
    </div>`).join(``)}</div>

        <div class="sp-row sp-context" style="margin-top: 10px; gap: 10px; height: 30px">
          <span class="sp-label" style="flex: 0 0 auto">Speech</span>
          <span class="sp-text sp-text--ink sp-grow" data-part="voice" data-state="match"
                style="font-size: 11px; white-space: nowrap; overflow: hidden"></span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="next"
                  style="flex: 0 0 auto">Next</button>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="matched"
           style="margin: 8px 0 0; height: 32px; font-size: 11px">${i.matched}</p>
      </div>
    </div>
  `;let o=e(a,`row`),s=e(a,`voice`),c=e(a,`caption`),l=`matched`,u=0,d=()=>n.map((e,t)=>({c:e,i:t})).sort((e,t)=>(r[l][e.c.key]??0)-(r[l][t.c.key]??0)||e.i-t.i).map(e=>e.c),f=()=>{let i=d();for(let[o,s]of n.entries()){let n=e(a,`card-${s.key}`);n.style.order=String(r[l][s.key]??0),n.dataset.visual=String(i.indexOf(s)+1),t(n,`data-sim-focus`,o===u)}let o=n[u];if(!o)return;let c=i.indexOf(o)===u;s.dataset.state=c?`match`:`mismatch`,s.textContent=`${o.name}, ${o.body}, ${u+1} of ${n.length}`},p=e=>{l=e,u=0,o.dataset.mode=e,c.dataset.case=e,c.textContent=i[e],f()};p(`matched`),e(a,`next`).addEventListener(`click`,()=>{u=Math.min(u+1,n.length-1),f()}),e(a,`segmented`).addEventListener(`change`,e=>{p(e.detail===`reordered`?`reordered`:`matched`)})}export{a as mount};