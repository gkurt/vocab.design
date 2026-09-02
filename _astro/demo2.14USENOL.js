import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={w:452,h:234},i=222,a=[{key:`duplicate`,label:`Duplicate`,glyph:`copy`,note:`Copy into a new draft`},{key:`rename`,label:`Rename`,glyph:`pencil`,note:`Changes the file name only`},{key:`share`,label:`Share`,glyph:`share`,section:!0},{key:`delete`,label:`Delete`,glyph:`trash`,section:!0}];function o(o){let s=e=>`
    ${e.section?`<div class="sp-divider" style="margin: 4px 6px"></div>`:``}
    <button
      class="sp-menu-item"
      type="button"
      data-part="row-${e.key}"
      style="align-items: ${e.note?`flex-start`:`center`}; padding: 6px 8px"
    >
      <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 18px">${n(e.glyph)}</span>
      <span style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
        <span style="line-height: 1.35">${e.label}</span>
        ${e.note?`<span class="sp-label" style="font-size: 11px; font-weight: 400">${e.note}</span>`:``}
      </span>
    </button>
  `;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Documents</span>
          <span class="sp-label" data-part="readout" data-ran="none" style="flex: 0 0 96px; font-size: 11px; text-align: right; white-space: nowrap">Nothing run yet</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="popover" data-axis="Presentation">
            <button class="sp-segment" type="button" data-part="seg-popover" value="popover" style="padding: 4px 9px; font-size: 12px">Popover</button>
            <button class="sp-segment" type="button" data-part="seg-panel" value="panel" style="padding: 4px 9px; font-size: 12px">Panel</button>
          </sp-segmented>
        </div>

        <div class="sp-body">
          <div style="position: relative; width: ${r.w}px; height: ${r.h}px">
            <div class="sp-surface sp-context" style="position: absolute; left: 0; top: 0; width: ${r.w-i-12}px; height: ${r.h}px; padding: 12px">
              <div class="sp-heading" style="font-size: 13px">Q3 report.pdf</div>
              <div class="sp-stack" style="margin-top: 12px; gap: 9px">
                <div class="sp-line" style="width: 100%"></div>
                <div class="sp-line" style="width: 86%"></div>
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 64%"></div>
              </div>
            </div>

            <div style="position: absolute; right: 0; top: 0; width: ${i}px; height: ${r.h}px">
              <button
                class="sp-button sp-button--ghost sp-button--sm sp-context"
                type="button"
                data-part="trigger"
                aria-expanded="true"
                style="position: absolute; left: 0; top: 0; display: inline-flex; align-items: center; gap: 6px"
              >Actions ${n(`chevronDown`)}</button>

              <div
                class="sp-popover"
                data-part="popover"
                data-open
                style="left: 0; right: 0; top: 38px; min-width: 0; padding: 6px; --sp-arrow-x: 22px"
              ></div>

              <div
                class="sp-surface sp-context"
                data-part="panel"
                style="position: absolute; inset: 0; padding: 8px; opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s"
              >
                <div class="sp-label" style="padding: 2px 8px 6px">Actions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=document.createElement(`div`);c.className=`sp-list`,c.dataset.part=`list`,c.setAttribute(`data-subject`,``),c.style.gap=`0`,c.innerHTML=a.map(s).join(``);let l=e(o,`popover`),u=e(o,`panel`),d=e(o,`trigger`),f=e(o,`readout`),p=e(o,`picker`);l.append(c);let m=e=>{let n=e!==`panel`;(n?l:u).append(c),t(l,`data-open`,n),t(u,`data-open`,!n),u.style.opacity=n?`0`:`1`,u.style.visibility=n?`hidden`:`visible`,d.style.visibility=n?`visible`:`hidden`,d.setAttribute(`aria-expanded`,String(n))};p.addEventListener(`change`,()=>m(p.value));for(let t of a)e(c,`row-${t.key}`).addEventListener(`click`,()=>{f.dataset.ran=t.key,f.textContent=`Ran ${t.label.toLowerCase()}`})}export{o as mount};