import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";import{n as r}from"./measure.DK7AY2_i.js";var i=[{key:`small`,size:24},{key:`big`,size:44}];function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Photo actions</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Measuring" data-part="segmented" data-value="target">
            <button class="sp-segment" data-part="seg-glyph" value="glyph">Glyph</button>
            <button class="sp-segment" data-part="seg-target" value="target">Target</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="justify-content: center; gap: 16px; margin-top: 16px">${i.map(e=>`
      <div class="sp-stack" style="align-items: center; gap: 10px; width: 132px">
        <div data-part="stage-${e.key}" style="position: relative; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px">
          <button
            class="sp-button sp-button--ghost"
            type="button"
            aria-label="Favourite"
            data-part="target-${e.key}"
            ${e.key===`big`?`data-subject`:``}
            style="display: flex; align-items: center; justify-content: center; width: ${e.size}px; height: ${e.size}px; padding: 0"
          >${n(`star`)}</button>
          <span
            data-part="zone-${e.key}"
            data-mode="target"
            style="position: absolute; border: 1px dashed var(--sp-accent); border-radius: 7px; pointer-events: none"
          ></span>
        </div>
        <span class="sp-label sp-context" data-part="size-${e.key}"></span>
      </div>`).join(``)}</div>
      </div>
    </div>
  `;let o=t=>{for(let n of i){let i=e(a,`stage-${n.key}`),o=e(a,`target-${n.key}`),s=o.querySelector(`svg`),c=e(a,`zone-${n.key}`),l=t===`glyph`?s:o,u=l?r(l,i):void 0;u&&(c.dataset.mode=t,c.style.left=`${u.left-3}px`,c.style.top=`${u.top-3}px`,c.style.width=`${u.width+6}px`,c.style.height=`${u.height+6}px`,e(a,`size-${n.key}`).textContent=`${Math.round(u.width)} × ${Math.round(u.height)} px`)}};o(`target`),e(a,`segmented`).addEventListener(`change`,e=>o(e.detail));for(let n of i){let r=e(a,`target-${n.key}`);r.addEventListener(`click`,()=>t(r,`data-selected`,!0))}}export{a as mount};