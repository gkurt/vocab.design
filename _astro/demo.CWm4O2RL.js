import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=116,n=170,r=16,i=76,a=`linear-gradient(#7f96d8, #b9cdea 46%, #3f6a4c 47%, #2b4c37)`,o={none:`No break rules: the boundary lands inside the figure, so half of it prints on page one and half on page two.`,avoid:`break-inside: avoid moves the figure to page two whole. Page one ends early, and that empty space is the price of not cutting it.`,before:`break-before: page on the Fees heading pushes it to page three, so it arrives with the text it introduces instead of closing page two.`},s=(e,t)=>`
  <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 9px; font-size: 11px">
    ${t}
  </button>`,c=e=>`<span class="sp-line" style="flex: 0 0 auto; width: ${e}%; height: 6px"></span>`,l=(e,t)=>`
  <span class="sp-heading" data-part="heading-fees" data-page="${t}" style="flex: 0 0 auto; height: 15px; font-size: 11px; line-height: 15px">
    ${e}
  </span>`,u=()=>`
  <span class="sp-heading" style="flex: 0 0 auto; height: 15px; font-size: 11px; line-height: 15px">Berth transfer</span>`,d=(e,t,n)=>`
  <span
    data-part="${e}"
    style="${t===`grow`?`flex: 1 1 auto; min-height: 0`:`flex: 0 0 auto; height: ${t}px`}; overflow: hidden; border-radius: 2px"
  >
    <span style="display: block; width: 100%; height: ${i}px; margin-top: ${-n}px; background: ${a}"></span>
  </span>`,f=()=>`<span class="sp-line" data-part="fig-caption" style="flex: 0 0 auto; width: 64%; height: 4px"></span>`,p=[92,84,96,73,88,79],m=[90,66],h=[94,82,71,58],g={none:[[u(),...p.map(c),d(`fig-top`,`grow`,0)].join(``),[d(`fig-bottom`,42,34),f(),...m.map(c),l(`Fees`,2)].join(``),h.map(c).join(``)],avoid:[[u(),...p.map(c)].join(``),[d(`fig-whole`,i,0),f(),...m.map(c),l(`Fees`,2)].join(``),h.map(c).join(``)],before:[[u(),...p.map(c)].join(``),[d(`fig-whole`,i,0),f(),...m.map(c)].join(``),[l(`Fees`,3),...h.map(c)].join(``)]},_=e=>`
  <div
    data-part="page-${e}"
    style="display: flex; flex-direction: column; gap: 9px; flex: 0 0 ${t}px; height: ${n}px; padding: 10px;
           overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 3px"
  ></div>`,v=e=>`
  <span
    data-part="seam-${e}"
    style="display: flex; align-items: center; justify-content: center; flex: 0 0 ${r}px; align-self: stretch"
  >
    <span style="width: 2px; height: 100%; background: repeating-linear-gradient(var(--sp-line) 0 4px, transparent 4px 8px)"></span>
  </span>`;function y(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Print preview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="rules" data-value="none" data-axis="Rule">
            ${s(`none`,`no rules`)}${s(`avoid`,`break-inside`)}${s(`before`,`break-before`)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 10px 12px">
          <div data-part="flow" data-subject data-rule="none" style="display: flex; flex: 0 0 auto; height: ${n}px">
            ${_(1)}${v(1)}${_(2)}${v(2)}${_(3)}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let r=e(t,`flow`),i=e(t,`readout`),a=[e(t,`page-1`),e(t,`page-2`),e(t,`page-3`)],c=e=>{let t=g[e],n=o[e];!t||!n||(r.dataset.rule=e,a.forEach((e,n)=>{e.innerHTML=t[n]??``}),i.textContent=n)};e(t,`rules`).addEventListener(`change`,e=>c(e.detail)),c(`none`)}export{y as mount};