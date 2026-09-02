import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{r as n}from"./measure.DK7AY2_i.js";var r=100,i=52,a=460,o=`transform 0.22s var(--sp-ease), opacity 0.22s`,s=[{mark:`CA`,text:`Calendar: standup at 9:30`},{mark:`PH`,text:`Photos: 12 new memories`}];function c(e,t,n){return`
    <span data-part="${n}" style="position: absolute; left: ${e}; bottom: 0; display: flex; flex-direction: column;
                                     align-items: center; gap: 3px; transform: translateX(-50%)">
      <span style="width: 2px; height: 9px; background: var(--sp-muted)"></span>
      <span class="sp-label" style="font-size: 10px; white-space: nowrap">${t}</span>
    </span>`}function l(l,u){let d=s.map(e=>`
      <li class="sp-list-item sp-context" style="height: ${i}px">
        <span class="sp-avatar">${e.mark}</span>
        <span class="sp-grow sp-text sp-text--ink">${e.text}</span>
      </li>`).join(``);l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 306px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notifications</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-surface" style="overflow: hidden">
            <ul class="sp-list">
              <li class="sp-list-item" data-part="row" style="position: relative; height: ${i}px; padding: 0; overflow: hidden; transition: height 0.22s var(--sp-ease)">
                <div
                  class="sp-row"
                  data-part="card"
                  data-state="resting"
                  data-subject
                  style="height: ${i}px; width: 100%; gap: 10px; padding: 0 8px 0 12px; background: var(--sp-surface);
                         cursor: grab; touch-action: none; transition: ${o}"
                >
                  <span class="sp-avatar">MW</span>
                  <span class="sp-grow sp-text sp-text--ink">Ferry timetable changed for Thursday</span>
                  <button class="sp-icon-button" data-part="dismiss" type="button" aria-label="Dismiss notification">${t(`close`)}</button>
                </div>
              </li>
              ${d}
            </ul>
          </div>
          <div class="sp-context" data-part="ruler" style="position: relative; flex: 0 0 auto; margin-top: auto; height: 26px">
            <span style="position: absolute; left: 27%; top: 0; height: 12px; border-left: 1px dashed var(--sp-muted)"></span>
            <span class="sp-label" style="position: absolute; left: 27%; bottom: 0; transform: translateX(-50%); font-size: 10px">threshold</span>
            ${c(`38%`,`short`,`mark-short`)}
            ${c(`8%`,`past it`,`mark-far`)}
          </div>
          <div
            class="sp-row sp-row--between sp-context"
            data-part="undo-row"
            style="flex: 0 0 auto; height: 30px; visibility: hidden; opacity: 0; transition: opacity 0.18s, visibility 0.18s"
          >
            <span class="sp-text">Notification dismissed</span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo" type="button">Undo</button>
          </div>
        </div>
      </div>
    </div>
  `;let f=e(l,`row`),p=e(l,`card`),m=e(l,`undo-row`),h=e(l,`dismiss`),g,_=0,v=e=>{_=e,p.style.transform=`translateX(${e}px)`,p.style.opacity=String(Math.max(.35,1-Math.abs(e)/300))},y=e=>{m.style.visibility=e?`visible`:`hidden`,m.style.opacity=e?`1`:`0`},b=e=>{p.dataset.state!==`gone`&&(p.dataset.state=`gone`,p.style.transition=o,v(e*a),p.style.opacity=`0`,u.setTimeout(()=>{f.style.height=`0px`},160),y(!0))};p.addEventListener(`pointerdown`,e=>{p.dataset.state===`gone`||h.contains(e.target)||(e.isTrusted&&p.setPointerCapture(e.pointerId),g=n(e,l).x,p.style.transition=`none`,p.dataset.state=`dragging`)}),p.addEventListener(`pointermove`,e=>{g!==void 0&&v(n(e,l).x-g)});let x=()=>{if(g!==void 0){if(g=void 0,p.style.transition=o,Math.abs(_)>=r){b(Math.sign(_));return}v(0),p.dataset.state=`resting`}};p.addEventListener(`pointerup`,x),p.addEventListener(`pointercancel`,x),h.addEventListener(`click`,()=>b(-1)),e(l,`undo`).addEventListener(`click`,()=>{f.style.height=`${i}px`,p.style.transition=o,v(0),p.dataset.state=`resting`,y(!1)})}export{l as mount};