import{n as e}from"./parts.C-YLuC7Q.js";import{i as t,n}from"./measure.DK7AY2_i.js";var r=620,i=24,a=[{caption:`Low tide, west quay`,wash:`linear-gradient(120deg, #2f4f7f, #7fb2c9 62%, #e3d5a1)`},{caption:`Crane, second week`,wash:`linear-gradient(120deg, #5a3f6b, #c1708a 58%, #f0b47a)`},{caption:`Ferry in the channel`,wash:`linear-gradient(120deg, #1f5f52, #6bab8a 60%, #dfe3a6)`},{caption:`Chandlery window`,wash:`linear-gradient(120deg, #7a4326, #d08a4b 55%, #f2ddb8)`},{caption:`Night works, pier four`,wash:`linear-gradient(120deg, #202744, #4c5f96 58%, #9fb0d8)`}],o={deferred:`not requested`,loading:`fetching`,loaded:`loaded`};function s(e){let t=a[e],n=e+1,r=n===1?` data-subject`:``;return`
    <figure data-part="shot-${n}" data-state="deferred" style="margin: 0; display: flex; flex-direction: column; gap: 6px">
      <figcaption class="sp-row sp-row--between">
        <span class="sp-text sp-text--ink">${t?.caption??``}</span>
        <span class="sp-label" data-part="state-${n}">${o.deferred}</span>
      </figcaption>
      <div data-part="media-${n}"${r} style="position: relative; height: 84px; border-radius: 6px; overflow: hidden">
        <div class="sp-swatch" data-part="ph-${n}" style="position: absolute; inset: 0; border-radius: 6px"></div>
        <div data-part="img-${n}" style="position: absolute; inset: 0; opacity: 0; transition: opacity 0.35s var(--sp-ease); background: ${t?.wash??``}"></div>
      </div>
    </figure>`}function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-text" data-part="requests" role="status">0 of ${a.length} requested</span>
        </div>
        <div class="sp-body sp-context" style="padding: 0">
          <div class="sp-scroll" data-part="feed" style="height: 100%; display: flex; flex-direction: column; gap: 14px; padding: 12px">
            ${a.map((e,t)=>s(t)).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let u=e(c,`feed`),d=e(c,`requests`),f=a.map((t,n)=>({fig:e(c,`shot-${n+1}`),media:e(c,`media-${n+1}`),placeholder:e(c,`ph-${n+1}`),image:e(c,`img-${n+1}`),state:e(c,`state-${n+1}`)})),p=0,m=e=>{e.fig.dataset.state=`loading`,e.state.textContent=o.loading,e.placeholder.className=`sp-skeleton`,p+=1,d.textContent=`${p} of ${a.length} requested`,l.setTimeout(()=>{e.fig.dataset.state=`loaded`,e.state.textContent=o.loaded,e.image.style.opacity=`1`},r)},h=()=>{let e=t(u).height+i;for(let t of f)t.fig.dataset.state===`deferred`&&(n(t.media,u).top>e||m(t))};u.addEventListener(`scroll`,h),h()}export{c as mount};