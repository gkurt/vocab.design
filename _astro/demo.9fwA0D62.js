import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`Home`,`News`,`Sport`,`Culture`,`Weather`,`Contact`],r={rest:`First in the DOM and invisible, so nothing above the article moves. One Tab from the top of the page reaches it.`,revealed:`Focus arrived and the link painted itself. Six repeated links still stand between here and the article.`,jumped:`Enter moved focus, not just the scroll position: the ring is inside the article, past all six of them.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 444px; height: 202px">
        <div class="sp-button sp-button--sm" role="link" tabindex="0" data-part="skip" data-subject
             style="position: absolute; z-index: 2; top: 9px; left: 12px; opacity: 0; translate: 0 -22px;
                    transition: opacity 0.16s var(--sp-ease), translate 0.16s var(--sp-ease)">
          Skip to main content
        </div>

        <div class="sp-topbar sp-context" style="flex-direction: column; align-items: stretch; gap: 7px; padding: 9px 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 13px">The Harbour Gazette</span>
            <span class="sp-label" style="font-size: 10px">Thursday</span>
          </div>
          <div class="sp-row" data-part="nav" style="gap: 2px">
            ${n.map((e,t)=>`<div class="sp-nav-item" role="link" tabindex="0" data-part="nav-${t+1}"
                      style="padding: 3px 7px; font-size: 11px">${e}</div>`).join(``)}
          </div>
        </div>

        <div class="sp-body sp-context" style="padding: 12px">
          <div class="sp-surface" data-part="main" tabindex="-1"
               style="padding: 10px 12px; display: flex; flex-direction: column; gap: 7px">
            <span class="sp-label">Main content</span>
            <span class="sp-heading" style="font-size: 13px">Storm delays the 7.10 ferry</span>
            <div class="sp-stack" style="gap: 7px">
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 84%"></div>
              <div class="sp-line" style="width: 46%"></div>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text" data-stage-verdict data-part="caption" data-state="rest"
         style="margin: 0; font-size: 11px">${r.rest}</p>
    </div>
  `;let a=e(i,`skip`),o=e(i,`main`),s=e(i,`caption`),c=e=>{s.dataset.state=e,s.textContent=r[e]},l=e=>{t(a,`data-revealed`,e),a.style.opacity=e?`1`:`0`,a.style.translate=e?`0 0`:`0 -22px`},u=e=>{l(!1),a.removeAttribute(`data-sim-focus`),o.setAttribute(`data-sim-focus`,``),e&&o.focus(),c(`jumped`)},d=()=>{o.removeAttribute(`data-sim-focus`);let e=a.hasAttribute(`data-sim-focus`);l(e),c(e?`revealed`:`rest`)};i.addEventListener(`keydown`,e=>{e.key===`Tab`&&d(),e.key===`Enter`&&a.hasAttribute(`data-sim-focus`)&&u(e.isTrusted)}),a.addEventListener(`focus`,()=>{l(!0),c(`revealed`)}),a.addEventListener(`blur`,()=>{a.hasAttribute(`data-sim-focus`)||l(!1)}),a.addEventListener(`click`,()=>u(!0))}export{i as mount};