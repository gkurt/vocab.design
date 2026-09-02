import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=16,n=80;function r(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function i(e){let t=e;return t^=t<<13,t>>>=0,t^=t>>>17,t^=t<<5,t>>>0}function a(e){let t=r(e),n=i(t),a=[];for(let e=0;e<5;e++)for(let t=0;t<5;t++){let r=t>2?4-t:t;a.push((n>>>e*3+r&1)==1)}return{hash:t,hue:t%360,cells:a,code:(n&32767).toString(16).padStart(4,`0`)}}function o(e,t){return t?`hsl(${e.hue} 54% 46%)`:`var(--sp-sunken)`}var s=[`nils`,`marceau`,`tomas`];function c(r){let i=(e,r)=>`
    <span
      data-part="${e}"
      ${r?`data-subject`:``}
      role="img"
      style="display: grid; grid-template-columns: repeat(5, ${t}px); grid-template-rows: repeat(5, ${t}px);
             flex: 0 0 auto; width: ${n}px; height: ${n}px; border-radius: 6px; overflow: hidden"
    ></span>`,c=(e,t,n)=>`
    <div class="sp-surface" style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1 1 0; min-width: 0; padding: 12px">
      ${i(e,n)}
      <span class="sp-heading sp-context" data-part="${e}-handle" style="font-size: 13px">@nils</span>
      <span class="sp-label sp-context" style="font-size: 11px; white-space: nowrap">${t}</span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-handle="nils" style="width: 452px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Northwind</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Account" data-part="picker" data-value="nils">
            <button class="sp-segment" type="button" data-part="seg-nils" value="nils" style="padding: 4px 9px; font-size: 12px">@nils</button>
            <button class="sp-segment" type="button" data-part="seg-marceau" value="marceau" style="padding: 4px 9px; font-size: 12px">@marceau</button>
            <button class="sp-segment" type="button" data-part="seg-tomas" value="tomas" style="padding: 4px 9px; font-size: 12px">@tomas</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row" style="gap: 12px; align-items: stretch">
            ${c(`mark-review`,`Review request`,!0)}
            ${c(`mark-list`,`Members list`,!1)}
          </div>
          <span
            class="sp-label sp-context"
            data-part="seed"
            data-match="no"
            style="flex: 0 0 auto; height: 22px; font-size: 11px; line-height: 22px; white-space: nowrap; overflow: hidden"
          ></span>
        </div>
      </div>
    </div>
  `;let l=e(r,`scene`),u=e(r,`seed`),d=[`mark-review`,`mark-list`],f=(t,n)=>{let i=a(n),s=e(r,t);return s.dataset.handle=n,s.dataset.code=i.code,s.setAttribute(`aria-label`,`Generated avatar for @${n}`),s.innerHTML=i.cells.map(e=>`<span style="background: ${o(i,e)}"></span>`).join(``),e(r,`${t}-handle`).textContent=`@${n}`,i},p=e=>{l.dataset.handle=e;let[t,n]=d.map(t=>f(t,e));!t||!n||(u.dataset.match=t.code===n.code&&t.hue===n.hue?`yes`:`no`,u.textContent=`seed "@${e}" · hash 0x${t.hash.toString(16).padStart(8,`0`)} · hue ${t.hue} · 15 bits, mirrored`)};e(r,`picker`).addEventListener(`change`,e=>p(e.detail)),p(e(r,`picker`).value||s[0])}export{c as mount};