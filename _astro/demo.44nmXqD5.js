import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=`3`,r=`Booked the smaller of the two rooms and it was exactly what the listing said:
quiet, warm, and a five minute walk from the station. The host left a note about the
boiler and the bins, which sounds dull until you need it at eleven at night. Kitchen
is shared but nobody was ever in it, and the shop on the corner opens at seven.`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 300px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Reviews</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-row" style="gap: 10px">
            <span class="sp-avatar">RK</span>
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-text sp-text--ink">Rosa K.</span>
              <span class="sp-label">Stayed in March</span>
            </div>
          </div>
          <div class="sp-stack" style="margin-top: auto; gap: 8px">
            <div class="sp-scroll" data-part="copy" style="max-height: 120px">
              <p
                class="sp-text"
                data-part="text"
                id="vd-review"
                style="margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${n}; overflow: hidden"
              >${r}</p>
            </div>
            <button
              class="sp-button sp-button--quiet sp-button--sm sp-row"
              type="button"
              data-part="toggle"
              data-subject
              aria-expanded="false"
              aria-controls="vd-review"
              style="align-self: flex-start; padding-left: 0"
            >
              ${t(`chevronRight`,`sp-icon--chevron`)}
              <span data-part="label-more">Show more</span>
              <span data-part="label-less" hidden>Show less</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`toggle`),o=e(i,`text`),s=e(i,`copy`),c=e(i,`label-more`),l=e(i,`label-less`),u=e=>{o.style.setProperty(`-webkit-line-clamp`,e?`unset`:n),e?o.setAttribute(`data-expanded`,``):o.removeAttribute(`data-expanded`),a.setAttribute(`aria-expanded`,String(e)),c.hidden=e,l.hidden=!e,e||(s.scrollTop=0)};a.addEventListener(`click`,()=>u(!o.hasAttribute(`data-expanded`)))}export{i as mount};