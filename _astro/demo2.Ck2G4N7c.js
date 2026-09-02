import{n as e}from"./parts.C-YLuC7Q.js";var t=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px`,n=17,r=172,i=[{key:`gk`,initials:`GO`,author:`Gina Okafor`,when:`2 d`,date:`24 Aug 2026`,hash:`9f2c1a`,message:`Warn above the payment cap`,heat:88},{key:`mm`,initials:`MM`,author:`Mika Marchetti`,when:`3 wk`,date:`5 Aug 2026`,hash:`4b81e0`,message:`Guard an empty cart`,heat:58},{key:`ab`,initials:`AB`,author:`Adaeze Balogun`,when:`8 mo`,date:`18 Dec 2025`,hash:`71c0d5`,message:`Extract price() from checkout`,heat:32},{key:`rl`,initials:`RL`,author:`Rui Lima`,when:`2 y`,date:`3 Sep 2024`,hash:`0ac93f`,message:`Initial checkout flow`,heat:14}],a=[{code:`function checkout(cart) {`,commit:`rl`},{code:`  const items = cart.items`,commit:`ab`},{code:`  if (!items.length) return 0`,commit:`mm`},{code:`  const total = price(items)`,commit:`mm`},{code:`  if (total > CAP) warn(total)`,commit:`gk`},{code:`  log("checkout", total)`,commit:`gk`},{code:`  return submit(total)`,commit:`ab`},{code:`}`,commit:`rl`}],o=e=>i.find(t=>t.key===e),s=e=>`color-mix(in oklab, var(--sp-accent) ${e}%, var(--sp-line))`;function c(e,r){return`
    <button
      type="button"
      data-part="cell-${e+1}"
      style="display: flex; align-items: center; gap: 6px; width: 100%; height: ${n}px; padding: 0 6px 0 0; margin: 0; border: 0;
             background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer"
    >
      <span aria-hidden="true" style="flex: 0 0 auto; align-self: stretch; width: 6px; background: ${s(r.heat)}"></span>
      <span style="flex: 0 0 22px; font-size: 10px; font-weight: 600">${r.initials}</span>
      <span class="sp-label" style="flex: 0 0 28px; font-size: 10px">${r.when}</span>
      <span class="sp-label" style="flex: 1 1 auto; min-width: 0; ${t}; font-size: 9px; overflow: hidden">${r.hash}</span>
    </button>`}function l(i){let l=a.map((e,t)=>c(t,o(e.commit))).join(``),u=a.map((e,r)=>`
      <div data-part="code-${r+1}" style="display: flex; align-items: center; gap: 6px; height: ${n}px; padding: 0 6px">
        <span class="sp-label" style="flex: 0 0 12px; ${t}; font-size: 9px; text-align: right">${r+1}</span>
        <span style="flex: 1 1 auto; min-width: 0; ${t}; line-height: ${n}px; white-space: pre; overflow: hidden">${e.code}</span>
      </div>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">checkout.ts</span>
          <span class="sp-label" style="font-size: 11px">8 lines &middot; 4 commits</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; padding: 10px">
          <!-- The legend keeps the gutter's own colours, so it stays outside the context
               register: a swatch repainted neutral would stop being a legend. -->
          <div class="sp-row" style="gap: 6px; width: 452px">
            <span class="sp-label" style="flex: 1 1 auto; font-size: 10px">line age</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">2 d</span>
            <span aria-hidden="true" style="flex: 0 0 auto; width: 54px; height: 7px; border-radius: 4px; background: linear-gradient(to right, ${s(88)}, ${s(14)})"></span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">2 y</span>
          </div>

          <div class="sp-surface" style="display: flex; width: 452px; overflow: hidden">
            <div data-part="gutter" data-subject style="flex: 0 0 ${r}px; border-right: 1px solid var(--sp-line)">
              <div class="sp-row" style="gap: 6px; height: 18px; padding: 0 6px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label" style="font-size: 9px">who</span>
                <span class="sp-label" style="font-size: 9px">when</span>
                <span class="sp-label" style="font-size: 9px">which change</span>
              </div>
              ${l}
            </div>
            <div style="flex: 1 1 auto; min-width: 0">
              <div class="sp-row" style="height: 18px; padding: 0 6px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-label" style="font-size: 9px">the file itself</span>
              </div>
              ${u}
            </div>
          </div>

          <div class="sp-surface" data-part="detail" data-commit="gk" style="width: 452px; height: 50px; padding: 6px 10px">
            <div class="sp-row" style="gap: 8px">
              <span class="sp-text sp-text--ink sp-grow" data-part="detail-message" style="font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Warn above the payment cap</span>
              <span class="sp-label" data-part="detail-hash" style="flex: 0 0 auto; ${t}; font-size: 10px">9f2c1a</span>
            </div>
            <div class="sp-row" style="gap: 14px; margin-top: 4px">
              <span class="sp-label" data-part="detail-author" style="font-size: 10px; color: var(--sp-ink)">Gina Okafor</span>
              <span class="sp-label" data-part="detail-date" style="font-size: 10px">24 Aug 2026</span>
              <span class="sp-label" data-part="detail-lines" style="font-size: 10px">2 lines here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let d=e(i,`detail`),f=e(i,`detail-message`),p=e(i,`detail-hash`),m=e(i,`detail-author`),h=e(i,`detail-date`),g=e(i,`detail-lines`),_=t=>{d.dataset.commit=t.key,f.textContent=t.message,p.textContent=t.hash,m.textContent=t.author,h.textContent=t.date;let n=a.filter(e=>e.commit===t.key).length;g.textContent=`${n} lines here`,a.forEach((n,r)=>{let a=n.commit===t.key,o=e(i,`cell-${r+1}`),s=e(i,`code-${r+1}`);a?o.setAttribute(`data-active`,``):o.removeAttribute(`data-active`),o.style.background=a?`var(--sp-sunken)`:`transparent`,s.style.background=a?`var(--sp-sunken)`:`transparent`})};a.forEach((t,n)=>{let r=e(i,`cell-${n+1}`),a=o(t.commit);r.addEventListener(`pointerenter`,()=>_(a)),r.addEventListener(`click`,()=>_(a))}),_(o(`gk`))}export{l as mount};