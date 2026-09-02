import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{r as n}from"./measure.DK7AY2_i.js";import{t as r}from"./motion.B5_YXmsy.js";var i={w:184,h:198},a=18,o=84,s=.28,c=22,l=280,u=`repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 9px)`,d=[{title:`Home`,lines:[86,62,78]},{title:`Inbox`,lines:[92,70,84,58]},{title:`Ferry timetable`,lines:[94,76,88,54,70]}],f=(e,t,n)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-4}px; top: ${n-4}px; width: 8px; height: 8px;
           border-radius: 50%; background: var(--sp-ink); opacity: 0.55"
  ></span>`,p=(e,n)=>{let r=d[e];return r?`
    <div class="sp-row" style="gap: 4px; color: var(--sp-muted)">
      ${n?t(`chevronLeft`):``}
      <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 500">${r.title}</span>
    </div>
    <div class="sp-stack" style="margin-top: 10px; gap: 8px">
      ${r.lines.map(e=>`<div class="sp-line" style="width: ${e}%"></div>`).join(``)}
    </div>`:`<span class="sp-label" style="font-size: 11px">Nothing further back</span>`};function m(t,m){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Back</span>
          <span class="sp-label" data-part="stackline" style="font-size: 11px">Home · Inbox · Ferry timetable</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 14px; padding: 12px">
          <div
            class="sp-context" data-part="device" data-top="article" data-outcome="none" data-preview="none"
            style="flex: 0 0 auto; padding: 8px; background: var(--sp-ink); border-radius: 26px"
          >
            <div
              data-part="viewport"
              data-touch
              style="position: relative; width: ${i.w}px; height: ${i.h}px; background: var(--sp-sunken);
                     border-radius: 19px; overflow: hidden; touch-action: none; user-select: none"
            >
              <div data-part="behind" style="position: absolute; inset: 0; padding: 16px 14px 12px 12px">${p(1,!1)}</div>

              <div
                data-part="screen" data-subject data-pose=":not([data-state=committing])" data-state="rested"
                style="position: absolute; inset: 0; padding: 16px 14px 12px 26px; background: var(--sp-surface);
                       box-shadow: -8px 0 16px rgb(16 24 40 / 0.22); transform: none; will-change: transform"
              >${p(2,!0)}</div>

              <span
                data-part="threshold"
                style="position: absolute; left: ${o}px; top: 0; bottom: 0; width: 2px; background: var(--sp-muted);
                       opacity: 0.55; z-index: 3; pointer-events: none"
              ></span>

              <span
                data-part="edge-zone"
                style="position: absolute; left: 0; top: 0; bottom: 0; width: ${a}px; z-index: 4; display: flex;
                       align-items: center; justify-content: center; background: ${u};
                       border-right: 1px dashed var(--sp-muted)"
              >
                <span class="sp-label" style="writing-mode: vertical-rl; font-size: 10px; letter-spacing: 0.4px">back</span>
                ${f(`edge-dot`,a/2,128)}
              </span>

              <span style="position: absolute; inset: 0; z-index: 5; pointer-events: none">
                ${f(`short-dot`,54,128)}
                ${f(`far-dot`,152,128)}
              </span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 7px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Gesture progress</span>
            <span
              class="sp-text--ink" data-part="pct"
              style="font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.15"
            >0%</span>
            <span style="position: relative; height: 6px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
              <span data-part="fill" style="display: block; width: 0%; height: 100%; border-radius: 999px; background: var(--sp-accent)"></span>
            </span>
            <span class="sp-text sp-text--ink" data-part="say" style="height: 34px; font-size: 12px; line-height: 1.4">No stroke yet.</span>
            <span class="sp-divider"></span>
            <span class="sp-label" data-stage-verdict data-part="legend" style="height: 46px; font-size: 11px; line-height: 1.4">Past ${o} px the navigation commits. Let go short of it and the screen springs back.</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset" style="align-self: flex-start">Reset the stack</button>
          </div>
        </div>
      </div>
    </div>
  `;let h=e(t,`device`),g=e(t,`screen`),_=e(t,`behind`),v=e(t,`edge-zone`),y=e(t,`pct`),b=e(t,`fill`),x=e(t,`say`),S=e(t,`stackline`),C=r(t),w=[`home`,`inbox`,`article`],T=2,E,D=0,O,k=e=>{let t=Math.round(D*100);y.textContent=`${t}%`,b.style.width=`${t}%`,x.textContent=e},A=(e,t)=>{D=Math.min(Math.max(e,0),1),g.style.transition=t===`none`?`none`:t===`home`?`transform ${l}ms cubic-bezier(0.2, 1.5, 0.4, 1), border-radius ${l}ms ease, opacity ${l}ms ease`:`transform ${l}ms ease-out, border-radius ${l}ms ease, opacity ${l}ms ease`,g.style.transform=`translateX(${D*c}px) scale(${(1-s*D).toFixed(3)})`,g.style.borderRadius=`${(D*18).toFixed(1)}px`,g.style.opacity=`1`},j=()=>{g.innerHTML=p(T,T>0),_.innerHTML=p(T-1,!1),h.dataset.top=w[T]??`home`,S.textContent=d.slice(0,T+1).map(e=>e.title).join(` · `)},M=(e,t)=>{h.dataset.outcome=e,g.dataset.state=`rested`,A(0,`none`),k(t)};t.addEventListener(`pointerdown`,e=>{if(!h.contains(e.target))return;m.clearTimeout(O),h.dataset.preview=`none`;let r=n(e,v).x;if(r>a)return E=void 0,M(`inside`,`Started ${Math.round(r)} px in: the page keeps that stroke.`);if(T===0)return E=void 0,M(`blocked`,`Nothing further back, so there is nothing to preview.`);E=n(e,v).x,e.isTrusted&&t.setPointerCapture(e.pointerId),h.dataset.outcome=`previewing`,g.dataset.state=`peeling`,A(0,`none`),k(`Holding: the destination is drawn behind.`)}),t.addEventListener(`pointermove`,e=>{E!==void 0&&(A((n(e,v).x-E)/o,`none`),D>.2&&(h.dataset.preview=`seen`),k(`Peeled ${Math.round(D*o)} px of ${o}.`))});let N=()=>{if(E!==void 0){if(E=void 0,D<1)return g.dataset.state=`rested`,h.dataset.outcome=`cancelled`,A(0,`home`),k(`Let go short of the commit point: nothing navigated.`);g.dataset.state=`committing`,h.dataset.outcome=`committed`,g.style.transition=`transform ${l}ms ease-out, opacity ${l}ms ease`,g.style.transform=`translateX(${i.w}px) scale(0.72)`,g.style.opacity=`0`,k(`Past the commit point: the destination becomes the screen.`),O=m.setTimeout(()=>{T=Math.max(0,T-1),j(),g.dataset.state=`rested`,A(0,`none`),k(`Arrived. The screen behind is now the screen in front.`)},C?0:320)}};t.addEventListener(`pointerup`,N),t.addEventListener(`pointercancel`,N),e(t,`reset`).addEventListener(`click`,()=>{m.clearTimeout(O),T=2,j(),h.dataset.preview=`none`,M(`none`,`Stack pushed back to three.`)}),j(),A(0,`none`),k(`No stroke yet.`)}export{m as mount};