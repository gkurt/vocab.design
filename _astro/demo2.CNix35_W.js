import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`'Geist Variable', ui-sans-serif, system-ui, sans-serif`,r=120,i={i:{char:`i`,dot:{left:.08,bottom:.615,width:.085,height:.095},read:`U+0069, lowercase i`,note:`The dot is a second contour inside the same glyph, floating clear of the stem at about ascender height.`},j:{char:`j`,dot:{left:.095,bottom:.615,width:.085,height:.095},read:`U+006A, lowercase j`,note:`The j carries one too, at the same height, over a stem that continues below the baseline.`},dotless:{char:`ı`,dot:null,read:`U+0131, dotless i`,note:`Turkish and Azerbaijani have a letter with no tittle at all. It is a different letter, not an i with the mark removed.`},capital:{char:`İ`,dot:{left:.115,bottom:.73,width:.105,height:.105},read:`U+0130, capital I with dot above`,note:`The Turkish capital of a dotted i keeps its tittle, which is why uppercasing an i depends on the locale.`}},a=e=>e in i,o=.042,s=e=>`left: ${(e.left-o).toFixed(3)}em; bottom: ${(e.bottom-o).toFixed(3)}em; width: ${(e.width+o*2).toFixed(3)}em; height: ${(e.height+o*2).toFixed(3)}em`,c=e=>`position: absolute; ${s(e)}; border-radius: 4px; background: color-mix(in oklab, var(--sp-accent) 40%, transparent)`;function l(o){let s=i.i;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Letter" data-part="segmented" data-value="i">
            <button class="sp-segment" data-part="seg-i" value="i">i</button>
            <button class="sp-segment" data-part="seg-j" value="j">j</button>
            <button class="sp-segment" data-part="seg-dotless" value="dotless">dotless ı</button>
            <button class="sp-segment" data-part="seg-capital" value="capital">capital İ</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; align-items: flex-start; margin-top: 8px">
          <div data-part="panel" class="sp-surface"
               style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
                      width: 132px; height: 168px; overflow: hidden">
            <span data-part="glyph" data-letter="i"
                  style="font-family: ${n}; font-size: ${r}px; line-height: 1.2; white-space: nowrap"><span
              style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline"><span
                data-part="marker" data-subject data-dotted data-pose="[data-dotted]"
                style="${c(s.dot)}"></span></span>${s.char}</span>
          </div>
          <div class="sp-stack sp-context" style="gap: 8px; padding-top: 6px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${s.read}</span>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; width: 258px; height: 78px">${s.note}</p>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(o,`glyph`),u=e(o,`marker`),d=e(o,`readout`),f=e(o,`note`);e(o,`segmented`).addEventListener(`change`,e=>{let n=e.detail;if(!a(n))return;let r=i[n];l.dataset.letter=n,l.lastChild?.replaceWith(r.char),t(u,`data-dotted`,r.dot!==null),u.hidden=r.dot===null,r.dot&&(u.style.cssText=c(r.dot)),d.textContent=r.read,f.textContent=r.note})}export{l as mount};