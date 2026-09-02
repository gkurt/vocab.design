import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=200,n=206,r=6,i=188,a=26,o=[{key:`inset`,label:`inset`,stop:a,dim:!1,note:`Inset: the content region stops at the reported inset, so the whole button is above the strip. A swipe that starts in the strip goes home, and nothing of yours is down there to lose it.`},{key:`under`,label:`under it`,stop:0,dim:!1,note:`Under it: the button reaches the bottom edge, so its lower half sits beneath the indicator. It still looks tappable, and a swipe that starts on it goes home instead.`},{key:`immersive`,label:`immersive`,stop:0,dim:!0,note:`Immersive: the system dims the indicator so it stops competing with full screen content. Dimmed is not gone. The strip keeps the gesture, and the first swipe up brings the bar back.`}],s=e=>`
  <span style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: 20px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 16px; height: 16px; border-radius: 50%; --sp-swatch: var(--sp-accent-soft)"></span>
    <span class="sp-line" style="flex: 0 0 auto; width: ${e}px; height: 6px"></span>
  </span>`,c=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px">
    ${e.label}
  </button>`;function l(l){let u=o[0];l.innerHTML=`
    <div class="sp-app">
      <div
        data-part="phone"
        style="position: relative; flex: 0 0 auto; width: ${t}px; height: ${n}px; padding: 0 ${r}px ${r}px;
               background: #23262b; border-radius: 0 0 24px 24px"
      >
        <div
          data-part="display"
          style="position: relative; width: ${i}px; height: 200px; overflow: hidden;
                 border-radius: 0 0 18px 18px; background: var(--sp-surface)"
        >
          <div
            data-part="content"
            style="position: absolute; left: 0; right: 0; top: 0; bottom: ${u.stop}px; display: flex; flex-direction: column;
                   gap: 8px; padding: 10px; transition: bottom 0.26s var(--sp-ease)"
          >
            <div style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-height: 0; overflow: hidden">
              ${[132,94,138,104,124].map(s).join(``)}
            </div>
            <button class="sp-button" type="button" data-part="action" style="flex: 0 0 auto; padding: 6px 12px; font-size: 12px">
              Continue
            </button>
          </div>

          <span
            class="sp-context"
            data-part="swipe"
            aria-hidden="true"
            style="position: absolute; left: 50%; bottom: 6px; translate: -50% 0; z-index: 2"
          >
            <svg viewBox="0 0 40 58" width="40" height="58" style="display: block; overflow: visible">
              <!-- Drawn twice: a light halo under the marker keeps it legible over the button as well
                   as over the page behind it. -->
              <path
                d="M20 54 L20 12 M12 20 L20 12 L28 20"
                fill="none" stroke="var(--sp-surface)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"
              />
              <path
                d="M20 54 L20 12 M12 20 L20 12 L28 20"
                fill="none" stroke="var(--sp-muted)" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 5"
              />
            </svg>
          </span>

          <div
            data-part="strip"
            data-subject
            data-mode="${u.key}"
            style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; height: ${a}px;
                   display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px;
                   background: linear-gradient(to top, rgb(16 24 40 / 0.16), rgb(16 24 40 / 0))"
          >
            <span
              data-part="pill"
              style="width: 76px; height: 5px; border-radius: 3px; background: #23262b;
                     transition: opacity 0.26s var(--sp-ease)"
            ></span>
          </div>
        </div>
      </div>

      <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Content" data-value="${u.key}">
        ${o.map(c).join(``)}
      </sp-segmented>
      <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="max-width: 420px; text-align: center"></span>
    </div>
  `;let d=e(l,`strip`),f=e(l,`content`),p=e(l,`pill`),m=e(l,`readout`),h=e=>{let t=o.find(t=>t.key===e);t&&(d.dataset.mode=t.key,f.style.bottom=`${t.stop}px`,p.style.opacity=t.dim?`0.28`:`1`,m.textContent=t.note)};e(l,`modes`).addEventListener(`change`,e=>h(e.detail)),h(u.key)}export{l as mount};