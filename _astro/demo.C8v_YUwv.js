import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[{key:`home`,name:`Home`,off:!1},{key:`search`,name:`Search`,off:!1},{key:`account`,name:`Account`,off:!0},{key:`signout`,name:`Sign out`,off:!0},{key:`contact`,name:`Contact`,off:!1}],r={broken:`aria-hidden`,fixed:`inert`},i={broken:`Pushed off screen and marked aria-hidden. The links keep their place in the tab sequence, so Tab stops twice on nothing.`,fixed:`The same drawer marked inert. Its links leave the tab sequence with it, and Tab goes straight from Search to Contact.`},a=`Nothing announced yet`;function o(o){let s=e=>`
    <a class="sp-nav-item" href="#" data-part="stop-${e.key}" style="font-size: 12px; padding: 4px 10px">${e.name}</a>`,c=(e,t)=>`
    <a class="sp-nav-item" href="#" data-part="stop-${e.key}" style="font-size: 12px; padding: 4px 10px"
       ${t?`data-subject data-pose="[data-mode=broken]" data-mode="broken"`:``}>${e.name}</a>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 12px 14px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="broken" data-axis="Attribute" data-term="broken">
          <button class="sp-segment" data-part="seg-broken" value="broken">aria-hidden</button>
          <button class="sp-segment" data-part="seg-fixed" value="fixed">inert</button>
        </sp-segmented>

        <div class="sp-row" style="gap: 10px; align-items: stretch">
          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; padding: 8px 10px 10px; height: 140px">
            <div class="sp-nav">
              ${s(n[0])}
              ${s(n[1])}
              ${s(n[4])}
            </div>
            <p class="sp-text" data-part="void" style="margin: 6px 0 0; font-size: 10.5px; visibility: hidden">
              Focus ring: not in view
            </p>
          </div>

          <div data-part="offscreen"
               style="flex: 0 0 168px; padding: 8px 10px 10px; height: 140px; border: 2px dashed var(--sp-line); border-radius: 8px">
            <div class="sp-row sp-row--between sp-context" style="gap: 6px">
              <span class="sp-label" style="font-size: 10px; white-space: nowrap">Off screen</span>
              <span class="sp-label" data-part="mark"
                    style="font-size: 10px; white-space: nowrap; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 5px">${r.broken}</span>
            </div>
            <div class="sp-nav" data-part="drawer" aria-hidden="true" style="margin-top: 6px">
              ${c(n[2],!0)}
              ${c(n[3],!1)}
            </div>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 7px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">Keyboard focus</span>
            <span class="sp-text sp-text--ink" data-part="focus" data-where="none" style="font-size: 12px">Nowhere yet</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">Screen reader</span>
            <span class="sp-text sp-text--ink" data-part="heard" data-state="idle" style="font-size: 12px">${a}</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <p class="sp-text" data-stage-verdict data-part="caption" data-case="broken"
             style="margin: 0; flex: 1 1 auto; height: 34px; font-size: 11px">${i.broken}</p>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab"
                  style="flex: 0 0 auto">Press Tab</button>
        </div>
      </div>
    </div>
  `;let l=e(o,`drawer`),u=e(o,`mark`),d=e(o,`void`),f=e(o,`focus`),p=e(o,`heard`),m=e(o,`caption`),h=e(o,`stop-account`),g=`broken`,_=-1,v=()=>n.filter(e=>g===`broken`||!e.off),y=()=>{let r=v()[_];for(let i of n)t(e(o,`stop-${i.key}`),`data-sim-focus`,r?.key===i.key);let i=r?.off===!0;d.style.visibility=i?`visible`:`hidden`,f.dataset.where=r?i?`void`:`viewport`:`none`,f.textContent=r?`${r.name}${i?`, off screen`:``}`:`Nowhere yet`,p.dataset.state=r?i?`silent`:`spoken`:`idle`,p.textContent=r?i?`Silence. Nothing is announced.`:`“${r.name}, link”`:a},b=e=>{g=e,_=-1,h.dataset.mode=e,u.textContent=r[e],m.dataset.case=e,m.textContent=i[e],t(l,`inert`,e===`fixed`),e===`fixed`?l.removeAttribute(`aria-hidden`):l.setAttribute(`aria-hidden`,`true`),y()};b(`broken`),e(o,`tab`).addEventListener(`click`,()=>{_=Math.min(_+1,v().length-1),y()}),e(o,`segmented`).addEventListener(`change`,e=>{b(e.detail===`fixed`?`fixed`:`broken`)})}export{o as mount};