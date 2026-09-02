import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`copy`,label:`Copy link`,result:`Link copied`},{key:`save`,label:`Add to favourites`,result:`Added to favourites`},{key:`hide`,label:`Hide from feed`,result:`Hidden from your feed`}],i={copy:`copy`,save:`star`,hide:`eyeOff`};function a(a){let o=r.map(e=>`
      <button class="sp-menu-item" type="button" data-part="act-${e.key}">${n(i[e.key])}${e.label}</button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 214px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <button class="sp-icon-button" data-part="share" aria-label="Share this note">${n(`share`)}</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-stack sp-grow" style="gap: 7px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 72%"></div>
            <div class="sp-line" style="width: 80%"></div>
            <div class="sp-line" style="width: 46%"></div>
          </div>
          <span class="sp-text" data-part="status" data-value="none" role="status" style="white-space: nowrap">Nothing shared yet</span>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-surface"
          data-part="sheet"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Share this note"
          style="position: absolute; left: 0; right: 0; bottom: 0; padding: 8px; border-width: 1px 0 0; border-radius: 14px 14px 0 0; box-shadow: var(--sp-shadow); transform: translateY(100%); visibility: hidden; transition: transform 0.26s var(--sp-ease), visibility 0.26s"
        >
          ${o}
          <div class="sp-divider" style="margin: 6px 4px"></div>
          <button class="sp-menu-item" type="button" data-part="act-cancel" style="justify-content: center; font-weight: 500">Cancel</button>
        </div>
      </div>
    </div>
  `;let s=e(a,`sheet`),c=e(a,`scrim`),l=e(a,`status`),u=e=>{s.style.transform=e?`translateY(0)`:`translateY(100%)`,s.style.visibility=e?`visible`:`hidden`,t(c,`data-open`,e)},d=e=>{l.dataset.value=e.key,l.textContent=e.result,u(!1)};e(a,`share`).addEventListener(`click`,()=>u(!0));for(let t of r)e(a,`act-${t.key}`).addEventListener(`click`,()=>d(t));e(a,`act-cancel`).addEventListener(`click`,()=>u(!1)),c.addEventListener(`click`,()=>u(!1)),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&u(!1)})}export{a as mount};