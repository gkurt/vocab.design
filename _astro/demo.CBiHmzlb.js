import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`edit`,label:`Edit`,glyph:`pencil`},{key:`copy`,label:`Duplicate`,glyph:`copy`},{key:`share`,label:`Share`,glyph:`share`},{key:`star`,label:`Favourite`,glyph:`star`},{key:`trash`,label:`Delete`,glyph:`trash`}],i=[`field`,`toolbar`,`publish`],a={field:`Title field`,toolbar:`Toolbar, 5 buttons`,publish:`Publish button`},o={field:`Title field`,toolbar:`inside the toolbar`,publish:`Publish button`},s={field:`Three stops here, not seven. Tab moves between them; arrows move inside the one it reached.`,toolbar:`One press put the ring in the toolbar. Arrows move the active button, and the count holds.`,publish:`The next Tab left the group at once, skipping four buttons the arrows would have reached.`};function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Tab presses so far</span>
          <div class="sp-row" style="flex: 0 0 auto; gap: 8px">
            <span class="sp-text sp-text--ink" data-part="count" data-n="0" style="font-size: 12px">0</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab">Press Tab</button>
          </div>
        </div>

        <div class="sp-row sp-context" data-part="rail" style="margin-top: 9px; gap: 6px">${i.map((e,t)=>`
      <span class="sp-chip" data-part="stop-${e}" ${t===0?`data-current`:``}
            style="cursor: default; font-size: 10.5px; padding: 2px 8px">${t+1}. ${a[e]}</span>`).join(``)}</div>

        <div class="sp-surface" style="margin-top: 9px; padding: 10px; display: flex; align-items: flex-start; gap: 10px">
          <div class="sp-stack sp-context" style="gap: 3px; flex: 0 0 118px">
            <input class="sp-input" data-part="field" type="text" value="Release notes" readonly aria-label="Title"
                   style="font-size: 12px; padding: 5px 8px" />
            <span class="sp-label" style="font-size: 9px; line-height: 1">0</span>
          </div>

          <div class="sp-row" data-part="toolbar" data-subject role="toolbar" aria-label="Formatting"
               style="flex: 0 0 auto; gap: 4px; padding: 4px 6px; border: 1px solid var(--sp-line); border-radius: 8px; align-items: flex-start">
            ${r.map((e,t)=>`
    <div class="sp-stack" style="gap: 3px; align-items: center">
      <button class="sp-icon-button" type="button" data-part="tool-${e.key}" aria-label="${e.label}"
              tabindex="${t===0?0:-1}" data-ti="${t===0?`0`:`-1`}"
              style="width: 32px; height: 30px">${n(e.glyph)}</button>
      <span class="sp-label" data-part="ti-${e.key}" style="font-size: 9px; line-height: 1">${t===0?`0`:`-1`}</span>
    </div>`).join(``)}
          </div>

          <div class="sp-stack sp-context" style="gap: 3px; flex: 1 1 auto; min-width: 0; align-items: flex-end">
            <button class="sp-button sp-button--sm" type="button" data-part="publish" tabindex="0">Publish</button>
            <span class="sp-label" style="font-size: 9px; line-height: 1">0</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Keyboard focus</span>
          <span class="sp-text sp-text--ink" data-part="focus" data-at="field"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${o.field}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-at="field"
           style="margin: 7px 0 0; height: 34px; font-size: 11px">${s.field}</p>
      </div>
    </div>
  `;let l=e(c,`count`),u=e(c,`focus`),d=e(c,`caption`),f=e(c,`field`),p=e(c,`publish`),m=0,h=0,g=()=>{let n=i[m];t(f,`data-sim-focus`,n===`field`),t(p,`data-sim-focus`,n===`publish`),r.forEach((r,i)=>{let a=e(c,`tool-${r.key}`),o=i===h;a.tabIndex=o?0:-1,a.dataset.ti=o?`0`:`-1`;let s=e(c,`ti-${r.key}`);s.textContent=o?`0`:`-1`,s.style.color=o?`var(--sp-accent)`:``,t(a,`data-sim-focus`,o&&n===`toolbar`)});for(let r of i)t(e(c,`stop-${r}`),`data-current`,r===n);l.dataset.n=String(m),l.textContent=String(m),u.dataset.at=n,u.textContent=n===`toolbar`?`${r[h]?.label}, inside the toolbar`:o[n],d.dataset.at=n,d.textContent=s[n]};g(),e(c,`tab`).addEventListener(`click`,()=>{m=Math.min(m+1,i.length-1),g()}),e(c,`toolbar`).addEventListener(`keydown`,e=>{let t=e.key;(t===`ArrowRight`||t===`ArrowLeft`)&&i[m]===`toolbar`&&(e.preventDefault(),h=(h+(t===`ArrowRight`?1:-1)+r.length)%r.length,g())})}export{c as mount};