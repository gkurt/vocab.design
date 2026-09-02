import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{t as n}from"./motion.B5_YXmsy.js";var r={w:250,h:170},i=520,a=60,o=34,s=[`All mail`,`Ferries`,`Receipts`],c={directional:`Deeper comes in from the right, back comes in from the left. The motion is the geography.`,undirected:`Both directions animate identically, so going back feels like going forward again.`},l=()=>`
  <span class="sp-label sp-text--ink" style="font-size: 12px">Mailboxes</span>
  <ul class="sp-nav" style="margin-top: 10px">
    ${s.map((e,n)=>`
      <li>
        <span class="sp-nav-item sp-row sp-row--between" data-part="row-${n+1}" style="gap: 8px">
          <span>${e}</span>
          ${t(`chevronRight`)}
        </span>
      </li>`).join(``)}
  </ul>`,u=()=>`
  <span class="sp-row" data-part="back" style="gap: 4px; color: var(--sp-accent); cursor: pointer">
    ${t(`chevronLeft`)}
    <span class="sp-label" style="font-size: 12px; color: inherit">Mailboxes</span>
  </span>
  <span class="sp-heading" style="display: block; margin-top: 10px; font-size: 14px">Ferries</span>
  <div style="margin-top: 10px">
    ${[92,74,88,66].map(e=>`<span class="sp-line" style="display: block; width: ${e}%; margin-bottom: 9px"></span>`).join(``)}
  </div>`;function d(t,s){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-mode="directional" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Motion</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Transition" data-term="directional" data-part="mode" data-value="directional">
            <button class="sp-segment" type="button" data-part="seg-directional" value="directional">Directional</button>
            <button class="sp-segment" type="button" data-part="seg-undirected" value="undirected">Undirected</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div class="sp-row" style="flex: 0 0 auto; align-items: flex-start; gap: 14px">
            <div
              data-part="view"
              style="position: relative; flex: 0 0 auto; width: ${r.w}px; height: ${r.h}px; overflow: hidden;
                     border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-surface)"
            >
              <div
                class="sp-context" data-part="pane-out"
                style="position: absolute; inset: 0; padding: 12px 14px; background: var(--sp-surface); opacity: 0"
              ></div>
              <div
                data-part="pane" data-subject data-pose="[data-mode=directional]" data-mode="directional"
                data-level="list" data-from="none" data-state="settled"
                style="position: absolute; inset: 0; z-index: 2; padding: 12px 14px; background: var(--sp-surface);
                       will-change: transform"
              >${l()}</div>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
              <span class="sp-label" style="font-size: 11px">Showing</span>
              <span class="sp-text--ink" data-part="where" style="font-size: 15px; font-weight: 600; line-height: 1.2">Mailboxes</span>
            </div>
          </div>

          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="flex: 0 0 auto; height: 32px; font-size: 12px; line-height: 1.3"
          >${c.directional}</span>
        </div>
      </div>
    </div>
  `;let d=e(t,`scene`),f=e(t,`pane`),p=e(t,`pane-out`),m=e(t,`where`),h=e(t,`note`),g=n(t),_=`list`,v=`directional`,y,b,x=e=>e===`list`?l():u(),S=(e,t)=>{s.clearTimeout(y),s.clearTimeout(b);let n=v===`directional`&&!t?-1:1;if(p.innerHTML=f.innerHTML,p.style.transition=`none`,p.style.transform=`translateX(0)`,p.style.opacity=`1`,_=e,f.innerHTML=x(e),f.dataset.level=e,f.dataset.from=n>0?`right`:`left`,m.textContent=e===`list`?`Mailboxes`:`Ferries`,g){f.style.transition=`none`,f.style.transform=`translateX(0)`,f.dataset.state=`settled`,p.style.opacity=`0`;return}f.style.transition=`none`,f.style.transform=`translateX(${n*100}%)`,f.dataset.state=`moving`,y=s.setTimeout(()=>{f.style.transition=`transform ${i}ms var(--sp-ease)`,f.style.transform=`translateX(0)`,p.style.transition=`transform ${i}ms var(--sp-ease), opacity ${i}ms ease`,p.style.transform=`translateX(${-n*o}%)`,p.style.opacity=`0.45`,b=s.setTimeout(()=>{f.dataset.state=`settled`,p.style.opacity=`0`},580)},a)};f.addEventListener(`click`,e=>{let t=e.target.closest(`[data-part]`)?.dataset.part??``;if(t.startsWith(`row`)&&_===`list`)return S(`detail`,!0);if(t===`back`&&_===`detail`)return S(`list`,!1)}),e(t,`mode`).addEventListener(`change`,e=>{v=e.detail,d.dataset.mode=v,f.dataset.mode=v,h.textContent=c[v]})}export{d as mount};