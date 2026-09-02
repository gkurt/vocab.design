var e=[`Handgloves 0123 Hamburgefonstiv`,`illiillmm`],t=40,n=[{label:`SF Pro Text`,css:`'SF Pro Text'`},{label:`Segoe UI Variable Text`,css:`'Segoe UI Variable Text'`},{label:`Segoe UI`,css:`'Segoe UI'`},{label:`Roboto`,css:`Roboto`},{label:`Cantarell`,css:`Cantarell`},{label:`Ubuntu`,css:`Ubuntu`},{label:`Helvetica Neue`,css:`'Helvetica Neue'`}],r=[[`Apple platforms`,`SF Pro`],[`Windows 11`,`Segoe UI Variable`],[`Android`,`Roboto`],[`Linux desktops`,`whatever the system is configured with`]];function i(){let r=document.createElement(`canvas`).getContext(`2d`);if(!r)return;let i=n=>e.map(e=>(r.font=`${t}px ${n}`,Math.round(r.measureText(e).width*100))).join(`/`),a=i(`system-ui`),o=i(`__no_such_family__`);if(a!==o)return n.find(({css:e})=>{let t=i(e);return t!==o&&t===a})?.label}function a(e){let t=i();e.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-family: system-ui</span>
          <span class="sp-label">nothing downloaded</span>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: 44px">
          <span data-part="specimen" data-subject
                style="font-family: system-ui, sans-serif; font-size: 30px; line-height: 1.2">Handgloves 0123</span>
        </div>
        <div class="sp-row sp-context" style="height: 20px">
          <span class="sp-text" data-part="readout">${t?`Measured on this machine: system-ui draws exactly as ${t}.`:`Measured on this machine: system-ui matched none of the names below, so the page cannot name it.`}</span>
        </div>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <table class="sp-table sp-context" data-part="platforms" style="--sp-cell-pad: 4px 8px">
          <thead>
            <tr><th>platform</th><th>the keyword resolves to</th></tr>
          </thead>
          <tbody>${r.map(([e,t])=>`<tr data-part="row-${e.split(` `)[0]?.toLowerCase()}"><td>${e}</td><td>${t}</td></tr>`).join(``)}</tbody>
        </table>
      </div>
    </div>
  `}export{a as mount};