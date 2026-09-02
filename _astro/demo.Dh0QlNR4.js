import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[`W1`,`W2`,`W3`,`W4`,`W5`,`W6`],r=[210,198,176,152,141,130],i=210,a=30,o={none:`“Image.” Nothing else.`,alt:`“Bar chart, image.”`,full:`“Tickets fell 38 percent after March. Table follows.”`},s={none:`An empty alternative claims the figure is decorative. Six numbers say otherwise, and all six are gone.`,alt:`Naming the chart type describes the picture. Nothing here says which way it went, and no value was read out.`,full:`The takeaway in one line, then the values as a real table. Sighted readers use the table too, which is the point.`};function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 9px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Reader gets" data-term="full" data-part="given" data-value="full">
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Nothing</button>
            <button class="sp-segment" type="button" data-part="seg-alt" value="alt"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Alt text</button>
            <button class="sp-segment" type="button" data-part="seg-full" value="full"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Summary and table</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="chart"
             style="margin-top: 7px; height: 64px; padding: 4px 10px; display: flex; flex-direction: column; gap: 1px;
                    background: var(--sp-sunken)">
          <span class="sp-label" style="font-size: 9px; line-height: 1.2">Support tickets a week</span>
          <div class="sp-row" style="flex: 1 1 auto; align-items: flex-end; gap: 8px">${n.map((e,t)=>`
      <div style="flex: 1 1 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 2px">
        <span data-part="bar-${t+1}" style="width: 100%; max-width: 24px; height: ${Math.round((r[t]??0)/i*a)}px;
                     border-radius: 2px 2px 0 0; background: var(--sp-accent)"></span>
        <span class="sp-label" style="font-size: 9px; line-height: 1.1">${e}</span>
      </div>`).join(``)}</div>
        </div>

        <div class="sp-surface" data-part="description" data-subject data-mode="full" data-pose="[data-mode=full]"
             style="margin-top: 7px; height: 122px; padding: 8px 10px">
          <span class="sp-text" data-part="pane-none" hidden style="display: block; font-size: 11.5px; line-height: 1.4">
            No text alternative. The figure is announced as an image, and the six values behind it are
            not reachable in any form.
          </span>
          <span class="sp-text" data-part="pane-alt" hidden style="display: block; font-size: 11.5px; line-height: 1.4">
            <code style="font-size: 11px">alt="Bar chart"</code> names the chart type and nothing about
            the data: no direction, no size of the change, not one number.
          </span>
          <div data-part="pane-full" style="display: flex; flex-direction: column; gap: 5px">
            <span class="sp-text sp-text--ink" data-part="summary" style="font-size: 11.5px; line-height: 1.35">
              Support tickets fell 38 percent after the March release, from 210 a week to 130.
            </span>
            <div class="sp-row" data-part="values-shut" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="show-values"
                      style="font-size: 11px; padding: 3px 9px">Show the 6 values</button>
            </div>
            <div data-part="values-open" hidden style="display: flex; flex-direction: column; gap: 4px">
              <table class="sp-table" data-part="values-table" style="--sp-cell-pad: 1px 5px; font-size: 10.5px">
                <thead><tr><th scope="col">Week</th>${n.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr></thead>
                <tbody><tr><th scope="row" style="color: var(--sp-ink)">Tickets</th>${r.map(e=>`<td>${e}</td>`).join(``)}</tr></tbody>
              </table>
              <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="hide-values"
                      style="align-self: flex-start; font-size: 11px; padding: 2px 7px; color: var(--sp-muted)">Hide the values</button>
            </div>
          </div>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="announce" data-mode="full"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${o.full}</span>
        

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="full"
           style="margin: 6px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">${s.full}</p>
      </div>
    </div>
  `;let l=e(c,`description`),u={none:e(c,`pane-none`),alt:e(c,`pane-alt`),full:e(c,`pane-full`)},d=e(c,`values-shut`),f=e(c,`values-open`),p=e(c,`announce`),m=e(c,`caption`),h=e=>{t(d,`hidden`,e),t(f,`hidden`,!e)},g=e=>{l.dataset.mode=e;for(let n of[`none`,`alt`,`full`])t(u[n],`hidden`,n!==e);h(!1),p.dataset.mode=e,p.textContent=o[e],m.dataset.mode=e,m.textContent=s[e]};g(`full`),e(c,`show-values`).addEventListener(`click`,()=>h(!0)),e(c,`hide-values`).addEventListener(`click`,()=>h(!1)),e(c,`given`).addEventListener(`change`,e=>{g(e.detail)})}export{c as mount};