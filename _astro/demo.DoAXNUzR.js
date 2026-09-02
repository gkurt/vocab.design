import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={block:`A grey block is a region of content. Something goes here; what goes here is not the argument yet.`,image:`A box with a cross drawn through it is a picture. Nobody has chosen which picture, or cropped it.`,text:`Ruled lines are text: one heavy line for a heading, a stack of short ones for a paragraph.`},r={block:`content block`,image:`image`,text:`text`},i=`color-mix(in oklab, var(--sp-muted) 42%, transparent)`;function a(a){let o=`
    <span data-part="image-box" data-conv="image"
          style="position: relative; display: block; height: 48px; border: 1.5px solid ${i}; border-radius: 3px">
      <svg viewBox="0 0 242 48" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true" style="display: block">
        <path d="M0 0 242 48M242 0 0 48" fill="none" stroke="${i}" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
      </svg>
    </span>`,s=e=>`
    <span data-part="block-nav-${e}" data-conv="block"
          style="display: block; width: 26px; height: 9px; border-radius: 3px; background: var(--sp-line)"></span>`,c=e=>`
    <span data-part="block-card-${e}" data-conv="block"
          style="display: block; flex: 1 1 0; height: 38px; border-radius: 4px; background: var(--sp-line)"></span>`;a.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 412px; padding: 11px 14px 13px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Home screen, structure only</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Convention" data-part="convention" data-value="block" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-block" value="block"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Blocks</button>
            <button class="sp-segment" type="button" data-part="seg-image" value="image"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Image</button>
            <button class="sp-segment" type="button" data-part="seg-text" value="text"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Text</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div data-part="drawing" data-subject
               style="display: flex; flex-direction: column; gap: 9px; flex: 0 0 auto; width: 262px; height: 189px;
                      padding: 10px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                      border-radius: var(--sp-radius)">
            <span class="sp-row" style="gap: 6px; height: 14px">
              <span data-part="block-logo" data-conv="block"
                    style="display: block; width: 34px; height: 13px; border-radius: 3px; background: var(--sp-line)"></span>
              <span class="sp-grow"></span>
              ${s(1)}${s(2)}${s(3)}
            </span>
            ${o}
            <span data-part="text-heading" data-conv="text"
                  style="display: block; width: 118px; height: 11px; border-radius: 4px; background: ${i}"></span>
            <span class="sp-stack" style="gap: 5px">
              <span class="sp-line" data-part="text-line-1" data-conv="text"></span>
              <span class="sp-line" data-part="text-line-2" data-conv="text" style="width: 72%"></span>
            </span>
            <span class="sp-row" style="gap: 8px; margin-top: auto">
              ${c(1)}${c(2)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 7px; justify-content: center">
            <span class="sp-label" data-part="legend-label" data-convention="block" style="font-size: 10px">
              Marked: ${r.block}
            </span>
            <p class="sp-text" data-stage-verdict data-part="legend" data-convention="block"
               style="margin: 0; height: 74px; font-size: 11px; line-height: 1.35">${n.block}</p>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(a,`legend`),u=e(a,`legend-label`),d=[...e(a,`drawing`).querySelectorAll(`[data-conv]`)],f=e=>{for(let n of d){let r=n.dataset.conv===e;t(n,`data-marked`,r),n.style.outline=r?`1.5px dashed var(--sp-ink)`:`none`,n.style.outlineOffset=r?`2px`:`0`}l.textContent=n[e],l.dataset.convention=e,u.textContent=`Marked: ${r[e]}`,u.dataset.convention=e};f(`block`),e(a,`convention`).addEventListener(`change`,e=>{let t=e.detail;f(t===`image`?`image`:t===`text`?`text`:`block`)})}export{a as mount};