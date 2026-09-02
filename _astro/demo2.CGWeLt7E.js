import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{r as n}from"./measure.DK7AY2_i.js";var r=[{name:`dot-close`,fill:`#ff5f57`},{name:`dot-min`,fill:`#febc2e`},{name:`dot-zoom`,fill:`#28c840`}],i=({name:e,fill:t})=>`
  <span
    data-part="${e}"
    data-fill="${t}"
    aria-hidden="true"
    style="width: 12px; height: 12px; border-radius: 50%; background: ${t}; box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.16)"
  ></span>`,a=(e,t,n)=>`
  <button class="sp-icon-button" type="button" data-part="${e}" aria-label="${t}" style="width: 26px; height: 26px">${n}</button>`,o={classic:`Classic: the title sits centred in a strip of its own, the tools below it.`,unified:`Unified: one strip carries the window name and the document tools together.`,inactive:`Inactive: this window is not frontmost, so the strip dims and the document does not.`};function s(s){s.innerHTML=`
    <div class="sp-app">
      <div
        class="sp-frame sp-frame--wide"
        data-part="window"
        data-register="classic"
        style="width: 452px; height: 206px; box-shadow: var(--sp-shadow)"
      >
        <div
          class="sp-topbar"
          data-part="bar"
          data-subject
          data-register="classic"
          style="height: 46px; padding: 0 10px; gap: 0; cursor: move"
        >
          <div class="sp-context" data-part="controls" style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; width: 100px">
            ${r.map(i).join(``)}
          </div>
          <div data-part="title-slot" style="position: relative; flex: 1 1 auto; min-width: 0; height: 18px">
            <span
              data-part="title"
              data-place="centre"
              style="position: absolute; inset: 0; font-size: 12px; font-weight: 500; line-height: 18px; text-align: center;
                     white-space: nowrap; overflow: hidden"
            >Notes on lighting</span>
          </div>
          <div data-part="slot-bar" style="display: flex; align-items: center; justify-content: flex-end; gap: 4px; flex: 0 0 auto; width: 100px; height: 26px"></div>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px; padding: 0 14px 14px">
          <div
            data-part="slot-row"
            style="display: flex; align-items: center; gap: 4px; flex: 0 0 auto; height: 38px; margin: 0 -14px; padding: 0 12px;
                   border-bottom: 1px solid var(--sp-line)"
          >
            <div class="sp-row" data-part="tools" data-in="row" style="gap: 4px">
              ${a(`tool-search`,`Search the document`,t(`search`))}
              ${a(`tool-edit`,`Edit`,t(`pencil`))}
              ${a(`tool-share`,`Share`,t(`share`))}
            </div>
          </div>

          <span class="sp-heading" style="font-size: 13px">Warm lamps, cold windows</span>
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 94%"></div>
          <div class="sp-line" style="width: 98%"></div>
          <div class="sp-line" style="width: 58%"></div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-axis="Title bar" data-part="picker" data-value="classic">
          <button class="sp-segment" type="button" data-part="seg-classic" value="classic" style="padding: 4px 10px; font-size: 12px">Classic</button>
          <button class="sp-segment" type="button" data-part="seg-unified" value="unified" style="padding: 4px 10px; font-size: 12px">Unified</button>
          <button class="sp-segment" type="button" data-part="seg-inactive" value="inactive" style="padding: 4px 10px; font-size: 12px">Inactive</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-register="classic"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${o.classic}</span>
      
    </div>
  `;let c=e(s,`window`),l=e(s,`bar`),u=e(s,`title`),d=e(s,`tools`),f=e(s,`slot-row`),p=e(s,`controls`),m=e(s,`note`),h=r.map(t=>e(s,t.name)),g=t=>{let n=t===`unified`,i=t!==`inactive`;d.dataset.in=n?`bar`:`row`,e(s,n?`slot-bar`:`slot-row`).append(d),f.style.borderBottom=n?`1px solid transparent`:`1px solid var(--sp-line)`,u.dataset.place=n?`left`:`centre`,u.style.textAlign=n?`left`:`center`,p.style.width=n?`64px`:`100px`,l.style.background=i?`var(--sp-surface)`:`var(--sp-sunken)`,u.style.color=i?`var(--sp-ink)`:`var(--sp-muted)`;for(let[e,t]of h.entries())t.style.background=i?r[e]?.fill??``:`var(--sp-line)`;c.style.boxShadow=i?`var(--sp-shadow)`:`none`,l.dataset.register=t,c.dataset.register=t,m.dataset.register=t,m.textContent=o[t]??``};e(s,`picker`).addEventListener(`change`,e=>g(e.detail));let _,v={x:0,y:0},y=(e,t)=>Math.min(t,Math.max(-t,e));l.addEventListener(`pointerdown`,e=>{e.target?.closest(`button`)||(e.isTrusted&&l.setPointerCapture(e.pointerId),_={...n(e,s),dx:v.x,dy:v.y})}),s.addEventListener(`pointermove`,e=>{if(!_)return;let t=n(e,s);v={x:y(_.dx+t.x-_.x,34),y:y(_.dy+t.y-_.y,18)},c.style.translate=`${v.x}px ${v.y}px`});let b=()=>{_=void 0};s.addEventListener(`pointerup`,b),s.addEventListener(`pointercancel`,b),g(`classic`)}export{s as mount};