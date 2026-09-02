import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=6,r={w:410,h:122},i=306,a={view:`2 20 144 96`,w:150,h:100};function o(e){return`M 11 55 a 28 28 0 1 0 56 0 a 28 28 0 1 0 -56 0 ${e===`swash`?`M 47 69 C 64 104, 112 110, 140 78`:`M 47 69 L 68 94`}`}function s(e){return`M 220 24 V 86 M 220 24 H 244 A 16 16 0 0 1 244 56 H 220 ${e===`swash`?`M 240 56 C 256 78, 264 104, 300 98`:`M 240 56 L 262 86`}`}function c(e){return`M 288 24 V 86 M 328 24 L 294 55 ${e===`swash`?`M 302 47 C 322 68, 344 102, 396 80`:`M 302 47 L 334 86`}`}var l=`M 86 24 V 65 A 21 21 0 0 0 128 65 V 24`,u=`M 148 86 L 175 24 L 202 86 M 159 63 H 191`,d={off:{q:`plain`,r:`plain`,k:`plain`,read:`"swsh" 0: the ordinary drawings`},initial:{q:`swash`,r:`plain`,k:`plain`,read:`"swsh" 1 on the first capital only`},every:{q:`swash`,r:`swash`,k:`swash`,read:`"swsh" 1 on every capital in the word`}};function f(f){let p=`fill="none" stroke="currentColor" stroke-width="${n}" stroke-linecap="round" stroke-linejoin="round"`;f.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Swash forms" data-part="segmented" data-value="initial">
            <button class="sp-segment" data-part="seg-off" value="off">off</button>
            <button class="sp-segment" data-part="seg-initial" value="initial">initial</button>
            <button class="sp-segment" data-part="seg-every" value="every">every</button>
          </sp-segmented>
        </div>
        <svg data-part="line" data-subject data-mode="initial" data-swashed data-pose="[data-swashed]"
             viewBox="0 0 ${r.w} ${r.h}" width="${i}" height="${Math.round(i*r.h/r.w)}"
             role="img" aria-label="The word QUARK drawn with swash capitals"
             style="display: block; margin-top: 6px">
          <path data-part="glyph-q" ${p} d=""></path>
          <path ${p} d="${l}"></path>
          <path ${p} d="${u}"></path>
          <path data-part="glyph-r" ${p} d=""></path>
          <path data-part="glyph-k" ${p} d=""></path>
        </svg>
        <div class="sp-row sp-context" style="gap: 14px; align-items: flex-start; margin-top: 4px">
          <svg data-part="detail" viewBox="${a.view}" width="${a.w}" height="${a.h}"
               aria-hidden="true" style="flex: 0 0 auto; display: block">
            <path data-part="glyph-detail" ${p} d=""></path>
          </svg>
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label" data-part="read" style="color: var(--sp-ink)"></span>
            <p class="sp-text" data-stage-verdict data-part="caption" style="margin: 0">
              The ring, the bowl and the arm never change. A swash is the same letter with its exit
              stroke carried on, so it needs room to travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;let m=e(f,`line`),h=e(f,`glyph-q`),g=e(f,`glyph-r`),_=e(f,`glyph-k`),v=e(f,`glyph-detail`),y=e(f,`read`),b=e=>{let n=d[e];n&&(m.dataset.mode=e,t(m,`data-swashed`,e!==`off`),h.setAttribute(`d`,o(n.q)),g.setAttribute(`d`,s(n.r)),_.setAttribute(`d`,c(n.k)),v.setAttribute(`d`,o(n.q)),y.textContent=n.read)};b(`initial`),e(f,`segmented`).addEventListener(`change`,e=>b(e.detail))}export{f as mount};