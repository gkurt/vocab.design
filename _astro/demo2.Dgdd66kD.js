import{n as e}from"./parts.C-YLuC7Q.js";var t=700,n=4,r=[[`Ada M.`,`Design`],[`Bo T.`,`Design`],[`Cy R.`,`Platform`],[`Dee L.`,`Support`],[`Eli K.`,`Platform`],[`Fay N.`,`Design`],[`Gil A.`,`Research`],[`Hana P.`,`Support`],[`Ivo S.`,`Platform`],[`Jo W.`,`Research`],[`Kit B.`,`Design`],[`Lior D.`,`Support`]],i={rest:`Load more`,busy:`Loading…`,done:`All 12 loaded`};function a(e){let[t,n]=r[e]??[``,``];return`
    <li class="sp-list-item" data-part="row-${e+1}">
      <span class="sp-avatar">${t.slice(0,1)}</span>
      <span class="sp-grow">${t}</span>
      <span class="sp-text">${n}</span>
    </li>`}function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Members</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-scroll sp-surface sp-grow sp-context" data-part="list" style="padding: 0 4px">
            ${[0,1,2,3].map(a).join(``)}
          </ul>
          <div class="sp-row sp-row--between">
            <span class="sp-text sp-context" data-part="count" role="status">4 of ${r.length}</span>
            <button class="sp-button sp-button--sm" data-part="more" data-subject type="button">${i.rest}</button>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`list`),l=e(o,`count`),u=e(o,`more`),d=0;for(let e of Object.values(i))u.textContent=e,d=Math.max(d,u.offsetWidth);u.style.minWidth=`${d}px`,u.textContent=i.rest;let f=n;u.addEventListener(`click`,()=>{f>=r.length||u.dataset.loading!==void 0||(u.dataset.loading=``,u.textContent=i.busy,u.setAttribute(`aria-busy`,`true`),s.setTimeout(()=>{let e=Math.min(f+n,r.length);if(c.insertAdjacentHTML(`beforeend`,Array.from({length:e-f},(e,t)=>a(f+t)).join(``)),f=e,l.textContent=`${f} of ${r.length}`,delete u.dataset.loading,u.removeAttribute(`aria-busy`),f>=r.length){u.textContent=i.done,u.disabled=!0;return}u.textContent=i.rest},t))})}export{o as mount};