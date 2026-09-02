import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`,n=`Verdana, 'DejaVu Sans', 'Bitstream Vera Sans', sans-serif`,r={paired:{display:t,text:n,names:`Georgia over Verdana`,note:`Different skeletons, close x-heights: the contrast reads as a decision.`},clashing:{display:`Arial, Helvetica, 'Liberation Sans', sans-serif`,text:n,names:`Arial over Verdana`,note:`Two grotesques that nearly agree: the difference reads as a mistake.`}},i=`Harbour Review`,a=`The survey team spent three weeks on the pontoon, reading the tide gauge against the staff gauge.`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">pairing</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="paired" data-axis="Fit" data-term="paired">
            <button class="sp-segment" data-part="seg-paired" value="paired">works</button>
            <button class="sp-segment" data-part="seg-clashing" value="clashing">clashes</button>
          </sp-segmented>
        </div>
        <div data-part="specimen" data-subject data-pairing="paired" data-pose="[data-pairing=paired]" style="margin-top: 12px">
          <div data-part="display" style="height: 28px; font-size: 21px; line-height: 28px; font-family: ${t}">${i}</div>
          <p data-part="body" style="margin: 4px 0 0; height: 72px; font-size: 12.5px; line-height: 18px;
             font-family: ${n}">${a}</p>
        </div>
        <div class="sp-row sp-context" data-part="names" style="height: 18px">
          <span class="sp-label" data-part="names-text"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 8px 0 0; height: 34px; font-size: 12px; line-height: 17px"></p>
      </div>
    </div>
  `;let s=e(o,`specimen`),c=e(o,`display`),l=e(o,`body`),u=e(o,`names-text`),d=e(o,`readout`),f=e=>{let t=r[e];t&&(s.dataset.pairing=e,c.style.fontFamily=t.display,l.style.fontFamily=t.text,u.textContent=t.names,d.textContent=t.note)};f(`paired`),e(o,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{o as mount};