import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=1400,r={compliant:44,timed:44,gap:54},i={compliant:{hoverable:`yes`,dismissible:`yes`,persistent:`yes`},timed:{hoverable:`yes`,dismissible:`yes`,persistent:`no`},gap:{hoverable:`no`,dismissible:`yes`,persistent:`yes`}},a={compliant:`The panel sits flush under its trigger, so the pointer can travel onto it and read the clause, and Escape takes it away without the pointer moving at all.`,timed:`The panel leaves on its own after a beat and a half. At four times magnification, finding it and reading it takes longer than that, every time.`,gap:`Ten pixels of nothing between the trigger and the panel. The pointer leaves the trigger, the panel goes, and the button inside it can never be pressed.`},o={none:`nothing yet`,left:`the pointer leaving`,timer:`its own timer`,escape:`Escape`},s=[{name:`hoverable`,label:`Hoverable`},{name:`dismissible`,label:`Dismissible`},{name:`persistent`,label:`Persistent`}];function c(c,l){let u=(e,t)=>`
    <span class="sp-label" style="font-size: 10.5px; flex: 0 0 auto">${t}
      <span data-part="cond-${e}" data-met="yes"
            style="display: inline-block; width: 22px; color: var(--sp-ink); font-weight: 500">yes</span>
    </span>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Flyout</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="compliant" data-axis="Behaviour" data-term="compliant">
            <button class="sp-segment" type="button" data-part="seg-compliant" value="compliant"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">All three</button>
            <button class="sp-segment" type="button" data-part="seg-timed" value="timed"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Self-closing</button>
            <button class="sp-segment" type="button" data-part="seg-gap" value="gap"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Gap</button>
          </sp-segmented>
        </div>

        <div data-part="scene" style="position: relative; margin-top: 10px; height: 132px">
          <span class="sp-heading sp-context" style="font-size: 12.5px">Motor policy</span>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 18px; gap: 10px">
            <span data-part="trigger" data-closed="none" data-hover-driven
                  style="flex: 0 0 auto; font-size: 12.5px; cursor: help; border-bottom: 2px dotted var(--sp-muted)">Excess</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12.5px">350</span>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 6px; height: 18px; gap: 10px">
            <span class="sp-text" style="flex: 0 0 auto; font-size: 12.5px">Cover level</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12.5px">Comprehensive</span>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 6px; height: 18px; gap: 10px">
            <span class="sp-text" style="flex: 0 0 auto; font-size: 12.5px">Renewal</span>
            <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 12.5px">4 April</span>
          </div>

          <div class="sp-popover" data-part="flyout" data-subject data-mode="compliant" data-pose="[data-mode=compliant]"
               role="tooltip" style="left: 0; top: ${r.compliant}px; width: 288px; --sp-arrow-x: 14px; padding: 10px">
            <p class="sp-text sp-text--ink" style="margin: 0; font-size: 11.5px; line-height: 1.35; height: 32px">
              The first part of any claim that you pay yourself, before the insurer pays anything.
            </p>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="flyout-link"
                    style="margin-top: 8px; font-size: 11px; padding: 4px 9px">Read the clause</button>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 20px; gap: 10px">
          <div class="sp-row" style="gap: 12px; flex: 0 0 auto">
            ${s.map(e=>u(e.name,e.label)).join(``)}
          </div>
          <span class="sp-text sp-text--ink" data-part="closed" data-by="none"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">Closed by ${o.none}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="compliant"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${a.compliant}</p>
      </div>
    </div>
  `;let d=e(c,`flyout`),f=e(c,`trigger`),p=e(c,`closed`),m=e(c,`caption`),h=`compliant`,g,_=e=>{l.clearTimeout(g),d.hasAttribute(`data-open`)&&(t(d,`data-open`,!1),f.dataset.closed=e,p.dataset.by=e,p.textContent=`Closed by ${o[e]}`)},v=()=>{d.hasAttribute(`data-open`)||(t(d,`data-open`,!0),f.dataset.closed=`none`,p.dataset.by=`none`,p.textContent=`Closed by ${o.none}`,h===`timed`&&(g=l.setTimeout(()=>_(`timer`),n)))},y=n=>{h=n,l.clearTimeout(g),t(d,`data-open`,!1),d.dataset.mode=n,d.style.top=`${r[n]}px`,f.dataset.closed=`none`,p.dataset.by=`none`,p.textContent=`Closed by ${o.none}`;for(let t of s){let r=e(c,`cond-${t.name}`);r.dataset.met=i[n][t.name],r.textContent=i[n][t.name]}m.dataset.mode=n,m.textContent=a[n]};c.addEventListener(`pointerover`,e=>{let t=e.target;if(f.contains(t))return v();d.contains(t)&&h!==`gap`||_(`left`)}),c.addEventListener(`keydown`,e=>{e.key===`Escape`&&_(`escape`)}),e(c,`mode`).addEventListener(`change`,e=>{y(e.detail)}),y(`compliant`)}export{c as mount};