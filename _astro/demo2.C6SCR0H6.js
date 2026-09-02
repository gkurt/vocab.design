import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`card-nested`,side:`nested`,state:`swallowed`,line:`link, “Northern lights tour, 3 nights from £480, Save”`},{key:`save-nested`,side:`nested`,state:`inner`,line:`button, “Save”, still inside that link`},{key:`link-fixed`,side:`fixed`,state:`link`,line:`link, “Northern lights tour”`},{key:`save-fixed`,side:`fixed`,state:`button`,line:`button, “Save”`}],r={nested:`One name for two controls, and the second stop adds nothing a reader can act on.`,fixed:`Two controls, two names, two stops, and the card is still clickable end to end.`},i={hijacked:`Save ran, then the link opened the tour. One press, two actions.`,saved:`Saved. The link never heard the press.`,opened:`Opened the tour.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row" style="gap: 10px; align-items: stretch">
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; min-width: 0">
            <span class="sp-label sp-context">Nested</span>
            <a class="sp-surface" href="#" data-part="card-nested" data-subject
               style="display: block; height: 104px; padding: 10px; color: inherit; text-decoration: none">
              <span class="sp-text sp-text--ink" style="display: block; font-size: 13px; font-weight: 600">Northern lights tour</span>
              <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px">3 nights from £480</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="save-nested"
                      style="margin-top: 10px">Save</button>
            </a>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; min-width: 0">
            <span class="sp-label">Not nested</span>
            <div class="sp-surface" data-part="card-fixed" style="position: relative; height: 104px; padding: 10px">
              <a href="#" data-part="link-fixed" style="font-size: 13px; font-weight: 600; color: inherit; text-decoration: none">
                Northern lights tour
                <span data-part="stretch" style="position: absolute; inset: 0"></span>
              </a>
              <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px">3 nights from £480</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="save-fixed"
                      style="position: relative; z-index: 1; margin-top: 10px">Save</button>
            </div>
          </div>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="announced" data-state="swallowed"
                style="font-size: 11px; white-space: nowrap"></span>
        
        <div class="sp-row sp-row--between sp-context" style="margin-top: 4px; height: 18px">
          <span class="sp-label">One press</span>
          <span class="sp-text sp-text--ink" data-part="result" data-state="none"
                style="font-size: 11px; white-space: nowrap">nothing pressed yet</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="nested"
           style="margin: 8px 0 0; height: 16px; font-size: 11px; white-space: nowrap">${r.nested}</p>
      </div>
    </div>
  `;let o=e(a,`announced`),s=e(a,`result`),c=e(a,`caption`),l=n.map(t=>({stop:t,el:e(a,t.key)})),u=0,d=e=>{c.dataset.case=e,c.textContent=r[e]},f=e=>{u=(e+n.length)%n.length;let r=n[u];if(r){for(let{stop:e,el:n}of l)t(n,`data-sim-focus`,e.key===r.key);o.dataset.state=r.state,o.textContent=r.line,d(r.side)}},p=e=>{s.dataset.state=e,s.textContent=i[e],d(e===`hijacked`?`nested`:`fixed`)};f(0),e(a,`card-nested`).addEventListener(`click`,e=>{e.preventDefault(),p(`hijacked`)}),e(a,`link-fixed`).addEventListener(`click`,e=>{e.preventDefault(),p(`opened`)}),e(a,`save-fixed`).addEventListener(`click`,e=>{e.stopPropagation(),p(`saved`)}),a.addEventListener(`keydown`,e=>{e.key===`Tab`&&f(u+1)})}export{a as mount};