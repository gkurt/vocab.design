import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={narrow:300,wide:440},r=300,i=16;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Width" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">300px</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">440px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center">
          <div
            data-part="viewport"
            data-width="narrow"
            style="display: flex; flex-direction: column; width: ${n.narrow}px; height: 158px; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div class="sp-context" data-part="bleed" style="padding: 6px 0; text-align: center; background: var(--sp-line)">
              <span class="sp-label">Spring tides, 12 to 15 March</span>
            </div>
            <div
              class="sp-stack"
              data-part="container"
              data-subject
              style="flex: 1 1 auto; width: 100%; max-width: ${r}px; margin-inline: auto; padding: 12px ${i}px; background: var(--sp-surface)"
            >
              <span class="sp-heading">Tide tables</span>
              <div class="sp-line" style="width: 96%"></div>
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 61%"></div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout"
                style="margin-top: 10px; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>
    </div>
  `;let o=e(a,`viewport`),s=e(a,`container`),c=e(a,`readout`),l=e=>{let a=n[e];if(!a)return;let l=a>r;o.style.width=`${a}px`,o.dataset.width=e,t(s,`data-capped`,l),c.textContent=l?`viewport ${a}px · container held at ${r}px, ${(a-r)/2}px margin each side`:`viewport ${a}px · container ${a}px, ${i}px padding each side`};e(a,`switcher`).addEventListener(`change`,e=>l(e.detail)),l(`narrow`)}export{a as mount};