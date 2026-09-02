import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{r as n}from"./measure.DK7AY2_i.js";var r=52,i=400,a=100,o=210,s=156,c=8,l=[112,206],u=[{name:`Harbour Board`,line:`Ferry timetable, winter`},{name:`Trinity Pilots`,line:`Draught survey attached`},{name:`Aoife Ni Bhraonain`,line:`Re: berth 4 lighting`}],d=[{key:`fixed`,label:`Fixed`,stated:`pane`,floats:!1,dismissible:!1,note:`Fixed: this pane holds the number, and the reading pane beside it takes whatever is left over.`},{key:`flexible`,label:`Flexible`,stated:`other`,floats:!1,dismissible:!1,note:`Flexible: the same boundary, stated from the other side. Now the reading pane holds the number and this pane takes the remainder.`},{key:`floating`,label:`Floating`,stated:`pane`,floats:!0,dismissible:!1,note:`Floating: the pane comes off the surface and sits over the content, which keeps the full width of the window behind it.`},{key:`semi`,label:`Semi permanent`,stated:`pane`,floats:!1,dismissible:!0,note:`Semi permanent: real space while it is there, and the reader can send it away and call it back from the app bar.`}],f=(e,t,n)=>Math.max(t,Math.min(n,e)),p=e=>e<130?`narrow`:e>190?`wide`:`medium`;function m(m){let h=u.map(e=>`
      <div class="sp-list-item" data-part="mail-${e.name.split(` `)[0]?.toLowerCase()}" style="gap: 8px; padding: 4px 9px">
        <span class="sp-avatar" style="width: 20px; height: 20px; font-size: 9px">${e.name.slice(0,1)}</span>
        <span class="sp-grow" style="overflow: hidden">
          <span style="display: block; font-weight: 500; font-size: 12px; line-height: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.name}</span>
          <span class="sp-label" style="display: block; font-size: 11px; line-height: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.line}</span>
        </span>
      </div>`).join(``),g=(e,n)=>`
    <span class="sp-nav-item" ${n?`data-current`:``} style="display: flex; justify-content: center; padding: 6px 0">${t(e)}</span>`,_=l.map(e=>`
      <span
        data-part="stop-${e}"
        aria-hidden="true"
        style="position: absolute; top: 8px; left: ${r+e}px; width: 6px; height: 6px; translate: -50% 0; pointer-events: none"
      ></span>`).join(``);m.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 232px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour Office</span>
          <span style="position: relative; width: 74px; height: 24px">
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="hide"
              style="position: absolute; inset: 0; padding: 0; font-size: 11px; visibility: hidden"
            >Hide pane</button>
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="show"
              style="position: absolute; inset: 0; padding: 0; font-size: 11px; visibility: hidden"
            >Show pane</button>
          </span>
        </div>

        <div class="sp-body" style="padding: 10px">
          <div class="sp-surface" style="height: 100%; overflow: hidden">
            <div data-part="window" style="position: relative; display: flex; height: 100%">
              <div
                class="sp-nav sp-context"
                data-part="rail"
                style="flex: 0 0 ${r}px; gap: 4px; padding: 8px 6px; background: var(--sp-sunken); border-right: 1px solid var(--sp-line)"
              >
                ${g(`inbox`,!0)}
                ${g(`star`,!1)}
                ${g(`trash`,!1)}
              </div>

              <div
                data-part="pane"
                data-subject
                data-kind="fixed"
                data-stated="pane"
                data-width="${s}"
                data-band="${p(s)}"
                role="group"
                aria-label="Mailboxes"
                style="display: flex; flex-direction: column; min-width: 0; overflow: hidden; background: var(--sp-surface)"
              >
                <div class="sp-row" style="flex: 0 0 auto; gap: 6px; padding: 7px 9px; border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-label sp-grow" style="color: var(--sp-ink); overflow: hidden; white-space: nowrap; text-overflow: ellipsis">Mailboxes</span>
                  <span
                    class="sp-chip"
                    data-part="pane-width"
                    style="flex: 0 0 auto; padding: 1px 6px; font-size: 10px; cursor: default; border-color: var(--sp-accent); color: var(--sp-accent); font-variant-numeric: tabular-nums"
                  >${s}dp</span>
                </div>
                <div class="sp-list" style="flex: 1 1 auto; min-height: 0; overflow: hidden">${h}</div>
              </div>

              <div
                class="sp-context"
                data-part="detail"
                style="display: flex; flex-direction: column; min-width: 0; overflow: hidden; background: var(--sp-surface); border-left: 1px solid var(--sp-line)"
              >
                <div class="sp-row" style="flex: 0 0 auto; gap: 6px; padding: 7px 9px; border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-label sp-grow" style="color: var(--sp-ink); overflow: hidden; white-space: nowrap; text-overflow: ellipsis">Ferry timetable, winter</span>
                  <span
                    class="sp-chip"
                    data-part="detail-width"
                    style="flex: 0 0 auto; padding: 1px 6px; font-size: 10px; cursor: default; font-variant-numeric: tabular-nums"
                  >1fr</span>
                </div>
                <div class="sp-stack" style="flex: 1 1 auto; min-height: 0; gap: 7px; padding: 10px 12px; overflow: hidden">
                  <div class="sp-line" style="width: 94%"></div>
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 96%"></div>
                  <div class="sp-line" style="width: 62%"></div>
                  <div class="sp-line" style="width: 90%"></div>
                </div>
              </div>

              <span
                data-part="splitter"
                class="sp-context"
                role="separator"
                aria-label="Resize the mailbox pane"
                aria-orientation="vertical"
                style="position: absolute; top: 0; bottom: 0; left: 208px; z-index: 2; width: 10px; translate: -50% 0;
                       display: flex; justify-content: center; cursor: col-resize; touch-action: none"
              ><span data-part="splitter-bar" aria-hidden="true" style="width: 2px; height: 100%; background: var(--sp-line)"></span></span>

              ${_}
            </div>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-part="kinds" data-value="fixed" data-axis="Kind">
          ${d.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px">${e.label}</button>`).join(``)}
        </sp-segmented>
        <span class="sp-label" data-stage-verdict data-part="note" role="status" style="height: 30px; width: 452px; font-size: 11px; line-height: 15px; text-align: center"></span>
      
    </div>
  `;let v=e(m,`window`),y=e(m,`pane`),b=e(m,`detail`),x=e(m,`splitter`),S=e(m,`splitter-bar`),C=e(m,`pane-width`),w=e(m,`detail-width`),T=e(m,`hide`),E=e(m,`show`),D=e(m,`note`),O=s,k=d[0],A=!0,j=!1,M=()=>{let e=k.floats,t=(e?60:r)+O;y.hidden=!A,x.hidden=!A,y.dataset.kind=k.key,y.dataset.stated=k.stated,y.dataset.width=String(O),y.dataset.band=p(O),e?(y.style.position=`absolute`,y.style.left=`60px`,y.style.top=`${c}px`,y.style.bottom=`${c}px`,y.style.flex=`0 0 auto`,y.style.width=`${O}px`,y.style.zIndex=`1`,y.style.border=`1px solid var(--sp-line)`,y.style.borderRadius=`var(--sp-radius)`,y.style.boxShadow=`var(--sp-shadow)`):(y.style.position=`static`,y.style.width=`auto`,y.style.zIndex=`auto`,y.style.border=`0`,y.style.borderRadius=`0`,y.style.boxShadow=`none`,y.style.flex=k.stated===`other`?`1 1 auto`:`0 0 ${O}px`),b.style.flex=!e&&A&&k.stated===`other`?`0 0 ${i-O}px`:`1 1 auto`,x.style.left=`${t}px`,x.style.top=e?`${c}px`:`0`,x.style.bottom=e?`${c}px`:`0`,C.textContent=k.stated===`other`?`1fr`:`${O}dp`,w.textContent=k.stated===`other`?`${i-O}dp`:`1fr`,T.style.visibility=k.dismissible&&A?`visible`:`hidden`,E.style.visibility=k.dismissible&&!A?`visible`:`hidden`,D.textContent=k.note},N=e=>{O=Math.round(f(e,a,o)),M()},P=e=>{k=d.find(t=>t.key===e)??k,A=!0,M()},F=e=>n(e,v).x-r-(k.floats?c:0);x.addEventListener(`pointerdown`,e=>{j=!0,S.style.background=`var(--sp-accent)`,S.style.width=`3px`,e.isTrusted&&x.setPointerCapture(e.pointerId)}),x.addEventListener(`pointermove`,e=>{j&&N(F(e))});let I=e=>{j&&(j=!1,S.style.background=`var(--sp-line)`,S.style.width=`2px`,N(F(e)))};x.addEventListener(`pointerup`,I),x.addEventListener(`pointercancel`,I),T.addEventListener(`click`,()=>{A=!1,M()}),E.addEventListener(`click`,()=>{A=!0,M()}),e(m,`kinds`).addEventListener(`change`,e=>P(e.detail)),M()}export{m as mount};