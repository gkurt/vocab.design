import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[-5.2,-3.4,-1.1,.6,2.3,4.1,6.2,7.4,5,1.8,-2.6,-4.8],r=8,i=46,a={zero:0,offset:4},o={zero:`The join sits on zero, so one arm means colder than normal and the other warmer, and distance out means how much.`,offset:`The join has been dragged to +4. Four warm months are now painted in the cool arm, and only the colour moved: the bars are unchanged.`},s=`zero`,c=(e,t)=>{let n=Math.max(-1,Math.min(1,(e-t)/r)),i=Math.abs(n);return`oklch(${(.93-.42*i).toFixed(3)} ${(.005+.135*i).toFixed(3)} ${n<0?248:28})`},l=e=>{let t=[];for(let n=0;n<=10;n++){let i=-8+n/10*r*2;t.push(`${c(i,e)} ${n*10}%`)}return`linear-gradient(90deg, ${t.join(`, `)})`},u=e=>e>0?`+${e}`:String(e);function d(d){let f=a[s]??0;d.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Neutral at" data-term="zero" data-part="segmented" data-value="${s}">
            <button class="sp-segment" data-part="seg-zero" value="zero">0</button>
            <button class="sp-segment" data-part="seg-offset" value="offset">+4</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="scale" data-subject data-pose="[data-centre=zero]" data-centre="${s}"
             style="margin-top: 10px; padding: 12px">
          <div class="sp-row" style="gap: 8px; align-items: stretch">
            <div class="sp-stack" style="flex: 0 0 24px; height: 92px; justify-content: space-between; gap: 0">
              <span class="sp-label" style="font-size: 9px">+8</span>
              <span class="sp-label" style="font-size: 9px">0</span>
              <span class="sp-label" style="font-size: 9px">-8</span>
            </div>
            <div data-part="chart" style="position: relative; flex: 1 1 auto; display: flex; gap: 6px; height: 92px">
              <span style="position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--sp-line)"></span>
              ${n.map((e,t)=>{let n=Math.round(Math.abs(e)/r*i),a=e>=0;return`
      <span style="flex: 1 1 0; position: relative">
        <span class="sp-swatch" data-part="bar" data-month="${t}" data-sign="${a?`up`:`down`}"
              style="position: absolute; left: 0; right: 0; ${a?`bottom: 50%; border-radius: 3px 3px 0 0`:`top: 50%; border-radius: 0 0 3px 3px`}; height: ${n}px; --sp-swatch: ${c(e,f)}"></span>
      </span>`}).join(``)}
            </div>
          </div>

          <div style="position: relative; margin: 10px 0 0 32px">
            <div data-part="ramp" style="height: 14px; border-radius: 4px; background: ${l(f)}"></div>
            <span data-part="pin" style="position: absolute; top: -3px; bottom: -3px; width: 2px; border-radius: 1px;
                  background: var(--sp-ink); left: 50%; translate: -1px 0"></span>
            <span class="sp-label" data-part="marker" data-at="${f}"
                  style="position: absolute; top: 15px; left: 50%; translate: -50% 0; color: var(--sp-ink); font-size: 10px">0</span>
          </div>
          <div class="sp-row sp-row--between" style="margin: 16px 0 0 32px">
            <span class="sp-label" style="font-size: 10px">colder</span>
            <span class="sp-label" style="font-size: 10px">warmer</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" data-centre="${s}"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${o[s]}</p>
      </div>
    </div>
  `;let p=e(d,`scale`),m=e(d,`ramp`),h=e(d,`pin`),g=e(d,`marker`),_=e(d,`note`),v=t(d,`bar`),y=e=>{let t=a[e];if(t===void 0)return;p.dataset.centre=e,m.style.background=l(t);let i=`${(t+r)/16*100}%`;h.style.left=i,g.style.left=i,g.dataset.at=String(t),g.textContent=u(t),v.forEach((e,r)=>{let i=n[r];i!==void 0&&e.style.setProperty(`--sp-swatch`,c(i,t))}),_.dataset.centre=e,_.textContent=o[e]??``};y(s),e(d,`segmented`).addEventListener(`change`,e=>y(e.detail))}export{d as mount};