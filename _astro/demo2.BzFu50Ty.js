import{n as e}from"./parts.C-YLuC7Q.js";var t=[{initials:`AM`,name:`Ada mentioned you`},{initials:`JR`,name:`Jo assigned you a card`},{initials:`PK`,name:`Pia left a comment`},{initials:`TS`,name:`Tomas shared a board`}];function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px; --sp-stagger: 180ms">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Notifications</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay">Replay</button>
        </div>
        <ul class="sp-list" data-part="list" data-subject style="margin-top: 6px">${t.map((e,t)=>`
      <li class="sp-list-item sp-stagger-item" data-part="item-${t+1}" style="--sp-i: ${t}">
        <span class="sp-avatar">${e.initials}</span>
        <span class="sp-grow sp-text sp-text--ink">${e.name}</span>
      </li>`).join(``)}</ul>
      </div>
    </div>
  `,e(n,`replay`).addEventListener(`click`,()=>{for(let e of n.querySelectorAll(`.sp-stagger-item`))e.classList.remove(`sp-stagger-item`),e.offsetWidth,e.classList.add(`sp-stagger-item`)})}export{n as mount};