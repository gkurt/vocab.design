import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`ui-monospace, 'SF Mono', Menlo, Consolas, monospace`,n=[{key:`yes`,code:`17456`,word:`Agree`},{key:`no`,code:`17457`,word:`Refuse`},{key:`ask`,code:`21038`,word:`Ask for help`}],r={rounded:{yes:`<circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="m7.4 12.4 3.1 3.1 6.1-6.6" fill="none" stroke="var(--sp-surface)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>`,no:`<circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="M6.8 12h10.4" fill="none" stroke="var(--sp-surface)" stroke-width="2.5" stroke-linecap="round"/>`,ask:`<circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="M9.3 9.5a2.8 2.8 0 1 1 3.9 2.7c-.9.4-1.2 1-1.2 1.9" fill="none" stroke="var(--sp-surface)" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.3" fill="var(--sp-surface)"/>`},line:{yes:`<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m7.2 12.4 3.2 3.2 6.4-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,no:`<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8l8 8M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,ask:`<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.3 9.6a2.8 2.8 0 1 1 3.9 2.7c-.9.4-1.2 1-1.2 1.9" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.3" fill="currentColor"/>`}},i={words:`The page as written. For a reader who communicates in symbols, the wording is the barrier, not the layout.`,rounded:`The reader’s own set, resolved from the codes. The page did not change: it shipped concepts, not pictures.`,line:`A second reader, a second set, the same three codes. This is why the author supplies a code and never a drawing.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Labels" data-part="mode" data-value="words" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-words" value="words"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Words</button>
            <button class="sp-segment" type="button" data-part="seg-rounded" value="rounded"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Set A</button>
            <button class="sp-segment" type="button" data-part="seg-line" value="line"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Set B</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="deck" data-set="words" style="margin-top: 10px; padding: 9px 10px">
          <div class="sp-row sp-context" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Reply to the message</span>
          </div>
          <div class="sp-row" style="margin-top: 7px; gap: 10px; align-items: flex-start">
            ${n.map((e,n)=>`
    <div class="sp-stack ${n===0?``:`sp-context`}" style="flex: 1 1 0; min-width: 0; gap: 4px; align-items: center">
      <button class="sp-button sp-button--ghost" type="button" data-part="btn-${e.key}"
              style="width: 100%; height: 46px; display: flex; align-items: center; justify-content: center;
                     font-size: 11.5px; white-space: nowrap">
        <span class="sp-text sp-text--ink" data-part="word-${e.key}"
              style="font-size: 11.5px; white-space: nowrap; transition: opacity 0.16s ease">${e.word}</span>
        <span data-part="sym-${e.key}" data-glyph="none"
              style="display: none; width: 26px; height: 26px; color: var(--sp-accent);
                     transition: opacity 0.16s ease"></span>
      </button>
      <span class="sp-label" style="font-family: ${t}; font-size: 8.5px; white-space: nowrap">symbol=${e.code}</span>
    </div>`).join(``)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-set="words"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${i.words}</p>
      </div>
    </div>
  `;let o=e(a,`deck`),s=e(a,`caption`),c=n.map(t=>e(a,`word-${t.key}`)),l=n.map(t=>e(a,`sym-${t.key}`));l[0]?.setAttribute(`data-subject`,``);let u=e=>{o.dataset.set=e,s.dataset.set=e,s.textContent=i[e],n.forEach((t,n)=>{let i=c[n],a=l[n];if(!(!i||!a)){if(e===`words`){i.style.display=``,a.style.display=`none`,a.dataset.glyph=`none`,a.innerHTML=``;return}i.style.display=`none`,a.style.display=`block`,a.dataset.glyph=`${e}-${t.key}`,a.innerHTML=`<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" style="display: block">${r[e][t.key]??``}</svg>`}})};e(a,`mode`).addEventListener(`change`,e=>{u(e.detail)}),u(`words`)}export{a as mount};