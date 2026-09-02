import{n as e}from"./parts.C-YLuC7Q.js";var t=`<svg class="sp-icon sp-icon--filled sp-icon--chevron" viewBox="0 0 24 24" aria-hidden="true" style="width: 11px; height: 11px"><path d="M8 4.5 17 12l-9 7.5z" stroke-width="1"/></svg>`,n=[`button.tsx`,`card.tsx`,`chip.tsx`];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 264px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Explorer</span></div>
        <div class="sp-body sp-context" style="padding: 8px">
          <ul class="sp-nav">
            <li class="sp-nav-item" style="padding-left: 34px; cursor: default">app.tsx</li>
            <li class="sp-nav-item" style="padding-left: 34px; cursor: default">README.md</li>
            <li class="sp-row" style="gap: 0">
              <button
                class="sp-icon-button"
                type="button"
                data-part="twisty"
                data-subject
                aria-expanded="false"
                aria-controls="vd-branch"
                aria-label="Expand components"
                style="width: 22px; height: 26px"
              >${t}</button>
              <button
                class="sp-nav-item sp-grow"
                type="button"
                data-part="branch-label"
                style="border: 0; background: transparent; font: inherit; font-size: 13px; text-align: left; padding-left: 4px"
              >components</button>
            </li>
          </ul>
          <ul class="sp-nav" data-part="branch" id="vd-branch" hidden>${n.map(e=>`<li class="sp-nav-item" data-part="child-${e.split(`.`)[0]}" style="padding-left: 34px; cursor: default">${e}</li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let i=e(r,`twisty`),a=e(r,`branch`),o=e=>{a.hidden=!e,i.setAttribute(`aria-expanded`,String(e)),i.setAttribute(`aria-label`,`${e?`Collapse`:`Expand`} components`)},s=()=>o(!!a.hidden);i.addEventListener(`click`,s),e(r,`branch-label`).addEventListener(`click`,s)}export{r as mount};