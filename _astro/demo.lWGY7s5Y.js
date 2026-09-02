import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:300,h:160},r=26,i=20,a=[{shape:`L`,key:`back`,glyph:`←`,name:`Back`},{shape:`R`,key:`forward`,glyph:`→`,name:`Forward`},{shape:`DR`,key:`close`,glyph:`↓→`,name:`Close tab`}],o=(e,t,n)=>`
  <span
    data-part="${e}"
    aria-hidden="true"
    style="position: absolute; left: ${t-7}px; top: ${n-7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Browser</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 10px">
          <div
            class="sp-surface"
            data-part="pad"
            data-subject
            data-armed="no"
            data-command="none"
            style="position: relative; flex: 0 0 auto; width: ${n.w+2}px; height: ${n.h+2}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span class="sp-context" style="position: absolute; inset: 0; pointer-events: none">
              <span class="sp-line" style="position: absolute; left: 14px; top: 14px; width: 148px"></span>
              <span class="sp-line" style="position: absolute; left: 14px; top: 28px; width: 96px"></span>
              <span class="sp-line" style="position: absolute; left: 14px; top: 138px; width: 176px"></span>
              <span class="sp-line" style="position: absolute; left: 200px; top: 138px; width: 86px"></span>
            </span>

            <div data-part="trail" style="position: absolute; inset: 0; pointer-events: none; z-index: 2">
              <svg viewBox="0 0 ${n.w} ${n.h}" width="${n.w}" height="${n.h}" style="display: block" aria-hidden="true">
                <polyline points="" fill="none" stroke="var(--sp-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
              </svg>
            </div>

            <span style="position: absolute; inset: 0; pointer-events: none; z-index: 3">
              ${o(`start`,150,44)}
              ${o(`mark-left`,54,44)}
              ${o(`mark-right`,246,44)}
              ${o(`mark-down`,150,124)}
              ${o(`mark-corner`,238,124)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
            <span class="sp-label">Strokes</span>
            ${a.map(e=>`
              <div class="sp-row" style="gap: 8px">
                <span class="sp-text sp-text--ink" style="width: 24px; font-size: 13px">${e.glyph}</span>
                <span class="sp-text" style="font-size: 12px; white-space: nowrap">${e.name}</span>
              </div>`).join(``)}
            <div class="sp-divider"></div>
            <span class="sp-label">Recognized</span>
            <span class="sp-heading" data-part="command" style="font-size: 13px">Nothing yet</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`pad`),l=e(s,`command`),u=e(s,`trail`).querySelector(`polyline`),d=!1,f=[],p={x:0,y:0},m=[],h=0,g=e=>{let n=t(e,c);return{x:n.x-c.clientLeft,y:n.y-c.clientTop}},_=()=>{u.setAttribute(`points`,f.map(e=>`${Math.round(e.x)},${Math.round(e.y)}`).join(` `))},v=(e,t)=>Math.abs(e)>=Math.abs(t)?e<0?`L`:`R`:t<0?`U`:`D`,y=e=>{d=!0,f=[e],p=e,m=[],h=0,c.dataset.armed=`yes`,c.dataset.command=`none`,l.textContent=`Drawing`,_()},b=e=>{let t=f.at(-1);t&&(h+=Math.hypot(e.x-t.x,e.y-t.y)),f.push(e),_();let n=e.x-p.x,i=e.y-p.y;if(Math.hypot(n,i)<r)return;let a=v(n,i);m.at(-1)!==a&&m.push(a),p=e},x=()=>{d=!1,c.dataset.armed=`no`;let e=a.find(e=>e.shape===m.join(``));if(!e){c.dataset.command=`unknown`,l.textContent=`No match`;return}c.dataset.command=e.key,l.textContent=e.name};c.addEventListener(`contextmenu`,e=>e.preventDefault()),c.addEventListener(`pointerdown`,e=>{if(e.button===2&&!d)return e.isTrusted&&c.setPointerCapture(e.pointerId),y(g(e))}),s.addEventListener(`pointermove`,e=>{d&&b(g(e))}),c.addEventListener(`pointerup`,e=>{if(!(!d||e.button!==2)){if(h<i){d=!1,c.dataset.armed=`no`,l.textContent=`Nothing yet`;return}x()}}),c.addEventListener(`pointercancel`,()=>{d&&(d=!1,c.dataset.armed=`no`)})}export{s as mount};