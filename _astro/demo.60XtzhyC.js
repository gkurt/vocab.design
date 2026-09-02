import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Meiryo, 'MS Gothic', sans-serif`,r=`この`,i=`はしずかです。`,a=`図書館`,o=`としょかん`,s=[[`図`,`と`],[`書`,`しょ`],[`館`,`かん`]],c=[[a,o]],l={off:`no ruby`,mono:`mono ruby`,group:`group ruby`,fallback:`ruby not supported`},u=66,d=27;function f(e){if(e===`off`)return a;let t=e===`mono`?s:c,n=e===`fallback`?`display: none`:`font-size: 0.5em`,r=e===`fallback`?`display: inline; font-size: 0.62em`:`display: none`;return t.map(([e,t])=>`${e}<rp style="${r}">(</rp><rt style="${n}">${t}</rt><rp style="${r}">)</rp>`).join(``)}function p(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Ruby" data-part="segmented" data-value="mono">
            <button class="sp-segment" data-part="seg-off" value="off">off</button>
            <button class="sp-segment" data-part="seg-mono" value="mono">mono</button>
            <button class="sp-segment" data-part="seg-group" value="group">group</button>
            <button class="sp-segment" data-part="seg-fallback" value="fallback">fallback</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="line" style="align-items: flex-end; height: ${u}px; margin-top: 10px">
          <p data-part="sentence" data-mode="mono"
             style="margin: 0; font-family: ${n}; font-size: ${d}px; line-height: normal"><span
             class="sp-context">${r}</span><span data-part="run" data-subject data-annotated
             data-pose="[data-annotated]" style="display: inline-block"><ruby data-part="ruby"></ruby></span><span
             class="sp-context">${i}</span></p>
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="readout" style="gap: 8px; height: 24px; margin-top: 8px">
          <span class="sp-chip" data-part="read" style="cursor: default"></span>
          <span class="sp-label" data-part="gloss">toshokan, "library"</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          Ruby is a reading aid with a fallback, not decoration. The rp elements hold parentheses that
          stay hidden wherever ruby renders, and read as ordinary text wherever it does not.
        </p>
      </div>
    </div>
  `;let o=e(a,`sentence`),s=e(a,`run`),c=e(a,`ruby`),p=e(a,`read`),m=e=>{let n=l[e];n&&(o.dataset.mode=e,c.innerHTML=f(e),t(s,`data-annotated`,e!==`off`),p.textContent=n)};m(`mono`),e(a,`segmented`).addEventListener(`change`,e=>m(e.detail))}export{p as mount};