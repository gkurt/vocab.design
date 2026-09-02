import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{t as r}from"./motion.B5_YXmsy.js";var i=620,a=[{key:`step-fares`,label:`Airline fares`,result:`218 found`},{key:`step-agency`,label:`Agency prices`,result:`4 agencies`},{key:`step-bags`,label:`Baggage rules`,result:`checked`},{key:`step-seats`,label:`Seat availability`,result:`31 seats`}],o=`
  <svg data-part="arc" viewBox="0 0 24 24" style="width: 26px; height: 26px; fill: none; stroke: var(--sp-muted); stroke-width: 2.4; stroke-linecap: round">
    <circle cx="12" cy="12" r="9" stroke-opacity="0.28" />
    <path d="M21 12a9 9 0 0 0-9-9" />
  </svg>`,s=({key:e,label:t})=>`
  <div class="sp-row" data-part="${e}" style="gap: 8px; height: 22px">
    <span data-part="${e}-mark" style="display: flex; flex: 0 0 auto; width: 16px; height: 16px; align-items: center; justify-content: center">
      <span
        style="width: 11px; height: 11px; border: 1.5px solid var(--sp-line); border-radius: 50%"
      ></span>
    </span>
    <span class="sp-grow" style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${t}</span>
    <span
      data-part="${e}-result"
      style="flex: 0 0 auto; width: 74px; text-align: right; font-size: 11px; color: var(--sp-muted); white-space: nowrap"
    ></span>
  </div>`,c=`<span style="display: flex; color: var(--sp-accent)">${n(`check`)}</span>`;function l(n,l){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px; padding: 14px">
        <div class="sp-row" data-part="run" data-state="idle" style="align-items: stretch; gap: 20px">
          <div class="sp-context" style="width: 158px; display: flex; flex-direction: column; gap: 4px">
            <div
              class="sp-surface"
              data-part="spin"
              style="flex: 1 1 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 12px"
            >
              <span data-part="glyph" style="display: flex; width: 26px; height: 26px; align-items: center; justify-content: center">${o}</span>
              <span class="sp-text" data-part="spin-status" style="font-size: 12px">Ready</span>
            </div>
          </div>

          <div style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 4px">
            <div class="sp-surface" style="flex: 1 1 auto; display: flex; flex-direction: column; padding: 12px">
              <div data-part="list" data-subject style="display: flex; flex-direction: column; gap: 6px">
                ${a.map(s).join(``)}
              </div>
              <div style="margin-top: auto">
                <div class="sp-divider" style="margin: 8px 0 6px"></div>
                <div style="height: 16px">
                  <span class="sp-text sp-text--ink" data-part="summary" style="font-size: 11px" hidden></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px; justify-content: flex-end">
          <button class="sp-button sp-button--sm" type="button" data-part="search">Search</button>
        </div>
      </div>
    </div>
  `;let u=r(n),d=e(n,`run`),f=e(n,`glyph`),p=e(n,`spin-status`),m=e(n,`summary`),h,g,_=(r,i)=>{let o=a[r];o&&(t(e(n,o.key),`data-done`,i),e(n,`${o.key}-mark`).innerHTML=i?c:`<span style="width: 11px; height: 11px; border: 1.5px solid var(--sp-line); border-radius: 50%"></span>`,e(n,`${o.key}-result`).textContent=i?o.result:``)},v=e=>{if(h?.cancel(),h=void 0,e){if(u){f.style.transform=`rotate(40deg)`;return}f.style.transform=``,h=f.animate([{transform:`rotate(0deg)`},{transform:`rotate(360deg)`}],{duration:900,iterations:1/0})}},y=()=>{d.dataset.state=`done`,v(!1),f.innerHTML=c,p.textContent=`Done`,m.textContent=`218 fares from 4 agencies`,m.hidden=!1},b=e=>{if(_(e,!0),e+1>=a.length)return y();g=l.setTimeout(()=>b(e+1),i)};e(n,`search`).addEventListener(`click`,()=>{l.clearTimeout(g),d.dataset.state=`running`,m.hidden=!0,m.textContent=``,f.innerHTML=o,p.textContent=`Searching`,v(!0);for(let e=0;e<a.length;e+=1)_(e,!1);g=l.setTimeout(()=>b(0),i)});for(let e=0;e<a.length;e+=1)_(e,!1)}export{l as mount};