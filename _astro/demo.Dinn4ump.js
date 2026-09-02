function e(e){let t=(e,t,n,r,i)=>`
    <div class="sp-surface" data-part="card-${e}"
         style="height: 156px; padding: 12px; overflow: hidden; display: flex; flex-direction: column; gap: 6px">
      <span class="sp-heading" data-part="name-${e}" style="height: 22px">${t}</span>
      <span class="sp-label sp-context" data-part="role-${e}"
            style="height: 38px; line-height: 1.4; overflow-wrap: anywhere">${n}</span>
      <p class="sp-text" data-part="bio-${e}"${e===`lorem`?` data-subject`:``}
         style="margin: 0; flex: 1 1 auto; ${i}">${r}</p>
    </div>`;e.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row" style="gap: 16px; align-items: flex-start">
          <div class="sp-stack" style="width: 200px">
            ${t(`lorem`,`Lorem Ipsum`,`Consectetur adipiscing`,`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,``)}
          </div>
          <div class="sp-stack sp-context" style="width: 200px">
            ${t(`real`,`Wei`,`Landesarbeitsgemeinschaftsvorsitzende`,`No bio yet.`,`font-style: italic`)}
          </div>
        </div>
      </div>
    </div>
  `}export{e as mount};