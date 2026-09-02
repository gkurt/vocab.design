import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=440,n=176,r=30,i=72,a=58,o=240,s=`width 0.34s var(--sp-ease)`,c=`left 0.34s var(--sp-ease)`,l=[{key:`single`,label:`single`,share:100,neighbour:`none`},{key:`split`,label:`split`,share:a,neighbour:`beside`},{key:`floating`,label:`floating`,share:100,neighbour:`floating`}],u=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 11px; font-size: 11px">
    ${e.label}
  </button>`,d=(e,t=5)=>`<div style="display: flex; flex-direction: column; gap: ${t}px">${e.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``)}</div>`;function f(a){let f=l[0];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Tablet</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-value="${f.key}" data-axis="Mode">
            ${l.map(u).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 10px 12px">
          <div
            data-part="screen"
            class="sp-context"
            style="position: relative; flex: 0 0 auto; width: ${t}px; height: ${n}px; overflow: hidden;
                   background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              data-part="app"
              data-subject
              data-mode="${f.key}"
              data-size="expanded"
              style="position: absolute; top: 0; bottom: 0; left: 0; width: ${f.share}%; display: flex; overflow: hidden;
                     background: var(--sp-surface); transition: ${s}"
            >
              <div
                data-part="rail"
                style="display: flex; flex-direction: column; gap: 4px; flex: 0 0 92px; padding: 8px 7px; overflow: hidden;
                       border-right: 1px solid var(--sp-line)"
              >
                <span class="sp-nav-item" data-current style="font-size: 11px">Berths</span>
                <span class="sp-nav-item" style="font-size: 11px">Tides</span>
                <span class="sp-nav-item" style="font-size: 11px">Permits</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-width: 0; padding: 9px 10px; overflow: hidden">
                <span class="sp-heading" style="font-size: 12px">Berth register</span>
                ${d([94,80,88,70,84,62])}
              </div>
            </div>

            <div
              data-part="divider"
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize the split"
              style="position: absolute; top: 0; bottom: 0; left: calc(${f.share}% - 4px); width: 8px; display: flex;
                     align-items: center; justify-content: center; background: var(--sp-sunken); cursor: col-resize;
                     touch-action: none; transition: ${c}"
            ><span aria-hidden="true" style="width: 3px; height: 26px; border-radius: 999px; background: var(--sp-line)"></span></div>

            <div
              data-part="neighbour"
              class="sp-context"
              style="position: absolute; top: 0; bottom: 0; right: 0; width: 42%; display: flex; flex-direction: column;
                     gap: 7px; padding: 9px 10px; overflow: hidden; background: var(--sp-surface)"
            >
              <span class="sp-heading" data-part="neighbour-title" style="font-size: 12px">Notes</span>
              ${d([88,66,78])}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 20px; width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let p=e(a,`app`),m=e(a,`rail`),h=e(a,`divider`),g=e(a,`neighbour`),_=e(a,`readout`),v=f,y=f.share,b=()=>{let e=Math.round(t*y/100),n=e<o;p.dataset.mode=v.key,p.dataset.size=n?`compact`:`expanded`,p.style.width=`${y}%`,m.hidden=n,h.hidden=v.neighbour!==`beside`,h.style.left=`calc(${y}% - 4px)`,g.hidden=v.neighbour===`none`;let r=v.neighbour===`floating`;g.style.top=r?`auto`:`0`,g.style.bottom=r?`13px`:`0`,g.style.right=r?`13px`:`0`,g.style.width=r?`170px`:`${100-y}%`,g.style.height=r?`112px`:`auto`,g.style.borderRadius=r?`var(--sp-radius)`:`0`,g.style.border=r?`1px solid var(--sp-line)`:`0`,g.style.boxShadow=r?`0 6px 20px rgb(16 24 40 / 0.28)`:`none`,_.textContent=`App window: ${e} px, ${n?`compact`:`expanded`}.`},x=e=>{let t=l.find(t=>t.key===e);t&&(v=t,y=t.share,b())};e(a,`modes`).addEventListener(`change`,e=>x(e.detail));let S;h.addEventListener(`pointerdown`,e=>{e.isTrusted&&h.setPointerCapture(e.pointerId);let t=h.getBoundingClientRect();S=e.clientX-(t.left+t.width/2)}),a.addEventListener(`pointermove`,t=>{if(S===void 0)return;let n=e(a,`screen`).getBoundingClientRect();if(n.width===0)return;let o=(t.clientX-S-n.left)/n.width*100;y=Math.round(Math.min(i,Math.max(r,o))),h.style.transition=`none`,p.style.transition=`none`,b()});let C=()=>{S!==void 0&&(S=void 0,h.style.transition=c,p.style.transition=s)};a.addEventListener(`pointerup`,C),a.addEventListener(`pointercancel`,C),b()}export{f as mount};