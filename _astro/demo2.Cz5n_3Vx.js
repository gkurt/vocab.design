import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={card:.05,dialog:.12},n=`#121417`,r=e=>`linear-gradient(rgb(255 255 255 / ${e}), rgb(255 255 255 / ${e}))`,i=(e,t)=>Number.parseInt(e.slice(t,t+2),16),a=e=>Math.round(e).toString(16).padStart(2,`0`),o=(e,t)=>`#${[1,3,5].map(n=>a(i(e,n)*(1-t)+255*t)).join(``)}`,s=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,c=e=>.2126*s(i(e,1)/255)+.7152*s(i(e,3)/255)+.0722*s(i(e,5)/255),l=e=>{let t=c(e);return Math.round(t>.008856?116*Math.cbrt(t)-16:903.3*t)},u={dark:{page:n,base:n,ink:`#E7EAF0`,muted:`#9AA3B2`,line:`rgb(255 255 255 / 0.10)`,cardFilm:r(t.card),dialogFilm:r(t.dialog),cardShadow:`none`,dialogShadow:`none`,cardNote:`5% white`,dialogNote:`12% white`,planes:[n,o(n,t.card),o(n,t.dialog)],carrier:`overlay`},light:{page:`#EDEFF3`,base:`#FFFFFF`,ink:`#1B2130`,muted:`#5A6474`,line:`#D8DEE9`,cardFilm:`none`,dialogFilm:`none`,cardShadow:`0 1px 2px rgb(16 24 40 / 0.18)`,dialogShadow:`0 10px 22px rgb(16 24 40 / 0.22)`,cardNote:`shadow`,dialogNote:`shadow`,planes:[`#EDEFF3`,`#FFFFFF`,`#FFFFFF`],carrier:`shadow`}},d={dark:`All three planes are painted from one base. Only the white film thickens, and that is what makes the dialog read as higher.`,light:`The page is light, so a shadow has something to darken. Both raised planes are plain white and the shadow does the work.`},f=[{key:`page`,name:`Page`},{key:`card`,name:`Card`},{key:`dialog`,name:`Dialog`}],p={"--e-page":`page`,"--e-base":`base`,"--e-ink":`ink`,"--e-muted":`muted`,"--e-line":`line`,"--e-card-film":`cardFilm`,"--e-dialog-film":`dialogFilm`,"--e-card-shadow":`cardShadow`,"--e-dialog-shadow":`dialogShadow`},m=`dark`;function h(t){let n=u[m]??u.dark;if(!n)return;let r=f.map((e,t)=>{let r=n.planes[t]??n.base;return`
      <div class="sp-row" style="gap: 6px">
        <span class="sp-swatch" data-part="chip-${e.key}" style="flex: 0 0 auto; width: 14px; height: 14px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.45); --sp-swatch: ${r}"></span>
        <span class="sp-text" style="flex: 1 1 auto; font-size: 11px; color: var(--sp-ink)">${e.name}</span>
        <span class="sp-text" data-part="l-${e.key}"
              style="flex: 0 0 46px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">L* ${l(r)}</span>
      </div>`}).join(``);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Theme" data-term="dark" data-part="segmented" data-value="${m}">
            <button class="sp-segment" data-part="seg-dark" value="dark">Dark</button>
            <button class="sp-segment" data-part="seg-light" value="light">Light</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div data-part="stack" data-subject data-pose="[data-scheme=dark]" data-scheme="${m}" data-carrier="${n.carrier}"
               style="flex: 0 0 214px; height: 190px; padding: 10px; border-radius: var(--sp-radius);
                      border: 1px solid var(--e-line); background: var(--e-page)">
            <span class="sp-label" style="color: var(--e-muted)">Page &middot; 0dp</span>
            <div data-part="card" style="margin-top: 8px; padding: 10px; border-radius: 6px; border: 1px solid var(--e-line);
                 background-color: var(--e-base); background-image: var(--e-card-film); box-shadow: var(--e-card-shadow)">
              <span class="sp-label" style="color: var(--e-muted)">Card &middot; 1dp &middot; <span data-part="card-note">${n.cardNote}</span></span>
              <div data-part="dialog" style="margin-top: 8px; padding: 9px 10px; border-radius: 6px; border: 1px solid var(--e-line);
                   background-color: var(--e-base); background-image: var(--e-dialog-film); box-shadow: var(--e-dialog-shadow)">
                <span style="font-size: 12px; font-weight: 500; color: var(--e-ink)">Dialog &middot; 8dp &middot; <span data-part="dialog-note">${n.dialogNote}</span></span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context sp-grow" data-part="readout" data-scheme="${m}" style="gap: 6px">
            <span class="sp-label">Lightness</span>
            ${r}
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 2px 0 0; height: 88px; font-size: 11px">${d[m]}</p>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(t,`stack`),a=e(t,`readout`),o=e(t,`card-note`),s=e(t,`dialog-note`),c=e(t,`note`),h=n=>{let r=u[n];if(r){i.dataset.scheme=n,i.dataset.carrier=r.carrier;for(let[e,t]of Object.entries(p))i.style.setProperty(e,String(r[t]));f.forEach((n,i)=>{let a=r.planes[i]??r.base;e(t,`chip-${n.key}`).style.setProperty(`--sp-swatch`,a),e(t,`l-${n.key}`).textContent=`L* ${l(a)}`}),o.textContent=r.cardNote,s.textContent=r.dialogNote,a.dataset.scheme=n,c.textContent=d[n]??``}};h(m),e(t,`segmented`).addEventListener(`change`,e=>h(e.detail))}export{h as mount};