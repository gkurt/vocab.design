import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`radial-gradient(circle at 62% 26%, rgb(255 255 255 / 0.5), transparent 56%), linear-gradient(150deg, #f0b27a, #d9695a 46%, #6d4b7a)`,n=`<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 26px; height: 26px"><circle cx="12" cy="9" r="3.6"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/></svg>`,r={photo:`photo`,name:`initials`,nothing:`glyph`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 292px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Directory</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row" style="gap: 12px">
              <span
                class="sp-avatar"
                data-part="avatar"
                data-subject
                data-source="photo"
                role="img"
                aria-label="Ada Marceau"
                style="width: 48px; height: 48px; font-size: 16px; overflow: hidden"
              >
                <span class="sp-swatch" data-part="photo" style="--sp-swatch: ${t}; width: 100%; height: 100%"></span>
                <span data-part="initials" hidden>AM</span>
                <span class="sp-text" data-part="glyph" hidden>${n}</span>
              </span>
              <div class="sp-stack sp-context" style="gap: 2px">
                <span class="sp-heading">Ada Marceau</span>
                <span class="sp-text">Design systems, Berlin</span>
              </div>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px; margin-top: 12px">
            <sp-segmented data-stage-mode class="sp-segmented sp-grow" data-part="record" data-axis="Record has" data-value="photo">
              <button class="sp-segment sp-grow" data-part="rec-photo" value="photo">Photo</button>
              <button class="sp-segment sp-grow" data-part="rec-name" value="name">Name only</button>
              <button class="sp-segment sp-grow" data-part="rec-nothing" value="nothing">Nothing</button>
            </sp-segmented>
          </div>
          <ul class="sp-list sp-context" style="margin-top: 6px">
            <li class="sp-list-item"><span class="sp-avatar">JO</span><span class="sp-grow">Jun Okafor</span><span class="sp-text">Research</span></li>
            <li class="sp-list-item"><span class="sp-avatar">N</span><span class="sp-grow">Northwind</span><span class="sp-text">Workspace</span></li>
          </ul>
        </div>
      </div>
    </div>
  `;let a=e(i,`avatar`),o={photo:e(i,`photo`),initials:e(i,`initials`),glyph:e(i,`glyph`)},s=e=>{let t=r[e]??`glyph`;a.dataset.source=t;for(let[e,n]of Object.entries(o))n.hidden=e!==t};e(i,`record`).addEventListener(`change`,e=>s(e.detail)),s(`photo`)}export{i as mount};