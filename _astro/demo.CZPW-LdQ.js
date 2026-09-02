import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=3,n=[94,86,72,90,82,96,78,88,74,92,84,68];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 266px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Page length</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Content" data-part="segmented" data-value="short">
            <button class="sp-segment" data-part="seg-short" value="short">Short</button>
            <button class="sp-segment" data-part="seg-long" value="long">Long</button>
          </sp-segmented>
        </div>
        <div class="sp-scroll" data-part="viewport" style="flex: 1 1 auto">
          <div data-part="layout" style="min-height: 100%; display: flex; flex-direction: column">
            <main class="sp-context sp-grow" style="padding: 14px 12px">
              <span class="sp-heading">Colophon</span>
              <div class="sp-stack" data-part="copy" style="margin-top: 10px">${n.map((e,n)=>`<div class="sp-line" data-part="line-${n+1}" style="width: ${e}%"${n<t?``:` hidden`}></div>`).join(``)}</div>
            </main>
            <footer
              data-part="footer"
              data-subject
              data-mode="held"
              class="sp-row"
              style="flex: 0 0 auto; padding: 10px 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
            >
              <span class="sp-label sp-grow">Harbour Press, 2026</span>
              <span class="sp-label">Contact</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`viewport`),a=e(r,`layout`),o=e(r,`footer`),s=n.slice(t).map((n,i)=>e(r,`line-${t+i+1}`)),c=()=>{let e=a.getBoundingClientRect().height>i.getBoundingClientRect().height+1;o.dataset.mode=e?`pushed`:`held`};e(r,`segmented`).addEventListener(`change`,e=>{let t=e.detail===`long`;for(let e of s)e.hidden=!t;t||(i.scrollTop=0),c()}),c()}export{r as mount};