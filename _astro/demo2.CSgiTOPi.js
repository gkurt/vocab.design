import{t as e}from"./icons.CLHbLdSV.js";var t=[[`Kestrel`,`berth 12`],[`Merlin`,`berth 14`],[`Kittiwake`,`berth 3`],[`Guillemot`,`berth 7`],[`Fulmar`,`berth 9`],[`Shearwater`,`berth 1`],[`Gannet`,`berth 6`],[`Petrel`,`berth 11`]];function n(n){let r=t.map(([e,t])=>`
      <div class="sp-list-item" style="padding: 7px 10px">
        <span class="sp-grow">${e}</span>
        <span class="sp-label">${t}</span>
      </div>`).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 226px">
        <div class="sp-topbar" data-part="bar" data-subject role="banner" style="gap: 8px">
          <button class="sp-icon-button" data-part="nav" aria-label="Open navigation">${e(`menu`)}</button>
          <span class="sp-heading sp-grow" style="font-size: 15px">Harbour</span>
          <button class="sp-icon-button" data-part="search" aria-label="Search">${e(`search`)}</button>
          <span class="sp-avatar" style="width: 26px; height: 26px; font-size: 11px">RK</span>
        </div>
        <div class="sp-body sp-scroll sp-context" data-part="scroller" style="padding: 10px 12px">
          <div class="sp-heading" style="font-size: 13px; margin-bottom: 8px">Fleet</div>
          <div class="sp-list">${r}</div>
        </div>
      </div>
    </div>
  `}export{n as mount};