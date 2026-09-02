import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=150,i=`#4f6ef2`,a=`#1f2937`,o=(e,t,n)=>`
  <span style="display: flex; align-items: center; gap: 5px; flex: 1 1 0; min-width: 0">
    <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">${t}</span>
    <input
      class="sp-input"
      data-part="field-${e}"
      value="${n}"
      aria-label="${t}"
      style="width: 100%; min-width: 0; padding: 4px 6px; font-size: 12px"
    />
  </span>`,s=e=>`<span class="sp-label" style="display: block; margin-top: 10px; font-size: 11px">${e}</span>`,c=e=>`
  <span style="display: flex; align-items: center; gap: 7px; margin-top: 6px; height: 20px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 20px; height: 20px; --sp-swatch: ${e}"></span>
    <span style="font-size: 12px">${e.toUpperCase()}</span>
  </span>`,l=(e,t)=>`<span style="display: flex; gap: 6px; margin-top: 6px">${e}${t}</span>`,u={rect:`
    <span class="sp-heading" style="font-size: 12px">Rectangle</span>
    ${l(o(`x`,`X`,`24`),o(`y`,`Y`,`22`))}
    ${l(o(`w`,`W`,`120`),o(`h`,`H`,`64`))}
    ${s(`Fill`)}
    ${c(i)}`,text:`
    <span class="sp-heading" style="font-size: 12px">Text</span>
    ${l(o(`font`,`Aa`,`Geist`),``)}
    ${l(o(`size`,`Size`,`15`),o(`leading`,`Line`,`1.4`))}
    ${s(`Colour`)}
    ${c(a)}`,none:`
    <div class="sp-empty" data-part="rail-empty" style="gap: 6px; padding: 8px">
      <span class="sp-empty-mark">${n(`sliders`)}</span>
      <span class="sp-text" style="font-size: 12px">Nothing selected</span>
    </div>`};function d(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Berth plan</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 10px; padding: 10px">
          <div
            class="sp-context"
            data-part="canvas"
            style="position: relative; flex: 1 1 auto; min-width: 0; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <span
              data-part="canvas-empty"
              style="position: absolute; left: 0; right: 0; top: 168px; bottom: 0; cursor: default"
            ></span>
            <span
              data-part="obj-rect"
              data-selected
              style="position: absolute; left: 24px; top: 22px; width: 120px; height: 64px; border-radius: 6px;
                     background: ${i}; cursor: pointer"
            ></span>
            <span
              data-part="obj-text"
              style="position: absolute; left: 24px; top: 108px; width: 190px; padding: 4px 6px; cursor: pointer;
                     color: ${a}; font-size: 15px; font-weight: 600; line-height: 1.4"
            >Harbour rates</span>
          </div>

          <div
            class="sp-surface"
            data-part="rail"
            data-subject
            data-selection="rect"
            style="display: flex; flex-direction: column; flex: 0 0 ${r}px; padding: 10px; overflow: hidden"
          >
            <span class="sp-label" style="flex: 0 0 auto; height: 20px">Inspector</span>
            <div data-part="rail-body" style="flex: 1 1 auto; min-height: 0; margin-top: 6px"></div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(n,`rail`),s=e(n,`rail-body`),c=[`rect`,`text`].map(t=>[t,e(n,`obj-${t}`)]),l=e=>{let n=u[e];if(n){o.dataset.selection=e,s.innerHTML=n;for(let[n,r]of c){let i=n===e;t(r,`data-selected`,i),r.style.outline=i?`2px solid var(--sp-accent)`:``,r.style.outlineOffset=i?`3px`:``}}};for(let[e,t]of c)t.addEventListener(`click`,()=>l(e));e(n,`canvas-empty`).addEventListener(`click`,()=>l(`none`)),l(`rect`)}export{d as mount};