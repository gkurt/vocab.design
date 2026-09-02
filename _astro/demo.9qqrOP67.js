import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={flat2:{radius:`10px`,media:`6px`,shadow:`0 6px 16px rgb(16 24 40 / 0.18)`,wash:`linear-gradient(150deg, #5b83f6, #8a5cf0)`,fill:`linear-gradient(180deg, #5b83f6, #3d61d8)`,lift:`0 2px 5px rgb(44 74 190 / 0.42)`,note:`A soft shadow, one shallow gradient, a lifted button: depth spent only where it says this can be acted on.`},strict:{radius:`0px`,media:`0px`,shadow:`none`,wash:`#5b83f6`,fill:`#3d61d8`,lift:`none`,note:`Strict flat: identical geometry with every cue removed, so nothing on the card says which rectangle answers a click.`}},n=`flat2`;function r(r){let i=t[n];if(!i)return;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-stack" style="align-items: center; gap: 10px">
        <div class="sp-row sp-row--between sp-context" style="width: 236px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${n}" data-axis="Style" data-term="flat2">
            <button class="sp-segment" data-part="seg-flat2" value="flat2">Flat 2.0</button>
            <button class="sp-segment" data-part="seg-strict" value="strict">Strict</button>
          </sp-segmented>
        </div>

        <div data-part="card" data-subject data-style="${n}" data-pose="[data-style=flat2]"
             style="width: 236px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                    border-radius: var(--c-radius); box-shadow: var(--c-shadow)">
          <div data-part="media" aria-hidden="true"
               style="height: 62px; border-radius: var(--c-media); background: var(--c-wash)"></div>
          <div style="margin-top: 10px; font-size: 14px; font-weight: 600">Harbour Line</div>
          <div class="sp-text" style="font-size: 12px">Departs 18:40, platform 2</div>
          <div class="sp-row" style="margin-top: 12px; gap: 8px">
            <button class="sp-button sp-button--sm" data-part="action" type="button"
                    style="border-radius: var(--c-media); background: var(--c-fill); box-shadow: var(--c-lift)">Book seat</button>
            <button class="sp-button sp-button--sm sp-button--ghost" data-part="details" type="button"
                    style="border-radius: var(--c-media)">Details</button>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="width: 236px; min-height: 48px; margin: 0; text-align: center; font-size: 11px">${i.note}</p>
      </div>
    </div>
  `;let a=e(r,`card`),o=e(r,`note`),s=e=>{let n=t[e];n&&(a.dataset.style=e,a.style.setProperty(`--c-radius`,n.radius),a.style.setProperty(`--c-media`,n.media),a.style.setProperty(`--c-shadow`,n.shadow),a.style.setProperty(`--c-wash`,n.wash),a.style.setProperty(`--c-fill`,n.fill),a.style.setProperty(`--c-lift`,n.lift),o.textContent=n.note)};s(n),e(r,`segmented`).addEventListener(`change`,e=>s(e.detail))}export{r as mount};