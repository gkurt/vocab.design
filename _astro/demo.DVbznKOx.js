import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=6,i=[`AO`,`PR`,`TG`,`MJ`],a=[{key:`version`,label:`Version`,value:`4.2.0`},{key:`build`,label:`Build`,value:`5813 arm64`},{key:`licenses`,label:`Open source licences`,value:``}];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">About</span>
          <span class="sp-label">Lumen Notes</span>
        </div>

        <div class="sp-body" data-part="screen" style="position: relative">
          <div class="sp-surface sp-context" style="overflow: hidden">
            <div class="sp-list">${a.map(({key:e,label:t,value:r})=>{let i=e===`licenses`?`<span style="flex: 0 0 auto; display: flex; color: var(--sp-muted)">${n(`chevronRight`)}</span>`:`<span class="sp-text" style="flex: 0 0 auto; font-size: 12px; font-variant-numeric: tabular-nums">${r}</span>`;return`
      <div
        class="sp-list-item"
        data-part="row-${e}"
        style="${e===`version`?`user-select: none; `:``}height: 37px"
      >
        <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px; white-space: nowrap">${t}</span>
        ${i}
      </div>`}).join(``)}</div>
          </div>

          <div
            class="sp-surface"
            data-part="reward"
            data-subject
            style="position: absolute; left: 12px; right: 12px; bottom: 12px; display: flex; align-items: center; gap: 12px; padding: 10px 12px; box-shadow: var(--sp-shadow); opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity 0.26s var(--sp-ease), transform 0.26s var(--sp-ease), visibility 0.26s"
          >
            <span style="flex: 0 0 auto; display: flex; align-items: center">${i.map((e,t)=>`<span class="sp-avatar" style="width: 26px; height: 26px; font-size: 10px; border: 2px solid var(--sp-surface); ${t?`margin-left: -8px`:``}">${e}</span>`).join(``)}</span>
            <span class="sp-stack sp-grow" style="gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 12.5px; font-weight: 600; white-space: nowrap">Hi from the four of us who built this.</span>
              <span class="sp-text" style="font-size: 11px; white-space: nowrap">Nothing else lives back here.</span>
            </span>
            <span style="flex: 0 0 auto; display: flex; color: var(--sp-accent)">${n(`star`,`sp-icon--filled`)}</span>
          </div>
        </div>
      </div>

      <!-- The caption sits outside the frame: a line of app copy naming the trigger would
           be the signifier an easter egg is defined by not having. -->
      <p class="sp-label" data-stage-verdict data-part="caption" style="margin: 0; width: 460px; font-size: 11px">
        ${r} presses on the version number. Nothing in this app is behind it.
      </p>
    </div>
  `;let s=e(o,`screen`),c=e(o,`reward`),l=0;e(o,`row-version`).addEventListener(`click`,()=>{l>=r||(l+=1,!(l<r)&&(t(s,`data-found`,!0),c.style.opacity=`1`,c.style.visibility=`visible`,c.style.transform=`translateY(0)`))})}export{o as mount};