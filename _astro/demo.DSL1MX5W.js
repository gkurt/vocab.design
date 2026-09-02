import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`heading`,role:`heading`,name:`Notifications`,state:`level 2`,target:`ui-heading`},{key:`checkbox`,role:`checkbox`,name:`Email digest`,state:`not checked`,target:`ui-checkbox`},{key:`button`,role:`button`,name:`Save changes`,state:``,target:`ui-save`}],r=`checked`,i=`2px dashed var(--sp-accent)`;function a({key:e,role:t,name:n,state:r,target:i}){return`
    <button class="sp-menu-item" type="button" data-part="node-${e}" data-target="${i}"
            data-state="${e===`checkbox`?`unchecked`:e}" style="padding-left: 18px; gap: 6px">
      <span style="color: var(--sp-accent); font-weight: 600">${t}</span>
      <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">“${n}”</span>
      <span class="sp-text" data-part="state-${e}"
            style="flex: 0 0 auto; width: 66px; text-align: right; font-size: 11px">${r}</span>
    </button>`}function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-row" style="align-items: stretch; gap: 14px">
        <div class="sp-window sp-context" style="width: 206px; padding: 12px 14px">
          <span class="sp-label">The page</span>
          <h2 class="sp-heading" data-part="ui-heading" style="margin: 8px 0 0; font-size: 14px">Notifications</h2>
          <div class="sp-row" style="margin-top: 12px; gap: 10px">
            <button class="sp-checkbox" type="button" data-part="ui-checkbox" role="checkbox" aria-checked="false"
                    aria-labelledby="vd-at-digest"></button>
            <span class="sp-text sp-text--ink" id="vd-at-digest" style="font-size: 13px">Email digest</span>
          </div>
          <div class="sp-row" style="margin-top: 14px">
            <button class="sp-button sp-button--sm" type="button" data-part="ui-save">Save changes</button>
          </div>
        </div>
        <div class="sp-window" data-part="tree" data-subject style="width: 268px; padding: 12px 14px">
          <span class="sp-label">Accessibility tree</span>
          <div class="sp-stack" style="margin-top: 8px; gap: 2px">
            <div class="sp-text sp-text--ink" style="padding: 6px 8px; font-size: 13px; font-weight: 600">document</div>
            ${n.map(a).join(``)}
          </div>
          <p class="sp-text" data-stage-verdict data-part="hint" style="margin: 10px 0 0; height: 32px; font-size: 11px">
            Role, name, state. Pick a node to see the element it came from.
          </p>
        </div>
      </div>
    </div>
  `;let s=e(o,`ui-checkbox`),c=e(o,`state-checkbox`),l=n.map(t=>e(o,`node-${t.key}`)),u=r=>{for(let a of n){let n=e(o,a.target),s=a.target===r;t(n,`data-linked`,s),n.style.outline=s?i:``,n.style.outlineOffset=s?`3px`:``}for(let e of l)t(e,`data-active`,e.dataset.target===r)};for(let e of l)e.addEventListener(`click`,()=>u(e.dataset.target??``));s.addEventListener(`click`,()=>{s.setAttribute(`aria-checked`,`true`),c.textContent=r,e(o,`node-checkbox`).dataset.state=`checked`})}export{o as mount};