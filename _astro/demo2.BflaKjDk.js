import{n as e,t}from"./parts.C-YLuC7Q.js";var n=2,r=`transform 0.26s var(--sp-ease)`,i=`
  <div style="position: absolute; inset: 0; background: linear-gradient(#9fc7e8, #dfeaf2 62%, #cfd9c9)"></div>
  <div style="position: absolute; left: 22%; top: 18%; width: 34px; height: 34px; border-radius: 50%; background: #f6d27a"></div>
  <div style="position: absolute; left: -12%; bottom: 26%; width: 62%; height: 44%; border-radius: 50% 50% 0 0; background: #7d94a3"></div>
  <div style="position: absolute; right: -6%; bottom: 26%; width: 54%; height: 32%; border-radius: 50% 50% 0 0; background: #61798a"></div>
  <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 26%; background: #4d6a7c"></div>
  <div style="position: absolute; left: 30%; bottom: 12%; width: 26px; height: 8px; border-radius: 3px; background: #2f4657"></div>
`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 244px; height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour</span>
          <span class="sp-label" data-part="readout">Fit</span>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="tile"
            data-subject
            role="button"
            tabindex="0"
            style="position: relative; overflow: hidden; width: 196px; height: 148px; user-select: none"
          >
            <div
              data-part="photo"
              data-zoom="1"
              style="position: absolute; inset: 0; transform: scale(1); transform-origin: 50% 50%; transition: ${r}"
            >${i}</div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Fit to frame</button>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`tile`),s=e(a,`photo`),c=e(a,`readout`),l=e=>{c.textContent=e};o.addEventListener(`click`,()=>{t(o,`data-selected`,!0),o.style.borderColor=`var(--sp-accent)`,o.style.boxShadow=`0 0 0 2px var(--sp-accent-soft)`,s.dataset.zoom===`1`&&l(`Selected`)}),o.addEventListener(`dblclick`,e=>{let t=o.getBoundingClientRect(),r=(e.clientX-t.left)/t.width*100,i=(e.clientY-t.top)/t.height*100;s.style.transformOrigin=`${r.toFixed(1)}% ${i.toFixed(1)}%`,s.style.transform=`scale(${n})`,s.dataset.zoom=String(n),l(`Zoomed ${n}x`)}),e(a,`reset`).addEventListener(`click`,()=>{s.style.transform=`scale(1)`,s.dataset.zoom=`1`,l(o.hasAttribute(`data-selected`)?`Selected`:`Fit`)})}export{a as mount};