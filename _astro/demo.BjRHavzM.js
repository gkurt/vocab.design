import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=500,n=`transform ${t}ms var(--sp-ease), opacity ${t}ms linear`,r=34,i=[{id:`x`,label:`X`,note:`siblings, side by side`},{id:`y`,label:`Y`,note:`a sequence, top to bottom`},{id:`z`,label:`Z`,note:`depth, drawn as scale`}],a=[{id:`step-1`,label:`Crew`,title:`Crew list`,lines:[`86%`,`62%`,`74%`]},{id:`step-2`,label:`Shifts`,title:`Shift plan`,lines:[`70%`,`90%`,`58%`]}];function o(t,o){let s=i.map(e=>`<button class="sp-segment sp-grow" data-part="axis-${e.id}" value="${e.id}">${e.label}</button>`).join(``),c=a.map(e=>`<button class="sp-button sp-button--ghost sp-button--sm sp-grow" type="button" data-part="go-${e.id}">${e.label}</button>`).join(``);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 312px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Roster</span>
          <span class="sp-label" data-stage-verdict data-part="note">siblings, side by side</span>
        </div>
        <div class="sp-body">
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="picker" data-axis="Axis" data-value="x" style="width: 100%">
            ${s}
          </sp-segmented>
          <div
            data-part="slot"
            data-subject
            data-at="step-1"
            data-axis="x"
            data-state="settled"
            style="position: relative; height: 108px; margin-top: 10px; overflow: hidden"
          >
            ${a.map(e=>`
      <section
        class="sp-surface sp-stack"
        data-part="panel-${e.id}"
        style="position: absolute; inset: 0; gap: 8px; padding: 12px; transition: ${n}"
      >
        <span class="sp-heading" style="font-size: 14px">${e.title}</span>
        ${e.lines.map(e=>`<span class="sp-line" style="width: ${e}"></span>`).join(``)}
      </section>`).join(``)}
          </div>
          <div class="sp-row sp-context" style="gap: 6px; margin-top: 10px">${c}</div>
        </div>
      </div>
    </div>
  `;let l=e(t,`slot`),u=e(t,`note`),d,f=(e,t)=>e===0?`none`:t===`y`?`translateY(${e*r}px)`:t===`z`?e>0?`scale(0.8)`:`scale(1.12)`:`translateX(${e*r}px)`,p=r=>{let o=l.dataset.axis??`x`,s=a.findIndex(e=>e.id===l.dataset.at);a.forEach((i,a)=>{let c=e(t,`panel-${i.id}`),l=a===s;c.style.transition=r?n:`none`,c.style.transform=f(a-s,o),c.style.opacity=l?`1`:`0`,c.style.pointerEvents=l?``:`none`,c.setAttribute(`aria-hidden`,String(!l)),l?c.dataset.current=``:c.removeAttribute(`data-current`)}),u.textContent=i.find(e=>e.id===o)?.note??``},m=e=>{l.dataset.at!==e&&(o.clearTimeout(d),l.dataset.at=e,l.dataset.state=`moving`,p(!0),d=o.setTimeout(()=>{l.dataset.state=`settled`},540))};e(t,`picker`).addEventListener(`change`,e=>{l.dataset.axis=e.detail,p(!1)});for(let n of a)e(t,`go-${n.id}`).addEventListener(`click`,()=>m(n.id));p(!1)}export{o as mount};