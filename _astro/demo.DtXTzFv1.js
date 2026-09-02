import{n as e}from"./parts.C-YLuC7Q.js";var t=`Helvetica, Arial, sans-serif`,n=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,r=17,i=116,a={fallback:{family:t,italic:`font-style: italic`,bold:`font-weight: 700`,label:`nothing yet`},roman:{family:n,italic:`display: inline-block; transform: skewX(-12deg); transform-origin: 0 100%`,bold:`font-weight: 400; -webkit-text-stroke: 0.4px currentcolor`,label:`roman only`},styles:{family:n,italic:`font-style: italic`,bold:`font-weight: 700`,label:`all three files`}},o=[`fallback`,`roman`,`styles`],s={fallback:1600,roman:2400,styles:3200},c={open:`The reading room reopens on the fourth of March. Requests for material held in the `,italic:`Ellis bequest`,mid:` must be placed a `,bold:`full day`,close:` ahead, since those boxes are stored off site and come over on the morning van.`};function l(n,l){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="white-space: nowrap">files arrived</span>
          <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
            <span class="sp-chip" data-part="stage-label"
                  style="cursor: default; white-space: nowrap; width: 116px; justify-content: center"></span>
            <button class="sp-button sp-button--sm sp-button--ghost" data-part="reload" type="button">Reload</button>
          </div>
        </div>
        <div style="height: ${i}px; margin-top: 10px">
          <p data-part="paragraph" data-stage="fallback"
             style="margin: 0; font-size: ${r}px; line-height: 1.45; font-family: ${t}">${c.open}<span
             data-part="run-italic" data-subject data-stage="fallback">${c.italic}</span>${c.mid}<span
             data-part="run-bold" data-stage="fallback">${c.bold}</span>${c.close}</p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          The stages are stated on this stage's own clock, since the files are long since cached. The faked
          styles are what a browser really draws while it waits: the roman sheared, and the roman thickened.
        </p>
      </div>
    </div>
  `;let u=e(n,`paragraph`),d=e(n,`run-italic`),f=e(n,`run-bold`),p=e(n,`stage-label`),m,h=e=>{let t=a[e];t&&(u.style.fontFamily=t.family,u.dataset.stage=e,d.dataset.stage=e,d.style.cssText=t.italic,f.dataset.stage=e,f.style.cssText=t.bold,p.textContent=t.label)},g=e=>{let t=o[e];t&&(h(t),o[e+1]&&(m=l.setTimeout(()=>g(e+1),s[t])))};e(n,`reload`).addEventListener(`click`,()=>{l.clearTimeout(m),g(0)}),g(0)}export{l as mount};