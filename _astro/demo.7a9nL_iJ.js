import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`menu`,label:`Actions`,kind:`menu`,opens:`menu`},{key:`listbox`,label:`Country`,kind:`listbox`,opens:`listbox`},{key:`dialog`,label:`Share`,kind:`dialog`,opens:`dialog`},{key:`lie`,label:`Delete`,kind:`menu`,opens:`delete`}],r={menu:`menu`,listbox:`listbox`,dialog:`dialog`,delete:`dialog`},i=[`opt-gb`,`opt-ie`,`opt-fr`],a={kept:`Each trigger names the kind of surface it will open, so the announcement is a warning the reader can act on before pressing.`,broken:`Delete announces a pop-up menu and opens a dialog. The attribute is a promise, and a false one is worse than none at all.`};function o(o){let s=e=>`
    <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="trig-${e.key}"
            data-opens="${e.opens}" aria-haspopup="${e.kind}" aria-expanded="false"
            style="display: inline-flex; align-items: center; gap: 4px; padding: 5px 8px">
      ${e.label}${t(`chevronDown`)}
    </button>`,[c,l,u,d]=n;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row" style="gap: 8px; align-items: stretch">
          <div class="sp-surface sp-grow" data-part="triggers" data-subject style="padding: 8px 10px">
            <span class="sp-label">Report</span>
            <div class="sp-row" style="margin-top: 6px; gap: 6px">
              ${c?s(c):``}${l?s(l):``}${u?s(u):``}
            </div>
          </div>
          <div class="sp-surface sp-context" style="flex: 0 0 132px; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">Danger zone</span>
            <div style="margin-top: 6px">${d?s(d):``}</div>
          </div>
        </div>

        <div data-part="room" style="position: relative; height: 104px; margin-top: 8px">
          <div class="sp-menu" data-part="menu" style="left: 0; top: 2px; min-width: 154px">
            <button class="sp-menu-item" type="button" data-part="menu-duplicate">Duplicate</button>
            <button class="sp-menu-item" type="button" data-part="menu-archive">Archive</button>
          </div>
          <ul class="sp-listbox" data-part="listbox" role="listbox" aria-label="Country"
              style="left: 96px; right: auto; top: 2px; width: 158px; max-height: 94px">
            <li class="sp-option" role="option" data-part="opt-gb" aria-selected="true">United Kingdom</li>
            <li class="sp-option" role="option" data-part="opt-ie" aria-selected="false">Ireland</li>
            <li class="sp-option" role="option" data-part="opt-fr" aria-selected="false">France</li>
          </ul>
          <div class="sp-dialog" data-part="dialog" role="dialog" aria-label="Share"
               style="left: 50%; top: 50%; width: 262px; padding: 10px 12px">
            <span class="sp-heading" style="font-size: 13px">Share this report</span>
            <p class="sp-text" style="margin: 4px 0 0; font-size: 11px">Anyone with the link can read it.</p>
            <div class="sp-row" style="margin-top: 8px; justify-content: flex-end; gap: 6px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="dialog-cancel">Cancel</button>
            </div>
          </div>
          <div class="sp-dialog" data-part="delete" role="alertdialog" aria-label="Delete"
               style="left: 50%; top: 50%; width: 262px; padding: 10px 12px">
            <span class="sp-heading" style="font-size: 13px">Delete this report?</span>
            <p class="sp-text" style="margin: 4px 0 0; font-size: 11px">This cannot be undone.</p>
            <div class="sp-row" style="margin-top: 8px; justify-content: flex-end; gap: 6px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="delete-cancel">Cancel</button>
            </div>
          </div>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="announced" data-kind="menu"
                style="font-size: 11px; white-space: nowrap"></span>
        
        <div class="sp-row sp-row--between sp-context" style="margin-top: 4px; height: 18px">
          <span class="sp-label">Opened</span>
          <span class="sp-text sp-text--ink" data-part="opened" data-state="none" data-match="none"
                style="font-size: 11px; white-space: nowrap">nothing yet</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="kept"
           style="margin: 6px 0 0; height: 32px; font-size: 11px">${a.kept}</p>
      </div>
    </div>
  `;let f=e(o,`announced`),p=e(o,`opened`),m=e(o,`caption`),h=[`menu`,`listbox`,`dialog`,`delete`],g=(e,t)=>`button, “${t}”, has pop-up ${e.getAttribute(`aria-haspopup`)}`,_=()=>{for(let t of h)e(o,t).removeAttribute(`data-open`);for(let t of n)e(o,`trig-${t.key}`).setAttribute(`aria-expanded`,`false`)},v=t=>{_();let n=e(o,`trig-${t.key}`);n.setAttribute(`aria-expanded`,`true`),e(o,t.opens).setAttribute(`data-open`,``),f.dataset.kind=n.getAttribute(`aria-haspopup`)??``,f.textContent=g(n,t.label);let i=r[t.opens]??t.opens,s=i===n.getAttribute(`aria-haspopup`);p.dataset.state=i,p.dataset.match=s?`kept`:`broken`,p.textContent=s?`${i}, exactly as promised`:`${i}, and a menu was promised`,m.dataset.case=s?`kept`:`broken`,m.textContent=s?a.kept:a.broken},y=()=>{_(),p.dataset.state=`none`,p.dataset.match=`none`,p.textContent=`nothing yet`},b=n[0];b&&(f.textContent=g(e(o,`trig-${b.key}`),b.label));for(let t of n)e(o,`trig-${t.key}`).addEventListener(`click`,()=>v(t));for(let t of[`menu-duplicate`,`menu-archive`,`dialog-cancel`,`delete-cancel`])e(o,t).addEventListener(`click`,y);let x=i.map(t=>e(o,t));for(let t of x)t.addEventListener(`click`,()=>{for(let e of x)e.setAttribute(`aria-selected`,String(e===t));e(o,`trig-listbox`).dataset.choice=t.dataset.part?.replace(`opt-`,``)??``,y()})}export{o as mount};