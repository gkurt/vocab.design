import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`indigo`,hex:`#3d4fc4`,name:`Indigo`},{key:`sky`,hex:`#2f80ed`,name:`Sky`},{key:`teal`,hex:`#1f8f74`,name:`Teal`},{key:`moss`,hex:`#4f9c3a`,name:`Moss`},{key:`amber`,hex:`#e0a020`,name:`Amber`},{key:`ember`,hex:`#d9480f`,name:`Ember`},{key:`rose`,hex:`#d63a70`,name:`Rose`},{key:`plum`,hex:`#7c3aed`,name:`Plum`},{key:`slate`,hex:`#5d6577`,name:`Slate`},{key:`ink`,hex:`#1f2933`,name:`Ink`}],i=`indigo`;function a(a){let o=r.find(e=>e.key===i)??r[0];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 424px; height: 276px">
        <div class="sp-topbar" style="padding: 8px 12px; overflow: visible">
          <span class="sp-label sp-context" style="font-size: 11px">Fill</span>

          <span style="position: relative; display: flex; flex: 0 0 auto">
            <button
              type="button"
              data-part="well"
              data-subject
              data-aim
              data-color="${i}"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-label="Fill colour"
              style="width: 28px; height: 28px; padding: 0; border: 1px solid rgb(16 24 40 / 0.22); border-radius: 6px;
                     background: ${o?.hex}; cursor: pointer"
            ></button>

            <div
              class="sp-popover"
              data-part="panel"
              role="dialog"
              aria-label="Fill colour"
              style="left: -8px; top: calc(100% + 9px); --sp-arrow-x: 14px; padding: 10px"
            >
              <span class="sp-label sp-context" style="display: block; font-size: 11px">Palette</span>
              <div class="sp-grid" style="grid-template-columns: repeat(5, 26px); gap: 6px; margin-top: 7px">
                ${r.map(({key:e,hex:t,name:n})=>`
    <button
      type="button"
      data-part="sw-${e}"
      data-color="${e}"
      aria-label="${n}"
      style="width: 26px; height: 26px; padding: 0; border: 1px solid rgb(16 24 40 / 0.18); border-radius: 5px;
             background: ${t}; cursor: pointer"
    ></button>`).join(``)}
              </div>
            </div>
          </span>

          <span class="sp-label sp-context" data-part="value" style="flex: 0 0 auto; width: 62px; font-size: 11px">${o?.name}</span>

          <span class="sp-grow"></span>

          <span class="sp-row sp-context" style="gap: 2px; flex: 0 0 auto">
            <span class="sp-icon-button" aria-hidden="true">${n(`pencil`)}</span>
            <span class="sp-icon-button" aria-hidden="true">${n(`sliders`)}</span>
          </span>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div class="sp-surface" data-part="artboard" style="display: flex; align-items: center; justify-content: center; width: 300px; height: 132px">
            <span
              data-part="shape"
              data-color="${i}"
              style="width: 132px; height: 76px; border-radius: 10px; background: ${o?.hex}; transition: background-color 0.16s"
            ></span>
          </div>
          <span class="sp-label" data-stage-verdict data-part="caption" style="font-size: 11px">The well is showing the shape's fill</span>
        </div>
      </div>
    </div>
  `;let s=e(a,`well`),c=e(a,`panel`),l=e(a,`shape`),u=e(a,`value`),d=e=>{t(c,`data-open`,e),t(s,`data-open`,e),s.setAttribute(`aria-expanded`,String(e))},f=e=>{let t=r.find(t=>t.key===e);t&&(s.dataset.color=t.key,s.style.background=t.hex,l.dataset.color=t.key,l.style.background=t.hex,u.textContent=t.name,d(!1))};s.addEventListener(`click`,()=>d(!0));for(let t of r)e(a,`sw-${t.key}`).addEventListener(`click`,()=>f(t.key));a.addEventListener(`pointerdown`,e=>{let t=e.target;!c.contains(t)&&!s.contains(t)&&d(!1)}),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&d(!1)})}export{a as mount};