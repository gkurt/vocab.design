import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=1e3,n=299,r=e=>String(e).padStart(2,`0`),i=e=>`${r(Math.floor(e/60))}:${r(e%60)}`,a={fake:`Reload and the clock starts again at five minutes. Nothing expires when it reaches zero.`,fair:`A dated deadline survives a reload, because the price really does change on Friday.`},o={fake:`
    <span class="sp-label" style="font-size: 11px">Sale price ends in</span>
    <span
      data-part="readout"
      data-at="start"
      style="font-size: 26px; font-weight: 600; line-height: 1.1; color: var(--sp-warn); font-variant-numeric: tabular-nums"
    >${i(n)}</span>
    <span class="sp-text" style="font-size: 11px">Order now or the price returns to 64.00.</span>`,fair:`
    <span class="sp-label" style="font-size: 11px">Sale price held until</span>
    <span data-part="deadline" style="font-size: 19px; font-weight: 600; line-height: 1.1">Friday 30 May, 6pm</span>
    <span class="sp-text" style="font-size: 11px">The same price is here tomorrow. Nothing on this page is counting.</span>`};function s(r,s){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout</span>
          <span class="sp-label" data-part="reload-count" style="font-size: 11px">Reloads: 0</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="reload" type="button">Reload page</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 8px 10px">
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Cast iron pan, 26cm</span><span class="sp-text">49.00</span></div>
            <div class="sp-row sp-row--between" style="margin-top: 4px"><span class="sp-text sp-text--ink">Delivery</span><span class="sp-text">4.50</span></div>
          </div>
          <div
            class="sp-surface"
            data-part="banner"
            data-subject
            data-pose="[data-mode=fake]"
            data-mode="fake"
            data-reloads="0"
            style="display: flex; flex-direction: column; justify-content: center; gap: 4px; height: 82px; padding: 10px 12px; background: var(--sp-surface)"
          >${o.fake}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 292px; font-size: 11px">${a.fake}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="fake" data-axis="Fake urgency" data-term="fake">
          <button class="sp-segment" data-part="mode-fake" value="fake">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;let c=e(r,`banner`),l=e(r,`verdict`),u=e(r,`reload-count`),d=n,f,p=()=>{let e=r.querySelector(`[data-part="readout"]`);e&&(e.textContent=i(d),d===n?e.dataset.at=`start`:e.removeAttribute(`data-at`))},m=()=>{d=Math.max(0,d-1),p(),d>0&&(f=s.setTimeout(m,t))},h=e=>{s.clearTimeout(f),f=void 0,d=n,p(),e&&(f=s.setTimeout(m,t))},g=e=>{c.dataset.mode=e,c.innerHTML=o[e],l.textContent=a[e],h(e===`fake`)};e(r,`reload`).addEventListener(`click`,()=>{let e=Number(c.dataset.reloads??0)+1;c.dataset.reloads=String(e),u.textContent=`Reloads: ${e}`,c.dataset.mode===`fake`&&h(!0)}),e(r,`mode`).addEventListener(`change`,e=>{g(e.detail===`fair`?`fair`:`fake`)}),h(!0)}export{s as mount};