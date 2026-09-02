import{n as e}from"./parts.C-YLuC7Q.js";var t={rest:0,hover:.08,pressed:.12},n=800;function r(r,i){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 336px">
        <div class="sp-row sp-row--between">
          <button class="sp-button" data-part="target" data-subject data-state="rest" style="position: relative; overflow: hidden">
            <span data-part="layer" aria-hidden="true"
                  style="position: absolute; inset: 0; background: var(--sp-accent-ink); opacity: 0; transition: opacity 0.14s var(--sp-ease)"></span>
            <span style="position: relative">Add to library</span>
          </button>
          <span class="sp-label sp-context" data-part="readout">rest &middot; 0%</span>
        </div>

        <div class="sp-context" data-part="exploded" style="margin-top: 18px">
          <span class="sp-label">Layers</span>
          <div class="sp-stack" style="gap: 5px; margin-top: 8px">
            <div class="sp-row">
              <span class="sp-surface" style="width: 58px; height: 16px"></span>
              <span class="sp-text">Label</span>
            </div>
            <div class="sp-row">
              <span class="sp-swatch" style="width: 58px; height: 16px; --sp-swatch: color-mix(in oklab, var(--sp-ink) 12%, transparent)"></span>
              <span class="sp-text">State layer</span>
            </div>
            <div class="sp-row">
              <span class="sp-swatch" style="width: 58px; height: 16px; --sp-swatch: var(--sp-sunken)"></span>
              <span class="sp-text">Container</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(r,`target`),o=e(r,`layer`),s=e(r,`readout`),c=!1,l,u=e=>{let n=t[e]??0;a.dataset.state=e,o.style.opacity=String(n),s.textContent=`${e} · ${Math.round(n*100)}%`};a.addEventListener(`pointerenter`,()=>{c=!0,a.dataset.state!==`pressed`&&u(`hover`)}),a.addEventListener(`pointerleave`,()=>{c=!1,i.clearTimeout(l),u(`rest`)}),a.addEventListener(`pointerdown`,()=>{i.clearTimeout(l),u(`pressed`)}),a.addEventListener(`pointerup`,()=>{i.clearTimeout(l),l=i.setTimeout(()=>u(c?`hover`:`rest`),n)})}export{r as mount};