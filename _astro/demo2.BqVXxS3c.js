import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={sans:{name:`Geist`,stack:`'Geist Variable', ui-sans-serif, system-ui, sans-serif`,note:`Variable, weight 100 to 900`},serif:{name:`Source Serif 4`,stack:`'Source Serif 4 Variable', Georgia, serif`,note:`Variable, weight 200 to 900`},mono:{name:`Geist Mono`,stack:`'Geist Mono Variable', ui-monospace, monospace`,note:`Variable, one advance width`}},n=e=>e in t,r=`Handgloves`,i=`AaBbGgQqRr 0123 &?!`,a=`Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs.`,o=[300,500,800];function s(s){let c=t.serif;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-surface" data-part="sheet" data-subject data-face="serif" style="padding: 12px 14px">
          <div class="sp-row sp-row--between" style="height: 22px">
            <span data-part="face-name" style="font-family: ${c.stack}; font-size: 15px; font-weight: 600">${c.name}</span>
            <span class="sp-label" data-part="face-note">${c.note}</span>
          </div>
          <div data-part="display" style="height: 50px; overflow: hidden; display: flex; align-items: center;
               font-family: ${c.stack}; font-size: 38px; line-height: 1; white-space: nowrap">${r}</div>
          <div data-part="charset" style="height: 26px; overflow: hidden; display: flex; align-items: center;
               font-family: ${c.stack}; font-size: 16px; letter-spacing: 0.04em; white-space: nowrap">${i}</div>
          <p data-part="prose" style="margin: 6px 0 0; height: 40px; overflow: hidden;
             font-family: ${c.stack}; font-size: 13px; line-height: 1.5">${a}</p>
          <div class="sp-row" data-part="weights" style="gap: 14px; margin-top: 8px; height: 30px">
            ${o.map(e=>`
              <div class="sp-stack" style="gap: 0; width: 118px">
                <span data-part="weight-${e}" style="font-family: ${c.stack}; font-size: 17px; font-weight: ${e};
                      line-height: 1.1; white-space: nowrap; overflow: hidden">Weight ${e}</span>
                <span class="sp-label" style="font-size: 10px">${e}</span>
              </div>`).join(``)}
          </div>
        </div>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Typeface" data-part="segmented" data-value="serif">
            <button class="sp-segment" data-part="seg-sans" value="sans">sans</button>
            <button class="sp-segment" data-part="seg-serif" value="serif">serif</button>
            <button class="sp-segment" data-part="seg-mono" value="mono">mono</button>
          </sp-segmented>
      </div>
    </div>
  `;let l=e(s,`sheet`),u=e(s,`face-name`),d=e(s,`face-note`),f=[e(s,`display`),e(s,`charset`),e(s,`prose`),...o.map(t=>e(s,`weight-${t}`))];e(s,`segmented`).addEventListener(`change`,e=>{let r=e.detail;if(!n(r))return;let i=t[r];l.dataset.face=r,u.textContent=i.name,u.style.fontFamily=i.stack,d.textContent=i.note;for(let e of f)e.style.fontFamily=i.stack})}export{s as mount};