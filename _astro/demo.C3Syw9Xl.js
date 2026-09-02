import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=130,n=250,r=26,i=22,a=[{key:`edge`,label:`edge to edge`},{key:`inset`,label:`inset`}];function o(o){o.innerHTML=`
    <div class="sp-app" style="flex-direction: row; align-items: center; justify-content: center; gap: 20px">
      <div
        style="position: relative; flex: 0 0 auto; padding: 5px; border-radius: 22px;
               background: color-mix(in oklab, var(--sp-ink) 80%, var(--sp-bg))"
      >
        <div
          data-part="screen"
          style="position: relative; width: ${t}px; height: ${n}px; border-radius: 17px;
                 overflow: hidden; background: color-mix(in oklab, var(--sp-ink) 16%, var(--sp-bg))"
        >
          <div
            data-part="canvas"
            data-subject
            data-mode="edge"
            data-pose="[data-mode=edge]"
            style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; flex-direction: column;
                   background: var(--sp-surface)"
          >
            <div
              data-part="picture"
              style="flex: 0 0 auto; height: 132px;
                     background: linear-gradient(155deg, var(--sp-accent-soft), var(--sp-accent) 130%)"
            ></div>
          </div>

          <div
            class="sp-context"
            data-part="content"
            style="position: absolute; left: 0; right: 0; top: ${r}px; bottom: ${i}px;
                   display: flex; flex-direction: column; justify-content: flex-end; gap: 7px; padding: 10px"
          >
            <div class="sp-line" style="width: 68%; height: 7px; background: color-mix(in oklab, var(--sp-ink) 45%, transparent)"></div>
            <div class="sp-line" style="width: 92%; height: 5px"></div>
            <div class="sp-line" style="width: 80%; height: 5px"></div>
            <button
              class="sp-button sp-button--sm"
              data-part="action"
              type="button"
              style="margin-top: 3px; padding: 4px 10px; font-size: 11px; white-space: nowrap"
            >Continue</button>
          </div>

          <div
            class="sp-context"
            data-part="status-bar"
            style="position: absolute; left: 0; right: 0; top: 0; height: ${r}px; display: flex; align-items: center;
                   justify-content: space-between; padding: 0 11px; font-size: 10px; font-weight: 600; color: var(--sp-ink)"
          >
            <span>9:41</span>
            <span style="display: flex; align-items: center; gap: 3px">
              <span style="width: 4px; height: 4px; border-radius: 50%; background: var(--sp-ink)"></span>
              <span style="width: 4px; height: 4px; border-radius: 50%; background: var(--sp-ink)"></span>
              <span style="width: 13px; height: 7px; border: 1px solid var(--sp-ink); border-radius: 2px"></span>
            </span>
          </div>

          <div
            class="sp-context"
            data-part="home-bar"
            style="position: absolute; left: 0; right: 0; bottom: 0; height: ${i}px; display: flex; align-items: center; justify-content: center"
          >
            <span style="width: 46px; height: 4px; border-radius: 2px; background: var(--sp-ink)"></span>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="App surface" data-term="edge" data-value="edge" style="align-self: flex-start">
          ${a.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
        </sp-segmented>
        <span
          class="sp-text"
          data-stage-verdict data-part="note"
          role="status"
          style="display: block; width: 244px; height: 48px; font-size: 12px; line-height: 16px"
        ></span>
      
    </div>
  `;let s=e(o,`screen`),c=e(o,`canvas`),l=e(o,`note`),u=e=>{let t=e===`edge`;c.style.top=t?`0px`:`${r}px`,c.style.bottom=t?`0px`:`${i}px`;let n=s.getBoundingClientRect(),a=c.getBoundingClientRect(),o=a.top<=n.top+1&&a.bottom>=n.bottom-1;c.dataset.mode=o?`edge`:`inset`,l.textContent=o?`The surface runs under both bars, out to the screen edge. The text and the button keep their insets.`:`The surface stops at the bars, and the two bands above and below it go dead.`};e(o,`modes`).addEventListener(`change`,e=>u(e.detail)),u(`edge`)}export{o as mount};