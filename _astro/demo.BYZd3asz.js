import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{t}from"./motion.B5_YXmsy.js";var n=420,r={id:`dawn`,label:`Dawn`,title:`Low tide, 05:40`,note:`Cape shoreline`,wash:`linear-gradient(155deg, #f7b267, #b3568f 58%, #4b3a8c)`},i=[r,{id:`dusk`,label:`Dusk`,title:`High tide, 20:10`,note:`Cape shoreline`,wash:`linear-gradient(155deg, #2f5fa8, #24356e 56%, #131628)`}];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 356px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">Plate 12</span>
        </div>
        <div class="sp-body">
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="picker" data-axis="Plate" data-value="dawn" style="width: 100%">
            ${i.map(e=>`<button class="sp-segment sp-grow" data-part="seg-${e.id}" value="${e.id}">${e.label}</button>`).join(``)}
          </sp-segmented>
          <div style="position: relative; height: 122px; margin-top: 12px">
            <figure
              data-part="plate"
              data-subject
              data-showing="dawn"
              data-state="settled"
              style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end;
                     gap: 2px; margin: 0; padding: 12px; border-radius: var(--sp-radius); color: #ffffff;
                     background-image: ${r.wash}; transition: opacity ${n/2}ms linear"
            >
              <figcaption data-part="plate-title" style="font-size: 14px; font-weight: 600">${r.title}</figcaption>
              <span data-part="plate-note" style="font-size: 12px; opacity: 0.82">${r.note}</span>
            </figure>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`plate`),c=e(a,`plate-title`),l=e(a,`plate-note`),u,d=e=>{let t=i.find(t=>t.id===e);t&&(s.style.backgroundImage=t.wash,c.textContent=t.title,l.textContent=t.note,s.dataset.showing=t.id)},f=e=>{if(s.dataset.showing===e)return;o.clearTimeout(u),s.dataset.state=`dissolving`,s.style.opacity=`0`;let r=t(a)?0:n/2;u=o.setTimeout(()=>{d(e),s.style.opacity=`1`,s.dataset.state=`settled`},r)};e(a,`picker`).addEventListener(`change`,e=>f(e.detail))}export{a as mount};