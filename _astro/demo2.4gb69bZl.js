import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={w:434,h:170},r=300,i={sheet:{box:{left:`0`,right:`0`,top:`auto`,bottom:`0`,width:`auto`,height:`124px`,radius:`14px 14px 0 0`},closed:`translateY(100%)`,open:`translateY(0)`,fades:!1,note:`A sheet rises from the bottom edge and stops short of the top, and it leaves through the same edge.`},zoom:{box:{left:`50%`,right:`auto`,top:`50%`,bottom:`auto`,width:`260px`,height:`124px`,radius:`10px`},closed:`translate(-50%, -50%) scale(0.92)`,open:`translate(-50%, -50%) scale(1)`,fades:!0,note:`A centred zoom and fade grows in place, then shrinks back into it. This is the shape an alert uses.`},cover:{box:{left:`0`,right:`0`,top:`0`,bottom:`0`,width:`auto`,height:`auto`,radius:`0`},closed:`translateY(100%)`,open:`translateY(0)`,fades:!1,note:`A full-screen cover takes the whole scene, so the screen behind is out of sight rather than dimmed.`}},a=e=>e.map(e=>`<span class="sp-line" style="display: block; width: ${e}%; margin-bottom: 9px"></span>`).join(``);function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="sheet" data-state="closed" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Presentation</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="sheet" data-axis="Style">
            <button class="sp-segment" type="button" data-part="seg-sheet" value="sheet">Sheet</button>
            <button class="sp-segment" type="button" data-part="seg-zoom" value="zoom">Zoom</button>
            <button class="sp-segment" type="button" data-part="seg-cover" value="cover">Cover</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            data-part="stage-view"
            style="position: relative; flex: 0 0 auto; width: ${n.w}px; height: ${n.h}px; overflow: hidden;
                   border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
          >
            <div
              class="sp-context" data-part="behind"
              style="position: absolute; inset: 0; padding: 14px 16px; background: var(--sp-surface);
                     transform-origin: 50% 50%"
            >
              <span class="sp-heading" style="font-size: 14px">Profile</span>
              <div style="margin-top: 12px; width: 250px">${a([88,64,92])}</div>
              <button
                class="sp-button sp-button--sm" type="button" data-part="open"
                style="position: absolute; left: 16px; bottom: 14px"
              >Edit profile</button>
            </div>

            <span
              data-part="scrim"
              style="position: absolute; inset: 0; background: var(--sp-scrim); opacity: 0; visibility: hidden;
                     pointer-events: none"
            ></span>

            <div
              data-part="modal" data-subject
              style="position: absolute; display: flex; flex-direction: column; gap: 6px; padding: 12px 14px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); box-shadow: var(--sp-shadow);
                     visibility: hidden; will-change: transform"
            >
              <span class="sp-heading" style="font-size: 14px">Edit profile</span>
              <span class="sp-text" style="font-size: 12px; line-height: 1.35">
                Your name and photo are visible to everyone on your team.
              </span>
              <button
                class="sp-button sp-button--sm" type="button" data-part="done"
                style="align-self: flex-start; margin-top: auto"
              >Done</button>
            </div>
          </div>

          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="flex: 0 0 auto; height: 32px; font-size: 12px; line-height: 1.3"
          >${i.sheet.note}</span>
        </div>
      </div>
    </div>
  `;let c=e(o,`scene`),l=e(o,`behind`),u=e(o,`scrim`),d=e(o,`modal`),f=e(o,`note`),p=t(o),m=`sheet`,h,g=`transform ${r}ms var(--sp-ease), opacity ${r}ms ease, visibility ${r}ms`,_=()=>{let e=i[m],t=d.style;t.transition=`none`,t.left=e.box.left,t.right=e.box.right,t.top=e.box.top,t.bottom=e.box.bottom,t.width=e.box.width,t.height=e.box.height,t.borderRadius=e.box.radius,t.transform=e.closed,t.opacity=e.fades?`0`:`1`,t.visibility=`hidden`,f.textContent=e.note},v=e=>{s.clearTimeout(h);let t=i[m];c.dataset.state=e?`presenting`:`dismissing`,d.style.transition=g,d.style.visibility=e?`visible`:`hidden`,d.style.transform=e?t.open:t.closed,d.style.opacity=e||!t.fades?`1`:`0`,l.style.transition=`transform ${r}ms var(--sp-ease)`,l.style.transform=e?`scale(0.94)`:`scale(1)`,u.style.transition=`opacity ${r}ms ease, visibility ${r}ms`,u.style.opacity=e?`1`:`0`,u.style.visibility=e?`visible`:`hidden`,h=s.setTimeout(()=>{c.dataset.state=e?`presented`:`closed`},p?0:360)};e(o,`open`).addEventListener(`click`,()=>v(!0)),e(o,`done`).addEventListener(`click`,()=>v(!1)),e(o,`mode`).addEventListener(`change`,e=>{m=e.detail,s.clearTimeout(h),c.dataset.mode=m,c.dataset.state=`closed`,l.style.transition=`none`,l.style.transform=`scale(1)`,u.style.transition=`none`,u.style.opacity=`0`,u.style.visibility=`hidden`,_()}),_()}export{o as mount};