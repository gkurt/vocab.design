import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{part:`item-heading`,state:`heading`,line:`heading level 2, “Trip planner”`},{part:`item-link`,state:`link`,line:`link, “Change dates”`},{part:`item-insurance`,state:`checkbox`,line:`checkbox, “Add travel insurance”, not checked`},{part:`item-book`,state:`button`,line:`button, “Book trip”`}],r=`checkbox, “Add travel insurance”, checked`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 432px">
        <span class="sp-label sp-context">The page</span>
        <div class="sp-surface sp-context" style="margin-top: 6px; padding: 12px">
          <h2 class="sp-heading" data-part="item-heading" style="margin: 0; font-size: 14px">Trip planner</h2>
          <div style="margin-top: 10px">
            <a href="#" data-part="item-link" style="font-size: 13px; color: var(--sp-accent)">Change dates</a>
          </div>
          <div class="sp-row" style="margin-top: 12px; gap: 10px">
            <button class="sp-checkbox" type="button" data-part="item-insurance" role="checkbox" aria-checked="false"
                    aria-labelledby="vd-sr-insurance"></button>
            <span class="sp-text sp-text--ink" id="vd-sr-insurance">Add travel insurance</span>
          </div>
          <div class="sp-row" style="margin-top: 12px">
            <button class="sp-button sp-button--sm" type="button" data-part="item-book">Book trip</button>
          </div>
        </div>
        <div class="sp-surface" data-part="reader" data-subject style="margin-top: 12px; padding: 8px 10px">
          <span class="sp-label">Speech viewer</span>
          <p class="sp-text sp-text--ink" data-part="voice" data-state="heading"
             style="margin: 4px 0 0; height: 20px; white-space: nowrap; overflow: hidden">${n[0]?.line??``}</p>
        </div>
      </div>
    </div>
  `;let a=e(i,`voice`),o=n.map(t=>e(i,t.part)),s=e(i,`item-insurance`),c=0,l=(e,t)=>{a.dataset.state=e,a.textContent=t},u=e=>{c=Math.max(0,Math.min(e,n.length-1));let i=n[c];if(!i)return;for(let[e,n]of o.entries())t(n,`data-sim-focus`,e===c);let a=s.getAttribute(`aria-checked`)===`true`;l(i.state,i.part===`item-insurance`&&a?r:i.line)};u(0),i.addEventListener(`keydown`,e=>{e.key===`ArrowDown`&&u(c+1),e.key===`ArrowUp`&&u(c-1),e.key===`Enter`&&n[c]?.part===`item-insurance`&&(s.setAttribute(`aria-checked`,`true`),l(`checked`,r))})}export{i as mount};