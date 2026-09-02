import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=[{id:`mon`,label:`Mon 14`},{id:`tue`,label:`Tue 15`},{id:`wed`,label:`Wed 16`}],r=9,i=4,a=34,o=a/60,s=240,c=132,l=44,u=136,d=30,f=[{id:`review`,title:`Design review`,day:0,start:30,length:90,tall:!0},{id:`standup`,title:`Standup`,day:1,start:0,length:45,tall:!1},{id:`interview`,title:`Interview`,day:1,start:30,length:45,tall:!1},{id:`deploy`,title:`Deploy`,day:2,start:120,length:60,tall:!0}],p=e=>{let t=540+e,n=Math.floor(t/60);return`${n>12?n-12:n}:${String(t%60).padStart(2,`0`)}`},m=e=>{let t=540+e.start;return`${n[e.day]?.id}-${String(Math.floor(t/60)).padStart(2,`0`)}${String(t%60).padStart(2,`0`)}`},h=Array.from({length:i},(e,t)=>{let n=r+t,i=`${n>12?n-12:n} ${n<12?`AM`:`PM`}`;return`<span class="sp-label" style="position: absolute; right: 4px; top: ${t*a+9}px; font-size: 9px; white-space: nowrap">${i}</span>`}).join(``),g=n.map(({label:e})=>`<span class="sp-label sp-text--ink" style="flex: 0 0 auto; width: ${c}px; text-align: center; font-size: 11px; line-height: 20px">${e}</span>`).join(``),_=f.map(e=>`
    <button
      type="button"
      data-part="ev-${e.id}"
      data-slot="${m(e)}"
      aria-label="${e.title}"
      style="position: absolute; left: 0; top: 0; width: 0; height: 0; display: flex; flex-direction: column; justify-content: flex-start;
             gap: 1px; padding: 2px 5px; border: 0; border-left: 3px solid var(--sp-accent); border-radius: 4px;
             background: var(--sp-accent-soft); color: var(--sp-ink); font: inherit; font-size: 10px; line-height: 1.25;
             text-align: left; overflow: hidden; cursor: grab; touch-action: none; user-select: none"
    >
      <span style="font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.title}</span>
      ${e.tall?`<span data-part="time-${e.id}" style="font-size: 9px; color: var(--sp-muted)">${p(e.start)}</span>`:``}
    </button>`).join(``);function v(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Studio week</span>
          <div class="sp-segmented" role="tablist" aria-label="View">
            <span class="sp-segment" role="tab" aria-selected="false" style="padding: 3px 10px; font-size: 12px">Day</span>
            <span class="sp-segment" role="tab" aria-selected="true" style="padding: 3px 10px; font-size: 12px; background: var(--sp-surface)">Week</span>
            <span class="sp-segment" role="tab" aria-selected="false" style="padding: 3px 10px; font-size: 12px">Month</span>
          </div>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div
            class="sp-surface"
            data-part="scheduler"
            data-subject
            style="flex: 0 0 auto; width: 442px; overflow: hidden"
          >
            <div style="display: flex; height: 21px; border-bottom: 1px solid var(--sp-line)">
              <span style="flex: 0 0 auto; width: ${l}px"></span>
              ${g}
            </div>
            <div style="display: flex; align-items: center; height: 25px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label" style="flex: 0 0 auto; width: ${l}px; padding-right: 6px; text-align: right; font-size: 9px; line-height: 24px; white-space: nowrap">all-day</span>
              <span style="flex: 0 0 auto; width: ${c}px"></span>
              <span style="flex: 0 0 auto; width: ${c}px; padding: 0 3px">
                <span
                  data-part="all-day"
                  style="display: block; padding: 1px 6px; border-radius: 3px; background: var(--sp-accent-soft);
                         border-left: 3px solid var(--sp-accent); font-size: 9px; line-height: 14px; white-space: nowrap;
                         overflow: hidden; text-overflow: ellipsis"
                >Offsite</span>
              </span>
              <span style="flex: 0 0 auto; width: ${c}px"></span>
            </div>
            <div data-part="grid" style="position: relative; height: ${u}px">
              <div style="position: absolute; left: 0; top: 0; width: ${l}px; height: 100%">${h}</div>
              <div
                data-part="canvas"
                style="position: absolute; left: ${l}px; top: 0; width: ${c*n.length}px; height: 100%;
                       background-image:
                         repeating-linear-gradient(to bottom, var(--sp-line) 0 1px, transparent 1px ${a}px),
                         repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px ${c}px)"
              >
                ${_}
                <span data-part="drop" style="position: absolute; left: 135px; top: ${180*o}px; width: 126px; height: ${a}px; pointer-events: none"></span>
                <span data-part="now" aria-hidden="true" style="position: absolute; left: 0; top: 41px; width: 100%; height: 8px; pointer-events: none">
                  <span style="position: absolute; left: 0; top: 0; width: 8px; height: 8px; border-radius: 50%; background: var(--sp-warn)"></span>
                  <span style="position: absolute; left: 4px; right: 0; top: 3px; height: 2px; background: var(--sp-warn)"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`canvas`),v=e(r,`grid`),y=new Map(f.map(t=>[t.id,e(r,`ev-${t.id}`)])),b=()=>{for(let e=0;e<n.length;e++){let t=f.filter(t=>t.day===e).sort((e,t)=>e.start-t.start),n=[],r=-1,i=()=>{let t=[];for(let r of n){let i=t.findIndex(e=>e<=r.start);i<0&&(i=t.length),t[i]=r.start+r.length;let a=126/n.length,s=y.get(r.id);s&&(s.style.left=`${e*c+3+i*a}px`,s.style.width=`${a-(n.length>1?2:0)}px`,s.style.top=`${r.start*o}px`,s.style.height=`${r.length*o-2}px`)}n=[],r=-1};for(let e of t)n.length&&e.start>=r&&i(),n.push(e),r=Math.max(r,e.start+e.length);n.length&&i()}},x=e=>{let t=y.get(e.id);t&&(t.dataset.slot=m(e));let n=r.querySelector(`[data-part="time-${e.id}"]`);n&&(n.textContent=p(e.start))},S;for(let e of f){let n=y.get(e.id);n&&n.addEventListener(`pointerdown`,r=>{r.isTrusted&&n.setPointerCapture(r.pointerId);let a=t(r,i);S={event:e,el:n,x:a.x,y:a.y,start:e.start},n.style.cursor=`grabbing`,n.style.zIndex=`2`,n.style.boxShadow=`var(--sp-shadow)`,v.dataset.dragging=e.id})}let C=e=>{if(!S)return;let r=t(e,i),a=S.start+(r.y-S.y)/o,l=Math.round(a/d)*d;S.event.start=Math.max(0,Math.min(s-S.event.length,l)),S.event.day=Math.max(0,Math.min(n.length-1,Math.floor(r.x/c))),b(),x(S.event)},w=()=>{S&&=(S.el.style.cursor=`grab`,S.el.style.zIndex=``,S.el.style.boxShadow=``,v.dataset.dragging=`none`,void 0)};v.addEventListener(`pointermove`,C),v.addEventListener(`pointerup`,w),v.addEventListener(`pointercancel`,w),v.dataset.dragging=`none`,b()}export{v as mount};