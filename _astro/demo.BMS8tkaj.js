import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=12,r=8,i=20,a={article:{main:8,aside:4,extra:0},gallery:{main:4,aside:4,extra:4}},o=`display: grid; grid-template-columns: repeat(${n}, 1fr); gap: ${r}px`,s=`display: flex; flex-direction: column; gap: 8px; padding: 10px; min-width: 0`;function c(r){let c=Array.from({length:n},()=>`<div style="background: var(--sp-accent); opacity: 0.14; border-radius: 2px"></div>`).join(``),l=(e,t,n,r=!1)=>`
    <div class="sp-surface" data-part="block-${e}" data-span="${n}"${r?` hidden`:``} style="${s}; grid-column: span ${n}">
      <span class="sp-label">${t}</span>
      <div class="sp-line" style="width: 84%"></div>
      <div class="sp-line" style="width: 62%"></div>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">${n} columns</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-part="switcher" data-value="article">
            <button class="sp-segment" type="button" data-part="seg-article" value="article">Article</button>
            <button class="sp-segment" type="button" data-part="seg-gallery" value="gallery">Gallery</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 14px ${i}px">
          <div style="position: relative; height: 100%">
            <div data-part="overlay" data-subject style="position: absolute; inset: 0; ${o}; pointer-events: none; z-index: 1">
              ${c}
            </div>
            <div
              class="sp-context"
              data-part="layout"
              data-arrangement="article"
              style="${o}; grid-template-rows: 40px 1fr; height: 100%"
            >
              <div class="sp-surface" data-part="block-head" style="${s}; grid-column: span ${n}; justify-content: center">
                <span class="sp-label">masthead</span>
              </div>
              ${l(`main`,`main`,8)}
              ${l(`aside`,`aside`,4)}
              ${l(`extra`,`extra`,4,!0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(r,`layout`),d={main:e(r,`block-main`),aside:e(r,`block-aside`),extra:e(r,`block-extra`)},f=e=>{let n=a[e];if(n){u.dataset.arrangement=e;for(let[e,r]of Object.entries(d)){let i=n[e];r.dataset.span=String(i),t(r,`hidden`,i===0),i>0&&(r.style.gridColumn=`span ${i}`)}}};e(r,`switcher`).addEventListener(`change`,e=>f(e.detail)),f(`article`)}export{c as mount};