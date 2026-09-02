import{n as e}from"./parts.C-YLuC7Q.js";var t=24,n=1e4,r=168,i=3,a=Math.ceil(r/t),o=[`pump`,`valve`,`boiler`,`chiller`,`fan`,`meter`];function s(e){let t=e%60,n=Math.floor(e/60)%24;return`${String(n).padStart(2,`0`)}:${String(t).padStart(2,`0`)}`}function c(e){let n=e+1;return`
    <div class="sp-row" data-part="row-${n}" style="position: absolute; left: 0; right: 0; top: ${e*t}px; height: ${t}px; gap: 10px; padding: 0 10px; border-top: 1px solid var(--sp-line)">
      <span class="sp-label" style="flex: 0 0 46px; font-size: 11px">#${n}</span>
      <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${o[e%o.length]} ${e%24+1} reported in</span>
      <span class="sp-label" style="font-size: 11px">${s(e)}</span>
    </div>`}function l(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 302px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Site telemetry</span>
          <span class="sp-label">10,000 rows</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-scroll sp-surface" data-part="viewport" data-subject style="flex: 0 0 auto; height: ${r}px">
            <div data-part="spacer" style="position: relative; height: ${n*t}px">
              <div data-part="window"></div>
            </div>
          </div>
          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; height: 18px">
            <span class="sp-text sp-text--ink" data-part="readout" data-count="0" style="font-size: 12px; white-space: nowrap"></span>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="caption" style="flex: 0 0 auto; height: 34px; font-size: 11px">
            The scrollbar belongs to the whole list. A spacer holds the height of everything not rendered.
          </span>
        </div>
      </div>
    </div>
  `;let s=e(o,`viewport`),l=e(o,`window`),u=e(o,`readout`),d=-1,f=()=>{let e=Math.max(0,Math.floor(s.scrollTop/t)-i);if(e===d)return;d=e;let r=Math.min(n,e+a+6);l.innerHTML=Array.from({length:r-e},(t,n)=>c(e+n)).join(``),u.dataset.count=String(r-e),u.textContent=`${r-e} rendered, rows ${e+1} to ${r}`};s.addEventListener(`scroll`,f),f()}export{l as mount};