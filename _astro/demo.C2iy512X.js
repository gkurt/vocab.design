import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{r as n}from"./measure.DK7AY2_i.js";var r=48,i=60,a=1e3,o=38,s={idle:`Pull to refresh`,pull:`Pull to refresh`,armed:`Release to refresh`,refreshing:`Refreshing`},c=[[`Ferry ran early, no queue`,`10:22`],[`Fog bank sitting past the bar`,`10:05`],[`Two seals off the slipway`,`9:31`],[`Tide line up on Tuesday`,`9:14`],[`Herring gulls on the west quay`,`9:02`],[`Harbour lights off at dawn`,`8:41`]],l=`height 0.2s var(--sp-ease)`;function u(u,d){let f=c.map(([e,t],n)=>`
      <li class="sp-list-item" data-part="row-${n+1}" style="height: ${o}px">
        <span class="sp-grow">${e}</span>
        <span class="sp-text">${t}</span>
      </li>`).join(``);u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 274px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour watch</span>
          <button class="sp-button sp-button--quiet sp-button--sm" data-part="refresh" type="button">Refresh</button>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; padding: 0; background: var(--sp-surface)">
          <div
            class="sp-row"
            data-part="indicator"
            data-subject
            data-state="idle"
            role="status"
            style="flex: 0 0 auto; height: 0; overflow: hidden; justify-content: center; gap: 8px; background: var(--sp-sunken); transition: ${l}"
          >
            <span data-part="arrow" style="display: inline-flex; color: var(--sp-accent); transition: rotate 0.16s var(--sp-ease)">${t(`chevronDown`)}</span>
            <span class="sp-label" data-part="indicator-text">${s.idle}</span>
          </div>
          <ul class="sp-list sp-scroll sp-grow sp-context" data-part="list" style="padding: 0 4px; touch-action: none">
            ${f}
          </ul>
        </div>
      </div>
    </div>
  `;let p=e(u,`indicator`),m=e(u,`indicator-text`),h=e(u,`arrow`),g=e(u,`list`),_,v=0,y=!1,b=0,x=e=>{p.dataset.state=e,m.textContent=s[e],h.style.rotate=e===`armed`||e===`refreshing`?`180deg`:`0deg`,h.className=e===`refreshing`?`sp-pulse`:``},S=e=>{if(v=Math.min(Math.max(e,0),i),p.style.height=`${v}px`,v===0)return x(`idle`);x(v>=r?`armed`:`pull`)},C=()=>{y||(y=!0,_=void 0,p.style.transition=l,p.style.height=`${r}px`,x(`refreshing`),d.setTimeout(()=>{b+=1,g.insertAdjacentHTML(`afterbegin`,`<li class="sp-list-item" data-part="row-new-${b}" style="height: ${o}px">
           <span class="sp-grow">Lifeboat out on exercise</span>
           <span class="sp-text">Now</span>
         </li>`),y=!1,S(0)},a))};g.addEventListener(`pointerdown`,e=>{y||g.scrollTop>0||(_=n(e,u).y,e.isTrusted&&g.setPointerCapture(e.pointerId),p.style.transition=`none`)}),g.addEventListener(`pointermove`,e=>{_!==void 0&&S(n(e,u).y-_)});let w=()=>{if(_!==void 0){if(_=void 0,p.style.transition=l,v>=r)return C();S(0)}};g.addEventListener(`pointerup`,w),g.addEventListener(`pointercancel`,w),e(u,`refresh`).addEventListener(`click`,C)}export{u as mount};