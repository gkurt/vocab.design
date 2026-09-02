import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`,n=`Typeset`,r=16,i={minor:{value:1.2},fourth:{value:1.333},fifth:{value:1.5}},a=[{step:3,height:64},{step:2,height:44},{step:1,height:31},{step:0,height:26}],o=(e,t)=>r*e**t;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 8px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">base ${r}px</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="minor" data-axis="Ratio">
            <button class="sp-segment" data-part="seg-minor" value="minor">1.2</button>
            <button class="sp-segment" data-part="seg-fourth" value="fourth">1.333</button>
            <button class="sp-segment" data-part="seg-fifth" value="fifth">1.5</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" data-part="ladder" data-subject data-ratio="minor" style="gap: 0; margin-top: 6px">
          ${a.map(({step:e,height:r})=>`
      <div class="sp-row" data-part="rung-${e}"
           style="height: ${r}px; gap: 12px; align-items: flex-end; overflow: hidden;
                  border-bottom: 1px solid var(--sp-line); padding-bottom: 3px">
        <span class="sp-label" data-part="math-${e}"
              style="width: 132px; font-variant-numeric: tabular-nums; white-space: nowrap"></span>
        <span data-part="sample-${e}" style="font-family: ${t}; white-space: nowrap; line-height: 1.1">${n}</span>
      </div>`).join(``)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px; font-size: 12px">
          Nothing here was chosen. Every rung is the one below it multiplied by the ratio, which is why a
          steeper ratio runs out of usable sizes by the fourth step and a shallow one barely separates them.
        </p>
      </div>
    </div>
  `;let c=e(s,`ladder`),l=t=>{let n=i[t];if(n){c.dataset.ratio=t;for(let{step:t}of a){let i=o(n.value,t);e(s,`sample-${t}`).style.fontSize=`${i.toFixed(1)}px`,e(s,`math-${t}`).innerHTML=t===0?`base = ${r.toFixed(1)}px`:`${r} × ${n.value}<sup>${t}</sup> = ${i.toFixed(1)}px`}}};l(`minor`),e(s,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{s as mount};