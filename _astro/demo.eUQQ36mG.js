import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`wheel`,label:`Wheel`,title:`Hue wheel`,paint:`conic-gradient(from 0deg, #e5484d, #e2a336, #46a758, #12a5b0, #3557e8, #8e4ec6, #e5484d)`,code:`conic-gradient(from 0deg, red, amber, green, cyan, blue, violet, red)`,mask:``,note:`Smooth all the way round. The last stop repeats the first, so the seam has nothing to show.`},{key:`pie`,label:`Pie`,title:`Pie chart`,paint:`conic-gradient(#3557e8 0 42%, #7aa2f7 42% 68%, #b9c8f6 68% 87%, #dfe2e8 87% 100%)`,code:`conic-gradient(#3557e8 0 42%, #7aa2f7 42% 68%, ...)`,mask:``,note:`Two stops at one position leave no room to blend, so a single fill draws four flat slices.`},{key:`ring`,label:`Ring`,title:`Progress ring`,paint:`conic-gradient(#3557e8 0 68%, #dfe2e8 68% 100%)`,code:`conic-gradient(accent 0 68%, track 0) + radial mask`,mask:`radial-gradient(closest-side, transparent 0 62%, #000 63% 100%)`,note:`The same hard stop, with a radial mask punching the middle out. 68 percent, drawn as an angle.`}],n=`wheel`;function r(r){let i=t.find(e=>e.key===n)??t[0];if(!i)return;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Stop list" data-value="${n}">
            ${t.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 18px; margin-top: 14px; align-items: center">
          <div data-part="disc" data-subject data-shape="${n}"
               style="flex: 0 0 auto; width: 138px; height: 138px; border-radius: 50%;
                      background-image: ${i.paint}"></div>

          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 7px">
            <span class="sp-heading" data-part="title" style="font-size: 14px">${i.title}</span>
            <span class="sp-context" data-part="code"
                  style="display: block; height: 30px; font-size: 10.5px; line-height: 1.4; color: var(--sp-muted);
                         overflow-wrap: break-word">${i.code}</span>
            <span class="sp-text sp-context" data-stage-verdict data-part="note"
                  style="height: 58px; font-size: 11px; line-height: 1.45">${i.note}</span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(r,`disc`),o=e(r,`title`),s=e(r,`code`),c=e(r,`note`),l=e=>{let n=t.find(t=>t.key===e);n&&(a.dataset.shape=n.key,a.style.backgroundImage=n.paint,a.style.setProperty(`mask-image`,n.mask||`none`),a.style.setProperty(`-webkit-mask-image`,n.mask||`none`),o.textContent=n.title,s.textContent=n.code,c.textContent=n.note)};l(n),e(r,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{r as mount};