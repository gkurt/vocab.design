import{n as e}from"./parts.C-YLuC7Q.js";var t={w:300,h:160},n={w:124,h:54},r=[{key:`play`,name:`Play`,note:`Resume the film`},{key:`share`,name:`Share`,note:`Send to a room`},{key:`details`,name:`Details`,note:`Cast and crew`},{key:`close`,name:`Close`,note:`Put it away`}];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Spatial</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 10px">
          <div
            class="sp-surface"
            data-part="panel"
            data-gaze
            data-committed="none"
            style="position: relative; flex: 0 0 auto; width: ${t.w+2}px; height: ${t.h+2}px; display: grid; grid-template-columns: repeat(2, ${n.w}px); gap: 16px; padding: 18px; justify-content: center; align-content: center"
          >
            ${r.map(e=>`
              <button
                class="sp-button sp-button--ghost"
                type="button"
                data-part="tile-${e.key}"${e.key===`play`?` data-subject data-pose="[data-gazed]"`:``}
                style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px; width: ${n.w}px; height: ${n.h}px; padding: 0 12px; text-align: left"
              >
                <span class="sp-heading" style="font-size: 13px">${e.name}</span>
                <span class="sp-label" style="font-size: 11px">${e.note}</span>
              </button>`).join(``)}
          </div>

          <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
            <span class="sp-label">Eyes are on</span>
            <span class="sp-heading" data-part="gaze-name" style="font-size: 14px">Play</span>
            <div class="sp-divider"></div>
            <span class="sp-label">Pinch committed</span>
            <span class="sp-heading" data-part="commit-name" style="font-size: 14px">Nothing yet</span>
          </div>
        </div>

      </div>
    </div>
  `;let a=e(i,`panel`),o=e(i,`gaze-name`),s=e(i,`commit-name`),c=r[0],l=t=>{c=t;for(let n of r){let r=e(i,`tile-${n.key}`),a=n.key===t.key;a?r.setAttribute(`data-gazed`,``):r.removeAttribute(`data-gazed`),r.style.boxShadow=a?`0 0 0 3px var(--sp-accent)`:`none`}o.textContent=t.name};for(let t of r){let n=e(i,`tile-${t.key}`);n.addEventListener(`pointerenter`,()=>l(t)),n.addEventListener(`click`,()=>{a.dataset.committed=t.key,s.textContent=t.name})}c&&l(c)}export{i as mount};