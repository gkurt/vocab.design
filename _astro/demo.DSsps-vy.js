import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Source Serif 4 Variable', Georgia, serif`,n=20,r=`abcdefghijklmnopqrstuvwxyz`,i=58,a={fox:{text:`The quick brown fox jumps over the lazy dog`},jugs:{text:`Pack my box with five dozen liquor jugs`},near:{text:`The quick brown fox jumps over the dog`}},o=e=>e in a;function s(s){let c=e=>`
    <span data-part="tally-${e}" data-used="no"
          style="display: inline-flex; align-items: center; justify-content: center; width: 13px; height: 18px;
                 border-radius: 3px; font-size: 11px; font-weight: 500; line-height: 1">${e}</span>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Line" data-part="segmented" data-value="fox" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-fox" value="fox" style="white-space: nowrap">fox</button>
            <button class="sp-segment" data-part="seg-jugs" value="jugs" style="white-space: nowrap">jugs</button>
            <button class="sp-segment" data-part="seg-near" value="near" style="white-space: nowrap">near miss</button>
          </sp-segmented>
        </div>
        <div style="height: ${i}px; margin-top: 10px">
          <p data-part="line" data-subject data-complete="yes" data-pose="[data-complete=yes]"
             style="margin: 0; font-family: ${t}; font-size: ${n}px; line-height: 1.35">${a.fox.text}</p>
        </div>
        <div class="sp-row sp-context" data-part="tally" style="gap: 2px; margin-top: 6px; height: 20px">
          ${[...r].map(c).join(``)}
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 8px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          Completeness is all the word claims. It says nothing about whether the sentence is a good proof of a
          face, which is why designers reach for other words.
        </p>
      </div>
    </div>
  `;let l=e(s,`line`),u=e(s,`readout`),d=[...r].map(t=>[t,e(s,`tally-${t}`)]),f=e=>{if(!o(e))return;let{text:t}=a[e];l.textContent=t;let n=new Set([...t.toLowerCase()].filter(e=>r.includes(e)));for(let[e,t]of d){let r=n.has(e);t.dataset.used=r?`yes`:`no`,t.style.background=r?`var(--sp-accent)`:`var(--sp-sunken)`,t.style.color=r?`var(--sp-accent-ink)`:`var(--sp-muted)`}let i=[...r].filter(e=>!n.has(e));l.dataset.complete=i.length===0?`yes`:`no`,l.dataset.count=String(n.size),u.textContent=i.length?`${n.size} of 26: no ${i.join(`, `)}`:`26 of 26`};f(`fox`),e(s,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{s as mount};