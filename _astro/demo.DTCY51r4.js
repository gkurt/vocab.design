var e={play:`<path d="M4 2.5 11 7l-7 4.5z"/>`,prev:`<path d="M10 2.5 4.4 7 10 11.5z"/><rect x="2.4" y="2.5" width="1.8" height="9" rx="0.6"/>`,next:`<path d="M4 2.5 9.6 7 4 11.5z"/><rect x="9.8" y="2.5" width="1.8" height="9" rx="0.6"/>`};function t(t,n){return`<svg viewBox="0 0 14 14" width="${n}" height="${n}" role="presentation" fill="currentColor" style="display: block">${e[t]}</svg>`}var n={key:`flat`,room:`background: #f2f4f8`,widget:`background: #ffffff; border-radius: 10px`,art:`background: #3d6bf0; border-radius: 7px`,artClass:``,title:`color: #1c2230`,sub:`color: #6b7385`,track:`background: #dde1ea; border-radius: 999px`,fill:`background: #3d6bf0`,transport:`color: #6b7385`,play:`background: #3d6bf0; border-radius: 50%`,playClass:``,playInk:`#ffffff`,dial:`background: #dde1ea; border-radius: 50%`,sheen:``},r={key:`neu`,room:`background: #e8ebf0`,widget:`background: #e8ebf0; border-radius: 16px; box-shadow: 6px 6px 13px rgb(163 170 184 / 0.62), -6px -6px 13px #ffffff`,art:`background: #e8ebf0; border-radius: 10px; box-shadow: 4px 4px 8px rgb(163 170 184 / 0.6), -4px -4px 8px #ffffff`,artClass:``,title:`color: #5f6675`,sub:`color: #9aa1af`,track:`background: #e8ebf0; border-radius: 999px; box-shadow: inset 2px 2px 4px rgb(163 170 184 / 0.75), inset -2px -2px 4px #ffffff`,fill:`background: #c6cbd6`,transport:`color: #969db0`,play:`background: #e8ebf0; border-radius: 50%; box-shadow: 3px 3px 7px rgb(163 170 184 / 0.62), -3px -3px 7px #ffffff`,playClass:``,playInk:`#8e95a6`,dial:`background: #e8ebf0; border-radius: 50%; box-shadow: 3px 3px 6px rgb(163 170 184 / 0.6), -3px -3px 6px #ffffff`,sheen:``},i={key:`neo`,room:`background: #212429`,widget:[`--sp-texture-base: #4b5059`,`--sp-texture-angle: 90deg`,`border-radius: 11px`,`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.42), inset 0 -1px 0 rgb(0 0 0 / 0.55), 0 7px 15px rgb(0 0 0 / 0.55)`].join(`; `),art:`background-color: #3d6bf0; border-radius: 7px`,artClass:` sp-bevel`,title:`color: #f1f3f7`,sub:`color: #aab1be`,track:`background: #2b2e35; border-radius: 999px; box-shadow: inset 0 2px 3px rgb(0 0 0 / 0.75), inset 0 -1px 0 rgb(255 255 255 / 0.14)`,fill:`background: linear-gradient(#9dbcff, #3d6bf0); border-radius: 999px; box-shadow: 0 0 6px rgb(93 137 255 / 0.6)`,transport:`color: #ccd2dd`,play:`background-color: #3d6bf0; border-radius: 50%`,playClass:` sp-bevel`,playInk:`#ffffff`,dial:[`border-radius: 50%`,`background-image: repeating-conic-gradient(#6d7480 0deg 5deg, #40454e 5deg 10deg), radial-gradient(circle at 34% 26%, rgb(255 255 255 / 0.5), rgb(255 255 255 / 0) 62%)`,`box-shadow: inset 0 0 0 2px #565c66, inset 0 1px 0 rgb(255 255 255 / 0.4), 0 2px 4px rgb(0 0 0 / 0.6)`].join(`; `),sheen:`position: absolute; inset: 0; border-radius: 11px; pointer-events: none; background: linear-gradient(116deg, rgb(255 255 255 / 0.26) 0%, rgb(255 255 255 / 0.02) 38%, rgb(255 255 255 / 0.12) 62%, rgb(0 0 0 / 0.12) 100%)`};function a(e,n){let r=(n,r)=>`
    <span aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; ${e.transport}">
      ${t(n,r)}
    </span>`;return`
    <div class="${e.key===`neo`?`sp-texture`:``}" data-part="widget-${e.key}"${n?` data-subject`:``}
         style="position: relative; overflow: hidden; display: flex; flex-direction: column; width: 126px;
                height: 128px; padding: 9px; ${e.widget}">
      ${e.sheen?`<span aria-hidden="true" data-part="${e.key}-sheen" style="${e.sheen}"></span>`:``}

      <div class="sp-row" style="position: relative; gap: 8px">
        <span data-part="${e.key}-art" class="${e.artClass.trim()}" aria-hidden="true"
              style="flex: 0 0 34px; height: 34px; ${e.art}"></span>
        <span class="sp-grow" style="display: flex; flex-direction: column; gap: 3px">
          <span style="font-size: 12px; font-weight: 600; line-height: 1.1; ${e.title}">Nightjar</span>
          <span style="font-size: 10px; line-height: 1.1; ${e.sub}">Kettle Run</span>
        </span>
      </div>

      <div data-part="${e.key}-track" aria-hidden="true"
           style="position: relative; overflow: hidden; height: 6px; margin-top: 10px; ${e.track}">
        <span style="position: absolute; left: 0; top: 0; bottom: 0; width: 58%; ${e.fill}"></span>
      </div>

      <div class="sp-row sp-row--between" style="position: relative; margin-top: 4px; ${e.sub}">
        <span style="font-size: 9px; line-height: 1.2">1:48</span>
        <span style="font-size: 9px; line-height: 1.2">3:06</span>
      </div>

      <div class="sp-row sp-row--between" style="position: relative; margin-top: auto">
        <div class="sp-row" style="gap: 4px">
          ${r(`prev`,12)}
          <span data-part="${e.key}-play" class="${e.playClass.trim()}" aria-hidden="true"
                style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px;
                       color: ${e.playInk}; ${e.play}">
            ${t(`play`,12)}
          </span>
          ${r(`next`,12)}
        </div>
        <span data-part="${e.key}-dial" aria-hidden="true" style="width: 24px; height: 24px; ${e.dial}"></span>
      </div>
    </div>`}function o(e,t,n){return`
    <div class="sp-stack${n?``:` sp-context`}" style="flex: 0 0 140px; gap: 5px; align-items: stretch">
      <div data-part="tile-${e.key}"
           style="display: flex; align-items: center; justify-content: center; width: 140px; height: 142px;
                  border-radius: 6px; ${e.room}">
        ${a(e,n)}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${t}</span>
    </div>`}function s(e){e.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <div class="sp-row" data-part="tour" style="gap: 9px; align-items: flex-start; justify-content: center">
          ${o(n,`Flat`,!1)}
          ${o(r,`Neumorphic`,!1)}
          ${o(i,`Neo-skeuomorphic`,!0)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Same spacing, same type, same hit targets. Only the material came back.
      </p>
    </div>
  `}export{s as mount};