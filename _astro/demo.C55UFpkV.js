import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=600,r=60,i=`cubic-bezier(0.2, 0, 0, 1)`,a=[{id:`duration-fast`,value:`120 ms`,dur:120,timing:i},{id:`duration-base`,value:`240 ms`,dur:240,timing:i},{id:`duration-slow`,value:`400 ms`,dur:400,timing:i},{id:`ease-standard`,value:`0.2, 0, 0, 1`,dur:n,timing:i},{id:`ease-enter`,value:`0, 0, 0, 1`,dur:n,timing:`cubic-bezier(0, 0, 0, 1)`},{id:`ease-exit`,value:`0.3, 0, 1, 1`,dur:n,timing:`cubic-bezier(0.3, 0, 1, 1)`}],o=Math.max(...a.map(e=>e.dur)),s={dur:240,timing:i};function c(n,i){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 432px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Motion tokens</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 10px">
          <table
            class="sp-table"
            data-part="table"
            data-subject
            data-state="settled"
            style="flex: 1 1 auto; --sp-cell-pad: 3px 8px"
          >
            <thead>
              <tr>
                <th style="width: 108px">Token</th>
                <th style="width: 78px">Value</th>
                <th>Runs like</th>
              </tr>
            </thead>
            <tbody>${a.map(e=>`
      <tr data-part="row-${e.id}">
        <td>${e.id}</td>
        <td class="sp-text">${e.value}</td>
        <td>
          <span class="sp-track" style="display: block; width: 108px; flex: 0 0 auto">
            <span
              class="sp-dot"
              data-part="dot-${e.id}"
              style="animation-duration: ${e.dur}ms; --sp-timing: ${e.timing}"
            ></span>
          </span>
        </td>
      </tr>`).join(``)}</tbody>
          </table>
          <div class="sp-stack sp-context" style="flex: 0 0 98px; gap: 8px">
            <span class="sp-label">Spent by</span>
            <div
              class="sp-surface"
              data-part="consumer"
              style="height: 74px; padding: 8px; opacity: 0; transform: translateY(10px)"
            >
              <span class="sp-label">Card</span>
              <span class="sp-line" style="display: block; width: 84%; margin-top: 10px"></span>
              <span class="sp-line" style="display: block; width: 60%; margin-top: 8px"></span>
            </div>
            <span class="sp-label" style="line-height: 1.35">enter: duration-base, ease-standard</span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(n,`table`),l=e(n,`consumer`),u,d,f=()=>{l.style.transition=`opacity ${s.dur}ms ${s.timing}, transform ${s.dur}ms ${s.timing}`,l.style.opacity=`1`,l.style.transform=`none`,l.dataset.arrived=``},p=()=>{if(i.clearTimeout(u),i.clearTimeout(d),t(n)){l.style.transition=`none`,f(),c.dataset.state=`settled`;return}c.removeAttribute(`data-running`),l.style.transition=`none`,l.style.opacity=`0`,l.style.transform=`translateY(10px)`,l.removeAttribute(`data-arrived`),c.offsetWidth,c.dataset.running=``,c.dataset.state=`playing`,d=i.setTimeout(f,r),u=i.setTimeout(()=>{c.dataset.state=`settled`},o+100)};e(n,`replay`).addEventListener(`click`,p),p()}export{c as mount};