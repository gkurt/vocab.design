import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`Waterproofs`,`Deck boots`,`Charts`,`Lamps`,`Rope`,`Fenders`],r=[`In stock`,`Offshore rated`,`Under 50`,`Bright colours`,`Repairable`,`Made nearby`],i=n.map(e=>`
    <div class="sp-surface" style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; margin-bottom: 8px">
      <span aria-hidden="true" style="flex: 0 0 auto; width: 34px; height: 34px; border-radius: 5px; background: var(--sp-line)"></span>
      <span class="sp-stack sp-grow" style="gap: 6px">
        <span class="sp-heading" style="font-size: 12px">${e}</span>
        <span class="sp-line" style="width: 70%"></span>
      </span>
    </div>`).join(``),a=r.map(e=>`
    <div class="sp-row" style="gap: 8px; padding: 5px 2px">
      <span class="sp-checkbox" role="img" aria-label="${e}"></span>
      <span class="sp-text sp-text--ink" style="font-size: 12px">${e}</span>
    </div>`).join(``);function o(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Chandlery</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="open" type="button">Filters</button>
        </div>
        <div class="sp-body" style="position: relative; padding: 0; overflow: hidden">
          <div
            class="sp-scroll"
            data-part="page"
            data-subject
            data-pose="[data-locked]"
            data-locked
            data-moved="no"
            style="position: absolute; inset: 0; padding: 12px 14px; overflow-y: hidden; scrollbar-gutter: stable"
          >
            <span class="sp-heading" style="display: block; margin-bottom: 10px; font-size: 13px">Deck and weather</span>
            ${i}
          </div>
          <div class="sp-scrim" data-part="scrim" data-open></div>
          <div class="sp-drawer sp-drawer--right" data-part="panel" data-open style="width: 196px; gap: 8px">
            <span class="sp-heading" style="font-size: 13px">Filters</span>
            <div class="sp-scroll" data-part="panel-scroll" data-moved="no" style="height: 116px; padding-right: 4px">
              ${a}
            </div>
            <button class="sp-button sp-button--sm" data-part="close" type="button" style="align-self: flex-start">Done</button>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="gap: 10px; border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-chip" data-part="lock" data-state="locked" style="width: 92px; justify-content: center; cursor: default">Page locked</span>
          <div class="sp-progress sp-grow" data-part="ruler" style="max-width: 90px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
        </div>
      </div>
    </div>
  `;let r=e(n,`page`),o=e(n,`panel`),s=e(n,`panel-scroll`),c=e(n,`scrim`),l=e(n,`lock`),u=e(n,`ruler`).firstElementChild,d=0,f=()=>{let e=Math.max(1,r.scrollHeight-r.clientHeight);u.style.setProperty(`--sp-value`,`${r.scrollTop/e*100}%`)},p=e=>{t(r,`data-locked`,e),t(o,`data-open`,e),t(c,`data-open`,e),r.style.overflowY=e?`hidden`:`auto`,l.dataset.state=e?`locked`:`free`,l.textContent=e?`Page locked`:`Page free`,d=r.scrollTop,r.dataset.moved=`no`};r.addEventListener(`scroll`,()=>{if(r.hasAttribute(`data-locked`)){r.scrollTop!==d&&(r.scrollTop=d),f(),r.dataset.moved=`no`;return}f(),r.dataset.moved=r.scrollTop>1?`yes`:`no`}),s.addEventListener(`scroll`,()=>{s.dataset.moved=s.scrollTop>1?`yes`:`no`}),e(n,`open`).addEventListener(`click`,()=>p(!0)),e(n,`close`).addEventListener(`click`,()=>p(!1)),f()}export{o as mount};