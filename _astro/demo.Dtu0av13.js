import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{i as n}from"./measure.DK7AY2_i.js";var r=420,i=`
  <span class="sp-text sp-text--ink" style="font-size: 12px">Ships in two days, tracked</span>
  <span class="sp-line" style="width: 82%"></span>
  <span class="sp-line" style="width: 64%"></span>`;function a(a){let o=(e,t)=>`
    <div style="height: 72px">
      <div
        data-part="${e}"
        ${t?`data-subject`:``}
        data-state="expanded"
        style="overflow: hidden; height: auto"
      >
        <div class="sp-stack" style="gap: 6px; padding: 8px 10px; border-radius: 6px; background: var(--sp-accent-soft)">
          ${i}
        </div>
      </div>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <button
          class="sp-button sp-button--ghost sp-row sp-context"
          type="button"
          data-part="trigger"
          aria-expanded="true"
          style="width: 100%; gap: 8px; justify-content: flex-start"
        >
          ${t(`chevronRight`,`sp-icon--chevron`)}
          <span class="sp-grow" style="text-align: left">Shipping details</span>
        </button>

        <div class="sp-stack" style="gap: 4px; margin-top: 12px">
          ${o(`panel`,!0)}
        </div>

        <div class="sp-stack sp-context" style="gap: 4px; margin-top: 14px">
          ${o(`twin`,!1)}
        </div>
      </div>
    </div>
  `;let s=e(a,`panel`),c=e(a,`twin`),l=e(a,`trigger`),u=Math.round(n(s).height),d=e=>{s.style.height=e?`${u}px`:`0px`,c.style.height=e?`auto`:`0px`;for(let t of[s,c])t.dataset.state=e?`expanded`:`collapsed`;l.setAttribute(`aria-expanded`,String(e))};d(!1),s.offsetHeight,s.style.transition=`height ${r}ms var(--sp-ease)`,c.style.transition=`height ${r}ms var(--sp-ease)`,l.addEventListener(`click`,()=>d(s.dataset.state!==`expanded`))}export{a as mount};