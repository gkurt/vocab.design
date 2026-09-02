import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={width:308,height:196},r=6,i={short:`One block of content, and the footer is still on the bottom edge.`,long:`Taller than the window now, so the footer sits below the fold.`};function a(a){let o=Array.from({length:r},(e,t)=>`
      <div class="sp-stack" data-part="block-${t}" style="gap: 6px"${t===0?``:` hidden`}>
        <span class="sp-heading" style="font-size: 13px">Tide times</span>
        <div class="sp-line" style="width: 92%"></div>
        <div class="sp-line" style="width: 74%"></div>
      </div>`).join(``),s=(e,t)=>`
    <span class="sp-label" style="color: var(--sp-ink); font-weight: 600">${e}</span>
    <span class="sp-label">${t}</span>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Content</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Length" data-value="short">
            <button class="sp-segment" type="button" data-part="seg-short" value="short">short</button>
            <button class="sp-segment" type="button" data-part="seg-long" value="long">long</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 10px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 20px">
            <div
              class="sp-scroll"
              data-part="viewport"
              style="flex: 0 0 auto; width: ${n.width}px; height: ${n.height}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div
                data-part="page"
                data-subject
                data-length="short"
                style="display: grid; grid-template-rows: auto 1fr auto; min-height: 100%"
              >
                <div
                  data-part="header"
                  style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
                >
                  <span class="sp-heading sp-grow" style="font-size: 13px">Falmouth Harbour</span>
                  <span class="sp-label" style="white-space: nowrap">auto</span>
                </div>
                <div data-part="main" style="position: relative; display: flex; flex-direction: column; gap: 8px; padding: 10px 34px 10px 10px">
                  ${o}
                  <span class="sp-label" style="position: absolute; top: 10px; right: 10px">1fr</span>
                </div>
                <div
                  data-part="footer"
                  style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--sp-sunken); border-top: 1px solid var(--sp-line)"
                >
                  <span class="sp-label sp-grow">Harbour Commissioners</span>
                  <span class="sp-label" style="white-space: nowrap">auto</span>
                </div>
              </div>
            </div>
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 116px; gap: 8px">
              <span class="sp-label" style="color: var(--sp-ink)">grid-template-rows</span>
              <div style="display: grid; grid-template-columns: 30px 1fr; gap: 8px 8px; align-items: start">
                ${s(`auto`,`header`)}
                ${s(`1fr`,`main`)}
                ${s(`auto`,`footer`)}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let c=e(a,`viewport`),l=e(a,`page`),u=Array.from({length:5},(t,n)=>e(a,`block-${n+1}`)),d=e(a,`readout`),f=e=>{let n=i[e];if(n){l.dataset.length=e;for(let n of u)t(n,`hidden`,e!==`long`);c.scrollTop=0,d.textContent=n}};e(a,`switcher`).addEventListener(`change`,e=>f(e.detail)),f(`short`)}export{a as mount};