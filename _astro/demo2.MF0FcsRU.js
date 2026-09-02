import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,n={primes:{single:`′`,double:`″`,read:`U+2032 prime, U+2033 double prime`,note:`A straight stroke leaning right, tapering to its foot. Nothing curls at either end. This is the mark a measurement takes.`},straight:{single:`'`,double:`"`,read:`U+0027 apostrophe, U+0022 quotation mark`,note:`The typewriter had one upright tick doing the work of four marks, and the keyboard still has it.`},curly:{single:`’`,double:`”`,read:`U+2019 and U+201D, the closing quotes`,note:`What autocorrect makes of a tick. Comma-shaped tails, curving the wrong way: quotation marks, not units.`}},r=e=>e in n,i=54,a=104;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="primes" data-axis="Mark" data-term="primes">
            <button class="sp-segment" data-part="seg-primes" value="primes">primes</button>
            <button class="sp-segment" data-part="seg-straight" value="straight">straight</button>
            <button class="sp-segment" data-part="seg-curly" value="curly">curly</button>
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: center; height: ${i}px; padding-left: 4px; margin-top: 4px">
          <span data-part="line" style="font-family: ${t}; font-size: 40px; line-height: 1.2; white-space: nowrap">5<span
            data-part="foot" data-subject data-marks="primes"
            data-pose="[data-marks=primes]">${n.primes.single}</span> 10<span
            data-part="inch" data-marks="primes">${n.primes.double}</span> tall</span>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start; margin-top: 2px">
          <div data-part="detail" class="sp-surface"
               style="position: relative; flex: 0 0 auto; width: ${a}px; height: ${a}px; overflow: hidden">
            <span data-part="detail-mark" aria-hidden="true"
                  style="position: absolute; left: 0; right: 0; top: 24px; text-align: center;
                         font-family: ${t}; font-size: 96px; line-height: 1">${n.primes.single}</span>
          </div>
          <div class="sp-stack" style="gap: 6px; padding-top: 2px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${n.primes.read}</span>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; width: 290px; height: 59px">${n.primes.note}</p>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`foot`),c=e(o,`inch`),l=e(o,`detail-mark`),u=e(o,`readout`),d=e(o,`note`);e(o,`segmented`).addEventListener(`change`,e=>{let t=e.detail;if(!r(t))return;let i=n[t];s.dataset.marks=t,c.dataset.marks=t,s.textContent=i.single,c.textContent=i.double,l.textContent=i.single,u.textContent=i.read,d.textContent=i.note})}export{o as mount};