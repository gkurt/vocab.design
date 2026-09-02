import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Receipt archived under 2f9ce1a488b04d17a3fe05c99b1d24e6 for the accounting department.`,n=148,r=18,i={normal:{wrap:`normal`,brk:`normal`,css:`no permission given`},"break-word":{wrap:`break-word`,brk:`normal`,css:`overflow-wrap: break-word`},"break-all":{wrap:`normal`,brk:`break-all`,css:`word-break: break-all`}};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Unbreakable string</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Setting" data-part="segmented" data-value="break-word">
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
            <button class="sp-segment" data-part="seg-break-word" value="break-word">break-word</button>
            <button class="sp-segment" data-part="seg-break-all" value="break-all">break-all</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">column: ${n}px</span>
            <div data-part="slot" style="width: 232px; height: 108px; overflow: hidden">
              <div style="width: ${n}px; height: 100%; border-right: 1px dashed var(--sp-line)">
                <p class="sp-text sp-text--ink" data-part="column" data-subject data-break="break-word"
                   data-contained data-pose="[data-contained]"
                   style="margin: 0; padding-right: 6px; font-size: 12px; line-height: ${r}px;
                          overflow-wrap: break-word">${t}</p>
              </div>
            </div>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 152px">
            <!-- Two lines' room: the longest declaration wraps, and a shorter one must not
                 change the height of the column beside it (SPEC §5). -->
            <span class="sp-label" data-part="css" style="color: var(--sp-ink); height: 36px"></span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          Break-word waits until a word cannot fit at all. Break-all stops waiting, which is right for a
          column of identifiers and wrong for prose.
        </p>
      </div>
    </div>
  `;let o=e(a,`column`),s=e(a,`css`),c=e=>{let t=i[e];t&&(o.dataset.break=e,o.style.overflowWrap=t.wrap,o.style.wordBreak=t.brk,e===`normal`?o.removeAttribute(`data-contained`):o.setAttribute(`data-contained`,``),s.textContent=t.css)};c(`break-word`),e(a,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{a as mount};