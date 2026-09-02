var e=`#eee7d9`,t=`#c62a1f`,n=`#1b1815`;function r(e,t){return`
    <span data-part="${e}" aria-hidden="true"
          style="position: absolute; ${t}; width: 78px; height: 62px; overflow: hidden; background: #b9b2a4;
                 background-image: radial-gradient(circle at 50% 50%, rgb(27 24 21 / 0.55) 0 1.1px, transparent 1.3px); background-size: 4px 4px">
      <span style="position: absolute; left: 12px; top: 12px; width: 26px; height: 26px; border-radius: 50%; background: ${n}"></span>
      <span style="position: absolute; left: 40px; top: 20px; width: 30px; height: 30px; background: ${n};
                   clip-path: polygon(0 50%, 100% 0, 100% 100%)"></span>
    </span>`}function i(i){let a=`
    <span data-part="wedge" aria-hidden="true"
          style="position: absolute; left: 0; top: 96px; width: 150px; height: 72px; background: ${t};
                 clip-path: polygon(0 100%, 0 18%, 100% 100%)"></span>
    <span aria-hidden="true"
          style="position: absolute; left: 118px; top: 176px; width: 150px; height: 5px; background: ${n}; rotate: -21deg"></span>
    <span data-part="disc" aria-hidden="true"
          style="position: absolute; right: 14px; top: 10px; width: 52px; height: 52px; border-radius: 50%; background: ${t}"></span>
    <span aria-hidden="true"
          style="position: absolute; left: -20px; top: 66px; width: 264px; height: 4px; background: ${t}; rotate: -21deg"></span>
    ${r(`montage`,`left: 12px; top: 12px; rotate: -7deg`)}
    <span data-part="band"
          style="position: absolute; left: -40px; top: 96px; display: flex; align-items: center; width: 300px; height: 34px;
                 padding-left: 52px; background: ${n}; rotate: -21deg">
      <span data-part="headline"
            style="font-size: 25px; font-weight: 800; letter-spacing: 0.01em; line-height: 1.1; color: ${e}">
        CONSTRUCT
      </span>
    </span>`,o=`
    <span data-part="square-band" aria-hidden="true"
          style="position: absolute; left: 0; top: 100px; width: 100%; height: 30px; background: ${n}"></span>
    <span aria-hidden="true"
          style="position: absolute; left: 0; top: 82px; width: 100%; height: 4px; background: ${t}"></span>
    <span aria-hidden="true"
          style="position: absolute; left: 8px; top: 138px; width: 96px; height: 20px; background: ${t}"></span>
    <span aria-hidden="true"
          style="position: absolute; right: 14px; top: 10px; width: 52px; height: 52px; border-radius: 50%; background: ${t}"></span>
    ${r(`square-montage`,`left: 12px; top: 12px`)}
    <span data-part="square-headline"
          style="position: absolute; left: 10px; top: 102px; font-size: 25px; font-weight: 800; letter-spacing: 0.01em;
                 line-height: 1.08; color: ${e}">
      CONSTRUCT
    </span>`,s=(t,n,r=``)=>`
    <span data-part="${t}"${r}
          style="position: relative; display: block; width: 212px; height: 168px; overflow: hidden; background: ${e}">
      ${n}
    </span>`,c=(e,t,n)=>`
    <div class="sp-stack${n?` sp-context`:``}" style="flex: 0 0 212px; gap: 5px; align-items: stretch">
      ${t}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${e}</span>
    </div>`;i.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">The angle is the argument</span>

        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${c(`Angled`,s(`composition`,a,` data-subject`),!1)}
          ${c(`Square`,s(`square`,o),!0)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Red and black on cheap paper, and one diagonal doing all the work.
      </p>
    </div>
  `}export{i as mount};