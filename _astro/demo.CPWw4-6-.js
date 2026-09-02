import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`thumb`,emoji:`👍`,label:`Thumbs up`},{key:`heart`,emoji:`❤️`,label:`Heart`},{key:`laugh`,emoji:`😂`,label:`Laughing`},{key:`party`,emoji:`🎉`,label:`Party popper`},{key:`eyes`,emoji:`👀`,label:`Eyes`},{key:`check`,emoji:`✅`,label:`Done`}],i=1400,a=[{who:`Ola`,initials:`OA`,at:`9:32`,text:`Invoices are out, we are clear for the week.`},{who:`Priya`,initials:`PR`,at:`9:33`,text:`Great. I will close the ledger this afternoon.`},{who:`Dale`,initials:`DF`,at:`9:35`,text:`Van 4821 left the depot with the last pallet.`},{who:`Ola`,initials:`OA`,at:`9:36`,text:`Perfect. That is the quarter done, then.`}],o=e=>{let t=a[e];return`
    <div class="sp-row sp-context" style="gap: 10px; align-items: flex-start">
      <span class="sp-avatar" style="width: 26px; height: 26px; font-size: 10px">${t.initials}</span>
      <span class="sp-stack sp-grow" style="gap: 1px">
        <span class="sp-row" style="gap: 6px">
          <span class="sp-heading" style="font-size: 12px">${t.who}</span>
          <span class="sp-label" style="font-size: 11px">${t.at}</span>
        </span>
        <span class="sp-text sp-text--ink" style="font-size: 12px">${t.text}</span>
      </span>
    </div>`};function s(a,s){let c=r.map(e=>`
      <button
        class="sp-chip"
        type="button"
        data-part="chip-${e.key}"
        data-count="0"
        aria-label="${e.label}, no reactions"
        hidden
        style="padding: 2px 8px; gap: 4px; font-size: 12px"
      ><span aria-hidden="true">${e.emoji}</span><span data-part="count-${e.key}" style="font-variant-numeric: tabular-nums">0</span></button>`).join(``),l=r.map(e=>`
      <button
        class="sp-icon-button"
        type="button"
        data-part="pick-${e.key}"
        data-emoji="${e.key}"
        aria-label="React with ${e.label.toLowerCase()}"
        style="width: 26px; height: 26px; font-size: 15px; line-height: 1"
      >${e.emoji}</button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 264px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">harbour-crew</span>
          <span class="sp-row" style="gap: 4px">
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 9px">OA</span>
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 9px">PR</span>
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 9px">DF</span>
          </span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; padding: 12px">
          ${o(0)}

          <div
            data-part="reactions"
            class="sp-row"
            style="position: relative; gap: 6px; height: 26px; margin-left: 36px"
          >
            <button
              class="sp-icon-button"
              type="button"
              data-part="trigger"
              aria-label="Add reaction"
              aria-expanded="false"
              style="flex: 0 0 auto; width: 24px; height: 24px; border: 1px solid var(--sp-line)"
            >${n(`plus`)}</button>
            ${c}

            <div
              class="sp-popover"
              data-part="picker"
              data-subject
              role="group"
              aria-label="Quick reactions"
              style="z-index: 3; top: calc(100% + 8px); left: 0; min-width: 0; padding: 5px; --sp-arrow-x: 14px"
            >
              <span class="sp-row" style="gap: 2px">${l}</span>
            </div>
          </div>

          ${o(1)}
          ${o(2)}
          ${o(3)}
        </div>
      </div>
    </div>
  `;let u=e(a,`picker`),d=e(a,`trigger`),f=e=>{t(u,`data-open`,e),t(d,`data-open`,e),d.setAttribute(`aria-expanded`,String(e))},p=new Map(r.map(e=>[e.key,0])),m=new Set,h=n=>{let i=r.find(e=>e.key===n);if(!i)return;let o=p.get(n)??0,s=e(a,`chip-${n}`);e(a,`count-${n}`).textContent=String(o),s.dataset.count=String(o),s.setAttribute(`aria-label`,`${i.label}, ${o} ${o===1?`reaction`:`reactions`}`),t(s,`hidden`,o===0),t(s,`data-selected`,m.has(n))},g=(e,t)=>{p.set(e,(p.get(e)??0)+1),t&&m.add(e),h(e)},_=e=>{f(!1),g(e,!0),s.setTimeout(()=>g(e,!1),i)};d.addEventListener(`click`,()=>f(!0));for(let t of r)e(a,`pick-${t.key}`).addEventListener(`click`,()=>_(t.key));a.addEventListener(`keydown`,e=>{e.key===`Escape`&&f(!1)}),p.set(`thumb`,2),h(`thumb`)}export{s as mount};