import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={indigo:{fill:`#4F46E5`,on:`#FFFFFF`,wrong:`#7C75EC`},amber:{fill:`#F2B23A`,on:`#241802`,wrong:`#F6C86E`},teal:{fill:`#0F766E`,on:`#FFFFFF`,wrong:`#3E958E`}},r=`indigo`,i=(e,t)=>Number.parseInt(e.slice(t,t+2),16)/255,a=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,o=e=>.2126*a(i(e,1))+.7152*a(i(e,3))+.0722*a(i(e,5)),s=(e,t)=>{let[n,r]=[o(e),o(t)].sort((e,t)=>t-e);return((n??0)+.05)/((r??0)+.05)};function c(i){let a=e=>`
    <div class="sp-stack sp-grow" style="gap: 6px">
      <div data-part="${e.part}" style="height: 106px; padding: 14px; border-radius: var(--sp-radius); background: ${n[r]?.fill}">
        <div class="sp-stack" data-part="${e.part}-ink" ${e.subject?`data-subject`:``} style="gap: 6px; color: ${e.subject?n[r]?.on:n[r]?.wrong}">
          <div class="sp-row" style="gap: 6px">${t(`check`)}<span class="sp-heading">Published</span></div>
          <span class="sp-text" style="color: inherit; opacity: 0.86">Live for everyone on the team.</span>
        </div>
      </div>
      <div class="sp-row sp-row--between">
        <span class="sp-label">${e.label}</span>
        <span class="sp-text" data-part="${e.part}-ratio" style="width: 96px; text-align: right">&nbsp;</span>
      </div>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${r}" data-axis="Primary">
            <button class="sp-segment" data-part="seg-indigo" value="indigo">Indigo</button>
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
            <button class="sp-segment" data-part="seg-teal" value="teal">Teal</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="pair" data-palette="${r}" style="gap: 12px; margin-top: 14px; align-items: flex-start">
          ${a({part:`paired`,subject:!0,label:`on-primary`})}
          <div class="sp-context sp-grow" style="display: flex">${a({part:`unpaired`,label:`primary on primary`})}</div>
        </div>
      </div>
    </div>
  `;let o=e(i,`pair`),c=t=>{let r=n[t];if(r){o.dataset.palette=t;for(let t of[`paired`,`unpaired`]){let n=t===`paired`?r.on:r.wrong;e(i,t).style.background=r.fill,e(i,`${t}-ink`).style.color=n;let a=s(r.fill,n);e(i,`${t}-ratio`).textContent=`${a.toFixed(1)}:1 ${a>=4.5?`passes`:`fails`}`}}};c(r),e(i,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{c as mount};