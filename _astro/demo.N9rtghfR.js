import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import{r as n}from"./measure.DK7AY2_i.js";var r=476,i=262,a=252,o=142,s=34,c=10,l=(e,t,n)=>Math.min(Math.max(e,t),n);function u(e,t,n,r){let i=r=>`<rect x="${e+r*14}" y="${t}" width="4" height="${n}" fill="rgb(255 255 255 / 0.3)" />`;return Array.from({length:r},(e,t)=>i(t)).join(``)}var d=[[58,34],[128,62],[206,26],[300,96],[352,40],[416,130],[92,176],[268,208],[388,190],[162,128]];function f(e,n,r,i){return`
    <span data-part="icon-${e}"
          style="position: absolute; left: ${i}px; top: 22px; display: flex; flex-direction: column; align-items: center;
                 gap: 4px; width: 40px; color: #ffffff; text-shadow: 0 1px 3px rgb(0 0 0 / 0.7)">
      <span style="display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 6px;
                   background: rgb(255 255 255 / 0.24); border: 1px solid rgb(255 255 255 / 0.45)">${t(n)}</span>
      <span style="font-size: 9px; line-height: 1">${r}</span>
    </span>`}function p(p){let m=`
    <span data-part="controls" class="sp-row" style="gap: 4px; margin-left: auto">
      <span style="display: flex; align-items: flex-end; justify-content: center; width: 26px; height: 18px; padding-bottom: 4px;
                   border-radius: 4px; border: 1px solid rgb(255 255 255 / 0.6);
                   background: linear-gradient(rgb(255 255 255 / 0.42), rgb(255 255 255 / 0.12))">
        <span style="width: 9px; height: 2px; background: #ffffff"></span>
      </span>
      <span style="display: flex; align-items: center; justify-content: center; width: 26px; height: 18px; border-radius: 4px;
                   border: 1px solid rgb(255 255 255 / 0.6);
                   background: linear-gradient(rgb(255 255 255 / 0.42), rgb(255 255 255 / 0.12))">
        <span style="width: 9px; height: 8px; border: 1.5px solid #ffffff"></span>
      </span>
      <span data-part="close" style="display: flex; align-items: center; justify-content: center; width: 32px; height: 18px;
                   border-radius: 4px; border: 1px solid rgb(255 255 255 / 0.6); color: #ffffff;
                   background: linear-gradient(rgb(232 96 84 / 0.85), rgb(178 38 32 / 0.8))">
        ${t(`close`)}
      </span>
    </span>`,h=[`Quarterly review`,`Site photos`,`Invoices 2009`].map(e=>`
      <span class="sp-row" style="gap: 8px; padding: 5px 4px">
        <span aria-hidden="true" style="width: 14px; height: 14px; border-radius: 3px; background: #9fb6cf"></span>
        <span style="font-size: 11px; color: #2c3a4b">${e}</span>
      </span>`).join(``);p.innerHTML=`
    <div class="sp-app" style="gap: 9px">
      <div
        data-part="desktop"
        style="position: relative; width: ${r}px; height: ${i}px; overflow: hidden; border-radius: 8px;
               box-shadow: 0 0 0 1px var(--sp-line)"
      >
        <svg data-part="wallpaper" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" role="presentation"
             style="position: absolute; inset: 0; display: block">
          <defs>
            <linearGradient id="wa-sky" x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0" stop-color="#062a52" />
              <stop offset="0.52" stop-color="#0a5f7e" />
              <stop offset="1" stop-color="#04203f" />
            </linearGradient>
            <radialGradient id="wa-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stop-color="#bff0ff" stop-opacity="0.4" />
              <stop offset="1" stop-color="#bff0ff" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="${r}" height="${i}" fill="url(#wa-sky)" />
          <ellipse cx="336" cy="58" rx="210" ry="128" fill="url(#wa-glow)" />
          <path d="M-20 206C90 126 152 244 262 154S404 44 500 96L500 262L-20 262Z" fill="rgb(58 190 222 / 0.26)" />
          <path d="M-20 206C90 126 152 244 262 154S404 44 500 96" fill="none" stroke="rgb(198 246 255 / 0.85)" stroke-width="3" />
          <path d="M-20 240C80 186 168 262 268 200S412 128 500 158" fill="none" stroke="rgb(150 226 255 / 0.6)" stroke-width="3" />
          ${u(34,74,66,10)}
          ${u(244,18,54,9)}
          ${d.map(([e,t])=>`<circle cx="${e}" cy="${t}" r="2" fill="rgb(255 255 255 / 0.75)" />`).join(``)}
        </svg>

        ${f(`left`,`inbox`,`Docs`,28)}
        ${f(`right`,`calendar`,`Diary`,404)}

        <div
          data-part="window"
          data-at="left"
          style="position: absolute; left: 14px; top: 88px; width: ${a}px; height: ${o}px; overflow: hidden;
                 border-radius: 9px 9px 4px 4px;
                 box-shadow: 0 0 0 1px rgb(255 255 255 / 0.34), 0 0 22px 4px rgb(120 200 255 / 0.28), 0 14px 30px rgb(0 12 28 / 0.5)"
        >
          <div
            data-part="titlebar"
            data-subject
            style="display: flex; align-items: center; gap: 8px; height: ${s}px; padding: 0 8px 0 12px;
                   border-radius: 8px 8px 0 0;
                   background: linear-gradient(rgb(146 196 238 / 0.5), rgb(96 152 206 / 0.44));
                   backdrop-filter: blur(13px) saturate(1.5);
                   -webkit-backdrop-filter: blur(13px) saturate(1.5);
                   box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.85), inset 0 -1px 0 rgb(255 255 255 / 0.3),
                               inset 1px 0 0 rgb(255 255 255 / 0.4), inset -1px 0 0 rgb(255 255 255 / 0.4);
                   cursor: grab; touch-action: none"
          >
            <span aria-hidden="true" style="width: 14px; height: 14px; border-radius: 3px; background: rgb(255 255 255 / 0.8)"></span>
            <span data-part="title"
                  style="font-size: 12px; font-weight: 600; color: #ffffff; text-shadow: 0 0 6px rgb(255 255 255 / 0.9), 0 1px 2px rgb(0 30 60 / 0.6)">
              Documents
            </span>
            ${m}
          </div>

          <div data-part="window-body"
               style="height: 108px; padding: 8px 10px; background: #f2f6fb; border-top: 1px solid rgb(255 255 255 / 0.6)">
            <span class="sp-row" style="gap: 6px; margin-bottom: 4px">
              <span style="font-size: 10px; color: #5b6b7d">Libraries</span>
              <span style="font-size: 10px; color: #8b9aab">›</span>
              <span style="font-size: 10px; color: #5b6b7d">Documents</span>
            </span>
            ${h}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 476px; margin: 0; text-align: center">
        Move the window and the frame re-samples whatever is now behind it.
      </p>
    </div>
  `;let g=e(p,`desktop`),_=e(p,`window`),v=e(p,`titlebar`),y;v.addEventListener(`pointerdown`,e=>{e.isTrusted&&v.setPointerCapture(e.pointerId);let t=n(e,_);y={dx:t.x,dy:t.y}}),v.addEventListener(`pointermove`,e=>{if(!y)return;let t=n(e,g),r=l(t.x-y.dx,c,214),i=l(t.y-y.dy,c,110);_.style.left=`${r}px`,_.style.top=`${i}px`,_.dataset.at=r>224/2?`right`:`left`});let b=()=>{y=void 0};v.addEventListener(`pointerup`,b),v.addEventListener(`pointercancel`,b)}export{p as mount};