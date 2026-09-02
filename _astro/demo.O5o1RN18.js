import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=620,n=`clip-path ${t}ms linear`,r=`left ${t}ms linear`,i={id:`harbour`,label:`Harbour`,title:`Harbour, 06:10`,wash:`linear-gradient(140deg, #f0a35e, #c2557f 56%, #4a3b8f)`},a={id:`offshore`,label:`Offshore`,title:`Offshore, 18:45`,wash:`linear-gradient(140deg, #2f6ba8, #1f3d76 58%, #101528)`},o=[i,a];function s(t,s){let c=o.map(e=>`<button class="sp-segment sp-grow" data-part="seg-${e.id}" value="${e.id}">${e.label}</button>`).join(``),l=(e,t)=>{let r=t===1?`clip-path: inset(0 100% 0 0); transition: ${n}`:``;return`
      <figure
        data-part="plate-${e.id}"
        style="position: absolute; inset: 0; z-index: ${t}; display: flex; flex-direction: column; justify-content: flex-end;
               margin: 0; padding: 12px; color: #ffffff; background-image: ${e.wash}; ${r}"
      >
        <figcaption style="font-size: 14px; font-weight: 600">${e.title}</figcaption>
      </figure>`};t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 360px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Coast reel</span>
          <span class="sp-label">Plate 2 of 2</span>
        </div>
        <div class="sp-body">
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="picker" data-axis="Plate" data-value="harbour" style="width: 100%">
            ${c}
          </sp-segmented>
          <div
            data-part="slot"
            data-subject
            data-showing="harbour"
            data-state="settled"
            style="position: relative; height: 118px; margin-top: 12px; overflow: hidden; border-radius: var(--sp-radius)"
          >
            ${l(i,0)}
            ${l(a,1)}
            <span
              data-part="edge"
              aria-hidden="true"
              style="position: absolute; z-index: 2; top: 0; bottom: 0; left: 0; width: 3px; margin-left: -1.5px;
                     background: var(--sp-accent); transition: ${r}"
            ></span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(t,`slot`),d=e(t,`plate-${a.id}`),f=e(t,`edge`),p,m=e=>{if(u.dataset.showing===e)return;s.clearTimeout(p);let t=e===a.id;d.style.clipPath=t?`inset(0 0 0 0)`:`inset(0 100% 0 0)`,f.style.left=t?`100%`:`0%`,u.dataset.showing=e,u.dataset.state=`wiping`,p=s.setTimeout(()=>{u.dataset.state=`settled`},680)};e(t,`picker`).addEventListener(`change`,e=>m(e.detail))}export{s as mount};