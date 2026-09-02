import{n as e}from"./parts.C-YLuC7Q.js";var t=[{id:`linear`,label:`linear`,timing:`linear`,path:`M0 30 L30 0`},{id:`ease-out`,label:`ease-out`,timing:`cubic-bezier(0.16, 1, 0.3, 1)`,path:`M0 30 C 8 4 16 0 30 0`},{id:`overshoot`,label:`overshoot`,timing:`cubic-bezier(0.34, 1.56, 0.64, 1)`,path:`M0 30 C 10 10 14 -8 30 0`}];function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="stage" data-running style="width: 400px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="play">Play</button>
        </div>
        <div data-part="tracks" data-subject>${t.map(e=>`
      <div class="sp-row" style="margin-top: 12px">
        <span class="sp-label" style="width: 78px">${e.label}</span>
        <span class="sp-track" data-part="track-${e.id}" style="--sp-timing: ${e.timing}">
          <span class="sp-dot" data-part="dot-${e.id}"></span>
        </span>
        <svg class="sp-curve" viewBox="-3 -11 37 45" aria-hidden="true"><path d="${e.path}" /></svg>
      </div>`).join(``)}</div>
      </div>
    </div>
  `;let r=e(n,`stage`);e(n,`play`).addEventListener(`click`,()=>{r.removeAttribute(`data-running`),r.offsetWidth,r.setAttribute(`data-running`,``)})}export{n as mount};