import{a as e}from"./touch.Bg97t8LB.js";import{n as t}from"./parts.C-YLuC7Q.js";var n=440,r=176,i=1,a=8,o=[{key:`years`,unit:`year`,from:i,heading:`2020 to 2025`},{key:`months`,unit:`month`,from:2.2,heading:`2024, by month`},{key:`events`,unit:`entry`,from:4.4,heading:`March 2024`}],s=[{label:`2020`,value:34},{label:`2021`,value:52},{label:`2022`,value:46},{label:`2023`,value:71},{label:`2024`,value:88},{label:`2025`,value:63}],c=[{label:`J`,value:42},{label:`F`,value:55},{label:`M`,value:78},{label:`A`,value:61},{label:`M`,value:70},{label:`J`,value:88},{label:`J`,value:74},{label:`A`,value:39},{label:`S`,value:66},{label:`O`,value:81},{label:`N`,value:58},{label:`D`,value:47}],l=[{date:`4 Mar`,title:`Kickoff workshop`},{date:`11 Mar`,title:`First survey returned`},{date:`19 Mar`,title:`Harbour permit granted`},{date:`27 Mar`,title:`Draft plan circulated`}],u=(e,t)=>`
  <div style="display: flex; align-items: flex-end; gap: ${t}px; flex: 1 1 auto; min-height: 0">
    ${e.map(e=>`
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1 1 0; min-width: 0; height: 100%">
        <div style="flex: 1 1 auto; display: flex; align-items: flex-end; width: 100%">
          <div style="width: 100%; height: ${e.value}%; background: var(--sp-accent); border-radius: 4px 4px 0 0"></div>
        </div>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${e.label}</span>
      </div>`).join(``)}
  </div>`,d=(e,t,n)=>`
  <div
    data-part="view-${e}"
    style="position: absolute; inset: 10px 12px; display: flex; flex-direction: column; gap: 8px"
  >
    <span class="sp-label" style="flex: 0 0 auto; font-size: 11px; color: var(--sp-ink)">${t}</span>
    ${n}
  </div>`;function f(f){let p=o[0];f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 242px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour project, history</span>
          <span class="sp-text" data-part="factor" style="width: 168px; text-align: right; white-space: nowrap"></span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="zoom"
            data-subject
            data-touch
            data-level="${p.key}"
            style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px; overflow: hidden; touch-action: none;
                   user-select: none; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            ${d(`years`,o[0]?.heading??``,u(s,10))}
            ${d(`months`,o[1]?.heading??``,u(c,5))}
            ${d(`events`,o[2]?.heading??``,`<ul class="sp-list" style="flex: 1 1 auto; min-height: 0">
                ${l.map(e=>`
                  <li class="sp-list-item" style="padding: 6px 8px">
                    <span class="sp-label" style="flex: 0 0 58px; font-size: 11px; font-variant-numeric: tabular-nums">${e.date}</span>
                    <span class="sp-grow" style="font-size: 12px">${e.title}</span>
                  </li>`).join(``)}
              </ul>`)}
          </div>
        </div>
      </div>
    </div>
  `;let m=t(f,`zoom`),h=t(f,`factor`),g=o.map(e=>({key:e.key,element:t(f,`view-${e.key}`)})),_=e=>Math.min(a,Math.max(i,e)),v=e=>[...o].reverse().find(t=>e>=t.from)??p,y=e=>{let t=v(e);m.dataset.level=t.key;for(let{key:e,element:n}of g)n.hidden=e!==t.key;h.textContent=`Zoom ${e.toFixed(1)}x, unit: ${t.unit}`},b=i,x=i;e(m,{onStart:()=>{x=b},onPinch:e=>y(_(x*e)),onEnd:e=>{b=_(x*e),y(b)}}),m.addEventListener(`wheel`,e=>{e.ctrlKey&&(e.preventDefault(),b=_(b*Math.exp(-e.deltaY*.0035)),y(b))},{passive:!1}),y(b)}export{f as mount};