import{n as e}from"./parts.C-YLuC7Q.js";var t=[{id:`one`,initials:`SP`,title:`Sprint notes`,meta:`Edited 2h ago`},{id:`two`,initials:`RM`,title:`Roadmap`,meta:`Edited yesterday`},{id:`three`,initials:`RT`,title:`Retro`,meta:`Edited Monday`}],n=`two`,r=`0 1px 2px rgb(16 24 40 / 0.09)`;function i(i){i.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-stack" style="gap: 10px">
        <span class="sp-label sp-context" data-stage-verdict data-part="caption">Recently opened</span>
        <div class="sp-row" style="gap: 12px; padding: 8px 0">${t.map(({id:e,initials:t,title:i,meta:a})=>`
      <article
        class="sp-surface sp-stack${e===n?``:` sp-context`}"
        data-part="card-${e}"
        data-hover-driven
        ${e===n?`data-subject`:``}
        style="width: 108px; gap: 8px; padding: 12px; box-shadow: ${r}; translate: 0 0; transition: translate 0.18s var(--sp-ease), box-shadow 0.22s var(--sp-ease)"
      >
        <span class="sp-avatar">${t}</span>
        <span class="sp-heading" style="font-size: 13px">${i}</span>
        <span class="sp-label">${a}</span>
      </article>`).join(``)}</div>
      </div>
    </div>
  `;for(let{id:n}of t){let t=e(i,`card-${n}`),a=e=>{t.toggleAttribute(`data-lifted`,e),t.style.translate=e?`0 -6px`:`0 0`,t.style.boxShadow=e?`var(--sp-shadow)`:r};t.addEventListener(`pointerenter`,()=>a(!0)),t.addEventListener(`pointerleave`,()=>a(!1))}}export{i as mount};