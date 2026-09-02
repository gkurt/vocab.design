import{o as e}from"./touch.Bg97t8LB.js";import{n as t,t as n}from"./parts.C-YLuC7Q.js";import{t as r}from"./icons.CLHbLdSV.js";var i={w:336,h:206},a=160,o=80,s=.4,c=[{key:`mail`,name:`Mail`,glyph:`inbox`,wash:`linear-gradient(160deg, #5b8def, #2f5bd0)`,actions:[`New message`,`Search mail`]},{key:`notes`,name:`Notes`,glyph:`pencil`,wash:`linear-gradient(160deg, #f2b134, #d18e12)`,actions:[`New note`,`New checklist`,`Scan a page`]},{key:`calendar`,name:`Calendar`,glyph:`calendar`,wash:`linear-gradient(160deg, #ef7c5c, #d1492f)`,actions:[`New event`,`Today's agenda`]},{key:`tasks`,name:`Tasks`,glyph:`check`,wash:`linear-gradient(160deg, #4fc3a1, #1f8f74)`,actions:[`Add task`,`Due today`]}];function l(l,u){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home screen</span>
          <span class="sp-label" data-part="readout" data-ran="none" style="font-size: 11px; white-space: nowrap"
            >Nothing launched yet</span
          >
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 9px 12px">
          <div
            data-part="screen"
            data-touch
            data-menu="closed"
            style="position: relative; width: ${i.w}px; height: ${i.h}px; border-radius: 14px; overflow: hidden;
                   background: linear-gradient(158deg, #33406a 0%, #4d5f96 52%, #8171ad 100%)"
          >
            <div
              class="sp-row"
              style="position: absolute; left: 10px; right: 10px; bottom: 12px; justify-content: space-around; gap: 0"
            >
              ${c.map(e=>`
    <button
      type="button"
      data-part="icon-${e.key}"
      aria-label="${e.name}"
      style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 0 0 auto; width: 56px; padding: 0; border: 0;
             background: transparent; touch-action: none; cursor: pointer"
    >
      <span
        style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px;
               background: ${e.wash}; color: #ffffff; box-shadow: 0 2px 7px rgb(16 24 40 / 0.32)"
      >${r(e.glyph)}</span>
      <span style="color: #ffffff; font-size: 11px; text-shadow: 0 1px 2px rgb(16 24 40 / 0.5)">${e.name}</span>
    </button>`).join(``)}
            </div>

            <div
              class="sp-menu"
              data-part="menu"
              data-subject
              data-app="notes"
              role="menu"
              style="left: 48px; bottom: ${o}px; width: ${a}px; transform-origin: bottom left"
            >
              <span class="sp-label" data-part="menu-app" style="display: block; padding: 1px 8px 4px; font-size: 11px">Notes</span>
              <div class="sp-stack" data-part="menu-items" style="gap: 0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let d=t(l,`screen`),f=t(l,`menu`),p=t(l,`menu-app`),m=t(l,`menu-items`),h=t(l,`readout`),g=new Map;for(let e of c){let n=t(l,`icon-${e.key}`),r=n.offsetLeft+n.offsetWidth/2;g.set(e.key,Math.round(Math.min(Math.max(r-a/2,8),i.w-a-8)))}let _=()=>{n(f,`data-open`,!1),d.dataset.menu=`closed`},v=e=>{f.dataset.app=e.key,p.textContent=e.name,f.style.left=`${g.get(e.key)??8}px`,m.innerHTML=e.actions.map((e,t)=>`
          <button class="sp-menu-item" type="button" role="menuitem" data-part="item-${t+1}" style="padding: 5px 8px; font-size: 12px; white-space: nowrap"
            >${e}</button>`).join(``);for(let[n,r]of e.actions.entries())t(l,`item-${n+1}`).addEventListener(`click`,()=>{_(),h.dataset.ran=`${e.key}-${n+1}`,h.textContent=`${r}, opened from the ${e.name} icon`});n(f,`data-open`,!0),d.dataset.menu=`open`};for(let n of c)e(t(l,`icon-${n.key}`),u,{onForce:e=>{e<s||f.dataset.app===n.key&&f.hasAttribute(`data-open`)||v(n)},onEnd:()=>{}});_()}export{l as mount};