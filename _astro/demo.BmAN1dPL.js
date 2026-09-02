import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`18px`,n=`#d9dee7`,r=`#ffffff`,i=`#20586b`,a=`#e24a2e`,o={checker:`The grid is the tool talking, not the file. It fills the space where the export has no pixels, so the
    surround and the hole through the ring read as empty rather than as white.`,white:`The same file with white behind it. Nothing in the image changed, but empty and white now look identical,
    and the canvas can no longer answer which one this is.`,page:`The file where it will ship. The page shows through exactly the regions the grid was marking, which is
    what the grid was promising: those pixels have no colour of their own.`};function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Behind the artwork" data-part="segmented" data-value="checker">
            <button class="sp-segment" data-part="seg-checker" value="checker">Checker</button>
            <button class="sp-segment" data-part="seg-white" value="white">White</button>
            <button class="sp-segment" data-part="seg-page" value="page">Page</button>
          </sp-segmented>

        <div data-part="canvas" data-backing="checker"
             style="position: relative; height: 150px; margin-top: 10px; border-radius: 3px; overflow: hidden;
                    box-shadow: 0 0 0 1px var(--sp-line)">
          <span data-part="page" hidden style="position: absolute; inset: 0; background: ${i}"></span>
          <span data-part="plain" hidden style="position: absolute; inset: 0; background: ${r}"></span>
          <span data-part="checker" data-subject
                style="position: absolute; inset: 0; background-color: ${r};
                       background-image: conic-gradient(${n} 0deg 90deg, transparent 90deg 180deg,
                         ${n} 180deg 270deg, transparent 270deg 360deg);
                       background-size: ${t} ${t}"></span>

          <span class="sp-context" data-part="art" aria-hidden="true"
                style="position: absolute; left: 50%; top: 50%; translate: -50% -50%; display: flex;
                       align-items: center; gap: 15px; filter: drop-shadow(0 3px 5px rgb(31 41 51 / 0.32))">
            <span data-part="ring" style="width: 68px; height: 68px; border-radius: 50%; border: 16px solid ${a}"></span>
            <span style="font-size: 27px; font-weight: 700; letter-spacing: 0.07em; line-height: 1; color: ${a}">ORBIT</span>
          </span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 10px 0 0; height: 44px; font-size: 10px; line-height: 1.4">${o.checker}</p>
      </div>
    </div>
  `;let c=e(s,`canvas`),l=e(s,`note`),u={checker:e(s,`checker`),white:e(s,`plain`),page:e(s,`page`)},d=e=>{c.dataset.backing=e;for(let[t,n]of Object.entries(u))n.hidden=t!==e;l.textContent=o[e]??o.checker??``};d(`checker`),e(s,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{s as mount};