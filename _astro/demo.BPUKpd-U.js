var e=`#f7f5ef`;function t(e,t,n){return`<span${n?` data-part="${n}"`:``} style="grid-area: ${e}; background: ${t}"></span>`}function n(n){n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="composition" data-subject aria-hidden="true"
           style="display: grid; width: 238px; height: 222px; padding: 7px; gap: 7px; background: #141414;
                  grid-template-columns: 0.5fr 0.22fr 1.15fr 0.3fr;
                  grid-template-rows: 1.45fr 0.4fr 0.55fr">
        ${t(`1 / 1 / 2 / 3`,e)}
        ${t(`1 / 3 / 2 / 5`,`#d42f21`,`field-red`)}
        ${t(`2 / 1 / 3 / 2`,e)}
        ${t(`2 / 2 / 3 / 5`,e)}
        ${t(`3 / 1 / 4 / 2`,`#1b47a8`,`field-blue`)}
        ${t(`3 / 2 / 4 / 4`,e,`field-white`)}
        ${t(`3 / 4 / 4 / 5`,`#f5c400`,`field-yellow`)}
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 250px; margin: 0; text-align: center">
        Unequal tracks, three primaries, no curve and no diagonal anywhere.
      </p>
    </div>
  `}export{n as mount};