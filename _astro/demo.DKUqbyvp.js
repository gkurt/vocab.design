import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={none:`The middle card is an advertisement. Nothing in its type, its layout or its byline says so, and that resemblance is the thing being sold.`,fine:`Now there is a disclosure: eight pixels, grey on grey, at the end of a line nobody reads. It exists for the compliance review, not for the reader.`,labelled:`A disclosure that works costs contrast, position and a name. The label comes first, the card stops matching the column, and the advertiser sits where the publisher would.`},n={none:`<span class="sp-text" style="font-size: 11px">Kew Review · 3 min read</span>`,fine:`<span class="sp-text" style="font-size: 11px">Kew Review · 3 min read<span data-part="fine-print" style="font-size: 8px"> · sponsored</span></span>`,labelled:`<span data-part="badge" style="display: inline-flex; align-items: center; padding: 1px 7px; border-radius: 999px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600">Sponsored</span><span class="sp-text" style="font-size: 11px">Paid post by Verso Tools</span>`},r=[{byline:`The Ferry Post · 4 min read`,title:`Ferry timetable changes from Monday`},{byline:`The Ferry Post · 6 min read`,title:`Kew paper mill reopens its yard to visitors`}],i=`none`;function a(a){let o=(e,t=``,n=``)=>`
    <div class="sp-surface sp-row" ${n} style="gap: 10px; padding: 8px 10px; background: var(--sp-surface); ${t}">
      <span class="sp-swatch" style="flex: 0 0 auto; width: 34px; height: 34px; --sp-swatch: var(--sp-line)"></span>
      <span class="sp-stack" style="gap: 3px; flex: 1 1 auto; min-width: 0">${e}</span>
    </div>`,s=(e,t)=>`
    <span class="sp-row" style="height: 15px; gap: 6px"><span class="sp-text" style="font-size: 11px">${e}</span></span>
    <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 500">${t}</span>`,c=e=>`
    <span class="sp-row" style="height: 15px; gap: 6px">${n[e]}</span>
    <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 500">The three tools every bookbinder keeps sharp</span>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 231px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">The Ferry Post</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Disclosure" data-value="${i}">
            <button class="sp-segment" type="button" data-part="mode-none" value="none" style="padding: 5px 9px; font-size: 12px">No label</button>
            <button class="sp-segment" type="button" data-part="mode-fine" value="fine" style="padding: 5px 9px; font-size: 12px">Fine print</button>
            <button class="sp-segment" type="button" data-part="mode-labelled" value="labelled" style="padding: 5px 9px; font-size: 12px">Labelled</button>
          </sp-segmented>
        </div>
        <div class="sp-body sp-stack" data-part="feed" style="gap: 8px; justify-content: center">
          <div class="sp-context">${o(s(r[0]?.byline??``,r[0]?.title??``))}</div>
          ${o(c(i),`transition: background-color 0.2s`,`data-part="ad" data-subject data-pose="[data-disguise=on]" data-disguise="on" data-mode="none"`)}
          <div class="sp-context">${o(s(r[1]?.byline??``,r[1]?.title??``))}</div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${t[i]}</span>
    </div>
  `;let l=e(a,`ad`),u=l.querySelector(`.sp-stack`),d=e(a,`note`);e(a,`mode`).addEventListener(`change`,e=>{let n=e.detail;l.dataset.mode=n,l.dataset.disguise=n===`labelled`?`off`:`on`,l.style.background=n===`labelled`?`var(--sp-accent-soft)`:`var(--sp-surface)`,l.style.boxShadow=n===`labelled`?`inset 3px 0 0 0 var(--sp-accent)`:`none`,u&&(u.innerHTML=c(n)),d.textContent=t[n]})}export{a as mount};