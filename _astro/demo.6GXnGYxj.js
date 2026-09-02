import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Steam rising from a group head as a shot pulls`,n=`data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22340%22%20height%3D%22130%22%20viewBox%3D%220%200%20340%20130%22%3E%0A%20%20%20%20%20%3Crect%20width%3D%22340%22%20height%3D%22130%22%20fill%3D%22%233f4a63%22%2F%3E%0A%20%20%20%20%20%3Ccircle%20cx%3D%2296%22%20cy%3D%2270%22%20r%3D%2242%22%20fill%3D%22%237c89ab%22%2F%3E%0A%20%20%20%20%20%3Crect%20x%3D%22152%22%20y%3D%2240%22%20width%3D%22150%22%20height%3D%2212%22%20rx%3D%226%22%20fill%3D%22%239aa6c4%22%2F%3E%0A%20%20%20%20%20%3Crect%20x%3D%22152%22%20y%3D%2266%22%20width%3D%22110%22%20height%3D%2212%22%20rx%3D%226%22%20fill%3D%22%236f7c9d%22%2F%3E%0A%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22104%22%20width%3D%22340%22%20height%3D%2226%22%20fill%3D%22%232c344a%22%2F%3E%0A%20%20%20%3C%2Fsvg%3E`,r=`data:image/png;base64,AAAAAAAAAAAA`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">How a shot pulls</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="loaded" data-axis="Image">
            <button class="sp-segment" data-part="seg-loaded" value="loaded">Loads</button>
            <button class="sp-segment" data-part="seg-failed" value="failed">Fails</button>
          </sp-segmented>
        </div>
        <figure style="margin: 12px 0 0">
          <img
            data-part="photo"
            data-state="loaded"
            data-subject
            src="${n}"
            alt="${t}"
            style="display: block; width: 100%; height: 130px; object-fit: cover; border-radius: 6px; background: var(--sp-sunken); font-size: 12px"
          />
          <figcaption class="sp-text sp-context" style="margin-top: 6px; font-size: 12px">
            Espresso machine, group head, mid extraction
          </figcaption>
        </figure>
        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 10px">
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 72%"></div>
          <span class="sp-label" data-part="attribute" style="margin-top: 4px">alt="${t}"</span>
        </div>
      </div>
    </div>
  `;let a=e(i,`photo`);e(i,`segmented`).addEventListener(`change`,e=>{let t=e.detail;a.dataset.state=t,a.src=t===`failed`?r:n})}export{i as mount};