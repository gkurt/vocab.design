import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{i as r,n as i}from"./measure.DK7AY2_i.js";var a=[`View profile`,`Send message`,`Mute updates`,`Remove from team`],o=32;function s(s){let c=a.map(e=>`<button class="sp-menu-item" role="menuitem">${e}</button>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-surface" style="width: 330px; padding: 14px 16px">
        <div class="sp-row" style="gap: 10px">
          <span class="sp-avatar sp-context">RK</span>
          <span class="sp-stack sp-grow sp-context" style="gap: 2px">
            <span class="sp-heading" data-part="who" style="font-size: 14px">Riya Kapoor</span>
            <span class="sp-label">Design engineer</span>
          </span>
          <span data-part="anchor" style="position: relative; flex: 0 0 auto">
            <button
              class="sp-icon-button"
              data-part="trigger"
              data-subject
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="More actions"
            >${n(`meatball`,`sp-icon--dots`)}</button>
            <div class="sp-menu" data-part="menu" role="menu" aria-label="More actions" style="top: ${o}px; right: 0; min-width: 164px">
              ${c}
            </div>
          </span>
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0"></div>
        <div class="sp-stack sp-context" data-part="body" style="gap: 8px">
          <span class="sp-line" style="width: 78%"></span>
          <span class="sp-line" style="width: 54%"></span>
        </div>
      </div>
      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 400px; text-align: center; margin: 0">
        Same menu either way: skewered dots make it a kebab, dots lying flat make it a meatball.
      </p>
    </div>
  `;let l=e(s,`trigger`),u=e(s,`menu`),d=e(s,`anchor`),f=e(s,`body`),p=u.offsetHeight,m=i(d,f).top+o+p,h=p>0?Math.ceil(m-r(f).height):0;h>0&&(f.style.paddingBottom=`${h}px`);let g=e=>{t(u,`data-open`,e),t(l,`data-open`,e),l.setAttribute(`aria-expanded`,String(e))};l.addEventListener(`click`,()=>g(!0));for(let e of u.querySelectorAll(`.sp-menu-item`))e.addEventListener(`click`,()=>g(!1));s.addEventListener(`keydown`,e=>{e.key===`Escape`&&g(!1)}),s.addEventListener(`pointerdown`,e=>{let t=e.target;!u.contains(t)&&!l.contains(t)&&g(!1)})}export{s as mount};