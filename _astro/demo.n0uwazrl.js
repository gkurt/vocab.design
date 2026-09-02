import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=40,n=18,r=300,i=140,a=1,o={concentric:22,same:t},s={concentric:{sum:`Inner radius ${o.concentric} px`,note:`One centre for both arcs: the gap holds at 18 px all the way round.`},same:{sum:`Inner radius ${o.same} px`,note:`Sides still 18 px, corner now 25 px: the gap stops being a gap.`}};function c(e){return`<path d="M0 ${e} A${e} ${e} 0 0 1 ${e} 0" fill="none" stroke="var(--sp-accent)" stroke-width="2.6" stroke-linecap="round"></path>`}function l(l){l.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 14px">Card</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Inner radius" data-term="concentric" data-part="switcher" data-value="concentric">
            <button class="sp-segment" type="button" data-part="seg-concentric" value="concentric">concentric</button>
            <button class="sp-segment" type="button" data-part="seg-same" value="same">same radius</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div data-part="scene" style="position: relative; width: ${r}px; height: ${i}px">
            <div class="sp-context" data-part="outer"
                 style="position: absolute; inset: 0; padding: ${n}px; background: var(--sp-surface);
                        border: ${a}px solid var(--sp-line); border-radius: ${t}px">
              <div data-part="inner"
                   style="display: flex; flex-direction: column; justify-content: center; gap: 9px;
                          width: 100%; height: 100%; padding: 0 22px; background: var(--sp-sunken);
                          border: 1px solid var(--sp-line); border-radius: ${o.concentric}px">
                <div class="sp-row" style="gap: 8px">
                  <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">KE</span>
                  <span class="sp-heading" style="font-size: 13px">Kestrel</span>
                </div>
                <span class="sp-line" style="width: 78%"></span>
                <span class="sp-line" style="width: 54%"></span>
              </div>
            </div>
            <svg data-part="corner" data-subject data-pose="[data-mode=concentric]" data-mode="concentric"
                 aria-hidden="true" viewBox="0 0 ${o.concentric} ${o.concentric}"
                 style="position: absolute; left: 19px; top: 19px;
                        width: ${o.concentric}px; height: ${o.concentric}px; overflow: visible">
              ${c(o.concentric)}
            </svg>
          </div>

          <div class="sp-stack sp-context" data-part="readout" data-mode="concentric"
               style="gap: 2px; align-items: center; width: 420px; height: 36px; justify-content: center">
            <span class="sp-label" data-part="sum" style="color: var(--sp-ink); font-variant-numeric: tabular-nums">
              ${s.concentric.sum}
            </span>
            <span class="sp-text" data-stage-verdict data-part="note" style="margin: 0; font-size: 11px; line-height: 1.3; text-align: center">
              ${s.concentric.note}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`inner`),d=e(l,`corner`),f=e(l,`readout`),p=e(l,`sum`),m=e(l,`note`);function h(e){let t=o[e];u.style.borderRadius=`${t}px`,d.dataset.mode=e,d.setAttribute(`viewBox`,`0 0 ${t} ${t}`),d.style.width=`${t}px`,d.style.height=`${t}px`,d.innerHTML=c(t),f.dataset.mode=e,p.textContent=s[e].sum,m.textContent=s[e].note}e(l,`switcher`).addEventListener(`change`,e=>{h(e.detail)})}export{l as mount};