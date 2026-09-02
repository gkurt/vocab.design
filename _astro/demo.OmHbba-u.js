import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=1200,n=[`radial-gradient(ellipse 150px 46px at 16% 104%, #24402f 0 62%, transparent 63%)`,`radial-gradient(ellipse 120px 70px at 78% 100%, #3d6247 0 66%, transparent 67%)`,`radial-gradient(ellipse 190px 96px at 42% 118%, #4c7a53 0 70%, transparent 71%)`,`radial-gradient(circle at 76% 22%, #fff4c4 0 13px, #ffd45e 0 19px, rgb(255 212 94 / 0.35) 0 30px, transparent 31px)`,`linear-gradient(#5aa7dc 0%, #a9d4ec 44%, #f2cea8 100%)`].join(`, `),r={blur:{paint:[`radial-gradient(circle at 76% 24%, #ffdc7a 0 22px, transparent 23px)`,`linear-gradient(#5da8dd, #a8d3ec 40%, #f0cd9f 62%, #4a7853)`].join(`, `),filter:`blur(11px)`},colour:{paint:`linear-gradient(#8fb9c4, #8fb9c4)`,filter:`none`}},i=`Loading`,a=`Full file: 1600 by 1000, decoded`;function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 224px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field notes</span><span class="sp-label">3G</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="slot"
            data-subject
            data-pose="[data-phase=placeholder]"
            data-kind="blur"
            data-phase="placeholder"
            role="img"
            aria-label="Hillside at sunrise"
            style="position: relative; flex: 0 0 auto; width: 252px; height: 128px; border-radius: 6px; overflow: hidden; background: var(--sp-line)"
          >
            <div
              data-part="stand-in"
              style="position: absolute; inset: -14px; background: ${r.blur.paint}; filter: ${r.blur.filter}"
            ></div>
            <div
              data-part="full"
              style="position: absolute; inset: 0; opacity: 0; background: ${n}; transition: opacity 0.45s var(--sp-ease)"
            ></div>
          </div>
          <span class="sp-label sp-context" data-part="phase" role="status"
                style="display: block; height: 16px; white-space: nowrap">${i}</span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Placeholder" data-part="kind" data-value="blur">
          <button class="sp-segment" data-part="kind-blur" value="blur">Blur</button>
          <button class="sp-segment" data-part="kind-colour" value="colour">Colour</button>
        </sp-segmented>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reload" type="button">Reload</button>
      </div>
    </div>
  `;let c=e(o,`slot`),l=e(o,`stand-in`),u=e(o,`full`),d=e(o,`phase`),f,p=e=>{let n=r[e];s.clearTimeout(f),c.dataset.kind=e,c.dataset.phase=`placeholder`,l.style.background=n.paint,l.style.filter=n.filter,u.style.opacity=`0`,d.textContent=i,f=s.setTimeout(()=>{c.dataset.phase=`loaded`,u.style.opacity=`1`,d.textContent=a},t)};e(o,`kind`).addEventListener(`change`,e=>{p(e.detail===`colour`?`colour`:`blur`)}),e(o,`reload`).addEventListener(`click`,()=>p(c.dataset.kind===`colour`?`colour`:`blur`)),p(`blur`)}export{o as mount};