import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./measure.DK7AY2_i.js";var n=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,r=`The tide came in over the flats before dawn, and by the time the boats were free of the mud the whole reach had turned the colour of pewter, which the old hands took as a sign of settled weather ahead of them.`,i=262,a=20,o={normal:{css:`word-spacing: normal`,value:`normal`,note:`The spaces are the ones the face was drawn with.`},wide:{css:`word-spacing: 0.15em`,value:`0.15em`,note:`Every gap widens by the same amount, and the lines rebreak.`},wider:{css:`word-spacing: 0.3em`,value:`0.3em`,note:`Wide enough that gaps on neighbouring lines start to line up.`}};function s(e){let n=e.firstChild;if(!(n instanceof Text))return[];let r=e.getBoundingClientRect(),i=t(e),o=document.createRange(),s=[];for(let e=0;e<n.data.length;e++){if(n.data[e]!==` `)continue;o.setStart(n,e),o.setEnd(n,e+1);let t=o.getBoundingClientRect(),c=t.width/i;c<2||s.push({left:(t.left-r.left)/i,top:Math.round((t.top-r.top)/i/a)*a,width:c})}return s}function c(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Justified, three ways</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Spacing" data-part="segmented" data-value="normal">
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
            <button class="sp-segment" data-part="seg-wide" value="wide">wide</button>
            <button class="sp-segment" data-part="seg-wider" value="wider">wider</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 10px; align-items: flex-start">
          <div style="position: relative; width: ${i}px; height: 140px">
            <div data-part="tints" style="position: absolute; inset: 0; pointer-events: none"></div>
            <p class="sp-text sp-text--ink" data-part="paragraph" data-subject data-spacing="normal"
               style="position: relative; margin: 0; font-family: ${n}; font-size: 13px; line-height: ${a}px;
                      text-align: justify; transition: none">${r}</p>
          </div>
          <div class="sp-stack sp-context" style="gap: 8px; width: 132px">
            <!-- Two lines' room for the declaration and four for the note, so a shorter
                 string cannot pull what is under it upwards (SPEC §5). -->
            <span class="sp-label" data-part="css" style="color: var(--sp-ink); height: 34px"></span>
            <span class="sp-label" data-part="measured" style="height: 18px;
                  font-variant-numeric: tabular-nums"></span>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; font-size: 12px; height: 72px"></p>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(t,`paragraph`),l=e(t,`tints`),u=n=>{let r=o[n];if(!r)return;c.dataset.spacing=n,c.style.wordSpacing=r.value;let i=s(c);l.innerHTML=i.map(e=>`<span style="position: absolute; left: ${e.left}px; top: ${e.top}px; width: ${e.width}px;
                  height: ${a}px; background: color-mix(in oklab, var(--sp-accent) 24%, transparent)"></span>`).join(``);let u=i.length>0?i.reduce((e,t)=>e+t.width,0)/i.length:0;e(t,`css`).textContent=r.css,e(t,`measured`).textContent=`gaps ${u.toFixed(1)}px on average`,e(t,`note`).textContent=r.note};u(`normal`),e(t,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{c as mount};