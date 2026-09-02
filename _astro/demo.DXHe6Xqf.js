import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=422,n=140,r=64,i=10,a=344,o=108,s=118,c=2,l=6,u=8,d=[0,2,4,6,8],f=[{key:`control`,label:`Control`,estimate:4.1,low:3.4,high:4.8},{key:`blue`,label:`Blue`,estimate:4.9,low:4.2,high:5.6},{key:`copy`,label:`Copy`,estimate:3.2,low:2.9,high:3.5},{key:`both`,label:`Both`,estimate:5.4,low:4,high:6.8}],p=`blue`,m=o/f.length,h=e=>r+e/u*a,g=e=>i+(e+.5)*m,_=[`bare`,`bars`,`band`],v=`bars`,y={bare:`Point estimates only`,bars:`95 per cent intervals`,band:`95 per cent intervals`},b={bare:`Blue ahead by 0.8 points`,bars:`Blue ahead by 0.8, ranges overlap`,band:`Blue ahead by 0.8, ranges overlap`},x=(e,t)=>`
  <line x1="${h(e.low).toFixed(1)}" y1="${t}" x2="${h(e.high).toFixed(1)}" y2="${t}" stroke="var(--sp-accent)" stroke-width="${c}" />
  <line
    x1="${h(e.low).toFixed(1)}" y1="${t-l}" x2="${h(e.low).toFixed(1)}" y2="${t+l}"
    stroke="var(--sp-accent)" stroke-width="${c}"
  />
  <line
    x1="${h(e.high).toFixed(1)}" y1="${t-l}" x2="${h(e.high).toFixed(1)}" y2="${t+l}"
    stroke="var(--sp-accent)" stroke-width="${c}"
  />`,S=(e,t)=>`
  <rect
    x="${h(e.low).toFixed(1)}" y="${t-7}" width="${(h(e.high)-h(e.low)).toFixed(1)}" height="14" rx="7"
    fill="var(--sp-accent)" fill-opacity="0.2" stroke="var(--sp-accent)" stroke-width="1" stroke-opacity="0.5"
  />`,C=(e,t,n)=>`
  <g data-part="interval-${e.key}"${n?` data-subject`:``}>
    <g data-part="whisk-${e.key}">${x(e,g(t))}</g>
    <g data-part="band-${e.key}" hidden>${S(e,g(t))}</g>
  </g>`;function w(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout test</span>
          <span
            class="sp-label"
            data-stage-verdict data-part="verdict"
            data-mode="${v}"
            role="status"
            style="width: 196px; text-align: right; font-size: 12px; white-space: nowrap"
          ></span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="height: 17px">
              <span class="sp-label">Conversion rate, per cent</span>
              <span
                class="sp-label"
                data-part="basis"
                data-mode="${v}"
                style="width: 132px; text-align: right; font-size: 11px; white-space: nowrap"
              ></span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Conversion rate for four checkout variants, each between three and six per cent"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block; margin-top: 6px"
            >
              <g class="sp-context">
                ${d.map(e=>`<line x1="${h(e).toFixed(1)}" y1="${i}" x2="${h(e).toFixed(1)}" y2="${s}" stroke="var(--sp-line)" stroke-width="${c}" />`).join(``)}
                ${d.map(e=>`<text x="${h(e).toFixed(1)}" y="132" text-anchor="middle" fill="var(--sp-muted)" font-size="9">${e}</text>`).join(``)}
                ${f.map((e,t)=>`<text x="54" y="${(g(t)+3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-ink)" font-size="10">${e.label}</text>`).join(``)}
                <line x1="${r}" y1="${s}" x2="408" y2="${s}" stroke="var(--sp-muted)" stroke-width="${c}" />
                ${f.map((e,t)=>e.key===p?``:C(e,t,!1)).join(``)}
              </g>

              ${f.map((e,t)=>e.key===p?C(e,t,!0):``).join(``)}

              <g class="sp-context">${f.map((e,t)=>`<circle cx="${h(e.estimate).toFixed(1)}" cy="${g(t).toFixed(1)}" r="4" fill="var(--sp-accent)" />`).join(``)}</g>
            </svg>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Uncertainty" data-part="picker" data-value="${v}">
          <button class="sp-segment" type="button" data-part="seg-bare" value="bare" style="padding: 4px 10px; font-size: 12px">Bare</button>
          <button class="sp-segment" type="button" data-part="seg-bars" value="bars" style="padding: 4px 10px; font-size: 12px">Error bars</button>
          <button class="sp-segment" type="button" data-part="seg-band" value="band" style="padding: 4px 10px; font-size: 12px">Band</button>
        </sp-segmented>
      </div>
    </div>
  `;let o=e(a,`verdict`),l=e(a,`basis`),u=f.flatMap(t=>[{mode:`bars`,el:e(a,`whisk-${t.key}`)},{mode:`band`,el:e(a,`band-${t.key}`)}]),m=e=>{if(_.includes(e)){for(let t of u)t.mode===e?t.el.removeAttribute(`hidden`):t.el.setAttribute(`hidden`,``);o.dataset.mode=e,o.textContent=b[e]??``,l.dataset.mode=e,l.textContent=y[e]??``}};e(a,`picker`).addEventListener(`change`,e=>m(e.detail)),m(v)}export{w as mount};