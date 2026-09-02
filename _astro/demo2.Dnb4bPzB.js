import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={vague:{head:`Find your friends`,body:`Loomly is better with people you already cook with. Connect your address book to see who is here.`,message:``,cta:`Connect contacts`},exact:{head:`Invite people yourself`,body:`We read your address book to show you who is here. Nothing is sent until you pick names.`,message:`Each invitation will read: Dana asked to swap recipes with you on Loomly.`,cta:`Show me my contacts`}},n={vague:{pending:{state:`pending`,count:`0 sent`,line:`Nothing has left yet.`},after:{state:`sent`,count:`214 sent`,line:`From: Dana Ruiz. To: everyone in the address book.`}},exact:{pending:{state:`pending`,count:`0 sent`,line:`Nothing has left yet.`},after:{state:`held`,count:`0 sent`,line:`214 contacts read, and none of them mailed.`}}},r={vague:`One permission, two different acts. The mail is not the deception; the sentence that collected the address book is.`,exact:`The same address book, the same integration, the same button. Only the ask changed, and now the consent covers what happens.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 253px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Loomly, first run</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="vague" data-axis="Friend spam" data-term="vague" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-vague" type="button" value="vague" style="padding: 4px 9px; font-size: 11.5px">With</button>
            <button class="sp-segment" data-part="mode-exact" type="button" value="exact" style="padding: 4px 9px; font-size: 11.5px">Without</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div
            class="sp-surface"
            data-part="ask"
            data-subject
            data-pose="[data-mode=vague]"
            data-mode="vague"
            style="flex: 0 0 auto; height: 130px; padding: 11px 12px; background: var(--sp-surface)"
          >
            <span class="sp-heading" data-part="ask-head" style="display: block; height: 20px; line-height: 20px; font-size: 13px">${t.vague.head}</span>
            <span class="sp-text" data-part="ask-body" style="display: block; height: 32px; margin-top: 3px; font-size: 11.5px; line-height: 1.35">${t.vague.body}</span>
            <span class="sp-text" data-part="ask-message" style="display: block; height: 16px; margin-top: 2px; font-size: 11px; line-height: 16px; font-style: italic">${t.vague.message}</span>
            <div class="sp-row" style="gap: 8px; margin-top: 9px">
              <button class="sp-button sp-button--sm" data-part="consent" type="button" style="flex: 0 0 auto; white-space: nowrap">${t.vague.cta}</button>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="decline" type="button" style="flex: 0 0 auto; color: var(--sp-muted); white-space: nowrap">Not now</button>
            </div>
          </div>

          <div class="sp-surface sp-context" data-part="outbox" data-state="pending" style="flex: 1 1 auto; padding: 8px 11px">
            <div class="sp-row" style="gap: 8px; height: 18px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">Outbox</span>
              <span class="sp-chip" data-part="count" style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; cursor: default; white-space: nowrap">${n.vague.pending.count}</span>
            </div>
            <span class="sp-text sp-text--ink" data-part="outbox-line" style="display: block; height: 15px; font-size: 11px; line-height: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${n.vague.pending.line}</span>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 30px; font-size: 11px; line-height: 1.35">${r.vague}</span>
    </div>
  `;let a=e(i,`ask`),o=e(i,`ask-head`),s=e(i,`ask-body`),c=e(i,`ask-message`),l=e(i,`consent`),u=e(i,`outbox`),d=e(i,`count`),f=e(i,`outbox-line`),p=e(i,`note`),m=`vague`,h=e=>{u.dataset.state=e.state,d.textContent=e.count,f.textContent=e.line},g=()=>{let e=t[m];a.dataset.mode=m,o.textContent=e.head,s.textContent=e.body,c.textContent=e.message,l.textContent=e.cta,p.textContent=r[m],h(n[m].pending)};l.addEventListener(`click`,()=>h(n[m].after)),e(i,`decline`).addEventListener(`click`,()=>h(n[m].pending)),e(i,`mode`).addEventListener(`change`,e=>{m=e.detail===`exact`?`exact`:`vague`,g()})}export{i as mount};