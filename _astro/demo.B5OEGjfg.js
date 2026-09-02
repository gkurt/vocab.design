import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as n,n as r}from"./measure.DK7AY2_i.js";var i=`'Source Serif 4 Variable', Georgia, serif`,a=`Georgia, 'Times New Roman', serif`,o=`The quiet return of the night ferry`,s=30,c=132,l=56,u=e=>e===`web`||e===`fallback`||e===`tuned`;function d(d,f){d.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Family" data-term="tuned" data-value="tuned" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-web" value="web">web font</button>
            <button class="sp-segment" data-part="seg-fallback" value="fallback">fallback</button>
            <button class="sp-segment" data-part="seg-tuned" value="tuned">tuned</button>
          </sp-segmented>
        </div>
        <div data-part="page" style="position: relative; height: ${c}px; margin-top: 6px; padding-right: ${l}px">
          <h3 data-part="headline" data-subject data-mode="web" data-pose="[data-tuned]"
              style="margin: 0; font-family: ${i}; font-size: ${s}px; line-height: normal; font-weight: 600">${o}</h3>
          <p class="sp-text sp-context" data-part="body" style="margin: 10px 0 0; line-height: 19px">
            The last sailing of the season leaves at half past six, and the winter crossings begin
            the following week.
          </p>
          <span data-part="band" aria-hidden="true"
                style="position: absolute; right: 0; width: 46px; background: color-mix(in oklab, var(--sp-ink) 16%, transparent)"></span>
          <span data-part="guide" aria-hidden="true"
                style="position: absolute; right: 0; width: 46px; height: 3px; background: var(--sp-muted)"></span>
          <span data-part="mark" aria-hidden="true"
                style="position: absolute; right: 0; width: 46px; height: 3px; background: var(--sp-ink)"></span>
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="readout" style="height: 24px; margin-top: 4px">
          <span class="sp-chip" data-part="declaration" style="cursor: default"></span>
          <span class="sp-chip" data-part="shift" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          The marks on the right are where the body sat with the real face, and where it sits now. With
          no stylesheet to hold an @font-face rule, the tuned setting states both corrections inline.
        </p>
      </div>
    </div>
  `;let p=e(d,`page`),m=e(d,`headline`),h=e(d,`body`),g=e(d,`guide`),_=e(d,`mark`),v=e(d,`band`),y=e(d,`declaration`),b=e(d,`shift`),x=()=>Math.round(r(h,p).top),S=x();g.style.top=`${S}px`;let C=p.ownerDocument.createElement(`span`);C.setAttribute(`aria-hidden`,`true`),C.textContent=o,C.style.cssText=`position: absolute; top: 0; left: 0; visibility: hidden; white-space: nowrap;
    font-size: ${s}px; line-height: normal; font-weight: 600`,p.append(C);let w=e=>{C.style.fontFamily=e;let t=n(C);return{width:t.width,line:t.height}},T=w(i),E=w(a);C.remove();let D=E.width>0?T.width/E.width:1,O=(D*100).toFixed(1),k={web:{family:i,size:s,line:`normal`,read:`the real face, no overrides`},fallback:{family:a,size:s,line:`normal`,read:`the stand-in, no overrides`},tuned:{family:a,size:s*D,line:`${T.line.toFixed(1)}px`,read:`size-adjust: ${O}%`}},A=()=>{let e=x(),t=e-S;_.style.top=`${e}px`,v.style.top=`${Math.min(e,S)}px`,v.style.height=`${Math.abs(t)}px`,b.textContent=t===0?`shift: 0px`:`shift: ${t>0?`+`:``}${t}px`},j=e=>{if(!u(e))return;let n=k[e];m.dataset.mode=e,t(m,`data-tuned`,e===`tuned`),m.style.fontFamily=n.family,m.style.fontSize=`${n.size.toFixed(2)}px`,m.style.lineHeight=n.line,y.textContent=n.read,f.setTimeout(A,0)};j(`tuned`),e(d,`segmented`).addEventListener(`change`,e=>j(e.detail))}export{d as mount};