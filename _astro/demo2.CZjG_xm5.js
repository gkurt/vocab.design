import{n as e}from"./parts.C-YLuC7Q.js";var t=36,n=144,r=108,i=Array.from({length:12},(e,t)=>`m${t+1}`),a=e=>e.startsWith(`o`)?`Older ${e.slice(1)}`:`Message ${e.slice(1)}`,o=e=>`
    <div class="sp-row" data-id="${e}" style="height: ${t}px; padding: 0 10px; border-bottom: 1px solid var(--sp-line); font-size: 12px; white-space: nowrap; overflow: hidden">
      <span class="sp-label" style="width: 38px; flex: 0 0 auto">${e.startsWith(`o`)?`Older`:Number(e.slice(1))%2?`Ada`:`Sam`}</span>
      <span class="sp-grow" style="min-width: 0; overflow: hidden; text-overflow: ellipsis">${a(e)}</span>
    </div>`,s=(e,t,r,a)=>`
  <div class="sp-stack${a?``:` sp-context`}" style="width: 208px; gap: 4px">
    <span class="sp-label" style="color: var(--sp-ink)">${t}</span>
    <div
      class="sp-scroll sp-surface"
      data-part="${e}"
      ${a?`data-subject`:``}
      data-top="m4"
      style="height: ${n}px; overflow-anchor: none; scrollbar-width: none"
    >
      <div data-part="${e}-list" style="overflow-anchor: none">${i.map(o).join(``)}</div>
    </div>
    <span class="sp-label" data-part="${e}-top" style="font-size: 11px">${r}</span>
  </div>`;function c(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Thread</span>
          <span class="sp-text" data-part="readout" style="width: 226px; text-align: right; white-space: nowrap">12 messages</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div class="sp-row" style="gap: 10px; align-items: flex-start">
            ${s(`anchored`,`Anchored`,`Top line: Message 4`,!0)}
            ${s(`loose`,`Not anchored`,`Top line: Message 4`,!1)}
          </div>
          <div class="sp-row sp-context" style="gap: 10px; width: 100%">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="load">Load 2 older</button>
            <span class="sp-label" data-stage-verdict data-part="caption">Both panels receive the same two items, above the view</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(n,`readout`),l=[`anchored`,`loose`].map(t=>({key:t,panel:e(n,t),list:e(n,`${t}-list`),caption:e(n,`${t}-top`),ids:[...i],holds:t===`anchored`})),u=e=>{let n=Math.max(0,Math.min(e.ids.length-1,Math.round(e.panel.scrollTop/t))),r=e.ids[n]??``;e.panel.dataset.top=r,e.caption.textContent=`Top line: ${a(r)}`},d=0;e(n,`load`).addEventListener(`click`,()=>{let e=[`o${d+1}`,`o${d+2}`];d+=2;let n=e.map(o).join(``);for(let r of l)r.list.insertAdjacentHTML(`afterbegin`,n),r.ids.unshift(...e),r.holds&&(r.panel.scrollTop+=e.length*t),u(r);c.textContent=`${i.length+d} messages`});for(let e of l)e.panel.addEventListener(`scroll`,()=>u(e)),e.panel.scrollTop=r,u(e)}export{c as mount};