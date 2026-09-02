import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=200,n=[[`Ada`,`Ferry at 6 or the later one?`],[`Ada`,`The later one gets in after the shops shut`],[`Sam`,`Six then. I will bring the tickets`],[`Ada`,`Is the harbour car park still closed?`],[`Sam`,`Reopened last week`],[`Ada`,`Perfect. Meet at the slipway`],[`Sam`,`Bring the tide table`],[`Ada`,`Already in the bag`]],r=7,i={default:`overscroll-behavior: auto (the default): the leftover goes to the page`,contain:`overscroll-behavior: contain: the leftover stops here`};function a(a){let o=n.map(([e,t])=>`
      <li class="sp-list-item" style="align-items: flex-start; padding: 7px 8px">
        <span class="sp-label" style="width: 32px">${e}</span>
        <span class="sp-grow sp-text sp-text--ink" style="font-size: 12px">${t}</span>
      </li>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour notes</span>
          <span class="sp-text" data-part="readout" style="width: 200px; text-align: right; white-space: nowrap">Room left in the panel</span>
        </div>
        <div class="sp-body" style="position: relative; padding: 0">
          <div
            class="sp-context"
            data-part="page"
            data-moved="no"
            style="position: absolute; inset: 0; overflow: hidden; padding: 12px 14px"
          >
            <div data-part="page-content">${Array.from({length:r},(e,t)=>`
      <div class="sp-stack" style="gap: 6px; margin-bottom: 14px">
        <span class="sp-heading" style="font-size: 13px">Section ${t+1}</span>
        <span class="sp-line" style="width: 100%"></span>
        <span class="sp-line" style="width: 92%"></span>
        <span class="sp-line" style="width: 78%"></span>
      </div>`).join(``)}</div>
          </div>
          <div
            class="sp-scroll sp-surface"
            data-part="panel"
            data-subject
            data-pose="[data-mode=default]"
            data-mode="default"
            data-chain="room"
            style="position: absolute; right: 10px; top: 10px; bottom: 10px; width: 214px; box-shadow: var(--sp-shadow); scrollbar-width: none"
          >
            <div data-part="panel-content" style="transform: translateY(0px)">
              <ul class="sp-list" style="padding: 4px 5px">${o}</ul>
              <div data-part="spare" aria-hidden="true" style="height: ${t}px"></div>
            </div>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="gap: 10px; border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label" style="width: 44px">Panel</span>
          <div class="sp-progress" data-part="panel-ruler" style="width: 74px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
          <span class="sp-label" style="width: 34px">Page</span>
          <div class="sp-progress" data-part="page-ruler" style="width: 74px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
          <sp-segmented data-stage-mode class="sp-segmented sp-grow" data-part="mode" data-value="default" data-axis="Overscroll" data-term="default" style="justify-content: flex-end">
            <button class="sp-segment" data-part="mode-default" value="default" style="padding: 5px 10px">auto</button>
            <button class="sp-segment" data-part="mode-contain" value="contain" style="padding: 5px 10px">contain</button>
          </sp-segmented>
        </div>
      </div>
      <span class="sp-label sp-context" data-stage-verdict data-part="caption">${i.default}</span>
    </div>
  `;let s=e(a,`panel`),c=e(a,`panel-content`),l=e(a,`page`),u=e(a,`readout`),d=e(a,`caption`),f=e(a,`panel-ruler`).firstElementChild,p=e(a,`page-ruler`).firstElementChild,m=Math.max(1,s.scrollHeight-s.clientHeight-t),h=Math.max(1,l.scrollHeight-l.clientHeight),g=(e,t)=>e.style.setProperty(`--sp-value`,`${Math.min(1,t)*100}%`),_=()=>{let e=Math.min(s.scrollTop,m),t=Math.max(0,s.scrollTop-m);if(c.style.transform=`translateY(${t}px)`,g(f,e/m),t===0){l.scrollTop=0,l.dataset.moved=`no`,g(p,0),s.dataset.chain=`room`,u.textContent=`Room left in the panel`;return}if(s.dataset.mode===`contain`){l.dataset.moved=`no`,g(p,0),s.dataset.chain=`blocked`,u.textContent=`${Math.round(t)} px spent on nothing`;return}l.scrollTop=Math.min(h,t),l.dataset.moved=`yes`,g(p,l.scrollTop/h),s.dataset.chain=`chained`,u.textContent=`${Math.round(t)} px handed to the page`};s.addEventListener(`scroll`,_),e(a,`mode`).addEventListener(`change`,e=>{let t=e.detail===`contain`?`contain`:`default`;s.dataset.mode=t,d.textContent=i[t],s.scrollTop=0,_()})}export{a as mount};