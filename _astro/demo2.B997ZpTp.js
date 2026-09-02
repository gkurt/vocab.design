import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={none:{paint:`transparent`,opacity:`0`,note:`No layer: the caption is white on a pale part of the picture, which is unreadable and unmeasurable.`},solid:{paint:`rgb(10 14 26 / 0.48)`,opacity:`1`,note:`A flat wash reaches the caption, and it spends the same dimming on the parts of the picture nobody needed darkened.`},gradient:{paint:`linear-gradient(to top, rgb(8 11 22 / 0.9), rgb(8 11 22 / 0.45) 36%, rgb(8 11 22 / 0) 72%)`,opacity:`1`,note:`Stops put the dimming where the text is and let it run out before the top, so the caption reads and the picture survives.`}},n=`gradient`,r=[{colour:`#FFE9A8`,size:`190px`,left:`-30px`,top:`76px`},{colour:`#F7A45C`,size:`150px`,left:`128px`,top:`-40px`},{colour:`#5B3E86`,size:`170px`,left:`236px`,top:`84px`}];function i(i){let a=r.map(({colour:e,size:t,left:n,top:r})=>`
      <span class="sp-aurora-blob" style="--sp-blob: ${e}; --sp-blob-size: ${t}; left: ${n}; top: ${r}"></span>`).join(``),o=t[n];i.innerHTML=`
    <div class="sp-app">
      <div data-part="hero" style="position: relative; width: 340px; height: 178px; border-radius: var(--sp-radius); overflow: hidden">
        <div class="sp-aurora" style="--sp-aurora-wash: linear-gradient(120deg, #F3CE86, #E08A57 46%, #6D4B8F)">${a}</div>

        <div data-part="scrim" data-subject data-scrim="${n}"
             style="position: absolute; inset: 0; background: ${o?.paint}; opacity: ${o?.opacity}"></div>

        <div data-part="caption" style="position: absolute; left: 14px; right: 14px; bottom: 12px; color: #FFFFFF">
          <span style="display: block; font-size: 17px; font-weight: 600; line-height: 1.25">Night market, Kowloon</span>
          <span style="display: block; margin-top: 3px; font-size: 12px; line-height: 1.4; opacity: 0.92">
            Twelve stalls, open until two.
          </span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layer" data-part="segmented" data-value="${n}">
          <button class="sp-segment" data-part="seg-none" value="none">None</button>
          <button class="sp-segment" data-part="seg-solid" value="solid">Solid</button>
          <button class="sp-segment" data-part="seg-gradient" value="gradient">Gradient</button>
        </sp-segmented>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 340px; margin: 0; min-height: 60px">${o?.note}</p>
    </div>
  `;let s=e(i,`scrim`),c=e(i,`note`),l=e=>{let n=t[e];n&&(s.dataset.scrim=e,s.style.background=n.paint,s.style.opacity=n.opacity,c.textContent=n.note)};e(i,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{i as mount};