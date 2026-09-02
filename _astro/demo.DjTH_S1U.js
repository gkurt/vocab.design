import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`surface`,light:`#FFFFFF`,dark:`#1B1E26`},{key:`ink`,light:`#1B2130`,dark:`#E7EAF0`},{key:`accent`,light:`#2F4FD8`,dark:`#8AA2FF`}],n={light:`The card resolves light, so every pair above returns its first argument.`,dark:`The card resolves dark, so the same three declarations return their second argument.`},r=`light`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="color-scheme" data-part="segmented" data-value="${r}">
            <button class="sp-segment" data-part="seg-light" value="light">light</button>
            <button class="sp-segment" data-part="seg-dark" value="dark">dark</button>
          </sp-segmented>
        </div>

        <div data-part="card" data-subject data-scheme="${r}"
             style="color-scheme: ${r}; ${t.map(e=>`--${e.key}: light-dark(${e.light}, ${e.dark})`).join(`; `)}; margin-top: 12px; height: 104px; padding: 12px;
                    border-radius: var(--sp-radius); border: 1px solid color-mix(in oklab, var(--ink) 22%, var(--surface));
                    background: var(--surface); color: var(--ink)">
          <span style="display: block; font-size: 13px; font-weight: 600">Quarterly statement</span>
          <span style="display: block; margin-top: 4px; font-size: 11px; opacity: 0.72">Ready to download</span>
          <span style="display: inline-block; margin-top: 12px; padding: 6px 12px; border-radius: 6px;
                       font-size: 12px; font-weight: 500; background: var(--accent);
                       color: color-mix(in oklab, var(--surface) 88%, var(--accent))">Open</span>
        </div>

        <div class="sp-stack sp-context" data-part="code" style="gap: 2px; margin-top: 10px">${t.map(e=>`
      <div class="sp-row" data-part="code-${e.key}" style="gap: 0; font-size: 11px; line-height: 1.5; white-space: pre">
        <span class="sp-text" style="font-size: 11px">--${e.key}: light-dark(</span>
        <span data-part="arg-${e.key}-light" style="font-size: 11px">${e.light}</span>
        <span class="sp-text" style="font-size: 11px">, </span>
        <span data-part="arg-${e.key}-dark" style="font-size: 11px">${e.dark}</span>
        <span class="sp-text" style="font-size: 11px">)</span>
      </div>`).join(``)}</div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 8px 0 0; min-height: 39px">&nbsp;</p>
      </div>
    </div>
  `;let a=e(i,`card`),o=e(i,`note`),s=r=>{a.dataset.scheme=r,a.style.colorScheme=r;for(let n of t)for(let t of[`light`,`dark`]){let a=e(i,`arg-${n.key}-${t}`),o=t===r;a.style.color=o?`var(--sp-ink)`:`var(--sp-muted)`,a.style.opacity=o?`1`:`0.45`}o.textContent=n[r]??``};s(r),e(i,`segmented`).addEventListener(`change`,e=>s(e.detail))}export{i as mount};