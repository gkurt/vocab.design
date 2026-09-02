import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=260,n={narrow:172,wide:324},r={stack:{direction:`column`,align:`stretch`,gap:`6px`,media:{width:`100%`,height:`22px`}},row:{direction:`row`,align:`center`,gap:`10px`,media:{width:`64px`,height:`44px`}}},i=`height: 92px; padding: 8px; background: var(--sp-sunken); border: 1px dashed var(--sp-line); border-radius: var(--sp-radius)`,a=`display: flex; height: 100%; padding: 8px`,o=`
  <div data-media style="flex: 0 0 auto; border-radius: 5px; background: var(--sp-accent-soft)"></div>
  <div class="sp-stack" style="gap: 6px; min-width: 0">
    <span class="sp-heading" style="font-size: 13px">Kelp forest survey</span>
    <div class="sp-line" style="width: 82%"></div>
  </div>`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Slot width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Width" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">172px</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">324px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row" style="gap: 10px">
            <span class="sp-label sp-context" style="flex: 0 0 auto; width: 84px">Feature slot</span>
            <div data-part="slot" data-width="narrow" style="container-type: inline-size; width: ${n.narrow}px; ${i}">
              <div class="sp-surface" data-part="card" data-subject data-layout="stack" style="${a}">${o}</div>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label" style="flex: 0 0 auto; width: 84px">Sidebar slot</span>
            <div data-part="twin-slot" style="container-type: inline-size; width: 172px; ${i}">
              <div class="sp-surface" data-part="twin-card" data-layout="stack" style="${a}">${o}</div>
            </div>
          </div>
          <div class="sp-row sp-context" style="height: 18px">
            <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`slot`),l=e(s,`card`),u=e(s,`readout`),d=(e,t)=>{let n=r[t];e.dataset.layout=t,e.style.flexDirection=n.direction,e.style.alignItems=n.align,e.style.gap=n.gap;let i=e.querySelector(`[data-media]`);i&&(i.style.width=n.media.width,i.style.height=n.media.height)},f=e=>{let r=n[e];if(!r)return;c.style.width=`${r}px`,c.dataset.width=e;let i=r>=t;d(l,i?`row`:`stack`),u.textContent=i?`container ${r}px · min-width: ${t}px matches`:`container ${r}px · min-width: ${t}px does not match`};e(s,`switcher`).addEventListener(`change`,e=>f(e.detail)),d(e(s,`twin-card`),`stack`),f(`narrow`)}export{s as mount};