import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`ui-monospace, monospace`,r=[46,40,28],i=[r[0],r[0]+r[1]],a=[{title:`Day berth`,body:[100,78]},{title:`Harbour mooring, winter rate`,body:[100,92,64]},{title:`Tender space`,body:[96,88,70]}],o=(e,t)=>`<div style="display: flex; flex-direction: column; justify-content: flex-start; gap: 5px; min-height: 0; padding: ${e}">${t}</div>`;function s(s){let c=(e,t)=>{let n=a[e];return n?`
      <div
        data-part="card-${e}"
        ${t}
        data-subgrid
        style="display: grid; grid-template-rows: subgrid; grid-column: ${e+1}; grid-row: 1 / span 3; background: var(--sp-surface); border-radius: 8px; outline: 1px solid var(--sp-line); outline-offset: -1px; overflow: hidden"
      >
        ${o(`8px 10px 4px`,`<span style="font-size: 12.5px; font-weight: 600; line-height: 1.25">${n.title}</span>`)}
        ${o(`2px 10px`,n.body.map(e=>`<span class="sp-line" style="width: ${e}%; height: 6px"></span>`).join(``))}
        ${o(`0 10px 8px`,`<span class="sp-row" style="gap: 6px"><span class="sp-heading" style="font-size: 13px">£24</span><span class="sp-label">per night</span></span>`)}
      </div>`:``};s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Card rows" data-term="subgrid" data-part="switcher" data-value="subgrid">
            <button class="sp-segment" type="button" data-part="seg-subgrid" value="subgrid">subgrid</button>
            <button class="sp-segment" type="button" data-part="seg-own" value="own">its own rows</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 12px">
          <div
            data-part="row"
            style="position: relative; flex: 0 0 auto; display: grid; width: 446px; grid-template-columns: repeat(3, 1fr); grid-template-rows: ${r.map(e=>`${e}px`).join(` `)}; column-gap: 10px; row-gap: 0"
          >
            ${c(0,`data-subject data-pose="[data-subgrid]"`)}
            ${c(1,``)}
            ${c(2,``)}
            <div class="sp-context" data-part="guides" style="position: absolute; inset: 0; pointer-events: none">
              ${i.map(e=>`<span style="position: absolute; left: 0; right: 0; top: ${e}px; border-top: 1px dashed var(--sp-accent)"></span>`).join(``)}
            </div>
          </div>
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 26px">
            <span class="sp-label">card</span>
            <span
              data-part="chip"
              style="display: inline-flex; align-items: center; justify-content: center; width: 250px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-surface); font-family: ${n}; font-size: 11.5px"
            ></span>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let l=[e(s,`card-0`),e(s,`card-1`),e(s,`card-2`)],u=e(s,`chip`),d=e(s,`readout`),f=e=>{let n=e===`subgrid`;for(let e of l)t(e,`data-subgrid`,n),e.style.display=n?`grid`:`flex`,e.style.gridTemplateRows=n?`subgrid`:``,e.style.flexDirection=n?``:`column`;u.textContent=n?`grid-template-rows: subgrid`:`grid-template-rows: auto auto auto`,d.textContent=n?`Every card is on the parent lines, so the prices line up.`:`Own rows. Each card stacks from its own title and the seams drift.`};e(s,`switcher`).addEventListener(`change`,e=>f(e.detail)),f(`subgrid`)}export{s as mount};