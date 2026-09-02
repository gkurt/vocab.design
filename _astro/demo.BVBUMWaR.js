import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=460,i=276,a=210,o=90,s=8,c=14,l=15,u=[`A`,`B`,`C`],d=[1,2,3,4,5,6],f={A:`Aisle side, extra legroom`,B:`Middle block, standard`,C:`Rear block, reclines`},p=(e,t,n)=>Math.min(Math.max(e,t),n);function m(m){m.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${r}px; height: ${i}px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Coastal Flyer 118</span>
          <span class="sp-label" style="font-size: 11px">Rows 12 to 14</span>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div
            class="sp-grid"
            data-part="map"
            style="grid-template-columns: repeat(6, 54px); gap: 8px; flex: 0 0 auto; margin: 0 auto"
          >${u.map(e=>d.map(t=>`
        <button
          class="sp-button sp-button--ghost"
          type="button"
          data-part="seat-${e}${t}"
          data-seat="${e}${t}"
          aria-haspopup="dialog"
          style="width: 54px; height: 38px; padding: 0; font-size: 12px"
        >${e}${t}</button>`).join(``)).join(``)}</div>
          <span class="sp-grow"></span>
          <!-- Somewhere in the fiction to press that is not a seat and not the panel, which is
               how this popover is dismissed the second time. It used to be the caption, and the
               caption is drawn out in the strip now (SPEC §5.1), where a press reaches chrome and
               the specimen never hears it. No paint of its own, and it keeps the row the caption
               held so the map sits where it always did (SPEC §5). -->
          <span data-part="aim-away" aria-hidden="true" style="flex: 0 0 auto; height: 22px"></span>
          <span class="sp-label" data-stage-verdict data-part="caption" style="flex: 0 0 auto; height: 22px; font-size: 11px; line-height: 22px">
            The panel is placed against the room each seat leaves.
          </span>
        </div>

        <div
          class="sp-surface sp-context"
          data-part="panel"
          role="dialog"
          aria-label="Seat detail"
          style="position: absolute; width: ${a}px; height: ${o}px; padding: 10px; box-shadow: var(--sp-shadow);
                 opacity: 0; visibility: hidden; transition: opacity 0.16s, visibility 0.16s, left 0.2s var(--sp-ease), top 0.2s var(--sp-ease)"
        >
          <div class="sp-row">
            <span class="sp-heading sp-grow" data-part="panel-title" style="font-size: 13px">Seat A1</span>
            <button class="sp-icon-button" type="button" data-part="close" aria-label="Close" style="width: 24px; height: 24px">${n(`close`)}</button>
          </div>
          <span class="sp-text" data-part="panel-detail" style="display: block; margin-top: 5px; font-size: 12px">${f.A}</span>

          <span
            data-part="arrow"
            data-subject
            data-side="top"
            data-align="centre"
            aria-hidden="true"
            style="position: absolute; left: 50%; width: ${l}px; height: ${l}px; margin-left: ${-15/2}px;
                   background: var(--sp-surface); border: 0 solid var(--sp-line); transform: rotate(45deg);
                   transition: left 0.2s var(--sp-ease)"
          ></span>
        </div>
      </div>
    </div>
  `;let h=e(m,`panel`),g=e(m,`arrow`),_=e(m,`panel-title`),v=e(m,`panel-detail`),y=[...e(m,`map`).children],b=e=>{h.style.opacity=e?`1`:`0`,h.style.visibility=e?`visible`:`hidden`},x=e=>{let t=e.offsetLeft+e.offsetWidth/2,n=e.offsetTop+e.offsetHeight+s,r=n+o>262,i=r?e.offsetTop-s-o:n,l=p(t-a/2,c,236);h.style.top=`${i}px`,h.style.left=`${l}px`;let u=p(t-l,18,192);g.style.left=`${u}px`,g.dataset.side=r?`bottom`:`top`,g.dataset.align=u<93?`start`:u>117?`end`:`centre`,r?(g.style.top=`auto`,g.style.bottom=`${-15/2}px`,g.style.borderWidth=`0 1px 1px 0`):(g.style.bottom=`auto`,g.style.top=`${-15/2}px`,g.style.borderWidth=`1px 0 0 1px`)},S=e=>{x(e);let n=e.dataset.seat??``;_.textContent=`Seat ${n}`,v.textContent=f[n.slice(0,1)]??``;for(let n of y)t(n,`data-selected`,n===e);b(!0)};for(let e of y)e.addEventListener(`click`,()=>S(e));let C=()=>{b(!1);for(let e of y)t(e,`data-selected`,!1)};e(m,`close`).addEventListener(`click`,C),m.addEventListener(`pointerdown`,e=>{let t=e.target;t&&(h.contains(t)||t.closest(`[data-seat]`))||C()}),m.addEventListener(`keydown`,e=>{e.key===`Escape`&&C()});let w=y[0];w&&x(w),b(!1)}export{m as mount};