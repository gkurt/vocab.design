import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={narrow:256,wide:438},r=110,i=8,a=8;function o(o){let s=(e,t)=>t.map((t,n)=>`
        <div
          class="sp-surface"
          data-part="${e}-card-${n+1}"
          style="display: flex; align-items: center; justify-content: center; min-width: 0; height: 46px; padding: 6px"
        >
          <div class="sp-line" style="width: ${t}%"></div>
        </div>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Width" data-part="switcher" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">256px</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">438px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; padding: 12px">
          <div
            class="sp-context"
            data-part="viewport"
            data-width="narrow"
            style="width: ${n.narrow}px; padding: ${a}px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span class="sp-label">repeat(3, 1fr)</span>
            <div
              class="sp-grid"
              data-part="fluid"
              data-subject
              style="margin-top: 4px; gap: ${i}px; grid-template-columns: repeat(3, 1fr)"
            >
              ${s(`fluid`,[76,62,70])}
            </div>
            <span class="sp-label" style="display: block; margin-top: 12px">repeat(3, ${r}px)</span>
            <div
              data-part="fixed"
              style="margin-top: 4px; display: grid; gap: ${i}px; grid-template-columns: repeat(3, ${r}px); overflow: hidden"
            >
              ${s(`fixed`,[76,62,70])}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="margin-top: 9px; font-size: 12px; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>
    </div>
  `;let c=e(o,`viewport`),l=e(o,`fixed`),u=e(o,`fluid`),d=e(o,`readout`),f=e=>{let r=n[e];if(!r)return;let i=r-16,a=Math.round((i-16)/3),o=i-346;c.style.width=`${r}px`,c.dataset.width=e,u.dataset.column=String(a),t(l,`data-overflowing`,o<0),t(l,`data-slack`,o>0),d.textContent=o<0?`viewport ${r}px · fluid columns ${a}px · fixed columns run ${-o}px past the edge`:`viewport ${r}px · fluid columns ${a}px · fixed columns leave ${o}px of dead space`};e(o,`switcher`).addEventListener(`change`,e=>f(e.detail)),f(`narrow`)}export{o as mount};