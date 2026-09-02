import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[{n:1,text:`Alt text: “Merino coat, grey, front view”.`},{n:2,text:`Heading level 2. Set small, still second in the outline.`},{n:3,text:`Focus order 1 of 2, reached before Save.`},{n:4,text:`Button, name “Save for later”. The heart says nothing.`}],r=[{n:1,top:24},{n:2,top:64},{n:3,top:106},{n:4,top:138}],i={bare:`A comp says how it looks. Heading level, focus order, roles, and alt text are not visible properties, so nothing in the file carries them.`,annotated:`The same comp with the invisible decisions written down: what each element is, what it is called, and in what order it is reached.`};function a(a){let o=(e,t)=>`
    <span style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto;
                 width: 15px; height: 15px; border-radius: 50%; background: var(--sp-accent);
                 color: var(--sp-accent-ink); font-size: 9px; font-weight: 600; ${t}">${e}</span>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Handoff, one product card</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="bare" data-axis="Version" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-bare" value="bare"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Bare mockup</button>
            <button class="sp-segment" type="button" data-part="seg-annotated" value="annotated"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Annotated</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" data-part="mockup"
               style="position: relative; flex: 0 0 auto; width: 176px; height: 170px;
                      padding: 10px 10px 10px 28px">
            <div style="height: 46px; border-radius: 5px; background: var(--sp-line)"></div>
            <div class="sp-heading" style="margin-top: 6px; font-size: 13px; line-height: 16px">Merino coat</div>
            <div class="sp-label" style="margin-top: 2px; font-size: 11px; line-height: 14px">&#163;180.00</div>
            <button class="sp-button sp-button--sm" type="button" data-part="buy"
                    style="width: 100%; height: 26px; margin-top: 6px; font-size: 11.5px">Add to basket</button>
            <button class="sp-icon-button" type="button" data-part="save"
                    style="margin-top: 6px; width: 26px; height: 26px">${t(`heart`)}</button>
            ${r.map(({n:e,top:t})=>`
    <span data-part="pin-${e}" style="position: absolute; left: 7px; top: ${t}px; opacity: 0;
                                      transition: opacity 0.2s ease">${o(e,``)}</span>`).join(``)}
          </div>

          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; height: 170px; padding: 8px 10px">
            <span class="sp-label sp-context" style="font-size: 10px">Notes on the file</span>
            <div style="position: relative; height: 138px; margin-top: 5px">
              <p class="sp-text sp-context" data-part="placeholder"
                 style="position: absolute; inset: 0; margin: 0; font-size: 11px; line-height: 1.4;
                        transition: opacity 0.2s, visibility 0.2s">
                No notes on this file.</p>
              <div class="sp-stack" data-part="notes" data-subject
                   style="position: absolute; inset: 0; gap: 6px; opacity: 0; visibility: hidden;
                          transition: opacity 0.2s, visibility 0.2s">
                ${n.map(({n:e,text:t})=>`
    <div class="sp-row" data-part="note-${e}" style="align-items: flex-start; gap: 8px; height: 28px">
      ${o(e,`margin-top: 1px`)}
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; line-height: 1.3">${t}</span>
    </div>`).join(``)}
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="bare"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${i.bare}</p>
      </div>
    </div>
  `;let s=e(a,`notes`),c=e(a,`placeholder`),l=e(a,`caption`),u=r.map(t=>e(a,`pin-${t.n}`)),d=(e,t)=>{e.style.opacity=t?`1`:`0`,e.style.visibility=t?`visible`:`hidden`};e(a,`mode`).addEventListener(`change`,e=>{let t=e.detail,n=t===`annotated`;d(s,n),d(c,!n);for(let e of u)e.style.opacity=n?`1`:`0`;l.dataset.mode=t,l.textContent=i[t]})}export{a as mount};