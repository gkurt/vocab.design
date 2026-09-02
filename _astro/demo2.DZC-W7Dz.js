import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`banner`,role:`banner`,label:`banner`},{key:`nav`,role:`navigation`,label:`navigation`},{key:`main`,role:`main`,label:`main`},{key:`aside`,role:`complementary`,label:`complementary`},{key:`footer`,role:`contentinfo`,label:`contentinfo`}],r=`5 landmarks on this page`,i=`border: 1px dashed var(--sp-accent); border-radius: 6px; background: var(--sp-surface); padding: 6px 8px; line-height: 1.2; overflow: hidden`;function a(a){let o=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%; margin-top: 5px"></div>`).join(``),s=n.map(e=>`<button class="sp-chip" type="button" data-part="rotor-${e.key}" style="padding: 3px 8px; font-size: 11px">${e.label}</button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 442px">
        <div style="display: grid; grid-template-columns: 88px 1fr 104px; grid-template-rows: auto 1fr auto; gap: 6px;
                    height: 176px; padding: 6px; background: var(--sp-sunken); border-radius: 6px">
          <header class="sp-context" data-part="region-banner" style="grid-column: 1 / -1; ${i}">
            <span class="sp-label">banner</span>
            <div class="sp-line" style="width: 46%; margin-top: 5px"></div>
          </header>
          <nav class="sp-context" data-part="region-nav" style="${i}">
            <span class="sp-label">navigation</span>
            ${o([80,66,74])}
          </nav>
          <main data-part="region-main" data-subject style="${i}">
            <span class="sp-label">main</span>
            <div class="sp-heading" style="font-size: 12px; margin-top: 3px">Grind size</div>
            ${o([100,78])}
          </main>
          <aside class="sp-context" data-part="region-aside" style="${i}">
            <span class="sp-label">complementary</span>
            ${o([88,72])}
          </aside>
          <footer class="sp-context" data-part="region-footer" style="grid-column: 1 / -1; ${i}">
            <span class="sp-label">contentinfo</span>
          </footer>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 8px 10px">
          <span class="sp-label">Landmarks</span>
          <div class="sp-row sp-row--wrap" style="gap: 6px; margin-top: 6px">${s}</div>
          <p class="sp-text" data-part="readout" style="margin: 8px 0 0; height: 18px; font-size: 12px; white-space: nowrap">${r}</p>
        </div>
      </div>
    </div>
  `;let c=e(a,`readout`),l=r=>{for(let i of n){let n=e(a,`region-${i.key}`),o=i===r;t(n,`data-current`,o),n.style.borderStyle=o?`solid`:`dashed`,n.style.background=o?`var(--sp-accent-soft)`:`var(--sp-surface)`,t(e(a,`rotor-${i.key}`),`data-selected`,o)}c.textContent=`Moved to the ${r.label} landmark`};for(let t of n)e(a,`rotor-${t.key}`).addEventListener(`click`,()=>l(t))}export{a as mount};