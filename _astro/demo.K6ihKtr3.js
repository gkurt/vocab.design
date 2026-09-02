import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,r=`afterglow`,i=12,a=`display: inline-block; transform: skewX(-${i}deg); transform-origin: 0 100%`,o={roman:{css:`font-style: normal`,decl:`font-style: normal`,note:`The reference. Every letter as the family draws it standing up.`},italic:{css:`font-style: italic`,decl:`font-style: italic`,note:`The a closes to one storey and the f grows a descender: different letters, not the same ones leaning.`},oblique:{css:a,decl:`transform: skewX(-${i}deg)`,note:`Same letters, leaning. Nothing is redrawn, so the live letter lands exactly on the pale one behind it.`}},s=e=>e in o,c=54,l=104,u=`a`;function d(i){let d=e=>`font-family: ${n}; font-size: 40px; line-height: 1.2; white-space: nowrap; ${e}`,f=e=>`position: absolute; left: 26px; bottom: 10px; font-family: ${n}; font-size: 74px; line-height: 1; ${e}`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Style" data-term="oblique" data-part="segmented" data-value="oblique">
            <button class="sp-segment" data-part="seg-roman" value="roman">roman</button>
            <button class="sp-segment" data-part="seg-italic" value="italic">italic</button>
            <button class="sp-segment" data-part="seg-oblique" value="oblique">oblique</button>
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: center; height: ${c}px; padding-left: 4px; margin-top: 4px; overflow: hidden">
          <span data-part="line" data-subject data-slant="oblique" data-sheared data-pose="[data-sheared]"
                style="${d(o.oblique.css)}">${r}</span>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start; margin-top: 2px">
          <div data-part="detail" class="sp-surface"
               style="position: relative; flex: 0 0 auto; width: ${l}px; height: ${l}px; overflow: hidden">
            <span data-part="detail-ghost" aria-hidden="true"
                  style="${f(`${a}; color: color-mix(in oklab, var(--sp-ink) 20%, transparent)`)}">${u}</span>
            <span data-part="detail-live" aria-hidden="true"
                  style="${f(o.oblique.css)}">${u}</span>
          </div>
          <div class="sp-stack" style="gap: 6px; padding-top: 2px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${o.oblique.decl}</span>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; width: 290px; height: 59px">${o.oblique.note}</p>
          </div>
        </div>
      </div>
    </div>
  `;let p=e(i,`line`),m=e(i,`detail-live`),h=e(i,`readout`),g=e(i,`note`);e(i,`segmented`).addEventListener(`change`,e=>{let n=e.detail;if(!s(n))return;let r=o[n];p.dataset.slant=n,t(p,`data-sheared`,n===`oblique`),p.style.cssText=d(r.css),m.style.cssText=f(r.css),h.textContent=r.decl,g.textContent=r.note})}export{d as mount};