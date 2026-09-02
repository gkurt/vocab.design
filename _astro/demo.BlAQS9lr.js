import{n as e}from"./parts.C-YLuC7Q.js";var t=1100,n=48,r=6,i=4,a=[[`Herring gulls on the west quay`,`9:02`],[`Tide line further up than Tuesday`,`9:14`],[`Two seals off the slipway`,`9:31`],[`Fog bank sitting past the bar`,`10:05`],[`Ferry ran early, no queue`,`10:22`],[`Wind backed round to the north`,`10:48`],[`Sand martins in the cliff face`,`11:03`],[`Crab boat landed forty pots`,`11:19`],[`Rain on the far headland only`,`11:40`],[`Oystercatchers working the mud`,`12:02`],[`Swell dropping off the point`,`12:18`],[`Last light on the harbour wall`,`12:35`]],o={idle:``,loading:`
    <span class="sp-stack sp-grow" style="gap: 6px">
      <span class="sp-skeleton" style="height: 8px; width: 72%"></span>
      <span class="sp-skeleton" style="height: 8px; width: 44%"></span>
    </span>`,end:`<span class="sp-text sp-grow">Nothing left to load</span>`};function s(e){let[t,n]=a[e]??[``,``];return`
    <li class="sp-list-item" data-part="item-${e+1}">
      <span class="sp-grow">${t}</span>
      <span class="sp-text">${n}</span>
    </li>`}function c(c,l){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 268px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field notes</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="feed" data-subject style="padding: 0 4px">
            ${Array.from({length:r},(e,t)=>s(t)).join(``)}
            <li class="sp-row" data-part="sentinel" data-state="idle" style="flex: 0 0 auto; height: 36px; padding: 0 10px"></li>
          </ul>
        </div>
      </div>
    </div>
  `;let u=e(c,`feed`),d=e(c,`sentinel`),f=r,p=!1,m=e=>{d.dataset.state=e,d.innerHTML=o[e]};u.addEventListener(`scroll`,()=>{p||f>=a.length||u.scrollHeight-u.scrollTop-u.clientHeight>n||(p=!0,m(`loading`),l.setTimeout(()=>{let e=Math.min(f+i,a.length);d.insertAdjacentHTML(`beforebegin`,Array.from({length:e-f},(e,t)=>s(f+t)).join(``)),f=e,p=!1,m(f>=a.length?`end`:`idle`)},t))})}export{c as mount};