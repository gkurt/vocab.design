import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`new`,label:`New document`},{key:`invite`,label:`Invite teammate`},{key:`export`,label:`Export as PDF`},{key:`theme`,label:`Switch to dark theme`},{key:`rename`,label:`Rename project`},{key:`settings`,label:`Open settings`}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Atlas</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="open-palette">Commands</button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-label">Theme</span>
              <span class="sp-chip" data-part="theme" data-value="light" style="min-width: 78px; justify-content: center">Light</span>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-label">Last command</span>
              <span class="sp-text" data-part="ran">None yet</span>
            </div>
          </div>
          <div class="sp-stack" style="margin-top: 14px">
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 66%"></div>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="palette"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Commands"
          style="width: 320px; padding: 10px"
        >
          <input
            class="sp-input"
            data-part="palette-input"
            role="combobox"
            aria-controls="cmd-list"
            aria-expanded="false"
            autocomplete="off"
            placeholder="Search commands"
          />
          <div class="sp-divider" style="margin: 10px -10px 0"></div>
          <ul
            class="sp-listbox"
            id="cmd-list"
            role="listbox"
            aria-label="Commands"
            data-part="palette-list"
            style="position: static; height: 180px; max-height: none; padding: 6px 0 0; border: 0; background: transparent; box-shadow: none"
          >${n.map(({key:e,label:t})=>`<li class="sp-option" role="option" aria-selected="false" id="cmd-${e}" data-part="cmd-${e}" data-key="${e}">${t}</li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let i=e(r,`palette`),a=e(r,`scrim`),o=e(r,`palette-list`),s=e(r,`palette-input`),c=e(r,`theme`),l=e(r,`ran`),u=[...o.children],d=()=>u.filter(e=>!e.hidden),f=e=>{for(let t of u)t.setAttribute(`aria-selected`,String(t===e));e?s.setAttribute(`aria-activedescendant`,e.id):s.removeAttribute(`aria-activedescendant`)},p=()=>{let e=s.value.trim().toLowerCase();for(let t of u)t.hidden=e.length>0&&!(t.textContent??``).toLowerCase().includes(e);f(d()[0])},m=e=>{t(i,`data-open`,e),t(a,`data-open`,e),t(o,`data-open`,e),s.setAttribute(`aria-expanded`,String(e))},h=()=>{s.value=``,p(),m(!0)},g=e=>{l.textContent=(e.textContent??``).trim(),e.dataset.key===`theme`&&(c.dataset.value=`dark`,c.textContent=`Dark`,t(c,`data-selected`,!0)),m(!1)};e(r,`open-palette`).addEventListener(`click`,h),s.addEventListener(`input`,p);for(let e of u)e.addEventListener(`click`,()=>g(e));r.addEventListener(`pointerdown`,e=>{i.contains(e.target)||m(!1)}),r.addEventListener(`keydown`,e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`k`){e.preventDefault(),h(),s.focus();return}if(!i.hasAttribute(`data-open`))return;if(e.key===`Escape`){m(!1);return}let t=d();if(t.length===0)return;let n=t.findIndex(e=>e.getAttribute(`aria-selected`)===`true`);if(e.key===`ArrowDown`||e.key===`ArrowUp`){e.preventDefault();let r=e.key===`ArrowDown`?1:-1;f(t[(n+r+t.length)%t.length]);return}let r=t[n];e.key===`Enter`&&r&&g(r)})}export{r as mount};