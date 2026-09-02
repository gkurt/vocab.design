import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{t as r}from"./motion.B5_YXmsy.js";var i=[{key:`note`,label:`Add note`,glyph:`pencil`,done:`Note added to the trip`},{key:`receipt`,label:`Add receipt`,glyph:`copy`,done:`Receipt attached`},{key:`flag`,label:`Flag for review`,glyph:`star`,done:`Flagged for review`},{key:`share`,label:`Share trip`,glyph:`share`,done:`Trip shared`}],a=42,o=i.length*a,s=[`display: inline-flex`,`align-items: center`,`justify-content: center`,`flex: 0 0 auto`,`width: 34px`,`height: 34px`,`padding: 0`,`border-radius: 50%`,`box-shadow: var(--sp-shadow)`].join(`; `);function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Orkney, March</span>
          <span class="sp-label" style="font-size: 11px">3 entries</span>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; padding: 10px">
          <ul class="sp-list sp-surface" style="flex: 0 0 auto; padding: 2px 8px">
            <li class="sp-list-item"><span class="sp-grow">Ferry, Scrabster</span><span class="sp-text">£41.00</span></li>
            <li class="sp-list-item"><span class="sp-grow">Guest house</span><span class="sp-text">£128.00</span></li>
            <li class="sp-list-item"><span class="sp-grow">Fuel, Stromness</span><span class="sp-text">£62.40</span></li>
          </ul>
          <span class="sp-grow"></span>
          <span
            class="sp-text"
            data-part="status"
            data-value="none"
            role="status"
            style="flex: 0 0 auto; width: 150px; height: 18px; font-size: 11px; line-height: 18px; white-space: nowrap; overflow: hidden"
          >Nothing added yet</span>
        </div>

        <div
          class="sp-stack"
          data-part="fan"
          data-subject
          role="menu"
          aria-label="Add to this trip"
          style="position: absolute; right: 16px; bottom: 68px; gap: 0; height: ${o}px; align-items: flex-end;
                 opacity: 0; visibility: hidden; transition: opacity 0.14s, visibility 0.14s"
        >${i.map(e=>`
      <div class="sp-row" data-part="act-${e.key}" style="justify-content: flex-end; gap: 8px; height: ${a}px">
        <span class="sp-chip" style="cursor: default; padding: 3px 9px; font-size: 11px; box-shadow: var(--sp-shadow)">${e.label}</span>
        <button class="sp-button" type="button" data-part="do-${e.key}" aria-label="${e.label}" style="${s}">${n(e.glyph)}</button>
      </div>`).join(``)}</div>

        <button
          class="sp-button"
          type="button"
          data-part="fab"
          aria-label="Add to this trip"
          aria-haspopup="menu"
          aria-expanded="false"
          style="position: absolute; right: 16px; bottom: 16px; display: inline-flex; align-items: center;
                 justify-content: center; width: 46px; height: 46px; padding: 0; border-radius: 50%; box-shadow: var(--sp-shadow)"
        >${n(`plus`)}</button>
      </div>
    </div>
  `;let l=e(c,`fan`),u=e(c,`fab`),d=e(c,`status`),f=i.map(t=>e(c,`act-${t.key}`)),p=e=>{if(l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`,u.setAttribute(`aria-expanded`,String(e)),t(l,`data-open`,e),!(!e||r(c)))for(let[e,t]of[...f].reverse().entries())t.animate([{opacity:0,transform:`translateY(16px) scale(0.86)`},{opacity:1,transform:`none`}],{duration:200,delay:e*55,easing:`cubic-bezier(0.3, 0.9, 0.3, 1)`,fill:`backwards`})},m=e=>{d.dataset.value=e.key,d.textContent=e.done,p(!1)};u.addEventListener(`click`,()=>p(!0));for(let t of i)e(c,`do-${t.key}`).addEventListener(`click`,()=>m(t));c.addEventListener(`pointerdown`,e=>{let t=e.target;t&&(l.contains(t)||u.contains(t))||p(!1)}),c.addEventListener(`keydown`,e=>{e.key===`Escape`&&p(!1)}),p(!1)}export{c as mount};