import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{i as r}from"./measure.DK7AY2_i.js";var i=16,a=[{key:`filler`,label:`toolbar filler`},{key:`gutter`,label:`pane gutter`}],o=`background-color: color-mix(in oklab, var(--sp-accent) 9%, transparent);
  background-image: repeating-linear-gradient(45deg, color-mix(in oklab, var(--sp-accent) 30%, transparent) 0 2px, transparent 2px 6px);
  border-radius: 4px`,s=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px"></div>`).join(``);function c(c){c.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Spacer as</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Role" data-value="filler">
            ${a.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div data-part="app" class="sp-surface" style="display: flex; flex-direction: column; width: 428px; height: 190px; overflow: hidden">
            <div data-part="bar" style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: 36px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-row sp-context" data-part="bar-left" style="gap: 6px">
                <span class="sp-icon-button" style="width: 24px; height: 24px">${n(`menu`)}</span>
                <span class="sp-heading" style="font-size: 13px">Ledger</span>
              </span>

              <span
                data-part="spacer"
                data-subject
                data-role="filler"
                data-size="0"
                style="flex: 1 1 auto; align-self: center; height: 22px; min-width: 0; ${o}"
              ><span data-part="handle" hidden style="display: block; width: 4px; height: 30px; margin: 0 auto; border-radius: 999px; background: var(--sp-muted)"></span></span>

              <span class="sp-row sp-context" data-part="bar-right" style="gap: 6px; flex: 0 0 auto">
                <span class="sp-button sp-button--ghost sp-button--sm" style="font-size: 12px">Share</span>
                <span class="sp-icon-button" style="width: 24px; height: 24px">${n(`kebab`,`sp-icon--dots`)}</span>
              </span>
            </div>

            <div data-part="panes" style="display: flex; align-items: stretch; gap: ${i}px; flex: 1 1 auto; min-height: 0; padding: 10px; background: var(--sp-sunken)">
              <div class="sp-surface sp-context" data-part="pane-a" style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; padding: 9px">
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Accounts</span>
                ${s([100,82,66])}
              </div>
              <div class="sp-surface sp-context" data-part="pane-b" style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0; padding: 9px">
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Entries</span>
                ${s([90,100,58])}
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;let l=e(c,`spacer`),u=e(c,`handle`),d=e(c,`bar`),f=e(c,`bar-right`),p=e(c,`panes`),m=e(c,`pane-b`),h=e(c,`note`),g=e=>{let n=e===`gutter`;l.dataset.role=n?`gutter`:`filler`,t(u,`hidden`,!n),n?(p.insertBefore(l,m),p.style.gap=`0px`,f.style.marginLeft=`auto`,l.style.cssText=`flex: 0 0 auto; align-self: stretch; width: ${i}px; display: flex; align-items: center; cursor: col-resize; ${o}`):(d.insertBefore(l,f),p.style.gap=`${i}px`,f.style.marginLeft=`0px`,l.style.cssText=`flex: 1 1 auto; align-self: center; height: 22px; min-width: 0; ${o}`);let a=n?l.offsetWidth:Math.round(r(l).width);l.dataset.size=String(a),h.textContent=n?`A ${a}px channel, and the bar above is spaced by an auto margin instead.`:`A ${a}px filler, and the panes below are held apart by a plain gap.`};e(c,`modes`).addEventListener(`change`,e=>g(e.detail)),g(`filler`)}export{c as mount};