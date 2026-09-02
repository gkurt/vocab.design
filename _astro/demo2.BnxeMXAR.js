import{n as e,t}from"./parts.C-YLuC7Q.js";var n=600,r=60,i={idle:`Idle`,waiting:`Waiting ${n} ms`,shown:`Shown`};function a(a,o){let s=(e,t,n)=>`
    <div class="sp-stack${n?``:` sp-context`}" style="gap: 6px; align-items: flex-start">
      <span class="sp-label" style="font-size: 11px">${t}</span>
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="target-${e}">Duplicate</button>
    </div>`;a.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" style="position: relative; width: 380px">
        <span class="sp-heading sp-context" data-stage-verdict data-part="caption">Time before anything moves</span>
        <div class="sp-row" style="gap: 28px; margin-top: 12px">
          ${s(`delayed`,`delay ${n} ms`,!0)}
          ${s(`instant`,`no delay`,!1)}
        </div>

        <!-- Room the labels are drawn into, so nothing below them moves when one arrives. -->
        <div style="height: 36px"></div>

        <div class="sp-stack sp-context" data-part="timeline" data-phase="idle" style="gap: 8px">
          <div style="position: relative; width: 336px; height: 30px">
            <span style="position: absolute; left: 0; right: 0; top: 8px; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
            <span
              data-part="window"
              style="position: absolute; left: 0; top: 4px; width: ${r}%; height: 10px; border-radius: 5px;
                     background: var(--sp-accent-soft); border: 1px solid var(--sp-accent)"
            ></span>
            <span style="position: absolute; left: 0; top: 1px; width: 2px; height: 16px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: ${r}%; top: 1px; width: 2px; height: 16px; background: var(--sp-muted)"></span>
            <span class="sp-label" style="position: absolute; left: 0; top: 19px; font-size: 10px">0 ms · pointer in</span>
            <span class="sp-label" style="position: absolute; left: ${r}%; top: 19px; font-size: 10px">${n} ms · label shown</span>
          </div>
          <span class="sp-label" data-part="phase" style="min-height: 16px; white-space: nowrap">${i.idle}</span>
        </div>

        <span class="sp-tooltip" data-part="tip-delayed" data-subject role="tooltip" id="sp-delay-tip">Duplicate this page</span>
        <span class="sp-tooltip sp-context" data-part="tip-instant" role="tooltip" id="sp-instant-tip">Duplicate this page</span>
      </div>
    </div>
  `;let c=e(a,`timeline`),l=e(a,`phase`),u=e=>{c.dataset.phase=e,l.textContent=i[e]??``},d=(e,t)=>{let n=e.offsetLeft+e.offsetWidth/2,r=Math.max(n-t.offsetWidth/2,0);t.style.left=`${r}px`,t.style.top=`${e.offsetTop+e.offsetHeight+8}px`,t.style.setProperty(`--sp-arrow-x`,`${n-r}px`)},f=(r,i)=>{let s=e(a,`target-${r}`),c=e(a,`tip-${r}`);d(s,c);let l,f=()=>{l=void 0,s.setAttribute(`aria-describedby`,c.id),t(c,`data-open`,!0),i&&u(`shown`)};s.addEventListener(`pointerenter`,()=>{if(!i){f();return}o.clearTimeout(l),u(`waiting`),l=o.setTimeout(f,n)}),s.addEventListener(`pointerleave`,()=>{i&&(o.clearTimeout(l),l=void 0,u(`idle`)),s.removeAttribute(`aria-describedby`),t(c,`data-open`,!1)})};f(`delayed`,!0),f(`instant`,!1)}export{a as mount};