import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={none:[],scope:[`h-rev3`,`r-nw`],headers:[`h-q3`,`h-rev3`,`r-nw`]},r={none:`“42”`,scope:`“Revenue, Northwest, 42”`,headers:`“Q3, Revenue, Northwest, 42”`},i={none:`<td>42</td>`,scope:`<th scope="col">Revenue</th> … <td>42</td>`,headers:`<td headers="h-q3 h-rev3 r-nw">42</td>`},a=e=>e.replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`),o={none:`Every header here is a real th and it is still bold and grey and nothing else. A visually obvious header is not an associated one.`,scope:`scope ties each cell to its own column and row. The quarter spanning two columns above is the level scope alone does not reach.`,headers:`id and headers name the headers in the order they should be spoken, which is the only way the spanning quarter comes across.`};function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Written with" data-part="written" data-value="scope">
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Nothing</button>
            <button class="sp-segment" type="button" data-part="seg-scope" value="scope"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">scope</button>
            <button class="sp-segment" type="button" data-part="seg-headers" value="headers"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">id and headers</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 8px; padding: 8px 10px">
          <table class="sp-table" data-part="grid" style="--sp-cell-pad: 4px 9px; font-size: 12px">
            <caption class="sp-visually-hidden">Revenue and units by region</caption>
            <thead>
              <tr>
                <th data-part="h-corner" rowspan="2"></th>
                <th data-part="h-q3" id="h-q3" colspan="2" style="text-align: center">Q3</th>
                <th data-part="h-q4" id="h-q4" colspan="2" style="text-align: center">Q4</th>
              </tr>
              <tr>
                <th data-part="h-rev3" id="h-rev3">Revenue</th>
                <th data-part="h-units3" id="h-units3">Units</th>
                <th data-part="h-rev4" id="h-rev4">Revenue</th>
                <th data-part="h-units4" id="h-units4">Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th data-part="r-nw" id="r-nw">Northwest</th>
                <td data-part="cell" data-subject data-written="scope" data-linked data-pose="[data-linked]"
                    data-sim-focus>42</td>
                <td>610</td>
                <td>51</td>
                <td>705</td>
              </tr>
              <tr>
                <th data-part="r-se" id="r-se">Southeast</th>
                <td>38</td>
                <td>540</td>
                <td>44</td>
                <td>590</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Markup</span>
          <span class="sp-text sp-text--ink" data-part="markup" data-written="scope"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${a(i.scope)}</span>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="says" data-written="scope"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${r.scope}</span>
        

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-written="scope"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${o.scope}</p>
      </div>
    </div>
  `;let c=e(s,`cell`),l=e(s,`markup`),u=e(s,`says`),d=e(s,`caption`),f=[`h-rev3`,`h-units3`,`h-rev4`,`h-units4`].map(t=>e(s,t)),p=[`h-q3`,`h-q4`].map(t=>e(s,t)),m=[`r-nw`,`r-se`].map(t=>e(s,t)),h=[...f,...p,...m],g=a=>{for(let e of h)e.removeAttribute(`scope`),e.style.removeProperty(`background`),e.removeAttribute(`data-tied`);if(c.removeAttribute(`headers`),a===`scope`){for(let e of f)e.setAttribute(`scope`,`col`);for(let e of m)e.setAttribute(`scope`,`row`)}a===`headers`&&c.setAttribute(`headers`,`h-q3 h-rev3 r-nw`);for(let t of n[a]){let n=e(s,t);n.setAttribute(`data-tied`,``),n.style.background=`var(--sp-accent-soft)`}c.dataset.written=a,t(c,`data-linked`,a!==`none`),l.dataset.written=a,l.textContent=i[a],u.dataset.written=a,u.textContent=r[a],d.dataset.written=a,d.textContent=o[a]};g(`scope`),e(s,`written`).addEventListener(`change`,e=>{g(e.detail)})}export{s as mount};