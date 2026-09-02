import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[`danger`,`success`,`surface`,`text-subtle`],n={day:{danger:{ref:`red-600`,hex:`#C2312B`},success:{ref:`green-600`,hex:`#2F7D4F`},surface:{ref:`white`,hex:`#FFFFFF`},"text-subtle":{ref:`slate-500`,hex:`#6B7280`}},dusk:{danger:{ref:`red-300`,hex:`#FF9A9A`},success:{ref:`green-300`,hex:`#7FD6A2`},surface:{ref:`slate-900`,hex:`#1B1E24`},"text-subtle":{ref:`slate-400`,hex:`#9AA1AE`}}},r={ref:`blue-600`,hex:`#2F5CF0`},i=`day`,a=24;function o(o){let s=(e,t,n)=>`
    <div class="sp-row ${n.subject?``:`sp-context`}" data-part="${n.part}"
         data-token="${e}" data-resolves="${t.ref}"
         ${n.subject?`data-subject`:``}
         style="height: ${a}px; gap: 8px; padding: 0 8px; border-radius: 6px;
                border: 1px solid var(--sp-line); background: var(--sp-surface)">
      <span class="sp-swatch" data-part="swatch-${n.part}"
            style="flex: 0 0 13px; height: 13px; border-radius: 3px;
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${t.hex}"></span>
      <span class="sp-grow" style="font-size: 11.5px; white-space: nowrap">${e}</span>
      <span class="sp-text" data-part="ref-${n.part}"
            style="flex: 0 0 72px; font-size: 10.5px; white-space: nowrap">${t.ref}</span>
      <span class="sp-text" data-part="hex-${n.part}"
            style="flex: 0 0 62px; font-size: 10px; text-align: right; white-space: nowrap;
                   font-variant-numeric: tabular-nums">${t.hex}</span>
    </div>`,c=n[i]??n.day;if(!c)return;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-scheme="${i}" style="width: 404px; padding: 12px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Scheme" data-part="segmented" data-value="${i}">
            <button class="sp-segment" data-part="seg-day" value="day">Day</button>
            <button class="sp-segment" data-part="seg-dusk" value="dusk">Dusk</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 10px; padding: 0 8px">
          <span class="sp-label sp-grow" style="font-size: 10px">Name</span>
          <span class="sp-label" style="flex: 0 0 72px; font-size: 10px">Points at</span>
          <span class="sp-label" style="flex: 0 0 62px; font-size: 10px; text-align: right">Value</span>
        </div>

        <div class="sp-stack" style="gap: 5px; margin-top: 5px">
          ${t.map(e=>s(e,c[e],{part:`row-${e}`,subject:e===`danger`})).join(``)}
        </div>

        <div class="sp-divider" style="margin: 10px 0"></div>

        ${s(`brand-blue`,r,{part:`row-leaked`})}

        <p class="sp-text sp-context" data-stage-verdict data-part="readout"
           style="margin: 10px 0 0; height: 26px; font-size: 10.5px; line-height: 1.3"></p>
      </div>
    </div>
  `;let l=e(o,`scene`),u=e(o,`readout`),d=r=>{let a=n[r];if(a){l.dataset.scheme=r;for(let n of t){let t=a[n],r=e(o,`row-${n}`);r.dataset.token=n,r.dataset.resolves=t.ref,e(o,`swatch-row-${n}`).style.setProperty(`--sp-swatch`,t.hex),e(o,`ref-row-${n}`).textContent=t.ref,e(o,`hex-row-${n}`).textContent=t.hex}u.textContent=r===i?`Four names state a job. brand-blue states a hue, which is the one name no scheme can move.`:`Every value on the right changed. Not one name on the left did, and brand-blue is still blue.`}};d(i),e(o,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{o as mount};