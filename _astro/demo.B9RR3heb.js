import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={s:`starred the message`,r:`marked it replied`},r={always:{caps:{s:`S`,r:`R`},mode:`bare`,verdict:`Fails 2.1.4`},typing:{caps:{s:`S`,r:`R`},mode:`bare`,verdict:`Passes 2.1.4`},modifier:{caps:{s:`Ctrl + S`,r:`Ctrl + R`},mode:`modifier`,verdict:`Passes 2.1.4`}},i=`Write a reply`;function a(a){let o=(e,t)=>`
    <span class="sp-row" style="gap: 6px; flex: 0 0 auto">
      <span class="sp-kbd" data-part="cap-${e}" style="min-width: 54px; justify-content: center">${r.always.caps[e]}</span>
      <span class="sp-label" style="font-size: 10.5px">${t}</span>
    </span>`,s=(e,t)=>`
    <span class="sp-label" style="font-size: 10px; flex: 0 0 auto">${t}
      <span data-part="${e}-state" data-on="no"
            style="display: inline-block; width: 22px; color: var(--sp-ink); font-weight: 500">no</span>
    </span>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="policy" data-axis="Shortcut policy" data-value="always" style="margin-left: auto">
            <button class="sp-segment" type="button" data-part="seg-always" value="always"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Always on</button>
            <button class="sp-segment" type="button" data-part="seg-typing" value="typing"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Off in fields</button>
            <button class="sp-segment" type="button" data-part="seg-modifier" value="modifier"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Ctrl needed</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="message" style="margin-top: 10px; padding: 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 18px">
            <span class="sp-heading" data-part="subject-line" style="font-size: 12.5px">Roof survey</span>
            <div class="sp-row" style="gap: 12px; flex: 0 0 auto">
              ${s(`star`,`Starred`)}
              ${s(`reply`,`Replied`)}
            </div>
          </div>
          <div class="sp-input" data-part="compose" data-active="no" data-text="no" tabindex="0" aria-label="Reply"
               style="margin-top: 8px; height: 32px; display: flex; align-items: center; gap: 1px;
                      font-size: 12px; cursor: text">
            <span data-part="typed"></span>
            <span class="sp-caret" data-part="caret" hidden></span>
            <span class="sp-label" data-part="placeholder" style="font-size: 12px">${i}</span>
          </div>
        </div>

        <div class="sp-row sp-row--between" style="margin-top: 10px; gap: 10px; height: 22px">
          <div class="sp-row" data-part="legend" data-subject data-mode="bare" data-pose="[data-mode=bare]"
               style="gap: 14px; flex: 0 0 auto">
            ${o(`s`,`Star`)}
            ${o(`r`,`Reply`)}
          </div>
          <span class="sp-text sp-text--ink sp-context" data-stage-verdict data-part="verdict" data-policy="always"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${r.always.verdict}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Last key</span>
          <span class="sp-text sp-text--ink" data-part="log" data-fired="no"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">nothing pressed yet</span>
        </div>
      </div>
    </div>
  `;let c=e(a,`legend`),l=e(a,`compose`),u=e(a,`typed`),d=e(a,`caret`),f=e(a,`placeholder`),p=e(a,`verdict`),m=e(a,`log`),h=e(a,`star-state`),g=e(a,`reply-state`),_=`always`,v=!1,y=``,b=!1,x=!1,S=()=>{u.textContent=y,l.dataset.text=y?`yes`:`no`,l.dataset.active=v?`yes`:`no`,t(l,`data-sim-focus`,v),d.hidden=!v,f.hidden=v||y.length>0,h.dataset.on=b?`yes`:`no`,h.textContent=b?`yes`:`no`,g.dataset.on=x?`yes`:`no`,g.textContent=x?`yes`:`no`},C=t=>{_=t,v=!1,y=``,b=!1,x=!1;let n=r[t];c.dataset.mode=n.mode,e(a,`cap-s`).textContent=n.caps.s,e(a,`cap-r`).textContent=n.caps.r,p.dataset.policy=t,p.textContent=n.verdict,m.dataset.fired=`no`,m.textContent=`nothing pressed yet`,S()};a.addEventListener(`keydown`,e=>{let t=e.key;if(t.length!==1||!/[a-z]/i.test(t))return;let r=t.toLowerCase(),i=r===`s`||r===`r`?r:void 0,a=e.ctrlKey||e.metaKey,o=i!==void 0&&(_===`always`||_===`typing`&&!v||_===`modifier`&&a),s=v&&!a;o&&i===`s`&&(b=!0),o&&i===`r`&&(x=!0),s&&(y+=t);let c=a?`Ctrl + ${t}`:t,l=i===void 0?``:n[i];m.dataset.fired=o?`yes`:`no`,m.textContent=o?s?`${c} typed, and ${l}`:`${c} ${l}`:s?`${c} typed into the reply`:`${c} did nothing`,S()}),a.addEventListener(`click`,e=>{v=l.contains(e.target),S()}),e(a,`policy`).addEventListener(`change`,e=>{C(e.detail)}),C(`always`)}export{a as mount};