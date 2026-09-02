import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={normal:`Normal: the top colour replaces the backdrop, and only alpha has any say.`,multiply:`Multiply: the channels are multiplied, so nothing gets lighter and white leaves the backdrop untouched.`,screen:`Screen: the inverses are multiplied, so nothing gets darker and black leaves the backdrop untouched.`,overlay:`Overlay: multiply where the backdrop is dark, screen where it is light, so the contrast under it grows.`},n=`multiply`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 404px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${n}" data-axis="Mode" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
            <button class="sp-segment" data-part="seg-multiply" value="multiply">multiply</button>
            <button class="sp-segment" data-part="seg-screen" value="screen">screen</button>
            <button class="sp-segment" data-part="seg-overlay" value="overlay">overlay</button>
          </sp-segmented>
        </div>

        <div data-part="scene" data-mode="${n}"
             style="position: relative; height: 148px; margin-top: 14px; border-radius: var(--sp-radius); overflow: hidden;
                    isolation: isolate; background: linear-gradient(115deg, #10203c 0%, #2f5c8f 46%, #d8dee7 100%)">
          <span data-part="under"
                style="position: absolute; left: 40px; top: 12px; width: 100px; height: 100px; border-radius: 50%; background: #29C2D6"></span>
          <span data-part="top" data-subject data-mode="${n}"
                style="position: absolute; left: 108px; top: 12px; width: 100px; height: 100px; border-radius: 50%;
                       background: #F2B23A; mix-blend-mode: ${n}"></span>
          <span class="sp-context" data-part="lockup"
                style="position: absolute; left: 16px; bottom: 10px; font-size: 20px; font-weight: 700; line-height: 1;
                       letter-spacing: 0.04em; color: #FFFFFF; mix-blend-mode: ${n}">OVERLAP</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 40px">${t[n]}</p>
      </div>
    </div>
  `;let i=e(r,`scene`),a=e(r,`top`),o=e(r,`lockup`),s=e(r,`note`);e(r,`segmented`).addEventListener(`change`,e=>{let n=e.detail;i.dataset.mode=n,a.dataset.mode=n,a.style.mixBlendMode=n,o.style.mixBlendMode=n,s.textContent=t[n]??``})}export{r as mount};