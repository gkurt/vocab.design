import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=452,n=196,r=[{key:`wide`,label:`wide`,width:t,type:14,picture:74,margin:30},{key:`medium`,label:`medium`,width:320,type:13,picture:60,margin:18},{key:`narrow`,label:`narrow`,width:214,type:11,picture:46,margin:10}],i=`Two hours on the shingle at low water, counting terns and noting what the tide left behind.`;function a(a){a.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${t}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="sizes" data-axis="Width" data-value="wide">
          ${r.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
        </sp-segmented>
      </div>

      <div style="display: flex; justify-content: center; width: ${t}px; height: ${n}px">
        <div
          data-part="viewport"
          style="display: flex; justify-content: center; width: ${t}px; height: ${n}px; padding: 8px 0;
                 background: var(--sp-sunken); border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
        >
          <div
            data-part="column"
            data-subject
            data-flow="stacked"
            style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0; padding: 10px 12px;
                   background: var(--sp-surface); border-radius: 6px"
          >
            <div
              data-part="picture"
              style="flex: 0 0 auto; border-radius: 4px; background: linear-gradient(150deg, var(--sp-accent-soft), var(--sp-accent) 150%)"
            ></div>
            <div data-part="copy" style="display: flex; flex-direction: column; gap: 4px">
              <span data-part="headline" style="font-weight: 600; line-height: 1.3">Field notes</span>
              <span data-part="body" style="color: var(--sp-muted); line-height: 1.45">${i}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: ${t}px; justify-content: center; gap: 8px">
        ${[`type`,`picture`,`margin`].map(e=>`
          <span
            data-part="val-${e}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 112px; height: 20px;
                   border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted); font-size: 11px; white-space: nowrap"
          ></span>`).join(``)}
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: ${t}px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let o=e(a,`viewport`),s=e(a,`column`),c=e(a,`picture`),l=e(a,`copy`),u=e(a,`headline`),d=e(a,`body`),f=e(a,`note`),p={type:e(a,`val-type`),picture:e(a,`val-picture`),margin:e(a,`val-margin`)},m=e=>{let t=r.find(t=>t.key===e);if(!t)return;o.style.width=`${t.width}px`,o.style.paddingLeft=`${t.margin}px`,o.style.paddingRight=`${t.margin}px`,c.style.height=`${t.picture}px`,u.style.fontSize=`${t.type+3}px`,d.style.fontSize=`${t.type}px`;let n=c.getBoundingClientRect(),i=l.getBoundingClientRect(),a=n.bottom<=i.top+1;s.dataset.flow=a?`stacked`:`side`;let m=Math.round(Number.parseFloat(getComputedStyle(d).fontSize)),h=Math.round(Number.parseFloat(getComputedStyle(o).paddingLeft));p.type.textContent=`type ${m}px`,p.picture.textContent=`picture ${Math.round(n.height)}px`,p.margin.textContent=`margins ${h}px`,f.textContent=`${t.width}px: still one column, picture above copy, in that order.`};e(a,`sizes`).addEventListener(`change`,e=>m(e.detail)),m(`wide`)}export{a as mount};