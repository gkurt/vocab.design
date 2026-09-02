import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={prevented:[{key:`starter`,name:`Starter`,price:`£7 / month`,billing:`monthly`,rows:[`Up to 3 seats`,`Basic exports`,`Email support`]},{key:`team`,name:`Team`,price:`£84 / year`,billing:`yearly`,rows:[`Reporting suite`,`Fair-use seats`,`Priority queue`]},{key:`scale`,name:`Scale`,price:`Talk to us`,billing:`quoted`,rows:[`Everything in Team`,`Full list on request`,`Terms apply`]}],comparable:[{key:`starter`,name:`Starter`,price:`£7 / month`,billing:`monthly`,rows:[`Seats: 3`,`Exports: CSV`,`Support: email`]},{key:`team`,name:`Team`,price:`£19 / month`,billing:`monthly`,rows:[`Seats: 20`,`Exports: CSV, API`,`Support: email`]},{key:`scale`,name:`Scale`,price:`£49 / month`,billing:`monthly`,rows:[`Seats: unlimited`,`Exports: CSV, API`,`Support: phone`]}]},n={prevented:{answer:`unknown`,text:`Cheapest per seat per month: not answerable from this page.`},comparable:{answer:`team`,text:`Cheapest per seat per month: Team, at 95p. Read straight across.`}};function r(r){let i=e=>`
    <div
      class="sp-surface"
      data-part="plan-${e.key}"
      data-billing="${e.billing}"
      style="flex: 1 1 0; min-width: 0; padding: 9px 10px; background: var(--sp-surface)"
    >
      <span class="sp-heading" style="display: block; height: 17px; line-height: 17px; font-size: 12.5px">${e.name}</span>
      <span
        data-part="price-${e.key}"
        style="display: block; height: 20px; line-height: 20px; font-size: 12px; font-weight: 600; color: var(--sp-accent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
      >${e.price}</span>
      <div class="sp-divider" style="margin: 7px 0"></div>
      ${e.rows.map((t,n)=>`
        <span
          data-part="row-${e.key}-${n}"
          class="sp-text"
          style="display: block; height: 28px; font-size: 10.5px; line-height: 1.3; overflow: hidden"
        >${t}</span>`).join(``)}
    </div>`,a=e=>t[e].map(i).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Pick a plan</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="prevented" data-axis="Comparison prevention" data-term="prevented" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-prevented" type="button" value="prevented" style="padding: 4px 9px; font-size: 11.5px">With</button>
            <button class="sp-segment" data-part="mode-comparable" type="button" value="comparable" style="padding: 4px 9px; font-size: 11.5px">Without</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div
            class="sp-row"
            data-part="plans"
            data-subject
            data-pose="[data-mode=prevented]"
            data-mode="prevented"
            style="flex: 0 0 auto; align-items: stretch; gap: 8px; height: 160px"
          >${a(`prevented`)}</div>

          <div data-stage-verdict class="sp-row sp-context" data-part="verdict" data-answer="unknown" style="flex: 1 1 auto; gap: 8px; min-height: 0">
            <span
              class="sp-text sp-text--ink sp-grow"
              data-part="verdict-text"
              style="font-size: 11px; line-height: 1.3; overflow: hidden"
            >${n.prevented.text}</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(r,`plans`),s=e(r,`verdict`),c=e(r,`verdict-text`);e(r,`mode`).addEventListener(`change`,e=>{let t=e.detail===`comparable`?`comparable`:`prevented`;o.dataset.mode=t,o.innerHTML=a(t),s.dataset.answer=n[t].answer,c.textContent=n[t].text})}export{r as mount};