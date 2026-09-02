import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[`Kyiv`,`Kraków`,`Kaunas`],n={owned:`Same DOM, adopted tree. The three options render outside the toolbar, and the listbox names them, so a reader walks a listbox with three options in it.`,unowned:`Same DOM, honest tree. Nothing names the options, so the listbox is empty and the three options sit in a generic box with no listbox above them.`},r={owned:`listbox, 3 options`,unowned:`listbox, no options`};function i(i){let a=(e,t,n,r)=>`
    <div class="sp-row" style="height: 15px; gap: 6px; padding-left: ${n}px">
      <span style="flex: 0 0 auto; font-size: 10.5px; font-weight: 500">${e}</span>
      <span class="sp-label" ${r?`data-part="${r}"`:``} style="flex: 0 0 auto; font-size: 9.5px">${t}</span>
    </div>`,o=e=>t.map(t=>a(`option`,t,e)).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Search cities</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="owned" data-axis="Owns" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-owned" value="owned"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Owned</button>
            <button class="sp-segment" type="button" data-part="seg-unowned" value="unowned"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Not owned</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 10px">
          <div class="sp-surface sp-context" style="flex: 1 1 0; min-width: 0; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">DOM, unchanged</span>
            <div style="margin-top: 5px">
              ${a(`div`,`toolbar`,0)}
              ${a(`input`,`combobox`,12)}
              <div class="sp-row" style="height: 15px; gap: 6px; padding-left: 12px">
                <span style="flex: 0 0 auto; font-size: 10.5px; font-weight: 500">div</span>
                <span class="sp-label" style="flex: 0 0 auto; font-size: 9.5px">listbox</span>
                <span class="sp-label" data-part="attr"
                      style="flex: 0 0 auto; font-size: 9.5px; opacity: 0; visibility: hidden;
                             transition: opacity 0.18s, visibility 0.18s">aria-owns</span>
              </div>
              ${a(`div`,`suggestions portal`,0)}
              ${o(12)}
            </div>
          </div>

          <div class="sp-surface" style="flex: 1 1 0; min-width: 0; padding: 8px 10px">
            <span class="sp-label sp-context" style="font-size: 10px">Accessibility tree</span>
            <div style="margin-top: 5px">
              <div class="sp-context">
                ${a(`toolbar`,``,0)}
                ${a(`combobox`,`Search cities`,12)}
                <div class="sp-row" style="height: 15px; gap: 6px; padding-left: 12px">
                  <span style="flex: 0 0 auto; font-size: 10.5px; font-weight: 500">listbox</span>
                  <span class="sp-label" data-part="note" data-mode="owned"
                        style="flex: 0 0 auto; font-size: 9.5px">${r.owned}</span>
                </div>
              </div>
              <div data-part="adopted" data-subject
                   style="opacity: 1; visibility: visible; transition: opacity 0.18s, visibility 0.18s">
                ${o(26)}
              </div>
              <div class="sp-context">
                ${a(`generic`,`suggestions portal`,0)}
                <div data-part="orphans"
                     style="opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s">
                  ${o(12)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="owned"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${n.owned}</p>
      </div>
    </div>
  `;let s=e(i,`attr`),c=e(i,`adopted`),l=e(i,`orphans`),u=e(i,`note`),d=e(i,`caption`),f=(e,t)=>{e.style.opacity=t?`1`:`0`,e.style.visibility=t?`visible`:`hidden`},p=e=>{let t=e===`owned`;f(s,t),f(c,t),f(l,!t),u.dataset.mode=e,u.textContent=r[e],d.dataset.mode=e,d.textContent=n[e]};e(i,`mode`).addEventListener(`change`,e=>{p(e.detail)}),p(`owned`)}export{i as mount};