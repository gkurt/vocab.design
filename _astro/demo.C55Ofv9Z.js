import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={color:`#fff1fb`,borderColor:`#ff5fd2`,textShadow:`0 0 4px #ffd9f4, 0 0 12px #ff5fd2, 0 0 30px rgb(255 47 194 / 0.75), 0 0 62px rgb(255 47 194 / 0.45)`,boxShadow:`0 0 6px rgb(255 95 210 / 0.9), 0 0 22px rgb(255 47 194 / 0.65), 0 0 54px rgb(255 47 194 / 0.4), inset 0 0 12px rgb(255 95 210 / 0.5)`},n={color:`#ff5fd2`,borderColor:`#ff5fd2`,textShadow:`none`,boxShadow:`none`};function r(r){r.innerHTML=`
    <div class="sp-app" style="padding: 0; gap: 16px">
      <div class="sp-context" data-part="wall" aria-hidden="true"
           style="position: absolute; inset: 0; background-image: repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 26px), repeating-linear-gradient(to right, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 54px), radial-gradient(circle at 50% 42%, #241a2e, #0c0910 76%)"></div>

      <div data-part="sign" data-subject data-lit="neon"
           style="position: relative; padding: 14px 26px 16px; border: 2px solid ${t.borderColor}; border-radius: 16px; color: ${t.color}; text-align: center; text-shadow: ${t.textShadow}; box-shadow: ${t.boxShadow}">
        <div data-part="wordmark" style="font-size: 34px; font-weight: 700; letter-spacing: 0.08em; line-height: 1.1">LATE BAR</div>
        <div style="margin-top: 2px; font-size: 12px; font-weight: 600; letter-spacing: 0.34em">OPEN TILL 3</div>
      </div>

      <div class="sp-row sp-context" style="position: relative; gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="treatment" data-value="neon" data-axis="Treatment">
          <button class="sp-segment" data-part="pick-flat" value="flat">Flat</button>
          <button class="sp-segment" data-part="pick-neon" value="neon">Neon</button>
        </sp-segmented>
      </div>
    </div>
  `;let i=e(r,`sign`);e(r,`treatment`).addEventListener(`change`,e=>{let r=e.detail,a=r===`flat`?n:t;i.dataset.lit=r===`flat`?`flat`:`neon`,i.style.color=a.color,i.style.borderColor=a.borderColor,i.style.textShadow=a.textShadow,i.style.boxShadow=a.boxShadow})}export{r as mount};