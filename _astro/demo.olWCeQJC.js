import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={ungated:`The reveal is on hover alone`,gated:`The reveal is behind @media (hover: hover)`},i={border:`1px solid var(--sp-line)`,shadow:`none`},a={border:`1px solid var(--sp-accent)`,shadow:`var(--sp-shadow)`},o=[{key:`card`,name:`Harbour, 6am`,size:`2.4 MB`,wash:`linear-gradient(150deg, #4a7290, #d8c39a)`},{key:`card-jetty`,name:`Jetty, noon`,size:`1.8 MB`,wash:`linear-gradient(150deg, #7c6a86, #e0cdb4)`}],s=({key:e,name:t,size:r,wash:o},s)=>{let c=s?`data-part="card" data-subject data-pose="[data-stuck]" data-stuck`:`data-part="${e}"`,l=s?`actions`:`actions-${e}`;return`
    <div
      class="sp-surface${s?``:` sp-context`}"
      ${c}
      style="width: 200px; padding: 8px; border: ${s?a.border:i.border}; box-shadow: ${s?a.shadow:i.shadow}"
    >
      <div style="height: 96px; border-radius: 6px; background: ${o}"></div>
      <div class="sp-row sp-row--between" style="margin-top: 8px">
        <span class="sp-heading" style="font-size: 13px">${t}</span>
        <span class="sp-label">${r}</span>
      </div>
      <div
        class="sp-row"
        data-part="${l}"
        style="margin-top: 8px; gap: 6px; opacity: ${+!!s}; visibility: ${s?`visible`:`hidden`}; transition: opacity 0.16s"
      >
        <button class="sp-button sp-button--ghost sp-button--sm" type="button">Save</button>
        <button class="sp-icon-button" type="button" aria-label="Favourite">${n(`heart`)}</button>
      </div>
    </div>`};function c(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Saved photos</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div data-part="gallery" data-touch data-mode="ungated" style="display: flex; gap: 12px; touch-action: manipulation">
            ${o.map((e,t)=>s(e,t===0)).join(``)}
          </div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="caption" style="font-size: 11px; width: 236px">${r.ungated}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="ungated" data-axis="Hover rule" data-term="ungated">
          <button class="sp-segment" data-part="mode-ungated" value="ungated">As written</button>
          <button class="sp-segment" data-part="mode-gated" value="gated">Gated</button>
        </sp-segmented>
      
    </div>
  `;let c=e(n,`gallery`),l=e(n,`caption`),u=o.map((t,r)=>({...t,el:e(n,r===0?`card`:t.key),actions:e(n,r===0?`actions`:`actions-${t.key}`)})),d=u[0],f=e=>{let n=c.dataset.mode===`gated`;for(let r of u){let o=r.el===e,s=o||n;t(r.el,`data-stuck`,o),r.el.style.border=o?a.border:i.border,r.el.style.boxShadow=o?a.shadow:i.shadow,r.actions.style.opacity=s?`1`:`0`,r.actions.style.visibility=s?`visible`:`hidden`}};c.addEventListener(`pointerdown`,e=>{if(c.dataset.mode===`gated`)return f(null);let t=u.find(t=>t.el.contains(e.target));f(t?.el??null)}),e(n,`mode`).addEventListener(`change`,e=>{let t=e.detail===`gated`?`gated`:`ungated`;c.dataset.mode=t,l.textContent=r[t],f(null)}),f(d.el)}export{c as mount};