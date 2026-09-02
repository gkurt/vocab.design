import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#f4f5f7`,n=`#23262b`,r=`#898989`,i=`3.2:1`,a={regular:24,bold:18.66},o={regular:74,bold:30},s={regular:`24 px (18 pt)`,bold:`18.7 px (14 pt bold)`},c={regular:`Eighteen point is 24 px, and that is where the required ratio drops from 4.5:1 to 3:1. The same grey fails at 20 px and passes at 26 px.`,bold:`Bold moves the boundary down to 14 point, about 18.7 px, so the 20 px line counts as large text and passes on exactly the same two colours.`},l=[{px:16,pt:`12 pt`,top:0,height:24},{px:20,pt:`15 pt`,top:40,height:28},{px:26,pt:`19.5 pt`,top:84,height:34}],u=`Boarding now`;function d(d){let f=(e,t)=>e>=a[t];d.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Sample weight" data-part="weight" data-value="regular">
            <button class="sp-segment" type="button" data-part="seg-regular" value="regular"
                    style="padding: 4px 12px; font-size: 11.5px">Regular</button>
            <button class="sp-segment" type="button" data-part="seg-bold" value="bold"
                    style="padding: 4px 12px; font-size: 11.5px">Bold</button>
          </sp-segmented>
        </div>

        <div data-part="ramp" style="margin-top: 10px; padding: 12px; border-radius: 8px; background: ${t}">
          <div style="position: relative; height: 118px">
            ${l.map(e=>`
    <div class="sp-row sp-row--between" data-part="row-${e.px}"
         style="position: absolute; left: 0; right: 0; top: ${e.top}px; height: ${e.height}px; gap: 10px">
      <span data-part="sample-${e.px}" data-weight="regular"
            style="flex: 0 0 auto; font-size: ${e.px}px; line-height: 1; color: ${r}">${u}</span>
      <span class="sp-row" style="flex: 0 0 auto; gap: 12px">
        <span style="width: 78px; text-align: right; font-size: 10px; color: ${n}">${e.px} px · ${e.pt}</span>
        <span data-part="verdict-${e.px}" data-pass="${f(e.px,`regular`)?`yes`:`no`}"
              style="width: 82px; text-align: right; font-size: 10px; font-weight: 600; color: ${n}">
          ${f(e.px,`regular`)?`Passes 3:1`:`Fails 4.5:1`}
        </span>
      </span>
    </div>`).join(``)}
            <span data-part="threshold" data-subject data-weight="regular"
                  style="position: absolute; left: 0; right: 0; top: ${o.regular}px; height: 4px;
                         border-radius: 2px; background: var(--sp-accent); transition: top 0.28s var(--sp-ease)"></span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Large text starts at
            <span data-part="starts" data-weight="regular"
                  style="color: var(--sp-ink); font-weight: 500">${s.regular}</span></span>
          <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">
            ${r} on ${t} · ${i}
          </span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-weight="regular"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${c.regular}</p>
      </div>
    </div>
  `;let p=e(d,`threshold`),m=e(d,`starts`),h=e(d,`caption`),g=t=>{p.dataset.weight=t,p.style.top=`${o[t]}px`;for(let n of l){let r=e(d,`sample-${n.px}`);r.dataset.weight=t,r.style.fontWeight=t===`bold`?`700`:`400`;let i=e(d,`verdict-${n.px}`),a=f(n.px,t);i.dataset.pass=a?`yes`:`no`,i.textContent=a?`Passes 3:1`:`Fails 4.5:1`}m.dataset.weight=t,m.textContent=s[t],h.dataset.weight=t,h.textContent=c[t]};e(d,`weight`).addEventListener(`change`,e=>{g(e.detail)}),g(`regular`)}export{d as mount};