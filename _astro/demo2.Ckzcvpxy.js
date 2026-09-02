import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=200,r=150,i={person:`<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>`,place:`<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.7 6-10a6 6 0 1 0-12 0c0 4.3 6 10 6 10z"/><circle cx="12" cy="11" r="2.2"/></svg>`},a=[{key:`name`,label:`Full name`,token:`name`,value:`Dana Whitlock`,glyph:i.person},{key:`email`,label:`Email`,token:`email`,value:`dana@kellerman.co`,glyph:t(`inbox`)},{key:`post`,label:`Postcode`,token:`postal-code`,value:`EC1A 4NP`,glyph:i.place}],o={declared:`Each field names its purpose, so the browser fills it from the saved profile and a personalisation tool can put a familiar glyph beside it.`,absent:`The same fields, the same labels, no tokens. The profile is still there, and nothing can be matched to anything, so the reader types all three by hand.`};function s(t,i){let s=(e,t,n)=>`
    <div class="sp-row" style="gap: 8px; height: 30px">
      <span class="sp-label" style="flex: 0 0 auto; width: 68px">${t}</span>
      <div class="sp-input" data-part="field-${e}" style="display: flex; align-items: center; gap: 7px;
                                                            flex: 1 1 auto; width: auto; min-width: 0;
                                                            height: 30px; padding: 0 9px">
        <span data-part="glyph-${e}" style="flex: 0 0 auto; display: flex; color: var(--sp-accent);
                                              opacity: 0; transition: opacity 0.2s ease">${n}</span>
        <span class="sp-text sp-text--ink" data-part="value-${e}"
              style="font-size: 12.5px; white-space: nowrap"></span>
      </div>
    </div>`,c=(e,t)=>`
    <div class="sp-row" style="height: 30px; justify-content: flex-end">
      <span data-part="token-${e}" style="font-size: 11px; font-weight: 500">${t}</span>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Checkout, one page</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="declared" data-axis="Autocomplete" data-term="declared" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-declared" value="declared"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Tokens declared</button>
            <button class="sp-segment" type="button" data-part="seg-absent" value="absent"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">No tokens</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" data-part="profile" style="gap: 8px; margin-top: 9px; height: 24px">
          <span class="sp-label" style="flex: 0 0 auto">Browser profile</span>
          <span class="sp-chip" style="cursor: default; padding: 2px 9px; font-size: 11px">Dana Whitlock</span>
          <span class="sp-chip" style="cursor: default; padding: 2px 9px; font-size: 11px">dana@kellerman.co</span>
          <span class="sp-chip" style="cursor: default; padding: 2px 9px; font-size: 11px">EC1A 4NP</span>
        </div>

        <div class="sp-row sp-context" style="gap: 12px; margin-top: 8px; height: 14px">
          <span class="sp-grow"></span>
          <span class="sp-label" style="flex: 0 0 auto; width: 118px; text-align: right; font-size: 10px">autocomplete</span>
        </div>

        <div class="sp-row" style="align-items: flex-start; gap: 12px; margin-top: 4px">
          <div class="sp-stack sp-context" data-part="form" data-state="filled" style="gap: 9px; flex: 1 1 auto">
            ${a.map(e=>s(e.key,e.label,e.glyph)).join(``)}
          </div>
          <div class="sp-stack" data-part="purpose" data-subject data-mode="declared" data-pose="[data-mode=declared]"
               style="flex: 0 0 auto; width: 118px; gap: 9px; padding: 0 9px;
                      border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)">
            ${a.map(e=>c(e.key,e.token)).join(``)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="declared"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${o.declared}</p>
      </div>
    </div>
  `;let l=e(t,`purpose`),u=e(t,`form`),d=e(t,`caption`),f=a.map(n=>({value:e(t,`value-${n.key}`),glyph:e(t,`glyph-${n.key}`),token:e(t,`token-${n.key}`),filled:n.value})),p=[],m=e=>{for(let e of p)i.clearTimeout(e);if(p=[],l.dataset.mode=e,d.dataset.mode=e,d.textContent=o[e],e===`absent`){u.dataset.state=`empty`,f.forEach(e=>{e.token.textContent=`not set`,e.token.style.color=`var(--sp-muted)`,e.token.style.fontWeight=`400`,e.value.textContent=``,e.glyph.style.opacity=`0`});return}a.forEach((e,t)=>{let o=f[t];o&&(o.token.textContent=e.token,o.token.style.removeProperty(`color`),o.token.style.fontWeight=`500`,p.push(i.setTimeout(()=>{o.value.textContent=o.filled,o.glyph.style.opacity=`1`,t===a.length-1&&(u.dataset.state=`filled`)},n+t*r)))}),u.dataset.state=`filling`};e(t,`mode`).addEventListener(`change`,e=>{m(e.detail)});for(let e of f)e.value.textContent=e.filled,e.glyph.style.opacity=`1`}export{s as mount};