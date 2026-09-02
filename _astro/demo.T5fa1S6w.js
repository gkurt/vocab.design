import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={w:640,h:400},r=240,i=`Low tide at Harbour Point: one sailing dinghy aground on the mud, hills behind it.`,a=`<svg xmlns="http://www.w3.org/2000/svg" width="${n.w}" height="${n.h}" viewBox="0 0 640 400">
  <rect width="640" height="400" fill="#cbdff0"/>
  <circle cx="518" cy="92" r="40" fill="#f5d78e"/>
  <path d="M0 258 L150 176 L286 258 Z" fill="#5d7f6c"/>
  <path d="M244 258 L392 162 L548 258 Z" fill="#47695a"/>
  <rect y="252" width="640" height="148" fill="#3d6b90"/>
  <rect y="300" width="640" height="100" fill="#7a6a52"/>
  <path d="M232 300 h132 l-24 30 h-84 Z" fill="#2c3a45"/>
  <path d="M292 300 V196" stroke="#2c3a45" stroke-width="7"/>
  <path d="M300 204 V292 H358 Z" fill="#f2f5f3"/>
</svg>`,o=`<svg xmlns="http://www.w3.org/2000/svg" width="${n.w}" height="${n.h}"></svg>`,s=e=>`data:image/svg+xml,${encodeURIComponent(e)}`,c={loaded:{src:s(a),shimmer:!1,note:`Decoded, into a box that was already the right shape for it.`},loading:{src:s(o),shimmer:!0,note:`Nothing has decoded yet, and the box is already the right size.`},broken:{src:`data:image/png;base64,QQ==`,shimmer:!1,note:`It will never arrive. The alt string is all that is left.`}},l=`loaded`;function u(a){let o=c[l];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading" style="font-size: 13px">Field notes, Harbour Point</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="State" data-value="${l}">
            ${Object.keys(c).map(e=>`<button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 10px; font-size: 12px">${e[0]?.toUpperCase()}${e.slice(1)}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 14px; align-items: flex-start">
          <div
            data-part="slot"
            data-state="${l}"
            style="position: relative; flex: 0 0 auto; width: ${r}px; border-radius: 6px; overflow: hidden; background: var(--sp-sunken)"
          >
            <span class="sp-skeleton" data-part="shimmer" style="position: absolute; inset: 0; border-radius: 0" hidden></span>
            <img
              data-part="image"
              data-subject
              src="${o.src}"
              width="${n.w}"
              height="${n.h}"
              alt="${i}"
              style="position: relative; display: block; width: ${r}px; height: auto; font-size: 11px; color: var(--sp-muted)"
            />
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px; min-width: 0">
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 11px">Intrinsic size</span>
              <span style="font-size: 12.5px; font-variant-numeric: tabular-nums">${n.w} × ${n.h}</span>
            </div>
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-label" style="font-size: 11px">Displayed size</span>
              <span style="font-size: 12.5px; font-variant-numeric: tabular-nums">${r} × ${Math.round(r*n.h/n.w)}</span>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="alt-show" style="align-self: flex-start; margin-top: 2px">
              Show the alt text
            </button>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; height: 18px; font-size: 12px; line-height: 18px; overflow: hidden">${o.note}</p>

        <div style="height: 44px; margin-top: 8px">
          <div
            class="sp-row"
            data-part="alt-box"
            hidden
            style="height: 44px; gap: 8px; padding: 5px 8px; border: 1px dashed var(--sp-accent); border-radius: 6px"
          >
            <span class="sp-label" style="flex: 0 0 auto; font-family: 'Geist Mono Variable', ui-monospace, monospace">alt</span>
            <span class="sp-text sp-text--ink sp-grow" data-part="alt-text" style="font-size: 11.5px; line-height: 1.35">${i}</span>
            <button class="sp-icon-button" type="button" data-part="alt-hide" aria-label="Hide the alt text" style="flex: 0 0 auto; width: 22px; height: 22px">
              ${t(`close`).replace(`<svg `,`<svg style="width: 13px; height: 13px" `)}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`slot`),u=e(a,`image`),d=e(a,`shimmer`),f=e(a,`note`),p=e(a,`alt-box`),m=e=>{let t=c[e];t&&(s.dataset.state=e,u.src=t.src,d.hidden=!t.shimmer,f.textContent=t.note)};e(a,`picker`).addEventListener(`change`,e=>m(e.detail)),e(a,`alt-show`).addEventListener(`click`,()=>{p.hidden=!1}),e(a,`alt-hide`).addEventListener(`click`,()=>{p.hidden=!0})}export{u as mount};