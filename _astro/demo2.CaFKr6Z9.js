import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,r=34,i=`MAY`,a=`1987`,o=`0123456789`,s={lining:{css:`lining-nums`,read:`font-variant-numeric: lining-nums`},oldstyle:{css:`oldstyle-nums`,read:`font-variant-numeric: oldstyle-nums`}},c=e=>e in s;function l(e,t,n){return`<span data-part="${e}" style="position: absolute; left: 12px; right: 0; ${t}; height: 2px; background: ${n}"></span>`}function u(u){let d=(e,t,n=``,r=``)=>`<span data-part="${e}" data-figures="lining" ${n}
           style="font-variant-numeric: ${s.lining.css}; ${r}">${t}</span>`;u.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="lining" data-axis="Figure style" data-term="lining">
            <button class="sp-segment" data-part="seg-lining" value="lining">lining</button>
            <button class="sp-segment" data-part="seg-oldstyle" value="oldstyle">oldstyle</button>
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: baseline; height: 66px; margin-top: 6px">
          <p data-part="date" style="margin: 0; font-family: ${n}; font-size: ${r}px; line-height: 1.2; white-space: nowrap">
            <span>${i}&#8202;</span>${d(`year`,a,`data-subject data-pose="[data-figures=lining]"`)}
          </p>
          <i class="sp-context" data-part="rules"
             style="position: relative; flex: 1 1 auto; height: 0; font-family: ${n}; font-size: ${r}px">
            ${l(`rule-cap`,`bottom: 0.7em; bottom: 1cap`,`color-mix(in oklab, var(--sp-accent) 60%, transparent)`)}
            ${l(`rule-base`,`bottom: 0`,`color-mix(in oklab, var(--sp-ink) 30%, transparent)`)}
          </i>
        </div>
        <div class="sp-row sp-row--between sp-context" style="height: 40px">
          ${d(`set`,o,``,`font-family: ${n}; font-size: 22px; letter-spacing: 0.06em`)}
        </div>
        <div class="sp-row sp-context" style="height: 28px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${s.lining.read}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          Both settings are the face's own drawings. Height is one decision and width is another: lining or
          oldstyle, tabular or proportional, and the two combine freely.
        </p>
      </div>
    </div>
  `;let f=e(u,`readout`);e(u,`segmented`).addEventListener(`change`,e=>{let n=e.detail;if(c(n)){for(let e of[...t(u,`year`),...t(u,`set`)])e.dataset.figures=n,e.style.fontVariantNumeric=s[n].css;f.textContent=s[n].read}})}export{u as mount};