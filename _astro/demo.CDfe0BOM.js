import{n as e,t}from"./parts.C-YLuC7Q.js";import{n}from"./measure.DK7AY2_i.js";var r=10,i=1.5,a=[{title:`Approaches`,widths:[96,88,92,74]},{title:`Moorings`,widths:[90,96,82,88,61]},{title:`Tides and streams`,widths:[94,86,90,70]},{title:`Ashore`,widths:[92,84,96,66]}];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Pilot notes</span>
          <span class="sp-label">4 sections</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto">
          <div style="display: flex; gap: 14px; padding: 14px">
            <div class="sp-stack sp-context sp-grow" data-part="article" style="gap: 16px">${a.map(({title:e,widths:t})=>`
      <div class="sp-stack" style="gap: 8px">
        <span class="sp-heading">${e}</span>
        ${t.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``)}
      </div>`).join(``)}</div>
            <aside data-part="rail" style="flex: 0 0 132px">
              <div
                class="sp-surface"
                data-part="card"
                data-subject
                style="position: sticky; top: ${r}px; padding: 10px; display: flex; flex-direction: column; gap: 6px"
              >
                <span class="sp-label">On this page</span>
                <ul class="sp-nav">
                  <li><span class="sp-nav-item" data-current>Approaches</span></li>
                  <li><span class="sp-nav-item">Moorings</span></li>
                  <li><span class="sp-nav-item">Tides</span></li>
                  <li><span class="sp-nav-item">Ashore</span></li>
                </ul>
              </div>
            </aside>
          </div>
          <div class="sp-context" data-part="tail" style="height: 130px; margin: 0 14px 14px; padding: 12px; background: var(--sp-sunken); border-radius: var(--sp-radius)">
            <span class="sp-label">Comments</span>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`page`),c=e(o,`card`),l=()=>{let e=n(c,s).top;t(c,`data-stuck`,Math.abs(e-r)<i),t(c,`data-released`,e<8.5)};s.addEventListener(`scroll`,l),l()}export{o as mount};