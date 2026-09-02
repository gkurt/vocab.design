import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={perceivable:{letter:`P`,name:`Perceivable`,criterion:`WCAG 1.1.1 Non-text content`,target:`fail-p`,why:`The photo carries the only picture of the room and has no text alternative, so the information does not reach a reader who cannot see it.`,test:`Can the information arrive in some form at all?`},operable:{letter:`O`,name:`Operable`,criterion:`WCAG 2.1.1 Keyboard`,target:`fail-o`,why:`The budget can only be set by dragging the handle. There is no keyboard path to the same value, so the control cannot be worked without a pointer.`,test:`Can every control be worked, by any input?`},understandable:{letter:`U`,name:`Understandable`,criterion:`WCAG 3.3.2 Labels or instructions`,target:`fail-u`,why:`The field is labelled in trade jargon. A reader can perceive it and can type in it, and still cannot tell what is being asked for.`,test:`Is the content, and what it wants, comprehensible?`},robust:{letter:`R`,name:`Robust`,criterion:`WCAG 4.1.2 Name, role, value`,target:`fail-r`,why:`Submit is a styled div with no role and no keyboard behaviour. It works where the software guesses well and disappears where it does not.`,test:`Will it survive other software reading it?`}},i=[`perceivable`,`operable`,`understandable`,`robust`];function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="perceivable" data-axis="Principle" style="display: flex; width: 100%">
          ${i.map(e=>`
    <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}"
            style="flex: 1 1 auto; padding: 3px 6px; font-size: 10.5px; white-space: nowrap">${r[e].name}</button>`).join(``)}
        </sp-segmented>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 210px; height: 188px; padding: 10px">
            <div data-part="fail-p"
                 style="height: 40px; border-radius: 5px; background: var(--sp-line); outline-offset: 2px"></div>

            <div class="sp-stack" data-part="fail-o" style="gap: 2px; margin-top: 10px; outline-offset: 3px">
              <span class="sp-label" style="font-size: 10px">Budget</span>
              <div class="sp-slider" style="height: 16px">
                <div class="sp-slider-track" style="--sp-from: 0%; --sp-to: 46%">
                  <div class="sp-slider-fill"></div>
                  <span class="sp-slider-thumb" style="--sp-at: 46%"></span>
                </div>
              </div>
            </div>

            <div class="sp-stack" data-part="fail-u" style="gap: 2px; margin-top: 10px; outline-offset: 3px">
              <span class="sp-label" style="font-size: 10px">MSRP ex. VAT, POA</span>
              <div class="sp-input" style="height: 24px; padding: 4px 8px; font-size: 11px; color: var(--sp-muted)">0.00</div>
            </div>

            <div class="sp-button sp-button--sm" data-part="fail-r"
                 style="display: flex; align-items: center; justify-content: center; height: 26px; margin-top: 12px;
                        font-size: 11.5px; outline-offset: 3px">Submit</div>
          </div>

          <div class="sp-surface" data-part="card" data-mode="perceivable" data-subject
               style="flex: 1 1 auto; min-width: 0; height: 188px; padding: 10px">
            <div class="sp-row" style="gap: 8px; height: 24px">
              <span data-part="letter"
                    style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto;
                           width: 22px; height: 22px; border-radius: 50%; background: var(--sp-accent);
                           color: var(--sp-accent-ink); font-size: 12px; font-weight: 600">P</span>
              <span class="sp-heading" data-part="name" style="flex: 1 1 auto; min-width: 0; font-size: 13px">Perceivable</span>
            </div>
            <div class="sp-label" data-part="criterion" style="height: 14px; font-size: 10px; white-space: nowrap">${r.perceivable.criterion}</div>
            <p class="sp-text" data-stage-verdict data-part="why" style="margin: 6px 0 0; height: 68px; font-size: 10.5px; line-height: 1.35">${r.perceivable.why}</p>
            <div class="sp-divider" style="margin: 6px 0 0"></div>
            <div class="sp-row" style="gap: 6px; height: 32px">
              <span style="display: flex; flex: 0 0 auto; color: var(--sp-accent)">${n(`search`)}</span>
              <span class="sp-text sp-text--ink" data-part="test"
                    style="flex: 1 1 auto; min-width: 0; font-size: 10.5px; line-height: 1.3">${r.perceivable.test}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`card`),s=e(a,`letter`),c=e(a,`name`),l=e(a,`criterion`),u=e(a,`why`),d=e(a,`test`),f=i.map(t=>e(a,r[t].target)),p=e=>{let n=r[e];o.dataset.mode=e,s.textContent=n.letter,c.textContent=n.name,l.textContent=n.criterion,u.textContent=n.why,d.textContent=n.test;for(let[n,r]of f.entries()){let a=i[n]===e;t(r,`data-flagged`,a),r.style.outline=a?`2px solid var(--sp-accent)`:`none`}};e(a,`mode`).addEventListener(`change`,e=>{p(e.detail)}),p(`perceivable`)}export{a as mount};