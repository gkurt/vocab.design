import{n as e,t}from"./parts.C-YLuC7Q.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 296px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Release notes</span><span class="sp-label">Draft</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-context" id="vd-tb-label">Emphasis</span>
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="bold"
              data-subject
              aria-pressed="false"
              aria-label="Bold"
              style="width: 36px; padding: 5px 0; font-weight: 700; text-align: center"
            >B</button>
          </div>
          <p class="sp-prose sp-context" data-part="sample" style="height: 76px; margin: 12px 0 0">
            Version 4.2 ships the new export pipeline and a faster first paint.
          </p>
          <div class="sp-divider sp-context" style="margin: 10px 0 12px"></div>
          <div class="sp-stack sp-context" style="gap: 10px">
            <div class="sp-row sp-row--between">
              <span class="sp-label" id="vd-tb-wrap">Wrap lines</span>
              <button class="sp-switch" type="button" data-part="wrap" role="switch" aria-checked="true" aria-labelledby="vd-tb-wrap"></button>
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label" id="vd-tb-spell">Spell check</span>
              <button
                class="sp-checkbox"
                type="button"
                data-part="spell"
                role="checkbox"
                aria-checked="true"
                aria-labelledby="vd-tb-spell"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`bold`),i=e(n,`sample`);r.addEventListener(`click`,()=>{let e=r.getAttribute(`aria-pressed`)!==`true`;r.setAttribute(`aria-pressed`,String(e)),t(r,`data-selected`,e),i.style.fontWeight=e?`700`:``});for(let t of[`wrap`,`spell`]){let r=e(n,t);r.addEventListener(`click`,()=>{r.setAttribute(`aria-checked`,String(r.getAttribute(`aria-checked`)!==`true`))})}}export{n as mount};