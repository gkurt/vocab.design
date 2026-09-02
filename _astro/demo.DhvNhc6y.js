import{n as e,t}from"./parts.C-YLuC7Q.js";var n=300,r=88,i=`display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; padding: 8px 10px`,a=[`Mara opened a ticket`,`Build 4182 passed`,`Sam left a comment`,`Deploy to staging`,`Ola renamed a branch`,`Build 4183 passed`,`Kit updated a token`,`Sam closed a ticket`,`Build 4184 queued`,`Mara joined the call`];function o(o,s){let c=(e,t,n)=>`
    <div class="sp-surface${n?``:` sp-context`}" data-part="${e}" data-calls="0"${n?` data-subject`:``} style="${i}">
      <div class="sp-row sp-row--between">
        <span class="sp-label">${t}</span>
        <span class="sp-text" data-part="count-${e}" style="width: 66px; text-align: right">0 calls</span>
      </div>
      <span class="sp-text sp-text--ink" data-part="value-${e}" style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums">
        top 0px
      </span>
    </div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <ul class="sp-scroll sp-list sp-surface sp-context" data-part="feed" style="height: ${r}px; padding: 0 4px">
            ${a.map(e=>`
      <li class="sp-list-item">
        <span class="sp-avatar">${e.slice(0,1)}</span>
        <span class="sp-grow sp-text sp-text--ink">${e}</span>
      </li>`).join(``)}
          </ul>
          <div class="sp-row" style="align-items: stretch; gap: 10px">
            ${c(`eager`,`Every scroll event`,!1)}
            ${c(`throttled`,`Throttled to ${n} ms`,!0)}
          </div>
        </div>
      </div>
    </div>
  `;let l=e(o,`feed`),u=e(o,`throttled`),d=0,f=0,p=0,m,h=(t,n)=>{let r=e(o,t);r.dataset.calls=String(n),e(o,`count-${t}`).textContent=`${n} call${n===1?``:`s`}`,e(o,`value-${t}`).textContent=`top ${Math.round(l.scrollTop)}px`},g=()=>{p=performance.now(),f+=1,h(`throttled`,f),t(u,`data-live`,!0),t(u,`data-capped`,d>f)};l.addEventListener(`scroll`,()=>{d+=1,h(`eager`,d),t(u,`data-capped`,d>f);let e=performance.now()-p;if(e>=n){s.clearTimeout(m),m=void 0,g();return}m===void 0&&(m=s.setTimeout(()=>{m=void 0,g()},n-e))})}export{o as mount};