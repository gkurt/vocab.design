import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=452,r=210,i=[{key:`shown`,label:`window chrome`},{key:`gone`,label:`content only`}];function a(a){a.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${n}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Window</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="View" data-value="shown">
          ${i.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
        </sp-segmented>
      </div>

      <div class="sp-frame" style="width: ${n}px; height: ${r}px">
        <div
          data-part="chrome"
          data-subject
          data-state="shown"
          style="flex: 0 0 auto; background: var(--sp-surface)"
        >
          <div data-part="title-bar" style="display: flex; align-items: center; gap: 10px; height: 30px; padding: 0 10px">
            <span style="display: flex; gap: 5px; flex: 0 0 auto">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-line)"></span>
            </span>
            <span
              data-part="tab"
              style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; width: 132px; height: 22px; padding: 0 8px;
                     border-radius: 6px 6px 0 0; background: var(--sp-sunken)"
            >
              <span style="width: 8px; height: 8px; border-radius: 2px; background: var(--sp-line)"></span>
              <span class="sp-line" style="flex: 1 1 auto; height: 5px"></span>
            </span>
            <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px; color: var(--sp-muted)">
              ${t(`plus`)}
            </span>
          </div>

          <div
            data-part="toolbar"
            style="display: flex; align-items: center; gap: 6px; height: 34px; padding: 0 8px; border-top: 1px solid var(--sp-line);
                   border-bottom: 1px solid var(--sp-line)"
          >
            <span class="sp-icon-button" style="width: 24px; height: 24px; color: var(--sp-muted)">${t(`chevronLeft`)}</span>
            <span class="sp-icon-button" style="width: 24px; height: 24px; color: var(--sp-muted)">${t(`chevronRight`)}</span>
            <span
              data-part="address"
              style="display: flex; align-items: center; gap: 6px; flex: 1 1 auto; min-width: 0; height: 22px; padding: 0 10px;
                     border-radius: 11px; background: var(--sp-sunken)"
            >
              <span style="width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid var(--sp-muted)"></span>
              <span class="sp-line" style="width: 46%; height: 5px"></span>
            </span>
            <span class="sp-icon-button" style="width: 24px; height: 24px; color: var(--sp-muted)">${t(`kebab`)}</span>
          </div>
        </div>

        <div
          class="sp-context"
          data-part="page"
          style="flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; background: var(--sp-surface)"
        >
          <div style="width: 54%; height: 9px; border-radius: 4px; background: color-mix(in oklab, var(--sp-ink) 55%, transparent)"></div>
          <div
            data-part="figure"
            style="flex: 1 1 auto; min-height: 24px; border-radius: 6px; background: var(--sp-sunken); border: 1px solid var(--sp-line)"
          ></div>
          <div class="sp-line" style="width: 96%; height: 6px"></div>
          <div class="sp-line" style="width: 82%; height: 6px"></div>
        </div>
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        data-chrome="shown"
        role="status"
        style="display: block; width: ${n}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let o=e(a,`chrome`),s=e(a,`note`),c=e=>{o.style.display=e===`gone`?`none`:``;let t=o.getBoundingClientRect().height>4;o.dataset.state=t?`shown`:`gone`,s.dataset.chrome=t?`shown`:`gone`,s.textContent=t?`Title bar, tab, toolbar and address field: none of it is the page. The page gets what is left.`:`The same window with its furniture gone. All content, and nothing to navigate with.`};e(a,`modes`).addEventListener(`change`,e=>c(e.detail)),c(`shown`)}export{a as mount};