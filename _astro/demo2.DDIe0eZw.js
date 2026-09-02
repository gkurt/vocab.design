import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`ada`,initial:`A`,name:`Ada Whitfield`,meta:`2m`},{key:`ben`,initial:`B`,name:`Ben Oyelaran`,meta:`14m`},{key:`cai`,initial:`C`,name:`Cai Marchetti`,meta:`1h`},{key:`dev`,initial:`D`,name:`Devi Ramachandran`,meta:`Yesterday`}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Reviewers</span></div>
        <div class="sp-body" style="padding: 6px">
          <ul class="sp-list" data-part="list" data-subject role="listbox" aria-label="Reviewers">${n.map(({key:e,initial:t,name:n,meta:r})=>`
      <li
        class="sp-list-item"
        role="option"
        aria-selected="false"
        data-part="row-${e}"
      >
        <span class="sp-avatar">${t}</span>
        <span class="sp-grow">${n}</span>
        <span class="sp-text">${r}</span>
      </li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let i=n.map(({key:t})=>e(r,`row-${t}`)),a=e=>{for(let n of i){let r=n===e;n.setAttribute(`aria-selected`,String(r)),t(n,`data-selected`,r)}};for(let e of i)e.addEventListener(`click`,()=>a(e))}export{r as mount};