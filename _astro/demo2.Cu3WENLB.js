var e=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`,t=[{part:`hyphen`,name:`Hyphen`,glyph:`-`,code:`U+002D`,job:`joins: well-known, part-time`},{part:`en-dash`,name:`En dash`,glyph:`–`,code:`U+2013`,job:`spans: 2010–2014, pages 12–18`},{part:`em-dash`,name:`Em dash`,glyph:`—`,code:`U+2014`,job:`breaks: an aside, an interruption`}];function n(n){let r=t=>{let n=t.part===`em-dash`?` data-subject`:``;return`<span data-part="glyph-${t.part}"${n}
      style="background: var(--sp-accent-soft); font-family: ${e}; font-size: 30px; line-height: 1.1">${t.glyph}</span>`};n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <table class="sp-table" style="--sp-cell-pad: 4px 8px">
          <tbody data-part="family" class="sp-context">${t.map(e=>`
      <tr data-part="row-${e.part}">
        <td style="width: 92px">${e.name}</td>
        <td style="width: 116px; text-align: center">${r(e)}</td>
        <td class="sp-label" style="width: 74px">${e.code}</td>
        <td class="sp-text">${e.job}</td>
      </tr>`).join(``)}</tbody>
        </table>
        <div class="sp-row sp-context" data-part="reference" style="gap: 0; margin-top: 8px">
          <span class="sp-label" style="width: 92px; padding: 0 8px">for width</span>
          <span style="width: 116px; text-align: center">
            <span style="background: var(--sp-sunken); font-family: ${e}; font-size: 30px; line-height: 1.1">n</span>
            <span style="background: var(--sp-sunken); font-family: ${e}; font-size: 30px; line-height: 1.1">m</span>
          </span>
        </div>
        <div class="sp-divider sp-context" style="margin: 10px 0"></div>
        <div class="sp-stack sp-context" data-part="house" style="gap: 4px">
          <span class="sp-label">Aside, set two ways</span>
          <span class="sp-text sp-text--ink" style="font-family: ${e}; font-size: 13px">
            She turned back—the light was still on—and locked it.
          </span>
          <span class="sp-text sp-text--ink" style="font-family: ${e}; font-size: 13px">
            She turned back – the light was still on – and locked it.
          </span>
        </div>
      </div>
    </div>
  `}export{n as mount};