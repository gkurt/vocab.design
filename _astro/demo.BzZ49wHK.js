import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={width:384,height:216},n=100/3,r=2,i=[{key:`thirds`,label:`on the thirds`,horizon:2*n,sunX:n,sunY:n,note:`The horizon rides the lower line and the sun sits on an intersection, which leaves the frame somewhere to travel.`},{key:`centre`,label:`dead centre`,horizon:50,sunX:50,sunY:50,note:`Dead centre: the horizon halves the frame, the sun is cut in two by it, and both halves say the same thing.`}],a=(e,t)=>{let n=`${e}%`;return`linear-gradient(${t?`to right`:`to bottom`}, transparent calc(${n} - ${r/2}px), var(--rot-guide) calc(${n} - ${r/2}px),
    var(--rot-guide) calc(${n} + ${r/2}px), transparent calc(${n} + ${r/2}px))`},o=(e,t)=>`
  <span
    aria-hidden="true"
    style="position: absolute; left: ${e}%; top: ${t}%; width: 12px; height: 12px; translate: -50% -50%;
           border: ${r}px solid var(--rot-guide); border-radius: 50%"
  ></span>`;function s(r){let s=i[0];r.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Composed</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="compositions" data-value="${s.key}" data-axis="Placement" data-term="thirds">
            ${i.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 11px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; padding: 10px 12px">
          <div
            class="sp-context"
            data-part="photo"
            style="position: relative; flex: 0 0 auto; width: ${t.width}px; height: ${t.height}px; overflow: hidden;
                   border-radius: var(--sp-radius); background: linear-gradient(#8fb4dd, #cfd9e0 58%, #f0cfa4)"
          >
            <span
              data-part="sun"
              aria-hidden="true"
              style="position: absolute; left: ${s.sunX}%; top: ${s.sunY}%; width: 46px; height: 46px; translate: -50% -50%;
                     border-radius: 50%; background: #f6b45a; box-shadow: 0 0 26px 10px rgb(246 180 90 / 0.45);
                     transition: left 0.4s var(--sp-ease), top 0.4s var(--sp-ease)"
            ></span>
            <span
              data-part="sea"
              aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 0; top: ${s.horizon}%;
                     background: linear-gradient(#2f5f86, #1f4363); transition: top 0.4s var(--sp-ease)"
            ></span>

            <div
              data-part="grid"
              data-subject
              data-mode="${s.key}"
              data-pose="[data-mode=thirds]"
              aria-hidden="true"
              style="--rot-guide: rgb(255 255 255 / 0.82); position: absolute; inset: 0; pointer-events: none;
                     background-image: ${a(n,!0)}, ${a(2*n,!0)}, ${a(n,!1)}, ${a(2*n,!1)}"
            >
              ${o(n,n)}
              ${o(2*n,n)}
              ${o(n,2*n)}
              ${o(2*n,2*n)}
            </div>
          </div>

          <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="flex: 0 0 auto; height: 32px; width: 440px; font-size: 12px; line-height: 16px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let c=e(r,`grid`),l=e(r,`sun`),u=e(r,`sea`),d=e(r,`note`),f=e=>{let t=i.find(t=>t.key===e);t&&(c.dataset.mode=t.key,l.style.left=`${t.sunX}%`,l.style.top=`${t.sunY}%`,u.style.top=`${t.horizon}%`,d.textContent=t.note)};e(r,`compositions`).addEventListener(`change`,e=>f(e.detail)),f(s.key)}export{s as mount};