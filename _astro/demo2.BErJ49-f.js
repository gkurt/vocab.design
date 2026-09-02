import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={true:`The ornament still paints, pixel for pixel. It is simply not in the tree, so nothing reads it out.`,false:`Same pixels, and now the reader announces the decoration one character name at a time.`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 446px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="true" data-axis="aria-hidden" data-term="true" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-true" value="true">true</button>
            <button class="sp-segment" data-part="seg-false" value="false">false</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="card"
             style="margin-top: 8px; padding: 8px 12px; display: flex; flex-direction: column;
                    align-items: center; gap: 4px">
          <span class="sp-heading" data-part="title" style="font-size: 14px">Field notes</span>
          <span data-part="ornament" data-subject data-pose='[aria-hidden="true"]' aria-hidden="true"
                style="color: var(--sp-muted); font-size: 13px; letter-spacing: 7px; line-height: 1.1">&#10022; &#10022; &#10022;</span>
          <span class="sp-label" style="font-size: 11px">Ada Lovelace &middot; March</span>
        </div>

        <div class="sp-context" style="margin-top: 9px">
          <span class="sp-label">Accessibility tree</span>
          <div class="sp-stack" style="margin-top: 6px; gap: 2px">
            <div class="sp-menu-item" data-part="node-title" style="padding: 4px 8px; gap: 6px; cursor: default">
              <span style="color: var(--sp-accent); font-weight: 600">heading</span>
              <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">&ldquo;Field notes&rdquo;</span>
            </div>
            <div class="sp-menu-item" data-part="node-ornament"
                 style="padding: 4px 8px; gap: 6px; cursor: default; opacity: 0; transition: opacity 0.18s">
              <span style="color: var(--sp-accent); font-weight: 600">text</span>
              <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">&ldquo;black four pointed star&rdquo; &times;3</span>
            </div>
            <div class="sp-menu-item" data-part="node-byline" style="padding: 4px 8px; gap: 6px; cursor: default">
              <span style="color: var(--sp-accent); font-weight: 600">text</span>
              <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">&ldquo;Ada Lovelace, March&rdquo;</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="true"
           style="margin: 8px 0 0; height: 34px; font-size: 11px">${t.true}</p>
      </div>
    </div>
  `;let r=e(n,`ornament`),i=e(n,`node-ornament`),a=e(n,`caption`),o=e=>{r.setAttribute(`aria-hidden`,e),i.style.opacity=e===`true`?`0`:`1`,a.dataset.mode=e,a.textContent=t[e]};e(n,`segmented`).addEventListener(`change`,e=>{o(e.detail)})}export{n as mount};