import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{r}from"./measure.DK7AY2_i.js";var i=132,a=i/2,o=48,s=[`display: flex; flex-direction: column; align-items: center; justify-content: center`,`gap: 3px; width: 66px; height: 100%; padding: 0; border-radius: 0; font-size: 11px`].join(`; `),c=`transform 0.2s var(--sp-ease)`,l=[{from:`Priya`,subject:`Design review notes`},{from:`Otis`,subject:`Offsite logistics`}];function u(u){let d=l.map(({from:e,subject:t})=>`
      <li class="sp-list-item sp-context" style="height: ${o}px">
        <span class="sp-avatar">${e.slice(0,2).toUpperCase()}</span>
        <span class="sp-grow sp-text sp-text--ink">${t}</span>
      </li>`).join(``);u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inbox</span>
          <span class="sp-text" data-part="count" style="width: 92px; text-align: right">Archived: 0</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="overflow: hidden">
            <ul class="sp-list">
              <li class="sp-list-item sp-context" style="height: ${o}px">
                <span class="sp-avatar">SA</span>
                <span class="sp-grow sp-text sp-text--ink">Invoice for March</span>
              </li>
              <li class="sp-list-item" data-part="row" style="position: relative; overflow: hidden; padding: 0; height: ${o}px; touch-action: none">
                <div
                  class="sp-row"
                  data-part="actions"
                  data-subject
                  style="position: absolute; top: 0; right: 0; bottom: 0; gap: 0; visibility: hidden; opacity: 0; transition: opacity 0.14s, visibility 0.14s"
                >
                  <button class="sp-button" type="button" data-part="action-archive" style="${s}">
                    ${n(`inbox`)}
                    Archive
                  </button>
                  <button class="sp-button sp-button--ghost" type="button" data-part="action-delete" style="${s}; border-width: 0 0 0 1px">
                    ${n(`trash`)}
                    Delete
                  </button>
                </div>
                <div
                  class="sp-row sp-context"
                  data-part="sheet"
                  style="position: absolute; inset: 0; gap: 10px; padding: 0 12px; background: var(--sp-surface); cursor: grab; transition: ${c}"
                >
                  <span class="sp-avatar" data-part="row-start">MK</span>
                  <span class="sp-grow sp-text sp-text--ink">Ferry timetable, revised</span>
                  <span style="display: inline-flex; justify-content: flex-end; width: 84px">
                    <span class="sp-chip" data-part="tag" hidden>Archived</span>
                  </span>
                </div>
              </li>
              ${d}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(u,`row`),p=e(u,`sheet`),m=e(u,`actions`),h=e(u,`tag`),g=e(u,`count`),_,v=0,y=e=>{v=Math.min(Math.max(e,0),i),p.style.transform=`translateX(${-v}px)`;let n=v>2;m.style.visibility=n?`visible`:`hidden`,m.style.opacity=n?`1`:`0`,t(f,`data-open`,v>=i)};f.addEventListener(`pointerdown`,e=>{m.contains(e.target)||(e.isTrusted&&f.setPointerCapture(e.pointerId),_=r(e,u).x,p.style.transition=`none`)}),f.addEventListener(`pointermove`,e=>{_!==void 0&&y(_-r(e,u).x)});let b=()=>{_!==void 0&&(_=void 0,p.style.transition=c,y(v>=a?i:0))};f.addEventListener(`pointerup`,b),f.addEventListener(`pointercancel`,b),e(u,`action-archive`).addEventListener(`click`,()=>{h.hidden=!1,g.textContent=`Archived: 1`,y(0)}),e(u,`action-delete`).addEventListener(`click`,()=>y(0)),u.addEventListener(`pointerdown`,e=>{f.contains(e.target)||y(0)})}export{u as mount};