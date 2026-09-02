import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=3,r=6,i=1,a=360,o=210,s=196,c=[{key:`top`,label:`top nav`,areas:`'chrome' 'nav' 'content'`,columns:`1fr`,rows:`18px 22px 1fr`,navWidth:`100%`,tabs:!1,extra:!1,note:`Top navigation: one horizontal nav band under the title bar.`},{key:`menu`,label:`menu bar`,areas:`'chrome' 'nav' 'extra' 'content'`,columns:`1fr`,rows:`18px 11px 16px 1fr`,navWidth:`56%`,tabs:!1,extra:!0,note:`Menu bar: a short menu strip, then a command bar, then content.`},{key:`left`,label:`left nav`,areas:`'chrome chrome' 'nav content'`,columns:`62px 1fr`,rows:`18px 1fr`,navWidth:`100%`,tabs:!1,extra:!1,note:`Left navigation: a full height pane beside the content.`},{key:`tabs`,label:`tabs`,areas:`'chrome' 'nav' 'content'`,columns:`1fr`,rows:`18px 24px 1fr`,navWidth:`100%`,tabs:!0,extra:!1,note:`Tab view: tabs along the top edge of the content itself.`}],l=`background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: 3px`,u=`background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 3px`;function d(d){d.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 266px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Silhouette</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="shapes" data-axis="Navigation" data-value="top">
            ${c.map(e=>`
              <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}"
                      style="padding: 4px 8px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            data-part="silhouette"
            data-subject
            data-shape="top"
            style="display: grid; gap: ${n}px; width: ${a}px; height: ${o}px; padding: ${r}px;
                   background: var(--sp-surface); border: ${i}px solid var(--sp-line); border-radius: 5px"
          >
            <div data-part="chrome" style="grid-area: chrome; ${l}"></div>
            <div data-part="nav" style="grid-area: nav; justify-self: start; align-self: stretch; ${u}"></div>
            <div
              data-part="tabs"
              style="grid-area: nav; display: flex; align-items: flex-end; gap: ${n}px; margin-bottom: -${n}px"
              hidden
            >
              ${[64,54,48].map((e,t)=>`
                <span
                  data-part="tab-${t+1}"
                  style="flex: 0 0 auto; width: ${e}px; height: ${t===0?24:19}px; border-radius: 3px 3px 0 0;
                         background: ${t===0?`var(--sp-accent-soft)`:`var(--sp-sunken)`};
                         border: 1px solid ${t===0?`var(--sp-accent)`:`var(--sp-line)`}; border-bottom: 0"
                ></span>`).join(``)}
            </div>
            <div data-part="extra" style="grid-area: extra; ${l}" hidden></div>
            <div data-part="content" style="grid-area: content; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: 3px"></div>
          </div>
        </div>
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let f=e(d,`silhouette`),p=e(d,`nav`),m=e(d,`tabs`),h=e(d,`extra`),g=e(d,`note`),_=e=>{let n=c.find(t=>t.key===e);if(!n)return;f.style.gridTemplateAreas=n.areas,f.style.gridTemplateColumns=n.columns,f.style.gridTemplateRows=n.rows,p.style.width=n.navWidth,t(p,`hidden`,n.tabs),t(m,`hidden`,!n.tabs),t(h,`hidden`,!n.extra);let r=n.tabs?m:p,i=r.offsetHeight>s*.5,a=h.offsetHeight>1,o=r.children.length>1;f.dataset.shape=i?`left`:a?`menu`:o?`tabs`:`top`,g.textContent=n.note};e(d,`shapes`).addEventListener(`change`,e=>_(e.detail)),_(`top`)}export{d as mount};