import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n={x:14,y:40},r={x:294,y:132},i={w:150,h:56},a=1100,o=60,s={clone:`A second object leaves the source and the original stays put, so the new row is traceable to the track that made it.`,move:`Nothing is duplicated: the object itself travels, and the place it came from is left empty behind it.`},c=(e,t)=>`
  <div
    ${e}
    style="position: absolute; width: ${i.w}px; height: ${i.h}px; display: flex; align-items: center; gap: 10px;
           padding: 0 12px; border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-surface); ${t}"
  >
    <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">FM</span>
    <span class="sp-stack" style="gap: 5px; flex: 1 1 auto">
      <span class="sp-label sp-text--ink" style="font-size: 12px">Fathom</span>
      <span class="sp-line" style="width: 62%"></span>
    </span>
  </div>`,l=(e,t,n)=>`
  <div
    class="sp-row sp-context"
    style="position: absolute; left: ${r.x}px; top: ${e}px; width: ${i.w}px; height: 40px; gap: 10px; padding: 0 12px;
           border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-surface)"
  >
    <span class="sp-avatar" style="width: 20px; height: 20px; font-size: 9px">${t}</span>
    <span class="sp-line" style="width: ${n}%"></span>
  </div>`;function u(u,d){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="clone" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Add</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Drag" data-term="clone" data-part="mode" data-value="clone">
            <button class="sp-segment" type="button" data-part="seg-clone" value="clone">Clone</button>
            <button class="sp-segment" type="button" data-part="seg-move" value="move">Move</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="position: relative; padding: 0">
          <span class="sp-label sp-context" style="position: absolute; left: ${n.x}px; top: 12px; font-size: 11px">Library</span>
          <span class="sp-label sp-context" style="position: absolute; left: ${r.x}px; top: 12px; font-size: 11px">Playlist</span>

          <div class="sp-context">
            ${c(`data-part="source-tile" data-tenant="kept"`,`left: ${n.x}px; top: ${n.y}px`)}
          </div>

          ${l(40,`HL`,58)}
          ${l(86,`RS`,72)}

          <span
            class="sp-context" data-part="slot"
            style="position: absolute; left: ${r.x}px; top: ${r.y}px; width: ${i.w}px; height: ${i.h}px;
                   border: 1px dashed var(--sp-line); border-radius: 8px"
          ></span>

          <div
            class="sp-row sp-context"
            style="position: absolute; left: ${n.x}px; top: 112px; width: 170px; gap: 6px; color: var(--sp-muted)"
          >
            <span class="sp-label sp-text--ink" data-part="tenancy" style="font-size: 11px">original kept</span>
          </div>

          ${c(`data-part="flier" data-subject data-pose="[data-mode=clone]" data-mode="clone" data-state="landed"`,`left: ${r.x}px; top: ${r.y}px; border-color: var(--sp-accent); background: var(--sp-accent-soft);
             will-change: transform; z-index: 2`)}

          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="position: absolute; left: ${n.x}px; right: ${n.x}px; top: 200px; height: 32px;
                   font-size: 12px; line-height: 1.35"
          >${s.clone}</span>
        </div>
      </div>
    </div>
  `;let f=e(u,`scene`),p=e(u,`flier`),m=e(u,`source-tile`),h=e(u,`tenancy`),g=e(u,`note`),_=t(u),v=n.x-r.x,y=n.y-r.y,b=`clone`,x,S,C=(e,t)=>{p.style.transition=t>0?`transform ${t}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${t}ms ease`:`none`,p.style.transform=e===`source`?`translate(${v}px, ${y}px)`:`translate(0px, 0px)`,p.style.boxShadow=e===`source`?`none`:`var(--sp-shadow)`},w=e=>{m.dataset.tenant=e?`kept`:`empty`,m.style.opacity=e?`1`:`0.25`,m.style.borderStyle=e?`solid`:`dashed`,h.textContent=e?`original kept`:`original gone`},T=()=>{if(d.clearTimeout(x),d.clearTimeout(S),f.dataset.mode=b,p.dataset.mode=b,g.textContent=s[b],_){C(`slot`,0),p.dataset.state=`landed`,w(b===`clone`);return}C(`source`,0),p.dataset.state=`at-source`,w(!0),x=d.setTimeout(()=>{C(`slot`,a),p.dataset.state=`flying`,w(b===`clone`),S=d.setTimeout(()=>{p.dataset.state=`landed`},1180)},o)};e(u,`mode`).addEventListener(`change`,e=>{b=e.detail,T()}),e(u,`replay`).addEventListener(`click`,T),T()}export{u as mount};