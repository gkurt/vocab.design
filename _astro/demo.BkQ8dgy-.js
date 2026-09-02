import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`basic`,name:`Basic`,price:`$0`,note:`1 project, 2 editors`},{key:`standard`,name:`Standard`,price:`$12`,note:`10 projects, 8 editors`},{key:`pro`,name:`Pro`,price:`$28`,note:`Unlimited, audit log`}],n=`standard`,r=132;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Choose a plan</span>
          <span class="sp-label" data-part="readout" data-plan="${n}" style="font-size: 11px; white-space: nowrap">Standard selected</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; padding: 14px">
          <div
            class="sp-row"
            data-part="group"
            role="radiogroup"
            aria-label="Plan"
            style="gap: 10px; width: 100%; align-items: stretch"
          >${t.map(({key:e,name:t,price:i,note:a})=>`
    <button
      type="button"
      role="radio"
      aria-checked="${e===n}"
      data-part="card-${e}"
      data-plan="${e}"
      ${e===n?`data-subject`:``}
      style="display: flex; flex-direction: column; align-items: stretch; gap: 6px; flex: 1 1 0; min-width: 0; height: ${r}px;
             padding: 11px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-surface);
             color: inherit; font: inherit; text-align: left; cursor: pointer"
    >
      <span class="sp-row sp-row--between" style="gap: 8px">
        <span class="sp-heading" style="font-size: 13px; white-space: nowrap">${t}</span>
        <span
          data-part="dot-${e}"
          aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 15px; height: 15px;
                 border: 1px solid var(--sp-line); border-radius: 50%; background: var(--sp-surface)"
        ><span
            data-part="fill-${e}"
            style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.14s"
          ></span></span>
      </span>
      <span class="sp-heading" style="font-size: 20px; line-height: 1.1">${i}</span>
      <span class="sp-text" style="font-size: 11.5px; line-height: 1.35">${a}</span>
      <span class="sp-grow"></span>
      <span class="sp-label" data-part="hint-${e}" style="font-size: 10.5px">per editor, monthly</span>
    </button>`).join(``)}</div>
        </div>
      </div>
    </div>
  `;let a=e(i,`readout`),o=t.map(t=>e(i,`card-${t.key}`)),s=n=>{let r=t.find(e=>e.key===n);if(r){for(let t of o){let r=t.dataset.plan===n;t.setAttribute(`aria-checked`,String(r)),t.style.boxShadow=r?`inset 0 0 0 2px var(--sp-accent)`:`none`,t.style.background=r?`var(--sp-accent-soft)`:`var(--sp-surface)`;let a=e(i,`fill-${t.dataset.plan}`);a.style.opacity=r?`1`:`0`;let o=e(i,`dot-${t.dataset.plan}`);o.style.borderColor=r?`var(--sp-accent)`:`var(--sp-line)`}a.dataset.plan=n,a.textContent=`${r.name} selected`}};for(let e of o)e.addEventListener(`click`,()=>s(e.dataset.plan??n));s(n)}export{i as mount};