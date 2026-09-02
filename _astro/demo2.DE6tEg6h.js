import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={header:`banner`,nav:`navigation`,h1:`heading 1`,h2:`heading 2`,button:`button`,ul:`list`,li:`listitem`,footer:`contentinfo`};function n(e){let t=e===`semantic`,n=(e,n,r)=>t?`<${e} ${n}>${r}</${e}>`:`<div ${n}>${r}</div>`,r=n(`nav`,`style="display: flex; gap: 4px"`,[`Beans`,`Cafe`].map(e=>`<span class="sp-nav-item" style="padding: 2px 6px; font-size: 12px">${e}</span>`).join(``)),i=t?`<h2 style="margin: 0; font-size: 13px">Roastery</h2>`:`<div style="font-size: 13px; font-weight: 600">Roastery</div>`,a=t?`<button class="sp-button sp-button--sm" type="button" style="margin-top: 12px">Order</button>`:`<div class="sp-button sp-button--sm" style="display: inline-block; margin-top: 12px">Order</div>`;return`
    ${n(`header`,`class="sp-row sp-row--between"`,`${i}${r}`)}
    <div class="sp-line" style="margin-top: 12px; width: 100%"></div>
    <div class="sp-line" style="margin-top: 6px; width: 68%"></div>
    ${a}
    ${n(`footer`,`class="sp-label" style="display: block; margin-top: 12px"`,`Est. 2019`)}`}function r(e){let n=[],r=0;for(let i of e.querySelectorAll(`*`)){let e=t[i.tagName.toLowerCase()];if(!e){r+=1;continue}n.includes(e)||n.push(e)}return{roles:n,generic:r}}function i(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row" style="align-items: stretch; gap: 12px">
          <div class="sp-stack sp-grow" style="gap: 6px">
            <span class="sp-label sp-context">Real elements</span>
            <div class="sp-surface" data-part="semantic" data-subject style="padding: 10px"></div>
          </div>
          <div class="sp-stack sp-grow sp-context" style="gap: 6px">
            <span class="sp-label">Div soup</span>
            <div class="sp-surface" data-part="soup" style="padding: 10px"></div>
          </div>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 14px; padding: 10px 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Roles a screen reader finds</span>
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="Markup" data-part="segmented" data-value="semantic">
              <button class="sp-segment" data-part="seg-semantic" value="semantic">Real</button>
              <button class="sp-segment" data-part="seg-soup" value="soup">Divs</button>
            </sp-segmented>
          </div>
          <div class="sp-row sp-row--wrap" data-part="roles" data-state="semantic" style="margin-top: 8px; height: 54px; align-items: flex-start"></div>
        </div>
      </div>
    </div>
  `;let i=e(t,`semantic`),a=e(t,`soup`),o=e(t,`roles`);i.innerHTML=n(`semantic`),a.innerHTML=n(`soup`);let s=e=>{let t=r(e===`semantic`?i:a);o.dataset.state=e,o.innerHTML=t.roles.length>0?t.roles.map(e=>`<span class="sp-chip" data-part="role-chip">${e}</span>`).join(``):`<span class="sp-text" data-part="none">Nothing to report: ${t.generic} generic boxes, one of which takes clicks.</span>`};s(`semantic`),e(t,`segmented`).addEventListener(`change`,e=>{s(e.detail)})}export{i as mount};