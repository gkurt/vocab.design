import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`ferry`,title:`Ferry timetable, winter`,tab:`Ferry timetable`},{key:`tides`,title:`Tide tables for the harbour`,tab:`Tide tables`},{key:`parking`,title:`Harbour parking permits`,tab:`Parking permits`}],r=`tides`,i=[`display: flex`,`align-items: center`,`flex: 0 0 auto`,`width: 118px`,`height: 26px`,`padding: 0 8px`,`border-radius: 6px 6px 0 0`,`font-size: 11px`,`white-space: nowrap`,`overflow: hidden`,`text-overflow: ellipsis`,`cursor: pointer`].join(`; `),a=(e,t,n)=>`
  <span
    data-part="tab-${e}"
    ${n?`data-active`:``}
    style="${i}; background: ${n?`var(--sp-surface)`:`transparent`}; color: var(--sp-${n?`ink`:`muted`}); box-shadow: ${n?`inset 0 -2px 0 0 var(--sp-accent)`:`none`}"
  >${t}</span>`;function o(i){let o=n.map(({key:e,title:t})=>`
      <a
        class="sp-surface"
        data-part="link-${e}"
        data-link="${e}"
        ${e===r?`data-subject`:``}
        role="link"
        tabindex="0"
        style="display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 10px; cursor: pointer; text-decoration: none"
      >
        <span class="sp-grow" style="min-width: 0; color: var(--sp-accent); font-size: 13px">${t}</span>
        <span class="sp-label" data-part="mark-${e}" style="width: 116px; text-align: right"></span>
      </a>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 208px">
        <div class="sp-topbar sp-context" style="align-items: flex-end; gap: 2px; padding: 10px 10px 0">
          <span class="sp-row" data-part="tabs" style="gap: 2px">${a(`results`,`Harbour search`,!0)}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <span class="sp-label sp-context" style="font-size: 11px">3 results for harbour</span>
          <div class="sp-stack" style="gap: 6px">${o}</div>
        </div>
      </div>
    </div>
  `;let s=e(i,`tabs`),c=e(i,`tab-results`),l=(t,n)=>{e(i,`mark-${t}`).textContent=n},u=n=>{let r=s.querySelector(`[data-part="tab-${n}"]`);r&&(r.remove(),t(e(i,`link-${n}`),`data-opened`,!1),l(n,``))},d=(e,t)=>{s.querySelector(`[data-part="tab-${e}"]`)||s.insertAdjacentHTML(`beforeend`,a(e,t,!1))};for(let{key:r,tab:a}of n){let o=e(i,`link-${r}`);o.addEventListener(`click`,()=>{c.textContent=a,t(c,`data-navigated`,!0);for(let e of n)l(e.key,e.key===r?`opened here`:``)}),o.addEventListener(`auxclick`,e=>{e.button===1&&(e.preventDefault(),d(r,a),t(o,`data-opened`,!0),l(r,`background tab`))})}s.addEventListener(`auxclick`,e=>{if(e.button!==1)return;e.preventDefault();let t=e.target.closest(`[data-part^="tab-"]`);t&&t!==c&&u(t.dataset.part?.slice(4)??``)}),i.addEventListener(`mousedown`,e=>{e.button===1&&e.preventDefault()})}export{o as mount};