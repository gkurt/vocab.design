import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`queued`,label:`Queued`,runs:4},{key:`running`,label:`Running`,runs:2},{key:`passed`,label:`Passed`,runs:31},{key:`failed`,label:`Failed`,runs:6},{key:`skipped`,label:`Skipped`,runs:3}],i=[`failed`],a=(e,t)=>`
  <span class="sp-chip" data-part="chip-${e}" style="cursor: default">
    ${t}
    <button class="sp-chip-remove" type="button" data-part="chip-${e}-remove" data-remove="${e}" aria-label="Remove ${t.toLowerCase()}">✕</button>
  </span>`;function o(o){let s=r.map(({key:e,label:t,runs:n})=>`
      <li
        class="sp-option sp-row"
        role="option"
        data-part="opt-${e}"
        data-key="${e}"
        aria-selected="${i.includes(e)}"
        style="gap: 8px"
      >
        <span class="sp-checkbox" data-part="box-${e}" aria-hidden="true"${i.includes(e)?` data-checked`:``}></span>
        <span class="sp-grow">${t}</span>
        <span class="sp-text" style="font-size: 12px">${n}</span>
      </li>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 340px; height: 320px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" data-part="outside">Test runs</span>
          <span class="sp-label" data-part="count" style="width: 62px; text-align: right">6 runs</span>
        </div>
        <div class="sp-body">
          <div class="sp-label sp-context" style="margin-bottom: 6px" id="vd-ms-label">Status</div>
          <div data-part="control" data-subject style="position: relative">
            <div
              class="sp-input sp-row"
              data-part="trigger"
              role="combobox"
              tabindex="0"
              aria-controls="vd-ms-list"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-labelledby="vd-ms-label"
              style="align-items: flex-start; flex-wrap: wrap; gap: 6px; min-height: 62px; padding: 8px; cursor: pointer"
            >
              <span class="sp-row sp-row--wrap sp-grow" data-part="chips" style="gap: 6px"></span>
              <span class="sp-text" data-part="placeholder" hidden>Any status</span>
              ${n(`chevronDown`)}
            </div>
            <ul
              class="sp-listbox"
              data-part="list"
              id="vd-ms-list"
              role="listbox"
              aria-multiselectable="true"
              aria-labelledby="vd-ms-label"
              style="max-height: 160px"
            >${s}</ul>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`control`),l=e(o,`trigger`),u=e(o,`list`),d=e(o,`chips`),f=e(o,`placeholder`),p=e(o,`count`),m=new Set(i),h=()=>{d.innerHTML=r.filter(({key:e})=>m.has(e)).map(({key:e,label:t})=>a(e,t)).join(``),f.hidden=m.size>0;for(let{key:n}of r)e(o,`opt-${n}`).setAttribute(`aria-selected`,String(m.has(n))),t(e(o,`box-${n}`),`data-checked`,m.has(n));let n=r.filter(({key:e})=>m.has(e)).reduce((e,{runs:t})=>e+t,0);p.textContent=m.size===0?`46 runs`:`${n} runs`,c.dataset.chosen=r.filter(({key:e})=>m.has(e)).map(({key:e})=>e).join(` `)},g=e=>{t(u,`data-open`,e),l.setAttribute(`aria-expanded`,String(e))};l.addEventListener(`click`,e=>{e.target.closest(`[data-remove]`)||g(!0)}),l.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `||e.key===`ArrowDown`)&&(e.preventDefault(),g(!0))}),d.addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove]`)?.dataset.remove;t&&(m.delete(t),h())});for(let{key:t}of r){let n=e(o,`opt-${t}`),r=()=>{m.has(t)?m.delete(t):m.add(t),h()};n.addEventListener(`click`,r),n.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),r())})}o.addEventListener(`keydown`,e=>{e.key===`Escape`&&g(!1)}),o.addEventListener(`pointerdown`,e=>{let t=e.target;c.contains(t)||g(!1)}),h()}export{o as mount};