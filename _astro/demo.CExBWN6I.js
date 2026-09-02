import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={dark:{chrome:`#1c2430`,ink:`#ffffff`,title:`#ffffff`,note:`The app declared dark chrome, so the system draws the clock, the signal and the battery in white. It picked the ink; the app only said what was behind it.`},light:{chrome:`#e9edf3`,ink:`#131820`,title:`#131820`,note:`A light header needs dark glyphs, and the same strip flips its ink to keep them readable. Nothing in the strip changed owner: it is still the system drawing it.`}},i=`<svg width="14" height="9" viewBox="0 0 14 9" aria-hidden="true" style="display: block; fill: currentcolor">
  <rect x="0" y="6" width="2.4" height="3" rx="0.6" opacity="0.9"/><rect x="3.7" y="4" width="2.4" height="5" rx="0.6" opacity="0.9"/>
  <rect x="7.4" y="2" width="2.4" height="7" rx="0.6" opacity="0.9"/><rect x="11.1" y="0" width="2.4" height="9" rx="0.6" opacity="0.35"/></svg>`,a=`<svg width="12" height="9" viewBox="0 0 12 9" aria-hidden="true" style="display: block; fill: none; stroke: currentcolor; stroke-width: 1.3; stroke-linecap: round">
  <path d="M1 3a7 7 0 0 1 10 0"/><path d="M3.2 5.4a3.9 3.9 0 0 1 5.6 0"/><circle cx="6" cy="7.9" r="0.7" style="fill: currentcolor; stroke: none"/></svg>`,o=`<svg width="21" height="10" viewBox="0 0 21 10" aria-hidden="true" style="display: block">
  <rect x="0.6" y="0.6" width="16" height="8.8" rx="2.6" fill="none" stroke="currentcolor" stroke-width="1.1" opacity="0.5"/>
  <rect x="2.2" y="2.2" width="10.6" height="5.6" rx="1.4" fill="currentcolor"/>
  <path d="M18.6 3.6v2.8" stroke="currentcolor" stroke-width="1.7" stroke-linecap="round" opacity="0.5"/></svg>`;function s(s){let c=[`Tide times`,`Wind`,`Berths`,`Fuel`,`Weather`,`Charts`,`Contacts`,`Settings`].map((e,t)=>`
      <div class="sp-row" data-part="row-${t+1}" style="gap: 8px; padding: 5px 10px; border-bottom: 1px solid var(--sp-line)">
        <span class="sp-line" style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px"></span>
        <span class="sp-text" style="font-size: 12px">${e}</span>
      </div>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 200px; height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">App chrome</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Theme" data-part="switcher" data-value="dark">
            <button class="sp-segment" type="button" data-part="seg-dark" value="dark">dark</button>
            <button class="sp-segment" type="button" data-part="seg-light" value="light">light</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px 14px">
          <div class="sp-context" style="flex: 0 0 auto; padding: 5px; background: #10141b; border-radius: 22px">
            <div style="display: flex; flex-direction: column; width: 148px; height: 196px; background: var(--sp-surface); border-radius: 17px; overflow: hidden">
              <div data-part="chrome" data-tint="dark" style="flex: 0 0 auto; background: ${r.dark?.chrome}">
                <div
                  data-part="strip"
                  data-subject
                  data-ink="light"
                  style="display: flex; align-items: center; justify-content: space-between; height: 22px; padding: 0 10px; color: ${r.dark?.ink}"
                >
                  <span data-part="time" style="font-size: 11px; font-weight: 600; letter-spacing: 0.2px">9:41</span>
                  <span class="sp-row" data-part="glyphs" style="gap: 4px">${i}${a}${o}</span>
                </div>
                <div class="sp-row" data-part="header" style="height: 32px; padding: 0 10px; color: ${r.dark?.title}">
                  <span class="sp-grow" style="font-size: 13px; font-weight: 600">Harbour</span>
                  <span style="display: flex; opacity: 0.8">${n(`kebab`)}</span>
                </div>
              </div>
              <div class="sp-scroll" data-part="content" style="flex: 1 1 auto; min-height: 0; background: var(--sp-surface)">${c}</div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout"></span>
        </div>
      </div>
    </div>
  `;let l=e(s,`chrome`),u=e(s,`strip`),d=e(s,`header`),f=e(s,`content`),p=e(s,`readout`),m=e=>{let t=r[e];t&&(l.dataset.tint=e,l.style.background=t.chrome,u.dataset.ink=e===`dark`?`light`:`dark`,u.style.color=t.ink,d.style.color=t.title,p.textContent=t.note)};f.addEventListener(`scroll`,()=>t(f,`data-scrolled`,f.scrollTop>4)),e(s,`switcher`).addEventListener(`change`,e=>m(e.detail)),m(`dark`)}export{s as mount};