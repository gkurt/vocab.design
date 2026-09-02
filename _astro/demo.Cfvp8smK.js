import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as t}from"./measure.DK7AY2_i.js";var n=`Cap height`,r=40,i=1.45,a=Math.round(r*i)+6,o={cap:{edge:`cap alphabetic`},ex:{edge:`ex alphabetic`}},s=typeof CSS<`u`&&CSS.supports(`text-box-trim`,`trim-both`);function c(c,l){let u=e=>`display: inline-block; font-size: ${r}px; line-height: ${i}; font-weight: 600; ${e}`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="text-box-edge" data-part="segmented" data-value="cap">
            <button class="sp-segment" data-part="seg-cap" value="cap">cap</button>
            <button class="sp-segment" data-part="seg-ex" value="ex">ex</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" style="gap: 12px; height: ${a}px; margin-top: 6px">
          <span class="sp-label" style="width: 84px">untrimmed</span>
          <span data-part="reference"
                style="${u(`background: color-mix(in oklab, var(--sp-ink) 13%, transparent)`)}">${n}</span>
        </div>
        <div class="sp-row" style="gap: 12px; height: ${a}px">
          <span class="sp-label sp-context" style="width: 84px">trimmed</span>
          <span data-part="trimmed" data-subject data-edge="cap"
                style="${u(`background: color-mix(in oklab, var(--sp-accent) 24%, transparent); text-box-trim: trim-both; text-box-edge: cap alphabetic`)}">${n}</span>
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="readout" style="height: 18px; margin-top: 8px">
          <span class="sp-label" data-part="declaration" style="color: var(--sp-ink)"></span>
          <span class="sp-label" data-part="removed" style="font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          The leftover is the font's own line box, not padding: removing it needed a property of its
          own, not a negative margin.
        </p>
      </div>
    </div>
  `;let d=e(c,`reference`),f=e(c,`trimmed`),p=e(c,`declaration`),m=e(c,`removed`),h=()=>{if(!s){m.textContent=`this browser has not shipped the property yet`;return}let e=t(d).height-t(f).height;m.textContent=`Removed: ${Math.round(e)}px`},g=e=>{let t=o[e];t&&(f.dataset.edge=e,f.style.setProperty(`text-box-edge`,t.edge),p.textContent=`text-box: trim-both ${t.edge}`,l.setTimeout(h,0))};g(`cap`),h(),l.setTimeout(h,400),e(c,`segmented`).addEventListener(`change`,e=>g(e.detail))}export{c as mount};