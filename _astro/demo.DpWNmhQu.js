import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=452,n=196,r=264,i=6,a=[{key:`wide`,label:`two columns`},{key:`source`,label:`source order`},{key:`choreographed`,label:`choreographed`}];function o(o){o.innerHTML=`
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${t}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Layout</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Reflow" data-term="choreographed" data-value="choreographed">
          ${a.map(e=>`
            <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${e.label}</button>`).join(``)}
        </sp-segmented>
      </div>

      <div style="display: flex; justify-content: center; width: ${t}px; height: ${n}px">
        <div
          data-part="viewport"
          style="display: flex; gap: ${i}px; width: ${t}px; height: ${n}px; padding: 8px;
                 background: var(--sp-sunken); border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
        >
          <div data-part="rail" style="display: flex; flex-direction: column; gap: ${i}px; flex: 0 0 124px"></div>
          <div data-part="main" style="display: flex; flex-direction: column; gap: ${i}px; flex: 1 1 auto; min-width: 0"></div>

          <div
            data-part="promo"
            data-subject
            data-order="choreographed"
            data-pose="[data-order=choreographed]"
            style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 0 0 auto; padding: 6px 8px;
                   background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 6px"
          >
            <span style="font-size: 11px; font-weight: 600; color: var(--sp-ink); white-space: nowrap">Subscribe</span>
            <span class="sp-line" style="width: 84%; height: 5px"></span>
          </div>

          <div
            class="sp-context"
            data-part="related"
            style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 0 0 auto; padding: 6px 8px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
          >
            <span class="sp-label" style="font-size: 10px; white-space: nowrap">Related</span>
            <span class="sp-line" style="width: 90%; height: 5px"></span>
            <span class="sp-line" style="width: 68%; height: 5px"></span>
          </div>

          <div
            class="sp-context"
            data-part="title"
            style="display: flex; align-items: center; flex: 0 0 auto; padding: 0 8px; font-size: 13px; font-weight: 600;
                   white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >Trail conditions</div>

          <div
            class="sp-context"
            data-part="body"
            style="display: flex; flex-direction: column; gap: 6px; padding: 8px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: 6px"
          >
            ${[96,88,94,74,90].map((e,t)=>`<span class="sp-line" data-part="body-line-${t+1}" style="width: ${e}%; height: 5px"></span>`).join(``)}
          </div>
        </div>
      </div>

      <span
        class="sp-text sp-context"
        data-stage-verdict data-part="note"
        role="status"
        style="display: block; width: ${t}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;let s=e(o,`viewport`),c=e(o,`rail`),l=e(o,`main`),u=e(o,`promo`),d=e(o,`related`),f=e(o,`title`),p=e(o,`body`),m=e(o,`note`),h=[4,5].map(t=>e(o,`body-line-${t}`)),g=e=>{let n=e===`wide`;s.style.width=`${n?t:r}px`,s.style.flexDirection=n?`row`:`column`,c.style.display=n?`flex`:`none`,l.style.display=n?`flex`:`none`;for(let e of h)e.style.display=n?`block`:`none`;u.style.height=n?`46px`:`40px`,d.style.height=n?``:`42px`,d.style.flex=n?`1 1 auto`:`0 0 auto`,f.style.height=`22px`,p.style.flex=`1 1 auto`,n?(c.append(u,d),l.append(f,p)):e===`source`?s.append(u,d,f,p):s.append(f,p,u,d);let i=u.getBoundingClientRect(),a=p.getBoundingClientRect(),o=i.right<=a.left+1?`columns`:i.top>a.top?`choreographed`:`source`;u.dataset.order=o,m.textContent=o===`columns`?`Two columns: the promo sits in the sidebar, beside the article it belongs to.`:o===`source`?`Collapsed in source order: the promo lands above the article, because the sidebar came first.`:`Choreographed: the article keeps the top of the page and the promo follows it down.`};e(o,`modes`).addEventListener(`change`,e=>g(e.detail)),g(`choreographed`)}export{o as mount};