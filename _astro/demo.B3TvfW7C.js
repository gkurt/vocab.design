import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=446,i=188,a={compact:158,medium:292,expanded:r},o={compact:`Compact, under 600dp: bottom tab bar over one column.`,medium:`Medium, 600 to 839dp: navigation rail beside one column.`,expanded:`Expanded, 840dp and up: sidebar plus a list detail pair.`},s=`display: flex; align-items: center; gap: 7px; padding: 6px 8px; border-radius: 6px; background: var(--sp-sunken)`,c=(e,t)=>Array.from({length:e},(e,n)=>`
    <div style="${s}">
      <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent-soft)"></span>
      <span class="sp-line" style="width: ${t[n%t.length]}%; height: 6px"></span>
    </div>`).join(``),l=[[`inbox`,`Inbox`],[`search`,`Find`],[`star`,`Saved`]],u=()=>`
  <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 0 0 auto; width: 46px; padding: 10px 0; border-right: 1px solid var(--sp-line)">
    ${l.map(([e,t],r)=>`
      <span style="display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 4px 6px; border-radius: 6px; ${r===0?`background: var(--sp-accent-soft)`:``}">
        ${n(e)}
        <span style="font-size: 8px; color: var(--sp-muted)">${t}</span>
      </span>`).join(``)}
  </div>`,d=()=>`
  <div style="display: flex; align-items: center; justify-content: space-around; flex: 0 0 auto; padding: 5px 0; border-top: 1px solid var(--sp-line)">
    ${l.map(([e,t],r)=>`
      <span style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: ${r===0?`var(--sp-accent)`:`var(--sp-muted)`}">
        ${n(e)}
        <span style="font-size: 8px">${t}</span>
      </span>`).join(``)}
  </div>`,f=()=>`
  <div style="display: flex; flex-direction: column; gap: 3px; flex: 0 0 auto; width: 116px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
    <span class="sp-label" style="padding: 0 8px 4px">Mail</span>
    ${[`Inbox`,`Find`,`Saved`,`Archive`].map((e,t)=>`<span class="sp-nav-item" ${t===0?`data-current`:``}>${e}</span>`).join(``)}
  </div>`,p=()=>`
  <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 8px; padding: 12px; border-left: 1px solid var(--sp-line)">
    <span class="sp-heading" style="font-size: 13px">Berth transfer</span>
    <div class="sp-line" style="width: 96%"></div>
    <div class="sp-line" style="width: 88%"></div>
    <div class="sp-line" style="width: 72%"></div>
    <div class="sp-line" style="width: 90%"></div>
    <div class="sp-line" style="width: 54%"></div>
  </div>`;function m(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Mail</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="compact" data-axis="Window">
            <button class="sp-segment" type="button" data-part="seg-compact" value="compact">compact</button>
            <button class="sp-segment" type="button" data-part="seg-medium" value="medium">medium</button>
            <button class="sp-segment" type="button" data-part="seg-expanded" value="expanded">expanded</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="arena" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${r}px; height: ${i}px">
            <div
              data-part="shell"
              data-subject
              style="display: flex; flex-direction: column; width: ${a.compact}px; height: 100%; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div data-part="arr-compact" style="display: flex; flex-direction: column; height: 100%">
                <div class="sp-row" style="flex: 0 0 auto; gap: 6px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-heading" style="font-size: 12px">Inbox</span>
                </div>
                <div class="sp-stack" style="flex: 1 1 auto; gap: 6px; padding: 8px">${c(3,[78,60,88])}</div>
                ${d()}
              </div>
              <div data-part="arr-medium" hidden style="display: flex; height: 100%">
                ${u()}
                <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 6px; padding: 8px">
                  <span class="sp-heading" style="font-size: 12px; padding: 0 2px">Inbox</span>
                  ${c(4,[82,64,90,70])}
                </div>
              </div>
              <div data-part="arr-expanded" hidden style="display: flex; height: 100%">
                ${f()}
                <div class="sp-stack" style="flex: 0 0 auto; width: 148px; gap: 6px; padding: 8px">
                  <span class="sp-heading" style="font-size: 12px; padding: 0 2px">Inbox</span>
                  ${c(4,[82,64,90,70])}
                </div>
                ${p()}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let s=e(n,`shell`),l=e(n,`readout`),m=[[`compact`,e(n,`arr-compact`)],[`medium`,e(n,`arr-medium`)],[`expanded`,e(n,`arr-expanded`)]],h=e=>{let n=o[e],r=a[e];if(!(!n||!r)){for(let[n,r]of m)t(r,`hidden`,n!==e);s.style.width=`${r}px`,l.textContent=n}};e(n,`switcher`).addEventListener(`change`,e=>h(e.detail)),h(`compact`)}export{m as mount};