import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],r={split:`For example, 31 03 1994. Filling a box sends the next character to the next box.`,one:`For example, 31/03/1994. One box, and the reader types the separators.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 270px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 12.5px">Membership form</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Fields" data-part="mode" data-value="split" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-split" type="button" value="split" style="padding: 4px 9px; font-size: 11.5px">Three boxes</button>
            <button class="sp-segment" data-part="seg-one" type="button" value="one" style="padding: 4px 9px; font-size: 11.5px">One field</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 11px">
            <span class="sp-label" style="display: block; height: 15px; font-size: 11px">Date of birth</span>

            <div style="position: relative; height: 54px; margin-top: 4px">
              <div class="sp-row" data-part="split" data-subject style="position: absolute; inset: 0; gap: 8px; align-items: flex-end">
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Day</span>
                  <input class="sp-input" data-part="sub-day" type="text" inputmode="numeric" aria-label="Day" style="width: 48px; text-align: center" />
                </span>
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Month</span>
                  <input class="sp-input" data-part="sub-month" type="text" inputmode="numeric" aria-label="Month" style="width: 48px; text-align: center" />
                </span>
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Year</span>
                  <input class="sp-input" data-part="sub-year" type="text" inputmode="numeric" aria-label="Year" style="width: 68px; text-align: center" />
                </span>
              </div>

              <div class="sp-row" data-part="single" style="position: absolute; inset: 0; display: none; gap: 8px; align-items: flex-end">
                <span class="sp-field" style="flex: 0 0 auto">
                  <span class="sp-label" style="font-size: 10px">Date</span>
                  <input class="sp-input" data-part="one" type="text" inputmode="numeric" aria-label="Date of birth" placeholder="DD/MM/YYYY" style="width: 164px" />
                </span>
              </div>
            </div>

            <span class="sp-text" data-stage-verdict data-part="hint" style="display: block; height: 14px; margin-top: 7px; font-size: 10.5px; line-height: 14px">${r.split}</span>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 auto; padding: 7px 11px">
            <span class="sp-label" style="display: block; height: 14px; font-size: 10.5px">Parsed value</span>
            <span class="sp-text sp-text--ink" data-part="status" data-state="waiting" style="display: block; height: 16px; font-size: 11.5px; line-height: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Nothing yet.</span>
          </div>

          <span class="sp-text sp-context" data-part="moves" data-count="0" style="flex: 0 0 auto; height: 15px; font-size: 10.5px; line-height: 15px">Boxes crossed while typing: 0</span>
        </div>
      </div>
    </div>
  `;let a=[{el:e(i,`sub-day`),max:2},{el:e(i,`sub-month`),max:2},{el:e(i,`sub-year`),max:4}],o=e(i,`one`),s=e(i,`split`),c=e(i,`single`),l=e(i,`hint`),u=e(i,`status`),d=e(i,`moves`),f=0,p=0,m=!1,h=e=>{f=e,d.dataset.count=String(e),d.textContent=`Boxes crossed while typing: ${e}`},g=(e,t)=>{u.dataset.state=e,u.textContent=t},_=()=>{a.forEach((e,n)=>{t(e.el,`data-sim-focus`,m&&n===p)})},v=e=>{for(let n=e;n<a.length;n++){let e=a[n];if(!e)continue;let r=e.el.value.replace(/\D/g,``);if(r.length>e.max){e.el.value=r.slice(0,e.max);let t=a[n+1];t&&(t.el.value+=r.slice(e.max))}else e.el.value=r;t(e.el,`data-filled`,e.el.value.length===e.max)}},y=(e,t,r)=>`${Number(e)} ${n[Number(t)-1]??t} ${r}`,b=()=>{let[e=``,t=``,n=``]=a.map(e=>e.el.value);if(e.length!==2||t.length!==2||n.length!==4)return g(`waiting`,`Nothing yet.`);g(`complete`,y(e,t,n))};a.forEach((e,t)=>{e.el.addEventListener(`input`,e=>{m=!0,v(t);let n=a.findIndex(e=>e.el.value.length<e.max),r=n===-1?a.length-1:n;r>p&&h(f+(r-p)),p=r,_(),b(),e.isTrusted&&r!==t&&a[r]?.el.focus()})}),o.addEventListener(`input`,()=>{o.value=o.value.replace(/[^\d/]/g,``);let e=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(o.value);if(!e)return g(`waiting`,`Nothing yet.`);g(`complete`,y(e[1]??``,e[2]??``,e[3]??``))});let x=e=>{s.style.display=e===`split`?`flex`:`none`,c.style.display=e===`one`?`flex`:`none`,l.textContent=r[e];for(let e of a)e.el.value=``,e.el.removeAttribute(`data-filled`);o.value=``,p=0,m=!1,h(0),g(`waiting`,`Nothing yet.`),_()};e(i,`mode`).addEventListener(`change`,e=>{x(e.detail===`one`?`one`:`split`)}),x(`split`)}export{i as mount};