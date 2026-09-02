import{t as e}from"./icons.CLHbLdSV.js";var t=`'Segoe UI Light', 'Segoe UI', 'Helvetica Neue', var(--sp-font)`,n=`#101112`;function r(r){let i=(n,r,i,a,o=1)=>`
    <div data-part="${n}"
         style="position: relative; grid-column: span ${o}; background: ${r}; color: #ffffff">
      <span aria-hidden="true" style="position: absolute; left: 11px; top: 11px; transform: scale(1.55); transform-origin: 0 0">
        ${e(i)}
      </span>
      <span style="position: absolute; left: 9px; bottom: 6px; font-family: ${t}; font-size: 11px; font-weight: 400">${a}</span>
    </div>`;r.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="position: relative; width: 238px; height: 244px; padding: 12px; background: ${n}; overflow: hidden">

        <div data-part="title"
             style="font-family: ${t}; font-weight: 200; font-size: 42px; line-height: 1.05; letter-spacing: -0.012em;
                    color: #ffffff; white-space: nowrap; margin-right: -12px">
          collections <span style="color: rgb(255 255 255 / 0.32)">photos</span>
        </div>
        <div data-part="subtitle"
             style="margin-top: 1px; font-family: ${t}; font-size: 11px; color: rgb(255 255 255 / 0.55)">tuesday, 14 march</div>

        <div data-part="tiles"
             style="display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 66px; gap: 7px; margin-top: 10px">
          ${i(`tile-mail`,`#00a4ef`,`inbox`,`mail`)}
          ${i(`tile-photos`,`#7cbb00`,`star`,`photos`)}
          ${i(`tile-alerts`,`#f65314`,`bell`,`alerts`)}
          ${i(`tile-people`,`#7b3f9d`,`heart`,`people`,2)}
          ${i(`tile-agenda`,`#ffbb00`,`calendar`,`agenda`)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 238px; margin: 0; text-align: center">
        Flat blocks, one light heading running off the edge, no chrome at all.
      </p>
    </div>
  `}export{r as mount};