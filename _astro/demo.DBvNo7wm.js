import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,r=`The result was counter­intuitive.`,i=`The result was counter-intuitive.`,a={narrow:100,wide:300},o=16,s={narrow:`The word has to break, so the soft hyphen is drawn.`,wide:`The word fits, so the soft hyphen draws nothing at all.`},c=22;function l(l){let u=(e,t,r,i)=>`
    <div class="sp-stack" style="gap: 4px">
      <span class="sp-label sp-context">${r}</span>
      <div style="width: ${a.wide}px; height: 66px">
        <p class="sp-text sp-text--ink" data-part="${e}"${i?` data-subject`:``} data-width="narrow" lang="en"
           style="margin: 0; width: ${a.narrow}px; font-family: ${n}; font-size: ${o}px;
                  line-height: ${c}px; -webkit-hyphens: manual; hyphens: manual">${t}</p>
      </div>
    </div>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Column width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Width" data-part="segmented" data-value="narrow">
            <button class="sp-segment" data-part="seg-narrow" value="narrow">narrow</button>
            <button class="sp-segment" data-part="seg-wide" value="wide">wide</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" style="gap: 10px; margin-top: 12px">
          ${u(`shy`,r,`counter&shy;intuitive`,!0)}
          ${u(`hard`,i,`counter-intuitive`,!1)}
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="readout"></span>
      </div>
    </div>
  `;let d=n=>{let r=a[n],i=s[n];if(!(r===void 0||!i)){for(let e of t(l,`shy`).concat(t(l,`hard`)))e.dataset.width=n,e.style.width=`${r}px`;e(l,`readout`).textContent=i}};d(`narrow`),e(l,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{l as mount};