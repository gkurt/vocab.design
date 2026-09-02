import{n as e}from"./parts.C-YLuC7Q.js";var t=`shot`,n=[{key:`harbour`,label:`Harbour`,hue:236},{key:`orchard`,label:`Orchard`,hue:146},{key:`ember`,label:`Ember`,hue:52}],r=(e,t)=>`oklch(${t} 0.13 ${e})`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px; height: 190px; overflow: hidden">
        <div data-part="gallery">
          <span class="sp-label sp-context">Gallery</span>
          <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 10px">${n.map(e=>`
      <button class="sp-button sp-button--quiet sp-stack" data-part="card-${e.key}" style="gap: 6px; padding: 0; height: auto">
        <span class="sp-swatch" data-part="thumb-${e.key}" style="display: block; width: 100%; height: 62px; --sp-swatch: ${r(e.hue,.72)}"></span>
        <span class="sp-label">${e.label}</span>
      </button>`).join(``)}</div>
        </div>
        <div data-part="detail" hidden>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label" data-part="caption"></span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="back">Back</button>
          </div>
          <span class="sp-swatch" data-part="hero" data-subject style="display: block; margin-top: 10px; height: 116px"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`gallery`),o=e(i,`detail`),s=e(i,`hero`),c=e(i,`caption`),l,u=r=>{s.style.viewTransitionName=``;for(let t of n)e(i,`thumb-${t.key}`).style.viewTransitionName=``;r.style.viewTransitionName=t},d=matchMedia(`(prefers-reduced-motion: reduce)`).matches,f=e=>{let t=document.startViewTransition?.bind(document);if(d||!t){e();return}t(e)};for(let t of n)e(i,`card-${t.key}`).addEventListener(`click`,()=>{l||(u(e(i,`thumb-${t.key}`)),f(()=>{u(s),s.style.setProperty(`--sp-swatch`,r(t.hue,.66)),c.textContent=t.label,a.hidden=!0,o.hidden=!1,l=t.key}))});e(i,`back`).addEventListener(`click`,()=>{let t=l;t&&(u(s),f(()=>{u(e(i,`thumb-${t}`)),o.hidden=!0,a.hidden=!1,l=void 0}))})}export{i as mount};