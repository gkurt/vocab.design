import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=70,r={w:150,h:160},i=340,a=`translate 0.3s var(--sp-ease), rotate 0.3s var(--sp-ease), opacity 0.3s`,o=`translate 0.22s var(--sp-ease), rotate 0.22s var(--sp-ease), opacity 0.22s`,s=[{title:`Harbour steps`,meta:`25 min walk`},{title:`Kiln lane loop`,meta:`1 hr 10 min`},{title:`Reservoir path`,meta:`40 min walk`},{title:`Old tramway`,meta:`2 hr 5 min`}],c=e=>{let t=s[e%s.length];return`
    <div style="height: 74px; border-radius: 6px; background: var(--sp-sunken)"></div>
    <div class="sp-heading" style="margin-top: 9px; font-size: 13px">${t.title}</div>
    <div class="sp-text" style="margin-top: 2px; font-size: 11px">${t.meta}</div>`},l=(e,t,n)=>`<span data-part="${e}" style="position: absolute; left: ${t-4}px; top: ${n-4}px; width: 8px; height: 8px"></span>`;function u(u,d){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Walks near you</span>
          <span class="sp-chip" data-part="saved-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">Saved 0</span>
          <span class="sp-chip" data-part="skipped-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">Skipped 0</span>
        </div>
        <div class="sp-body" style="position: relative">
          <span class="sp-label sp-context" style="position: absolute; left: 12px; top: 12px; font-size: 10px">left to skip</span>
          <span class="sp-label sp-context" style="position: absolute; right: 12px; top: 12px; font-size: 10px">right to save</span>

          <div
            data-part="deck"
            data-card="1"
            data-saved="0"
            data-skipped="0"
            data-last="none"
            style="position: absolute; left: 162px; top: 14px; width: ${r.w}px; height: ${r.h}px"
          >
            <div class="sp-surface sp-context" style="position: absolute; inset: 0; translate: 0 16px; scale: 0.92"></div>
            <div
              class="sp-surface"
              data-part="next"
              style="position: absolute; inset: 0; padding: 10px; background: var(--sp-surface); translate: 0 8px; scale: 0.96"
            >${c(1)}</div>
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              data-state="resting"
              style="position: absolute; inset: 0; padding: 10px; background: var(--sp-surface); box-shadow: var(--sp-shadow);
                     cursor: grab; touch-action: none; transition: ${o}"
            >${c(0)}</div>
          </div>

          ${l(`throw-left`,95,94)}
          ${l(`throw-right`,375,94)}
          ${l(`arc-left`,165,110)}
          ${l(`arc-right`,310,110)}

          <div class="sp-row" style="position: absolute; left: 12px; right: 12px; bottom: 12px; justify-content: center; gap: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="skip" type="button" style="flex: 0 0 auto">Skip</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="save" type="button" style="flex: 0 0 auto">Save</button>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">Only the top card can be judged, and the throw is the answer. The card that leaves does not come back.</span>
    </div>
  `;let f=e(u,`deck`),p=e(u,`card`),m=e(u,`next`),h=e(u,`saved-chip`),g=e(u,`skipped-chip`),_=0,v=0,y=0,b,x=0,S=e=>{x=e,p.style.translate=`${e}px 0`,p.style.rotate=`${Math.max(-6,Math.min(6,e*.04))}deg`,p.style.opacity=String(Math.max(.4,1-Math.abs(e)/260))},C=()=>{_+=1,p.style.transition=`none`,p.innerHTML=c(_),p.dataset.state=`resting`,S(0),p.style.opacity=`1`,m.style.transition=`none`,m.style.translate=`0 8px`,m.style.scale=`0.96`,m.innerHTML=c(_+1),f.dataset.card=String(_%s.length+1)},w=e=>{p.dataset.state!==`leaving`&&(p.dataset.state=`leaving`,e===1?v+=1:y+=1,h.textContent=`Saved ${v}`,g.textContent=`Skipped ${y}`,f.dataset.saved=String(v),f.dataset.skipped=String(y),f.dataset.last=e===1?`saved`:`skipped`,p.style.transition=a,S(e*138),p.style.opacity=`0`,m.style.transition=`translate 0.3s var(--sp-ease), scale 0.3s var(--sp-ease)`,m.style.translate=`0 0`,m.style.scale=`1`,d.setTimeout(C,i))};p.addEventListener(`pointerdown`,e=>{p.dataset.state!==`leaving`&&(e.isTrusted&&p.setPointerCapture(e.pointerId),b=t(e,u).x,p.style.transition=`none`,p.dataset.state=`dragging`)}),p.addEventListener(`pointermove`,e=>{b!==void 0&&S(t(e,u).x-b)});let T=()=>{if(b!==void 0){if(b=void 0,p.style.transition=o,Math.abs(x)>=n){w(x>0?1:-1);return}p.dataset.state=`resting`,S(0),p.style.opacity=`1`}};p.addEventListener(`pointerup`,T),p.addEventListener(`pointercancel`,T),e(u,`skip`).addEventListener(`click`,()=>w(-1)),e(u,`save`).addEventListener(`click`,()=>w(1))}export{u as mount};