import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={w:434,h:132};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desktop</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 10px">
            <sp-segmented data-stage-mode class="sp-segmented" data-axis="First click" data-part="mode" data-value="raise">
              <button class="sp-segment" type="button" data-part="mode-raise" value="raise" style="padding: 5px 12px">Raises only</button>
              <button class="sp-segment" type="button" data-part="mode-through" value="through" style="padding: 5px 12px">Clicks through</button>
            </sp-segmented>
          </div>

          <div
            data-part="desk"
            data-mode="raise"
            data-hits="0"
            style="position: relative; flex: 0 0 auto; width: ${t.w}px; height: ${t.h}px; border-radius: var(--sp-radius); background: var(--sp-sunken)"
          >
            <div
              class="sp-surface sp-context"
              data-part="win-a"
              data-active
              style="position: absolute; left: 4px; top: 4px; width: 214px; height: 120px; z-index: 2; display: flex; flex-direction: column; overflow: hidden; cursor: default"
            >
              <div class="sp-row" data-part="bar-a" style="flex: 0 0 auto; gap: 8px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading" style="font-size: 12px">Notes</span>
              </div>
              <div class="sp-stack" style="gap: 8px; padding: 12px 10px">
                <span class="sp-line" style="width: 86%"></span>
                <span class="sp-line" style="width: 64%"></span>
                <span class="sp-line" style="width: 74%"></span>
              </div>
            </div>

            <div
              class="sp-surface"
              data-part="win-b"
              style="position: absolute; left: 196px; top: 16px; width: 230px; height: 112px; z-index: 1; display: flex; flex-direction: column; overflow: hidden; cursor: default"
            >
              <div class="sp-row" data-part="bar-b" style="flex: 0 0 auto; gap: 8px; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading sp-context" style="font-size: 12px">Player</span>
              </div>
              <div class="sp-row" style="flex: 1 1 auto; justify-content: flex-end; gap: 10px; padding: 0 12px">
                <span class="sp-label sp-context" data-part="count" style="white-space: nowrap; font-variant-numeric: tabular-nums">0 plays</span>
                <button class="sp-button sp-button--sm" type="button" data-part="play" data-subject>Play</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="width: 452px; text-align: center"
        >Click-through off: the first click on Player is spent raising it.</span
      >
    </div>
  `;let r=e(n,`desk`),i=e(n,`readout`),a=e(n,`count`),o=e(n,`mode`),s={a:e(n,`win-a`),b:e(n,`win-b`)},c={a:e(n,`bar-a`),b:e(n,`bar-b`)},l=`a`,u=0,d=e=>{i.textContent=e},f=e=>{l=e;for(let[t,n]of Object.entries(s)){let r=t===e;n.style.zIndex=r?`2`:`1`,r?n.setAttribute(`data-active`,``):n.removeAttribute(`data-active`);let i=c[t];i.style.background=r?`var(--sp-sunken)`:`transparent`,i.firstElementChild.style.color=r?`var(--sp-ink)`:`var(--sp-muted)`}},p=(e,t)=>n=>{if(l!==e){if(f(e),o.value===`through`)return d(`Raised ${t} and let the click carry on`);n.stopPropagation(),n.preventDefault(),d(`The click only raised ${t}, nothing was pressed`)}};s.a.addEventListener(`click`,p(`a`,`Notes`),!0),s.b.addEventListener(`click`,p(`b`,`Player`),!0),e(n,`play`).addEventListener(`click`,()=>{if(u+=1,r.dataset.hits=String(u),a.textContent=u===1?`1 play`:`${u} plays`,o.value===`through`&&r.dataset.raised===`just-now`)return d(`Raised Player and pressed Play, in one click`);d(`Play was pressed: Player already had the click`)}),s.b.addEventListener(`pointerdown`,()=>{r.dataset.raised=l===`b`?`already`:`just-now`},!0),o.addEventListener(`change`,()=>{let e=o.value===`through`;r.dataset.mode=e?`through`:`raise`,d(e?`Click-through on: one click raises Player and presses Play.`:`Click-through off: the first click on Player is spent raising it.`)}),f(`a`)}export{n as mount};