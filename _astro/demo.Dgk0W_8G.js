import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Material Icons'`,n=`'Geist Variable', system-ui, sans-serif`,r=[{name:`home`,code:`E88A`},{name:`star`,code:`E838`},{name:`delete`,code:`E872`}],i={ligature:{markup:`<span class="material-icons">home</span>`,glyph:e=>e.name,announced:`home star delete, read as words in the middle of the sentence around them`,verdict:`The text node holds a readable word and the font substitutes a drawing for it.`},codepoint:{markup:`<span class="material-icons">&#xE88A;</span>`,glyph:e=>`&#x${e.code};`,announced:`nothing, or the name of a private use character no one else has a meaning for`,verdict:`The text node holds a private use character, which means this drawing to this font and nothing to anything else.`}};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Glyphs</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Notation" data-part="segmented" data-value="ligature">
            <button class="sp-segment" data-part="seg-ligature" value="ligature">ligature</button>
            <button class="sp-segment" data-part="seg-codepoint" value="codepoint">code point</button>
          </sp-segmented>
        </div>
        <!-- A fixed height: the markup label is longer in one notation than the other and
             wraps to two lines in both, and a row that measured itself would move everything
             below it the day one of them wrapped to three (SPEC §5). -->
        <div class="sp-row" data-part="exhibit" data-mode="ligature"
             style="gap: 16px; margin-top: 12px; height: 36px; align-items: center">
          <span class="sp-row" data-part="glyphs" data-subject
                style="gap: 14px; font-family: ${t}; font-size: 28px; line-height: 1">
            ${r.map(e=>`<span data-part="glyph-${e.name}" style="display: inline-flex; width: 28px; height: 28px;
           align-items: center; justify-content: center; color: var(--sp-accent)">${e.name}</span>`).join(``)}
          </span>
          <span class="sp-label sp-context sp-grow" data-part="markup"
                style="font-family: 'Geist Mono Variable', ui-monospace, monospace; font-size: 12px"></span>
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0 10px"></div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start">
          <div class="sp-stack" style="gap: 6px; flex: 0 0 178px">
            <span class="sp-label">Font unavailable</span>
            <span class="sp-row" data-part="failure"
                  style="gap: 12px; height: 24px; font-family: ${n}; font-size: 13px"></span>
          </div>
          <!-- Three lines' room: the code point announcement is the longer of the two, and the
               shorter one must not let the caption below it move (SPEC §5). -->
          <p class="sp-text" data-stage-announce data-part="announced" style="margin: 0; font-size: 12px; height: 54px"></p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px"></p>
      </div>
    </div>
  `;let o=e(a,`exhibit`),s=e(a,`markup`),c=e(a,`failure`),l=e(a,`announced`),u=e(a,`caption`),d=t=>{let n=i[t];if(n){o.dataset.mode=t;for(let t of r)e(a,`glyph-${t.name}`).innerHTML=n.glyph(t);s.textContent=n.markup,c.innerHTML=r.map(e=>`<span class="sp-text--ink">${n.glyph(e)}</span>`).join(``),l.textContent=n.announced,u.textContent=n.verdict}};d(`ligature`),e(a,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{a as mount};