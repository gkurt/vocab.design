import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{id:`standard`,label:`Standard`,note:`Three to five working days`,price:`Free`},{id:`express`,label:`Express`,note:`Next working day by 6pm`,price:`£4.95`},{id:`collect`,label:`Collect in store`,note:`Ready from Tuesday morning`,price:`Free`}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 298px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div
            class="sp-surface"
            role="radiogroup"
            aria-labelledby="rg-legend"
            data-part="group"
            data-subject
            style="padding: 10px 10px 8px"
          >
            <span class="sp-label" id="rg-legend" data-part="legend" style="display: block; padding: 0 8px 4px">Delivery speed</span>
            <div class="sp-stack" style="gap: 2px">${n.map((e,t)=>`
    <button
      class="sp-row"
      type="button"
      role="radio"
      data-part="opt-${e.id}"
      aria-checked="${t===0}"
      tabindex="${t===0?0:-1}"
      style="width: 100%; gap: 10px; padding: 6px 8px; border: 0; border-radius: 6px; background: transparent; font: inherit; color: inherit; text-align: left; cursor: pointer"
    >
      <span
        data-part="dot-${e.id}"
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px; border: 1px solid var(--sp-line); border-radius: 50%; background: var(--sp-surface)"
      ><span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent); opacity: 0"></span></span>
      <span class="sp-grow" style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
        <span class="sp-text sp-text--ink" style="font-size: 13px">${e.label}</span>
        <span class="sp-text" style="font-size: 12px">${e.note}</span>
      </span>
      <span class="sp-text" style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">${e.price}</span>
    </button>`).join(``)}</div>
          </div>
          <p class="sp-text sp-context" data-part="summary" style="margin: auto 0 0 2px; font-size: 12px; white-space: nowrap">
            Chosen: Standard.
          </p>
        </div>
      </div>
    </div>
  `;let i=n.map(t=>e(r,`opt-${t.id}`)),a=n.map(t=>e(r,`dot-${t.id}`)),o=e(r,`summary`),s=e(r,`group`),c=0,l=()=>{for(let[e,n]of i.entries()){let r=e===c;n.setAttribute(`aria-checked`,String(r)),n.tabIndex=r?0:-1,n.style.background=r?`var(--sp-accent-soft)`:`transparent`;let i=a[e];if(!i)continue;i.style.borderColor=r?`var(--sp-accent)`:`var(--sp-line)`;let o=i.firstElementChild;o instanceof HTMLElement&&(o.style.opacity=r?`1`:`0`),t(n,`data-selected`,r)}o.textContent=`Chosen: ${n[c]?.label}.`},u=(e,t)=>{c=(c+e+n.length)%n.length,l(),t&&i[c]?.focus({preventScroll:!0})};s.addEventListener(`keydown`,e=>{let t=e.key===`ArrowDown`||e.key===`ArrowRight`,n=e.key===`ArrowUp`||e.key===`ArrowLeft`;!t&&!n||(e.preventDefault(),u(t?1:-1,e.isTrusted))});for(let[e,t]of i.entries())t.addEventListener(`click`,()=>{c=e,l()});l()}export{r as mount};