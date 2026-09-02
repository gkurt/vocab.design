import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=86,i=138,a=50,o=[{key:`home`,label:`Home`,groups:[{key:`clipboard`,label:`Clipboard`,big:{glyph:`copy`,label:`Paste`},small:[`Cut`,`Copy`,`Format`]},{key:`font`,label:`Font`,big:{glyph:`pencil`,label:`Styles`},small:[`Bold`,`Italic`,`Colour`]},{key:`paragraph`,label:`Paragraph`,big:{glyph:`menu`,label:`Align`},small:[`Bullets`,`Numbers`,`Spacing`]}]},{key:`insert`,label:`Insert`,groups:[{key:`pages`,label:`Pages`,big:{glyph:`plus`,label:`Page`},small:[`Cover`,`Break`]},{key:`tables`,label:`Tables`,big:{glyph:`menu`,label:`Table`},small:[`Rows`,`Cells`]},{key:`media`,label:`Illustrations`,big:{glyph:`star`,label:`Picture`},small:[`Chart`,`Shape`,`Icon`]}]},{key:`layout`,label:`Layout`,groups:[{key:`setup`,label:`Page setup`,big:{glyph:`sliders`,label:`Margins`},small:[`Size`,`Columns`]},{key:`arrange`,label:`Arrange`,big:{glyph:`share`,label:`Position`},small:[`Wrap`,`Align`]}]}],s=`home`;function c(c){let l=e=>`
    <span
      class="sp-button sp-button--quiet"
      style="display: block; padding: 2px 6px; border-radius: 4px; font-size: 10.5px; font-weight: 400; line-height: 1.5;
             white-space: nowrap; text-align: left"
      >${e}</span
    >`,u=(e,t)=>`
    <div
      data-part="group-${e.key}"
      style="display: flex; flex-direction: column; flex: 0 0 auto; width: ${i}px; height: 100%; padding: 6px 8px 4px;
             ${t>0?`border-left: 1px solid var(--sp-line);`:``}"
    >
      <div class="sp-row" style="gap: 6px; flex: 1 1 auto; align-items: stretch">
        <span
          class="sp-button sp-button--quiet"
          data-part="big-${e.key}"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 0 0 auto;
                 width: ${a}px; padding: 4px 2px; font-size: 10.5px; font-weight: 500; white-space: nowrap"
        >${n(e.big.glyph)}<span>${e.big.label}</span></span>
        <div class="sp-stack" style="gap: 2px; flex: 1 1 auto; min-width: 0; justify-content: center">
          ${e.small.map(l).join(``)}
        </div>
      </div>
      <span class="sp-label" data-part="label-${e.key}" style="flex: 0 0 auto; font-size: 10px; text-align: center">${e.label}</span>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; padding: 6px 12px; border-bottom: 1px solid var(--sp-line)">
          <span class="sp-heading" style="font-size: 12px">Harbour report.docx</span>
          <span class="sp-grow"></span>
          <span class="sp-label" style="font-size: 10.5px">Saved</span>
        </div>

        <div data-part="ribbon" data-subject style="flex: 0 0 auto; background: var(--sp-surface)">
          <div class="sp-row" data-part="tabs" role="tablist" aria-label="Commands" style="gap: 2px; padding: 4px 8px 0">
            ${o.map(e=>`
    <button
      type="button"
      role="tab"
      data-part="tab-${e.key}"
      data-tab="${e.key}"
      aria-selected="${e.key===s}"
      ${e.key===s?`data-current`:``}
      style="flex: 0 0 auto; padding: 4px 12px; border: 0; border-radius: 5px 5px 0 0; background: transparent; color: var(--sp-muted);
             font: inherit; font-size: 11.5px; font-weight: 500; white-space: nowrap; cursor: pointer"
    >${e.label}</button>`).join(``)}
          </div>
          <div
            data-part="band"
            data-tab="${s}"
            style="height: ${r}px; border-top: 1px solid var(--sp-line); border-bottom: 1px solid var(--sp-line);
                   background: var(--sp-sunken); overflow: hidden"
          >${o.map(e=>`
    <div
      data-part="band-${e.key}"
      ${e.key===s?``:`hidden`}
      style="display: flex; align-items: stretch; height: 100%"
    >${e.groups.map(u).join(``)}</div>`).join(``)}</div>
        </div>

        <div class="sp-body sp-context" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div class="sp-surface" data-part="page" style="width: 260px; padding: 12px 14px">
            <div class="sp-stack" style="gap: 7px">
              <span class="sp-line" style="width: 62%"></span>
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 94%"></span>
              <span class="sp-line" style="width: 78%"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(c,`band`),f=o.map(t=>e(c,`tab-${t.key}`)),p=o.map(t=>e(c,`band-${t.key}`)),m=e=>{for(let n of f){let r=n.dataset.tab===e;n.setAttribute(`aria-selected`,String(r)),t(n,`data-current`,r),n.style.background=r?`var(--sp-sunken)`:`transparent`,n.style.color=r?`var(--sp-ink)`:`var(--sp-muted)`}for(let[t,n]of p.entries())n.toggleAttribute(`hidden`,o[t]?.key!==e);d.dataset.tab=e};for(let e of f)e.addEventListener(`click`,()=>m(e.dataset.tab??s));m(s)}export{c as mount};