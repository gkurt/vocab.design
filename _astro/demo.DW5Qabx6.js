import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=430,n=168,r=.44,i={w412:{dp:412,name:`compact`,range:`under 600dp`,columns:1},w560:{dp:560,name:`compact`,range:`under 600dp`,columns:1},w720:{dp:720,name:`medium`,range:`600 to 839dp`,columns:2},w960:{dp:960,name:`expanded`,range:`840dp and up`,columns:3}},a={1:`1fr`,2:`1fr 1fr`,3:`1fr 1fr 1fr`},o=(e,t)=>`
  <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 7px; font-size: 11px">
    ${t}dp
  </button>`,s=[78,62,84],c=e=>`
  <span class="sp-surface" style="display: flex; flex-direction: column; justify-content: center; gap: 5px; min-width: 0; height: 32px; padding: 0 8px">
    <span class="sp-line" style="width: ${s[e%s.length]}%; height: 6px"></span>
    <span class="sp-line" style="width: 46%; height: 6px"></span>
  </span>`;function l(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Window width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="widths" data-axis="Width" data-value="w412">
            ${o(`w412`,412)}${o(`w560`,560)}${o(`w720`,720)}${o(`w960`,960)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="arena"
            style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${t}px; height: ${n}px"
          >
            <div
              data-part="window"
              data-subject
              data-class="compact"
              data-dp="412"
              style="display: flex; flex-direction: column; height: 100%; overflow: hidden; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius); transition: width 0.24s var(--sp-ease)"
            >
              <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 22px; margin-top: 10px; padding: 0 10px">
                <span class="sp-heading sp-grow" style="font-size: 12px">Berths</span>
                <span class="sp-label" data-part="chrome-dp" style="flex: 0 0 auto; font-size: 10px"></span>
              </span>
              <div
                class="sp-grid"
                data-part="grid"
                data-columns="1"
                style="align-content: start; flex: 1 1 auto; min-height: 0; gap: 6px; padding: 8px 10px 10px;
                       grid-template-columns: 1fr; overflow: hidden"
              >
                ${[0,1,2].map(c).join(``)}
              </div>
            </div>
          </div>

          <div
            class="sp-surface sp-context"
            data-part="readout"
            style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; width: ${t}px; height: 50px; padding: 0 12px"
          >
            <span style="display: flex; flex-direction: column; gap: 1px; flex: 1 1 auto; min-width: 0">
              <span class="sp-heading" data-part="class-name" style="font-size: 15px"></span>
              <span class="sp-label" data-part="class-range" style="font-size: 11px"></span>
            </span>
            <span class="sp-chip" data-part="measured" style="flex: 0 0 auto; cursor: default"></span>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(s,`window`),u=e(s,`grid`),d=e(s,`class-name`),f=e(s,`class-range`),p=e(s,`measured`),m=e(s,`chrome-dp`),h=e=>{let t=i[e],n=t?a[t.columns]:void 0;!t||!n||(l.style.width=`${Math.round(t.dp*r)}px`,l.dataset.class=t.name,l.dataset.dp=String(t.dp),u.dataset.columns=String(t.columns),u.style.gridTemplateColumns=n,d.textContent=t.name,f.textContent=t.range,p.textContent=`${t.dp}dp`,m.textContent=`${t.dp}dp`)};e(s,`widths`).addEventListener(`change`,e=>h(e.detail)),h(`w412`)}export{l as mount};