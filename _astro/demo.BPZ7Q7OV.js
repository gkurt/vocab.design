import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Source Serif 4 Variable', Georgia, serif`,n=`font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px`,r=[{tag:`liga`,text:`waffle office`,note:`Standard ligatures`},{tag:`frac`,text:`1/2 and 3/4`,note:`Fractions`},{tag:`smcp`,text:`small caps`,note:`Small capitals`}];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="off" data-axis="font-feature-settings">
            <button class="sp-segment" data-part="seg-off" value="off">0</button>
            <button class="sp-segment" data-part="seg-on" value="on">1</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" data-part="rows" data-subject data-features="off" style="gap: 2px; margin-top: 10px">
          ${r.map(({tag:e,text:r,note:i})=>`
    <div class="sp-row" style="gap: 10px; height: 34px">
      <span data-part="tag-${e}" style="${n}; flex: 0 0 54px; color: var(--sp-muted)">"${e}"</span>
      <span data-part="sample-${e}" style="flex: 0 0 176px; font-family: ${t}; font-size: 21px; white-space: nowrap">${r}</span>
      <span class="sp-label sp-grow" data-part="note-${e}" style="font-size: 12px; white-space: nowrap">${i}</span>
    </div>`).join(``)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          The text never changes: the string stays "1/2 and 3/4" and only the drawing is swapped.
          A tag the file does not carry fails quietly, which is why a face has to be checked.
        </p>
      </div>
    </div>
  `;let a=e(i,`rows`),o=r.map(({tag:t})=>[t,e(i,`sample-${t}`)]),s=e=>{if(e===`off`||e===`on`){a.dataset.features=e;for(let[t,n]of o)n.style.fontFeatureSettings=`"${t}" ${+(e===`on`)}`}};s(`off`),e(i,`segmented`).addEventListener(`change`,e=>s(e.detail))}export{i as mount};