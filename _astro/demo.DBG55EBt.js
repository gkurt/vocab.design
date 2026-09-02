import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`ada`,initials:`AM`,name:`Ada Marceau`},{key:`jun`,initials:`JO`,name:`Jun Okafor`},{key:`rk`,initials:`RK`,name:`Rosa Kelly`}],r=[{key:`dana`,initials:`DP`,name:`Dana Peled`,role:`Content`},{key:`ivo`,initials:`IS`,name:`Ivo Strand`,role:`Engineering`},{key:`mei`,initials:`ME`,name:`Mei Eriksen`,role:`Research`}];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context" data-part="screen-top"><span class="sp-heading sp-grow">Pull request 214</span></div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-label">Reviewers</span>
              <span class="sp-text">2 approved</span>
            </div>
            <div class="sp-row" data-part="group" data-subject role="group" aria-label="5 reviewers" style="gap: 0; margin-top: 10px">
              ${n.map(({key:e,initials:t,name:n},r)=>`<span
        class="sp-avatar"
        data-part="face-${e}"
        role="img"
        aria-label="${n}"
        style="${r>0?`margin-left: -9px;`:``} box-shadow: 0 0 0 2px var(--sp-surface)"
      >${t}</span>`).join(``)}
              <button
                class="sp-avatar"
                type="button"
                data-part="overflow"
                aria-expanded="false"
                aria-haspopup="dialog"
                aria-label="Show 3 more reviewers"
                style="margin-left: -9px; border: 0; font: inherit; font-size: 11px; font-weight: 600; background: var(--sp-sunken); color: var(--sp-muted); box-shadow: 0 0 0 2px var(--sp-surface); cursor: pointer"
              >+3</button>
            </div>
          </div>
          <div class="sp-row sp-context" style="margin-top: 12px">
            <span class="sp-text">Opened Tuesday by Ada Marceau</span>
          </div>
        </div>
        <div
          class="sp-popover"
          data-part="rest-popover"
          role="dialog"
          aria-label="More reviewers"
          style="top: 124px; left: 26px; width: 216px; padding: 6px 10px; --sp-arrow-x: 66px"
        >
          <ul class="sp-list sp-context">${r.map(({key:e,initials:t,name:n,role:r})=>`<li class="sp-list-item" data-part="rest-${e}" style="padding: 6px 4px">
        <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${t}</span>
        <span class="sp-grow">${n}</span>
        <span class="sp-text">${r}</span>
      </li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let a=e(i,`overflow`),o=e(i,`rest-popover`),s=e=>{t(o,`data-open`,e),a.setAttribute(`aria-expanded`,String(e))};a.addEventListener(`click`,()=>s(!0)),i.addEventListener(`pointerdown`,e=>{let t=e.target;!o.contains(t)&&!a.contains(t)&&s(!1)}),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&s(!1)})}export{i as mount};