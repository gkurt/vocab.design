import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=420,r=[`left ${n}ms var(--sp-ease)`,`top ${n}ms var(--sp-ease)`,`width ${n}ms var(--sp-ease)`,`height ${n}ms var(--sp-ease)`,`border-radius ${n}ms var(--sp-ease)`].join(`, `),i={left:10,top:10,width:158,height:76,radius:8},a={left:0,top:0,width:356,height:196,radius:12};function o(n,o){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 396px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Specimens</span>
          <span class="sp-label" data-part="readout">closed</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="slot"
            style="position: relative; width: ${a.width}px; height: ${a.height}px"
          >
            <div
              class="sp-surface sp-context"
              style="position: absolute; left: 178px; top: 10px; width: 168px; height: 76px; padding: 10px"
            >
              <span class="sp-heading" style="font-size: 13px">Sea holly</span>
              <span class="sp-line" style="display: block; width: 74%; margin-top: 10px"></span>
            </div>
            <div
              class="sp-surface sp-context"
              style="position: absolute; left: 10px; top: 98px; width: 336px; height: 88px; padding: 10px"
            >
              <span class="sp-heading" style="font-size: 13px">Marram grass</span>
              <span class="sp-line" style="display: block; width: 88%; margin-top: 10px"></span>
              <span class="sp-line" style="display: block; width: 62%; margin-top: 8px"></span>
            </div>

            <div
              data-part="surface"
              data-subject
              data-state="settled"
              style="position: absolute; overflow: hidden; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); box-shadow: var(--sp-shadow); ${(e=>`left: ${e.left}px; top: ${e.top}px; width: ${e.width}px; height: ${e.height}px; border-radius: ${e.radius}px`)(i)};
                     transition: ${r}"
            >
              <div
                data-part="compact"
                class="sp-row"
                style="position: absolute; left: 0; top: 0; width: ${i.width}px; height: ${i.height}px;
                       gap: 9px; padding: 10px; opacity: 1; transition: opacity 160ms linear 140ms"
              >
                <span class="sp-swatch" style="flex: 0 0 34px; align-self: stretch; --sp-swatch: var(--sp-accent-soft)"></span>
                <span class="sp-stack sp-grow" style="gap: 6px; min-width: 0">
                  <span class="sp-heading" style="font-size: 13px">Thrift</span>
                  <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="open" style="align-self: flex-start">
                    Open
                  </button>
                </span>
              </div>

              <div
                data-part="detail"
                class="sp-stack"
                style="position: absolute; left: 0; top: 0; width: ${a.width}px; height: ${a.height}px;
                       gap: 10px; padding: 12px; opacity: 0; visibility: hidden;
                       transition: opacity 200ms linear, visibility 200ms linear"
              >
                <div class="sp-row sp-row--between">
                  <span class="sp-heading">Thrift</span>
                  <button class="sp-icon-button" type="button" data-part="close" aria-label="Close">${t(`close`)}</button>
                </div>
                <span class="sp-swatch" style="height: 58px; --sp-swatch: var(--sp-accent-soft)"></span>
                <span class="sp-text">Armeria maritima. Cliff tops and salt marsh, flowering May to August.</span>
                <span class="sp-line" style="width: 84%"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(n,`surface`),c=e(n,`compact`),l=e(n,`detail`),u=e(n,`readout`),d,f=e=>{if(e===(s.dataset.open!==void 0))return;let t=e?a:i;o.clearTimeout(d),e?s.dataset.open=``:s.removeAttribute(`data-open`),s.dataset.state=`moving`,s.style.left=`${t.left}px`,s.style.top=`${t.top}px`,s.style.width=`${t.width}px`,s.style.height=`${t.height}px`,s.style.borderRadius=`${t.radius}px`,c.style.opacity=e?`0`:`1`,c.style.transitionDelay=e?`0ms`:`160ms`,l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`,l.style.transitionDelay=e?`180ms`:`0ms`,u.textContent=e?`expanded`:`closed`,d=o.setTimeout(()=>{s.dataset.state=`settled`},500)};e(n,`open`).addEventListener(`click`,()=>f(!0)),e(n,`close`).addEventListener(`click`,()=>f(!1))}export{o as mount};