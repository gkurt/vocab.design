import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={sunset:{name:`Sunset`,sky:`linear-gradient(118deg, #ff8a3d 0%, #ef3f7e 46%, #7b3ff2 100%)`,blobA:`#ffd166`,blobB:`#ff4d6d`,tint:`warm orange through magenta`},ocean:{name:`Ocean`,sky:`linear-gradient(118deg, #12b0c4 0%, #2563eb 52%, #16b8a6 100%)`,blobA:`#a7f3d0`,blobB:`#38bdf8`,tint:`cool teal through blue`}},r=`sunset`,i=e=>`
  <div style="${e?`mix-blend-mode: luminosity; `:``}color: #1a1d23">
    <div style="font-size: 13px; font-weight: 600; letter-spacing: -0.01em">Now playing</div>
    <div style="font-size: 11px; margin-top: 2px; opacity: 0.85">Side two, track four</div>
    <div class="sp-row" style="gap: 6px; margin-top: 12px">
      ${t(`heart`)}${t(`star`)}${t(`share`)}
    </div>
  </div>`;function a(t){let a=n[r]??n.sunset;if(!a)throw Error(`unknown backdrop`);let o=e=>{let t=e===`right`;return`
      <div data-part="${t?`material`:`flat`}" ${t?`data-subject`:``}
           style="position: absolute; ${e}: 22px; top: 30px; width: 170px; height: 120px; padding: 12px 13px;
                  border-radius: 13px; border: 1px solid rgb(255 255 255 / 0.45);
                  background: rgb(255 255 255 / 0.2); backdrop-filter: blur(14px) saturate(190%);
                  -webkit-backdrop-filter: blur(14px) saturate(190%); box-shadow: 0 6px 18px rgb(20 12 40 / 0.22)">
        ${i(t)}
      </div>`};t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Backdrop" data-value="${r}">
            ${Object.entries(n).map(([e,t])=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${t.name}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div data-part="scene" data-backdrop="${r}"
             style="position: relative; height: 162px; margin-top: 11px; border-radius: 10px; overflow: hidden">
          <div class="sp-context" data-part="sky" aria-hidden="true" style="position: absolute; inset: 0; background: ${a.sky}">
            <span data-part="blob-a" style="position: absolute; left: 4%; top: 6%; width: 132px; height: 132px;
                  border-radius: 50%; filter: blur(3px); opacity: 0.8; background: ${a.blobA}"></span>
            <span data-part="blob-b" style="position: absolute; right: 6%; bottom: -12%; width: 148px; height: 148px;
                  border-radius: 50%; filter: blur(3px); opacity: 0.75; background: ${a.blobB}"></span>
          </div>

          <div class="sp-context" aria-hidden="true"
               style="position: absolute; left: 22px; top: 8px; width: 170px; font-size: 10.5px; font-weight: 600;
                      color: rgb(255 255 255 / 0.92)">Blur only</div>
          <div class="sp-context" aria-hidden="true"
               style="position: absolute; right: 22px; top: 8px; width: 170px; text-align: right; font-size: 10.5px;
                      font-weight: 600; color: rgb(255 255 255 / 0.92)">Blur plus vibrancy</div>

          ${o(`left`)}
          ${o(`right`)}
        </div>

        <div class="sp-row sp-row--between sp-context" style="height: 16px; margin-top: 8px">
          <span class="sp-label" style="font-size: 10.5px">mix-blend-mode: luminosity</span>
          <span class="sp-text" data-part="tint" style="font-size: 10.5px">sampled: ${a.tint}</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 6px 0 0; height: 28px; font-size: 10.5px; line-height: 1.4">
          Same material on both: same blur, same tint, same edge. Only the right panel derives its ink from the
          blurred sample beneath it.
        </p>
      </div>
    </div>
  `;let s=e(t,`scene`),c=e(t,`sky`),l=e(t,`blob-a`),u=e(t,`blob-b`),d=e(t,`tint`),f=e=>{let t=n[e]??n.sunset;t&&(s.dataset.backdrop=e,c.style.background=t.sky,l.style.background=t.blobA,u.style.background=t.blobB,d.textContent=`sampled: ${t.tint}`)};e(t,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{a as mount};