import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=300,n=96,r=22,i=6,a=10,o=[[`Berth 1`,172],[`Berth 2`,138],[`Berth 3`,196],[`Berth 4`,118],[`Berth 5`,164]],s=20+o.length*r+(o.length-1)*i-94,c={auto:`auto makes the box a scroll container: content clips at the padding edge, and a scrollbar reaches the rest.`,hidden:`hidden is still a scroll container. It clips exactly the same way, it just hands the reader no way to move it.`,visible:`visible is the value that makes no scroll container at all: the content simply leaves the box.`},l=([e,t])=>`
  <div style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: ${r}px; width: 258px;
              padding: 0 9px; border-radius: 5px; background: var(--sp-accent-soft)">
    <span style="flex: 0 0 auto; font-size: 11px; font-weight: 500">${e}</span>
    <span class="sp-line" style="flex: 0 0 auto; width: ${t}px; height: 6px; background: var(--sp-muted); opacity: 0.5"></span>
  </div>`;function u(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">overflow</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="auto" data-axis="Set to">
            <button class="sp-segment" type="button" data-part="seg-auto" value="auto">auto</button>
            <button class="sp-segment" type="button" data-part="seg-hidden" value="hidden">hidden</button>
            <button class="sp-segment" type="button" data-part="seg-visible" value="visible">visible</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            data-part="arena"
            data-spill="no"
            style="display: flex; align-items: flex-start; justify-content: center; flex: 0 0 auto; width: 440px; height: 168px"
          >
            <div
              data-part="box"
              data-subject
              data-pose=":not([data-overflow=visible])"
              data-overflow="auto"
              data-at="top"
              tabindex="0"
              aria-label="Berths"
              style="display: flex; flex-direction: column; gap: ${i}px; flex: 0 0 auto; width: ${t}px; height: ${n}px;
                     padding: ${a}px; overflow: auto; scrollbar-width: thin; overscroll-behavior: contain;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              ${o.map(l).join(``)}
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 40px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let u=e(r,`box`),d=e(r,`arena`),f=e(r,`readout`),p=()=>{if(u.dataset.overflow===`visible`)return;let e=s>0?u.scrollTop/s:0;e<=.02?u.dataset.at=`top`:e>=.98?u.dataset.at=`end`:u.dataset.at=`middle`},m=e=>{let t=c[e];t&&(u.scrollTop=0,u.style.overflow=e,u.dataset.overflow=e,u.dataset.at=`top`,d.dataset.spill=e===`visible`?`yes`:`no`,f.textContent=t)};u.addEventListener(`scroll`,p),e(r,`switcher`).addEventListener(`change`,e=>m(e.detail)),m(`auto`)}export{u as mount};