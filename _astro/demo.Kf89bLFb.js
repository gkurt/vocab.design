import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{t as r}from"./motion.B5_YXmsy.js";var i=127;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 168px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="display: flex; gap: 10px; padding: 10px 12px">
            <span class="sp-avatar">RN</span>
            <span class="sp-stack sp-grow" style="gap: 6px; justify-content: center">
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 72%"></span>
            </span>
          </div>
          <div class="sp-row" style="gap: 8px">
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="like"
              data-subject
              data-count="${i}"
              aria-pressed="false"
              style="display: inline-flex; align-items: center; gap: 7px"
            >
              <span data-part="heart" style="display: flex">${n(`heart`)}</span>
              <span data-part="count" data-value="${i}" style="font-variant-numeric: tabular-nums">${i}</span>
            </button>
            <span class="sp-context" style="display: flex">
              <button class="sp-icon-button" type="button" aria-label="Share">${n(`share`)}</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`like`),s=e(a,`heart`),c=s.firstElementChild,l=e(a,`count`),u=!1,d=()=>{r(a)||s.animate([{transform:`scale(1)`},{transform:`scale(1.45)`,offset:.4},{transform:`scale(1)`}],{duration:360,easing:`cubic-bezier(0.3, 0.9, 0.3, 1)`})};o.addEventListener(`click`,()=>{u=!u;let e=i+ +!!u;t(o,`data-liked`,u),o.setAttribute(`aria-pressed`,String(u)),o.dataset.count=String(e),o.style.color=u?`var(--sp-accent)`:``,o.style.borderColor=u?`var(--sp-accent)`:``,c.classList.toggle(`sp-icon--filled`,u),l.dataset.value=String(e),l.textContent=String(e),u&&d()})}export{a as mount};