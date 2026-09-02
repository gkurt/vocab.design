var e=`'Source Serif 4 Variable', ui-serif, Georgia, serif`,t=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px`;function n(n){let r=(e,t,n,r,i=``,a=!1)=>`
    <div class="sp-stack" style="flex: 0 0 88px; gap: 2px; align-items: center">
      <span data-part="${e}"${a?` data-subject`:``}
            style="background: var(--sp-sunken); font-family: ${n}; font-size: 44px; line-height: 1.15; ${i}">${t}</span>
      <span class="sp-label sp-context" style="font-size: 11px; white-space: nowrap">${r}</span>
    </div>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">characters in</span>
          <span class="sp-label">shapes out</span>
        </div>
        <div class="sp-row" data-part="row-one-character" style="gap: 14px; margin-top: 8px">
          <span class="sp-context" style="${t}; flex: 0 0 62px; color: var(--sp-muted)">U+0061</span>
          ${r(`glyph-sans`,`a`,`'Geist Variable', ui-sans-serif, system-ui, sans-serif`,`Geist`)}
          ${r(`glyph-serif`,`a`,e,`Source Serif`,``,!0)}
          <span class="sp-text sp-context sp-grow" style="font-size: 12px">2 glyphs</span>
        </div>
        <div class="sp-row" data-part="row-one-glyph" style="gap: 14px; margin-top: 10px">
          <span class="sp-context" style="${t}; flex: 0 0 62px; color: var(--sp-muted)">U+0066<br />U+0069</span>
          ${r(`glyph-fused`,`fi`,e,`liga on`,`font-variant-ligatures: common-ligatures`)}
          ${r(`glyph-split`,`fi`,e,`liga off`,`font-variant-ligatures: none`)}
          <span class="sp-text sp-context sp-grow" style="font-size: 12px">1 glyph</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 10px 0 0; font-size: 12px">
          A codepoint is what gets stored and a glyph is what gets drawn. The two never line up one
          for one, which is why counting either tells you nothing about the other.
        </p>
      </div>
    </div>
  `}export{n as mount};