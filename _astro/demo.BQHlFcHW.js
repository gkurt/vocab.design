import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#f2564b`,n=`#7f1d18`,r=74,i=1.6,a=e=>[1,3,5].map(t=>Number.parseInt(e.slice(t,t+2),16)),o=(e,t,n)=>`rgb(${e.map((e,r)=>Math.round(e+((t[r]??e)-e)*n)).join(` `)})`;function s(){let e=a(n),s=a(t);return Array.from({length:r},(t,n)=>{let a=((n+1)*i).toFixed(1),c=((n+1)/r)**1.7;return`${a}px ${a}px 0 ${o(e,s,c)}`}).join(`, `)}function c(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-stack" style="gap: 10px; align-items: center">
        <div
          data-part="tile"
          data-subject
          data-shadow="long"
          style="display: flex; align-items: center; justify-content: center; width: 136px; height: 136px; border-radius: 26px; background: ${t}; overflow: hidden"
        >
          <span data-part="glyph" style="font-size: 64px; font-weight: 700; line-height: 1; color: #ffffff">N</span>
        </div>
        <span class="sp-label">Notes</span>
      </div>

      <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="segmented" data-value="long" data-axis="Shadow">
        <button class="sp-segment" data-part="seg-long" value="long">Long shadow</button>
        <button class="sp-segment" data-part="seg-none" value="none">No shadow</button>
      </sp-segmented>
    </div>
  `;let r=e(n,`tile`),i=e(n,`glyph`),a=s(),o=e=>{r.dataset.shadow=e,i.style.textShadow=e===`long`?a:`none`};o(`long`),e(n,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{c as mount};