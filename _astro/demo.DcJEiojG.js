import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`basic`,label:`Basic Latin`},{key:`latin1`,label:`Latin-1 Supplement`},{key:`lat-ext`,label:`Latin Extended-A`},{key:`greek`,label:`Greek`},{key:`cyrillic`,label:`Cyrillic`},{key:`symbols`,label:`Symbols, arrows`}],r=17,i=3,a=118,o=12,s=18,c=9,l=4,u=n.length*r+(n.length-1)*i,d={full:{rows:n.length,range:`no unicode-range: the whole file is fetched`,size:`≈ 180 KB`},latin:{rows:3,range:`unicode-range: U+0000-00FF, U+0100-017F`,size:`≈ 42 KB`},used:{rows:1,range:`unicode-range: U+0020-007E`,size:`≈ 11 KB`}},f=e=>e in d,p=e=>e*r+(e-1)*i;function m(m){let h=Array.from({length:o},()=>`<span class="sp-swatch" style="width: ${s}px; height: ${c}px; border-radius: 2px"></span>`).join(``),g=(e,t)=>`
    <div data-part="row-${e}" data-lit="off" style="display: flex; align-items: center; gap: ${l}px; height: ${r}px">
      <span class="sp-label" style="width: ${a}px; flex: 0 0 auto; white-space: nowrap">${t}</span>
      ${h}
    </div>`;m.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="What ships" data-value="latin" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-full" value="full">full face</button>
            <button class="sp-segment" data-part="seg-latin" value="latin">Latin</button>
            <button class="sp-segment" data-part="seg-used" value="used">used only</button>
          </sp-segmented>
        </div>
        <div data-part="grid" style="position: relative; height: ${u}px; margin-top: 10px">
          <div class="sp-stack sp-context" style="gap: ${i}px">
            ${n.map(e=>g(e.key,e.label)).join(``)}
          </div>
          <span data-part="subset" data-subject data-subset data-pose="[data-subset]"
                style="position: absolute; left: -6px; right: -6px; top: -5px; height: ${p(d.latin.rows)+10}px;
                       border: 2px solid var(--sp-accent); border-radius: 6px"></span>
        </div>
        <div class="sp-row sp-row--between sp-context" style="height: 30px; margin-top: 10px">
          <span class="sp-chip" data-part="range" style="cursor: default">${d.latin.range}</span>
          <span class="sp-label" data-part="size" style="color: var(--sp-ink); font-variant-numeric: tabular-nums">${d.latin.size}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          Payload figures here are illustrative, not weighed: what a subset saves depends on the face.
        </p>
      </div>
    </div>
  `;let _=e(m,`subset`),v=e(m,`range`),y=e(m,`size`),b=n.map(t=>e(m,`row-${t.key}`)),x=e=>{let n=d[e];_.style.height=`${p(n.rows)+10}px`,t(_,`data-subset`,e!==`full`),_.dataset.ships=e,b.forEach((e,t)=>{let r=t<n.rows;e.dataset.lit=r?`on`:`off`,e.style.setProperty(`--sp-swatch`,r?`var(--sp-accent)`:`var(--sp-line)`)}),v.textContent=n.range,y.textContent=n.size};x(`latin`),e(m,`segmented`).addEventListener(`change`,e=>{let t=e.detail;f(t)&&x(t)})}export{m as mount};