import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=[{key:`post-a`,who:`Rosa Neary`,mark:`RN`,when:`2 min`,width:92},{key:`post-b`,who:`Ivo Kranz`,mark:`IK`,when:`14 min`,width:74},{key:`post-c`,who:`Mara Oyelaran`,mark:`MO`,when:`1 h`,width:86},{key:`post-d`,who:`Bea Lund`,mark:`BL`,when:`3 h`,width:68}],r={chronological:{note:`newest first`,keys:[`post-a`,`post-b`,`post-c`,`post-d`]},ranked:{note:`most replied first`,keys:[`post-c`,`post-a`,`post-d`,`post-b`]}},i=e=>`
  <article class="sp-surface" data-part="${e.key}" style="flex: 0 0 auto; padding: 7px 11px">
    <div class="sp-row" style="gap: 8px; height: 24px">
      <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">${e.mark}</span>
      <span class="sp-grow" style="font-size: 12px; font-weight: 600">${e.who}</span>
      <span class="sp-label" style="font-size: 11px">${e.when}</span>
    </div>
    <div class="sp-line" style="width: ${e.width}%; margin-top: 6px"></div>
    <div class="sp-row" style="gap: 14px; height: 16px; margin-top: 7px; color: var(--sp-muted)">
      ${t(`heart`)}
      <span style="font-size: 11px">reply</span>
      ${t(`share`)}
    </div>
  </article>`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Order" data-part="switcher" data-value="chronological">
            <button class="sp-segment" type="button" data-part="seg-chrono" value="chronological">chronological</button>
            <button class="sp-segment" type="button" data-part="seg-ranked" value="ranked">ranked</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div class="sp-row sp-row--between sp-context" style="width: 308px; height: 26px">
            <span class="sp-label" data-part="rule">newest first</span>
            <button class="sp-chip" type="button" data-part="new-posts">
              <span style="display: inline-flex; rotate: 180deg">${t(`chevronDown`)}</span>New posts
            </button>
          </div>
          <div
            class="sp-scroll"
            data-part="feed"
            data-subject
            data-order="chronological"
            data-at="top"
            role="feed"
            aria-label="Posts"
            style="display: flex; flex-direction: column; gap: 6px; width: 308px; height: 190px; padding: 2px"
          >
            ${n.map(i).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`feed`),s=e(a,`rule`),c=new Map(n.map(t=>[t.key,e(a,t.key)])),l=()=>Math.max(o.scrollHeight-o.clientHeight,0),u=()=>{let e=l(),t=e>0?o.scrollTop/e:0;e<=0?o.dataset.at=`none`:t<=.02?o.dataset.at=`top`:t>=.98?o.dataset.at=`end`:o.dataset.at=`middle`},d=e=>{let t=r[e];t&&(o.dataset.order=e,s.textContent=t.note,t.keys.forEach((e,t)=>{let n=c.get(e);n&&(n.style.order=String(t),t===0?n.setAttribute(`data-first`,``):n.removeAttribute(`data-first`))}))};o.addEventListener(`scroll`,u),e(a,`new-posts`).addEventListener(`click`,()=>{o.scrollTop=0,u()}),e(a,`switcher`).addEventListener(`change`,e=>d(e.detail)),d(`chronological`),u()}export{a as mount};