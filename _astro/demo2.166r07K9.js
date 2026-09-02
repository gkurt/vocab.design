import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{r as n}from"./measure.DK7AY2_i.js";var r={drag:`Dragging is the only route to the other column. Criterion 2.5.7 is about this gesture specifically, so a board that is perfectly keyboard operable still fails here.`,both:`Two routes, one result. The menu is the route somebody with a tremor, a head pointer, or one finger on a moving train can actually take.`},i=`height: 38px; padding: 0 8px; display: flex; align-items: center; gap: 6px; border-radius: 6px`;function a(a){let o=(e,t)=>`
    <div class="sp-surface sp-context" style="${i}">
      <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 11.5px">${e}</span>
      <span class="sp-label" style="font-size: 9.5px">${t}</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Board offers" data-term="both" data-part="offered" data-value="both">
            <button class="sp-segment" type="button" data-part="seg-drag" value="drag"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Drag only</button>
            <button class="sp-segment" type="button" data-part="seg-both" value="both"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Drag or a menu</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="board"
             style="margin-top: 8px; height: 132px; gap: 8px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="col-todo"
               style="flex: 1 1 0; min-width: 0; padding: 8px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">To do</span>
            <div data-part="slot-todo" style="height: 38px"></div>
            ${o(`Draft the changelog`,`Fri`)}
          </div>
          <div class="sp-surface sp-context" data-part="col-doing"
               style="flex: 1 1 0; min-width: 0; padding: 8px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">Doing</span>
            <div data-part="slot-doing" style="height: 38px"></div>
            ${o(`Rebuild the index`,`Wed`)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="both"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${r.both}</p>
      </div>
    </div>
  `;let s=document.createElement(`div`);s.className=`sp-surface`,s.dataset.part=`card-a`,s.dataset.col=`todo`,s.setAttribute(`style`,`${i}; position: relative; touch-action: none; cursor: grab`),s.innerHTML=`
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 11.5px">Fix the invoice total</span>
    <span style="flex: 0 0 46px; display: flex; justify-content: flex-end">
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="move-a" data-subject
              data-pose="[data-mode=both]" data-mode="both"
              style="padding: 2px 8px; font-size: 10.5px">Move</button>
    </span>
    <div class="sp-menu" data-part="menu" role="menu"
         style="top: 100%; left: 0; margin-top: 4px; min-width: 150px; z-index: 4">
      <button class="sp-menu-item" type="button" data-part="item-todo" role="menuitem"
              style="font-size: 11.5px; padding: 5px 8px">Move to To do</button>
      <button class="sp-menu-item" type="button" data-part="item-doing" role="menuitem"
              style="font-size: 11.5px; padding: 5px 8px">Move to Doing</button>
    </div>
  `,e(a,`slot-todo`).append(s);let c=e(a,`move-a`),l=e(a,`menu`),u=e(a,`caption`),d={todo:{col:e(a,`col-todo`),slot:e(a,`slot-todo`)},doing:{col:e(a,`col-doing`),slot:e(a,`slot-doing`)}},f=e=>t(l,`data-open`,e),p=(e,t)=>{d[e]?.slot.append(s),s.dataset.col=e,s.dataset.how=t},m=e=>{f(!1),t(c,`hidden`,e===`drag`),c.dataset.mode=e,u.dataset.mode=e,u.textContent=r[e],p(`todo`,`none`)};m(`both`),c.addEventListener(`click`,()=>f(!0)),e(a,`item-todo`).addEventListener(`click`,()=>{p(`todo`,`menu`),f(!1)}),e(a,`item-doing`).addEventListener(`click`,()=>{p(`doing`,`menu`),f(!1)});let h;s.addEventListener(`pointerdown`,e=>{c.contains(e.target)||l.contains(e.target)||(e.isTrusted&&s.setPointerCapture(e.pointerId),h=n(e,a),s.style.zIndex=`3`,s.style.boxShadow=`var(--sp-shadow)`)}),a.addEventListener(`pointermove`,e=>{if(!h)return;let t=n(e,a);s.style.translate=`${t.x-h.x}px ${t.y-h.y}px`});let g=e=>{if(!h)return;h=void 0,s.style.translate=``,s.style.zIndex=``,s.style.boxShadow=``;let t=Object.entries(d).find(([,{col:t}])=>{let n=t.getBoundingClientRect();return e.clientX>=n.left&&e.clientX<=n.right&&e.clientY>=n.top&&e.clientY<=n.bottom});t&&p(t[0],`drag`)};a.addEventListener(`pointerup`,g),a.addEventListener(`pointercancel`,g),e(a,`offered`).addEventListener(`change`,e=>{m(e.detail)})}export{a as mount};