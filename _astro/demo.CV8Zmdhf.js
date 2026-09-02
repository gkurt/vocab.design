import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`mail`,label:`Mail`,glyph:`inbox`,sent:`Sent to Mail`},{key:`notes`,label:`Notes`,glyph:`pencil`,sent:`Sent to Notes`},{key:`diary`,label:`Diary`,glyph:`calendar`,sent:`Sent to Diary`},{key:`saved`,label:`Saved`,glyph:`heart`,sent:`Sent to Saved`}],i=[{key:`copy`,label:`Copy link`,glyph:`copy`,done:`Link copied`},{key:`read`,label:`Add to reading list`,glyph:`eye`,done:`Added to reading list`}],a=`linear-gradient(150deg, #5b8def, #9b6ef3 58%, #e0554f)`;function o(o){let s=r.map(e=>`
      <button
        class="sp-button sp-button--quiet"
        type="button"
        data-part="to-${e.key}"
        style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1 1 0; padding: 3px 0; border-radius: 10px"
      >
        <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;
                     border-radius: 11px; background: var(--sp-sunken); color: var(--sp-ink)">${n(e.glyph)}</span>
        <span style="font-size: 10px">${e.label}</span>
      </button>`).join(``),c=i.map(e=>`
      <button class="sp-menu-item" type="button" data-part="do-${e.key}" style="padding: 5px 8px; font-size: 12px">${n(e.glyph)}${e.label}</button>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 272px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 8px 10px">
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Field notes</span>
          <button class="sp-icon-button" type="button" data-part="share" aria-haspopup="dialog" aria-label="Share this note">${n(`share`)}</button>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; padding: 10px">
          <div class="sp-stack sp-grow" style="gap: 7px">
            <span class="sp-line" style="width: 86%"></span>
            <span class="sp-line" style="width: 94%"></span>
            <span class="sp-line" style="width: 68%"></span>
          </div>
          <span class="sp-text" data-part="status" data-value="none" role="status" style="flex: 0 0 auto; height: 18px; font-size: 11px; line-height: 18px; white-space: nowrap">Nothing shared yet</span>
        </div>

        <div class="sp-scrim sp-context" data-part="scrim"></div>

        <div
          class="sp-surface"
          data-part="sheet"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Share"
          style="position: absolute; left: 0; right: 0; bottom: 0; padding: 8px; border-width: 1px 0 0;
                 border-radius: 16px 16px 0 0; box-shadow: var(--sp-shadow); transform: translateY(100%);
                 visibility: hidden; transition: transform 0.26s var(--sp-ease), visibility 0.26s"
        >
          <div class="sp-row" data-part="preview" style="gap: 9px; padding: 0 2px 2px">
            <span class="sp-swatch" style="flex: 0 0 auto; width: 40px; height: 40px; --sp-swatch: ${a}"></span>
            <span class="sp-stack sp-grow" style="gap: 1px; min-width: 0">
              <span class="sp-heading" style="font-size: 12px">Tide times, Saturday</span>
              <span class="sp-label" style="font-size: 10px">Field notes, 2 photos</span>
            </span>
          </div>

          <div class="sp-divider" style="margin: 6px 0"></div>
          <div class="sp-row" data-part="targets" style="gap: 4px">${s}</div>
          <div class="sp-divider" style="margin: 6px 0"></div>
          <div data-part="actions">${c}</div>
          <div class="sp-divider" style="margin: 5px 0"></div>

          <button class="sp-menu-item" type="button" data-part="cancel" style="justify-content: center; padding: 5px 8px; font-weight: 500">Cancel</button>
        </div>
      </div>
    </div>
  `;let l=e(o,`sheet`),u=e(o,`scrim`),d=e(o,`status`),f=e(o,`share`),p=e=>{l.style.transform=e?`translateY(0)`:`translateY(100%)`,l.style.visibility=e?`visible`:`hidden`,t(u,`data-open`,e)},m=(e,t)=>{d.dataset.value=e,d.textContent=t,p(!1)};f.addEventListener(`click`,()=>p(!0));for(let t of r)e(o,`to-${t.key}`).addEventListener(`click`,()=>m(t.key,t.sent));for(let t of i)e(o,`do-${t.key}`).addEventListener(`click`,()=>m(t.key,t.done));e(o,`cancel`).addEventListener(`click`,()=>p(!1)),o.addEventListener(`pointerdown`,e=>{let t=e.target;t&&(l.contains(t)||f.contains(t))||p(!1)}),o.addEventListener(`keydown`,e=>{e.key===`Escape`&&p(!1)}),p(!1)}export{o as mount};