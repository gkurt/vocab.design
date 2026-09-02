import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=120,r=236,i=5,a={notch:{shape:`width: 54px; height: 16px; top: 0; border-radius: 0 0 9px 9px`,inset:20,label:`notch`},hole:{shape:`width: 12px; height: 12px; top: 5px; border-radius: 50%`,inset:20,label:`punch hole`},island:{shape:`width: 44px; height: 15px; top: 4px; border-radius: 999px`,inset:22,label:`island`}},o=(e,t)=>`
  <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 8px; font-size: 11px">
    ${t}
  </button>`,s=e=>`
  <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 20px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 14px; height: 14px; --sp-swatch: var(--sp-accent-soft)"></span>
    <span class="sp-line" style="flex: 1 1 auto; width: ${e}%; height: 5px"></span>
  </span>`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Sensor housing</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; gap: 14px; padding: 10px 12px">
          <div
            data-part="phone"
            style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px; padding: ${i}px;
                   background: #23262b; border-radius: 18px"
          >
            <div
              data-part="display"
              style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 13px;
                     background: var(--sp-sunken)"
            >
              <div
                data-part="content"
                data-subject
                data-pose="[data-mode=inset]"
                data-mode="inset"
                data-cutout="notch"
                style="position: absolute; left: 0; right: 0; bottom: 0; top: 20px; display: flex; flex-direction: column;
                       transition: top 0.22s var(--sp-ease)"
              >
                <span
                  data-part="app-bar"
                  style="display: flex; align-items: center; gap: 4px; flex: 0 0 auto; height: 24px; padding: 0 6px;
                         background: var(--sp-surface); border-bottom: 1px solid var(--sp-line)"
                >
                  <span data-part="bar-title" class="sp-heading" style="flex: 1 1 auto; min-width: 0; font-size: 11px; text-align: center">Harbour</span>
                  <span data-part="bar-action" class="sp-icon-button" style="flex: 0 0 auto; width: 18px; height: 18px">${t(`kebab`,`sp-icon--dots`)}</span>
                </span>
                <div style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-height: 0; padding: 8px 6px; overflow: hidden">
                  ${[86,64,92,72,80,58].map(s).join(``)}
                </div>
              </div>
              <span
                class="sp-context"
                data-part="cutout"
                style="position: absolute; left: 50%; translate: -50% 0; z-index: 2; background: #14161a;
                       width: 54px; height: 16px; top: 0; border-radius: 0 0 9px 9px"
              ></span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 1 auto; min-width: 0; gap: 4px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="shapes" data-axis="Housing" data-value="notch" style="align-self: flex-start">
              ${o(`notch`,`notch`)}${o(`hole`,`punch hole`)}${o(`island`,`island`)}
            </sp-segmented>
            <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Content region" data-term="inset" data-value="inset" style="align-self: flex-start; margin-top: 8px">
              ${o(`inset`,`inset to clear it`)}${o(`edge`,`edge to edge`)}
            </sp-segmented>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`content`),u=e(c,`cutout`),d=(e,t)=>{let n=a[e];n&&(u.setAttribute(`style`,`position: absolute; left: 50%; translate: -50% 0; z-index: 2; background: #14161a; ${n.shape}`),l.dataset.cutout=e,l.dataset.mode=t,l.style.top=t===`inset`?`${n.inset}px`:`0px`)};e(c,`shapes`).addEventListener(`change`,e=>d(e.detail,l.dataset.mode??`inset`)),e(c,`modes`).addEventListener(`change`,e=>d(l.dataset.cutout??`notch`,e.detail)),d(`notch`,`inset`)}export{c as mount};