import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=480,i=[{key:`advertised`,title:`Quarterly numbers`,meta:`Padma Rao · 09:14`,advertised:!0},{key:`hidden`,title:`Studio walkthrough`,meta:`Théo Guérin · 08:02`,advertised:!1}];function a(e){let t=e.advertised?`<button class="sp-icon-button" type="button" data-part="star-button" aria-label="Star this message" style="flex: 0 0 auto">${n(`star`)}</button>`:`<span aria-hidden="true" style="flex: 0 0 28px"></span>`;return`
    <div
      class="sp-list-item"
      data-part="row-${e.key}"${e.advertised?``:` data-subject`}
      style="height: 56px; touch-action: none; user-select: none"
    >
      <span style="flex: 1 1 auto; min-width: 0">
        <span class="sp-text sp-text--ink" style="display: block; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.title}</span>
        <span class="sp-text" style="display: block; font-size: 11px">${e.meta}</span>
      </span>
      <span
        data-part="badge-${e.key}"
        style="flex: 0 0 auto; display: flex; color: var(--sp-accent); opacity: 0; transition: opacity 0.18s var(--sp-ease)"
      >${n(`star`,`sp-icon--filled`)}</span>
      ${t}
    </div>`}function o(n,o){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 448px; height: 200px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Messages</span>
          <span class="sp-label" style="font-size: 11px">Starred stays at the top</span>
        </div>

        <div class="sp-body" data-touch style="display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 12px">
          <div class="sp-surface" style="overflow: hidden">
            <div class="sp-list">${i.map(a).join(``)}</div>
          </div>
        </div>
      </div>

      <!-- The caption sits outside the frame on purpose: a line of app copy naming the
           gesture would be the signifier this row is missing. -->
      <p class="sp-label" data-stage-verdict data-part="caption" style="margin: 0; width: 448px; font-size: 11px">
        Both rows star. Only one of them says so.
      </p>
    </div>
  `;let s=r=>{let i=e(n,`row-${r}`);t(i,`data-starred`,!0),e(n,`badge-${r}`).style.opacity=`1`};e(n,`star-button`).addEventListener(`click`,()=>s(`advertised`));let c=e(n,`row-hidden`),l,u=()=>{o.clearTimeout(l),l=void 0};c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),u(),l=o.setTimeout(()=>{l=void 0,s(`hidden`)},r)}),c.addEventListener(`pointerup`,u),c.addEventListener(`pointercancel`,u)}export{o as mount};