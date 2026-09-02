import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=380,r=`translate ${n}ms var(--sp-ease), opacity ${n}ms linear`,i=[{id:`list`,path:`/charts`},{id:`detail`,path:`/charts/harbour`}],a=[{id:`harbour`,name:`Harbour approach`,meta:`Chart 5`},{id:`shoals`,name:`Shoals`,meta:`Chart 10`},{id:`lanes`,name:`Ferry lanes`,meta:`Chart 9`}],o=`harbour`;function s(n,s){let c=a.map(e=>`
      <li class="sp-list-item" data-part="row-${e.id}" style="cursor: ${e.id===o?`pointer`:`default`}">
        <span class="sp-grow">${e.name}</span>
        <span class="sp-text">${e.meta}</span>
        ${t(`chevronRight`)}
      </li>`).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 378px; height: 236px">
        <div class="sp-topbar sp-context">
          <button class="sp-icon-button" type="button" data-part="back" aria-label="Back">${t(`chevronLeft`)}</button>
          <span class="sp-input sp-grow" data-part="address" style="font-size: 12px; color: var(--sp-muted)">/charts</span>
        </div>
        <div
          data-part="slot"
          data-subject
          data-route="list"
          data-style="slide"
          data-dir="forward"
          data-state="settled"
          style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; background: var(--sp-sunken)"
        >
          <section
            data-part="screen-list"
            style="position: absolute; inset: 0; padding: 8px; background: var(--sp-sunken); translate: 0 0; transition: ${r}"
          >
            <ul class="sp-list">${c}</ul>
          </section>
          <section
            data-part="screen-detail"
            class="sp-stack"
            style="position: absolute; inset: 0; gap: 8px; padding: 12px; background: var(--sp-surface); translate: 100% 0; transition: ${r}"
          >
            <span class="sp-heading">Harbour approach</span>
            <span class="sp-swatch" style="height: 54px; --sp-swatch: var(--sp-accent-soft)"></span>
            <span class="sp-line" style="width: 92%"></span>
            <span class="sp-line" style="width: 68%"></span>
          </section>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 8px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="style" data-axis="Style" data-value="slide">
          <button class="sp-segment" data-part="style-slide" value="slide">Slide</button>
          <button class="sp-segment" data-part="style-fade" value="fade">Crossfade</button>
        </sp-segmented>
      </div>
    </div>
  `;let l=e(n,`slot`),u=e(n,`address`),d,f=t=>{let a=i.findIndex(e=>e.id===l.dataset.route),o=l.dataset.style===`slide`;i.forEach((i,s)=>{let c=e(n,`screen-${i.id}`),l=s===a;c.style.transition=t?r:`none`,c.style.translate=o?`${(s-a)*100}% 0`:`0 0`,c.style.opacity=o||l?`1`:`0`,c.style.pointerEvents=l?``:`none`,c.setAttribute(`aria-hidden`,String(!l))}),u.textContent=i[a]?.path??``},p=e=>{if(l.dataset.route===e)return;let t=i.findIndex(e=>e.id===l.dataset.route),n=i.findIndex(t=>t.id===e);s.clearTimeout(d),l.dataset.route=e,l.dataset.dir=n>t?`forward`:`back`,l.dataset.state=`moving`,f(!0),d=s.setTimeout(()=>{l.dataset.state=`settled`},440)};e(n,`row-${o}`).addEventListener(`click`,()=>p(`detail`)),e(n,`back`).addEventListener(`click`,()=>p(`list`)),e(n,`style`).addEventListener(`change`,e=>{l.dataset.style=e.detail,f(!1)}),f(!1)}export{s as mount};