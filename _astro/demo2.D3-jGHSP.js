import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`ui-monospace, monospace`,n={x:20,y:24,w:190,h:128},r={x:116,y:88,w:190},i={dialog:{layer:`top`,className:`sp-dialog`,left:``,top:``,width:`240px`,scrim:!0,note:`showModal() promotes the dialog and paints its ::backdrop over the page.`},popover:{layer:`top`,className:`sp-popover`,left:`${r.x}px`,top:`${r.y}px`,width:`${r.w}px`,scrim:!1,note:`A popover is promoted too, clearing the card and the 99999 ribbon alike.`},plain:{layer:`page`,className:`sp-popover`,left:`${r.x-n.x-1}px`,top:`${r.y-n.y-1}px`,width:`${r.w}px`,scrim:!1,note:`Back in the page: clipped by the card, and painted under a z-index of 99999.`}};function a(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Element" data-part="switcher" data-value="dialog">
            <button class="sp-segment" type="button" data-part="seg-dialog" value="dialog">a dialog</button>
            <button class="sp-segment" type="button" data-part="seg-popover" value="popover">a popover</button>
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain">a plain div</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="page"
            style="position: relative; flex: 0 0 auto; width: 444px; height: 186px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div
              data-part="panel"
              style="position: absolute; left: ${n.x}px; top: ${n.y}px; width: ${n.w}px; height: ${n.h}px; z-index: 1; padding: 10px; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
            >
              <div class="sp-context">
                <span class="sp-heading" style="font-size: 12px">Order card</span>
                <span style="display: block; margin-top: 5px; font-family: ${t}; font-size: 11px; color: var(--sp-muted)">overflow: hidden</span>
                <div class="sp-stack" style="margin-top: 10px; gap: 7px">
                  <div class="sp-line" style="width: 82%"></div>
                  <div class="sp-line" style="width: 60%"></div>
                </div>
              </div>
              <div data-part="slot-page" style="position: absolute; inset: 0; z-index: 10"></div>
            </div>
            <div
              class="sp-context"
              data-part="ribbon"
              style="position: absolute; left: 16px; top: 112px; right: 16px; height: 30px; z-index: 99999; display: flex; align-items: center; gap: 10px; padding: 0 12px; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 6px"
            >
              <span style="font-family: ${t}; font-size: 11.5px">z-index: 99999</span>
            </div>
            <div data-part="layer" style="position: absolute; inset: 0; z-index: 2147483000">
              <div class="sp-scrim" data-part="scrim"></div>
              <div data-part="slot-top" style="position: absolute; inset: 0"></div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="display: block; flex: 0 0 auto; width: 440px; height: 40px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let a=document.createElement(`div`);a.dataset.part=`surface`,a.setAttribute(`data-subject`,``),a.setAttribute(`data-pose`,`[data-layer=top]`),a.setAttribute(`data-open`,``),a.style.setProperty(`--sp-arrow-x`,`20px`),a.innerHTML=`
    <span class="sp-heading" style="font-size: 13px">Order 4127</span>
    <span class="sp-text" style="display: block; margin-top: 4px; font-size: 12px">Shipped Tuesday, two parcels.</span>`;let o={top:e(r,`slot-top`),page:e(r,`slot-page`)},s=e(r,`scrim`),c=e(r,`readout`),l=e=>{let t=i[e];t&&(a.className=t.className,a.dataset.layer=t.layer,a.style.left=t.left,a.style.top=t.top,a.style.width=t.width,o[t.layer].append(a),t.scrim?s.setAttribute(`data-open`,``):s.removeAttribute(`data-open`),c.textContent=t.note)};e(r,`switcher`).addEventListener(`change`,e=>l(e.detail)),l(`dialog`)}export{a as mount};